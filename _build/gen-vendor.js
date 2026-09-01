const fs = require('fs');
const { svg, ph, stars, dashPage, stats, card, lineChart, barChart, donut, hbars, filterbar, tabs, table, tfoot, bulkbar, st, empty, prow, actionsCell } = require('./dash');
const W = (f, o) => fs.writeFileSync('vendor/' + f, dashPage(Object.assign({ role: 'vendor' }, o)));

/* ------------------------------- DASHBOARD ------------------------------- */
W('dashboard.html', {
  title: 'Vendor Dashboard', sub: 'Rahim Electronics &amp; Services — a snapshot of both your product and service business.', active: 'dashboard.html', crumbs: ['Overview'],
  actions: `<select class="select input-sm !w-auto"><option>Last 30 days</option><option>Today</option><option>Last 7 days</option><option>This month</option><option>This year</option></select>
<button class="btn btn-sm btn-outline">${svg('dl')}Export</button><a href="add-product.html" class="btn btn-sm btn-primary">${svg('plus')}Add product</a>`,
  body: `
<div class="card p-4 mb-4 flex flex-wrap items-center gap-4 bg-ink-950 text-white">
<span class="w-14 h-14 rounded-2xl bg-brand-500 grid place-items-center text-[20px] font-extrabold shrink-0">R</span>
<div class="flex-1 min-w-[220px]"><div class="flex flex-wrap items-center gap-2"><h2 class="font-display text-[18px] font-extrabold">Rahim Electronics &amp; Services</h2>
<span class="badge badge-green">${svg('shield')}Verified vendor</span><span class="badge !bg-gold-400 !text-[#3a2a00]">${svg('award')}Power Seller</span></div>
<p class="text-[12.5px] text-white/65 mt-0.5">Mirpur 10, Dhaka · Member since 2022 · Store rating 4.8/5 · Response time 1 hour</p></div>
<div class="flex gap-2"><a href="../shop-profile.html" class="btn btn-sm !bg-white/15 !text-white">${svg('eye')}View storefront</a>
<a href="ads.html" class="btn btn-sm !bg-white !text-ink-950">${svg('bolt')}Boost my shop</a></div></div>

<div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-3.5 mb-4">
${[['Total revenue', '৳18,42,300', '+22.4%', 'money', 'brand', '৳4,82,100 this month'],
    ['Product orders', '1,284', '+12.8%', 'bag', 'brand', '32 awaiting action'],
    ['Service bookings', '396', '+18.2%', 'wrench', 'service', '7 upcoming today'],
    ['New leads', '142', '+31.6%', 'phone', 'gold', '12 unanswered']].map(s => `<div class="stat-card">
<div class="flex items-start gap-3"><span class="ic bg-${s[4]}-50 text-${s[4]}-600">${svg(s[3], 'w-5 h-5')}</span>
<div class="min-w-0 flex-1"><p class="lbl">${s[0]}</p><p class="val">${s[1]}</p>
<p class="text-[11.5px] text-ink-400 mt-0.5">${s[5]}</p></div>
<span class="badge badge-green shrink-0">${svg('up')}${s[2]}</span></div></div>`).join('')}</div>

<div class="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-4 mb-4">
${card('Revenue overview', `<div class="p-4">
<div class="flex flex-wrap items-end gap-5 mb-4"><div><p class="text-[12px] text-ink-500">Total (30 days)</p><p class="text-[26px] font-extrabold tracking-tight">৳4,82,100</p></div>
<div><p class="text-[12px] text-ink-500">Products</p><p class="text-[17px] font-extrabold text-brand-600">৳3,64,800</p></div>
<div><p class="text-[12px] text-ink-500">Services</p><p class="text-[17px] font-extrabold text-service-600">৳1,17,300</p></div>
<div class="chart-legend ml-auto"><span><i style="background:#ff2525"></i>Products</span><span><i style="background:#12a594"></i>Services</span></div></div>
${lineChart([28, 34, 30, 42, 38, 52, 46, 58, 50, 64, 58, 72, 66, 78], '#ff2525', 210)}
<div class="flex justify-between mt-2 text-[11px] text-ink-400"><span>1 Aug</span><span>5 Aug</span><span>9 Aug</span><span>13 Aug</span><span>17 Aug</span></div></div>`,
    `<div class="seg"><button class="is-active">Revenue</button><button>Orders</button><button>Visitors</button></div>`)}
<div class="space-y-4">
${card('Order status breakdown', `<div class="p-4">${donut([['Delivered', 62, '#12a594'], ['Shipped', 14, '#2f6fed'], ['Processing', 12, '#ffb020'], ['Pending', 7, '#8792a6'], ['Cancelled', 5, '#ff2525']], ['1,284', 'orders'])}</div>`)}
${card('Store health score', `<div class="p-4"><div class="flex items-center gap-3 mb-3"><div class="relative w-16 h-16 shrink-0">
<svg viewBox="0 0 36 36" class="w-16 h-16 -rotate-90"><circle cx="18" cy="18" r="15.5" fill="none" stroke="#eceef2" stroke-width="4"></circle>
<circle cx="18" cy="18" r="15.5" fill="none" stroke="#12a594" stroke-width="4" stroke-dasharray="97.4" stroke-dashoffset="12.7" stroke-linecap="round"></circle></svg>
<span class="absolute inset-0 grid place-items-center text-[14px] font-extrabold">87</span></div>
<div><p class="text-[13px] font-extrabold text-service-600">Excellent</p><p class="text-[12px] text-ink-500">Top 8% of vendors on HaatBazar</p></div></div>
<div class="space-y-2.5">${[['On-time shipping', 98, '#12a594'], ['Order defect rate', 92, '#12a594'], ['Response rate', 96, '#12a594'], ['Cancellation rate', 74, '#ffb020'], ['Listing quality', 81, '#ffb020']].map(m => `<div><div class="flex justify-between text-[12px] mb-1"><span class="font-semibold text-ink-700">${m[0]}</span><span class="font-bold">${m[1]}%</span></div><div class="bar"><i style="width:${m[1]}%;background:${m[2]}"></i></div></div>`).join('')}</div>
<a href="analytics.html" class="btn btn-sm btn-outline btn-block mt-3">See full report</a></div>`)}
</div></div>

<div class="grid lg:grid-cols-3 gap-4 mb-4">
${card('Needs your attention', `<div class="p-4 space-y-2">${[['bag', '32 orders to process', 'Ship within 24 hours to keep your rating', 'orders.html', 'brand'],
      ['phone', '12 leads unanswered', 'Leads expire after 48 hours', 'leads.html', 'gold'],
      ['layers', '6 products low on stock', 'Restock before you lose the buy box', 'inventory.html', 'brand'],
      ['return', '4 return requests pending', 'Approve or reject within 48 hours', 'returns.html', 'brand'],
      ['star', '3 new reviews to reply to', 'Replying improves buyer trust', 'reviews.html', 'gold'],
      ['file', '2 products rejected by admin', 'Fix the issues and resubmit', 'products.html', 'brand']].map(t => `<a href="${t[3]}" class="flex items-center gap-3 p-3 rounded-xl border border-[#e7e9ef] hover:border-brand-200 hover:bg-brand-50/40">
<span class="w-9 h-9 rounded-lg bg-${t[4]}-50 text-${t[4]}-600 grid place-items-center shrink-0">${svg(t[0], 'w-4 h-4')}</span>
<span class="min-w-0 flex-1"><span class="block text-[12.5px] font-bold">${t[1]}</span><span class="block text-[11.5px] text-ink-400">${t[2]}</span></span>${svg('chevR', 'w-4 h-4 text-ink-300')}</a>`).join('')}</div>`)}
${card('Today at a glance', `<div class="p-4"><div class="grid grid-cols-2 gap-2.5 mb-4">${[['৳42,180', 'Sales today', 'brand'], ['18', 'Orders today', 'brand'], ['4', 'Bookings today', 'service'], ['1,842', 'Store visitors', 'ink'], ['3.2%', 'Conversion rate', 'service'], ['৳2,343', 'Avg order value', 'gold']].map(x => `<div class="p-3 rounded-xl bg-ink-50"><p class="text-[16px] font-extrabold text-${x[2] === 'ink' ? 'ink-900' : x[2] + '-600'}">${x[0]}</p><p class="text-[11px] text-ink-500">${x[1]}</p></div>`).join('')}</div>
<p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Upcoming service jobs</p>
<div class="space-y-2">${[['AC servicing — Banani', '10:00 AM', 'Nusrat J.'], ['TV wall mount — Mirpur', '01:30 PM', 'Karim S.'], ['Fridge repair — Uttara', '04:00 PM', 'Sadia R.']].map(j => `<div class="flex items-center gap-2 text-[12px]"><span class="badge badge-teal shrink-0">${j[1]}</span><span class="font-semibold clamp-1 flex-1">${j[0]}</span><span class="text-ink-400">${j[2]}</span></div>`).join('')}</div></div>`)}
${card('Top selling products', `<div class="p-4 space-y-3">${[['Realme C100X 6/128GB', 184, '৳20,77,360', 'phoneDev'], ['Power Bank 50,000mAh', 142, '৳1,56,200', 'bolt'], ['Bluetooth Speaker', 118, '৳2,18,300', 'bolt'], ['24 inch LED Monitor', 76, '৳7,52,400', 'monitor'], ['Smart Watch Fitness Pro', 64, '৳1,47,200', 'watch']].map((p, i) => `<div class="flex items-center gap-3">${ph(i, p[3], 'w-10 h-10 rounded-lg shrink-0')}
<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold clamp-1">${p[0]}</p><p class="text-[11.5px] text-ink-400">${p[1]} sold · ${p[2]}</p></div>
<span class="text-[11.5px] font-extrabold text-service-600">#${i + 1}</span></div>`).join('')}
<a href="analytics.html" class="btn btn-sm btn-outline btn-block">Full product report</a></div>`)}
</div>

<div class="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-4">
${card('Recent orders', table([['Order'], ['Customer'], ['Items'], ['Total'], ['Payment'], ['Status'], ['']], [
      ['<b>HB-884213</b><p class="text-[11.5px] text-ink-400">17 Aug, 10:24 AM</p>', 'Nusrat Jahan<p class="text-[11.5px] text-ink-400">Banani, Dhaka</p>', '2', '<b>৳11,290</b>', '<span class="badge badge-green">Paid</span>', st('Shipped'), `<a href="orders.html" class="btn btn-xs btn-outline">Manage</a>`],
      ['<b>HB-884198</b><p class="text-[11.5px] text-ink-400">17 Aug, 09:02 AM</p>', 'Karim Sheikh<p class="text-[11.5px] text-ink-400">Mirpur, Dhaka</p>', '1', '<b>৳9,900</b>', '<span class="badge badge-amber">COD</span>', st('Processing'), `<a href="orders.html" class="btn btn-xs btn-primary">Ship now</a>`],
      ['<b>HB-884176</b><p class="text-[11.5px] text-ink-400">16 Aug, 08:41 PM</p>', 'Sadia Rahman<p class="text-[11.5px] text-ink-400">Uttara, Dhaka</p>', '3', '<b>৳4,150</b>', '<span class="badge badge-green">Paid</span>', st('Pending'), `<a href="orders.html" class="btn btn-xs btn-primary">Confirm</a>`],
      ['<b>HB-884140</b><p class="text-[11.5px] text-ink-400">16 Aug, 03:18 PM</p>', 'Tanvir Ahmed<p class="text-[11.5px] text-ink-400">Gazipur</p>', '1', '<b>৳1,100</b>', '<span class="badge badge-green">Paid</span>', st('Delivered'), `<a href="orders.html" class="btn btn-xs btn-outline">View</a>`],
      ['<b>HB-884122</b><p class="text-[11.5px] text-ink-400">16 Aug, 11:55 AM</p>', 'Mehedi Hasan<p class="text-[11.5px] text-ink-400">Chattogram</p>', '2', '<b>৳3,700</b>', '<span class="badge badge-red">Failed</span>', st('Cancelled'), `<a href="orders.html" class="btn btn-xs btn-outline">View</a>`]
    ]), `<a href="orders.html" class="text-[12.5px] font-bold text-brand-600">All orders</a>`)}
<div class="space-y-4">
${card('Latest leads', `<div class="p-4 space-y-2.5">${[['Kamal Uddin', 'AC installation — 2 units, Bashundhara', '12 min ago', 'New'], ['Farhana Akter', 'Fridge not cooling — urgent visit', '48 min ago', 'New'], ['Rasel Mahmud', 'CCTV setup quote for shop', '2 hours ago', 'Contacted'], ['Shirin Sultana', 'Washing machine servicing', '5 hours ago', 'Quoted']].map(l => `<div class="flex items-center gap-3 p-3 rounded-xl border border-[#e7e9ef]">
<span class="avatar avatar-sm bg-service-600">${l[0][0]}</span>
<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold">${l[0]}</p><p class="text-[11.5px] text-ink-500 clamp-1">${l[1]}</p><p class="text-[11px] text-ink-400">${l[2]}</p></div>
${st(l[3])}<a href="leads.html" class="btn btn-xs btn-service">${svg('phone')}</a></div>`).join('')}
<a href="leads.html" class="btn btn-sm btn-outline btn-block">Manage all leads</a></div>`)}
${card('Payout summary', `<div class="p-4"><div class="p-3.5 rounded-xl bg-service-50 mb-3"><p class="text-[12px] text-service-700">Available for payout</p>
<p class="text-[24px] font-extrabold text-service-700">৳1,84,320</p>
<p class="text-[11.5px] text-service-600 mt-0.5">Next auto-payout: 20 Aug 2026</p></div>
<div class="space-y-2 text-[12.5px]">${[['Pending clearance', '৳62,400'], ['On hold (returns)', '৳8,200'], ['Paid this month', '৳3,42,800'], ['Commission deducted', '৳48,210']].map(r => `<div class="flex justify-between"><span class="text-ink-500">${r[0]}</span><b>${r[1]}</b></div>`).join('')}</div>
<a href="payouts.html" class="btn btn-sm btn-primary btn-block mt-3">${svg('bank')}Request payout</a></div>`)}
</div></div>`
});

