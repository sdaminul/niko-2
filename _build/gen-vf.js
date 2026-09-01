/* Vendor finance/store/growth pages */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, svg, ph, stars, tk, prow, hbars, lineChart, barChart, donut, mini, tiles, kv, note, fld, inp, sel, ta, sw, chk, gridForm, frows, formCard, people, timeline, bars, modal, modalFoot, tfoot, empty } = K;
const { V, btn, A, row2, row3, side } = R;
const money = tk;

/* ---------------------------- PAYOUTS --------------------------------- */
V('payouts.html', {
  title: 'Payouts & Balance', sub: 'Your earnings, pending settlements and bank withdrawals.', crumb: 'Payouts',
  actions: [['Statement', 'dl'], ['Payout settings', 'cog'], ['Withdraw now', 'bank', 'primary', 'data-modal-open="m-wd"']],
  stats: [['Available balance', tk(184320), '', 'wallet', 'brand', 'Ready to withdraw'],
    ['Pending settlement', tk(64280), '', 'clock', 'gold', 'Releases in 3–7 days'],
    ['Paid out (Aug)', tk(412600), '+14%', 'bank', 'service', '4 payouts completed'],
    ['Lifetime earnings', tk(8642900), '+9%', 'award', 'ink', 'Since Mar 2023']],
  top: row3(
    card('Balance breakdown', `<div class="p-4 space-y-2.5">${kv([['Gross sales (Aug)', tk(524800)], ['Platform commission (8%)', '– ' + tk(41984)], ['Payment gateway fee (1.8%)', '– ' + tk(9446)], ['Shipping charges collected', tk(18240)], ['Courier cost', '– ' + tk(14680)], ['Refunds & returns', '– ' + tk(12400)], ['Ad spend', '– ' + tk(6500)], ['VAT withheld (5%)', '– ' + tk(26240)]])}
<div class="flex items-center justify-between pt-2.5 mt-1 border-t border-[#e7e9ef]"><span class="text-[13px] font-extrabold">Net payable</span><span class="text-[16px] font-extrabold text-brand-600">${tk(184320)}</span></div></div>`, btn('Full breakdown', 'chevR', 'ghost')),
    card('Earnings trend', `<div class="p-4">${lineChart([320, 386, 412, 468, 496, 524], '#ff2525', 160)}
<div class="flex justify-between text-[11px] text-ink-400 px-1">${['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(m => `<span>${m}</span>`).join('')}</div>
${mini([[tk(524800), 'This month'], ['+14.2%', 'vs last month']])}</div>`),
    card('Bank account', `<div class="p-4"><div class="p-3.5 rounded-xl border-2 border-brand-100 bg-brand-50/40 mb-3">
<div class="flex items-center gap-2.5 mb-2">${svg('bank', 'w-5 h-5 text-brand-600')}<p class="text-[13px] font-extrabold">BRAC Bank Limited</p><span class="badge badge-green ml-auto">Primary</span></div>
${kv([['Account name', 'Rahim Electric'], ['Account no.', '•••• •••• 4821'], ['Branch', 'Banani, Dhaka'], ['Routing', '060260435'], ['Status', 'Verified']])}</div>
<div class="p-3 rounded-xl border border-[#e7e9ef] mb-3"><div class="flex items-center gap-2.5"><span class="w-8 h-8 rounded-lg bg-brand-500 grid place-items-center text-white text-[11px] font-extrabold shrink-0">bK</span>
<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold">bKash Merchant</p><p class="text-[11.5px] text-ink-400">+880 17•• ••5678 · Verified</p></div><span class="badge badge-gray">Backup</span></div></div>
<div class="flex gap-2">${btn('Add account', 'plus')}${btn('Manage', 'cog', 'ghost')}</div></div>`)),
  tabs: [['All payouts', '48'], ['Completed', '44'], ['Processing', '2'], ['Scheduled', '1'], ['Failed', '1'], ['On hold', '0']],
  filters: ['search', ['All methods', 'Bank transfer', 'bKash', 'Nagad'], ['All statuses', 'Completed', 'Processing', 'Failed'], 'date', ['Sort: Newest', 'Highest amount']],
  fbtns: btn('Export CSV', 'dl') + btn('Print', 'print', 'outline', 'data-print'),
  head: ['Payout ID', 'Requested', 'Period covered', 'Gross', 'Deductions', 'Net amount', 'Method', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>PO-2026-0248</b><p class="text-[11px] text-ink-400">Auto payout</p>', '15 Aug 2026', '01–14 Aug 2026', tk(268400), '– ' + tk(28640), `<b class="text-service-600">${tk(239760)}</b>`, 'Bank · BRAC ••4821', st('Completed'), A([['View details', 'eye'], ['Download receipt', 'dl'], ['Statement', 'file']])],
    ['<b>PO-2026-0247</b>', '01 Aug 2026', '16–31 Jul 2026', tk(196800), '– ' + tk(21200), `<b class="text-service-600">${tk(175600)}</b>`, 'Bank · BRAC ••4821', st('Completed'), A([['View details', 'eye'], ['Download receipt', 'dl']])],
    ['<b>PO-2026-0246</b><p class="text-[11px] text-ink-400">Manual request</p>', '18 Aug 2026', '15–17 Aug 2026', tk(64280), '– ' + tk(6840), `<b>${tk(57440)}</b>`, 'bKash ••5678', st('Processing'), A([['Track payout', 'pin'], ['Cancel request', 'x', 1]])],
    ['<b>PO-2026-0249</b>', 'Scheduled', '15–31 Aug 2026', tk(184320), '– ' + tk(19600), `<b>${tk(164720)}</b>`, 'Bank · BRAC ••4821', st('Scheduled'), A([['Withdraw early', 'bolt'], ['Change method', 'cog']])],
    ['<b>PO-2026-0231</b><p class="text-[11px] text-brand-600">Wrong account no.</p>', '02 Jul 2026', '16–30 Jun 2026', tk(48200), '– ' + tk(5100), `<b class="text-brand-600">${tk(43100)}</b>`, 'Bank · ••9902', st('Failed'), A([['Retry payout', 'refresh'], ['Update bank info', 'edit'], ['Contact support', 'msg']])]
  ], total: 48,
  after: row2(card('Payout schedule & rules', frows([
    ['Automatic payouts', 'Receive earnings automatically on the 1st and 15th of each month.', true],
    ['Instant payout', 'Withdraw anytime for a 1% fee (min ৳2,000).', false],
    ['Hold period', 'Funds release 3 days after delivery confirmation.', '<span class="badge badge-gray">3 days</span>'],
    ['Minimum payout', 'Payouts are processed only above this amount.', '<span class="badge badge-gray">৳1,000</span>'],
    ['Payout notifications', 'Email + SMS alert on every payout.', true],
    ['Reserve balance', '5% rolling reserve held for 30 days on new accounts.', '<span class="badge badge-amber">Not applied</span>']
  ])),
    card('Deduction & fee guide', `<div class="p-4 space-y-2.5">${[['Platform commission', '5–12% by category', 'percent'], ['Payment gateway', '1.8% on online payments', 'card'], ['COD collection fee', '2% of order value', 'truck'], ['Ad & boost spend', 'As per campaigns', 'bolt'], ['Return shipping', '৳60–130 per return', 'return'], ['VAT withholding', '5% (govt. mandated)', 'scale'], ['Instant payout fee', '1% (optional)', 'bolt']].map(r => `<div class="flex items-center gap-2.5 py-1.5">${svg(r[2], 'w-4 h-4 text-ink-400 shrink-0')}
<span class="text-[12.5px] font-semibold flex-1">${r[0]}</span><span class="text-[12px] text-ink-500">${r[1]}</span></div>`).join('')}
${note('Commission is charged only on delivered orders. Cancelled and returned orders are never charged.', 'service', 'info')}</div>`))
    + modal('m-wd', 'Withdraw funds', gridForm([
      `<div class="sm:col-span-2 p-3.5 rounded-xl bg-brand-50 flex items-center justify-between"><div><p class="text-[11.5px] text-brand-600 font-bold uppercase tracking-wide">Available balance</p><p class="text-[22px] font-extrabold text-brand-700">${tk(184320)}</p></div>${svg('wallet', 'w-9 h-9 text-brand-400')}</div>`,
      fld('Withdraw amount *', `<div class="input-group"><span class="text-[13px] font-bold text-ink-400 pl-3">৳</span><input class="input !pl-8" value="184320"></div>`, '', 'Minimum ৳1,000 · Maximum ৳1,84,320'),
      fld('Withdraw to', sel(['BRAC Bank ••4821 (Primary)', 'bKash ••5678', 'Nagad ••3390', 'Add new account'])),
      fld('Speed', sel(['Standard — free, 1–3 working days', 'Instant — 1% fee, within 30 minutes'])),
      fld('Reference note', inp('Optional note for your records')),
      `<div class="sm:col-span-2">${note('A 6-digit OTP will be sent to +880 17•• ••5678 to confirm this withdrawal.', 'gold', 'shield')}</div>`
    ]) + modalFoot('Request withdrawal', 'Withdrawal requested — OTP sent'))
});

