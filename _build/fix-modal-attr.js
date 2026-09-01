/* main.js opens modals via [data-modal-open]; normalise every trigger to that contract */
const fs = require('fs');
let files = 0, fixed = 0;
['', 'user', 'vendor', 'admin'].forEach(d => {
  fs.readdirSync(d || '.').filter(f => f.endsWith('.html')).forEach(f => {
    const p = (d ? d + '/' : '') + f;
    let h = fs.readFileSync(p, 'utf8'); const b = h;
    // data-modal="x"  ->  data-modal-open="x"   (never touch data-modal-open / data-modal-close)
    h = h.replace(/data-modal="([^"]+)"/g, (m, id) => { fixed++; return `data-modal-open="${id}"`; });
    if (h !== b) { fs.writeFileSync(p, h); files++; }
  });
});
console.log('files:', files, '| triggers normalised:', fixed);
