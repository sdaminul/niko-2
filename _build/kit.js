/* Higher-level page blocks shared by vendor + admin generators */
const D = require('./dash');
const { svg, ph, stars, card, table, tfoot, st, actionsCell, filterbar, tabs, bulkbar, stats, hbars, donut, lineChart, barChart, empty, prow } = D;

/* --- small atoms ------------------------------------------------------- */
const cb = (c = '#ff2525') => `<input type="checkbox" data-check-row class="w-4 h-4" style="accent-color:${c}">`;
const mini = (arr, cols = 2) => `<div class="grid grid-cols-${cols} gap-2.5">${arr.map(m => `<div class="mini"><p class="v text-${m[2] || 'ink'}-${m[2] ? '600' : '900'}">${m[0]}</p><p class="l">${m[1]}</p></div>`).join('')}</div>`;
const tiles = (arr, cols = 'sm:grid-cols-2 lg:grid-cols-3') => `<div class="grid ${cols} gap-2.5">${arr.map(t => `<a href="${t[3] || '#'}" class="tile-link"><span class="ic bg-${t[4] || 'brand'}-50 text-${t[4] || 'brand'}-600">${svg(t[0], 'w-4 h-4')}</span>
<span class="min-w-0 flex-1"><span class="block text-[12.5px] font-bold">${t[1]}</span><span class="block text-[11.5px] text-ink-400">${t[2]}</span></span>${svg('chevR', 'w-4 h-4 text-ink-300')}</a>`).join('')}</div>`;
const kv = (rows, cls = '') => `<div class="space-y-2 text-[12.5px] ${cls}">${rows.map(r => `<div class="flex justify-between gap-3"><span class="text-ink-500">${r[0]}</span><b class="text-right">${r[1]}</b></div>`).join('')}</div>`;
const note = (text, tone = 'brand', icon = 'info') => `<div class="sb-note bg-${tone}-50 text-${tone}-${tone === 'gold' ? '800' : '700'} flex gap-2">${svg(icon, 'w-4 h-4 shrink-0 mt-0.5')}<span>${text}</span></div>`;
const fld = (label, ctrl, span = '', hint = '') => `<div class="${span}"><label class="label">${label}</label>${ctrl}${hint ? `<p class="hint">${hint}</p>` : ''}</div>`;
const inp = (ph2 = '', val = '', type = 'text') => `<input type="${type}" class="input" ${val ? `value="${val}"` : `placeholder="${ph2}"`}>`;
const sel = (opts) => `<select class="select">${opts.map(o => `<option>${o}</option>`).join('')}</select>`;
const ta = (ph2 = '', val = '', h = 90) => `<textarea class="textarea !min-h-[${h}px}]" placeholder="${ph2}">${val}</textarea>`.replace('}]', ']');
const sw = (on = true, tone = '') => `<label class="switch ${tone}"><input type="checkbox" ${on ? 'checked' : ''}><span class="track"></span></label>`;
const chk = (label, on = false) => `<label class="check"><input type="checkbox" ${on ? 'checked' : ''}>${label}</label>`;
const gridForm = (fields, cols = 'sm:grid-cols-2') => `<div class="p-5 grid ${cols} gap-3.5">${fields.join('')}</div>`;

/* settings-style toggle rows */
const frows = rows => `<div class="p-5">${rows.map(r => `<div class="frow"><div class="min-w-0"><p class="ft">${r[0]}</p><p class="fs">${r[1]}</p></div>
<div class="shrink-0">${r[2] === undefined ? sw(true) : r[2] === true ? sw(true) : r[2] === false ? sw(false) : r[2]}</div></div>`).join('')}</div>`;

/* full-width form section inside a card */
const formCard = (title, fields, cols = 'sm:grid-cols-2', actions = '') => card(title, gridForm(fields, cols), actions);

/* list card of avatar rows */
const people = rows => `<div class="p-4 space-y-2.5">${rows.map((r, i) => `<div class="flex items-center gap-3">
<span class="avatar avatar-sm bg-${r[3] || 'ink'}-${r[3] ? '500' : '700'}">${r[0][0]}</span>
<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold clamp-1">${r[0]}</p><p class="text-[11.5px] text-ink-400 clamp-1">${r[1]}</p></div>
<span class="text-[11.5px] font-bold text-ink-500 shrink-0">${r[2]}</span></div>`).join('')}</div>`;

/* timeline */
const timeline = items => `<div class="timeline">${items.map(t => `<div class="tl-item ${t[2] ? 'is-' + t[2] : ''}"><p class="text-[13px] font-bold">${t[0]}</p><p class="text-[11.5px] text-ink-400">${t[1]}</p></div>`).join('')}</div>`;