/* -------------------------- TRANSACTIONS ------------------------------ */
V('transactions.html', {
  title: 'Transactions', sub: 'Every credit and debit on your seller account ledger.', crumb: 'Transactions',
  actions: [['Filter by date', 'cal'], ['Export ledger', 'dl'], ['Download statement', 'file', 'primary']],
  stats: [['Total credits', tk(524800), '+14%', 'up', 'service', 'Aug 2026'],
    ['Total debits', tk(112480), '+6%', 'down', 'brand', 'Fees, refunds, ads'],
    ['Net earnings', tk(412320), '+16%', 'money', 'gold', 'After all deductions'],
    ['Transactions', '1,284', '+8%', 'db', 'ink', 'This month']],
  top: row3(card('Credits vs debits', `<div class="p-4">${barChart([[86, 24], [72, 18], [94, 31], [68, 14], [88, 22], [96, 28], [78, 19]], ['#00b894', '#ff2525'], 150)}
<div class="flex gap-3 text-[11.5px] text-ink-500 mt-2 justify-center"><span class="flex items-center gap-1.5"><i class="legend-dot" style="background:#00b894"></i>Credits</span><span class="flex items-center gap-1.5"><i class="legend-dot" style="background:#ff2525"></i>Debits</span></div></div>`),
    card('Debit breakdown', `<div class="p-4">${hbars([['Commission', 74, tk(41984)], ['VAT withheld', 46, tk(26240), '#ffb020'], ['Gateway fee', 28, tk(9446), '#00b894'], ['Courier cost', 34, tk(14680), '#6c7a91'], ['Refunds', 22, tk(12400), '#b42318'], ['Ads', 12, tk(6500), '#8b5cf6']])}</div>`),
    card('Payment methods received', `<div class="p-4">${donut([['bKash', 38, '#e2136e'], ['Card', 26, '#ff2525'], ['COD', 22, '#ffb020'], ['Nagad', 9, '#f7941d'], ['Wallet', 5, '#00b894']], [tk(524800), 'Collected'])}</div>`)),

  tabs: [['All', '1,284'], ['Credits', '892'], ['Debits', '392'], ['Commission', '412'], ['Refunds', '38'], ['Payouts', '48'], ['Adjustments', '6']],
  filters: ['search', ['All types', 'Order payment', 'Commission', 'Refund', 'Payout', 'Ad spend', 'Adjustment'], ['All methods', 'bKash', 'Nagad', 'Card', 'COD', 'Wallet'], 'date', ['Sort: Newest', 'Highest amount']],
  fbtns: btn('Export CSV', 'dl') + btn('Export PDF', 'file'),
  head: ['Transaction ID', 'Date & time', 'Type', 'Reference', 'Method', 'Amount', 'Balance after', 'Status', ['', 'text-right']],
  rows: [
    ['<b>TXN-9948213</b>', '17 Aug 2026<p class="text-[11px] text-ink-400">10:42 AM</p>', '<span class="badge badge-green">Order payment</span>', '<a href="order-details.html" class="link">HB-884213</a><p class="text-[11px] text-ink-400">Realme C100X ×1</p>', 'bKash', `<b class="text-service-600">+${tk(11290)}</b>`, tk(184320), st('Completed'), A([['View order', 'eye'], ['Receipt', 'receipt']])],
    ['<b>TXN-9948212</b>', '17 Aug 2026<p class="text-[11px] text-ink-400">10:42 AM</p>', '<span class="badge badge-red">Commission</span>', 'On order HB-884213 (8%)', 'Auto deduct', `<b class="text-brand-600">– ${tk(903)}</b>`, tk(173030), st('Completed'), A([['View calculation', 'eye'], ['Commission plan', 'percent']])],
    ['<b>TXN-9948198</b>', '16 Aug 2026<p class="text-[11px] text-ink-400">04:18 PM</p>', '<span class="badge badge-green">Service booking</span>', 'BK-40218 · AC servicing', 'Cash', `<b class="text-service-600">+${tk(3200)}</b>`, tk(173933), st('Completed'), A([['View booking', 'eye']])],
    ['<b>TXN-9948176</b>', '15 Aug 2026<p class="text-[11px] text-ink-400">11:02 AM</p>', '<span class="badge badge-purple">Payout</span>', 'PO-2026-0248 · Bank transfer', 'BRAC ••4821', `<b class="text-brand-600">– ${tk(239760)}</b>`, tk(170733), st('Completed'), A([['Payout details', 'eye'], ['Receipt', 'dl']])],
    ['<b>TXN-9948142</b>', '14 Aug 2026<p class="text-[11px] text-ink-400">09:30 AM</p>', '<span class="badge badge-amber">Refund</span>', 'RT-88402 · Return approved', 'To customer wallet', `<b class="text-brand-600">– ${tk(8400)}</b>`, tk(410493), st('Completed'), A([['View return', 'eye'], ['Dispute', 'flag']])],
    ['<b>TXN-9948118</b>', '13 Aug 2026<p class="text-[11px] text-ink-400">08:00 PM</p>', '<span class="badge badge-blue">Ad spend</span>', 'CMP-2841 · Boost campaign', 'Ad balance', `<b class="text-brand-600">– ${tk(1500)}</b>`, tk(418893), st('Completed'), A([['View campaign', 'eye']])],
    ['<b>TXN-9948090</b>', '12 Aug 2026<p class="text-[11px] text-ink-400">02:15 PM</p>', '<span class="badge badge-gray">Adjustment</span>', 'Goodwill credit — courier damage', 'Admin credit', `<b class="text-service-600">+${tk(2400)}</b>`, tk(420393), st('Completed'), A([['View note', 'info']])],
    ['<b>TXN-9948064</b>', '11 Aug 2026<p class="text-[11px] text-ink-400">05:40 PM</p>', '<span class="badge badge-green">Order payment</span>', '<a href="order-details.html" class="link">HB-883901</a>', 'COD', `<b class="text-gold-700">+${tk(24800)}</b>`, tk(417993), st('Pending'), A([['Track collection', 'truck'], ['View order', 'eye']])]
  ], total: 1284,
  after: row2(card('Reconciliation summary', `<div class="p-4">${kv([['Opening balance (01 Aug)', tk(96400)], ['Total credits', '+ ' + tk(524800)], ['Total debits', '– ' + tk(112480)], ['Payouts processed', '– ' + tk(412600)], ['Closing balance', tk(184320)], ['Unsettled COD', tk(64280)], ['Disputed / on hold', tk(8400)]])}
<div class="flex gap-2 mt-3">${btn('Download ledger', 'dl')}${btn('Report a mismatch', 'flag')}</div></div>`),
    card('Upcoming settlements', `<div class="p-4 space-y-2.5">${[['18 Aug', 'COD collection — 12 orders', tk(28400), 'gold'], ['20 Aug', 'Card settlement — 24 orders', tk(48200), 'service'], ['22 Aug', 'bKash settlement — 38 orders', tk(36800), 'brand'], ['01 Sep', 'Scheduled payout', tk(164720), 'ink']].map(r => `<div class="flex items-center gap-3 p-2.5 rounded-xl border border-[#e7e9ef]">
<span class="w-10 h-10 rounded-lg bg-${r[3]}-50 text-${r[3]}-600 grid place-items-center text-[11px] font-extrabold shrink-0">${r[0].split(' ')[0]}</span>
<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold clamp-1">${r[1]}</p><p class="text-[11.5px] text-ink-400">${r[0]} 2026</p></div>
<b class="text-[13px] shrink-0">${r[2]}</b></div>`).join('')}</div>`))
});


