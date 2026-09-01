/* Admin: gift-cards, taxes */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, donut, lineChart, modal, modalFoot } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('gift-cards.html', {
  title: 'Gift Cards & Wallets', sub: 'Issue gift cards, manage customer wallet balances and loyalty points.', crumb: 'Gift cards & wallets',
  actions: [['Wallet settings', 'cog'], ['Export', 'dl'], ['Issue gift card', 'plus', 'primary', 'data-modal-open="m-gc"']],
  stats: [['Wallet liability', tk(18400000), '+8%', 'wallet', 'brand', '1.24L active wallets'],
    ['Gift cards active', '8,642', '+12%', 'gift', 'service', tk(4820000) + ' unredeemed'],
    ['Loyalty points issued', '4.82 Cr', '+16%', 'award', 'gold', tk(4820000) + ' value'],
    ['Redeemed (30d)', tk(2840000), '+18%', 'check', 'ink', '48,620 redemptions']],
  tabs: [['Gift cards', '8,642'], ['Wallets', '1,24,000'], ['Loyalty points', '86,420'], ['Cashback', '18,420'], ['Refund credits', '3,420'], ['Expired', '842'], ['Blocked', '48']],
  filters: ['search', ['Type: All', 'Gift card', 'Wallet', 'Loyalty', 'Cashback', 'Refund credit'], ['Status: All', 'Active', 'Partially used', 'Fully used', 'Expired', 'Blocked'], ['Value: All', 'Above ' + tk(5000), tk(500) + '–' + tk(5000)], 'date'],
  bulk: ['Extend expiry', 'Block', 'Resend code', 'Export'],
  head: ['Code / Account', 'Type', 'Owner', 'Issued value', 'Balance', 'Used', 'Source', 'Issued on', 'Expires', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<code class="text-[11.5px] font-bold">NIKO-GIFT-8842-XK92</code>', bd('Gift card', 'amber'), 'Nusrat Jahan<p class="text-[11px] text-ink-400">Gifted by Tanvir Ahmed</p>', tk(5000), '<b class="text-service-600">' + tk(3200) + '</b>', tk(1800), 'Purchased online', '12 Aug 2026', '12 Aug 2027', st('Active'), A([['View history', 'db'], ['Resend to email', 'mail'], ['Extend expiry', 'cal'], ['Adjust balance', 'edit'], ['Block card', 'ban', 1]])],
    ['<b>Wallet #WLT-48219</b>', bd('Wallet', 'blue'), 'Farhana Akter<p class="text-[11px] text-ink-400">farhana@mail.com</p>', '—', '<b>' + tk(4925) + '</b>', tk(12480), 'Top-ups + refunds', '04 Mar 2025', 'No expiry', st('Active'), A([['View ledger', 'db'], ['Add credit', 'plus'], ['Deduct', 'minus'], ['Freeze wallet', 'lock', 1]])],
    ['<b>Points #LP-88421</b>', bd('Loyalty', 'green'), 'Rakib Hasan', '18,400 pts', '<b>12,600 pts</b><p class="text-[11px] text-ink-400">= ' + tk(1260) + '</p>', '5,800 pts', 'Order rewards', '18 Jan 2025', '31 Dec 2026', st('Active'), A([['View ledger', 'db'], ['Add points', 'plus'], ['Expire points', 'x', 1]])],
    ['<code class="text-[11.5px] font-bold">NIKO-CB-4821-PP01</code>', bd('Cashback', 'blue'), 'Imran Khan', tk(300), tk(0), tk(300), 'bKash campaign', '02 Aug 2026', '02 Sep 2026', st('Fully used'), A([['View history', 'db']])],
    ['<code class="text-[11.5px] font-bold">NIKO-RC-8840-DD42</code>', bd('Refund credit', 'gray'), 'Sadia Islam', tk(11290), tk(11290), tk(0), 'Dispute #DSP-8842', '21 Aug 2026', 'No expiry', st('Active'), A([['View dispute', 'flag'], ['Convert to bank refund', 'bank']])],
    ['<code class="text-[11.5px] font-bold">NIKO-GIFT-8102-QQ11</code>', bd('Gift card', 'amber'), 'Unassigned (corporate)', tk(2000), tk(2000), tk(0), 'Corporate bulk order', '10 Jul 2026', '<b class="text-brand-600">10 Sep 2026</b>', st('Active'), A([['Assign to customer', 'user'], ['Print card', 'print'], ['Block', 'ban', 1]])]
  ], total: 8642,
  after: row3(card('Wallet & credits liability', `<div class="p-4">${kv([['Customer wallet balances', tk(11400000)], ['Unredeemed gift cards', tk(4820000)], ['Loyalty points value', tk(1820000)], ['Cashback pending', tk(360000)], ['<b>Total liability</b>', '<b>' + tk(18400000) + '</b>'], ['Expiring in 30 days', tk(842000)], ['Breakage (expired, 12m)', tk(1240000)]])}
${note('Wallet liability must be reported in the monthly financial statement.', 'blue', 'info')}</div>`),
    card('Redemption trend', `<div class="p-4">${lineChart([18, 22, 20, 26, 30, 28, 34, 32, 38, 42, 40, 46, 48, 52], ['1 Aug', '8 Aug', '15 Aug', '22 Aug'])}
${kv([['Gift card redemption rate', '68%'], ['Avg. wallet spend', tk(1840)], ['Points redemption rate', '42%'], ['Wallet repeat-order lift', '+34%']])}</div>`),
    card('Programme settings', `<div class="p-4">${gridForm([
      fld('Points per ' + tk(100) + ' spent', inp('10 points')), fld('Point value', inp(tk(0.1) + ' per point')),
      fld('Min. points to redeem', inp('500 points')), fld('Points expiry', sel(['12 months', '24 months', 'Never'])),
      fld('Gift card min / max', inp(tk(500) + ' – ' + tk(50000))), fld('Gift card validity', sel(['12 months', '24 months', '36 months'])),
      fld('Wallet top-up min', inp(tk(100))), fld('Max wallet balance', inp(tk(200000)))
    ])}${frows([['Allow gift card purchase', 'Customers can buy gift cards on the storefront.', true],
      ['Wallet top-up bonus', 'Give 2% bonus on top-ups above ' + tk(5000) + '.', true],
      ['Allow wallet withdrawal to bank', 'Customers can withdraw refund credits.', true],
      ['Points on service bookings', 'Award loyalty points for service bookings too.', true]])}</div>`))
    + modal('m-gc', 'Issue gift card / credit', gridForm([
      fld('Type *', sel(['Gift card', 'Wallet credit', 'Loyalty points', 'Cashback', 'Compensation credit'])),
      fld('Amount *', inp(tk(1000))),
      fld('Recipient', sel(['Specific customer', 'Bulk (CSV upload)', 'Customer segment', 'Unassigned (printable)'])),
      fld('Customer email / phone', inp('Search customer…')),
      fld('Quantity', inp('1')), fld('Code prefix', inp('NIKO-GIFT-')),
      fld('Valid from', inp('23 Aug 2026')), fld('Expires on', inp('23 Aug 2027')),
      fld('Usable on', sel(['Everything', 'Products only', 'Services only', 'Specific categories', 'Specific vendors'])),
      fld('Minimum order value', inp(tk(0))),
      fld('Reason / campaign', inp('e.g. Eid corporate gifting'), 'sm:col-span-2'),
      fld('Personal message', ta('Message shown to the recipient'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Send email notification', true)}${chk('Send SMS', true)}${chk('Allow partial redemption', true)}${chk('Transferable', false)}${chk('Combine with coupons', true)}</div>`
    ]) + modalFoot('Issue now', 'Gift card issued'))
});

AD('taxes.html', {
  title: 'Tax & VAT', sub: 'VAT rates, tax classes, HS codes, TDS/VDS rules and NBR reporting.', crumb: 'Tax & VAT',
  actions: [['NBR submission', 'up'], ['Export Mushak 9.1', 'dl'], ['Add tax rate', 'plus', 'primary', 'data-modal-open="m-tax"']],
  stats: [['VAT collected (30d)', tk(12600000), '+9%', 'scale', 'brand', 'Output VAT'],
    ['VAT on commission', tk(10104000), '+14%', 'percent', 'service', 'Platform service VAT'],
    ['TDS deducted', tk(4820000), '', 'money', 'gold', 'From vendor payouts'],
    ['Next return due', '15 Sep 2026', '', 'cal', 'ink', 'Mushak 9.1 monthly']],
  tabs: [['Tax rates', '18'], ['Tax classes', '12'], ['Zones', '8'], ['TDS / VDS rules', '14'], ['Exemptions', '24'], ['Returns & filings', '48'], ['Reports', '']],
  filters: ['search', ['Type: All', 'VAT', 'SD (supplementary duty)', 'TDS', 'VDS', 'Customs'], ['Applies to: All', 'Products', 'Services', 'Commission', 'Shipping'], ['Status: All', 'Active', 'Inactive']],
  head: ['Tax name', 'Type', 'Rate', 'Applies to', 'HS / Service code', 'Zone', 'Compound', 'Included in price', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>Standard VAT</b><p class="text-[11px] text-ink-400">System default</p>', bd('VAT', 'blue'), '<b>15%</b>', 'Most products & services', '—', 'Bangladesh (all)', 'No', bd('Inclusive', 'green'), st('Active'), A([['Edit rate', 'edit'], ['Applied categories', 'layers'], ['History', 'db']])],
    ['<b>Reduced VAT — essentials</b>', bd('VAT', 'blue'), '<b>5%</b>', 'Rice, lentils, edible oil', '1006.30', 'Bangladesh (all)', 'No', bd('Inclusive', 'green'), st('Active'), A([['Edit rate', 'edit'], ['Applied categories', 'layers']])],
    ['<b>VAT exempt — books & medicine</b>', bd('Exempt', 'gray'), '0%', 'Books, prescribed medicine', '4901.99', 'Bangladesh (all)', 'No', '—', st('Active'), A([['Edit rate', 'edit'], ['Exemption docs', 'file']])],
    ['<b>Service VAT — restaurants</b>', bd('VAT', 'blue'), '<b>7.5%</b>', 'Non-AC restaurant services', 'S003.10', 'Bangladesh (all)', 'No', bd('Inclusive', 'green'), st('Active'), A([['Edit rate', 'edit']])],
    ['<b>Supplementary duty — cosmetics</b>', bd('SD', 'amber'), '<b>10%</b>', 'Imported cosmetics', '3304.99', 'Bangladesh (all)', 'Yes (before VAT)', bd('Inclusive', 'green'), st('Active'), A([['Edit rate', 'edit']])],
    ['<b>VDS on commission</b>', bd('VDS', 'amber'), '<b>15%</b>', 'Platform commission (S099.10)', 'S099.10', 'Bangladesh (all)', 'No', bd('Added', 'blue'), st('Active'), A([['Edit rule', 'edit'], ['Vendor impact', 'users']])],
    ['<b>TDS on vendor payout</b>', bd('TDS', 'amber'), '<b>0.6%</b>', 'Payouts above ' + tk(100000), '—', 'Bangladesh (all)', 'No', '—', st('Active'), A([['Edit rule', 'edit'], ['Certificates', 'file']])]
  ], total: 18,
  after: row2(card('Tax settings', `<div class="p-4">${gridForm([
    fld('Company BIN', inp('004561234-0201')), fld('VAT circle / division', inp('Dhaka North · Circle 42')),
    fld('Prices entered', sel(['Inclusive of VAT', 'Exclusive of VAT'])), fld('Display prices', sel(['VAT inclusive', 'VAT exclusive + tax line'])),
    fld('Tax calculated on', sel(['Item price after discount', 'Item price before discount'])), fld('Shipping taxable', sel(['Yes — standard rate', 'No', 'Same rate as item'])),
    fld('Rounding', sel(['Round per line item', 'Round per invoice', 'No rounding'])), fld('Filing period', sel(['Monthly', 'Quarterly'])),
    fld('Mushak forms enabled', inp('6.3, 6.6, 9.1'), 'sm:col-span-2')
  ])}${frows([['Collect vendor BIN / TIN', 'Required before first payout for business sellers.', true],
    ['Auto-deduct TDS / VDS', 'Deduct at source during payout and issue certificates.', true],
    ['Generate Mushak 6.3 challan', 'Attach VAT challan to every customer invoice.', true],
    ['Digital VAT book (Mushak 6.1/6.2)', 'Maintain purchase & sales registers automatically.', true]])}</div>`),
    card('VAT summary & filings', table([['Period'], ['Output VAT'], ['Input VAT'], ['Net payable'], ['Return'], ['Status'], ['', 'text-right']], [
      ['Aug 2026 (to date)', tk(12600000), tk(842000), tk(11758000), 'Mushak 9.1', st('Draft'), A([['View report', 'eye'], ['Generate return', 'file']])],
      ['Jul 2026', tk(11840000), tk(786000), tk(11054000), 'Mushak 9.1', st('Submitted'), A([['View return', 'eye'], ['Download', 'dl'], ['Challan', 'file']])],
      ['Jun 2026', tk(10420000), tk(742000), tk(9678000), 'Mushak 9.1', st('Paid'), A([['View return', 'eye'], ['Payment receipt', 'file']])],
      ['May 2026', tk(9860000), tk(680000), tk(9180000), 'Mushak 9.1', st('Paid'), A([['View return', 'eye']])],
      ['Apr 2026', tk(12480000), tk(920000), tk(11560000), 'Mushak 9.1', st('Paid'), A([['View return', 'eye']])]
    ]), btn('Tax report centre', 'chart', 'ghost'))
    + modal('m-tax', 'Add / edit tax rate', gridForm([
      fld('Tax name *', inp('e.g. Reduced VAT — essentials')),
      fld('Tax type *', sel(['VAT', 'Supplementary duty (SD)', 'TDS', 'VDS', 'Customs duty', 'Exempt'])),
      fld('Rate (%) *', inp('15')), fld('Fixed amount (if any)', inp(tk(0))),
      fld('Applies to', sel(['All products', 'Selected categories', 'Selected products', 'All services', 'Commission', 'Shipping'])),
      fld('Category / service selection', inp('Search…')),
      fld('HS code / Service code', inp('e.g. 8517.12 or S099.10')), fld('Tax zone', sel(['Bangladesh (all)', 'Export', 'EPZ / bonded', 'Specific district'])),
      fld('Price treatment', sel(['Included in price', 'Added at checkout'])), fld('Compound tax', sel(['No', 'Yes — apply after SD'])),
      fld('Effective from', inp('01 Sep 2026')), fld('Effective until', inp('No end date')),
      fld('Legal reference / SRO', inp('e.g. SRO 240-AIN/2026/... '), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Show on invoice separately', true)}${chk('Apply to vendors', true)}${chk('Apply to digital goods', false)}</div>`
    ]) + modalFoot('Save tax rate', 'Tax rate saved')))
});