/* ------------------------------- ANALYTICS ------------------------------- */
W('analytics.html', {
  title: 'Analytics &amp; Insights', sub: 'Understand your traffic, conversion and customer behaviour across both businesses.', active: 'analytics.html', crumbs: ['Overview', 'Analytics'],
  actions: `<input type="date" class="input input-sm !w-auto"><select class="select input-sm !w-auto"><option>Last 30 days</option><option>Last 90 days</option><option>This year</option><option>Custom range</option></select><button class="btn btn-sm btn-outline">${svg('dl')}Download report</button>`,
  body: `
${tabs([['Overview', ''], ['Products', ''], ['Services', ''], ['Traffic', ''], ['Customers', ''], ['Competition', '']])}
${stats([['Store visitors', '48,240', '+18.2%', 'users', 'brand'], ['Conversion rate', '3.24%', '+0.4pp', 'chart', 'service'], ['Avg order value', '৳2,343', '+6.1%', 'money', 'gold'], ['Repeat buyer rate', '38.4%', '+3.2pp', 'refresh', 'brand']])}
<div class="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-4 mb-4">
${card('Sales &amp; visitors trend', `<div class="p-4">${lineChart([22, 30, 26, 38, 34, 46, 42, 56, 48, 62, 56, 70, 64, 76, 70, 84], '#ff2525', 230)}
<div class="flex justify-between mt-2 text-[11px] text-ink-400"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span></div></div>`,
    `<div class="chart-legend"><span><i style="background:#ff2525"></i>Sales</span><span><i style="background:#8792a6"></i>Visitors</span></div>`)}
${card('Traffic sources', `<div class="p-4">${donut([['HaatBazar search', 42, '#ff2525'], ['Category browse', 24, '#12a594'], ['Direct / saved', 14, '#ffb020'], ['Google', 12, '#2f6fed'], ['Social &amp; ads', 8, '#8b5cf6']], ['48.2K', 'visits'])}</div>`)}
</div>
<div class="grid lg:grid-cols-2 gap-4 mb-4">
${card('Best performing products', table([['#'], ['Product'], ['Views'], ['Sold'], ['Conv.'], ['Revenue', 'num']],
      [['1', prow(0, 'Realme C100X 6/128GB', 'SKU: RLM-C100X-GRN', 'phoneDev'), '12,480', '184', '<b class="text-service-600">1.47%</b>', '<b>৳20,77,360</b>'],
      ['2', prow(1, '24 inch LED Monitor', 'SKU: MON-24-LED', 'monitor'), '6,240', '76', '<b class="text-service-600">1.22%</b>', '<b>৳7,52,400</b>'],
      ['3', prow(2, 'Bluetooth Speaker Portable', 'SKU: SPK-BT-01', 'bolt'), '8,120', '118', '<b class="text-service-600">1.45%</b>', '<b>৳2,18,300</b>'],
      ['4', prow(3, 'Power Bank 50,000mAh', 'SKU: PWB-50K', 'bolt'), '9,640', '142', '<b class="text-service-600">1.47%</b>', '<b>৳1,56,200</b>'],
      ['5', prow(4, 'Smart Watch Fitness Pro', 'SKU: WCH-FIT-PRO', 'watch'), '5,180', '64', '<b class="text-gold-600">1.24%</b>', '<b>৳1,47,200</b>']], { compact: true }))}
${card('Service performance', table([['Service'], ['Leads'], ['Booked'], ['Win rate'], ['Revenue', 'num']],
      [[prow(0, 'AC servicing &amp; cleaning', 'Home appliance', 'fan'), '86', '52', '<b class="text-service-600">60%</b>', '<b>৳62,400</b>'],
      [prow(1, 'AC installation', 'Home appliance', 'wrench'), '42', '24', '<b class="text-service-600">57%</b>', '<b>৳38,400</b>'],
      [prow(2, 'Fridge &amp; freezer repair', 'Home appliance', 'home'), '38', '18', '<b class="text-gold-600">47%</b>', '<b>৳21,600</b>'],
      [prow(3, 'CCTV installation', 'Security', 'scan'), '26', '11', '<b class="text-gold-600">42%</b>', '<b>৳44,000</b>'],
      [prow(4, 'Washing machine service', 'Home appliance', 'drop'), '18', '7', '<b class="text-brand-600">39%</b>', '<b>৳8,400</b>']], { compact: true }))}
</div>
<div class="grid lg:grid-cols-3 gap-4 mb-4">
${card('Sales by category', `<div class="p-4">${hbars([['Mobiles &amp; Tablets', 42, '#ff2525'], ['Computers', 24, '#f50b0b'], ['Audio', 14, '#ff6363'], ['Wearables', 11, '#ff9d9d'], ['Accessories', 9, '#ffc5c5']])}</div>`)}
${card('Customers by city', `<div class="p-4">${hbars([['Dhaka', 54, '#12a594'], ['Chattogram', 16, '#0b8479'], ['Gazipur', 11, '#3cc3b3'], ['Sylhet', 9, '#71dbcc'], ['Others', 10, '#a9ebdf']])}</div>`)}
${card('Device &amp; time', `<div class="p-4"><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Device</p>
${hbars([['Android app', 48, '#2f6fed'], ['Mobile web', 32, '#60a5fa'], ['Desktop', 17, '#93c5fd'], ['iOS app', 3, '#bfdbfe']])}
<p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mt-4 mb-2">Peak order hours</p>
${barChart([12, 8, 6, 10, 22, 34, 42, 56, 62, 48, 38, 26], '#ffb020', 90)}
<div class="flex justify-between text-[10.5px] text-ink-400 mt-1"><span>8AM</span><span>12PM</span><span>4PM</span><span>8PM</span><span>12AM</span></div></div>`)}
</div>
<div class="grid lg:grid-cols-2 gap-4">
${card('Search terms that found your shop', table([['Keyword'], ['Impressions'], ['Clicks'], ['CTR'], ['Orders']],
      [['realme c100x', '8,240', '1,120', '13.6%', '84'], ['power bank 50000mah', '6,180', '742', '12.0%', '62'], ['ac servicing dhaka', '5,420', '648', '12.0%', '38'], ['led monitor 24 inch', '4,120', '412', '10.0%', '31'], ['bluetooth speaker cheap', '3,860', '318', '8.2%', '24'], ['fridge repair mirpur', '2,940', '284', '9.7%', '18']], { compact: true }))}
${card('Conversion funnel', `<div class="p-5 space-y-3">${[['Store / listing views', '48,240', 100], ['Product detail views', '28,940', 60], ['Added to cart', '8,120', 17], ['Reached checkout', '3,240', 6.7], ['Completed orders', '1,562', 3.2]].map((f, i) => `<div><div class="flex justify-between text-[12.5px] mb-1"><span class="font-semibold">${f[0]}</span><span><b>${f[1]}</b> <span class="text-ink-400">${f[2]}%</span></span></div>
<div class="bar !h-3"><i style="width:${f[2]}%;background:${['#ff2525', '#f50b0b', '#ffb020', '#12a594', '#0b8479'][i]}"></i></div></div>`).join('')}
<div class="p-3 rounded-xl bg-gold-50 text-[12px] text-gold-800 flex gap-2">${svg('bolt', 'w-4 h-4 shrink-0')}<span><b>Tip:</b> 68% of shoppers who added to cart did not check out. Try a cart-recovery voucher from Promotions.</span></div></div>`)}
</div>`
});

