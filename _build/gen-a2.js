/* Admin catalog: products, product-approvals, categories, brands, attributes, inventory */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, svg, ph, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, tiles, mini, timeline, hbars, donut, lineChart, barChart, modal, modalFoot, stars, empty } = K;
const { AD, btn, A, row2, row3 } = R;

/* ---------------------------- PRODUCTS -------------------------------- */
AD('products.html', {
  title: 'Products', sub: 'Every product listing across all vendors on the marketplace.', crumb: 'Products',
  actions: [['Import CSV', 'up'], ['Export', 'dl'], ['Add product', 'plus', 'primary']],
  stats: [['Total products', '3,90,000', '+11%', 'box', 'brand', 'Across 8,642 vendors'],
    ['Live & in stock', '3,42,180', '+9%', 'check', 'service', '87.7% of catalog'],
    ['Out of stock', '32,420', '+4%', 'warn', 'gold', 'Auto-hidden from search'],
    ['Blocked / removed', '2,860', '', 'ban', 'ink', 'Policy violations']],
  tabs: [['All', '3,90,000'], ['Live', '3,42,180'], ['Pending approval', '86'], ['Draft', '12,480'], ['Out of stock', '32,420'], ['Rejected', '1,842'], ['Blocked', '2,860'], ['Reported', '124']],
  filters: ['search', ['All categories', 'Electronics', 'Fashion', 'Home & Kitchen', 'Grocery', 'Health & Beauty', 'Mobile & Gadgets'], ['All vendors', 'Rahim Electric', 'Gadget World BD', 'Style Hub', 'Fresh Mart'], ['All brands', 'Samsung', 'Walton', 'Realme', 'Gree'], ['All statuses', 'Live', 'Pending', 'Rejected', 'Blocked'], ['Stock: All', 'In stock', 'Low stock', 'Out of stock'], 'date', ['Sort: Newest', 'Best selling', 'Most viewed', 'Price high–low']],
  fbtns: btn('Saved filters', 'save') + btn('Export', 'dl'),
  bulk: ['Approve', 'Reject', 'Block listing', 'Feature product', 'Change category', 'Recalculate commission', 'Reindex search', 'Export'],
  head: ['Product', 'SKU / ID', 'Vendor', 'Category', 'Brand', 'Price', 'Commission', 'Stock', 'Sold', 'Views', 'Rating', 'Status', ['Actions', 'text-right']],
  rows: [
    [prow(0, 'Realme C100X 6/128GB 8000mAh', 'Added 12 Aug 2026 · 8 images · 2 variants'), '<code class="text-[11px]">RC100X-BLK</code><p class="text-[11px] text-ink-400">#PRD-884213</p>', '<a href="vendors.html" class="link">Rahim Electric</a>', 'Mobile › Smartphones', 'Realme', `<b>${tk(11290)}</b><p class="text-[11px] text-ink-400 line-through">${tk(13990)}</p>`, '8% · ' + tk(903), '<b>124</b>', '842', '48.2K', '4.8 ★ (312)', st('Live'), A([['View on site', 'globe'], ['Edit listing', 'edit'], ['Change category', 'layers'], ['Set commission', 'percent'], ['Feature product', 'award'], ['Boost in search', 'bolt'], ['Block listing', 'ban', 1], ['Delete', 'trash', 1]])],
    [prow(1, 'Gree 1.5 Ton Inverter AC GS-18XPUV', 'Added 02 Aug 2026 · 12 images'), '<code class="text-[11px]">GREE-18XPUV</code><p class="text-[11px] text-ink-400">#PRD-884102</p>', '<a href="vendors.html" class="link">Rahim Electric</a>', 'Home › Air conditioner', 'Gree', `<b>${tk(68900)}</b>`, '6% · ' + tk(4134), '<b class="text-brand-600">2</b>', '184', '32.4K', '4.9 ★ (86)', st('Live'), A([['View on site', 'globe'], ['Edit listing', 'edit'], ['Low stock alert', 'bell'], ['Block listing', 'ban', 1]])],
    [prow(2, 'Xiaomi Redmi Note 13 Pro 8/256GB', 'Submitted 17 Aug 2026 · awaiting review'), '<code class="text-[11px]">RN13P-256</code><p class="text-[11px] text-ink-400">#PRD-884401</p>', '<a href="vendors.html" class="link">Gadget World BD</a>', 'Mobile › Smartphones', 'Xiaomi', `<b>${tk(32990)}</b>`, '8% · ' + tk(2639), '48', '—', '—', '—', st('Pending'), A([['Review listing', 'eye'], ['Approve', 'check'], ['Request changes', 'edit'], ['Reject', 'x', 1]])],
    [prow(3, 'Premium Jamdani Saree — Handloom', 'Added 28 Jul 2026 · 6 images'), '<code class="text-[11px]">JAM-SR-042</code><p class="text-[11px] text-ink-400">#PRD-883210</p>', '<a href="vendors.html" class="link">Style Hub</a>', 'Fashion › Sarees', 'Local artisan', `<b>${tk(8450)}</b>`, '12% · ' + tk(1014), '<b>36</b>', '284', '18.6K', '4.7 ★ (142)', st('Live'), A([['View on site', 'globe'], ['Edit listing', 'edit'], ['Feature product', 'award']])],
    [prow(4, 'Fake "Samsung" Charger 25W', 'Reported 3 times · counterfeit claim'), '<code class="text-[11px]">CHG-25W-X</code><p class="text-[11px] text-ink-400">#PRD-882104</p>', '<a href="vendors.html" class="link">Mobile Zone</a>', 'Mobile › Accessories', 'Samsung (claimed)', tk(890), '10%', '0', '42', '8.2K', '2.1 ★ (18)', st('Blocked'), A([['View report', 'flag'], ['Unblock', 'refresh'], ['Warn vendor', 'warn'], ['Delete permanently', 'trash', 1]])],
    [prow(5, 'Walton Fridge WFC-3F5-GDXX 358L', 'Added 14 Jul 2026'), '<code class="text-[11px]">WFC-3F5</code><p class="text-[11px] text-ink-400">#PRD-881420</p>', '<a href="vendors.html" class="link">Walton Plaza</a>', 'Home › Refrigerator', 'Walton', `<b>${tk(54900)}</b>`, '5% · ' + tk(2745), '<b>18</b>', '96', '24.8K', '4.6 ★ (64)', st('Live'), A([['View on site', 'globe'], ['Edit listing', 'edit'], ['Set commission', 'percent']])],
    [prow(6, 'Organic Honey 500g — Sundarban', 'Rejected 15 Aug · missing BSTI certificate'), '<code class="text-[11px]">HNY-500</code><p class="text-[11px] text-ink-400">#PRD-884288</p>', '<a href="vendors.html" class="link">Fresh Mart</a>', 'Grocery › Honey', 'Local', tk(680), '15%', '—', '—', '—', '—', st('Rejected'), A([['View reason', 'info'], ['Re-review', 'refresh'], ['Message vendor', 'msg']])]
  ], total: 390000,
  after: row3(card('Catalog quality', `<div class="p-4">${[['Complete listings (all fields)', 78], ['With 5+ images', 64], ['With video', 18], ['With full specifications', 71], ['With warranty info', 58], ['SEO-optimised title', 82]].map(q => `<div class="mb-2.5"><div class="flex justify-between text-[12px] mb-1"><span class="font-semibold">${q[0]}</span><b>${q[1]}%</b></div><div class="pbar"><i style="width:${q[1]}%"></i></div></div>`).join('')}
<div class="flex gap-2 mt-2">${btn('Quality report', 'file')}${btn('Notify vendors', 'bell')}</div></div>`),
    card('Listings by category', `<div class="p-4">${hbars([['Fashion & Lifestyle', 92, '1,12,480'], ['Electronics', 78, '86,240', '#00b894'], ['Home & Kitchen', 64, '68,420', '#ffb020'], ['Health & Beauty', 48, '42,180', '#8b5cf6'], ['Grocery', 38, '32,640', '#6c7a91'], ['Others', 44, '48,040', '#b42318']])}</div>`),
    card('Bulk tools', `<div class="p-4 space-y-2">${[['Import products (CSV/Excel)', 'up'], ['Bulk price update', 'money'], ['Bulk category re-map', 'layers'], ['Bulk commission override', 'percent'], ['Re-index search catalog', 'refresh'], ['Detect duplicate listings', 'copy'], ['Find prohibited keywords', 'ban'], ['Image quality scan', 'image']].map(t => `<button class="w-full flex items-center gap-2.5 p-2.5 rounded-xl border border-[#e7e9ef] text-left hover:border-brand-300">
${svg(t[1], 'w-4 h-4 text-ink-400 shrink-0')}<span class="text-[12.5px] font-semibold flex-1">${t[0]}</span>${svg('chevR', 'w-3.5 h-3.5 text-ink-300')}</button>`).join('')}</div>`))
});