/* progress bars list */
const bars = rows => `<div class="space-y-2.5">${rows.map(m => `<div><div class="flex justify-between text-[12px] mb-1"><span class="font-semibold text-ink-700">${m[0]}</span><span class="font-bold">${m[2] || m[1] + '%'}</span></div><div class="bar"><i style="width:${m[1]}%;background:${m[3] || '#ff2525'}"></i></div></div>`).join('')}</div>`;

/* modal wrapper */
const modal = (id, title, body, size = '') => `<div class="modal" id="${id}"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel ${size}">
<div class="card-head"><h3>${title}</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>${body}</div></div>`;

const modalFoot = (primary = 'Save changes', toast = 'Saved') => `<div class="flex gap-2 p-5 pt-0"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="${toast}">${primary}</button></div>`;

/* generic list page: stats + tabs + filters + bulk + table */
const listPage = ({ s = [], tb = [], f = [], bulk = [], cols, rows, total = 100, to = 10, extra = '', right = '', pre = '' }) =>
  `${s.length ? stats(s) : ''}${pre}${tb.length ? tabs(tb) : ''}${f.length ? filterbar(f, right) : ''}${bulk.length ? bulkbar(bulk) : ''}
${card('', table(cols, rows) + tfoot(1, to, total))}${extra}`;

/* kanban board */
const kanban = cols => `<div class="kanban">${cols.map(c => `<div class="kcol"><div class="kcol-head"><span class="flex items-center gap-2">${svg(c[1], 'w-4 h-4 text-' + c[3] + '-600')}${c[0]}<span class="badge badge-gray">${c[2].length}</span></span>
<button class="icon-btn icon-btn-sm">${svg('list', 'w-4 h-4')}</button></div>
${c[2].map(k => `<div class="kcard"><div class="flex items-start justify-between gap-2 mb-1.5"><p class="text-[12.5px] font-extrabold">${k[0]}</p><span class="badge badge-${k[4] || 'gray'} shrink-0">${k[3]}</span></div>
<p class="text-[11.5px] text-ink-500 clamp-2 mb-2">${k[1]}</p>
<div class="flex items-center gap-2 text-[11px] text-ink-400"><span class="avatar avatar-sm !w-6 !h-6 !text-[10px] bg-${c[3]}-500">${k[0][0]}</span>${k[2]}</div>
<div class="flex gap-1.5 mt-2.5">${(k[5] || [['phone', 'Call'], ['msg', 'Chat']]).map(b => `<button class="btn btn-xs btn-outline flex-1">${svg(b[0])}${b[1]}</button>`).join('')}</div></div>`).join('')}
<button class="btn btn-sm btn-ghost btn-block">${svg('plus')}Add card</button></div>`).join('')}</div>`;

/* month calendar */
const calendar = (evs = {}) => `<div class="p-4"><div class="cal">${['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => `<div class="cal-h">${d}</div>`).join('')}
${Array.from({ length: 35 }, (_, i) => { const d = i - 2; const inM = d >= 1 && d <= 31;
  return `<div class="cal-d ${inM ? '' : 'is-muted'} ${d === 17 ? 'is-today' : ''}"><p class="dnum">${inM ? d : ''}</p>
${(evs[d] || []).map(e => `<p class="cal-ev ${e[1] ? 'is-brand' : ''}">${e[0]}</p>`).join('')}</div>`; }).join('')}</div></div>`;

