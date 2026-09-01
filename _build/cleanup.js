/* Final cleanup: grid classes, malformed notes, stray textarea/input values */
const fs = require('fs');
let files = 0, fixes = 0;
const F = (h, re, rep) => { const n = h.replace(re, (...a) => { fixes++; return typeof rep === 'function' ? rep(...a) : rep; }); return n; };

['', 'user', 'vendor', 'admin'].forEach(d => {
  fs.readdirSync(d || '.').filter(x => x.endsWith('.html')).forEach(x => {
    const p = (d ? d + '/' : '') + x;
    let h = fs.readFileSync(p, 'utf8'); const b = h;

    /* 1) "grid 2 gap-3.5" -> responsive grid columns */
    h = F(h, /class="([^"]*?)grid (\d) gap/g, (m, pre, n) =>
      `class="${pre}grid ${n === '1' ? 'grid-cols-1' : 'sm:grid-cols-' + n} gap`);

    /* 2) note() called with (tone, text) — rebuild the note properly */
    h = F(h, /<div class="sb-note bg-[^"]*?-50 text-[^"]*?-700 flex gap-2">(<svg[\s\S]*?<\/svg>)<span>(warn|info|ok|danger|success)<\/span><\/div>/g,
      (m, icon, tone) => {
        const map = { warn: ['gold', 'This change alters vendor earnings. All affected vendors are notified automatically and the change is written to the audit trail.'], info: ['brand', 'Please review the details before you continue.'], ok: ['service', 'Everything looks good.'], success: ['service', 'Completed successfully.'], danger: ['brand', 'This action cannot be undone.'] };
        const [c, txt] = map[tone] || map.info;
        return `<div class="sb-note bg-${c}-50 text-${c}-${c === 'gold' ? '800' : '700'} flex gap-2">${icon}<span>${txt}</span></div>`;
      });

    /* 3) stray numeric row-count leaked into textarea content */
    h = F(h, /(<textarea class="textarea[^"]*"[^>]*>)\s*[0-9]\s*(<\/textarea>)/g, '$1$2');

    /* 4) input type leaked into value attribute */
    h = F(h, /<input type="text" class="input" value="(number|date|datetime-local|time|email|tel|password|url)">/g,
      (m, t) => `<input type="${t}" class="input">`);

    /* 5) placeholder holding a bare number for a real number field */
    h = F(h, /<input type="text" class="input" value="(\d[\d.,]*)">/g, '<input type="number" class="input" value="$1">');

    if (h !== b) { fs.writeFileSync(p, h); files++; }
  });
});
console.log('files touched:', files, '| fixes:', fixes);
