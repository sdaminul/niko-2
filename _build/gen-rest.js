/* Remaining vendor pages + full admin dashboard — compact data-driven generator */
const fs = require('fs');
const K = require('./kit');
const { dashPage, stats, card, table, tfoot, st, filterbar, tabs, bulkbar, svg, ph, stars, tk, actionsCell, empty, prow, hbars, donut, lineChart, barChart,
  mini, tiles, kv, note, fld, inp, sel, ta, sw, chk, gridForm, frows, formCard, people, timeline, bars, modal, modalFoot, kanban, calendar, chatShell } = K;

const btn = (l, i, c = 'outline', x = '') => `<button class="btn btn-sm btn-${c}" ${x}>${i ? svg(i) : ''}${l}</button>`;
const A = actionsCell, B = bars, H = hbars, N = note, F = frows;
const W = (role, f, h) => { fs.writeFileSync(`f:/niko-design/${role}/${f}`, h); console.log(role + '/' + f); };
const acts = (l) => (l || []).map(a => btn(a[0], a[1], a[2] || 'outline', a[3] || '')).join('');
const row2 = (a, b) => `<div class="grid lg:grid-cols-2 gap-4 mb-4">${a}${b}</div>`;
const row3 = (a, b, c) => `<div class="grid lg:grid-cols-3 gap-4 mb-4">${a}${b}${c}</div>`;
const side = (main, aside) => `<div class="grid xl:grid-cols-[1fr_330px] gap-4"><div class="space-y-4">${main}</div><div class="space-y-4">${aside}</div></div>`;

/* generic page factory */
const P = (role, f, o) => {
  const body = (o.stats ? stats(o.stats) : '') + (o.top || '')
    + (o.tabs ? tabs(o.tabs) : '') + (o.filters ? filterbar(o.filters, o.fbtns || '') : '')
    + (o.bulk ? bulkbar(o.bulk) : '')
    + (o.head ? card(o.tableTitle || '', table(o.head.map(h => Array.isArray(h) ? h : [h]), o.rows) + tfoot(1, (o.rows || []).length, o.total || 120), o.tableAct || '') : '')
    + (o.after || '');
  W(role, f, dashPage({ role, title: o.title, sub: o.sub, active: f, crumbs: [o.crumb || o.title], actions: acts(o.actions), body }));
};
const V = (f, o) => P('vendor', f, o);
const AD = (f, o) => P('admin', f, o);
module.exports = { P, V, AD, btn, A, row2, row3, side, acts };