/* chat / inbox shell */
const chatShell = (threads, active = 0, side = '') => `<div class="card overflow-hidden"><div class="chat-wrap">
<div class="chat-list thin-scroll"><div class="p-3 border-b border-[#e7e9ef]"><div class="input-group">${svg('search')}<input class="input input-sm !min-h-[36px]" placeholder="Search conversations"></div>
<div class="flex gap-1.5 mt-2 overflow-x-auto no-scrollbar">${['All', 'Unread', 'Orders', 'Leads', 'Flagged'].map((t, i) => `<button class="chip !h-7 !text-[11.5px] ${i === 0 ? 'is-active' : ''}">${t}</button>`).join('')}</div></div>
${threads.map((t, i) => `<div class="chat-item ${i === active ? 'is-active' : ''}"><span class="avatar avatar-md bg-${t[4] || 'ink'}-${t[4] ? '500' : '700'}">${t[0][0]}</span>
<div class="min-w-0 flex-1"><div class="flex items-center justify-between gap-2"><p class="text-[13px] font-bold clamp-1">${t[0]}</p><span class="text-[10.5px] text-ink-400 shrink-0">${t[2]}</span></div>
<p class="text-[12px] text-ink-500 clamp-1">${t[1]}</p>
<div class="flex items-center gap-1.5 mt-1">${t[5] ? `<span class="badge badge-${t[6] || 'gray'} !text-[10px]">${t[5]}</span>` : ''}${t[3] ? `<span class="badge badge-solid !text-[10px] ml-auto">${t[3]}</span>` : ''}</div></div></div>`).join('')}</div>
<div class="chat-body"><div class="flex items-center gap-3 p-3.5 border-b border-[#e7e9ef]">
<span class="avatar avatar-md bg-brand-500">${threads[active][0][0]}</span>
<div class="min-w-0"><p class="text-[13.5px] font-extrabold">${threads[active][0]}</p><p class="text-[11.5px] text-service-600 flex items-center gap-1">${svg('check', 'w-3 h-3')}Online · typically replies in 20 min</p></div>
<div class="ml-auto flex gap-1"><button class="icon-btn">${svg('phone')}</button><button class="icon-btn">${svg('bag')}</button><button class="icon-btn">${svg('flag')}</button>
<div data-dropdown><button data-dropdown-toggle class="icon-btn">${svg('list')}</button><div data-dropdown-menu class="right-0">
${[['user', 'View profile'], ['bag', 'View orders'], ['ticket', 'Send voucher'], ['archive', 'Archive chat'], ['flag', 'Report user'], ['ban', 'Block user']].map(a => `<a class="dd-item">${svg(a[0])}${a[1]}</a>`).join('')}</div></div></div></div>
<div class="chat-scroll thin-scroll space-y-3">
<p class="text-center text-[11px] text-ink-400">Today · 17 Aug 2026</p>
<div><div class="bubble bubble-in">Hello, is the Realme C100X still available in green? I need it delivered by tomorrow to Banani.</div><p class="bubble-time">10:12 AM</p></div>
<div><div class="bubble bubble-out">Yes, we have 12 units of the green 6/128GB variant in stock. Same-day dispatch if you order before 4 PM.</div><p class="bubble-time text-right">10:14 AM ✓✓</p></div>
<div><div class="bubble bubble-in">Great. Does it come with the official warranty and free delivery?</div><p class="bubble-time">10:15 AM</p></div>
<div><div class="bubble bubble-out">1 year official Realme warranty + free delivery inside Dhaka. Here is the product link.</div>
<div class="bubble bubble-out mt-1.5 !bg-white !text-ink-900 border border-[#e7e9ef]"><div class="flex gap-2.5">${ph(0, 'phoneDev', 'w-12 h-12 rounded-lg shrink-0')}
<div class="min-w-0"><p class="text-[12.5px] font-bold clamp-1">Realme C100X 6/128GB</p><p class="text-[12px] font-extrabold text-brand-600">৳11,290</p></div></div></div>
<p class="bubble-time text-right">10:16 AM ✓✓</p></div>
<div><div class="bubble bubble-in">Perfect, ordering now. Thank you!</div><p class="bubble-time">10:22 AM</p></div></div>
<div class="p-3 border-t border-[#e7e9ef]">
<div class="flex flex-wrap gap-1.5 mb-2">${['Thanks for reaching out!', 'Yes, in stock ✅', 'Sharing the price now', 'Delivery in 2–3 days'].map(q => `<button class="chip !h-7 !text-[11.5px]">${q}</button>`).join('')}</div>
<div class="flex items-end gap-2"><button class="icon-btn">${svg('camera')}</button><button class="icon-btn">${svg('file')}</button><button class="icon-btn">${svg('bag')}</button>
<textarea class="textarea !min-h-[42px] !py-2.5" placeholder="Type your message… (never share phone numbers or outside payment links)"></textarea>
<button class="btn btn-primary btn-icon shrink-0">${svg('send')}</button></div></div></div>
${side || `<aside class="hidden 2xl:block border-l border-[#e7e9ef] p-4 overflow-y-auto thin-scroll space-y-4">
<div><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Customer</p>
<div class="flex items-center gap-2.5 mb-2"><span class="avatar avatar-md bg-brand-500">K</span><div><p class="text-[13px] font-bold">Kamal Uddin</p><p class="text-[11.5px] text-ink-400">Member since 2023</p></div></div>
${kv([['Total orders', '14'], ['Lifetime value', '৳1,84,200'], ['Return rate', '3%'], ['Location', 'Banani, Dhaka']])}</div>
<div><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Recent orders</p>
<div class="space-y-2">${[['HB-884213', '৳11,290', 'Shipped'], ['HB-883120', '৳2,450', 'Delivered'], ['HB-881044', '৳750', 'Delivered']].map(o => `<div class="flex items-center justify-between text-[12px] p-2 rounded-lg bg-ink-50"><b>${o[0]}</b><span>${o[1]}</span>${st(o[2])}</div>`).join('')}</div></div>
<div><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Internal note</p>
<textarea class="textarea !min-h-[70px] !text-[12px]" placeholder="Only your team can see this"></textarea>
<button class="btn btn-sm btn-outline btn-block mt-2">Save note</button></div></aside>`}
</div></div>`;

module.exports = Object.assign({}, D, { cb, mini, tiles, kv, note, fld, inp, sel, ta, sw, chk, gridForm, frows, formCard, people, timeline, bars, modal, modalFoot, listPage, kanban, calendar, chatShell });
