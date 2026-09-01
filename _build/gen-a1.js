/* Admin: dashboard, analytics, reports */
const K = require('./kit'), R = require('./gen-rest');
const { dashPage, stats, card, table, st, svg, ph, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, tiles, mini, timeline, hbars, donut, lineChart, barChart, modal, modalFoot, tfoot, filterbar, tabs, stars } = K;
const { AD, btn, A, row2, row3 } = R;

/* --------------------------- DASHBOARD -------------------------------- */
const alert = (t, b, c, i, act) => `<div class="flex gap-3 p-3 rounded-xl border border-${c}-200 bg-${c}-50/50">
${svg(i, `w-4 h-4 text-${c}-600 shrink-0 mt-0.5`)}<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold">${t}</p><p class="text-[11.5px] text-ink-500">${b}</p></div>
<a href="${act[1]}" class="btn btn-xs btn-outline shrink-0">${act[0]}</a></div>`;

AD('dashboard.html', {
  title: 'Platform Dashboard', sub: 'Live overview of marketplace performance, approvals and system health.', crumb: 'Dashboard',
  actions: [['Last 30 days', 'cal'], ['Export', 'dl'], ['Refresh', 'refresh', 'primary']],
  stats: [['GMV (Aug)', tk(48620000), '+18.4%', 'money', 'brand', 'Gross merchandise value'],
    ['Platform revenue', tk(4128600), '+21%', 'percent', 'service', 'Commission + ads + fees'],
    ['Orders', '38,412', '+12.8%', 'bag', 'gold', 'AOV ৳1,266'],
    ['Service leads', '18,940', '+24%', 'phone', 'ink', 'Conversion 32%'],
    ['Active customers', '2,84,120', '+9.2%', 'users', 'brand', '18,420 new this month'],
    ['Active vendors', '8,642', '+6.4%', 'store', 'service', '412 new · 31 pending'],
    ['Live listings', '4,86,240', '+11%', 'box', 'gold', '3.9L products · 96K services'],
    ['Avg. rating', '4.62', '+0.04', 'star', 'ink', 'From 1.84L reviews']],
  top: `<div class="grid xl:grid-cols-[1fr_360px] gap-4 mb-4">
${card('GMV & revenue trend', `<div class="p-4"><div class="flex flex-wrap gap-2 mb-3">
${['Today', '7 days', '30 days', '90 days', '12 months'].map((t, i) => `<button class="chip ${i === 2 ? 'is-active' : ''}">${t}</button>`).join('')}
<div class="ml-auto flex gap-2">${btn('Compare', 'chart')}${btn('Export', 'dl')}</div></div>
${lineChart([182, 214, 268, 242, 312, 348, 386, 412, 448, 468, 496, 524], '#ff2525', 220)}
<div class="flex justify-between text-[11px] text-ink-400 px-1 mt-1">${['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(m => `<span>${m}</span>`).join('')}</div>
${mini([[tk(48620000), 'GMV'], [tk(4128600), 'Revenue'], ['8.5%', 'Take rate'], ['+18.4%', 'Growth']])}</div>`)}
${card('Needs your attention', `<div class="p-3.5 space-y-2.5">
${alert('86 products awaiting approval', '24 flagged for restricted keywords', 'brand', 'box', ['Review', 'product-approvals.html'])}
${alert('31 vendor applications', '12 pending KYC · 4 escalated', 'gold', 'store', ['Review', 'vendor-approvals.html'])}
${alert('27 service listings pending', '6 missing trade licence', 'brand', 'wrench', ['Review', 'service-approvals.html'])}
${alert('24 open disputes', '8 breaching SLA in 24h', 'brand', 'flag', ['Resolve', 'disputes.html'])}
${alert('18 payouts to approve', tk(2846200) + ' total value', 'gold', 'bank', ['Approve', 'payouts.html'])}
${alert('12 abuse reports', '4 counterfeit claims', 'brand', 'ban', ['Moderate', 'moderation.html'])}
${alert('63 support tickets open', '9 overdue first response', 'gold', 'question', ['Open queue', 'tickets.html'])}</div>`)}</div>`
    + row3(card('Orders by status', `<div class="p-4">${donut([['Delivered', 62, '#00b894'], ['Shipped', 14, '#ff2525'], ['Processing', 11, '#ffb020'], ['Pending', 7, '#6c7a91'], ['Cancelled', 4, '#b42318'], ['Returned', 2, '#8b5cf6']], ['38,412', 'Orders'])}</div>`),
      card('Top categories by GMV', `<div class="p-4">${hbars([['Electronics & Gadgets', 94, tk(12480000)], ['Fashion & Lifestyle', 78, tk(9860000), '#00b894'], ['Home & Kitchen', 62, tk(7420000), '#ffb020'], ['Home Services', 54, tk(6180000), '#8b5cf6'], ['Grocery & Daily', 42, tk(4860000), '#6c7a91'], ['Health & Beauty', 34, tk(3940000), '#b42318']])}</div>`),
      card('Traffic sources', `<div class="p-4">${hbars([['Organic search', 88, '38.4%'], ['Direct / app', 72, '31.2%', '#00b894'], ['Paid ads', 46, '14.8%', '#ffb020'], ['Social', 32, '9.6%', '#8b5cf6'], ['Referral', 18, '4.2%', '#6c7a91'], ['Email / SMS', 8, '1.8%', '#b42318']])}
${mini([['12.8M', 'Visits'], ['3.4%', 'Conversion'], ['4:12', 'Avg. session']])}</div>`))
    + row2(card('Latest orders', table([['Order'], ['Customer'], ['Vendor'], ['Total'], ['Status'], ['', 'text-right']], [
      ['<b>HB-884213</b><p class="text-[11px] text-ink-400">2 min ago</p>', 'Kamal Uddin', 'Rahim Electric', tk(11290), st('Processing'), A([['View', 'eye'], ['Invoice', 'receipt']])],
      ['<b>HB-884212</b><p class="text-[11px] text-ink-400">6 min ago</p>', 'Sadia Rahman', 'Gadget World BD', tk(4820), st('Pending'), A([['View', 'eye'], ['Cancel', 'x', 1]])],
      ['<b>HB-884209</b><p class="text-[11px] text-ink-400">14 min ago</p>', 'Tanvir Alam', 'Style Hub', tk(2340), st('Shipped'), A([['View', 'eye'], ['Track', 'truck']])],
      ['<b>HB-884204</b><p class="text-[11px] text-ink-400">22 min ago</p>', 'Nusrat Jahan', 'Fresh Mart', tk(1680), st('Delivered'), A([['View', 'eye']])],
      ['<b>HB-884201</b><p class="text-[11px] text-ink-400">31 min ago</p>', 'Imran Hossain', 'Rahim Electric', tk(38900), st('Processing'), A([['View', 'eye'], ['Flag risk', 'flag']])]
    ]), `<a href="orders.html" class="btn btn-sm btn-ghost">All orders${svg('chevR')}</a>`),
      card('Top vendors this month', table([['Vendor'], ['Type'], ['Orders'], ['GMV'], ['Rating'], ['', 'text-right']], [
        [prow(0, 'Rahim Electric', 'Dhaka · Verified Pro', 'store'), 'Both', '1,684', tk(524800), '4.9 ★', A([['View profile', 'eye'], ['Message', 'msg']])],
        [prow(1, 'Gadget World BD', 'Dhaka · Verified', 'store'), 'Products', '1,412', tk(486200), '4.7 ★', A([['View profile', 'eye']])],
        [prow(2, 'Style Hub', 'Chattogram · Verified', 'store'), 'Products', '1,286', tk(342600), '4.6 ★', A([['View profile', 'eye']])],
        [prow(3, 'CoolCare Services', 'Dhaka · Verified Pro', 'store'), 'Services', '842 jobs', tk(268400), '4.8 ★', A([['View profile', 'eye']])],
        [prow(4, 'Fresh Mart', 'Dhaka · Verified', 'store'), 'Products', '2,140', tk(198600), '4.4 ★', A([['View profile', 'eye'], ['Warn', 'warn', 1]])]
      ]), `<a href="vendors.html" class="btn btn-sm btn-ghost">All vendors${svg('chevR')}</a>`))
    + row3(card('Live activity feed', timeline([
      ['New vendor "TechZone BD" submitted application', '1 min ago', 'store', 'brand'],
      ['Order HB-884213 placed — ৳11,290', '2 min ago', 'bag', 'service'],
      ['Product "Xiaomi Redmi 13" approved by Nafisa', '5 min ago', 'check', 'service'],
      ['Dispute DSP-2841 escalated to Level 2', '8 min ago', 'flag', 'brand'],
      ['Payout batch of ৳8,42,600 released to 24 vendors', '12 min ago', 'bank', 'gold'],
      ['Review flagged as spam by auto-moderation', '15 min ago', 'ban', 'brand'],
      ['Campaign "Electronics Week" went live', '22 min ago', 'rocket', 'service']
    ]), btn('Full audit log', 'db', 'ghost')),
      card('Service marketplace', `<div class="p-4">${kv([['Service listings', '96,240'], ['Leads received (Aug)', '18,940'], ['Bookings confirmed', '6,082'], ['Lead → booking rate', '32.1%'], ['Avg. quote value', tk(4280)], ['Avg. response time', '18 min'], ['Verified providers', '3,842'], ['Top city', 'Dhaka (62%)']])}
<div class="flex gap-2 mt-3">${btn('Bookings', 'cal')}${btn('Leads', 'phone')}</div></div>`),
      card('System health', `<div class="p-4">${[['API response time', '182 ms', 96, 'service'], ['Web uptime (30d)', '99.98%', 99, 'service'], ['Payment gateway', 'Operational', 98, 'service'], ['Search index', 'Syncing (2 min lag)', 82, 'gold'], ['Queue backlog', '1,284 jobs', 68, 'gold'], ['Error rate', '0.12%', 94, 'service']].map(h => `<div class="mb-2.5"><div class="flex justify-between text-[12px] mb-1"><span class="font-semibold">${h[0]}</span><span class="font-bold text-${h[3]}-600">${h[1]}</span></div>
<div class="pbar"><i style="width:${h[2]}%;background:${h[3] === 'service' ? '#00b894' : '#ffb020'}"></i></div></div>`).join('')}
<div class="flex gap-2 mt-3">${btn('System health', 'server')}${btn('Logs', 'terminal')}</div></div>`))
});

/* --------------------------- ANALYTICS -------------------------------- */
AD('analytics.html', {
  title: 'Traffic & Analytics', sub: 'Visitors, conversion funnel, cohorts and marketplace performance.', crumb: 'Analytics',
  actions: [['Date range', 'cal'], ['Compare periods', 'chart'], ['Export report', 'dl', 'primary']],
  stats: [['Sessions', '12.84M', '+14%', 'globe', 'brand', '8.2M unique visitors'],
    ['Conversion rate', '3.42%', '+0.38%', 'up', 'service', 'Visit → order'],
    ['Bounce rate', '32.4%', '-2.1%', 'down', 'gold', 'Improving'],
    ['Avg. session', '4m 12s', '+18s', 'clock', 'ink', '6.4 pages / session'],
    ['App installs', '184K', '+22%', 'phone', 'brand', '68% of traffic from app'],
    ['Search queries', '4.86M', '+16%', 'search', 'service', '12% zero-result'],
    ['Cart abandonment', '68.2%', '-1.4%', 'cart', 'gold', '৳4.2Cr recoverable'],
    ['Repeat purchase', '34.8%', '+2.2%', 'refresh', 'ink', 'Within 90 days']],
  tabs: [['Overview'], ['Acquisition'], ['Behaviour'], ['Conversion funnel'], ['Cohorts & retention'], ['Search analytics'], ['Geography'], ['Devices']],
  top: row2(card('Sessions vs orders', `<div class="p-4">${barChart([[88, 32], [76, 28], [94, 38], [68, 24], [86, 34], [98, 42], [82, 30]], ['#ff2525', '#00b894'], 200)}
<div class="flex gap-3 text-[11.5px] text-ink-500 mt-2 justify-center"><span class="flex items-center gap-1.5"><i class="legend-dot" style="background:#ff2525"></i>Sessions</span><span class="flex items-center gap-1.5"><i class="legend-dot" style="background:#00b894"></i>Orders</span></div></div>`),
    card('Conversion funnel', `<div class="p-4 space-y-2.5">${[['Visited site', '12,840,000', 100], ['Viewed a listing', '8,420,000', 66], ['Added to cart / enquired', '2,180,000', 17], ['Started checkout / sent lead', '984,000', 7.7], ['Completed order / booking', '438,000', 3.4]].map((f, i) => `<div><div class="flex justify-between text-[12px] mb-1"><span class="font-semibold">${f[0]}</span><span class="text-ink-500"><b>${f[1]}</b> · ${f[2]}%</span></div>
<div class="pbar h-2.5"><i style="width:${f[2]}%;background:${['#ff2525', '#ff6b6b', '#ffb020', '#00b894', '#0a7f5f'][i]}"></i></div></div>`).join('')}
${note('Biggest drop-off is listing view → add to cart (74%). Improving delivery estimate visibility could recover an estimated ৳2.4Cr GMV.', 'gold', 'info')}</div>`)),
  head: ['Page / section', 'Views', 'Unique', 'Avg. time', 'Bounce', 'Exit rate', 'Conversion', 'Trend'],
  tableTitle: 'Top pages',
  filters: ['search', ['All sections', 'Home', 'Category', 'Product', 'Service', 'Shop', 'Checkout'], ['All devices', 'Mobile app', 'Mobile web', 'Desktop'], 'date'],
  rows: [
    ['<b>Homepage</b><p class="text-[11px] text-ink-400">/index.html</p>', '4,862,400', '3,184,200', '2m 08s', '28.4%', '18.2%', '4.1%', '<span class="badge badge-green">+12%</span>'],
    ['<b>Product listing — Smartphones</b><p class="text-[11px] text-ink-400">/products.html?cat=smartphones</p>', '2,184,600', '1,486,200', '3m 42s', '31.2%', '22.4%', '5.8%', '<span class="badge badge-green">+18%</span>'],
    ['<b>Product details pages</b><p class="text-[11px] text-ink-400">/product-details.html</p>', '6,428,900', '4,214,600', '4m 18s', '34.8%', '28.6%', '6.4%', '<span class="badge badge-green">+9%</span>'],
    ['<b>Service listing — AC repair</b><p class="text-[11px] text-ink-400">/services.html?cat=ac-repair</p>', '842,600', '612,400', '3m 04s', '29.6%', '19.8%', '8.2%', '<span class="badge badge-green">+24%</span>'],
    ['<b>Search results</b><p class="text-[11px] text-ink-400">/search.html</p>', '4,862,000', '2,984,100', '2m 46s', '38.2%', '31.4%', '4.8%', '<span class="badge badge-amber">-2%</span>'],
    ['<b>Checkout</b><p class="text-[11px] text-ink-400">/checkout.html</p>', '984,200', '918,600', '2m 12s', '12.4%', '31.8%', '44.6%', '<span class="badge badge-green">+6%</span>']
  ], total: 428,
  after: row3(card('Top search queries', table([['Query'], ['Searches'], ['CTR'], ['Zero result'], ['', 'text-right']], [
    ['<b>smartphone</b>', '284,600', '42%', 'No', A([['Boost result', 'bolt'], ['Add synonym', 'plus']])],
    ['<b>ac servicing dhaka</b>', '186,200', '48%', 'No', A([['Boost result', 'bolt']])],
    ['<b>saree collection</b>', '164,800', '38%', 'No', A([['Boost result', 'bolt']])],
    ['<b>iphone 15 pro max price</b>', '142,400', '12%', '<span class="badge badge-red">Yes</span>', A([['Add redirect', 'link'], ['Notify buyers', 'bell']])],
    ['<b>electrician near me</b>', '98,600', '52%', 'No', A([['Boost result', 'bolt']])]
  ]), `<a href="seo.html" class="btn btn-sm btn-ghost">Search settings</a>`),
    card('Top districts by GMV', `<div class="p-4">${hbars([['Dhaka', 96, '62.4%'], ['Chattogram', 48, '12.8%', '#00b894'], ['Sylhet', 28, '6.2%', '#ffb020'], ['Khulna', 22, '4.8%', '#8b5cf6'], ['Rajshahi', 18, '3.9%', '#6c7a91'], ['Others', 24, '9.9%', '#b42318']])}</div>`),
    card('Device & platform split', `<div class="p-4">${donut([['Android app', 48, '#00b894'], ['Mobile web', 26, '#ff2525'], ['iOS app', 14, '#ffb020'], ['Desktop', 12, '#6c7a91']], ['12.84M', 'Sessions'])}</div>`))
    + row2(card('Cohort retention (order repeat %)', `<div class="table-wrap"><table class="dt"><thead><tr><th>Cohort</th><th>Users</th><th>M1</th><th>M2</th><th>M3</th><th>M4</th><th>M5</th><th>M6</th></tr></thead><tbody>
${[['Mar 2026', '48,200', 42, 31, 26, 22, 19, 17], ['Apr 2026', '52,400', 44, 33, 27, 23, 20, ''], ['May 2026', '58,600', 46, 34, 28, 24, '', ''], ['Jun 2026', '62,800', 48, 36, 29, '', '', ''], ['Jul 2026', '68,400', 49, 37, '', '', '', ''], ['Aug 2026', '74,200', 51, '', '', '', '', '']].map(r => `<tr><td class="font-bold">${r[0]}</td><td>${r[1]}</td>
${r.slice(2).map(v => v === '' ? '<td class="text-ink-300">—</td>' : `<td><span class="px-2 py-0.5 rounded-md text-[11.5px] font-bold" style="background:rgba(255,37,37,${v / 100 + .08});color:${v > 35 ? '#fff' : '#231f20'}">${v}%</span></td>`).join('')}</tr>`).join('')}
</tbody></table></div>`),
      card('Marketplace KPIs', `<div class="p-4">${kv([['GMV per active customer', tk(1712)], ['Orders per customer (90d)', '2.4'], ['New vs returning GMV', '38% / 62%'], ['Vendor fill rate', '96.4%'], ['On-time delivery', '92.8%'], ['Cancellation rate', '4.2%'], ['Return rate', '2.1%'], ['Refund turnaround', '3.2 days'], ['Lead response rate', '88%'], ['NPS score', '62']])}</div>`))
});

/* ---------------------------- REPORTS --------------------------------- */
AD('reports.html', {
  title: 'Reports Centre', sub: 'Generate, schedule and download every platform report.', crumb: 'Reports',
  actions: [['Scheduled reports', 'clock'], ['Report builder', 'sliders'], ['New report', 'plus', 'primary', 'data-modal-open="m-rep"']],
  stats: [['Reports available', '48', '', 'file', 'brand', 'Across 9 categories'],
    ['Generated this month', '1,284', '+18%', 'db', 'service', 'By 24 admins'],
    ['Scheduled', '32', '', 'clock', 'gold', 'Daily, weekly & monthly'],
    ['Data warehouse', '4.8 TB', '', 'server', 'ink', 'Retention: 7 years']],
  top: card('Report library', `<div class="p-4">${tiles([
    ['money', 'Sales & GMV report', 'Revenue, orders, AOV by any dimension', '#', 'brand'],
    ['percent', 'Commission & revenue', 'Take rate, fees and platform earnings', '#', 'service'],
    ['store', 'Vendor performance', 'Ranking, SLA, fill rate, ratings', '#', 'gold'],
    ['users', 'Customer & cohort report', 'Acquisition, retention, LTV, RFM', '#', 'ink'],
    ['box', 'Catalog & inventory', 'Listings, stock, price changes, coverage', '#', 'brand'],
    ['wrench', 'Service & leads', 'Leads, quotes, bookings, conversion', '#', 'service'],
    ['truck', 'Logistics & delivery', 'Courier SLA, RTO, delivery time', '#', 'gold'],
    ['return', 'Returns & refunds', 'Reasons, rates, refund value, disputes', '#', 'ink'],
    ['bank', 'Payout & settlement', 'Vendor settlements and reserves', '#', 'brand'],
    ['scale', 'Tax & VAT (Mushak)', 'NBR-ready VAT and withholding registers', '#', 'service'],
    ['bolt', 'Ads & marketing', 'Campaign spend, ROAS, coupon usage', '#', 'gold'],
    ['shield', 'Fraud & risk', 'Suspicious orders, chargebacks, blocklist', '#', 'ink']
  ], 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4')}</div>`),
  head: ['Report name', 'Category', 'Period', 'Rows', 'Format', 'Requested by', 'Generated', 'Status', ['Actions', 'text-right']],
  tableTitle: 'Recent reports',
  filters: ['search', ['All categories', 'Sales', 'Finance', 'Vendors', 'Customers', 'Catalog', 'Logistics', 'Tax', 'Risk'], ['All statuses', 'Completed', 'Processing', 'Failed'], 'date'],
  fbtns: btn('Bulk download', 'dl'),
  rows: [
    ['<b>GMV by category — August</b>', '<span class="badge badge-red">Sales</span>', '01–17 Aug 2026', '2,842', 'Excel', 'Arif Hossain', '17 Aug, 03:12 PM', st('Completed'), A([['Download', 'dl'], ['Share link', 'share'], ['Regenerate', 'refresh'], ['Delete', 'trash', 1]])],
    ['<b>Vendor settlement — 15 Aug batch</b>', '<span class="badge badge-purple">Finance</span>', '01–14 Aug 2026', '8,642', 'CSV', 'System (scheduled)', '15 Aug, 09:00 AM', st('Completed'), A([['Download', 'dl'], ['Send to finance', 'mail']])],
    ['<b>VAT register (Mushak 6.3)</b>', '<span class="badge badge-amber">Tax</span>', 'July 2026', '48,212', 'PDF + CSV', 'System (scheduled)', '01 Aug, 09:05 AM', st('Completed'), A([['Download', 'dl'], ['Submit to NBR', 'send']])],
    ['<b>Fraud review — high-risk COD</b>', '<span class="badge badge-red">Risk</span>', 'Last 7 days', '1,284', 'Excel', 'Nafisa Karim', '17 Aug, 11:20 AM', st('Completed'), A([['Download', 'dl'], ['Open in risk queue', 'shield']])],
    ['<b>Customer LTV cohort analysis</b>', '<span class="badge badge-blue">Customers</span>', 'Mar–Aug 2026', '2,84,120', 'Excel', 'Arif Hossain', 'Processing…', st('Processing'), A([['Cancel', 'x', 1]])],
    ['<b>Courier SLA breach report</b>', '<span class="badge badge-green">Logistics</span>', 'Last 30 days', '—', 'CSV', 'Sabbir Ahmed', 'Failed — timeout', st('Failed'), A([['Retry', 'refresh'], ['View error', 'info']])]
  ], total: 1284,
  after: row2(card('Scheduled reports', table([['Report'], ['Frequency'], ['Recipients'], ['Next run'], ['', 'text-right']], [
    ['Daily GMV snapshot', 'Daily · 8:00 AM', 'leadership@haatbazar.com', 'Tomorrow 8:00 AM', A([['Edit', 'edit'], ['Pause', 'pause'], ['Run now', 'play']])],
    ['Vendor settlement batch', 'Twice monthly · 1st & 15th', 'finance@haatbazar.com', '01 Sep 2026', A([['Edit', 'edit'], ['Run now', 'play']])],
    ['VAT / Mushak register', 'Monthly · 1st', 'tax@haatbazar.com', '01 Sep 2026', A([['Edit', 'edit'], ['Run now', 'play']])],
    ['Fraud & chargeback digest', 'Weekly · Sunday', 'risk@haatbazar.com', '23 Aug 2026', A([['Edit', 'edit'], ['Pause', 'pause']])],
    ['Vendor performance scorecard', 'Monthly · 3rd', 'category-managers@haatbazar.com', '03 Sep 2026', A([['Edit', 'edit'], ['Pause', 'pause']])]
  ]), btn('Add schedule', 'plus', 'outline')),
    card('Data exports & warehouse', `<div class="p-4">${frows([
      ['BigQuery / warehouse sync', 'Nightly sync of all transactional tables.', true],
      ['Raw event export (S3)', 'Clickstream events delivered hourly.', true],
      ['PII masking in exports', 'Mask phone, email and address for non-finance roles.', true],
      ['Download watermarking', 'Stamp admin name & timestamp on every export.', true],
      ['Auto-delete exports', 'Remove generated files after 30 days.', true]
    ])}<div class="p-4 pt-0 flex gap-2">${btn('Warehouse status', 'server')}${btn('API docs', 'book')}${btn('Access log', 'db')}</div></div>`))
    + modal('m-rep', 'Build a report', gridForm([
      fld('Report category *', sel(['Sales & GMV', 'Finance & commission', 'Vendors', 'Customers', 'Catalog & inventory', 'Services & leads', 'Logistics', 'Returns & disputes', 'Tax & VAT', 'Ads & marketing', 'Fraud & risk'])),
      fld('Report template', sel(['GMV by category', 'GMV by vendor', 'Orders detail', 'Commission summary', 'Custom (blank)'])),
      fld('Date range', sel(['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'This month', 'Last month', 'This quarter', 'This year', 'Custom'])),
      fld('Compare with', sel(['No comparison', 'Previous period', 'Same period last year'])),
      fld('Group by', sel(['Day', 'Week', 'Month', 'Category', 'Vendor', 'District', 'Payment method', 'Courier'])),
      fld('Metrics', `<div class="grid sm:grid-cols-2 gap-1.5 p-3 rounded-xl border border-[#e7e9ef] max-h-[150px] overflow-auto">${['GMV', 'Net revenue', 'Orders', 'AOV', 'Commission', 'Refunds', 'Cancellations', 'New customers', 'Conversion rate', 'Return rate'].map((m, i) => chk(m, i < 5)).join('')}</div>`, 'sm:col-span-2'),
      fld('Filters', inp('e.g. category = Electronics AND district = Dhaka'), 'sm:col-span-2'),
      fld('Format', sel(['Excel (.xlsx)', 'CSV', 'PDF', 'Google Sheets', 'JSON (API)'])), fld('Row limit', sel(['10,000', '50,000', '100,000', 'No limit'])),
      fld('Delivery', sel(['Download now', 'Email to me', 'Email to a group', 'Push to warehouse'])), fld('Recipients', inp('comma separated emails')),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Include charts', true)}${chk('Mask customer PII', true)}${chk('Save as template', false)}${chk('Schedule this report', false)}</div>`
    ]) + modalFoot('Generate report', 'Report queued'))
});
