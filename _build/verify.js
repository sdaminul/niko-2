/* verify all internal links across every html page */
const fs = require('fs'), path = require('path');
const root = 'f:/niko-design';
const dirs = ['', 'user', 'vendor', 'admin'];
const files = [];
dirs.forEach(d => {
  const p = path.join(root, d);
  fs.readdirSync(p).filter(f => f.endsWith('.html')).forEach(f => files.push({ dir: d, file: f, full: path.join(p, f) }));
});
const missing = {}, counts = {};
files.forEach(f => {
  const html = fs.readFileSync(f.full, 'utf8');
  const hrefs = [...html.matchAll(/href="([^"#][^"]*)"/g)].map(m => m[1]);
  hrefs.forEach(h => {
    if (/^(https?:|mailto:|tel:|javascript:|data:)/.test(h)) return;
    const clean = h.split('?')[0].split('#')[0];
    if (!clean || !clean.endsWith('.html')) return;
    const target = path.resolve(path.dirname(f.full), clean);
    if (!fs.existsSync(target)) {
      const key = path.relative(root, target).replace(/\\/g, '/');
      missing[key] = (missing[key] || 0) + 1;
    }
  });
  counts[f.dir || 'root'] = (counts[f.dir || 'root'] || 0) + 1;
});
console.log('PAGE COUNTS:', JSON.stringify(counts), 'TOTAL', files.length);
const keys = Object.keys(missing);
if (!keys.length) console.log('OK — no broken internal links');
else { console.log('MISSING TARGETS (' + keys.length + '):'); keys.sort().forEach(k => console.log('  ' + k + '  x' + missing[k])); }
