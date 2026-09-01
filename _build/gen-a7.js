/* Admin: payouts, commissions */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, svg, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, hbars, donut, lineChart, modal, modalFoot } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('payouts.html', {
  title: 'Vendor Payouts', sub: 'Settlement cycles, payout approvals and bank disbursement files.', crumb: 'Payouts',
  actions: [['Payout settings', 'cog'], ['Download bank file', 'dl'], ['Run payout cycle', 'bolt', 'primary', 'data-modal-open="m-run"']],
  stats: [['Pending approval', tk(18400000), '', 'clock', 'brand', '842 vendor requests'],
    ['Paid this month', tk(142000000), '+12%', 'check', 'service', '6,842 payouts'],
    ['On hold', tk(2840000), '', 'lock', 'gold', '124 vendors (disputes/KYC)'],
    ['Next cycle', '25 Aug 2026', '', 'cal', 'ink', 'Weekly · every Monday']],
  tabs: [['Requests', '842'], ['Approved', '486'], ['Processing', '124'], ['Paid', '6,842'], ['On hold', '124'], ['Failed', '18'], ['Cycles', '48']],
  filters: ['search', ['All vendors', 'Product sellers', 'Service providers'], ['All methods', 'Bank transfer', 'bKash', 'Nagad', 'Rocket'], ['All statuses', 'Requested', 'Approved', 'Processing', 'Paid', 'Failed', 'On hold'], ['Amount: All', 'Above ' + tk(100000), tk(10000) + '–' + tk(100000), 'Below ' + tk(10000)], 'date'],
  bulk: ['Approve', 'Hold', 'Reject', 'Generate bank file', 'Mark paid', 'Export'],
  head: ['Payout ID', 'Vendor', 'Type', 'Period', 'Gross sales', 'Commission', 'Fees & penalties', 'Refunds', 'Net payable', 'Method', 'KYC', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>#PO-08421</b><p class="text-[11px] text-ink-400">Requested 22 Aug</p>', prow(0, 'Rahim Electric', 'ID #VND-1042 · 4.8 ★'), bd('Seller', 'blue'), '15–21 Aug 2026', tk(2280000), '-' + tk(182400), '-' + tk(2400), '-' + tk(28000), '<b class="text-service-600">' + tk(2067200) + '</b>', 'DBBL ****4521<p class="text-[11px] text-ink-400">Bank transfer</p>', bd('Verified', 'green'), st('Requested'), A([['View breakdown', 'eye'], ['Approve payout', 'check'], ['Hold payout', 'lock'], ['Adjust amount', 'edit'], ['Reject', 'x', 1], ['Vendor ledger', 'db']])],
    ['<b>#PO-08420</b>', prow(1, 'Gadget World BD', 'ID #VND-1088 · 4.6 ★'), bd('Seller', 'blue'), '15–21 Aug 2026', tk(1840000), '-' + tk(147200), '-' + tk(1800), '-' + tk(42000), '<b>' + tk(1649000) + '</b>', 'bKash 01711-***567', bd('Verified', 'green'), st('Approved'), A([['View breakdown', 'eye'], ['Process payment', 'money'], ['Download advice', 'dl']])],
    ['<b>#PO-08418</b>', prow(2, 'Dhaka AC Service', 'ID #VND-2140 · Service provider'), bd('Provider', 'amber'), '15–21 Aug 2026', tk(486000), '-' + tk(48600), '-' + tk(4500) + '<p class="text-[11px] text-ink-400">Subscription</p>', '-' + tk(3200), '<b>' + tk(429700) + '</b>', 'City Bank ****8842', bd('Verified', 'green'), st('Processing'), A([['View breakdown', 'eye'], ['Check bank status', 'refresh'], ['Retry', 'refresh']])],
    ['<b>#PO-08412</b>', prow(3, 'Mobile Zone', 'ID #VND-1284 · 3.2 ★'), bd('Seller', 'blue'), '08–14 Aug 2026', tk(342000), '-' + tk(34200), '-' + tk(11000) + '<p class="text-[11px] text-brand-600">Penalty</p>', '-' + tk(86000), '<b>' + tk(210800) + '</b>', 'Nagad 01911-***789', bd('Under review', 'amber'), st('On hold'), A([['View reason', 'info'], ['Open disputes (4)', 'flag'], ['Release hold', 'unlock'], ['Forfeit amount', 'ban', 1]])],
    ['<b>#PO-08402</b>', prow(4, 'Style Hub', 'ID #VND-1142 · 4.7 ★'), bd('Seller', 'blue'), '08–14 Aug 2026', tk(684000), '-' + tk(82080), '-' + tk(900), '-' + tk(12400), tk(588620), 'Brac Bank ****2214', bd('Verified', 'green'), st('Paid'), A([['View breakdown', 'eye'], ['Payment receipt', 'file'], ['Download advice', 'dl']])],
    ['<b>#PO-08396</b>', prow(5, 'Fresh Mart', 'ID #VND-1320'), bd('Seller', 'blue'), '08–14 Aug 2026', tk(184000), '-' + tk(27600), '-' + tk(600), '-' + tk(4800), tk(151000), 'Rocket 01611-***890', bd('Missing TIN', 'red'), st('Failed'), A([['View error', 'warn'], ['Update bank details', 'edit'], ['Retry payout', 'refresh'], ['Contact vendor', 'msg']])]
  ], total: 842,
  after: row3(card('Payout cycle summary — 15–21 Aug 2026', `<div class="p-4">${kv([['Vendors in cycle', '6,842'], ['Gross sales', tk(842000000)], ['Platform commission', '-' + tk(67360000)], ['Subscription fees', '-' + tk(4820000)], ['Lead charges', '-' + tk(8420000)], ['Ads spend', '-' + tk(2840000)], ['Penalties', '-' + tk(486000)], ['Refunds & returns', '-' + tk(18600000)], ['<b>Total payable</b>', '<b class="text-service-600">' + tk(739474000) + '</b>']])}
<div class="flex flex-wrap gap-2 mt-3">${btn('Approve all clean', 'check', 'primary', 'data-toast="6,718 payouts approved"')}${btn('Bank file (CSV)', 'dl')}${btn('bKash bulk file', 'dl')}</div></div>`),
    card('Payout settings', `<div class="p-4">${gridForm([
      fld('Payout frequency', sel(['Weekly (Monday)', 'Bi-weekly', 'Monthly (1st)', 'On request'])),
      fld('Minimum payout', inp(tk(500))),
      fld('Hold period after delivery', sel(['3 days', '7 days', '14 days'])),
      fld('Auto-approve limit', inp(tk(50000))),
      fld('Bank charge bearer', sel(['Vendor', 'Platform', 'Shared'])),
      fld('Reserve percentage', inp('5% for new vendors'))
    ])}${frows([['Auto-hold on open dispute', 'Hold payout when a vendor has unresolved disputes.', true],
      ['Require verified KYC', 'Block payouts for unverified vendors.', true],
      ['Require TIN for above ' + tk(100000), 'Tax deduction at source compliance.', true],
      ['Email payout advice', 'Send a PDF payout statement to vendors.', true]])}</div>`),
    card('Payout methods used', `<div class="p-4 flex items-center gap-4">${donut([['Bank transfer', 58, '#2563eb'], ['bKash', 24, '#e2136e'], ['Nagad', 12, '#f68b1f'], ['Rocket', 6, '#8b5cf6']], ['58%', 'Bank'])}
<div class="flex-1">${kv([['Avg. payout size', tk(20780)], ['Avg. processing time', '4.2 hours'], ['Failed rate', '0.3%'], ['Vendors on hold', '124']])}</div></div>`))
    + modal('m-run', 'Run payout cycle', gridForm([
      fld('Cycle period *', sel(['15–21 Aug 2026 (current)', '08–14 Aug 2026', 'Custom range'])),
      fld('Vendor group', sel(['All vendors', 'Product sellers only', 'Service providers only', 'Selected vendors'])),
      fld('Payment method', sel(['As per vendor preference', 'Bank transfer only', 'Mobile wallet only'])),
      fld('Minimum amount', inp(tk(500))),
      fld('Exclude', sel(['Vendors with open disputes', 'Unverified KYC', 'Both', 'None'])),
      fld('Execution', sel(['Generate file for bank upload', 'Auto-disburse via API', 'Manual marking'])),
      fld('Internal note', ta('e.g. Weekly settlement for 15–21 August 2026'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Send payout advice emails', true)}${chk('Notify vendors by SMS', true)}${chk('Generate accounting journal', true)}</div>`
    ]) + modalFoot('Run cycle', 'Payout cycle started'))
});

AD('commissions.html', {
  title: 'Commissions & Plans', sub: 'Commission rules, subscription plans, lead pricing and vendor-specific overrides.', crumb: 'Commissions',
  actions: [['Simulator', 'bolt'], ['Change log', 'db'], ['New rule', 'plus', 'primary', 'data-modal-open="m-comm"']],
  stats: [['Commission earned (30d)', tk(67360000), '+14%', 'percent', 'brand', 'Avg. 8.2% take rate'],
    ['Subscription MRR', tk(4820000), '+9%', 'award', 'service', '4,860 paid plans'],
    ['Lead revenue', tk(8420000), '+22%', 'users', 'gold', '1.86L leads billed'],
    ['Ads revenue', tk(2840000), '+18%', 'bolt', 'ink', '842 active campaigns']],
  tabs: [['Commission rules', '86'], ['Category rates', '482'], ['Vendor overrides', '142'], ['Subscription plans', '8'], ['Lead pricing', '386'], ['Ad rates', '12'], ['Change history', '486']],
  filters: ['search', ['Applies to: All', 'Products', 'Services', 'Both'], ['Type: All', 'Percentage', 'Flat fee', 'Tiered', 'Hybrid'], ['Status: All', 'Active', 'Scheduled', 'Expired']],
  head: ['Rule name', 'Applies to', 'Type', 'Rate', 'Min / Max fee', 'Priority', 'Valid period', 'Vendors affected', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>Default product commission</b><p class="text-[11px] text-ink-400">System rule</p>', 'All product categories', bd('Percentage', 'blue'), '<b>8%</b>', tk(5) + ' / ' + tk(5000), '99 (lowest)', 'Always', '8,642', st('Active'), A([['Edit rule', 'edit'], ['Duplicate', 'copy'], ['Simulate', 'bolt'], ['History', 'db']])],
    ['<b>Grocery high margin</b>', 'Grocery & daily needs', bd('Percentage', 'blue'), '<b>15%</b>', tk(2) + ' / ' + tk(500), '10', 'Always', '1,240', st('Active'), A([['Edit rule', 'edit'], ['Simulate', 'bolt'], ['Disable', 'ban', 1]])],
    ['<b>Large appliance tiered</b>', 'AC, Fridge, TV, Washing machine', bd('Tiered', 'amber'), '5% up to ' + tk(50000) + ', then 3%', '— / ' + tk(4000), '5', 'Always', '486', st('Active'), A([['Edit tiers', 'edit'], ['Simulate', 'bolt']])],
    ['<b>Service booking commission</b>', 'All bookable services', bd('Percentage', 'blue'), '<b>10%</b>', tk(20) + ' / ' + tk(2000), '20', 'Always', '2,180', st('Active'), A([['Edit rule', 'edit'], ['Simulate', 'bolt']])],
    ['<b>Eid campaign reduced rate</b>', 'Fashion & Lifestyle', bd('Percentage', 'blue'), '<b>8%</b> <span class="text-[11px] text-ink-400">(was 12%)</span>', '—', '1 (highest)', '01–20 Mar 2026', '1,842', st('Expired'), A([['View rule', 'eye'], ['Reactivate', 'refresh'], ['Duplicate', 'copy']])],
    ['<b>New vendor promo (90 days)</b>', 'All categories', bd('Percentage', 'blue'), '<b>3%</b>', '—', '2', 'Rolling 90 days', '842', st('Active'), A([['Edit rule', 'edit'], ['Vendor list', 'users']])],
    ['<b>Rahim Electric special</b><p class="text-[11px] text-ink-400">Vendor override</p>', 'Vendor #VND-1042', bd('Percentage', 'blue'), '<b>6%</b>', '—', '1 (highest)', '01 Jan – 31 Dec 2026', '1', st('Active'), A([['Edit override', 'edit'], ['Contract document', 'file'], ['Remove override', 'trash', 1]])]
  ], total: 86,
  after: row2(card('Subscription plans', table([['Plan'], ['For'], ['Monthly'], ['Yearly'], ['Commission'], ['Products / Listings'], ['Key benefits'], ['Subscribers'], ['', 'text-right']], [
    ['<b>Free</b>', 'Both', tk(0), tk(0), 'Standard', '20 products / 1 listing', 'Basic storefront', '3,782', A([['Edit plan', 'edit'], ['Features', 'list']])],
    ['<b>Silver</b>', 'Both', tk(1500), tk(15000), 'Standard', '200 / 3 listings', 'Verified badge, analytics', '2,320', A([['Edit plan', 'edit'], ['Features', 'list']])],
    ['<b>Gold</b>', 'Both', tk(4500), tk(45000), '-1%', '2,000 / 10 listings', 'Priority ranking, 100 free leads, ads credit', '1,736', A([['Edit plan', 'edit'], ['Features', 'list']])],
    ['<b>Platinum</b>', 'Both', tk(12000), tk(120000), '-2%', 'Unlimited', 'Top placement, dedicated manager, API', '744', A([['Edit plan', 'edit'], ['Features', 'list']])],
    ['<b>Enterprise</b>', 'Brands', 'Custom', 'Custom', 'Negotiated', 'Unlimited', 'Brand store, ERP integration, SLA', '60', A([['Edit plan', 'edit'], ['Contracts', 'file']])]
  ]), btn('Add plan', 'plus', 'outline')),
    card('Commission simulator', `<div class="p-4">${gridForm([
      fld('Vendor', sel(['Rahim Electric', 'Gadget World BD', 'Style Hub', 'Any new vendor'])),
      fld('Category', sel(['Mobile › Smartphones', 'Grocery', 'Fashion › Sarees', 'Home › Air conditioner'])),
      fld('Order value', inp(tk(24680))), fld('Payment method', sel(['bKash', 'Card', 'COD', 'Wallet'])),
      fld('Campaign applied', sel(['None', 'Eid campaign', 'New vendor promo'])), fld('Vendor plan', sel(['Free', 'Silver', 'Gold', 'Platinum']))
    ])}
<div class="mt-3 p-3 rounded-xl bg-ink-50">${kv([['Order value', tk(24680)], ['Applied rule', 'Rahim Electric special (6%)'], ['Commission', tk(1481)], ['Gateway fee (1.5%)', tk(370)], ['Platform VAT on commission (15%)', tk(222)], ['<b>Vendor receives</b>', '<b class="text-service-600">' + tk(22607) + '</b>'], ['<b>Platform earns</b>', '<b>' + tk(1703) + '</b>']])}</div>
<div class="flex gap-2 mt-3">${btn('Run simulation', 'bolt', 'primary')}${btn('Export scenarios', 'dl')}</div></div>`))
    + modal('m-comm', 'Create commission rule', gridForm([
      fld('Rule name *', inp('e.g. Grocery high margin')),
      fld('Rule type *', sel(['Percentage of sale', 'Flat fee per order', 'Tiered by value', 'Hybrid (percentage + flat)', 'Per-item fee'])),
      fld('Applies to *', sel(['All products', 'Specific categories', 'Specific brands', 'Specific vendors', 'All services', 'Service categories'])),
      fld('Target selection', inp('Search categories / vendors / brands…')),
      fld('Commission rate', inp('e.g. 8%')), fld('Flat fee component', inp(tk(0))),
      fld('Minimum fee', inp(tk(5))), fld('Maximum fee (cap)', inp(tk(5000))),
      fld('Priority', inp('1 = highest')), fld('Stacking', sel(['Override lower priority', 'Add to base rule'])),
      fld('Valid from', inp('01 Sep 2026')), fld('Valid until', inp('31 Dec 2026')),
      fld('Tiers (for tiered rules)', ta('0 – 50000 → 5%\n50001 – 200000 → 3%\n200001+ → 2%'), 'sm:col-span-2'),
      fld('Internal note', ta('Reason for this rule, approval reference…'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Apply VAT on commission', true)}${chk('Exclude shipping from base', true)}${chk('Exclude discounts from base', false)}${chk('Notify affected vendors', true)}</div>`
    ]) + modalFoot('Create rule', 'Commission rule created'))
});
