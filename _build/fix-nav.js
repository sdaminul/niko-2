/* Re-inject the canonical sidebar into every dashboard page (keeps active state) */
const fs = require('fs');
const D = require('./dash');

let n = 0, skipped = 0;
['user', 'vendor', 'admin'].forEach(role => {
  fs.readdirSync(role).filter(f => f.endsWith('.html')).forEach(f => {
    const p = role + '/' + f;
    let h = fs.readFileSync(p, 'utf8');
    const s = h.indexOf('<aside class="sidebar"');
    const e = h.indexOf('</aside>', s);
    if (s < 0 || e < 0) { skipped++; return; }
    // keep whichever nav item was active on this page
    const old = h.slice(s, e + 8);
    const m = old.match(/href="([a-z0-9-]+\.html)" class="sb-item is-active"/);
    const active = m ? m[1] : f;
    const fresh = D.sidebar(role, active);
    if (fresh === old) return;
    fs.writeFileSync(p, h.slice(0, s) + fresh + h.slice(e + 8));
    n++;
  });
});
console.log('sidebars refreshed:', n, '| skipped:', skipped);
