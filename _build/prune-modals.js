/* Remove modal blocks that no page element can open (dead DOM from shared footer) */
const fs = require('fs');

function cutModal(html, id) {
  const open = html.indexOf('<div class="modal" id="' + id + '"');
  if (open === -1) return html;
  let i = open, depth = 0;
  const tag = /<\/?div\b/g;
  tag.lastIndex = open;
  let m;
  while ((m = tag.exec(html))) {
    if (m[0] === '<div') depth++; else depth--;
    if (depth === 0) { i = html.indexOf('>', m.index) + 1; break; }
  }
  return html.slice(0, open) + html.slice(i);
}

let touched = 0, removed = 0;
fs.readdirSync('.').filter(f => f.endsWith('.html')).forEach(f => {
  let h = fs.readFileSync(f, 'utf8');
  const before = h;
  const ids = [...h.matchAll(/class="modal" id="([^"]+)"/g)].map(m => m[1]);
  const trg = new Set([...h.matchAll(/data-modal-open="([^"]+)"/g)].map(m => m[1]));
  ids.filter(id => !trg.has(id)).forEach(id => { h = cutModal(h, id); removed++; });
  if (h !== before) { fs.writeFileSync(f, h); touched++; }
});
console.log('pages cleaned: ' + touched + ' · dead modals removed: ' + removed);
