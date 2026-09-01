/* Full QA audit across every emitted page */
const fs = require('fs');
const DIRS = ['', 'user', 'vendor', 'admin'];
const files = [];
DIRS.forEach(d => fs.readdirSync(d || '.').filter(f => f.endsWith('.html')).forEach(f => files.push({ d, p: (d ? d + '/' : '') + f })));

let orphan = [], dangling = [], wired = 0, modalPages = 0;
let noAction = [], artifacts = [], tabIssues = [];
let totalTables = 0, totalForms = 0, totalModals = 0, totalBtns = 0;

files.forEach(({ d, p }) => {
  const h = fs.readFileSync(p, 'utf8');
  const ids = [...h.matchAll(/class="modal" id="([^"]+)"/g)].map(m => m[1]);
  const trg = [...h.matchAll(/data-modal-open="([^"]+)"/g)].map(m => m[1]);
  if (ids.length) {
    modalPages++;
    const o = ids.filter(i => !trg.includes(i));
    const g = [...new Set(trg)].filter(t => !ids.includes(t));
    if (o.length) orphan.push(p + ' → ' + o.join(','));
    if (g.length) dangling.push(p + ' → ' + g.join(','));
    if (!o.length && !g.length) wired++;
  }
  totalModals += ids.length;
  totalTables += (h.match(/<table class="tbl/g) || []).length;
  totalForms += (h.match(/<(input|select|textarea)\b/g) || []).length;
  totalBtns += (h.match(/<button\b/g) || []).length;

  ['undefined', '[object Object]', 'NaN', 'index.htmlindex'].forEach(k => { if (h.includes(k)) artifacts.push(p + ' :: ' + k); });

  // tab panels must exist where tabs are used
  const tabs = (h.match(/data-tab="/g) || []).length;
  const panes = (h.match(/data-tab-panel="/g) || []).length;
  const hasTable = (h.match(/<table/g) || []).length > 0;
  if (tabs && !panes && !hasTable) tabIssues.push(p + ' (tabs with nothing to switch)');

  // dashboard list pages should offer actions
  if (d && /orders|products|vendors|customers|reviews|leads|bookings|disputes|tickets|payouts/.test(p) && !h.includes('dd-item') && !h.includes('btn-xs')) noAction.push(p);
});

const line = s => console.log(s);
line('════ HaatBazar QA audit ════');
line('pages: ' + files.length + '  (root ' + files.filter(f => !f.d).length + ' · user ' + files.filter(f => f.d === 'user').length + ' · vendor ' + files.filter(f => f.d === 'vendor').length + ' · admin ' + files.filter(f => f.d === 'admin').length + ')');
line('tables: ' + totalTables + ' · form controls: ' + totalForms + ' · buttons: ' + totalBtns + ' · modals: ' + totalModals);
line('modal pages fully wired: ' + wired + '/' + modalPages);
line('orphan modals (no trigger): ' + (orphan.length ? '\n  ' + orphan.join('\n  ') : 'none'));
line('dangling triggers (no modal): ' + (dangling.length ? '\n  ' + dangling.join('\n  ') : 'none'));
line('render artifacts: ' + (artifacts.length ? '\n  ' + artifacts.join('\n  ') : 'none'));
line('tab panel issues: ' + (tabIssues.length ? tabIssues.join(', ') : 'none'));
line('list pages without row actions: ' + (noAction.length ? noAction.join(', ') : 'none'));
