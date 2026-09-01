/* Repair chart SVGs + placeholder classes that were emitted from legacy helper signatures */
const fs = require('fs');
const PH = ['ph-a', 'ph-b', 'ph-c', 'ph-d', 'ph-e', 'ph-f', 'ph-g', 'ph-h', 'ph-i'];
const LBL = {
  7: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  12: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  6: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
  4: ['W1', 'W2', 'W3', 'W4']
};
const SEED = [72, 58, 88, 64, 94, 100, 78, 66, 84, 52, 90, 70];
const labels = n => LBL[n] || Array.from({ length: n }, (_, i) => 'D' + (i + 1));

/* single or grouped bar chart, h = plot height */
const bar = (n, h, grouped) => {
  const w = 640, bw = w / n, L = labels(n), pad = 10;
  let s = `<svg viewBox="0 0 ${w} ${h + 18}" class="w-full" style="height:${h + 18}px">`;
  for (let i = 0; i < n; i++) {
    const a = SEED[i % 12], b = Math.round(SEED[(i + 5) % 12] * .42);
    const x = i * bw + bw * (grouped ? .16 : .2);
    const bwid = bw * (grouped ? .32 : .6);
    const ha = (a / 100) * (h - pad), hb = (b / 100) * (h - pad);
    const last = i === n - 1;
    s += `\n<rect x="${x.toFixed(1)}" y="${(h - ha).toFixed(1)}" width="${bwid.toFixed(1)}" height="${ha.toFixed(1)}" rx="4" fill="${last ? '#ff2525' : '#ff252566'}"/>`;
    if (grouped) s += `<rect x="${(x + bwid + 2).toFixed(1)}" y="${(h - hb).toFixed(1)}" width="${bwid.toFixed(1)}" height="${hb.toFixed(1)}" rx="4" fill="${last ? '#00b894' : '#00b89466'}"/>`;
    s += `<text x="${(i * bw + bw * .5).toFixed(1)}" y="${h + 13}" text-anchor="middle" font-size="10" fill="#8792a6">${L[i]}</text>`;
  }
  return s + '</svg>';
};

let files = 0, charts = 0, phs = 0;
['vendor', 'admin', 'user'].forEach(d => {
  fs.readdirSync(d).filter(f => f.endsWith('.html')).forEach(f => {
    const p = d + '/' + f;
    let h = fs.readFileSync(p, 'utf8'); const before = h;

    // 1) broken bar charts (NaN geometry or numeric fill like fill="15066")
    h = h.replace(/<svg viewBox="0 0 640 (\d+)"[^>]*>[\s\S]*?<\/svg>/g, (m, vb) => {
      if (!/y="NaN"|fill="\d+66"/.test(m)) return m;
      const n = (m.match(/<text /g) || []).length;          // one label per group
      const rects = (m.match(/<rect /g) || []).length;
      if (!n) return m;
      const grouped = rects >= n * 2;
      charts++;
      return bar(n, Number(vb) - 18, grouped);

    });

    // 2) placeholder tiles that lost their palette class
    let k = 0;
    h = h.replace(/class="ph undefined /g, () => { phs++; return `class="ph ${PH[k++ % PH.length]} `; });

    if (h !== before) { fs.writeFileSync(p, h); files++; }
  });
});
console.log(`files ${files} · charts ${charts} · placeholders ${phs}`);
