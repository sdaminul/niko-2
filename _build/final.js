/* Final gate: broken links, missing assets, structural sanity */
const fs = require('fs'), path = require('path');
const dirs = ['', 'user', 'vendor', 'admin'];
const files = [];
dirs.forEach(d => fs.readdirSync(d || '.').filter(f => f.endsWith('.html')).forEach(f => files.push((d ? d + '/' : '') + f)));
const exists = p => fs.existsSync(p);

let broken = [], missingAsset = [], structure = [], noSidebar = [], noFooter = [];

files.forEach(p => {
  const dir = path.dirname(p) === '.' ? '' : path.dirname(p);
  const h = fs.readFileSync(p, 'utf8');
  /* code samples inside textarea/pre are content, not real links */
  const scan = h.replace(/<textarea[\s\S]*?<\/textarea>/g, '').replace(/<pre[\s\S]*?<\/pre>/g, '');

  /* internal links */
  [...scan.matchAll(/(?:href|src)="([^"#][^"]*?)"/g)].forEach(m => {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(u)) return;
    const clean = u.split('#')[0].split('?')[0];
    if (!clean) return;
    const target = path.normalize(path.join(dir, clean)).replace(/\\/g, '/');
    if (!exists(target)) {
      (/\.(css|js|svg|png|jpg|webp|woff2?)$/.test(clean) ? missingAsset : broken).push(p + ' → ' + u);
    }
  });

  /* structural sanity */
  if (!/^<!DOCTYPE html>/i.test(h.trim())) structure.push(p + ' (no doctype)');
  if (!h.includes('</html>')) structure.push(p + ' (unclosed html)');
  const ob = (h.match(/<body/g) || []).length, cb = (h.match(/<\/body>/g) || []).length;
  if (ob !== 1 || cb !== 1) structure.push(p + ' (body tags ' + ob + '/' + cb + ')');
  if (!h.includes('<title>')) structure.push(p + ' (no title)');
  if (!/name="viewport"/.test(h)) structure.push(p + ' (no viewport)');

  if (dir && !h.includes('class="sidebar"')) noSidebar.push(p);
  /* auth screens intentionally use a slim legal strip instead of the big footer */
  const isAuth = /^(login|register|forgot-password|reset-password|otp-verify)\.html$/.test(p);
  if (!isAuth && !/<footer|sitemap|©/.test(h)) noFooter.push(p);
  if (isAuth && !/terms\.html/.test(h)) noFooter.push(p + ' (auth: no legal links)');
});

const uniq = a => [...new Set(a)];
const show = (t, a, limit = 12) => {
  a = uniq(a);
  console.log(t + ': ' + (a.length ? a.length : 'none'));
  a.slice(0, limit).forEach(x => console.log('   ' + x));
  if (a.length > limit) console.log('   …+' + (a.length - limit) + ' more');
};

console.log('=== FINAL GATE — ' + files.length + ' pages ===');
show('broken page links', broken);
show('missing assets', missingAsset);
show('structural problems', structure);
show('dashboard pages without sidebar', noSidebar);
show('pages without footer', noFooter);
