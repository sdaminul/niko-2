/* Dashboard shell builder — customer / vendor / admin */
const { svg, ph, stars, tk } = require('./ui');
const { head, foot_js } = require('./layout');
const R = '../';

/* ------------------------------- Menus ---------------------------------- */
const MENUS = {
  user: [
    ['Overview', [['dashboard.html', 'gauge', 'Dashboard', '']]],
    ['Shopping', [['orders.html', 'box', 'My Orders', '8'], ['returns.html', 'return', 'Returns &amp; Cancellations', ''], ['bookings.html', 'wrench', 'Service Bookings', '2'], ['wishlist.html', 'heart', 'Wishlist', '14'], ['reviews.html', 'star', 'My Reviews', '']]],
    ['Payments', [['wallet.html', 'wallet', 'Wallet &amp; Payments', ''], ['vouchers.html', 'ticket', 'Vouchers &amp; Rewards', '5']]],
    ['Account', [['addresses.html', 'pin', 'Address Book', ''], ['profile.html', 'user', 'My Profile', ''], ['notifications.html', 'bell', 'Notifications', '3'], ['messages.html', 'msg', 'Messages', '2'], ['support.html', 'question', 'Support Tickets', ''], ['settings.html', 'cog', 'Settings', '']]]
  ],
  vendor: [
    ['Overview', [['dashboard.html', 'gauge', 'Dashboard', ''], ['analytics.html', 'chart', 'Analytics &amp; Insights', '']]],
    ['Product Business', [['products.html', 'box', 'All Products', '248'], ['add-product.html', 'plus', 'Add New Product', ''], ['inventory.html', 'layers', 'Inventory &amp; Stock', '6'], ['orders.html', 'bag', 'Orders', '32'], ['returns.html', 'return', 'Returns &amp; Refunds', '4'], ['shipping.html', 'truck', 'Shipping &amp; Couriers', ''], ['questions.html', 'question', 'Product Q&amp;A', '9']]],
    ['Service Business', [['services.html', 'wrench', 'Service Listings', '18'], ['add-service.html', 'plus', 'Add New Service', ''], ['leads.html', 'phone', 'Leads &amp; Enquiries', '12'], ['bookings.html', 'cal', 'Bookings', '7'], ['business-profile.html', 'pin', 'Business Profile', '']]],
    ['Customers', [['customers.html', 'users', 'My Customers', ''], ['reviews.html', 'star', 'Reviews &amp; Ratings', '3'], ['messages.html', 'msg', 'Messages', '5']]],
    ['Growth', [['promotions.html', 'ticket', 'Promotions &amp; Vouchers', ''], ['ads.html', 'bolt', 'Ads &amp; Boost', ''], ['academy.html', 'graduation', 'Seller Academy', '']]],
    ['Finance', [['payouts.html', 'bank', 'Payouts &amp; Balance', ''], ['transactions.html', 'money', 'Transactions', ''], ['invoices.html', 'receipt', 'Invoices &amp; Tax', ''], ['reports.html', 'file', 'Reports &amp; Statements', '']]],
    ['My Store', [['shop-profile.html', 'store', 'Shop Profile', ''], ['staff.html', 'key', 'Staff &amp; Permissions', ''], ['documents.html', 'idcard', 'Verification &amp; KYC', '1'], ['subscription.html', 'award', 'Plan &amp; Billing', '']]],
    ['Account', [['notifications.html', 'bell', 'Notifications', '4'], ['settings.html', 'cog', 'Settings', '']]]
  ],
  admin: [
    ['Overview', [['dashboard.html', 'gauge', 'Dashboard', ''], ['analytics.html', 'chart', 'Traffic &amp; Analytics', ''], ['reports.html', 'file', 'Reports Centre', '']]],
    ['Catalog', [['products.html', 'box', 'Products', ''], ['product-approvals.html', 'check', 'Product Approvals', '86'], ['categories.html', 'layers', 'Categories', ''], ['brands.html', 'award', 'Brands', ''], ['attributes.html', 'sliders', 'Attributes &amp; Specs', ''], ['inventory.html', 'pkg', 'Stock Overview', '']]],
    ['Services', [['services.html', 'wrench', 'Service Listings', ''], ['service-approvals.html', 'check', 'Listing Approvals', '27'], ['service-categories.html', 'grid', 'Service Categories', ''], ['bookings.html', 'cal', 'Bookings', ''], ['leads.html', 'phone', 'Leads &amp; Quotes', '']]],
    ['Sales', [['orders.html', 'bag', 'Orders', '412'], ['shipping.html', 'truck', 'Shipments &amp; Couriers', ''], ['disputes.html', 'flag', 'Returns &amp; Disputes', '24'], ['abandoned-carts.html', 'cart', 'Abandoned Carts', ''], ['invoices.html', 'receipt', 'Invoices', '']]],
    ['Finance', [['transactions.html', 'money', 'Transactions', ''], ['payouts.html', 'bank', 'Vendor Payouts', '18'], ['commissions.html', 'percent', 'Commission Plans', ''], ['gift-cards.html', 'gift', 'Gift Cards &amp; Wallets', ''], ['taxes.html', 'scale', 'Tax &amp; VAT', '']]],
    ['People', [['customers.html', 'users', 'Customers', ''], ['vendors.html', 'store', 'Vendors', ''], ['vendor-approvals.html', 'shield', 'Vendor Approvals', '31'], ['kyc.html', 'idcard', 'KYC Verification', '14'], ['staff.html', 'key', 'Staff &amp; Admins', ''], ['roles.html', 'lock', 'Roles &amp; Permissions', '']]],
    ['Marketing', [['cms.html', 'paint', 'Homepage &amp; Banners', ''], ['campaigns.html', 'rocket', 'Campaigns &amp; Flash Sales', ''], ['promotions.html', 'ticket', 'Coupons &amp; Vouchers', ''], ['ads.html', 'megaphone', 'Ads Manager', ''], ['notifications.html', 'bell', 'Push &amp; Broadcast', ''], ['seo.html', 'globe', 'SEO Manager', '']]],
    ['Content', [['pages.html', 'file', 'Static Pages', ''], ['blog.html', 'book', 'Blog &amp; Guides', ''], ['media.html', 'image', 'Media Library', ''], ['faq.html', 'question', 'Help Centre', ''], ['email-templates.html', 'mail', 'Email &amp; SMS Templates', '']]],
    ['Moderation', [['reviews.html', 'star', 'Reviews', '47'], ['questions.html', 'msg', 'Q&amp;A Moderation', '18'], ['moderation.html', 'ban', 'Reports &amp; Abuse', '12']]],
    ['Support', [['tickets.html', 'question', 'Support Tickets', '63'], ['chats.html', 'msg', 'Live Chat Monitor', '4']]],
    ['System', [['settings.html', 'cog', 'Platform Settings', ''], ['locations.html', 'pin', 'Locations &amp; Zones', ''], ['payment-methods.html', 'wallet', 'Payment Methods', ''], ['integrations.html', 'cloud', 'Integrations &amp; API', ''], ['activity.html', 'db', 'Audit Log', ''], ['logs.html', 'terminal', 'System Logs', ''], ['system-health.html', 'server', 'System Health', '']]]
  ]
};


