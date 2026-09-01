const fs = require('fs');
const { svg, ph, stars, dashPage, stats, card, lineChart, donut, filterbar, tabs, table, tfoot, st, empty, actionsCell } = require('./dash');
const W = (f, o) => fs.writeFileSync('user/' + f, dashPage(Object.assign({ role: 'user' }, o)));

/* --------------------------------- WALLET -------------------------------- */
W('wallet.html', {
  title: 'Wallet &amp; Payments', sub: 'Your HaatBazar balance, saved payment methods and refund history.', active: 'wallet.html', crumbs: ['Payments', 'Wallet'],
  actions: `<button class="btn btn-sm btn-outline">${svg('dl')}Statement</button><button class="btn btn-sm btn-primary" data-modal-open="topup">${svg('plus')}Add money</button>`,
  body: `
<div class="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3.5 mb-4">
<div class="card p-5 bg-gradient-to-br from-brand-600 to-brand-800 text-white relative overflow-hidden">
<div class="absolute -right-8 -bottom-10 w-40 h-40 rounded-full bg-white/10"></div>
<p class="text-[12.5px] text-white/70 mb-1">Available balance</p>
<p class="text-[32px] font-extrabold tracking-tight mb-1">৳2,480.00</p>
<p class="text-[12px] text-white/70 mb-4">Usable on any product or service payment</p>
<div class="flex gap-2 relative z-10"><button class="btn btn-sm !bg-white !text-brand-700" data-modal-open="topup">Add money</button><button class="btn btn-sm !bg-white/15 !text-white" data-modal-open="withdraw">Withdraw</button></div></div>
<div class="card p-5"><p class="text-[12.5px] text-ink-500 mb-1">HaatBazar points</p>
<p class="text-[32px] font-extrabold tracking-tight text-gold-600 mb-1">2,480</p>
<p class="text-[12px] text-ink-400 mb-3">100 points = ৳10 discount at checkout</p>
<div class="bar mb-1"><i style="width:64%"></i></div><p class="text-[11.5px] text-ink-400 mb-3">3,520 more points for Platinum tier</p>
<a href="vouchers.html" class="btn btn-sm btn-outline btn-block">Redeem points</a></div>
<div class="card p-5"><p class="text-[12.5px] text-ink-500 mb-1">Pending refunds</p>
<p class="text-[32px] font-extrabold tracking-tight mb-1">৳2,950</p>
<p class="text-[12px] text-ink-400 mb-3">1 refund is being processed</p>
<div class="p-2.5 rounded-lg bg-ink-50 text-[12px] text-ink-600 mb-3">RTN-4790 · Expected by 26 Aug 2026</div>
<a href="returns.html" class="btn btn-sm btn-outline btn-block">Track refunds</a></div></div>

${stats([['Total spent (12 mo)', '৳1,84,320', '+18%', 'money', 'brand'], ['Total saved', '৳12,480', '', 'tag', 'service'], ['Cashback earned', '৳3,240', '+৳420', 'gift', 'gold'], ['Transactions', '186', '', 'refresh', 'brand']])}

<div class="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-4">
<div class="space-y-4">
${card('Transaction history', tabs([['All', '186'], ['Payments', '142'], ['Refunds', '18'], ['Top-ups', '20'], ['Cashback', '6']], 'px-4 pt-1') +
    table([['Date'], ['Description'], ['Method'], ['Type'], ['Amount', 'num'], ['Status']], [
      ['15 Aug 2026<p class="text-[11px] text-ink-400">10:24 AM</p>', '<b>Order HB-884213</b><p class="text-[11.5px] text-ink-400">Realme C100X + 1 item</p>', 'bKash', '<span class="badge badge-gray">Payment</span>', '<b class="text-brand-600">-৳11,290</b>', st('Completed')],
      ['12 Aug 2026<p class="text-[11px] text-ink-400">6:02 PM</p>', '<b>Wallet top-up</b><p class="text-[11.5px] text-ink-400">Self top-up</p>', 'Nagad', '<span class="badge badge-green">Top-up</span>', '<b class="text-green-600">+৳2,000</b>', st('Completed')],
      ['11 Aug 2026<p class="text-[11px] text-ink-400">1:11 PM</p>', '<b>Order HB-884109</b><p class="text-[11.5px] text-ink-400">Cotton Panjabi</p>', 'Wallet', '<span class="badge badge-gray">Payment</span>', '<b class="text-brand-600">-৳1,850</b>', st('Completed')],
      ['6 Aug 2026<p class="text-[11px] text-ink-400">9:40 AM</p>', '<b>Refund RTN-4821</b><p class="text-[11.5px] text-ink-400">Smart Watch return</p>', 'bKash', '<span class="badge badge-blue">Refund</span>', '<b class="text-green-600">+৳2,300</b>', st('Completed')],
      ['2 Aug 2026<p class="text-[11px] text-ink-400">4:15 PM</p>', '<b>Booking BKG-2790</b><p class="text-[11.5px] text-ink-400">Electrical wiring repair</p>', 'Cash', '<span class="badge badge-teal">Service</span>', '<b class="text-brand-600">-৳900</b>', st('Completed')],
      ['28 Jul 2026<p class="text-[11px] text-ink-400">11:02 AM</p>', '<b>Cashback — Eid campaign</b><p class="text-[11.5px] text-ink-400">5% on electronics</p>', 'Wallet', '<span class="badge badge-amber">Cashback</span>', '<b class="text-green-600">+৳420</b>', st('Completed')],
      ['24 Jul 2026<p class="text-[11px] text-ink-400">8:33 PM</p>', '<b>Order HB-883402</b><p class="text-[11.5px] text-ink-400">Smart Watch — Fitness Pro</p>', 'Card ••4821', '<span class="badge badge-gray">Payment</span>', '<b class="text-brand-600">-৳2,300</b>', st('Refunded')],
      ['19 Jul 2026<p class="text-[11px] text-ink-400">3:20 PM</p>', '<b>Order HB-883311</b><p class="text-[11.5px] text-ink-400">24 inch LED Monitor</p>', 'bKash', '<span class="badge badge-gray">Payment</span>', '<b class="text-brand-600">-৳9,900</b>', st('Completed')]
    ]) + tfoot(1, 8, 186), `<div class="flex gap-2"><input type="month" class="input input-sm !w-auto"><button class="btn btn-xs btn-outline">${svg('dl')}CSV</button></div>`)}
${card('Monthly spending', `<div class="p-4">${lineChart([18, 24, 21, 32, 28, 41, 36, 52], '#12a594', 160)}
<div class="flex justify-between mt-2 text-[11px] text-ink-400">${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(m => `<span>${m}</span>`).join('')}</div></div>`)}
</div>
<aside class="space-y-4">
${card('Saved payment methods', `<div class="p-4 space-y-2.5">${[['bKash', '01712xxxx78', 'wallet', true], ['Nagad', '01712xxxx78', 'wallet', false], ['Visa Debit', '•••• •••• •••• 4821', 'money', false], ['City Bank Card', '•••• •••• •••• 9032', 'money', false]].map(m => `<div class="flex items-center gap-3 p-3 rounded-xl border border-[#e7e9ef]">
<span class="w-10 h-10 rounded-lg bg-ink-50 text-ink-600 grid place-items-center shrink-0">${svg(m[2], 'w-4 h-4')}</span>
<div class="min-w-0 flex-1"><p class="text-[13px] font-bold">${m[0]} ${m[3] ? '<span class="badge badge-brand ml-1">Default</span>' : ''}</p><p class="text-[11.5px] text-ink-400">${m[1]}</p></div>
${actionsCell([['Set as default', 'check'], ['Edit', 'edit'], ['Remove', 'trash', true]])}</div>`).join('')}
<button class="btn btn-sm btn-outline btn-block" data-modal-open="addpay">${svg('plus')}Add payment method</button></div>`)}
${card('Auto-pay &amp; preferences', `<div class="p-4 space-y-3">${[['Use wallet balance first at checkout', true], ['Auto-refund to wallet (instant)', true], ['Save cards for faster checkout', true], ['Require OTP above ৳10,000', true]].map(p => `<label class="flex items-center justify-between gap-3"><span class="text-[12.5px] text-ink-700 pr-2">${p[0]}</span><span class="switch"><input type="checkbox" ${p[1] ? 'checked' : ''}><span class="track"></span></span></label>`).join('')}</div>`)}
${card('Accepted payment partners', `<div class="p-4 flex flex-wrap gap-2">${['bKash', 'Nagad', 'Rocket', 'Upay', 'Visa', 'Mastercard', 'AmEx', 'SSLCommerz', 'COD', 'EMI'].map(x => `<span class="badge badge-gray">${x}</span>`).join('')}</div>`)}
</aside></div>

<div class="modal" id="topup"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel is-narrow">
<div class="card-head"><h3>Add money to wallet</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5"><label class="label">Amount (৳) <span class="req">*</span></label><input class="input mb-2" placeholder="0.00">
<div class="flex flex-wrap gap-2 mb-3">${['500', '1,000', '2,000', '5,000'].map(a => `<button class="chip">৳${a}</button>`).join('')}</div>
<label class="label">Pay with <span class="req">*</span></label>
<div class="space-y-2 mb-4">${['bKash — 01712xxxx78', 'Nagad — 01712xxxx78', 'Visa Debit •••• 4821', 'Internet banking'].map((m, i) => `<label class="check p-3 rounded-xl border border-[#e7e9ef]"><input type="radio" name="pm" ${i === 0 ? 'checked' : ''}>${m}</label>`).join('')}</div>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Wallet topped up successfully">Proceed to pay</button></div></div></div></div>

<div class="modal" id="withdraw"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel is-narrow">
<div class="card-head"><h3>Withdraw balance</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5"><p class="text-[12.5px] text-ink-500 mb-3">Available: <b class="text-ink-900">৳2,480.00</b> · Minimum withdrawal ৳200</p>
<label class="label">Amount (৳) <span class="req">*</span></label><input class="input mb-3" placeholder="0.00">
<label class="label">Withdraw to <span class="req">*</span></label><select class="select mb-3"><option>bKash — 01712xxxx78</option><option>Nagad — 01712xxxx78</option><option>Bank account — City Bank ••9032</option></select>
<div class="p-3 rounded-xl bg-ink-50 text-[12px] text-ink-600 mb-4">Withdrawals are processed within 1–3 working days. A ৳10 processing fee applies to mobile wallets.</div>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Withdrawal request submitted">Request withdrawal</button></div></div></div></div>

<div class="modal" id="addpay"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel is-narrow">
<div class="card-head"><h3>Add payment method</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5"><div class="tabs mb-4" data-tabs><button class="tab is-active" data-tab="c">Card</button><button class="tab" data-tab="m">Mobile wallet</button><button class="tab" data-tab="b">Bank</button></div>
<label class="label">Card number <span class="req">*</span></label><input class="input mb-3" placeholder="1234 5678 9012 3456">
<div class="grid grid-cols-2 gap-3 mb-3"><div><label class="label">Expiry <span class="req">*</span></label><input class="input" placeholder="MM / YY"></div>
<div><label class="label">CVV <span class="req">*</span></label><input class="input" placeholder="•••"></div></div>
<label class="label">Name on card <span class="req">*</span></label><input class="input mb-3" placeholder="NUSRAT JAHAN">
<label class="check mb-4"><input type="checkbox" checked>Save this card securely for future payments</label>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Payment method added">Save method</button></div></div></div></div>`
});

