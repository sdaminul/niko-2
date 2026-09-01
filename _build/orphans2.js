const fs = require('fs');
const out = [];
['', 'user', 'vendor', 'admin'].forEach(d => {
  fs.readdirSync(d || '.').filter(f => f.endsWith('.html')).forEach(f => {
    const p = (d ? d + '/' : '') + f;
    const h = fs.readFileSync(p, 'utf8');
    const ids = [...h.matchAll(/class="modal" id="([^"]+)"/g)].map(m => m[1]);
    const trg = new Set([...h.matchAll(/data-modal-open="([^"]+)"/g)].map(m => m[1]));
    const o = ids.filter(i => !trg.has(i));
    if (o.length) out.push(p + ' -> ' + o.join(','));
  });
});
console.log('orphan count: ' + out.length);
out.forEach(x => console.log('  ' + x));