const ROLE = {
  user: { base: 'user/', title: 'My Account', sub: 'Customer', name: 'Nusrat Jahan', initial: 'N', tag: 'Gold member', home: 'dashboard.html' },
  vendor: { base: 'vendor/', title: 'Seller Centre', sub: 'Vendor', name: 'Rahim Electric', initial: 'R', tag: 'Verified Pro seller', home: 'dashboard.html' },
  admin: { base: 'admin/', title: 'Admin Panel', sub: 'Control room', name: 'Arif Hossain', initial: 'A', tag: 'Super admin', home: 'dashboard.html' }
};

const sidebar = (role, active) => {
  const r = ROLE[role];
  return `<aside class="sidebar" id="sidebar">
<div class="sidebar-brand"><a href="${R}index.html" class="flex items-center gap-2.5"><span class="logo-mark">H</span>
<span class="logo-text">HaatBazar<small>${r.title}</small></span></a>
<button class="ml-auto lg:hidden text-white/60 hover:text-white" data-drawer-close>${svg('x', 'w-5 h-5')}</button></div>
<div class="sidebar-scroll thin-scroll">${MENUS[role].map(g => `<div class="nav-group"><p class="nav-title">${g[0]}</p>
${g[1].map(i => `<a href="${i[0]}" class="sb-item ${i[0] === active ? 'is-active' : ''}">${svg(i[1])}<span class="lbl">${i[2]}</span>${i[3] ? `<span class="pill">${i[3]}</span>` : ''}</a>`).join('')}</div>`).join('')}
<div class="nav-group"><p class="nav-title">Shortcuts</p>
<a href="${R}index.html" class="sb-item">${svg('globe')}<span class="lbl">View storefront</span></a>
<a href="${R}help-center.html" class="sb-item">${svg('question')}<span class="lbl">Help centre</span></a>
<a href="${R}login.html" class="sb-item">${svg('lock')}<span class="lbl">Sign out</span></a></div></div>
<div class="sidebar-foot"><div class="sb-user"><span class="avatar avatar-sm bg-brand-500">${r.initial}</span>
<div class="meta min-w-0"><p class="name clamp-1">${r.name}</p><p class="role">${r.tag}</p></div>
<button class="meta ml-auto text-white/40 hover:text-white">${svg('chevR', 'w-4 h-4')}</button></div></div></aside>`;
};

