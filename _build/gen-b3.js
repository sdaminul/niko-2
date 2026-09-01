/* Admin marketing: promotions, ads, notifications, seo */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, hbars, donut, lineChart, modal, modalFoot } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('promotions.html', {
  title: 'Coupons & Vouchers', sub: 'Platform-funded coupons, vendor coupons, free-delivery codes and referral rewards.', crumb: 'Coupons & vouchers',
  actions: [['Bulk generate', 'layers'], ['Export usage', 'dl'], ['Create coupon', 'plus', 'primary', 'data-modal-open="m-cpn"']],
  stats: [['Active coupons', '186', '+24', 'ticket', 'brand', '48 platform-funded'],
    ['Redemptions (30d)', '4,86,200', '+18%', 'check', 'service', tk(48200000) + ' discount given'],
    ['Discount cost', tk(24800000), '', 'money', 'gold', 'Platform share 62%'],
    ['Avg. order uplift', '+34%', '', 'chart', 'ink', 'vs non-coupon orders']],
  tabs: [['Active', '186'], ['Scheduled', '42'], ['Platform coupons', '86'], ['Vendor coupons', '842'], ['Free delivery', '24'], ['Referral codes', '18'], ['Expired', '1,482'], ['Disabled', '86']],
  filters: ['search', ['Type: All', 'Percentage', 'Fixed amount', 'Free delivery', 'Buy X get Y', 'Cashback', 'First order'], ['Funded by: All', 'Platform', 'Vendor', 'Shared', 'Bank / partner'], ['Applies to: All', 'Products', 'Services', 'Both'], ['Status: All', 'Active', 'Scheduled', 'Expired', 'Disabled'], 'date'],
  bulk: ['Activate', 'Disable', 'Extend expiry', 'Duplicate', 'Delete'],
  head: ['Code', 'Description', 'Type', 'Value', 'Min. order', 'Max. discount', 'Funded by', 'Usage / Limit', 'Per user', 'Valid period', 'Revenue', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<code class="font-bold text-[11.5px]">EID70</code>', 'Eid Mega Sale — extra 10% off', bd('Percentage', 'blue'), '10%', tk(1000), tk(500), bd('Platform', 'red'), '<b>1,84,620</b> / 5,00,000', '2', '20–31 Aug 2026', tk(48200000), st('Active'), A([['View usage', 'chart'], ['Edit coupon', 'edit'], ['Duplicate', 'copy'], ['Copy code', 'copy'], ['Disable', 'ban', 1]])],
    ['<code class="font-bold text-[11.5px]">WELCOME200</code>', 'First order discount for new users', bd('Fixed', 'blue'), tk(200), tk(999), tk(200), bd('Platform', 'red'), '86,420 / Unlimited', '1', 'Always on', tk(18400000), st('Active'), A([['View usage', 'chart'], ['Edit coupon', 'edit'], ['Fraud check', 'shield']])],
    ['<code class="font-bold text-[11.5px]">FREEDEL999</code>', 'Free delivery above ' + tk(999), bd('Free delivery', 'green'), 'Up to ' + tk(120), tk(999), tk(120), bd('Shared 50/50', 'amber'), '2,48,000 / Unlimited', '5', 'Always on', tk(84200000), st('Active'), A([['View usage', 'chart'], ['Edit coupon', 'edit']])],
    ['<code class="font-bold text-[11.5px]">BKASH15</code>', 'bKash payment cashback', bd('Cashback', 'blue'), '15%', tk(500), tk(150), bd('Bank / partner', 'blue'), '48,620 / 1,00,000', '2', '01–31 Aug 2026', tk(12400000), st('Active'), A([['View usage', 'chart'], ['Partner settlement', 'bank'], ['Edit', 'edit']])],
    ['<code class="font-bold text-[11.5px]">SERVICE100</code>', tk(100) + ' off any home service booking', bd('Fixed', 'blue'), tk(100), tk(500), tk(100), bd('Platform', 'red'), '18,420 / 50,000', '3', '15 Aug – 15 Sep 2026', tk(4820000), st('Active'), A([['View usage', 'chart'], ['Edit coupon', 'edit']])],
    ['<code class="font-bold text-[11.5px]">RAHIM10</code>', 'Vendor coupon — Rahim Electric', bd('Percentage', 'blue'), '10%', tk(2000), tk(1000), bd('Vendor', 'gray'), '842 / 5,000', '1', '01–31 Aug 2026', tk(1840000), st('Active'), A([['View usage', 'chart'], ['Vendor page', 'store'], ['Disable', 'ban', 1]])],
    ['<code class="font-bold text-[11.5px]">REFER50</code>', 'Referral reward for both users', bd('Fixed', 'blue'), tk(50) + ' each', tk(500), tk(50), bd('Platform', 'red'), '8,420 / Unlimited', '20', 'Always on', tk(2400000), st('Active'), A([['View usage', 'chart'], ['Referral settings', 'cog'], ['Fraud check', 'shield']])],
    ['<code class="font-bold text-[11.5px]">SUMMER25</code>', 'Summer clearance', bd('Percentage', 'gray'), '25%', tk(1500), tk(1000), bd('Shared', 'amber'), '1,24,000 / 1,24,000', '1', '01–30 Jun 2026', tk(28400000), st('Expired'), A([['Usage report', 'chart'], ['Duplicate', 'copy'], ['Delete', 'trash', 1]])]
  ], total: 186,
  after: row2(card('Coupon performance', `<div class="p-4">${hbars([['EID70', 100, tk(48200000)], ['FREEDEL999', 88, tk(84200000)], ['WELCOME200', 42, tk(18400000)], ['BKASH15', 34, tk(12400000)], ['SERVICE100', 18, tk(4820000)]])}
${kv([['Total redemptions (30d)', '4,86,200'], ['Discount cost', tk(24800000)], ['Attributed revenue', tk(168400000)], ['ROI', '6.8×'], ['Coupon abuse blocked', '842 attempts'], ['Avg. discount per order', tk(51)]])}
<div class="flex gap-2 mt-3">${btn('Full report', 'chart')}${btn('Abuse log', 'shield')}</div></div>`),
    card('Bulk & referral settings', `<div class="p-4">${gridForm([fld('Bulk code prefix', inp('NIKO-')), fld('Number of codes', inp('1000')), fld('Code length', sel(['8 characters', '10 characters', '12 characters'])), fld('Export format', sel(['CSV', 'Excel']))])}
<div class="flex gap-2 mb-4">${btn('Generate codes', 'layers', 'primary', 'data-toast="1000 codes generated"')}${btn('Download list', 'dl')}</div>
${frows([['One coupon per order', 'Prevent stacking multiple coupons.', true], ['Allow coupon with campaign price', 'Coupons work on already discounted items.', true], ['Block for high-return customers', 'Customers above 20% return rate cannot use coupons.', true], ['Referral reward on first order only', 'Referrer is paid after referee\'s first delivered order.', true], ['Device fingerprint check', 'Stop multi-account coupon abuse.', true]])}</div>`))
    + modal('m-cpn', 'Create coupon', gridForm([
      fld('Coupon code *', inp('e.g. EID70')), fld('Internal name', inp('Eid Mega Sale extra discount')),
      fld('Discount type *', sel(['Percentage off', 'Fixed amount off', 'Free delivery', 'Buy X get Y', 'Cashback to wallet', 'Free service visit'])),
      fld('Discount value *', inp('10% or ' + tk(200))),
      fld('Minimum order value', inp(tk(1000))), fld('Maximum discount cap', inp(tk(500))),
      fld('Funded by', sel(['Platform', 'Vendor', 'Shared 50/50', 'Bank / partner'])),
      fld('Applies to', sel(['All products & services', 'Products only', 'Services only', 'Selected categories', 'Selected vendors', 'Selected products', 'First order only'])),
      fld('Category / vendor selection', inp('Search…')),
      fld('Excluded items', inp('e.g. Grocery, gift cards')),
      fld('Total usage limit', inp('500000')), fld('Usage per customer', inp('2')),
      fld('Customer eligibility', sel(['Everyone', 'New customers only', 'Existing customers', 'Specific segment', 'VIP tier', 'Invited list (CSV)'])),
      fld('Payment method restriction', sel(['Any method', 'bKash only', 'Card only', 'Prepaid only (no COD)'])),
      fld('Valid from *', inp('23 Aug 2026 00:00')), fld('Valid until *', inp('31 Aug 2026 23:59')),
      fld('City restriction', sel(['All Bangladesh', 'Dhaka only', 'Selected cities'])),
      fld('Channel', sel(['All channels', 'App only', 'Web only'])),
      fld('Description shown to customer', ta('Get extra 10% off during Eid Mega Sale. Max discount ' + tk(500) + '.'), 'sm:col-span-2'),
      fld('Terms & conditions', ta('Coupon T&C'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Show in coupon list on storefront', true)}${chk('Auto-apply best coupon', false)}${chk('Allow stacking', false)}${chk('Send to eligible customers', true)}${chk('Activate immediately', true)}</div>`
    ]) + modalFoot('Create coupon', 'Coupon created'))
});

AD('ads.html', {
  title: 'Ads Manager', sub: 'Sponsored listings, banner inventory, vendor ad campaigns and ad revenue.', crumb: 'Ads manager',
  actions: [['Ad settings', 'cog'], ['Revenue report', 'chart'], ['Create placement', 'plus', 'primary', 'data-modal-open="m-ad"']],
  stats: [['Ad revenue (30d)', tk(2840000), '+18%', 'megaphone', 'brand', '842 campaigns'],
    ['Active campaigns', '842', '+64', 'bolt', 'service', '486 vendors advertising'],
    ['Impressions served', '18.6 Cr', '+12%', 'eye', 'gold', 'CTR 1.8%'],
    ['Avg. CPC', tk(4.2), '-6%', 'money', 'ink', 'Fill rate 86%']],
  tabs: [['Campaigns', '842'], ['Pending review', '48'], ['Placements', '18'], ['Keywords', '4,862'], ['Vendor top-ups', '286'], ['Rejected', '62'], ['Revenue', '']],
  filters: ['search', ['Type: All', 'Sponsored product', 'Sponsored service', 'Sponsored shop', 'Banner buy', 'Homepage feature', 'Keyword ad', 'Category top slot'], ['Model: All', 'CPC', 'CPM', 'Fixed daily', 'Fixed slot'], ['Status: All', 'Running', 'Pending', 'Paused', 'Ended', 'Rejected'], 'date'],
  bulk: ['Approve', 'Pause', 'Reject', 'Export'],
  head: ['Campaign', 'Vendor', 'Type', 'Placement', 'Model', 'Bid / Rate', 'Budget', 'Spent', 'Impressions', 'Clicks', 'CTR', 'Conversions', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>Smartphone boost — Aug</b><p class="text-[11px] text-ink-400">#AD-8842</p>', prow(0, 'Rahim Electric', '#VND-1042'), bd('Sponsored product', 'blue'), 'Search results — top 3', bd('CPC', 'gray'), tk(6), tk(50000) + '/mo', tk(28400), '18,40,000', '42,800', '2.3%', '1,842 (' + tk(4820000) + ')', st('Running'), A([['View campaign', 'eye'], ['Performance', 'chart'], ['Edit bid', 'edit'], ['Pause', 'pause'], ['Vendor ad wallet', 'wallet']])],
    ['<b>AC repair — Dhaka lead ads</b>', prow(1, 'Dhaka AC Service', '#VND-2140'), bd('Sponsored service', 'amber'), 'Service list — top slot', bd('CPC', 'gray'), tk(12), tk(20000) + '/mo', tk(12400), '4,20,000', '10,400', '2.5%', '412 leads', st('Running'), A([['View campaign', 'eye'], ['Performance', 'chart'], ['Edit bid', 'edit'], ['Pause', 'pause']])],
    ['<b>Homepage hero buy — 25 Aug</b>', prow(2, 'Walton Plaza', '#VND-1002'), bd('Banner buy', 'red'), 'Hero slider — slide 2', bd('Fixed slot', 'gray'), tk(150000) + '/day', tk(150000), tk(0), '0', '0', '—', '—', st('Pending'), A([['Review creative', 'eye'], ['Approve', 'check'], ['Request changes', 'msg'], ['Reject', 'x', 1]])],
    ['<b>Brand store feature</b>', prow(3, 'Samsung BD', 'Brand partner'), bd('Homepage feature', 'blue'), 'Top brands strip', bd('Fixed daily', 'gray'), tk(20000) + '/day', tk(600000), tk(420000), '68,00,000', '1,24,000', '1.8%', '4,862', st('Running'), A([['View campaign', 'eye'], ['Performance', 'chart'], ['Invoice', 'receipt']])],
    ['<b>Keyword: "smartphone"</b>', prow(4, 'Gadget World BD', '#VND-1088'), bd('Keyword ad', 'blue'), 'Search — sponsored row', bd('CPC', 'gray'), tk(9), tk(30000) + '/mo', tk(18600), '8,40,000', '18,600', '2.2%', '842', st('Running'), A([['View campaign', 'eye'], ['Keyword report', 'chart'], ['Edit keywords', 'edit'], ['Pause', 'pause']])],
    ['<b>Misleading claim ad</b>', prow(5, 'Quick Deals BD', '#VND-1388'), bd('Sponsored product', 'blue'), 'Category page', bd('CPC', 'gray'), tk(3), tk(5000), tk(0), '0', '0', '—', '—', st('Rejected'), A([['View reason', 'info'], ['Notify vendor', 'msg'], ['Delete', 'trash', 1]])]
  ], total: 842,
  after: row3(card('Ad inventory & placements', table([['Placement'], ['Model'], ['Floor price'], ['Fill'], ['', 'text-right']], [
    ['<b>Search top 3 (products)</b>', 'CPC auction', tk(4), '92%', A([['Edit', 'edit']])],
    ['<b>Category top slot</b>', 'CPC auction', tk(3), '86%', A([['Edit', 'edit']])],
    ['<b>Service list top slot</b>', 'CPC auction', tk(8), '78%', A([['Edit', 'edit']])],
    ['<b>Product page — related</b>', 'CPC auction', tk(2), '64%', A([['Edit', 'edit']])],
    ['<b>Homepage hero slot</b>', 'Fixed daily', tk(150000), '100%', A([['Calendar', 'cal'], ['Edit', 'edit']])],
    ['<b>Top brands strip</b>', 'Fixed daily', tk(20000), '100%', A([['Calendar', 'cal'], ['Edit', 'edit']])],
    ['<b>App splash / interstitial</b>', 'CPM', tk(180) + '/1000', '48%', A([['Edit', 'edit']])],
    ['<b>Email newsletter slot</b>', 'Fixed per send', tk(35000), '72%', A([['Calendar', 'cal']])]
  ]), btn('Add placement', 'plus', 'outline')),
    card('Ad revenue trend', `<div class="p-4">${lineChart([14, 16, 18, 17, 20, 22, 21, 24, 26, 25, 27, 28, 28, 28], ['Mar', 'May', 'Jul', 'Aug'])}
${kv([['CPC revenue', tk(1840000)], ['Fixed slot revenue', tk(840000)], ['CPM revenue', tk(160000)], ['Vendor ad wallet balance', tk(4820000)], ['Refunded ad spend', tk(48000)]])}</div>`),
    card('Ad policy & review', `<div class="p-4">${frows([['Manual review of all creatives', 'Every banner and headline is checked before going live.', true],
      ['Block prohibited claims', 'No "best in Bangladesh", fake discounts or medical claims.', true],
      ['Require prepaid ad wallet', 'Vendors must top up before campaigns run.', true],
      ['Label sponsored results', 'Show a clear "Sponsored" tag to customers.', true],
      ['Max 3 sponsored slots per page', 'Protect organic result quality.', true],
      ['Auto-pause on low balance', 'Pause campaigns when the wallet is empty.', true]])}
<div class="p-4 pt-0">${note('48 creatives are waiting for review — SLA is 4 working hours.', 'gold', 'warn')}</div></div>`))
    + modal('m-ad', 'Create ad placement', gridForm([
      fld('Placement name *', inp('e.g. Search top 3 (products)')),
      fld('Location *', sel(['Search results', 'Category page', 'Product detail page', 'Service list', 'Service detail', 'Homepage hero', 'Homepage strip', 'Cart page', 'App splash', 'Email newsletter'])),
      fld('Ad type', sel(['Sponsored product', 'Sponsored service', 'Sponsored shop', 'Banner', 'Keyword ad', 'Feature slot'])),
      fld('Pricing model', sel(['CPC auction', 'CPM', 'Fixed daily', 'Fixed per slot', 'Fixed per send'])),
      fld('Floor price', inp(tk(4))), fld('Max slots', inp('3')),
      fld('Creative size', inp('1200×300 px')), fld('Max file size', inp('300 KB')),
      fld('Eligible vendor plans', sel(['All plans', 'Silver and above', 'Gold and above', 'Platinum only'])),
      fld('Min. vendor rating', inp('4.0 ★')),
      fld('Review requirement', sel(['Manual review', 'Auto-approve trusted vendors', 'Auto-approve all'])),
      fld('Notes for vendors', ta('Creative guidelines, prohibited content…'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Show "Sponsored" label', true)}${chk('Available on app', true)}${chk('Allow keyword targeting', true)}${chk('Allow city targeting', true)}</div>`
    ]) + modalFoot('Save placement', 'Placement saved'))
});