/* -------------------------------- VOUCHERS ------------------------------- */
W('vouchers.html', {
  title: 'Vouchers &amp; Rewards', sub: 'Collected vouchers, loyalty points, referrals and gift cards.', active: 'vouchers.html', crumbs: ['Payments', 'Vouchers'],
  actions: `<button class="btn btn-sm btn-outline" data-modal-open="redeem">${svg('gift')}Redeem code</button><a href="../offers.html" class="btn btn-sm btn-primary">${svg('tag')}Collect more</a>`,
  body: `
${stats([['Active vouchers', '5', '', 'ticket', 'brand'], ['Points balance', '2,480', '+180', 'award', 'gold'], ['Total saved', '৳12,480', '', 'tag', 'service'], ['Referral earnings', '৳1,500', '', 'users', 'brand', '3 friends joined']])}
${tabs([['Active', '5'], ['Used', '22'], ['Expired', '8'], ['Gift cards', '2'], ['Referrals', '3']])}
<div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-3.5">${[
      ['৳400 OFF', 'NEW400', 'On orders above ৳3,000', 'Expires 31 Aug 2026', 'All categories', 'brand', '6 days left'],
      ['20% OFF', 'ELEC20', 'Max discount ৳1,500', 'Expires 25 Aug 2026', 'Electronics only', 'brand', '8 days left'],
      ['FREE DELIVERY', 'FREESHIP', 'On orders above ৳999', 'Expires 30 Sep 2026', 'All categories', 'service', '44 days left'],
      ['৳200 OFF', 'SERVICE200', 'On any service booking', 'Expires 20 Sep 2026', 'Services only', 'service', '34 days left'],
      ['15% CASHBACK', 'BKASH15', 'Pay with bKash · Max ৳300', 'Expires 31 Aug 2026', 'Payment offer', 'gold', '14 days left']
    ].map(v => `<div class="card overflow-hidden relative">
<div class="absolute left-0 top-0 bottom-0 w-1.5 bg-${v[5]}-500"></div>
<div class="p-4 pl-5"><div class="flex items-start justify-between gap-2 mb-2">
<div><p class="text-[20px] font-extrabold text-${v[5]}-600 tracking-tight">${v[0]}</p><p class="text-[12px] text-ink-500">${v[2]}</p></div>
<span class="badge badge-${v[5] === 'brand' ? 'red' : v[5] === 'service' ? 'teal' : 'amber'}">${v[6]}</span></div>
<div class="flex items-center gap-2 p-2.5 rounded-lg bg-ink-50 border border-dashed border-ink-200 mb-3">
<span class="text-[13px] font-extrabold tracking-widest flex-1">${v[1]}</span>
<button class="btn btn-xs btn-outline" data-copy="${v[1]}" data-toast="Code ${v[1]} copied">${svg('file')}Copy</button></div>
<div class="flex items-center justify-between text-[11.5px] text-ink-400 mb-3"><span>${v[4]}</span><span>${v[3]}</span></div>
<div class="flex gap-2"><a href="../products.html" class="btn btn-sm btn-${v[5] === 'service' ? 'service' : 'primary'} flex-1">Use now</a><button class="btn btn-sm btn-outline">Terms</button></div></div></div>`).join('')}</div>

<div class="grid lg:grid-cols-2 gap-4 mt-4">
${card('Loyalty points', `<div class="p-5">
<div class="flex items-end gap-3 mb-4"><p class="text-[34px] font-extrabold text-gold-500 leading-none">2,480</p><p class="text-[12.5px] text-ink-500 mb-1">points ≈ ৳248 value</p></div>
<div class="flex items-center gap-2 mb-2 text-[12px] font-bold"><span class="badge badge-amber">Gold tier</span><span class="text-ink-400 ml-auto">Platinum at 6,000 pts</span></div>
<div class="bar mb-4"><i style="width:41%"></i></div>
${table([['Activity'], ['Points'], ['Date']], [['Order HB-884213 completed', '<b class="text-green-600">+113</b>', '15 Aug 2026'], ['Product review published', '<b class="text-green-600">+25</b>', '13 Aug 2026'], ['Redeemed for ৳200 voucher', '<b class="text-brand-600">-2,000</b>', '10 Aug 2026'], ['Referral bonus — Sadia joined', '<b class="text-green-600">+500</b>', '4 Aug 2026'], ['Service booking completed', '<b class="text-green-600">+90</b>', '2 Aug 2026']], { compact: true })}
<div class="p-4 pt-3"><button class="btn btn-sm btn-gold btn-block">${svg('gift')}Convert 2,000 points → ৳200 voucher</button></div></div>`)}
${card('Refer &amp; earn ৳500', `<div class="p-5">
<p class="text-[13px] text-ink-600 mb-4">Invite a friend to HaatBazar. When they complete their first order of ৳1,000+, you both get a ৳500 voucher.</p>
<label class="label">Your referral link</label>
<div class="flex gap-2 mb-4"><input class="input" value="haatbazar.com.bd/r/NUSRAT2480" readonly><button class="btn btn-primary" data-copy="haatbazar.com.bd/r/NUSRAT2480" data-toast="Referral link copied">${svg('file')}Copy</button></div>
<div class="flex flex-wrap gap-2 mb-4">${[['msg', 'WhatsApp'], ['share', 'Facebook'], ['mail', 'Email'], ['phone', 'SMS']].map(s => `<button class="btn btn-sm btn-outline">${svg(s[0])}${s[1]}</button>`).join('')}</div>
<div class="grid grid-cols-3 gap-2 text-center mb-4">${[['12', 'Invites sent'], ['3', 'Friends joined'], ['৳1,500', 'Earned']].map(x => `<div class="p-3 rounded-xl bg-ink-50"><p class="text-[16px] font-extrabold">${x[0]}</p><p class="text-[11px] text-ink-500">${x[1]}</p></div>`).join('')}</div>
${table([['Friend'], ['Joined'], ['Status'], ['Reward']], [['Sadia Rahman', '4 Aug 2026', st('Completed'), '<b>৳500</b>'], ['Tanvir Ahmed', '22 Jul 2026', st('Completed'), '<b>৳500</b>'], ['Mehedi Hasan', '12 Jul 2026', st('Completed'), '<b>৳500</b>'], ['Rifat Islam', '16 Aug 2026', st('Pending'), '—']], { compact: true })}</div>`)}
</div>

${card('Gift cards', `<div class="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">${[['৳1,000', 'GC-8842-1123-9902', 'Balance ৳1,000', 'Valid till 12 Dec 2026'], ['৳500', 'GC-7731-4420-1188', 'Balance ৳120', 'Valid till 3 Oct 2026']].map((g, i) => `<div class="p-4 rounded-2xl bg-ink-950 text-white relative overflow-hidden">
<div class="absolute -right-6 -top-8 w-28 h-28 rounded-full bg-brand-500/25"></div>
<p class="text-[11px] uppercase tracking-widest text-white/50 mb-1">HaatBazar gift card</p>
<p class="text-[26px] font-extrabold mb-1">${g[0]}</p><p class="text-[12px] text-white/70 mb-3">${g[2]} · ${g[3]}</p>
<p class="text-[12px] font-mono tracking-wider text-white/80 mb-3">${g[1]}</p>
<button class="btn btn-xs !bg-white !text-ink-950">Use at checkout</button></div>`).join('')}
<button class="p-4 rounded-2xl border-2 border-dashed border-ink-200 grid place-items-center text-ink-400 hover:border-brand-300 hover:text-brand-600" data-modal-open="redeem">
${svg('plus', 'w-6 h-6')}<p class="text-[12.5px] font-bold mt-1">Redeem a gift card</p></button></div>`, '', 'mt-4')}

<div class="modal" id="redeem"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel is-narrow">
<div class="card-head"><h3>Redeem code</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5"><label class="label">Voucher or gift card code <span class="req">*</span></label>
<input class="input mb-3 tracking-widest uppercase" placeholder="e.g. HAAT-2026-XXXX">
<p class="hint mb-4">Codes are case-insensitive. Gift cards are added to your wallet instantly.</p>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Code redeemed successfully">Redeem</button></div></div></div></div>`
});