const topbar = (role, title) => {
  const r = ROLE[role];
  return `<header class="topbar">
<button class="icon-btn lg:hidden" data-drawer-open="sidebar-drawer">${svg('menu')}</button>
<button class="icon-btn hidden lg:grid" data-sb-toggle>${svg('menu')}</button>
<div class="topbar-search hidden sm:block">${svg('search')}<input placeholder="${role === 'admin' ? 'Search orders, users, vendors, products…' : role === 'vendor' ? 'Search products, orders, leads…' : 'Search orders, products, services…'}"></div>
<div class="ml-auto flex items-center gap-1.5">
${role === 'vendor' ? `<a href="add-product.html" class="btn btn-sm btn-primary hidden md:inline-flex">${svg('plus')}Add product</a>` : ''}
${role === 'admin' ? `<span class="badge badge-green hidden md:inline-flex">${svg('shield')}All systems normal</span>` : ''}
${role === 'user' ? `<a href="${R}products.html" class="btn btn-sm btn-outline hidden md:inline-flex">${svg('bag')}Continue shopping</a>` : ''}
<div data-dropdown><button data-dropdown-toggle class="icon-btn">${svg('bell')}<span class="dot">3</span></button>
<div data-dropdown-menu class="right-0 !min-w-[320px] !p-0"><div class="flex items-center justify-between px-3.5 py-2.5 border-b border-[#f0f1f5]"><p class="text-[13px] font-extrabold">Notifications</p><button class="text-[12px] font-bold text-brand-600">Mark all read</button></div>
<div class="max-h-[300px] overflow-auto thin-scroll">${[['box', 'Order HB-884213 shipped', '12 min ago', 'brand'], ['star', 'New 5-star review received', '1 hour ago', 'gold'], ['wallet', 'Payout ৳48,200 completed', 'Yesterday', 'service']].map(n => `<a class="flex gap-2.5 px-3.5 py-3 hover:bg-ink-50 border-b border-[#f6f7f9]"><span class="w-8 h-8 rounded-lg bg-${n[3]}-50 text-${n[3]}-600 grid place-items-center shrink-0">${svg(n[0], 'w-4 h-4')}</span><div class="min-w-0"><p class="text-[12.5px] font-bold clamp-1">${n[1]}</p><p class="text-[11px] text-ink-400">${n[2]}</p></div></a>`).join('')}</div>
<a href="notifications.html" class="block text-center py-2.5 text-[12.5px] font-bold text-brand-600">View all notifications</a></div></div>
<div data-dropdown><button data-dropdown-toggle class="icon-btn">${svg('msg')}<span class="dot">5</span></button>
<div data-dropdown-menu class="right-0 !min-w-[300px]"><div class="dd-label">Recent messages</div>
${[['Kamal Uddin', 'Is the AC still in stock?'], ['Sadia Rahman', 'Thanks for the fast delivery!'], ['HaatBazar Support', 'Your ticket has been updated']].map(m => `<a href="messages.html" class="dd-item"><span class="avatar avatar-sm bg-ink-700">${m[0][0]}</span><span class="min-w-0"><span class="block text-[12.5px] font-bold">${m[0]}</span><span class="block text-[11.5px] text-ink-400 clamp-1">${m[1]}</span></span></a>`).join('')}
<div class="dd-sep"></div><a href="messages.html" class="dd-item !justify-center !text-brand-600">Open inbox</a></div></div>
<div data-dropdown class="ml-1"><button data-dropdown-toggle class="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-ink-50">
<span class="avatar avatar-sm bg-brand-500">${r.initial}</span><span class="hidden sm:block text-left"><span class="block text-[12.5px] font-extrabold leading-tight">${r.name}</span><span class="block text-[11px] text-ink-400">${r.tag}</span></span>${svg('chevD', 'w-4 h-4 text-ink-400')}</button>
<div data-dropdown-menu class="right-0"><div class="dd-label">Account</div>
<a href="${role === 'admin' ? 'settings.html' : 'profile.html'}" class="dd-item">${svg('user')}My profile</a>
<a href="settings.html" class="dd-item">${svg('cog')}Settings</a>
${role === 'user' ? `<a href="wallet.html" class="dd-item">${svg('wallet')}Wallet — ৳2,480</a>` : ''}
${role === 'vendor' ? `<a href="payouts.html" class="dd-item">${svg('bank')}Balance — ৳1,84,320</a><a href="shop-profile.html" class="dd-item">${svg('store')}My shop page</a>` : ''}
${role === 'admin' ? `<a href="activity.html" class="dd-item">${svg('db')}Activity log</a>` : ''}
<div class="dd-sep"></div><a href="${R}help-center.html" class="dd-item">${svg('question')}Help centre</a>
<a href="${R}login.html" class="dd-item is-danger">${svg('lock')}Sign out</a></div></div></div></header>`;
};

