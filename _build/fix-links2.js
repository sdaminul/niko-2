/* Second pass: root pages pointing to non-existent dashboard login pages */
const fs = require('fs');
const M = [
  ['vendor/login.html', 'vendor/dashboard.html'],
  ['admin/login.html', 'admin/dashboard.html'],
  ['admin/users.html', 'admin/customers.html']
];
let n = 0;
['', 'user', 'vendor', 'admin'].forEach(d => {
  fs.readdirSync(d || '.').filter(f => f.endsWith('.html')).forEach(f => {
    const p = (d ? d + '/' : '') + f;
    let h = fs.readFileSync(p, 'utf8'); const b = h;
    M.forEach(([a, t]) => { h = h.split(a).join(t); });
    if (h !== b) { fs.writeFileSync(p, h); n++; }
  });
});
console.log('patched:', n);