/* --------------------------------- PROFILE ------------------------------- */
W('profile.html', {
  title: 'My Profile', sub: 'Personal information, verification status and account preferences.', active: 'profile.html', crumbs: ['Account', 'Profile'],
  actions: `<button class="btn btn-sm btn-outline">${svg('eye')}View public profile</button><button class="btn btn-sm btn-primary" data-toast="Profile updated successfully">${svg('check')}Save changes</button>`,
  body: `
<div class="grid lg:grid-cols-[300px_minmax(0,1fr)] gap-4">
<aside class="space-y-4">
${card('', `<div class="p-5 text-center"><div class="relative inline-block mb-3"><span class="avatar avatar-xl bg-brand-500 mx-auto">N</span>
<button class="absolute -right-1 -bottom-1 w-8 h-8 rounded-full bg-white border border-[#e7e9ef] grid place-items-center text-ink-500 shadow-sm">${svg('camera', 'w-4 h-4')}</button></div>
<p class="text-[16px] font-extrabold">Nusrat Jahan</p><p class="text-[12.5px] text-ink-500 mb-2">nusrat.jahan@gmail.com</p>
<div class="flex justify-center gap-1.5 mb-4"><span class="badge badge-amber">${svg('award')}Gold</span><span class="badge badge-green">${svg('check')}Verified</span></div>
<div class="grid grid-cols-3 gap-2 text-center">${[['42', 'Orders'], ['28', 'Reviews'], ['3', 'Referrals']].map(x => `<div><p class="text-[15px] font-extrabold">${x[0]}</p><p class="text-[10.5px] text-ink-500">${x[1]}</p></div>`).join('')}</div>
<p class="text-[11.5px] text-ink-400 mt-4">Member since 12 January 2023</p></div>`)}
${card('Profile completion', `<div class="p-4"><div class="flex items-center justify-between mb-2"><span class="text-[12.5px] font-bold">85% complete</span><span class="text-[12px] text-ink-400">6 of 7</span></div>
<div class="bar mb-3"><i style="width:85%;background:#12a594"></i></div>
<div class="space-y-2">${[['Email verified', true], ['Phone verified', true], ['Profile photo added', true], ['Address added', true], ['Date of birth', true], ['Payment method saved', true], ['NID verification', false]].map(c => `<p class="flex items-center gap-2 text-[12.5px] ${c[1] ? 'text-ink-600' : 'text-ink-400'}">${svg(c[1] ? 'check' : 'x', `w-3.5 h-3.5 ${c[1] ? 'text-green-600' : 'text-ink-300'}`)}${c[0]}</p>`).join('')}</div>
<button class="btn btn-sm btn-outline btn-block mt-3">Complete NID verification</button></div>`)}
${card('Account security', `<div class="p-4 space-y-2.5">${[['lock', 'Password', 'Changed 2 months ago', 'Change'], ['shield', 'Two-factor auth', 'Enabled via SMS', 'Manage'], ['scan', 'Login devices', '3 active sessions', 'Review']].map(s => `<div class="flex items-center gap-2.5"><span class="w-9 h-9 rounded-lg bg-ink-50 text-ink-600 grid place-items-center shrink-0">${svg(s[0], 'w-4 h-4')}</span>
<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold">${s[1]}</p><p class="text-[11px] text-ink-400">${s[2]}</p></div>
<a href="settings.html" class="text-[12px] font-bold text-brand-600">${s[3]}</a></div>`).join('')}</div>`)}
</aside>
<div class="space-y-4">
${card('Personal information', `<div class="p-5 grid sm:grid-cols-2 gap-3.5">
<div><label class="label">First name <span class="req">*</span></label><input class="input" value="Nusrat"></div>
<div><label class="label">Last name <span class="req">*</span></label><input class="input" value="Jahan"></div>
<div><label class="label">Display name</label><input class="input" value="Nusrat J."><p class="hint">Shown on your reviews</p></div>
<div><label class="label">Date of birth</label><input type="date" class="input" value="1996-04-18"></div>
<div><label class="label">Gender</label><select class="select"><option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option></select></div>
<div><label class="label">Occupation</label><input class="input" value="Marketing Manager"></div>
<div class="sm:col-span-2"><label class="label">Bio</label><textarea class="textarea !min-h-[80px]">Online shopping enthusiast from Dhaka. I love reviewing gadgets and home products.</textarea></div>
<div><label class="label">Preferred language</label><select class="select"><option>English</option><option>বাংলা (Bangla)</option></select></div>
<div><label class="label">Currency</label><select class="select"><option>BDT (৳)</option><option>USD ($)</option></select></div></div>`)}
${card('Contact &amp; verification', `<div class="p-5 space-y-3.5">
<div><label class="label">Email address <span class="req">*</span></label>
<div class="flex gap-2"><input class="input" value="nusrat.jahan@gmail.com"><span class="btn btn-outline !border-green-200 !text-green-700 !bg-green-50">${svg('check')}Verified</span></div></div>
<div><label class="label">Mobile number <span class="req">*</span></label>
<div class="flex gap-2"><div class="input-affix flex-1"><span class="affix">+880</span><input class="input" value="1712-345678"></div><span class="btn btn-outline !border-green-200 !text-green-700 !bg-green-50">${svg('check')}Verified</span></div></div>
<div><label class="label">Alternate phone</label><div class="flex gap-2"><div class="input-affix flex-1"><span class="affix">+880</span><input class="input" placeholder="Optional"></div><button class="btn btn-outline">Verify</button></div></div>
<div><label class="label">NID / Passport number</label><div class="flex gap-2"><input class="input" placeholder="For high-value purchases &amp; EMI"><button class="btn btn-outline">${svg('camera')}Upload</button></div>
<p class="hint">Required for EMI purchases above ৳20,000. Your document is encrypted and never shared.</p></div></div>`)}
${card('Communication preferences', `<div class="p-5">
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Notification type</th><th class="text-center">Email</th><th class="text-center">SMS</th><th class="text-center">Push</th><th class="text-center">WhatsApp</th></tr></thead>
<tbody>${[['Order updates &amp; delivery', 1, 1, 1, 1], ['Service booking updates', 1, 1, 1, 0], ['Price drops on wishlist', 1, 0, 1, 0], ['Vouchers &amp; promotions', 1, 0, 1, 0], ['New arrivals &amp; recommendations', 0, 0, 1, 0], ['Reviews &amp; replies', 1, 0, 1, 0], ['Account &amp; security alerts', 1, 1, 1, 0], ['Newsletter (weekly)', 1, 0, 0, 0]].map(r => `<tr><td class="font-semibold text-ink-800">${r[0]}</td>${r.slice(1).map(c => `<td class="text-center"><span class="switch"><input type="checkbox" ${c ? 'checked' : ''}><span class="track"></span></span></td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`)}
${card('Interests — for better recommendations', `<div class="p-5"><p class="text-[12.5px] text-ink-500 mb-3">Pick the categories you shop most. We will personalise your home feed.</p>
<div class="flex flex-wrap gap-2" data-chip-group data-multi>${['Mobiles &amp; Gadgets', 'Electronics', 'Fashion — Women', 'Fashion — Men', 'Home &amp; Kitchen', 'Beauty', 'Groceries', 'Baby &amp; Kids', 'Books', 'Sports', 'Health', 'Home Services', 'Beauty Services', 'Tutors'].map((c, i) => `<button class="chip ${i < 5 ? 'is-active' : ''}">${c}</button>`).join('')}</div></div>`)}
${card('Danger zone', `<div class="p-5 space-y-3">
<div class="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-[#e7e9ef]"><div><p class="text-[13px] font-bold">Deactivate account temporarily</p><p class="text-[12px] text-ink-500">Hide your profile and pause all notifications. You can reactivate any time.</p></div><button class="btn btn-sm btn-outline">Deactivate</button></div>
<div class="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-red-100 bg-red-50/40"><div><p class="text-[13px] font-bold text-red-700">Delete account permanently</p><p class="text-[12px] text-ink-500">All orders, reviews, vouchers and wallet balance will be removed. This cannot be undone.</p></div><button class="btn btn-sm btn-danger" data-modal-open="del">Delete account</button></div></div>`)}
</div></div>

<div class="modal" id="del"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel is-narrow">
<div class="card-head"><h3>Delete account</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5"><div class="p-3 rounded-xl bg-red-50 text-[12.5px] text-red-700 mb-4">This action is permanent. Your wallet balance of ৳2,480 and 2,480 points will be forfeited.</div>
<label class="label">Why are you leaving?</label><select class="select mb-3"><option>I no longer shop online</option><option>Too many notifications</option><option>Privacy concerns</option><option>Bad experience with an order</option><option>Other</option></select>
<label class="label">Type DELETE to confirm <span class="req">*</span></label><input class="input mb-4" placeholder="DELETE">
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Keep my account</button><button class="btn btn-danger flex-1" data-modal-close>Delete permanently</button></div></div></div></div>`
});

/* ------------------------------ NOTIFICATIONS ---------------------------- */
W('notifications.html', {
  title: 'Notifications', sub: '3 unread · you are all caught up otherwise', active: 'notifications.html', crumbs: ['Account', 'Notifications'],
  actions: `<button class="btn btn-sm btn-outline" data-toast="All notifications marked as read">${svg('check')}Mark all read</button><button class="btn btn-sm btn-outline">${svg('cog')}Preferences</button><button class="btn btn-sm btn-danger">${svg('trash')}Clear all</button>`,
  body: `
${tabs([['All', '48'], ['Unread', '3'], ['Orders', '18'], ['Bookings', '6'], ['Offers', '14'], ['Reviews', '5'], ['Account', '5']])}
<div class="card overflow-hidden">${[
      ['box', 'brand', 'Your order has shipped', 'Order HB-884213 (Realme C100X) has left the seller warehouse and is on its way. Estimated delivery 18 August.', '12 minutes ago', true, 'Track order'],
      ['ticket', 'gold', 'New voucher just for you — 20% off electronics', 'Use code ELEC20 before 25 August to get up to ৳1,500 off any electronics purchase.', '3 hours ago', true, 'Collect voucher'],
      ['wrench', 'service', 'Booking confirmed — AC servicing', 'Kamal AC Servicing confirmed your appointment for 18 August, 10:00 AM – 12:00 PM.', '5 hours ago', true, 'View booking'],
      ['star', 'brand', 'How was your Cotton Panjabi?', 'Share your experience and earn 25 loyalty points for a verified review.', 'Yesterday, 4:20 PM', false, 'Write review'],
      ['tag', 'brand', 'Price dropped on your wishlist item', 'Bluetooth Speaker — Portable is now ৳1,850 (was ৳2,100). Only 8 pieces left in stock.', 'Yesterday, 11:02 AM', false, 'Buy now'],
      ['money', 'service', 'Refund completed — ৳2,300', 'Your refund for return RTN-4821 has been credited to your bKash account 01712xxxx78.', '2 days ago', false, 'View refund'],
      ['msg', 'brand', 'Rahim Electronics replied to your question', '“Yes, the phone comes with an official 1-year warranty and a free tempered glass.”', '3 days ago', false, 'Open chat'],
      ['shield', 'ink', 'New login from Chrome on Windows', 'If this was not you, please change your password and review active sessions immediately.', '4 days ago', false, 'Review sessions'],
      ['gift', 'gold', 'You earned 500 points', 'Your friend Sadia Rahman completed her first order. ৳500 voucher added to your account.', '5 days ago', false, 'View rewards'],
      ['truck', 'brand', 'Delivered — Organic Honey 500g', 'Your parcel was delivered and received by you at 3:42 PM. Enjoy!', '1 week ago', false, 'Rate product']
    ].map(n => `<div class="flex gap-3.5 p-4 border-b border-[#f0f1f5] last:border-0 ${n[5] ? 'bg-brand-50/40' : ''} hover:bg-ink-50">
<span class="w-10 h-10 rounded-xl bg-${n[1]}-50 text-${n[1]}-600 grid place-items-center shrink-0">${svg(n[0], 'w-4.5 h-4.5')}</span>
<div class="min-w-0 flex-1"><div class="flex items-start gap-2"><p class="text-[13.5px] font-extrabold ${n[5] ? '' : 'text-ink-800'}">${n[2]}</p>${n[5] ? '<span class="w-2 h-2 rounded-full bg-brand-500 mt-1.5 shrink-0"></span>' : ''}
<span class="text-[11.5px] text-ink-400 ml-auto shrink-0">${n[4]}</span></div>
<p class="text-[12.5px] text-ink-500 mt-1 leading-relaxed">${n[3]}</p>
<div class="flex items-center gap-2 mt-2.5"><button class="btn btn-xs btn-outline">${n[6]}</button>
<button class="btn btn-xs btn-ghost">${n[5] ? 'Mark as read' : 'Mark unread'}</button>
<button class="btn btn-xs btn-ghost !text-ink-400">${svg('trash', 'w-3.5 h-3.5')}</button></div></div></div>`).join('')}
${tfoot(1, 10, 48)}</div>`
});

/* -------------------------------- MESSAGES ------------------------------- */
W('messages.html', {
  title: 'Messages', sub: 'Chat with sellers, service providers and HaatBazar support.', active: 'messages.html', crumbs: ['Account', 'Messages'],
  actions: `<button class="btn btn-sm btn-outline">${svg('cog')}Chat settings</button><button class="btn btn-sm btn-primary">${svg('plus')}New message</button>`,
  body: `<div class="card overflow-hidden"><div class="chat-wrap">
<div class="chat-list">
<div class="p-3 border-b border-[#e7e9ef]"><div class="input-group">${svg('search')}<input class="input input-sm !min-h-[38px]" placeholder="Search conversations"></div>
<div class="flex gap-1.5 mt-2 overflow-x-auto no-scrollbar" data-chip-group>${['All', 'Unread', 'Sellers', 'Providers', 'Support'].map((c, i) => `<button class="chip !h-7 !text-[12px] ${i === 0 ? 'is-active' : ''}">${c}</button>`).join('')}</div></div>
${[['Rahim Electronics', 'Yes, official 1-year warranty is included with the phone.', '2m', 2, true, 'Seller'], ['Kamal AC Servicing', 'We will arrive between 10 and 10:30 AM tomorrow.', '1h', 0, false, 'Provider'], ['HaatBazar Support', 'Your ticket TKT-9921 has been updated by our team.', '3h', 1, false, 'Support'], ['Aarong Style', 'The L size is available in navy blue and maroon.', 'Yesterday', 0, false, 'Seller'], ['Nirapod Home Cleaning', 'Thank you for choosing us! Quote attached.', '2d', 0, false, 'Provider'], ['Gadget Hub BD', 'Your refund has been processed from our side.', '5d', 0, false, 'Seller'], ['Glamour Beauty Parlour', 'Would you like to book the bridal package?', '1w', 0, false, 'Provider']].map((c, i) => `<div class="chat-item ${c[4] ? 'is-active' : ''}">
<span class="avatar avatar-md ${i % 3 === 0 ? 'bg-brand-500' : i % 3 === 1 ? 'bg-service-600' : 'bg-ink-700'}">${c[0][0]}</span>
<div class="min-w-0 flex-1"><div class="flex items-center gap-1.5"><p class="text-[13px] font-extrabold clamp-1">${c[0]}</p><span class="text-[10.5px] text-ink-400 ml-auto shrink-0">${c[2]}</span></div>
<p class="text-[11px] text-ink-400 mb-0.5">${c[5]}</p>
<div class="flex items-center gap-2"><p class="text-[12px] text-ink-500 clamp-1 flex-1">${c[1]}</p>${c[3] ? `<span class="badge badge-solid !px-1.5 !py-0 shrink-0">${c[3]}</span>` : ''}</div></div></div>`).join('')}</div>

<div class="chat-body">
<div class="flex items-center gap-3 px-4 py-3 border-b border-[#e7e9ef]">
<span class="avatar avatar-md bg-brand-500">R</span>
<div class="min-w-0"><p class="text-[13.5px] font-extrabold">Rahim Electronics ${svg('shield', 'w-3.5 h-3.5 inline text-service-500')}</p>
<p class="text-[11.5px] text-green-600 font-semibold">${svg('check', 'w-3 h-3 inline')} Online · usually replies within 1 hour</p></div>
<div class="ml-auto flex gap-1.5"><button class="icon-btn">${svg('phone')}</button><button class="icon-btn">${svg('info')}</button>${actionsCell([['View shop', 'store'], ['Mute conversation', 'bell'], ['Report seller', 'flag'], ['Delete chat', 'trash', true]])}</div></div>

<div class="chat-scroll thin-scroll">
<p class="text-center text-[11px] text-ink-400 mb-4">Today, 10:14 AM</p>
<div class="mb-3 max-w-[74%]"><div class="p-2.5 rounded-xl bg-white border border-[#e7e9ef] mb-2 flex gap-2.5">${ph(0, 'phoneDev', 'w-11 h-11 rounded-lg')}
<div class="min-w-0"><p class="text-[12px] font-bold clamp-1">Realme C100X 6/128GB</p><p class="text-[12px] text-brand-600 font-extrabold">৳11,290</p></div></div>
<div class="bubble bubble-in">Hello, does this phone come with an official warranty? And is the green colour in stock?<p class="bubble-time">10:14 AM</p></div></div>
<div class="mb-3"><div class="bubble bubble-out">Assalamu alaikum! Yes, official 1-year warranty is included with the phone. Green is in stock — we have 12 pieces right now.<p class="bubble-time !text-white/70">10:16 AM</p></div></div>
<div class="mb-3 max-w-[74%]"><div class="bubble bubble-in">Great. Can you deliver to Banani by tomorrow? And do you give a free tempered glass?<p class="bubble-time">10:18 AM</p></div></div>
<div class="mb-3"><div class="bubble bubble-out">Yes, next-day delivery is available for Dhaka city. We will include a free tempered glass and a soft case with your order.<p class="bubble-time !text-white/70">10:21 AM</p></div></div>
<div class="mb-3 max-w-[74%]"><div class="bubble bubble-in">Perfect, I have placed the order. Order number HB-884213.<p class="bubble-time">10:26 AM</p></div></div>
<div class="mb-3"><div class="bubble bubble-out">Received, thank you! We are packing it now and it will be handed over to Pathao today. You will get the tracking number by SMS.<p class="bubble-time !text-white/70">10:31 AM</p></div></div>
<div class="flex items-center gap-2 text-[12px] text-ink-400"><span class="avatar avatar-sm bg-brand-500">R</span>typing<span class="animate-pulse-soft">•••</span></div></div>

<div class="p-3 border-t border-[#e7e9ef]">
<div class="flex flex-wrap gap-1.5 mb-2">${['Is this in stock?', 'What is the delivery time?', 'Can you offer a discount?', 'Warranty details?'].map(q => `<button class="chip !h-7 !text-[12px]">${q}</button>`).join('')}</div>
<div class="flex items-end gap-2"><button class="icon-btn">${svg('plus')}</button><button class="icon-btn">${svg('camera')}</button>
<textarea class="textarea !min-h-[42px] !py-2.5 flex-1" placeholder="Write a message…"></textarea>
<button class="btn btn-primary btn-icon" data-toast="Message sent">${svg('chevR')}</button></div>
<p class="text-[11px] text-ink-400 mt-1.5">${svg('shield', 'w-3 h-3 inline')} Never share OTP or payment details in chat. All payments must go through HaatBazar.</p></div></div>

<aside class="hidden 2xl:block border-l border-[#e7e9ef] p-4 overflow-y-auto">
<p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-3">Seller details</p>
<div class="text-center mb-4">${ph(2, 'store', 'w-16 h-16 rounded-2xl mx-auto mb-2')}
<p class="text-[13.5px] font-extrabold">Rahim Electronics</p><p class="text-[12px] text-ink-500">Mirpur, Dhaka</p>
<div class="flex justify-center items-center gap-1.5 mt-1">${stars(5)}<span class="text-[11.5px] text-ink-400">4.8</span></div></div>
<div class="grid grid-cols-2 gap-2 mb-4">${[['2,340', 'Reviews'], ['98%', 'On time'], ['1hr', 'Response'], ['4 yrs', 'On HaatBazar']].map(x => `<div class="p-2.5 rounded-lg bg-ink-50 text-center"><p class="text-[13px] font-extrabold">${x[0]}</p><p class="text-[10.5px] text-ink-500">${x[1]}</p></div>`).join('')}</div>
<a href="../shop-profile.html" class="btn btn-sm btn-outline btn-block mb-4">Visit store</a>
<p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Shared items</p>
<div class="space-y-2">${[['Realme C100X 6/128GB', '৳11,290', 'phoneDev'], ['Tempered Glass', '৳200', 'pkg']].map((p, i) => `<a href="../product-details.html" class="flex gap-2.5 p-2 rounded-lg hover:bg-ink-50">${ph(i, p[2], 'w-10 h-10 rounded-lg')}
<div class="min-w-0"><p class="text-[12px] font-bold clamp-1">${p[0]}</p><p class="text-[12px] text-brand-600 font-extrabold">${p[1]}</p></div></a>`).join('')}</div>
<p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mt-4 mb-2">Related orders</p>
<a href="order-details.html" class="block p-3 rounded-xl border border-[#e7e9ef] hover:border-brand-200"><p class="text-[12.5px] font-bold">HB-884213</p><p class="text-[11.5px] text-ink-400">2 items · ৳11,290 · Shipped</p></a>
</aside></div></div>`
});

/* --------------------------------- SUPPORT ------------------------------- */
W('support.html', {
  title: 'Support Tickets', sub: 'Raise an issue and track responses from the HaatBazar care team.', active: 'support.html', crumbs: ['Account', 'Support'],
  actions: `<a href="../help-center.html" class="btn btn-sm btn-outline">${svg('question')}Help centre</a><button class="btn btn-sm btn-primary" data-modal-open="ticket">${svg('plus')}New ticket</button>`,
  body: `
${stats([['Total tickets', '9', '', 'ticket', 'brand'], ['Open', '2', '', 'clock', 'gold'], ['Resolved', '7', '', 'check', 'service'], ['Avg first response', '38 min', '', 'msg', 'brand']])}
<div class="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-4">
<div>
${tabs([['All tickets', '9'], ['Open', '2'], ['Awaiting my reply', '1'], ['Resolved', '7'], ['Closed', '0']])}
${filterbar(['search', ['All categories', 'Order issue', 'Payment', 'Refund', 'Delivery', 'Product quality', 'Service booking', 'Account'], ['All priorities', 'Urgent', 'High', 'Normal', 'Low']])}
<div class="space-y-3">${[
      ['TKT-9921', 'Refund not received for cancelled order', 'Refund', 'High', 'Open', '3 replies', '2 hours ago', 'HB-883620'],
      ['TKT-9902', 'Wrong item delivered — need replacement', 'Order issue', 'Urgent', 'Open', '5 replies', 'Yesterday', 'HB-883771'],
      ['TKT-9871', 'Service provider did not arrive on time', 'Service booking', 'Normal', 'Resolved', '4 replies', '6 Aug 2026', 'BKG-2612'],
      ['TKT-9840', 'Unable to apply voucher at checkout', 'Payment', 'Normal', 'Resolved', '2 replies', '28 Jul 2026', '—'],
      ['TKT-9812', 'Product quality below expectation', 'Product quality', 'Low', 'Resolved', '6 replies', '19 Jul 2026', 'HB-883402'],
      ['TKT-9788', 'Change registered mobile number', 'Account', 'Normal', 'Resolved', '3 replies', '2 Jul 2026', '—']
    ].map(t => `<div class="card p-4">
<div class="flex flex-wrap items-center gap-2 mb-2"><span class="text-[12.5px] font-extrabold">${t[0]}</span>${st(t[4])}
<span class="badge badge-${t[3] === 'Urgent' ? 'red' : t[3] === 'High' ? 'amber' : 'gray'}">${t[3]} priority</span>
<span class="badge badge-gray">${t[2]}</span><span class="text-[11.5px] text-ink-400 ml-auto">Updated ${t[6]}</span></div>
<p class="text-[14px] font-extrabold mb-1">${t[1]}</p>
<p class="text-[12.5px] text-ink-500 mb-3">${t[7] !== '—' ? `Related to <b>${t[7]}</b> · ` : ''}${t[5]} · Assigned to Care Team</p>
<div class="flex flex-wrap gap-2"><button class="btn btn-xs btn-outline">${svg('eye')}View conversation</button>
${t[4] === 'Open' ? `<button class="btn btn-xs btn-primary">${svg('msg')}Reply</button><button class="btn btn-xs btn-outline">Escalate</button><button class="btn btn-xs btn-ghost">Close ticket</button>` : `<button class="btn btn-xs btn-outline">${svg('refresh')}Reopen</button><button class="btn btn-xs btn-ghost">${svg('star')}Rate support</button>`}</div></div>`).join('')}</div>
<div class="card mt-3">${tfoot(1, 6, 9)}</div>
</div>
<aside class="space-y-4">
${card('Contact us directly', `<div class="p-4 space-y-2.5">${[['phone', 'Call 16247', '24/7 hotline · toll free'], ['msg', 'Live chat', 'Avg wait 2 minutes'], ['mail', 'support@haatbazar.com.bd', 'Reply within 12 hours'], ['globe', 'WhatsApp 01700-000000', '9 AM – 11 PM daily']].map(c => `<div class="flex gap-2.5 p-2.5 rounded-xl border border-[#e7e9ef] hover:border-brand-200">
<span class="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 grid place-items-center shrink-0">${svg(c[0], 'w-4 h-4')}</span>
<div><p class="text-[12.5px] font-bold">${c[1]}</p><p class="text-[11.5px] text-ink-400">${c[2]}</p></div></div>`).join('')}</div>`)}
${card('Popular help topics', `<div class="p-4 space-y-1">${['How do I track my order?', 'How long do refunds take?', 'How to return a product', 'Change delivery address after ordering', 'Cancel a service booking', 'Voucher not working at checkout', 'Report a fake or damaged product'].map(q => `<a href="../help-center.html" class="dd-item !text-[12.5px]">${svg('question')}${q}</a>`).join('')}</div>`)}
${card('Response time', `<div class="p-4"><div class="space-y-3">${[['Urgent', '15 min', 95], ['High', '30 min', 88], ['Normal', '2 hours', 76], ['Low', '12 hours', 64]].map(r => `<div><div class="flex justify-between text-[12px] mb-1"><span class="font-semibold">${r[0]}</span><span class="text-ink-400">${r[1]}</span></div><div class="bar"><i style="width:${r[2]}%;background:#12a594"></i></div></div>`).join('')}</div></div>`)}
</aside></div>

<div class="modal" id="ticket"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">
<div class="card-head"><h3>Create a support ticket</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5"><div class="grid sm:grid-cols-2 gap-3 mb-3">
<div><label class="label">Issue category <span class="req">*</span></label><select class="select"><option>Order issue</option><option>Delivery problem</option><option>Payment &amp; billing</option><option>Refund &amp; return</option><option>Product quality</option><option>Service booking</option><option>Seller / provider behaviour</option><option>Account &amp; login</option><option>Voucher &amp; rewards</option><option>Other</option></select></div>
<div><label class="label">Priority</label><select class="select"><option>Normal</option><option>High</option><option>Urgent</option><option>Low</option></select></div>
<div><label class="label">Related order / booking</label><select class="select"><option>None</option><option>HB-884213 — Realme C100X</option><option>HB-883771 — Wooden Bookshelf</option><option>BKG-2841 — AC Servicing</option></select></div>
<div><label class="label">Preferred contact method</label><select class="select"><option>Email</option><option>Phone call</option><option>SMS</option><option>In-app chat</option></select></div></div>
<label class="label">Subject <span class="req">*</span></label><input class="input mb-3" placeholder="Briefly describe the issue">
<label class="label">Description <span class="req">*</span></label><textarea class="textarea !min-h-[120px] mb-3" placeholder="Include order number, dates and what you have already tried…"></textarea>
<label class="label">Attachments</label><div class="upload-box mb-4">${svg('camera', 'w-5 h-5')}<span>Screenshots or photos help us resolve faster (max 5 files, 10 MB each)</span></div>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Ticket TKT-9945 created">Submit ticket</button></div></div></div></div>`
});

/* --------------------------------- SETTINGS ------------------------------ */
W('settings.html', {
  title: 'Settings', sub: 'Security, privacy, sessions and app preferences.', active: 'settings.html', crumbs: ['Account', 'Settings'],
  actions: `<button class="btn btn-sm btn-primary" data-toast="Settings saved">${svg('check')}Save all changes</button>`,
  body: `
<div class="grid lg:grid-cols-[220px_minmax(0,1fr)] gap-4">
<aside class="card p-2 h-max sticky-24">${[['lock', 'Security', true], ['shield', 'Privacy', false], ['bell', 'Notifications', false], ['scan', 'Devices &amp; sessions', false], ['globe', 'Language &amp; region', false], ['db', 'Data &amp; downloads', false]].map(m => `<a class="sb-item !text-ink-600 ${m[2] ? '!bg-brand-50 !text-brand-700' : 'hover:!bg-ink-50'}" style="${m[2] ? 'box-shadow:none' : ''}">${svg(m[0])}<span class="text-[13px] font-bold">${m[1]}</span></a>`).join('')}</aside>
<div class="space-y-4">
${card('Password &amp; sign-in', `<div class="p-5"><div class="grid sm:grid-cols-2 gap-3.5 mb-4">
<div class="sm:col-span-2"><label class="label">Current password <span class="req">*</span></label><div class="relative"><input type="password" id="cp" class="input" value="············"><button class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400" data-pass-toggle="cp">${svg('eye', 'w-4 h-4')}</button></div></div>
<div><label class="label">New password <span class="req">*</span></label><div class="relative"><input type="password" id="np" class="input" placeholder="At least 8 characters"><button class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400" data-pass-toggle="np">${svg('eye', 'w-4 h-4')}</button></div>
<div class="flex gap-1 mt-2">${[1, 2, 3, 4].map(i => `<span class="h-1.5 flex-1 rounded-full ${i < 3 ? 'bg-gold-400' : 'bg-ink-100'}"></span>`).join('')}</div><p class="hint">Use uppercase, numbers and a symbol for a strong password.</p></div>
<div><label class="label">Confirm new password <span class="req">*</span></label><input type="password" class="input" placeholder="Re-type new password"></div></div>
<button class="btn btn-sm btn-primary" data-toast="Password updated">Update password</button></div>`)}
${card('Two-factor authentication', `<div class="p-5 space-y-3">${[['SMS to +880 1712-345678', 'Receive a 6-digit code by SMS on every login', true], ['Authenticator app', 'Use Google Authenticator or Authy', false], ['Email verification code', 'Send a code to nusrat.jahan@gmail.com', false], ['Biometric login (app)', 'Fingerprint or Face ID on mobile app', true]].map(t => `<div class="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-[#e7e9ef]">
<div><p class="text-[13px] font-bold">${t[0]}</p><p class="text-[12px] text-ink-500">${t[1]}</p></div>
<span class="switch"><input type="checkbox" ${t[2] ? 'checked' : ''}><span class="track"></span></span></div>`).join('')}
<div class="p-3 rounded-xl bg-ink-50 flex flex-wrap items-center gap-3"><p class="text-[12.5px] text-ink-600 flex-1">Backup codes let you sign in if you lose your phone.</p><button class="btn btn-xs btn-outline">${svg('dl')}Download backup codes</button></div></div>`)}
${card('Privacy controls', `<div class="p-5 space-y-3">${[['Show my name on public reviews', true], ['Allow sellers to see my purchase history', false], ['Personalised recommendations from browsing', true], ['Share data with marketing partners', false], ['Allow search engines to index my public profile', false], ['Show my wishlist publicly', false]].map(p => `<label class="flex items-center justify-between gap-3 py-2 border-b border-[#f4f5f8] last:border-0"><span class="text-[13px] text-ink-700 pr-3">${p[0]}</span>
<span class="switch"><input type="checkbox" ${p[1] ? 'checked' : ''}><span class="track"></span></span></label>`).join('')}</div>`)}
${card('Active sessions &amp; devices', table([['Device'], ['Location'], ['IP address'], ['Last active'], ['']], [
      ['<b>Chrome on Windows 11</b><p class="text-[11.5px] text-green-600 font-semibold">This device</p>', 'Dhaka, Bangladesh', '103.108.xx.42', 'Active now', `<button class="btn btn-xs btn-outline" disabled>Current</button>`],
      ['<b>HaatBazar App — Android 14</b><p class="text-[11.5px] text-ink-400">Samsung Galaxy A54</p>', 'Dhaka, Bangladesh', '103.108.xx.18', '2 hours ago', `<button class="btn btn-xs btn-danger">Sign out</button>`],
      ['<b>Safari on iPhone</b><p class="text-[11.5px] text-ink-400">iOS 18.2</p>', 'Chattogram, Bangladesh', '116.58.xx.91', '3 days ago', `<button class="btn btn-xs btn-danger">Sign out</button>`]
    ]) + `<div class="p-4 border-t border-[#f0f1f5] flex flex-wrap gap-2"><button class="btn btn-sm btn-danger">${svg('lock')}Sign out of all other devices</button><button class="btn btn-sm btn-outline">${svg('file')}View login history</button></div>`)}
${card('Language &amp; region', `<div class="p-5 grid sm:grid-cols-2 gap-3.5">
<div><label class="label">Language</label><select class="select"><option>English</option><option>বাংলা (Bangla)</option></select></div>
<div><label class="label">Currency</label><select class="select"><option>BDT — Bangladeshi Taka (৳)</option><option>USD — US Dollar ($)</option></select></div>
<div><label class="label">Default city</label><select class="select"><option>Dhaka</option><option>Chattogram</option><option>Sylhet</option><option>Khulna</option><option>Rajshahi</option><option>Barishal</option><option>Rangpur</option><option>Mymensingh</option></select></div>
<div><label class="label">Time zone</label><select class="select"><option>(GMT+6:00) Dhaka</option></select></div>
<div><label class="label">Date format</label><select class="select"><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></div>
<div><label class="label">Theme</label><select class="select"><option>Light</option><option>Dark</option><option>Match system</option></select></div></div>`)}
${card('Your data', `<div class="p-5 space-y-3">${[['Download my data', 'Get a copy of your orders, reviews and account info (ZIP)', 'Request download', 'dl'], ['Clear browsing history', 'Remove recently viewed products and search history', 'Clear now', 'trash'], ['Clear saved searches', '18 saved searches and alerts', 'Clear', 'search'], ['Cookie preferences', 'Manage analytics and advertising cookies', 'Manage', 'cog']].map(d => `<div class="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-[#e7e9ef]">
<div class="flex gap-2.5"><span class="w-9 h-9 rounded-lg bg-ink-50 text-ink-600 grid place-items-center shrink-0">${svg(d[3], 'w-4 h-4')}</span>
<div><p class="text-[13px] font-bold">${d[0]}</p><p class="text-[12px] text-ink-500">${d[1]}</p></div></div>
<button class="btn btn-sm btn-outline">${d[2]}</button></div>`).join('')}</div>`)}
</div></div>`
});
console.log('user part 2: wallet, vouchers, profile, notifications, messages, support, settings');