const dashPage = ({ role, title, sub, active, actions = '', body, crumbs = [] }) => `${head(title, 'HaatBazar dashboard', true)}
</head><body class="bg-canvas"><div class="dash" id="dash">
${sidebar(role, active)}
<div class="drawer lg:hidden" id="sidebar-drawer"><div class="drawer-backdrop" data-drawer-close></div><div class="drawer-panel !bg-ink-950 !p-0">${sidebar(role, active).replace('class="sidebar"', 'class="sidebar !static !w-full"')}</div></div>
<div class="main">${topbar(role, title)}
<div class="page">
<div class="page-head"><div><nav class="crumb mb-1.5"><a href="${ROLE[role].home}">${ROLE[role].title}</a>${crumbs.map(c => `${svg('chevR')}<span class="is-current">${c}</span>`).join('')}</nav>
<h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}</div>
<div class="flex flex-wrap items-center gap-2">${actions}</div></div>
${body}
</div>
<footer class="px-5 py-4 border-t border-[#e7e9ef] bg-white flex flex-wrap items-center justify-between gap-2 text-[12px] text-ink-400">
<p>© 2026 HaatBazar Ltd. All rights reserved.</p>
<div class="flex gap-4"><a href="${R}terms.html" class="hover:text-brand-600">Terms</a><a href="${R}privacy-policy.html" class="hover:text-brand-600">Privacy</a><a href="${R}help-center.html" class="hover:text-brand-600">Help</a><span>v4.2.0</span></div></footer></div></div>
${foot_js(true)}`;

/* ------------------------------ UI helpers ------------------------------- */
const stat = (s) => `<div class="stat">
<div class="flex items-start justify-between mb-3"><span class="ico bg-${s[4] || 'brand'}-50 text-${s[4] || 'brand'}-600">${svg(s[3])}</span>
${s[2] ? `<span class="trend ${s[2][0] === '-' ? 'down' : 'up'}">${svg(s[2][0] === '-' ? 'down' : 'up')}${s[2].replace('-', '')}</span>` : ''}</div>
<p class="val">${s[1]}</p><p class="lbl">${s[0]}</p>${s[5] ? `<p class="text-[11.5px] text-ink-400 mt-1.5">${s[5]}</p>` : ''}</div>`;

const stats = arr => `<div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-4">${arr.map(stat).join('')}</div>`;