/* ------------------------------- PRODUCTS -------------------------------- */
const P = [
  ['Realme C100X 6/128GB — Green', 'RLM-C100X-GRN', 'Mobiles', '৳11,290', '৳13,290', 48, 184, 4.8, 'Active', 'phoneDev'],
  ['24 inch LED Monitor — FHD', 'MON-24-LED', 'Computers', '৳9,900', '৳11,500', 12, 76, 4.6, 'Active', 'monitor'],
  ['Bluetooth Speaker — Portable', 'SPK-BT-01', 'Audio', '৳1,850', '৳2,100', 6, 118, 4.5, 'Low stock', 'bolt'],
  ['Power Bank 50,000mAh', 'PWB-50K', 'Accessories', '৳1,100', '', 124, 142, 4.2, 'Active', 'bolt'],
  ['Smart Watch — Fitness Pro', 'WCH-FIT-PRO', 'Wearables', '৳2,300', '৳2,800', 0, 64, 4.4, 'Out of stock', 'watch'],
  ['Wireless Earbuds Pro', 'EAR-BT-PRO', 'Audio', '৳2,450', '', 86, 92, 4.7, 'Active', 'bolt'],
  ['USB-C Fast Charger 45W', 'CHG-45W-C', 'Accessories', '৳950', '৳1,200', 210, 168, 4.3, 'Active', 'bolt'],
  ['Laptop Cooling Pad', 'LCP-5FAN', 'Computers', '৳1,650', '', 34, 42, 4.1, 'Active', 'monitor'],
  ['Smart LED Bulb 9W RGB', 'BLB-RGB-9W', 'Smart Home', '৳750', '৳900', 4, 74, 4.2, 'Low stock', 'sun'],
  ['Tempered Glass Protector', 'TGP-UNI', 'Accessories', '৳200', '', 480, 620, 4.0, 'Active', 'pkg'],
  ['Mini Table Fan — Rechargeable', 'FAN-MINI-RC', 'Appliances', '৳1,650', '৳1,850', 28, 58, 4.4, 'Active', 'fan'],
  ['CCTV Camera — 3MP WiFi', 'CCTV-3MP-WF', 'Security', '৳3,200', '৳3,800', 18, 36, 4.6, 'Pending review', 'scan']
];
W('products.html', {
  title: 'All Products', sub: '248 products · 6 low on stock · 2 rejected · 1 pending admin review', active: 'products.html', crumbs: ['Product Business', 'Products'],
  actions: `<button class="btn btn-sm btn-outline">${svg('dl')}Export CSV</button><button class="btn btn-sm btn-outline" data-modal-open="import">${svg('up')}Bulk import</button><a href="add-product.html" class="btn btn-sm btn-primary">${svg('plus')}Add new product</a>`,
  body: `
${stats([['Total products', '248', '', 'box', 'brand'], ['Active &amp; live', '226', '', 'check', 'service'], ['Out of stock', '9', '', 'x', 'brand'], ['Draft / pending', '13', '', 'clock', 'gold']])}
${tabs([['All', '248'], ['Active', '226'], ['Out of stock', '9'], ['Low stock', '6'], ['Draft', '10'], ['Pending review', '1'], ['Rejected', '2'], ['Archived', '18']])}
${filterbar(['search', ['All categories', 'Mobiles', 'Computers', 'Audio', 'Wearables', 'Accessories', 'Appliances', 'Smart Home', 'Security'], ['All brands', 'Realme', 'Samsung', 'Xiaomi', 'Generic'], ['Stock: All', 'In stock', 'Low stock (&lt;10)', 'Out of stock'], ['Sort: Newest', 'Best selling', 'Price high–low', 'Price low–high', 'Stock low–high', 'Rating']], `<div class="seg"><button class="is-active">${svg('list', 'w-4 h-4')}</button><button>${svg('grid', 'w-4 h-4')}</button></div>`)}
${bulkbar(['Publish', 'Unpublish', 'Update price', 'Update stock', 'Assign category', 'Add to campaign', 'Archive', 'Delete'])}
${card('', table([['', 'w-8'], ['Product'], ['SKU'], ['Category'], ['Price'], ['Stock'], ['Sold'], ['Rating'], ['Status'], ['Actions']],
    P.map((p, i) => [`<input type="checkbox" data-row-check class="w-4 h-4" style="accent-color:#ff2525">`,
      prow(i, p[0], `Added ${12 - i} Aug 2026 · Free delivery`, p[9]),
    `<span class="mono text-[12px]">${p[1]}</span>`, p[2],
    `<b>${p[3]}</b>${p[4] ? `<p class="price-old !text-[11px]">${p[4]}</p>` : ''}`,
    `<b class="${p[5] === 0 ? 'text-brand-600' : p[5] < 10 ? 'text-gold-600' : ''}">${p[5]}</b><p class="text-[11px] text-ink-400">units</p>`,
      p[6], `<span class="flex items-center gap-1">${stars(Math.round(p[7]))}<span class="text-[11.5px] text-ink-400">${p[7]}</span></span>`,
      st(p[8]),
    `<div class="flex items-center gap-1.5"><a href="add-product.html" class="btn btn-xs btn-outline">${svg('edit')}</a>
<a href="../product-details.html" class="btn btn-xs btn-outline">${svg('eye')}</a>
${actionsCell([['Duplicate product', 'copy'], ['Update stock', 'layers'], ['Boost this product', 'bolt', false, 'ads.html'], ['Add to campaign', 'ticket', false, 'promotions.html'], ['View statistics', 'chart', false, 'analytics.html'], ['Print label', 'print'], ['Archive', 'archive'], ['Delete product', 'trash', true]])}</div>`
    ])) + tfoot(1, 12, 248))}

<div class="modal" id="import"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">
<div class="card-head"><h3>Bulk import products</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5"><div class="steps mb-5"><div class="step is-current"><span class="num">1</span>Upload file</div><span class="step-line"></span><div class="step"><span class="num">2</span>Map columns</div><span class="step-line"></span><div class="step"><span class="num">3</span>Review &amp; import</div></div>
<div class="upload-box !py-8 mb-3">${svg('up', 'w-6 h-6')}<span class="text-[13px] font-bold">Drop your CSV or Excel file here</span><span class="text-[12px]">Maximum 5,000 rows · 10 MB</span></div>
<div class="flex flex-wrap gap-2 mb-4"><button class="btn btn-sm btn-outline">${svg('dl')}Download template (CSV)</button><button class="btn btn-sm btn-outline">${svg('file')}Import guide</button></div>
<div class="p-3 rounded-xl bg-ink-50 text-[12px] text-ink-600 mb-4"><b>Required columns:</b> name, sku, category, brand, price, special price, stock, weight, description, images (URL, comma separated), warranty, condition.</div>
<label class="check mb-4"><input type="checkbox" checked>Update existing products when the SKU matches</label>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="File uploaded — mapping columns">Continue</button></div></div></div></div>`
});