/* ------------------------ PRODUCT APPROVALS ---------------------------- */
const apCard = (title, vendor, cat, price, imgs, flags, time) => `<div class="card p-4">
<div class="flex gap-3.5">
<div class="w-[92px] shrink-0">${ph('1/1', 'Product')}<p class="text-[11px] text-ink-400 text-center mt-1">${imgs} images</p></div>
<div class="min-w-0 flex-1"><div class="flex items-start gap-2"><p class="text-[13.5px] font-extrabold clamp-2 flex-1">${title}</p><span class="text-[11px] text-ink-400 shrink-0">${time}</span></div>
<p class="text-[12px] text-ink-500 mt-0.5">${vendor} · ${cat}</p>
<div class="flex flex-wrap gap-1.5 mt-2">${flags.map(f => `<span class="badge badge-${f[1]}">${f[0]}</span>`).join('')}</div>
<div class="flex flex-wrap items-center gap-2 mt-2.5"><b class="text-[14px] text-brand-600">${price}</b>
<span class="text-[11.5px] text-ink-400">Commission 8% · MRP verified</span></div>
<div class="flex flex-wrap gap-1.5 mt-3">
<button class="btn btn-xs btn-primary" data-toast="Product approved">${svg('check')}Approve</button>
<button class="btn btn-xs btn-outline">${svg('edit')}Approve with edits</button>
<button class="btn btn-xs btn-outline">${svg('msg')}Request info</button>
<button class="btn btn-xs btn-outline text-brand-600">${svg('x')}Reject</button>
<button class="btn btn-xs btn-ghost">${svg('eye')}Full preview</button></div></div></div></div>`;