const card = (title, body, actions = '', cls = '') => `<div class="card ${cls}">${title ? `<div class="card-head"><h3>${title}</h3><div class="flex items-center gap-2">${actions}</div></div>` : ''}${body}</div>`;

const lineChart = (pts, color = '#ff2525', h = 180) => {
  const max = Math.max(...pts), w = 640, st = w / (pts.length - 1);
  const p = pts.map((v, i) => `${i * st},${h - (v / max) * (h - 24) - 8}`).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" class="w-full" style="height:${h}px" preserveAspectRatio="none">
<defs><linearGradient id="g${color.slice(1)}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${color}" stop-opacity=".24"/><stop offset="100%" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
${[0, 1, 2, 3].map(i => `<line x1="0" y1="${(h / 4) * i + 8}" x2="${w}" y2="${(h / 4) * i + 8}" stroke="#eceef2" stroke-width="1"/>`).join('')}
<polygon points="0,${h} ${p} ${w},${h}" fill="url(#g${color.slice(1)})"/>
<polyline points="${p}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
${pts.map((v, i) => `<circle cx="${i * st}" cy="${h - (v / max) * (h - 24) - 8}" r="3" fill="#fff" stroke="${color}" stroke-width="2"/>`).join('')}</svg>`;
};

const barChart = (pts, labels, color = '#ff2525', h = 180) => {
  const max = Math.max(...pts), w = 640, bw = w / pts.length;
  return `<svg viewBox="0 0 ${w} ${h + 18}" class="w-full" style="height:${h + 18}px">
${pts.map((v, i) => `<rect x="${i * bw + bw * .2}" y="${h - (v / max) * (h - 10)}" width="${bw * .6}" height="${(v / max) * (h - 10)}" rx="4" fill="${i === pts.length - 1 ? color : color + '66'}"/>
<text x="${i * bw + bw * .5}" y="${h + 13}" text-anchor="middle" font-size="10" fill="#8792a6">${labels[i]}</text>`).join('')}</svg>`;
};

const donut = (segs, center) => {
  let off = 0, C = 2 * Math.PI * 42;
  return `<div class="relative w-[168px] h-[168px] mx-auto"><svg viewBox="0 0 100 100" class="w-full h-full -rotate-90">
<circle cx="50" cy="50" r="42" fill="none" stroke="#eceef2" stroke-width="13"/>
${segs.map(s => { const dash = (s[1] / 100) * C; const el = `<circle cx="50" cy="50" r="42" fill="none" stroke="${s[2]}" stroke-width="13" stroke-dasharray="${dash} ${C - dash}" stroke-dashoffset="${-off}" stroke-linecap="butt"/>`; off += dash; return el; }).join('')}</svg>
<div class="absolute inset-0 grid place-items-center text-center"><div><p class="donut-center">${center[0]}</p><p class="text-[11.5px] text-ink-400">${center[1]}</p></div></div></div>
<div class="chart-legend justify-center mt-4">${segs.map(s => `<span><i style="background:${s[2]}"></i>${s[0]} · ${s[1]}%</span>`).join('')}</div>`;
};

const hbars = rows => `<div class="hbar">${rows.map(r => `<div class="hbar-row"><span class="text-ink-600 font-semibold truncate">${r[0]}</span>
<span class="hbar-track"><i class="hbar-fill" style="width:${r[1]}%;background:${r[3] || '#ff2525'}"></i></span>
<span class="num text-right font-bold text-ink-800">${r[2]}</span></div>`).join('')}</div>`;

const filterbar = (fields, right = '') => `<div class="card p-3 mb-4"><div class="filterbar">
${fields.map(f => f === 'search' ? `<div class="input-group flex-1 min-w-[200px]">${svg('search')}<input class="input input-sm !min-h-[38px]" placeholder="Search…"></div>`
  : f === 'date' ? `<input type="date" class="input input-sm !w-auto">`
    : Array.isArray(f) ? `<select class="select input-sm !w-auto">${f.map(o => `<option>${o}</option>`).join('')}</select>` : f).join('')}
<button class="btn btn-sm btn-outline">${svg('filter')}More filters</button>
<button class="btn btn-sm btn-ghost">${svg('refresh')}Reset</button>
<div class="ml-auto flex gap-2">${right || `<button class="btn btn-sm btn-outline">${svg('dl')}Export</button>`}</div></div></div>`;

const tabs = (items, cls = '') => `<div class="tabs ${cls} mb-4" data-tabs>${items.map((t, i) => `<button class="tab ${i === 0 ? 'is-active' : ''}" data-tab="t${i}">${t[0]}${t[1] ? `<span class="count">${t[1]}</span>` : ''}</button>`).join('')}</div>`;

const table = (cols, rows, opts = {}) => `<div class="tbl-wrap"><table class="tbl ${opts.compact ? 'tbl-compact' : ''}">
<thead><tr>${opts.check ? `<th class="w-10"><input type="checkbox" data-check-all></th>` : ''}${cols.map(c => `<th${c[1] ? ` class="${c[1]}"` : ''}>${c[0]}</th>`).join('')}</tr></thead>
<tbody>${rows.map(r => `<tr>${opts.check ? `<td><input type="checkbox" data-check-row></td>` : ''}${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

const tfoot = (from = 1, to = 10, total = 248) => `<div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-[#f0f1f5]">
<p class="text-[12.5px] text-ink-500">Showing <b>${from}–${to}</b> of <b>${total}</b> entries</p>
<div class="flex items-center gap-3"><select class="select input-sm !w-auto"><option>10 / page</option><option>25 / page</option><option>50 / page</option><option>100 / page</option></select>
<div class="pager"><a>${svg('chevL', 'w-3.5 h-3.5')}</a><span class="is-current">1</span><a>2</a><a>3</a><a>…</a><a>${Math.ceil(total / 10)}</a><a>${svg('chevR', 'w-3.5 h-3.5')}</a></div></div></div>`;

const bulkbar = (actions) => `<div class="bulkbar"><span class="text-[12.5px] font-bold"><b data-sel-count>3</b> selected</span>
${actions.map(a => `<button class="btn btn-xs btn-outline">${a}</button>`).join('')}
<button class="btn btn-xs btn-ghost ml-auto">Clear</button></div>`;

const st = (s) => { const m = { New: 'new', Pending: 'pending', Processing: 'progress', Confirmed: 'progress', Shipped: 'ship', 'In transit': 'ship', Delivered: 'done', Completed: 'done', Paid: 'done', Active: 'done', Approved: 'done', Cancelled: 'cancel', Rejected: 'cancel', Failed: 'cancel', Refunded: 'hold', Draft: 'draft', 'On hold': 'hold', Suspended: 'cancel', Closed: 'hold', Open: 'new', Resolved: 'done', 'Out of stock': 'cancel', 'Low stock': 'pending', 'In stock': 'done', Scheduled: 'progress', Contacted: 'progress', Won: 'done', Lost: 'cancel', Unpaid: 'pending', Verified: 'done', Unverified: 'pending', Escalated: 'cancel', Returned: 'hold', Inactive: 'hold', Published: 'done' }; return `<span class="st st-${m[s] || 'hold'}">${s}</span>`; };

const empty = (icon, title, text, action) => `<div class="empty"><div class="ico">${svg(icon)}</div><h4>${title}</h4><p>${text}</p>${action}</div>`;

const prow = (i, name, meta, icon = 'pkg') => `<div class="flex items-center gap-2.5 min-w-[220px]">${ph(i, icon, 'w-10 h-10 rounded-lg shrink-0')}
<div class="min-w-0"><p class="text-[13px] font-bold text-ink-900 clamp-1">${name}</p><p class="text-[11.5px] text-ink-400">${meta}</p></div></div>`;

const actionsCell = (items) => `<div data-dropdown class="inline-block"><button data-dropdown-toggle class="btn btn-xs btn-outline">${svg('list', 'w-3.5 h-3.5')}</button>
<div data-dropdown-menu class="right-0 !min-w-[180px]">${items.map(i => `<a class="dd-item ${i[2] ? 'is-danger' : ''}" ${i[3] ? `href="${i[3]}"` : ''}>${svg(i[1])}${i[0]}</a>`).join('')}</div></div>`;

module.exports = { dashPage, stats, stat, card, lineChart, barChart, donut, hbars, filterbar, tabs, table, tfoot, bulkbar, st, empty, prow, actionsCell, svg, ph, stars, tk, R, sidebar, topbar, MENUS, ROLE };