/* ------------------------------ ADD PRODUCT ------------------------------ */
W('add-product.html', {
  title: 'Add New Product', sub: 'Complete all sections to publish. Products go live after a quick admin review.', active: 'add-product.html', crumbs: ['Product Business', 'Add Product'],
  actions: `<button class="btn btn-sm btn-outline">${svg('eye')}Preview</button><button class="btn btn-sm btn-outline" data-toast="Saved as draft">${svg('file')}Save draft</button><button class="btn btn-sm btn-primary" data-toast="Product submitted for review">${svg('check')}Submit for review</button>`,
  body: `
<div class="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-4">
<div class="space-y-4">
${card('Basic information', `<div class="p-5 space-y-3.5">
<div><label class="label">Product name <span class="req">*</span></label><input class="input" placeholder="e.g. Realme C100X 6GB/128GB — 8000mAh, 45W Fast Charge">
<p class="hint">Include brand, model and key specs. 20–120 characters recommended. <span class="text-ink-600 font-semibold">0/120</span></p></div>
<div class="grid sm:grid-cols-2 gap-3.5">
<div><label class="label">Category <span class="req">*</span></label><select class="select"><option>Select category…</option><option>Mobiles &amp; Tablets › Smartphones</option><option>Computers › Monitors</option><option>Audio › Speakers</option><option>Wearables › Smart Watches</option><option>Accessories › Chargers</option></select></div>
<div><label class="label">Sub-category <span class="req">*</span></label><select class="select"><option>Smartphones</option><option>Feature phones</option><option>Tablets</option></select></div>
<div><label class="label">Brand <span class="req">*</span></label><select class="select"><option>Realme</option><option>Samsung</option><option>Xiaomi</option><option>Walton</option><option>No brand / Generic</option></select></div>
<div><label class="label">Model number</label><input class="input" placeholder="e.g. RMX3760"></div>
<div><label class="label">Condition <span class="req">*</span></label><select class="select"><option>Brand new</option><option>Refurbished</option><option>Used — like new</option><option>Used — good</option></select></div>
<div><label class="label">Country of origin</label><select class="select"><option>Bangladesh</option><option>China</option><option>India</option><option>Vietnam</option><option>Other</option></select></div></div>
<div><label class="label">Short description <span class="req">*</span></label><textarea class="textarea !min-h-[70px]" placeholder="One or two lines shown in search results and cards"></textarea></div>
<div><label class="label">Key highlights (bullet points)</label>
<div class="space-y-2">${[1, 2, 3].map(i => `<div class="flex gap-2"><input class="input" placeholder="Highlight ${i} — e.g. 8000mAh battery with 45W fast charge"><button class="btn btn-outline btn-icon">${svg('trash')}</button></div>`).join('')}</div>
<button class="btn btn-xs btn-outline mt-2">${svg('plus')}Add highlight</button></div></div>`)}

${card('Full description', `<div class="p-5"><div class="flex flex-wrap gap-1 p-2 rounded-t-xl border border-[#e7e9ef] bg-ink-50">
${['B', 'I', 'U', 'S'].map(b => `<button class="w-8 h-8 rounded-lg hover:bg-white text-[13px] font-bold">${b}</button>`).join('')}
<span class="w-px bg-ink-200 mx-1"></span>
${[['list', 'Bullet list'], ['list', 'Numbered'], ['link', 'Link'], ['camera', 'Image'], ['grid', 'Table'], ['code', 'HTML']].map(b => `<button class="w-8 h-8 rounded-lg hover:bg-white grid place-items-center text-ink-600" title="${b[1]}">${svg(b[0], 'w-4 h-4')}</button>`).join('')}
<select class="select input-sm !w-auto ml-auto"><option>Paragraph</option><option>Heading 2</option><option>Heading 3</option></select></div>
<textarea class="textarea !rounded-t-none !min-h-[200px]" placeholder="Describe the product in detail — features, what is in the box, usage instructions, care tips…"></textarea>
<p class="hint">Do not include phone numbers, external links or other sellers' names. Minimum 100 characters.</p></div>`)}

${card('Images &amp; video', `<div class="p-5">
<div class="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
<div class="file-tile !border-brand-300 !bg-brand-50">${ph(0, 'phoneDev', 'absolute inset-0')}<span class="absolute top-1 left-1 badge badge-solid !text-[10px]">Cover</span>
<button class="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 grid place-items-center text-ink-500">${svg('x', 'w-3 h-3')}</button></div>
${[1, 2, 3].map(i => `<div class="file-tile">${ph(i, 'camera', 'absolute inset-0')}<button class="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 grid place-items-center text-ink-500">${svg('x', 'w-3 h-3')}</button></div>`).join('')}
<label class="upload-box !aspect-square !p-2">${svg('plus', 'w-5 h-5')}<span class="text-[11px]">Add image</span></label></div>
<div class="grid sm:grid-cols-2 gap-3">
<div><label class="label">Product video (YouTube link)</label><input class="input" placeholder="https://youtube.com/watch?v=…"></div>
<div><label class="label">360° view images</label><div class="upload-box !py-3">${svg('refresh', 'w-4 h-4')}<span class="text-[12px]">Upload 24–36 frames</span></div></div></div>
<div class="p-3 rounded-xl bg-ink-50 text-[12px] text-ink-600 mt-3"><b>Image rules:</b> white background for the cover photo, minimum 800×800 px, JPG/PNG/WebP, max 5 MB each, up to 8 images. No watermarks, borders or promotional text.</div></div>`)}

${card('Variants &amp; options', `<div class="p-5">
<label class="check mb-4"><input type="checkbox" checked>This product has multiple variants (colour, size, storage…)</label>
<div class="grid sm:grid-cols-2 gap-3 mb-4">
<div><label class="label">Option 1 name</label><input class="input" value="Colour"></div>
<div><label class="label">Option 1 values</label><input class="input" value="Green, Black, Blue"><p class="hint">Separate with commas</p></div>
<div><label class="label">Option 2 name</label><input class="input" value="Storage"></div>
<div><label class="label">Option 2 values</label><input class="input" value="4/64GB, 6/128GB"></div></div>
${table([['Variant'], ['SKU'], ['Price'], ['Special price'], ['Stock'], ['Image'], ['']],
      [['Green / 4+64GB', '<input class="input input-sm" value="RLM-C100X-GRN-64">', '<input class="input input-sm !w-[92px]" value="9,990">', '<input class="input input-sm !w-[92px]" value="9,290">', '<input class="input input-sm !w-[70px]" value="24">', `<button class="btn btn-xs btn-outline">${svg('camera')}</button>`, `<button class="btn btn-xs btn-outline btn-icon">${svg('trash')}</button>`],
      ['Green / 6+128GB', '<input class="input input-sm" value="RLM-C100X-GRN-128">', '<input class="input input-sm !w-[92px]" value="11,990">', '<input class="input input-sm !w-[92px]" value="11,290">', '<input class="input input-sm !w-[70px]" value="18">', `<button class="btn btn-xs btn-outline">${svg('camera')}</button>`, `<button class="btn btn-xs btn-outline btn-icon">${svg('trash')}</button>`],
      ['Black / 6+128GB', '<input class="input input-sm" value="RLM-C100X-BLK-128">', '<input class="input input-sm !w-[92px]" value="11,990">', '<input class="input input-sm !w-[92px]" value="11,290">', '<input class="input input-sm !w-[70px]" value="6">', `<button class="btn btn-xs btn-outline">${svg('camera')}</button>`, `<button class="btn btn-xs btn-outline btn-icon">${svg('trash')}</button>`]], { compact: true })}
<div class="p-4 pt-3 flex flex-wrap gap-2"><button class="btn btn-sm btn-outline">${svg('plus')}Add variant row</button><button class="btn btn-sm btn-outline">Apply price to all</button><button class="btn btn-sm btn-outline">Apply stock to all</button></div></div>`)}

${card('Specifications', `<div class="p-5">${table([['Attribute'], ['Value'], ['']],
      [['<b>Display</b>', '<input class="input input-sm" value="6.74 inch HD+ 90Hz">', `<button class="btn btn-xs btn-outline btn-icon">${svg('trash')}</button>`],
      ['<b>Processor</b>', '<input class="input input-sm" value="Unisoc T612 Octa-core">', `<button class="btn btn-xs btn-outline btn-icon">${svg('trash')}</button>`],
      ['<b>Battery</b>', '<input class="input input-sm" value="8000mAh, 45W SUPERVOOC">', `<button class="btn btn-xs btn-outline btn-icon">${svg('trash')}</button>`],
      ['<b>Camera</b>', '<input class="input input-sm" value="32MP AI main + 5MP front">', `<button class="btn btn-xs btn-outline btn-icon">${svg('trash')}</button>`],
      ['<b>Warranty</b>', '<input class="input input-sm" value="1 year official warranty">', `<button class="btn btn-xs btn-outline btn-icon">${svg('trash')}</button>`]], { compact: true })}
<div class="p-4 pt-3 flex gap-2"><button class="btn btn-sm btn-outline">${svg('plus')}Add attribute</button><button class="btn btn-sm btn-outline">Load category template</button></div></div>`)}

${card('Pricing &amp; tax', `<div class="p-5 grid sm:grid-cols-2 gap-3.5">
<div><label class="label">Regular price (৳) <span class="req">*</span></label><input class="input" placeholder="0.00"></div>
<div><label class="label">Special / sale price (৳)</label><input class="input" placeholder="0.00"><p class="hint">Discount shown as a percentage badge</p></div>
<div><label class="label">Sale start date</label><input type="date" class="input"></div>
<div><label class="label">Sale end date</label><input type="date" class="input"></div>
<div><label class="label">Cost per item (৳)</label><input class="input" placeholder="For your profit tracking only"></div>
<div><label class="label">Tax class</label><select class="select"><option>Standard VAT (included)</option><option>VAT exempt</option><option>Reduced rate</option></select></div>
<div><label class="label">Minimum order quantity</label><input class="input" value="1"></div>
<div><label class="label">Maximum order quantity</label><input class="input" placeholder="Leave empty for no limit"></div>
<div class="sm:col-span-2 p-3 rounded-xl bg-ink-50 grid sm:grid-cols-3 gap-3 text-[12.5px]">
<div><p class="text-ink-500">HaatBazar commission (8%)</p><b>৳903</b></div>
<div><p class="text-ink-500">Payment gateway fee (1.8%)</p><b>৳203</b></div>
<div><p class="text-ink-500">Your net earning</p><b class="text-service-600">৳10,184</b></div></div>
<label class="check sm:col-span-2"><input type="checkbox">Enable EMI (3, 6, 9, 12 months) for this product</label>
<label class="check sm:col-span-2"><input type="checkbox" checked>Allow bulk / wholesale pricing tiers</label></div>`)}

${card('Inventory &amp; shipping', `<div class="p-5 grid sm:grid-cols-2 gap-3.5">
<div><label class="label">SKU <span class="req">*</span></label><input class="input" placeholder="e.g. RLM-C100X-GRN-128"></div>
<div><label class="label">Barcode (EAN/UPC)</label><input class="input" placeholder="Optional"></div>
<div><label class="label">Stock quantity <span class="req">*</span></label><input class="input" placeholder="0"></div>
<div><label class="label">Low stock alert at</label><input class="input" value="10"></div>
<div><label class="label">Warehouse / pickup location</label><select class="select"><option>Mirpur 10 Warehouse — Dhaka</option><option>Shop counter — Mirpur 1</option><option>Chattogram Branch</option></select></div>
<div><label class="label">Stock behaviour when out</label><select class="select"><option>Hide product</option><option>Show as out of stock</option><option>Allow pre-order</option></select></div>
<div><label class="label">Weight (kg) <span class="req">*</span></label><input class="input" placeholder="0.45"></div>
<div><label class="label">Package dimensions (cm)</label><div class="flex gap-2"><input class="input" placeholder="L"><input class="input" placeholder="W"><input class="input" placeholder="H"></div></div>
<div><label class="label">Shipping class</label><select class="select"><option>Standard parcel</option><option>Fragile — extra packaging</option><option>Heavy / bulky item</option><option>Digital — no shipping</option></select></div>
<div><label class="label">Dispatch time <span class="req">*</span></label><select class="select"><option>Same day</option><option>1 working day</option><option>2 working days</option><option>3–5 working days</option></select></div>
<div class="sm:col-span-2 space-y-2"><label class="check"><input type="checkbox" checked>Free delivery inside Dhaka city</label>
<label class="check"><input type="checkbox" checked>Cash on delivery available</label>
<label class="check"><input type="checkbox" checked>Eligible for 7-day easy return</label>
<label class="check"><input type="checkbox">Dangerous goods / battery declaration required</label></div></div>`)}

${card('Warranty &amp; after-sales', `<div class="p-5 grid sm:grid-cols-2 gap-3.5">
<div><label class="label">Warranty type</label><select class="select"><option>Official brand warranty</option><option>Seller warranty</option><option>International warranty</option><option>No warranty</option></select></div>
<div><label class="label">Warranty period</label><select class="select"><option>1 year</option><option>6 months</option><option>3 months</option><option>2 years</option><option>Lifetime</option></select></div>
<div class="sm:col-span-2"><label class="label">Warranty policy details</label><textarea class="textarea !min-h-[70px]" placeholder="What is covered, what is not, how to claim…"></textarea></div>
<div class="sm:col-span-2"><label class="label">Return policy</label><select class="select"><option>Standard 7-day HaatBazar return policy</option><option>Change of mind not accepted (defect only)</option><option>No returns (final sale item)</option></select></div></div>`)}

${card('SEO &amp; visibility', `<div class="p-5 space-y-3.5">
<div><label class="label">Page title</label><input class="input" placeholder="Auto-generated from product name"><p class="hint">50–60 characters recommended</p></div>
<div><label class="label">Meta description</label><textarea class="textarea !min-h-[70px]" placeholder="Short summary for Google search results"></textarea></div>
<div><label class="label">URL slug</label><div class="input-affix"><span class="affix">haatbazar.com.bd/p/</span><input class="input" placeholder="realme-c100x-6-128gb"></div></div>
<div><label class="label">Search keywords / tags</label><input class="input" placeholder="Type and press Enter">
<div class="flex flex-wrap gap-1.5 mt-2">${['realme', 'smartphone', '8000mah', 'budget phone', 'fast charging'].map(t => `<span class="badge badge-gray">${t} ${svg('x', 'w-3 h-3')}</span>`).join('')}</div></div></div>`)}
</div>

<aside class="space-y-4">
${card('Publish status', `<div class="p-4 space-y-3">
<div><label class="label">Status</label><select class="select"><option>Draft</option><option>Submit for review</option><option>Publish immediately</option><option>Schedule publish</option></select></div>
<div><label class="label">Visibility</label><select class="select"><option>Public — visible to everyone</option><option>Hidden — direct link only</option><option>Members only</option></select></div>
<div><label class="label">Publish date</label><input type="datetime-local" class="input"></div>
<div class="p-3 rounded-xl bg-gold-50 text-[12px] text-gold-800">${svg('info', 'w-3.5 h-3.5 inline')} New listings are usually reviewed within 4–6 working hours.</div>
<button class="btn btn-primary btn-block" data-toast="Product submitted for review">${svg('check')}Submit for review</button>
<button class="btn btn-outline btn-block" data-toast="Draft saved">Save as draft</button></div>`)}
${card('Listing quality score', `<div class="p-4"><div class="flex items-center gap-3 mb-3">
<div class="relative w-14 h-14"><svg viewBox="0 0 36 36" class="w-14 h-14 -rotate-90"><circle cx="18" cy="18" r="15.5" fill="none" stroke="#eceef2" stroke-width="4"></circle><circle cx="18" cy="18" r="15.5" fill="none" stroke="#ffb020" stroke-width="4" stroke-dasharray="97.4" stroke-dashoffset="39" stroke-linecap="round"></circle></svg>
<span class="absolute inset-0 grid place-items-center text-[13px] font-extrabold">60</span></div>
<div><p class="text-[13px] font-extrabold text-gold-600">Needs improvement</p><p class="text-[11.5px] text-ink-500">Better listings rank higher in search</p></div></div>
<div class="space-y-2">${[['Product name added', true], ['At least 4 images', false], ['Description over 100 words', false], ['Specifications filled', true], ['Variants configured', true], ['Video added', false], ['Warranty details', false]].map(c => `<p class="flex items-center gap-2 text-[12px] ${c[1] ? 'text-ink-600' : 'text-ink-400'}">${svg(c[1] ? 'check' : 'x', `w-3.5 h-3.5 ${c[1] ? 'text-green-600' : 'text-ink-300'}`)}${c[0]}</p>`).join('')}</div></div>`)}
${card('Live preview', `<div class="p-4"><div class="pcard">${ph(0, 'phoneDev', 'aspect-square w-full')}
<div class="pcard-body"><p class="pcard-title mb-1">Realme C100X 6GB/128GB — 8000mAh</p>
<p class="mb-1"><span class="price">৳11,290</span> <span class="price-old">৳13,290</span></p>
<div class="flex items-center gap-1">${stars(5)}<span class="text-[11px] text-ink-400">New</span></div></div></div>
<p class="hint text-center">This is how buyers will see your product in search</p></div>`)}
${card('Tips for this category', `<div class="p-4 space-y-2">${['Mention official warranty in the title — it lifts conversion by ~18%', 'Add the box contents list in the description', 'Upload a real photo of the phone, not just renders', 'Competitive price range for this model: ৳10,900 – ৳12,500', 'Enable EMI to attract higher-value buyers'].map(t => `<p class="flex gap-2 text-[12px] text-ink-600">${svg('bolt', 'w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5')}${t}</p>`).join('')}</div>`)}
</aside></div>`
});
console.log('vendor part 1: dashboard, analytics, products, add-product');