AD('product-approvals.html', {
  title: 'Product Approvals', sub: 'Review new and edited listings before they go live.', crumb: 'Product approvals',
  actions: [['Approval rules', 'cog'], ['Assign to me', 'user'], ['Bulk approve safe listings', 'check', 'primary']],
  stats: [['Pending review', '86', '', 'clock', 'brand', 'Oldest: 6 hours ago'],
    ['Auto-flagged', '24', '', 'flag', 'gold', 'Restricted keywords / price'],
    ['Approved today', '184', '+12%', 'check', 'service', 'By 6 reviewers'],
    ['Rejected today', '18', '', 'x', 'ink', 'Top reason: poor images']],
  tabs: [['Queue', '86'], ['Auto-flagged', '24'], ['Edited listings', '18'], ['Escalated', '4'], ['Approved', '184'], ['Rejected', '18']],
  filters: ['search', ['All categories', 'Electronics', 'Fashion', 'Grocery', 'Health'], ['All vendors', 'New vendors only', 'Verified vendors'], ['Priority: All', 'High value', 'Flagged', 'Oldest first'], ['Assigned: Anyone', 'Assigned to me', 'Unassigned']],
  fbtns: btn('Grid view', 'grid') + btn('Table view', 'list'),
  after: `<div class="grid lg:grid-cols-2 gap-4 mb-4">
${apCard('Xiaomi Redmi Note 13 Pro 8/256GB — Global Version', 'Gadget World BD (Verified)', 'Mobile › Smartphones', tk(32990), 9, [['New listing', 'blue'], ['Price within range', 'green'], ['Brand authorised', 'green']], '2 hours ago')}
${apCard('Apple iPhone 15 Pro Max 256GB (Refurbished)', 'Mobile Zone (New vendor)', 'Mobile › Smartphones', tk(142000), 5, [['Auto-flagged: high value', 'amber'], ['Refurbished claim', 'amber'], ['Brand authorisation missing', 'red']], '4 hours ago')}
${apCard('Herbal Slimming Tea — Fast Weight Loss 15 Days', 'Natural Care BD', 'Health › Supplements', tk(890), 4, [['Restricted keyword: "weight loss"', 'red'], ['Health claim needs approval', 'amber'], ['BSTI certificate pending', 'amber']], '5 hours ago')}
${apCard('Premium Cotton Panjabi — Eid Collection 2026', 'Style Hub (Verified)', 'Fashion › Men › Panjabi', tk(2450), 12, [['New listing', 'blue'], ['Images verified', 'green'], ['Size chart provided', 'green']], '6 hours ago')}</div>`
    + row2(card('Approval queue (table view)', table([['', 'w-8'], ['Product'], ['Vendor'], ['Category'], ['Price'], ['Flags'], ['Submitted'], ['Assigned'], ['', 'text-right']], [
      ['<label class="chk"><input type="checkbox"><span></span></label>', prow(0, 'Samsung 43" Smart TV UA43T5400', '9 images · 3 variants'), 'Gadget World BD', 'Electronics › TV', tk(42900), '<span class="badge badge-green">Clean</span>', '1 hour ago', 'Unassigned', A([['Review', 'eye'], ['Approve', 'check'], ['Reject', 'x', 1]])],
      ['<label class="chk"><input type="checkbox"><span></span></label>', prow(1, 'Imported Baby Formula 900g', '5 images'), 'Fresh Mart', 'Grocery › Baby food', tk(3200), '<span class="badge badge-red">Import doc missing</span>', '3 hours ago', 'Nafisa K.', A([['Review', 'eye'], ['Request doc', 'msg'], ['Reject', 'x', 1]])],
      ['<label class="chk"><input type="checkbox"><span></span></label>', prow(2, 'Gaming Chair RGB Pro Max', '11 images'), 'Furniture Hub', 'Home › Furniture', tk(18900), '<span class="badge badge-amber">Duplicate suspected</span>', '4 hours ago', 'Sabbir A.', A([['Compare duplicate', 'copy'], ['Approve', 'check'], ['Reject', 'x', 1]])],
      ['<label class="chk"><input type="checkbox"><span></span></label>', prow(3, 'Handmade Nakshi Kantha Bedcover', '7 images'), 'Craft Bangladesh', 'Home › Bedding', tk(4600), '<span class="badge badge-green">Clean</span>', '6 hours ago', 'Unassigned', A([['Review', 'eye'], ['Approve', 'check']])]
    ]), btn('Bulk actions', 'list', 'outline')),
      card('Rejection reasons & rules', `<div class="p-4"><p class="text-[12px] font-extrabold uppercase tracking-wide text-ink-400 mb-2">Top rejection reasons (30 days)</p>
${hbars([['Poor image quality', 84, '142'], ['Incomplete specifications', 68, '116', '#ffb020'], ['Prohibited / restricted item', 52, '88', '#b42318'], ['Wrong category', 44, '74', '#00b894'], ['Counterfeit suspicion', 38, '64', '#8b5cf6'], ['Misleading title/claims', 32, '54', '#6c7a91']])}
<p class="text-[12px] font-extrabold uppercase tracking-wide text-ink-400 mt-4 mb-2">Automation rules</p>
${frows([['Auto-approve trusted vendors', 'Vendors with 4.5+ rating & 100+ clean listings.', true],
        ['Auto-flag restricted keywords', 'Weight loss, medicine, weapons, tobacco, crypto.', true],
        ['Auto-flag price anomalies', 'Price 60% below or 200% above category median.', true],
        ['Require brand authorisation', 'For 42 protected brands.', true],
        ['Image AI check', 'Detect watermark, collage and stock photos.', true]])}</div>`))
    + modal('m-rej', 'Reject listing', gridForm([
      fld('Rejection reason *', sel(['Poor image quality', 'Incomplete information', 'Prohibited item', 'Wrong category', 'Counterfeit / unauthorised brand', 'Misleading title or claims', 'Price manipulation', 'Duplicate listing', 'Other'])),
      fld('Severity', sel(['Soft — vendor can resubmit', 'Warning — counts against vendor score', 'Strict — vendor suspension review'])),
      fld('Message to vendor *', ta('Explain clearly what must be fixed before resubmission'), 'sm:col-span-2'),
      fld('Internal note', ta('Visible to admins only'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Email vendor', true)}${chk('Add to vendor violation log', true)}${chk('Block similar listings automatically', false)}</div>`
    ]) + modalFoot('Reject listing', 'Listing rejected'))
});
