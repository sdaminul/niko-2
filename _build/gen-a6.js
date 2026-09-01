/* Admin finance: disputes, abandoned-carts, invoices, transactions, payouts, commissions, gift-cards, taxes */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, svg, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, hbars, donut, lineChart, modal, modalFoot, timeline, tiles } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('disputes.html', {
  title: 'Returns & Disputes', sub: 'Return requests, refund claims and buyer–seller disputes needing resolution.', crumb: 'Disputes',
  actions: [['Dispute policy', 'file'], ['Export', 'dl'], ['Bulk resolve', 'check', 'primary']],
  stats: [['Open disputes', '386', '+8%', 'flag', 'brand', '42 escalated to admin'],
    ['Return requests', '1,842', '+6%', 'refresh', 'gold', tk(2840000) + ' value'],
    ['Refunds processed', tk(1860000), '+11%', 'money', 'service', '3,420 refunds (30d)'],
    ['Avg. resolution', '2.4 days', '-0.6', 'clock', 'ink', 'Target: 48 hours']],
  tabs: [['All cases', '2,228'], ['New', '386'], ['Awaiting vendor', '242'], ['Awaiting customer', '164'], ['Escalated to admin', '42'], ['Refund approved', '1,240'], ['Rejected', '128'], ['Closed', '18,420']],
  filters: ['search', ['All types', 'Return request', 'Refund only', 'Not delivered', 'Wrong item', 'Damaged', 'Fake product', 'Service dispute'], ['All vendors', 'High dispute vendors'], ['Priority: All', 'High value', 'Escalated', 'SLA breach'], ['Assigned: Anyone', 'Assigned to me', 'Unassigned'], 'date'],
  bulk: ['Approve refund', 'Reject', 'Escalate', 'Assign to agent', 'Export'],
  head: ['Case', 'Order', 'Customer', 'Vendor', 'Type', 'Reason', 'Amount', 'Evidence', 'Age', 'Assigned', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>#DSP-8842</b>', '<a href="orders.html" class="link">#ORD-283960</a>', prow(0, 'Sadia Islam', 'Mirpur, Dhaka'), 'Mobile Zone', bd('Fake product', 'red'), 'Received counterfeit charger', '<b>' + tk(11290) + '</b>', '4 photos · 1 video', '<b class="text-brand-600">3 days</b>', 'Nafisa K.', st('Escalated'), A([['Open case', 'eye'], ['View evidence', 'image'], ['Refund customer', 'money'], ['Reject claim', 'x', 1], ['Penalise vendor', 'warn'], ['Block product', 'ban']])],
    ['<b>#DSP-8840</b>', '<a href="orders.html" class="link">#ORD-284140</a>', prow(1, 'Farhana Akter', 'Dhanmondi, Dhaka'), 'Style Hub', bd('Size mismatch', 'amber'), 'Saree size not as described', tk(8450), '3 photos', '1 day', 'Unassigned', st('Awaiting vendor'), A([['Open case', 'eye'], ['Nudge vendor', 'bell'], ['Approve return', 'check'], ['Reject', 'x', 1]])],
    ['<b>#DSP-8836</b>', '<a href="orders.html" class="link">#ORD-283842</a>', prow(2, 'Kamal Hossain', 'Sylhet'), 'Walton Plaza', bd('Damaged in transit', 'amber'), 'Fridge door dented', tk(54900), '6 photos · courier report', '2 days', 'Sabbir A.', st('Processing'), A([['Open case', 'eye'], ['Claim from courier', 'truck'], ['Replace item', 'refresh'], ['Refund', 'money']])],
    ['<b>#DSP-8830</b>', '<a href="orders.html" class="link">#ORD-283740</a>', prow(3, 'Imran Khan', 'Uttara, Dhaka'), 'Fresh Mart', bd('Not delivered', 'red'), 'Marked delivered but not received', tk(4280), 'Chat log · GPS data', '<b class="text-brand-600">5 days</b>', 'Nafisa K.', st('Escalated'), A([['Open case', 'eye'], ['Courier investigation', 'truck'], ['Refund customer', 'money'], ['Recover from courier', 'money']])],
    ['<b>#DSP-8824</b>', 'Booking <a href="bookings.html" class="link">#BKG-48096</a>', prow(4, 'Nusrat Jahan', 'Gulshan, Dhaka'), 'Rapid Car Rental', bd('Service dispute', 'red'), 'Provider did not show up', tk(1600), 'Call recordings', '4 days', 'Sabbir A.', st('Refund approved'), A([['Open case', 'eye'], ['Process refund', 'money'], ['Penalise provider', 'warn'], ['Close case', 'check']])]
  ], total: 2228,
  after: row3(card('Dispute reasons', `<div class="p-4">${hbars([['Not as described', 92, '842'], ['Damaged / defective', 74, '648', '#ffb020'], ['Not delivered', 52, '442', '#b42318'], ['Wrong item sent', 44, '386', '#00b894'], ['Counterfeit', 28, '242', '#8b5cf6'], ['Service not provided', 22, '186', '#6c7a91']])}</div>`),
    card('Resolution outcomes', `<div class="p-4 flex items-center gap-4">${donut([['Refund to customer', 48, '#ff2525'], ['Replacement', 22, '#2563eb'], ['Partial refund', 14, '#ffb020'], ['Rejected', 11, '#6c7a91'], ['Vendor goodwill', 5, '#00b894']], ['84%', 'Buyer favour'])}
<div class="flex-1">${kv([['Refund from vendor', tk(1420000)], ['Platform absorbed', tk(184000)], ['Recovered from courier', tk(256000)], ['Vendor penalties', tk(86000)]])}</div></div>`),
    card('Vendors with most disputes', table([['Vendor'], ['Rate'], ['', 'text-right']], [
      ['<b>Mobile Zone</b>', bd('8.4%', 'red'), A([['Review vendor', 'eye'], ['Warn', 'warn']])],
      ['<b>Quick Deals BD</b>', bd('6.2%', 'red'), A([['Review vendor', 'eye'], ['Warn', 'warn']])],
      ['<b>Fresh Mart</b>', bd('3.8%', 'amber'), A([['Review vendor', 'eye']])],
      ['<b>Style Hub</b>', bd('2.1%', 'amber'), A([['Review vendor', 'eye']])],
      ['<b>Rahim Electric</b>', bd('0.8%', 'green'), A([['Review vendor', 'eye']])]
    ]), btn('Vendor health report', 'chart', 'ghost')))
    + modal('m-res', 'Resolve dispute #DSP-8842', gridForm([
      fld('Resolution *', sel(['Full refund to customer', 'Partial refund', 'Replacement shipment', 'Return & refund', 'Reject claim', 'Goodwill voucher'])),
      fld('Refund amount', inp(tk(11290))),
      fld('Refund from', sel(['Vendor balance', 'Platform (goodwill)', 'Courier claim', 'Split 50/50'])),
      fld('Refund method', sel(['Original payment method', 'Wallet credit', 'Bank transfer', 'Voucher'])),
      fld('Vendor action', sel(['No action', 'Warning', 'Penalty ' + tk(1000), 'Block product', 'Suspend vendor'])),
      fld('Customer compensation', sel(['None', 'Free shipping voucher', tk(200) + ' voucher', 'Loyalty points'])),
      fld('Resolution note to customer', ta('This message is shown to the customer'), 'sm:col-span-2'),
      fld('Internal note', ta('Admin-only notes and evidence summary'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Notify customer', true)}${chk('Notify vendor', true)}${chk('Add to vendor violation log', true)}${chk('Close case after resolution', true)}</div>`
    ]) + modalFoot('Resolve case', 'Dispute resolved'))
});

AD('abandoned-carts.html', {
  title: 'Abandoned Carts', sub: 'Recover lost revenue with reminders, vouchers and price-drop alerts.', crumb: 'Abandoned carts',
  actions: [['Recovery settings', 'cog'], ['Export', 'dl'], ['Send recovery emails', 'mail', 'primary']],
  stats: [['Abandoned carts (30d)', '48,620', '+6%', 'cart', 'brand', tk(18400000) + ' potential'],
    ['Recovered', '8,420', '+14%', 'check', 'service', tk(3240000) + ' recovered'],
    ['Recovery rate', '17.3%', '+2.1%', 'chart', 'gold', 'Industry avg. 12%'],
    ['Avg. cart value', tk(3780), '+4%', 'money', 'ink', '2.8 items per cart']],
  tabs: [['All', '48,620'], ['Last 24 hours', '1,842'], ['Recoverable', '32,480'], ['Reminder sent', '18,240'], ['Recovered', '8,420'], ['Lost', '24,860'], ['Guest carts', '12,480']],
  filters: ['search', ['Value: All', 'Above ' + tk(5000), tk(1000) + '–' + tk(5000), 'Below ' + tk(1000)], ['Customer: All', 'Registered', 'Guest'], ['Stage: All', 'Cart', 'Checkout started', 'Payment failed'], ['Reminder: All', 'Not sent', '1 sent', '2+ sent'], 'date'],
  bulk: ['Send reminder', 'Send voucher', 'Assign to agent', 'Mark as lost', 'Export'],
  head: ['Cart ID', 'Customer', 'Items', 'Cart value', 'Stage', 'Abandoned', 'Reminders', 'Voucher sent', 'Device', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>#CRT-98421</b>', prow(0, 'Tanvir Ahmed', 'tanvir@mail.com · 01711-234567'), '3 items<p class="text-[11px] text-ink-400">Realme C100X +2</p>', '<b>' + tk(14680) + '</b>', bd('Payment failed', 'red'), '18 min ago', '0', '—', 'Android app', st('Recoverable'), A([['View cart', 'eye'], ['Send reminder', 'mail'], ['Send ' + tk(200) + ' voucher', 'gift'], ['Call customer', 'phone'], ['Create order manually', 'plus']])],
    ['<b>#CRT-98418</b>', prow(1, 'Shirin Akhter', 'shirin@mail.com'), '5 items', tk(8940), bd('Checkout started', 'amber'), '2 hrs ago', '1', bd('10% off', 'green'), 'Mobile web', st('Reminder sent'), A([['View cart', 'eye'], ['Send reminder', 'mail'], ['Send voucher', 'gift']])],
    ['<b>#CRT-98402</b>', '<span class="text-ink-400 text-[12px]">Guest · 01911-***789</span>', '1 item', tk(32990), bd('Cart', 'gray'), '6 hrs ago', '0', '—', 'Desktop', st('Recoverable'), A([['View cart', 'eye'], ['Send SMS', 'msg']])],
    ['<b>#CRT-98380</b>', prow(2, 'Farhana Akter', 'farhana@mail.com'), '8 items', tk(4280), bd('Cart', 'gray'), '1 day ago', '2', bd('Free shipping', 'green'), 'iOS app', st('Recovered'), A([['View order', 'eye'], ['View journey', 'chart']])],
    ['<b>#CRT-98240</b>', prow(3, 'Imran Khan', 'imran@mail.com'), '2 items', tk(68900), bd('Checkout started', 'amber'), '3 days ago', '3', bd('5% off', 'green'), 'Desktop', st('Lost'), A([['View cart', 'eye'], ['Final offer', 'gift'], ['Mark lost', 'x']])]
  ], total: 48620,
  after: row3(card('Recovery performance', `<div class="p-4">${lineChart([12, 14, 13, 16, 18, 17, 20, 22, 21, 24, 26, 25, 28, 30], ['1 Aug', '8 Aug', '15 Aug', '22 Aug'])}
${kv([['Email recovery rate', '11.2%'], ['SMS recovery rate', '8.6%'], ['Push recovery rate', '14.8%'], ['Voucher recovery rate', '<b>24.6%</b>']])}</div>`),
    card('Abandonment reasons (survey)', `<div class="p-4">${hbars([['Shipping cost too high', 88, '32%'], ['Just browsing', 72, '26%', '#6c7a91'], ['Found cheaper elsewhere', 52, '18%', '#ffb020'], ['Payment failed', 38, '13%', '#b42318'], ['Long checkout', 22, '8%', '#00b894'], ['Other', 8, '3%', '#8b5cf6']])}</div>`),
    card('Recovery automation', `<div class="p-4">${frows([['Reminder 1 — after 1 hour', 'Email + push notification with cart contents.', true],
      ['Reminder 2 — after 24 hours', 'Email with 5% discount voucher.', true],
      ['Reminder 3 — after 72 hours', 'SMS with free shipping offer.', true],
      ['Price drop alert', 'Notify when a cart item price drops.', true],
      ['Back in stock alert', 'Notify when an out-of-stock cart item returns.', true],
      ['Agent call for high value', 'Assign carts above ' + tk(20000) + ' to a sales agent.', true]])}</div>`))
});

AD('invoices.html', {
  title: 'Invoices', sub: 'Customer invoices, vendor commission invoices and subscription bills.', crumb: 'Invoices',
  actions: [['Invoice settings', 'cog'], ['Bulk download', 'dl'], ['Create invoice', 'plus', 'primary']],
  stats: [['Invoices (30d)', '2,86,420', '+12%', 'file', 'brand', tk(842000000) + ' billed'],
    ['Commission invoices', '8,642', '', 'percent', 'service', 'To vendors monthly'],
    ['Unpaid / overdue', '1,842', '', 'warn', 'gold', tk(4820000) + ' outstanding'],
    ['VAT collected', tk(12600000), '+9%', 'money', 'ink', 'For NBR submission']],
  tabs: [['All invoices', '2,86,420'], ['Customer invoices', '2,84,620'], ['Commission invoices', '8,642'], ['Subscription invoices', '4,860'], ['Credit notes', '3,420'], ['Unpaid', '1,842'], ['Overdue', '486']],
  filters: ['search', ['All types', 'Customer order', 'Vendor commission', 'Subscription', 'Lead billing', 'Ads', 'Credit note'], ['All statuses', 'Paid', 'Unpaid', 'Overdue', 'Cancelled'], ['All vendors', 'Rahim Electric', 'Gadget World BD'], 'date', ['Sort: Newest', 'Highest amount', 'Most overdue']],
  bulk: ['Download PDF', 'Send by email', 'Mark paid', 'Cancel', 'Export'],
  head: ['Invoice #', 'Type', 'Issued to', 'Reference', 'Subtotal', 'VAT', 'Total', 'Paid', 'Due date', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>INV-2026-284192</b><p class="text-[11px] text-ink-400">22 Aug 2026</p>', bd('Customer order', 'blue'), 'Nusrat Jahan', '<a href="orders.html" class="link">#ORD-284192</a>', tk(22280), tk(2400), '<b>' + tk(24680) + '</b>', tk(24680), '—', st('Paid'), A([['View invoice', 'eye'], ['Download PDF', 'dl'], ['Email invoice', 'mail'], ['Print', 'print'], ['Create credit note', 'refresh']])],
    ['<b>CMS-2026-08-0142</b><p class="text-[11px] text-ink-400">01 Aug 2026</p>', bd('Vendor commission', 'amber'), 'Rahim Electric', 'July 2026 commission', tk(184000), tk(27600), '<b>' + tk(211600) + '</b>', tk(211600), '05 Aug 2026', st('Paid'), A([['View invoice', 'eye'], ['Download PDF', 'dl'], ['Commission breakdown', 'percent']])],
    ['<b>SUB-2026-08-0842</b><p class="text-[11px] text-ink-400">01 Aug 2026</p>', bd('Subscription', 'blue'), 'Dhaka AC Service', 'Gold plan — Aug 2026', tk(4500), tk(675), tk(5175), '—', '<b class="text-brand-600">10 Aug 2026</b>', st('Overdue'), A([['View invoice', 'eye'], ['Send reminder', 'bell'], ['Mark paid', 'check'], ['Suspend listing', 'ban', 1]])],
    ['<b>LED-2026-08-1842</b>', bd('Lead billing', 'blue'), 'Green Life Diagnostic', '186 leads — Aug 2026', tk(15810), tk(2372), tk(18182), tk(18182), '—', st('Paid'), A([['View invoice', 'eye'], ['Lead breakdown', 'users']])],
    ['<b>CRN-2026-000842</b>', bd('Credit note', 'gray'), 'Sadia Islam', 'Refund for #ORD-283960', '-' + tk(9817), '-' + tk(1473), '-' + tk(11290), '—', '—', st('Issued'), A([['View credit note', 'eye'], ['Download PDF', 'dl']])]
  ], total: 286420,
  after: row2(card('Invoice template & numbering', `<div class="p-4">${gridForm([
    fld('Company name', inp('Niko Marketplace Ltd.')), fld('BIN / VAT registration', inp('004561234-0201')),
    fld('Invoice prefix', inp('INV-')), fld('Next invoice number', inp('284193')),
    fld('Commission invoice prefix', inp('CMS-')), fld('Credit note prefix', inp('CRN-')),
    fld('Default VAT rate', sel(['15%', '7.5%', '5%', 'Exempt'])), fld('Currency', sel(['BDT (৳)', 'USD ($)'])),
    fld('Invoice footer note', ta('Thank you for shopping with Niko. This is a computer-generated invoice.'), 'sm:col-span-2'),
    fld('Company logo', `<button class="dz w-full !py-3">${svg('image', 'w-4 h-4 mx-auto mb-1')}Upload logo</button>`),
    fld('Authorised signature', `<button class="dz w-full !py-3">${svg('image', 'w-4 h-4 mx-auto mb-1')}Upload signature</button>`)
  ])}${frows([['Auto-email invoice on payment', 'Send PDF invoice to the customer immediately.', true],
    ['Include vendor details', 'Show vendor name, address and BIN on invoices.', true],
    ['Mushak 6.3 format (NBR)', 'Generate VAT challan in the NBR-approved format.', true],
    ['Digital signature', 'Attach digital signature to PDF invoices.', false]])}</div>`),
    card('Invoice preview', `<div class="p-4"><div class="border border-[#e7e9ef] rounded-xl p-4 text-[12px]">
<div class="flex justify-between items-start mb-3"><div><p class="text-[15px] font-black text-brand-600">niko</p><p class="text-ink-400 text-[11px]">Niko Marketplace Ltd.<br>House 42, Road 11, Banani, Dhaka 1213<br>BIN: 004561234-0201</p></div>
<div class="text-right"><p class="font-extrabold text-[13px]">INVOICE</p><p class="text-ink-400 text-[11px]">INV-2026-284192<br>22 Aug 2026</p>${bd('PAID', 'green')}</div></div>
<div class="grid grid-cols-2 gap-3 py-3 border-y border-[#e7e9ef]"><div><p class="text-[10.5px] uppercase font-bold text-ink-400">Billed to</p><p class="font-semibold">Nusrat Jahan</p><p class="text-ink-400 text-[11px]">House 12, Road 7, Gulshan 1<br>Dhaka 1212 · 01711-234567</p></div>
<div><p class="text-[10.5px] uppercase font-bold text-ink-400">Sold by</p><p class="font-semibold">Rahim Electric & Electronics</p><p class="text-ink-400 text-[11px]">Nawabpur Road, Dhaka<br>BIN: 001234567-0101</p></div></div>
${table([['Item'], ['Qty'], ['Rate'], ['Amount', 'text-right']], [['Realme C100X 6/128GB', '1', tk(11290), tk(11290)], ['Anchor LED Bulb 9W (Pack of 4)', '2', tk(420), tk(840)], ['Gree 1.5 Ton AC Installation', '1', tk(10150), tk(10150)]])}
<div class="flex justify-end mt-3"><div class="w-56">${kv([['Subtotal', tk(22280)], ['Shipping', tk(60)], ['Discount', '-' + tk(60)], ['VAT (15%)', tk(2400)], ['<b>Total paid</b>', '<b>' + tk(24680) + '</b>']])}</div></div></div>
<div class="flex gap-2 mt-3">${btn('Download PDF', 'dl', 'primary')}${btn('Print', 'print')}${btn('Email', 'mail')}</div></div>`))
});

AD('transactions.html', {
  title: 'Transactions', sub: 'Every money movement — payments, refunds, payouts, fees and wallet activity.', crumb: 'Transactions',
  actions: [['Reconcile gateway', 'refresh'], ['Ledger export', 'dl'], ['Manual entry', 'plus', 'primary']],
  stats: [['Total inflow (30d)', tk(842000000), '+14%', 'money', 'service', '2.86L transactions'],
    ['Total outflow (30d)', tk(742000000), '+12%', 'up', 'brand', 'Payouts & refunds'],
    ['Gateway fees', tk(12600000), '', 'percent', 'gold', '1.5% average'],
    ['Unreconciled', '184', '', 'warn', 'ink', tk(842000) + ' pending match']],
  tabs: [['All', '2,86,420'], ['Payments in', '2,68,420'], ['Refunds', '3,420'], ['Payouts', '8,642'], ['Fees', '2,860'], ['Wallet', '18,420'], ['Failed', '4,862'], ['Unreconciled', '184']],
  filters: ['search', ['All types', 'Payment', 'Refund', 'Payout', 'Fee', 'Wallet top-up', 'Wallet spend', 'Adjustment'], ['All methods', 'bKash', 'Nagad', 'Rocket', 'Card', 'Bank transfer', 'COD', 'Wallet'], ['All statuses', 'Success', 'Pending', 'Failed', 'Reversed'], 'date', ['Sort: Newest', 'Highest amount']],
  bulk: ['Reconcile', 'Retry', 'Export'],
  head: ['Transaction ID', 'Date & time', 'Type', 'Party', 'Method', 'Reference', 'Amount', 'Fee', 'Net', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<code class="text-[11px]">TXN-8842194</code>', '22 Aug 2026<p class="text-[11px] text-ink-400">02:18:42 PM</p>', bd('Payment in', 'green'), 'Nusrat Jahan', 'bKash<p class="text-[11px] text-ink-400">TrxID 8FG2H4K9</p>', '<a href="orders.html" class="link">#ORD-284192</a>', '<b class="text-service-600">+' + tk(24680) + '</b>', tk(370), tk(24310), st('Success'), A([['View details', 'eye'], ['Gateway response', 'db'], ['Refund', 'refresh'], ['Download receipt', 'dl']])],
    ['<code class="text-[11px]">TXN-8842180</code>', '22 Aug 2026<p class="text-[11px] text-ink-400">11:04:18 AM</p>', bd('Payout', 'blue'), 'Rahim Electric', 'Bank transfer<p class="text-[11px] text-ink-400">DBBL ****4521</p>', 'PAYOUT-08421', '<b class="text-brand-600">-' + tk(184000) + '</b>', tk(30), tk(183970), st('Success'), A([['View details', 'eye'], ['Bank advice', 'file'], ['Download receipt', 'dl']])],
    ['<code class="text-[11px]">TXN-8842104</code>', '21 Aug 2026', bd('Refund', 'amber'), 'Sadia Islam', 'bKash reversal', '<a href="orders.html" class="link">#ORD-283960</a>', '<b class="text-brand-600">-' + tk(11290) + '</b>', tk(0), tk(11290), st('Success'), A([['View details', 'eye'], ['Dispute case', 'flag']])],
    ['<code class="text-[11px]">TXN-8842086</code>', '21 Aug 2026', bd('Wallet top-up', 'blue'), 'Farhana Akter', 'Nagad', 'WALLET-48219', '+' + tk(5000), tk(75), tk(4925), st('Success'), A([['View details', 'eye']])],
    ['<code class="text-[11px]">TXN-8841960</code>', '20 Aug 2026', bd('Payment in', 'green'), 'Imran Khan', 'Card (Visa ****4242)', '<a href="orders.html" class="link">#ORD-284102</a>', tk(4280), '—', '—', st('Failed'), A([['View error', 'warn'], ['Retry', 'refresh'], ['Send payment link', 'link']])],
    ['<code class="text-[11px]">TXN-8841842</code>', '20 Aug 2026', bd('Fee', 'gray'), 'Platform', 'Gateway settlement', 'FEE-AUG-W3', '-' + tk(284000), '—', '-' + tk(284000), st('Success'), A([['View details', 'eye'], ['Settlement report', 'file']])]
  ], total: 286420,
  after: row3(card('Cash flow (30 days)', `<div class="p-4">${lineChart([42, 48, 46, 52, 58, 56, 64, 62, 68, 72, 70, 78, 82, 86], ['1 Aug', '8 Aug', '15 Aug', '22 Aug'])}
${kv([['Opening balance', tk(48200000)], ['Total inflow', tk(842000000)], ['Total outflow', tk(742000000)], ['<b>Closing balance</b>', '<b>' + tk(148200000) + '</b>']])}</div>`),
    card('Gateway reconciliation', table([['Gateway'], ['Settled'], ['Diff'], ['', 'text-right']], [
      ['<b>bKash</b>', tk(184000000), bd('Matched', 'green'), A([['Report', 'file']])],
      ['<b>Nagad</b>', tk(62000000), bd('Matched', 'green'), A([['Report', 'file']])],
      ['<b>SSLCommerz (card)</b>', tk(112000000), bd(tk(842000), 'amber'), A([['Investigate', 'search'], ['Report', 'file']])],
      ['<b>Rocket</b>', tk(18000000), bd('Matched', 'green'), A([['Report', 'file']])],
      ['<b>COD (couriers)</b>', tk(466000000), bd(tk(184000), 'amber'), A([['Investigate', 'search']])]
    ]), btn('Run reconciliation', 'refresh', 'outline')),
    card('Fees & charges', `<div class="p-4">${kv([['bKash MDR (1.5%)', tk(2760000)], ['Nagad MDR (1.4%)', tk(868000)], ['Card MDR (2.5%)', tk(2800000)], ['Courier COD fee (1%)', tk(4660000)], ['Bank transfer charges', tk(86000)], ['Gateway refund fees', tk(142000)], ['<b>Total fees</b>', '<b>' + tk(12600000) + '</b>']])}
${note('Card MDR is above the 2% negotiated rate. Review the SSLCommerz agreement.', 'gold', 'warn')}</div>`))
});
