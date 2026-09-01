/* Inject contextual detail / action modals into dashboard list pages that lack them */
const fs = require('fs');
const { svg } = require('./ui');
const K = require('./kit');
const { modal, modalFoot, kv, fld, inp, sel, ta, note, st, table, ph, tk } = K;

const row = (a, b) => `<div class="flex justify-between gap-4 py-2 border-b border-[#f4f5f8] last:border-0"><span class="text-[12.5px] text-ink-500">${a}</span><span class="text-[12.5px] font-bold text-ink-800 text-right">${b}</span></div>`;
const box = rows => `<div class="p-5">${rows.join('')}</div>`;
const grid2 = inner => `<div class="p-5 grid sm:grid-cols-2 gap-3.5">${inner}</div>`;
const tl = items => `<div class="timeline p-5">${items.map(i => `<div class="tl-item"><span class="tl-dot"></span><p class="text-[12.5px] font-bold">${i[0]}</p><p class="text-[11.5px] text-ink-400">${i[1]}</p></div>`).join('')}</div>`;
const chips = a => `<div class="flex flex-wrap gap-1.5 px-5 pb-1">${a.map(c => `<span class="badge badge-gray">${c}</span>`).join('')}</div>`;

module.exports = { row, box, grid2, tl, chips, modal, modalFoot, svg, fs, K };
