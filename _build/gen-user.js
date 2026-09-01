const fs = require('fs');
const D = require('./dash');
const { svg, ph, stars, tk, dashPage, stats, card, lineChart, barChart, donut, hbars, filterbar, tabs, table, tfoot, bulkbar, st, empty, prow, actionsCell } = D;
const W = (f, o) => fs.writeFileSync('user/' + f, dashPage(Object.assign({ role: 'user' }, o)));

const ORD = [
  ['HB-884213', 'Realme C100X 6/128GB — Green', 2, '৳13,290', 'Shipped', '14 Aug 2026', 'Rahim Electronics'],
  ['HB-884109', 'Cotton Panjabi — Navy Blue (L)', 1, '৳1,850', 'Delivered', '11 Aug 2026', 'Aarong Style'],
  ['HB-883942', 'Organic Honey 500g × 2', 2, '৳1,100', 'Delivered', '8 Aug 2026', 'Sundarban Naturals'],
  ['HB-883771', 'Wooden Bookshelf — 3 Tier', 1, '৳2,950', 'Processing', '6 Aug 2026', 'Kaner Furniture'],
  ['HB-883620', 'Power Bank 50,000mAh', 1, '৳1,100', 'Cancelled', '2 Aug 2026', 'Gadget Hub BD'],
  ['HB-883511', 'Leather Handbag — Brown', 1, '৳1,600', 'Delivered', '28 Jul 2026', 'Dhaka Leather Co.'],
  ['HB-883402', 'Smart Watch — Fitness Pro', 1, '৳2,300', 'Returned', '24 Jul 2026', 'Gadget Hub BD'],
  ['HB-883311', '24 inch LED Monitor', 1, '৳9,900', 'Delivered', '19 Jul 2026', 'TechZone BD']
];

/* ------------------------------ DASHBOARD ------------------------------ */
W('dashboard.html', {
  title: 'Dashboard', sub: 'Welcome back, Nusrat — here is what is happening with your account.', active: 'dashboard.html', crumbs: ['Overview'],
  actions: `<button class="btn btn-sm btn-outline">${svg('dl')}Download activity</button><a href="../products.html" class="btn btn-sm btn-primary">${svg('bag')}Start shopping</a>`,
  body: `
<div class="card p-5 mb-4 bg-ink-950 text-white flex flex-col md:flex-row md:items-center gap-5 overflow-hidden relative">
<div class="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-brand-500/20 blur-2xl"></div>
<span class="avatar avatar-xl bg-brand-500 relative z-10">N</span>
<div class="flex-1 relative z-10"><div class="flex flex-wrap items-center gap-2 mb-1"><h2 class="font-display text-[21px] font-extrabold">Nusrat Jahan</h2><span class="badge !bg-gold-400 !text-[#3a2a00]">${svg('award')}Gold member</span></div>
<p class="text-[13px] text-white/70 mb-3">Member since Jan 2023 · +880 1712-345678 · nusrat.jahan@gmail.com</p>
<div class="flex flex-wrap gap-4 text-[12.5px]"><span class="text-white/70">Loyalty points: <b class="text-white">2,480</b></span><span class="text-white/70">Next tier: <b class="text-white">Platinum (৳6,520 away)</b></span></div>
<div class="mt-2 max-w-sm"><div class="bar !bg-white/15"><i style="width:64%;background:#ffb020"></i></div></div></div>
<div class="flex gap-2 relative z-10"><a href="profile.html" class="btn btn-sm !bg-white/15 !text-white">${svg('edit')}Edit profile</a><a href="vouchers.html" class="btn btn-sm !bg-white !text-ink-950">${svg('ticket')}My rewards</a></div></div>

${stats([['Total orders', '42', '+12%', 'box', 'brand', 'Lifetime purchases'], ['Active bookings', '2', '', 'wrench', 'service', 'Next: 18 Aug, 10 AM'], ['Wallet balance', '৳2,480', '+৳500', 'wallet', 'gold', 'Refunds credited instantly'], ['Wishlist items', '14', '', 'heart', 'brand', '3 items dropped in price']])}

<div class="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-4 mb-4">
${card('Order activity', `<div class="p-4"><div class="flex flex-wrap items-center gap-4 mb-3"><div><p class="text-[24px] font-extrabold">৳1,84,320</p><p class="text-[12px] text-ink-500">Spent in last 12 months</p></div>
<div class="chart-legend ml-auto"><span><i style="background:#ff2525"></i>Products</span><span><i style="background:#12a594"></i>Services</span></div></div>
${lineChart([12, 19, 14, 26, 21, 32, 28, 38, 30, 44, 36, 52])}
<div class="flex justify-between mt-2 text-[11px] text-ink-400">${['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(m => `<span>${m}</span>`).join('')}</div></div>`,
    `<select class="select input-sm !w-auto"><option>Last 12 months</option><option>Last 6 months</option><option>This year</option></select>`)}
${card('Spending by category', `<div class="p-5">${donut([['Electronics', 38, '#ff2525'], ['Fashion', 24, '#12a594'], ['Home', 18, '#ffb020'], ['Services', 12, '#8b5cf6'], ['Others', 8, '#8792a6']], ['৳1.84L', 'total spent'])}</div>`)}
</div>

<div class="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-4 mb-4">
${card('Recent orders', table([['Order'], ['Product'], ['Total'], ['Status'], ['']],
      ORD.slice(0, 5).map((o, i) => [`<a href="order-details.html" class="font-bold text-brand-600">${o[0]}</a><p class="text-[11.5px] text-ink-400">${o[5]}</p>`,
      prow(i, o[1], `${o[6]} · Qty ${o[2]}`, 'pkg'), `<b>${o[3]}</b>`, st(o[4]),
      `<a href="order-details.html" class="btn btn-xs btn-outline">View</a>`])) + tfoot(1, 5, 42),
      `<a href="orders.html" class="text-[12.5px] font-bold text-brand-600">View all</a>`)}
<div class="space-y-4">
${card('Track your shipment', `<div class="p-4">
<div class="flex items-center gap-3 mb-4">${ph(0, 'phoneDev', 'w-12 h-12 rounded-xl')}<div class="min-w-0"><p class="text-[13px] font-bold clamp-1">Realme C100X 6/128GB</p><p class="text-[11.5px] text-ink-400">HB-884213 · Arriving 18 Aug</p></div></div>
<div class="timeline">${[['Order placed', '14 Aug, 10:24 AM', 'is-done'], ['Packed by seller', '15 Aug, 09:10 AM', 'is-done'], ['In transit — Tejgaon hub', '16 Aug, 07:45 PM', 'is-active'], ['Out for delivery', 'Expected 18 Aug', ''], ['Delivered', 'Expected 18 Aug', '']].map(t => `<div class="tl-item ${t[2]}"><p class="text-[12.5px] font-bold">${t[0]}</p><p class="text-[11.5px] text-ink-400">${t[1]}</p></div>`).join('')}</div>
<a href="order-details.html" class="btn btn-sm btn-outline btn-block mt-1">Full tracking details</a></div>`)}
${card('Upcoming service bookings', `<div class="p-4 space-y-3">${[['AC servicing — Split 1.5 Ton', 'Kamal AC Servicing', '18 Aug, 10:00 AM', 'Confirmed'], ['Home deep cleaning', 'Nirapod Home Cleaning', '22 Aug, 02:00 PM', 'Pending']].map((b, i) => `<div class="flex gap-3 p-3 rounded-xl border border-[#e7e9ef]">${ph(i + 3, 'wrench', 'w-11 h-11 rounded-lg shrink-0')}
<div class="min-w-0 flex-1"><p class="text-[13px] font-bold clamp-1">${b[0]}</p><p class="text-[11.5px] text-ink-500">${b[1]}</p><p class="text-[11.5px] text-ink-400 mt-0.5">${svg('clock', 'w-3 h-3 inline')} ${b[2]}</p></div>${st(b[3])}</div>`).join('')}
<a href="bookings.html" class="btn btn-sm btn-outline btn-block">Manage bookings</a></div>`)}
</div></div>

<div class="grid lg:grid-cols-3 gap-4 mb-4">
${card('Quick actions', `<div class="p-4 grid grid-cols-2 gap-2.5">${[['box', 'Track order', 'orders.html'], ['return', 'Start a return', 'returns.html'], ['heart', 'My wishlist', 'wishlist.html'], ['pin', 'Add address', 'addresses.html'], ['ticket', 'My vouchers', 'vouchers.html'], ['question', 'Get help', 'support.html']].map(a => `<a href="${a[2]}" class="p-3 rounded-xl border border-[#e7e9ef] hover:border-brand-200 hover:bg-brand-50 text-center"><span class="w-9 h-9 rounded-lg bg-ink-50 text-ink-600 grid place-items-center mx-auto mb-1.5">${svg(a[0], 'w-4 h-4')}</span><p class="text-[12px] font-bold">${a[1]}</p></a>`).join('')}</div>`)}
${card('Wishlist price drops', `<div class="p-4 space-y-3">${[['Bluetooth Speaker — Portable', '৳1,850', '৳2,100', 12, 'speaker'], ['Cotton Saree — Handloom', '৳1,850', '৳2,050', 10, 'shirt'], ['Table Fan — Rechargeable', '৳1,650', '৳1,850', 11, 'fan']].map((p, i) => `<div class="flex items-center gap-3">${ph(i + 1, p[4] === 'speaker' ? 'bolt' : p[4], 'w-11 h-11 rounded-lg shrink-0')}
<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold clamp-1">${p[0]}</p><p class="text-[12px]"><span class="text-brand-600 font-extrabold">${p[1]}</span> <span class="price-old ml-1">${p[2]}</span></p></div>
<span class="badge badge-green">-${p[3]}%</span><button class="btn btn-xs btn-primary" data-cart-add>${svg('cart', 'w-3.5 h-3.5')}</button></div>`).join('')}
<a href="wishlist.html" class="btn btn-sm btn-outline btn-block">View wishlist</a></div>`)}
${card('Recent notifications', `<div class="p-4 space-y-3">${[['box', 'Your order HB-884213 has shipped', '12 minutes ago', 'brand'], ['ticket', 'New voucher: 20% off electronics', '3 hours ago', 'gold'], ['wrench', 'Booking confirmed for 18 Aug', 'Yesterday', 'service'], ['star', 'Rate your recent purchase', '2 days ago', 'brand']].map(n => `<div class="flex gap-2.5"><span class="w-8 h-8 rounded-lg bg-${n[3]}-50 text-${n[3]}-600 grid place-items-center shrink-0">${svg(n[0], 'w-4 h-4')}</span>
<div class="min-w-0"><p class="text-[12.5px] font-semibold text-ink-800 clamp-2">${n[1]}</p><p class="text-[11px] text-ink-400">${n[2]}</p></div></div>`).join('')}
<a href="notifications.html" class="btn btn-sm btn-outline btn-block">All notifications</a></div>`)}
</div>

${card('Recommended for you', `<div class="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">${[['Wireless Earbuds Pro', '৳2,450', 'bolt'], ['Ceramic Dinner Set — 24pc', '৳3,200', 'home'], ['Men\'s Sports Shoe', '৳2,890', 'shirt'], ['Electric Kettle 1.8L', '৳1,450', 'drop'], ['Yoga Mat — Anti Slip', '৳980', 'dumbbell'], ['Study Table Lamp', '৳1,120', 'sun']].map((p, i) => `<a href="../product-details.html" class="pcard card-hover">${ph(i, p[2], 'aspect-square w-full')}
<div class="pcard-body"><p class="pcard-title mb-1">${p[0]}</p><p class="price">${p[1]}</p></div></a>`).join('')}</div>`,
    `<a href="../products.html" class="text-[12.5px] font-bold text-brand-600">Browse all</a>`)}`
});

/* -------------------------------- ORDERS -------------------------------- */
W('orders.html', {
  title: 'My Orders', sub: 'Track, return or buy again from your complete order history.', active: 'orders.html', crumbs: ['Shopping', 'My Orders'],
  actions: `<button class="btn btn-sm btn-outline">${svg('dl')}Export CSV</button><a href="../track-order.html" class="btn btn-sm btn-primary">${svg('truck')}Track a parcel</a>`,
  body: `
${stats([['All orders', '42', '', 'box', 'brand'], ['To receive', '3', '', 'truck', 'gold'], ['Completed', '36', '', 'check', 'service'], ['Cancelled / returned', '3', '', 'return', 'brand']])}
${tabs([['All orders', '42'], ['To pay', '1'], ['To ship', '2'], ['To receive', '3'], ['Completed', '36'], ['Cancelled', '2'], ['Returns', '1']])}
${filterbar(['search', ['All time', 'Last 30 days', 'Last 3 months', 'Last 6 months', 'This year', '2025'], ['All statuses', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'], ['All sellers', 'Rahim Electronics', 'Aarong Style', 'Gadget Hub BD'], ['Sort: Newest first', 'Oldest first', 'Amount: High to low', 'Amount: Low to high']])}
<div class="space-y-3.5">${ORD.map((o, i) => `<div class="card overflow-hidden">
<div class="flex flex-wrap items-center gap-3 px-4 py-3 bg-ink-50 border-b border-[#e7e9ef]">
<span class="text-[12.5px] font-extrabold">${o[0]}</span>${st(o[4])}
<span class="text-[12px] text-ink-500">Placed ${o[5]}</span>
<span class="text-[12px] text-ink-500 hidden sm:inline">${svg('store', 'w-3.5 h-3.5 inline text-ink-400')} ${o[6]}</span>
<div class="ml-auto flex items-center gap-2"><span class="text-[12px] text-ink-500">Total</span><b class="text-[15px] text-brand-600">${o[3]}</b></div></div>
<div class="p-4 flex flex-wrap gap-4">
<div class="flex gap-3 flex-1 min-w-[240px]">${ph(i, 'pkg', 'w-16 h-16 rounded-xl shrink-0')}
<div class="min-w-0"><p class="text-[13.5px] font-bold clamp-1">${o[1]}</p><p class="text-[12px] text-ink-500 mt-0.5">Qty: ${o[2]} · Sold by ${o[6]}</p>
<p class="text-[12px] text-ink-400 mt-0.5">${o[4] === 'Delivered' ? 'Delivered on ' + o[5] : o[4] === 'Shipped' ? 'Arriving 18 Aug · Pathao Courier' : o[4] === 'Processing' ? 'Seller is preparing your parcel' : o[4] === 'Cancelled' ? 'Cancelled by you · Refund completed' : 'Return completed · ৳2,300 refunded'}</p>
${o[4] === 'Shipped' ? `<div class="mt-2 max-w-[260px]"><div class="bar"><i style="width:62%;background:#ff2525"></i></div><p class="text-[11px] text-ink-400 mt-1">In transit — Tejgaon hub</p></div>` : ''}</div></div>
<div class="flex flex-wrap gap-2 items-start">
<a href="order-details.html" class="btn btn-sm btn-outline">${svg('eye')}Details</a>
${o[4] === 'Delivered' ? `<button class="btn btn-sm btn-outline" data-modal-open="review-modal">${svg('star')}Rate &amp; review</button><a href="returns.html" class="btn btn-sm btn-outline">${svg('return')}Return</a>` : ''}
${o[4] === 'Shipped' ? `<a href="order-details.html" class="btn btn-sm btn-outline">${svg('route')}Track</a>` : ''}
${o[4] === 'Processing' ? `<button class="btn btn-sm btn-danger" data-modal-open="cancel-modal">${svg('x')}Cancel order</button>` : ''}
<button class="btn btn-sm btn-primary" data-cart-add>${svg('refresh')}Buy again</button>
<button class="btn btn-sm btn-outline btn-icon">${svg('print')}</button></div></div></div>`).join('')}</div>
<div class="card mt-3">${tfoot(1, 8, 42)}</div>

<div class="modal" id="review-modal"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">
<div class="card-head"><h3>Rate &amp; review</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5"><div class="flex gap-3 mb-4">${ph(1, 'pkg', 'w-14 h-14 rounded-xl')}<div><p class="text-[13.5px] font-bold">Cotton Panjabi — Navy Blue (L)</p><p class="text-[12px] text-ink-500">Aarong Style · Delivered 11 Aug 2026</p></div></div>
<label class="label">Overall rating <span class="req">*</span></label>
<div class="flex items-center gap-2 mb-4" data-rate data-value="0">${[1, 2, 3, 4, 5].map(i => `<button data-rate-star class="text-ink-200">${svg('star', 'w-7 h-7', 0)}</button>`).join('')}<span class="text-[13px] font-bold ml-1" data-rate-out>0.0</span></div>
<div class="grid sm:grid-cols-3 gap-3 mb-4">${[['Quality', 5], ['Value for money', 5], ['Delivery speed', 5]].map(x => `<div><label class="label !text-[12px]">${x[0]}</label>${stars(5)}</div>`).join('')}</div>
<label class="label">Review title</label><input class="input mb-3" placeholder="Sum it up in a few words">
<label class="label">Your review <span class="req">*</span></label><textarea class="textarea mb-3" placeholder="What did you like or dislike? How was the fit, quality and delivery?"></textarea>
<label class="label">Add photos or video</label><div class="upload-box mb-3">${svg('camera', 'w-5 h-5')}<span>Upload up to 5 photos (JPG/PNG, max 5 MB)</span></div>
<label class="check mb-4"><input type="checkbox" checked>Post this review anonymously</label>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Thanks! Your review was submitted">Submit review</button></div></div></div></div>

<div class="modal" id="cancel-modal"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel is-narrow">
<div class="card-head"><h3>Cancel order</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5"><p class="text-[13px] text-ink-600 mb-4">Order <b>HB-883771</b> will be cancelled and any payment refunded within 3–7 working days.</p>
<label class="label">Reason for cancellation <span class="req">*</span></label>
<div class="space-y-2 mb-4">${['Ordered by mistake', 'Found a better price elsewhere', 'Delivery is taking too long', 'Want to change address or payment', 'No longer needed', 'Other reason'].map((r, i) => `<label class="check"><input type="radio" name="cr" ${i === 0 ? 'checked' : ''}>${r}</label>`).join('')}</div>
<label class="label">Additional comments</label><textarea class="textarea !min-h-[80px] mb-4" placeholder="Tell us more (optional)"></textarea>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Keep order</button><button class="btn btn-danger flex-1" data-modal-close data-toast="Order cancelled — refund initiated">Cancel order</button></div></div></div></div>`
});

/* ----------------------------- ORDER DETAILS ---------------------------- */
W('order-details.html', {
  title: 'Order HB-884213', sub: 'Placed on 14 August 2026, 10:24 AM · 2 items · Paid with bKash', active: 'orders.html', crumbs: ['My Orders', 'HB-884213'],
  actions: `<button class="btn btn-sm btn-outline">${svg('print')}Print invoice</button><button class="btn btn-sm btn-outline">${svg('dl')}Download PDF</button><button class="btn btn-sm btn-primary">${svg('msg')}Contact seller</button>`,
  body: `
<div class="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-4">
<div class="space-y-4">
${card('', `<div class="p-5"><div class="flex flex-wrap items-center gap-3 mb-5"><span class="badge badge-blue">${svg('truck')}In transit</span>
<p class="text-[13px] text-ink-600">Estimated delivery <b class="text-ink-900">Tuesday, 18 August 2026</b></p>
<span class="badge badge-gray ml-auto">Tracking: PTH-884213-BD</span></div>
<div class="steps mb-6 overflow-x-auto pb-1">${[['Placed', 'is-done'], ['Confirmed', 'is-done'], ['Packed', 'is-done'], ['Shipped', 'is-current'], ['Out for delivery', ''], ['Delivered', '']].map((s, i, a) => `<div class="step ${s[1]}"><span class="num">${s[1] === 'is-done' ? svg('check', 'w-3.5 h-3.5') : i + 1}</span>${s[0]}</div>${i < a.length - 1 ? '<span class="step-line"></span>' : ''}`).join('')}</div>
<div class="timeline">${[['Parcel arrived at Tejgaon sorting hub', 'Dhaka · 16 Aug 2026, 7:45 PM', 'is-active'], ['Parcel picked up by Pathao Courier', 'Mirpur · 15 Aug 2026, 4:20 PM', 'is-done'], ['Seller packed your order', 'Rahim Electronics · 15 Aug 2026, 9:10 AM', 'is-done'], ['Payment confirmed via bKash', '14 Aug 2026, 10:26 AM', 'is-done'], ['Order placed', '14 Aug 2026, 10:24 AM', 'is-done']].map(t => `<div class="tl-item ${t[2]}"><p class="text-[13px] font-bold">${t[0]}</p><p class="text-[12px] text-ink-400">${t[1]}</p></div>`).join('')}</div></div>`)}

${card('Items in this order (2)', `<div class="p-4 space-y-3">${[['Realme C100X 6/128GB — Green', '৳11,290', 1, 'Rahim Electronics', 'phoneDev', 'Shipped'], ['Tempered Glass Protector', '৳200', 2, 'Rahim Electronics', 'pkg', 'Shipped']].map((it, i) => `<div class="flex flex-wrap gap-3 p-3 rounded-xl border border-[#e7e9ef]">${ph(i, it[4], 'w-16 h-16 rounded-lg shrink-0')}
<div class="flex-1 min-w-[180px]"><a href="../product-details.html" class="text-[13.5px] font-bold hover:text-brand-600">${it[0]}</a>
<p class="text-[12px] text-ink-500 mt-0.5">Sold by <a href="../shop-profile.html" class="link">${it[3]}</a></p>
<p class="text-[12px] text-ink-400">Colour: Green · Warranty: 1 year official</p></div>
<div class="text-right"><p class="text-[14px] font-extrabold">${it[1]}</p><p class="text-[12px] text-ink-500">Qty: ${it[2]}</p></div>
<div class="flex gap-2 w-full sm:w-auto"><button class="btn btn-xs btn-outline">${svg('star')}Review</button><button class="btn btn-xs btn-outline">${svg('return')}Return</button><button class="btn btn-xs btn-primary" data-cart-add>Buy again</button></div></div>`).join('')}</div>`)}

${card('Delivery &amp; payment', `<div class="p-5 grid sm:grid-cols-2 gap-5">
<div><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Shipping address</p>
<p class="text-[13.5px] font-bold">Nusrat Jahan</p><p class="text-[13px] text-ink-600 leading-relaxed">House 42, Road 8, Block C<br>Banani, Dhaka 1213<br>+880 1712-345678</p>
<span class="badge badge-gray mt-2">Home</span></div>
<div><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Billing address</p>
<p class="text-[13.5px] font-bold">Nusrat Jahan</p><p class="text-[13px] text-ink-600 leading-relaxed">Same as shipping address<br>&nbsp;<br>&nbsp;</p></div>
<div><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Payment method</p>
<div class="flex items-center gap-2.5"><span class="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 grid place-items-center">${svg('wallet', 'w-4 h-4')}</span>
<div><p class="text-[13px] font-bold">bKash — 01712xxxx78</p><p class="text-[12px] text-ink-500">Transaction ID: BKS8842137X</p></div></div>
<span class="badge badge-green mt-2">${svg('check')}Payment successful</span></div>
<div><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Shipping method</p>
<p class="text-[13px] font-bold">Standard delivery</p><p class="text-[12.5px] text-ink-500">Pathao Courier · 2–3 working days</p>
<p class="text-[12.5px] text-ink-500 mt-1">Delivery note: Please call before arriving.</p></div></div>`)}
</div>

<aside class="space-y-4">
${card('Order summary', `<div class="p-5 space-y-2.5 text-[13px]">
${[['Subtotal (2 items)', '৳11,690'], ['Delivery fee', '৳80'], ['Voucher — NEW20', '-৳400'], ['Wallet credit used', '-৳80'], ['VAT (included)', '৳0']].map(r => `<div class="flex justify-between"><span class="text-ink-500">${r[0]}</span><span class="font-semibold ${r[1][0] === '-' ? 'text-green-600' : ''}">${r[1]}</span></div>`).join('')}
<div class="dotted-sep !my-3"></div>
<div class="flex justify-between items-center"><span class="text-[14px] font-extrabold">Total paid</span><span class="text-[20px] font-extrabold text-brand-600">৳11,290</span></div>
<p class="text-[11.5px] text-ink-400">You saved ৳480 on this order</p></div>`)}
${card('Need help with this order?', `<div class="p-4 space-y-2">${[['msg', 'Message the seller', ''], ['question', 'Open a support ticket', 'support.html'], ['return', 'Return or exchange', 'returns.html'], ['x', 'Report a problem', ''], ['file', 'Request invoice copy', '']].map(a => `<a ${a[2] ? `href="${a[2]}"` : ''} class="dd-item">${svg(a[0])}${a[1]}${svg('chevR', 'w-4 h-4 ml-auto')}</a>`).join('')}</div>`)}
${card('Seller information', `<div class="p-4"><div class="flex items-center gap-3 mb-3">${ph(2, 'store', 'w-12 h-12 rounded-xl')}
<div class="min-w-0"><p class="text-[13.5px] font-bold">Rahim Electronics</p><div class="flex items-center gap-1.5">${stars(5)}<span class="text-[11.5px] text-ink-500">4.8 (2,340)</span></div></div></div>
<div class="grid grid-cols-3 gap-2 text-center mb-3">${[['98%', 'Ship on time'], ['4.8', 'Rating'], ['1hr', 'Response']].map(x => `<div class="p-2 rounded-lg bg-ink-50"><p class="text-[13px] font-extrabold">${x[0]}</p><p class="text-[10.5px] text-ink-500">${x[1]}</p></div>`).join('')}</div>
<a href="../shop-profile.html" class="btn btn-sm btn-outline btn-block">Visit store</a></div>`)}
${card('Buyer protection', `<div class="p-4 space-y-2.5">${[['shield', '7-day easy return'], ['check', 'Genuine product guarantee'], ['money', 'Money-back guarantee'], ['phone', '24/7 customer support']].map(x => `<p class="flex items-center gap-2 text-[12.5px] text-ink-600">${svg(x[0], 'w-4 h-4 text-service-500')}${x[1]}</p>`).join('')}</div>`)}
</aside></div>`
});

/* -------------------------------- RETURNS ------------------------------- */
W('returns.html', {
  title: 'Returns &amp; Cancellations', sub: 'Request a return, track refunds and review cancelled orders.', active: 'returns.html', crumbs: ['Shopping', 'Returns'],
  actions: `<button class="btn btn-sm btn-primary" data-modal-open="return-modal">${svg('plus')}New return request</button>`,
  body: `
${stats([['Total returns', '4', '', 'return', 'brand'], ['In progress', '1', '', 'clock', 'gold'], ['Refunded', '2', '', 'money', 'service'], ['Total refunded', '৳4,150', '', 'wallet', 'brand']])}
${tabs([['All requests', '4'], ['Pending approval', '1'], ['Approved', '1'], ['In transit', '0'], ['Refunded', '2'], ['Rejected', '0'], ['Cancellations', '2']])}
${filterbar(['search', ['All time', 'Last 30 days', 'Last 3 months'], ['All types', 'Return', 'Exchange', 'Cancellation'], ['All statuses', 'Pending', 'Approved', 'Refunded', 'Rejected']])}
<div class="space-y-3.5">${[
      ['RTN-4821', 'Smart Watch — Fitness Pro', 'Gadget Hub BD', '৳2,300', 'Refunded', 'Item defective — screen not responding', '24 Jul 2026', 'Refunded to bKash on 29 Jul'],
      ['RTN-4790', 'Wooden Bookshelf — 3 Tier', 'Kaner Furniture', '৳2,950', 'Pending', 'Wrong item delivered — received 2 tier', '12 Aug 2026', 'Awaiting seller approval (within 48 hours)'],
      ['RTN-4655', 'Leather Wallet — Black', 'Dhaka Leather Co.', '৳850', 'Refunded', 'Changed my mind', '2 Jul 2026', 'Refunded to wallet on 6 Jul'],
      ['RTN-4520', 'Cotton T-Shirt — Blue (M)', 'Aarong Style', '৳450', 'Approved', 'Size too small — need exchange for L', '15 Aug 2026', 'Pickup scheduled for 18 Aug, 11 AM – 5 PM']
    ].map((r, i) => `<div class="card overflow-hidden">
<div class="flex flex-wrap items-center gap-3 px-4 py-3 bg-ink-50 border-b border-[#e7e9ef]">
<span class="text-[12.5px] font-extrabold">${r[0]}</span>${st(r[4])}<span class="text-[12px] text-ink-500">Requested ${r[6]}</span>
<div class="ml-auto flex items-center gap-2"><span class="text-[12px] text-ink-500">Refund amount</span><b class="text-[15px] text-brand-600">${r[3]}</b></div></div>
<div class="p-4 flex flex-wrap gap-4">
<div class="flex gap-3 flex-1 min-w-[240px]">${ph(i, 'pkg', 'w-16 h-16 rounded-xl shrink-0')}
<div class="min-w-0"><p class="text-[13.5px] font-bold clamp-1">${r[1]}</p><p class="text-[12px] text-ink-500">Sold by ${r[2]}</p>
<p class="text-[12px] text-ink-600 mt-1"><b>Reason:</b> ${r[5]}</p><p class="text-[12px] text-ink-400 mt-0.5">${r[7]}</p></div></div>
<div class="flex flex-wrap gap-2 items-start"><button class="btn btn-sm btn-outline">${svg('eye')}View details</button>
${r[4] === 'Pending' ? `<button class="btn btn-sm btn-danger">${svg('x')}Withdraw</button>` : ''}
${r[4] === 'Approved' ? `<button class="btn btn-sm btn-outline">${svg('cal')}Reschedule pickup</button>` : ''}
<button class="btn btn-sm btn-outline">${svg('msg')}Contact support</button></div></div>
<div class="px-4 pb-4"><div class="flex flex-wrap gap-6 p-3 rounded-xl bg-ink-50">${[['Requested', r[6]], ['Approved', r[4] === 'Pending' ? '—' : '17 Aug 2026'], ['Picked up', ['Refunded'].includes(r[4]) ? '19 Aug 2026' : '—'], ['Refunded', r[4] === 'Refunded' ? '22 Aug 2026' : 'Expected 26 Aug']].map(x => `<div><p class="text-[10.5px] font-extrabold uppercase tracking-wider text-ink-400">${x[0]}</p><p class="text-[12.5px] font-bold">${x[1]}</p></div>`).join('')}</div></div></div>`).join('')}</div>

<h2 class="text-[16px] font-extrabold mt-6 mb-3">Cancelled orders</h2>
${card('', table([['Order'], ['Product'], ['Amount'], ['Cancelled by'], ['Reason'], ['Refund status'], ['']], [
      ['<b>HB-883620</b><p class="text-[11.5px] text-ink-400">2 Aug 2026</p>', prow(4, 'Power Bank 50,000mAh', 'Gadget Hub BD', 'bolt'), '৳1,100', 'You', 'Ordered by mistake', st('Refunded'), `<button class="btn btn-xs btn-outline">Details</button>`],
      ['<b>HB-883180</b><p class="text-[11.5px] text-ink-400">18 Jul 2026</p>', prow(5, 'Ceramic Vase Set', 'Home Decor BD', 'home'), '৳780', 'Seller', 'Out of stock', st('Refunded'), `<button class="btn btn-xs btn-outline">Details</button>`]
    ]))}

${card('Return policy at a glance', `<div class="p-5 grid sm:grid-cols-3 gap-4">${[['clock', '7-day window', 'Request a return within 7 days of delivery for most categories.'], ['truck', 'Free pickup', 'We collect the parcel from your address within 48 hours.'], ['money', 'Fast refunds', 'Money back in 3–7 working days, or instantly to your wallet.']].map(x => `<div class="flex gap-3"><span class="w-10 h-10 rounded-xl bg-service-50 text-service-600 grid place-items-center shrink-0">${svg(x[0], 'w-4 h-4')}</span>
<div><p class="text-[13px] font-extrabold mb-0.5">${x[1]}</p><p class="text-[12px] text-ink-500">${x[2]}</p></div></div>`).join('')}
<a href="../return-policy.html" class="link text-[12.5px] sm:col-span-3">Read the full return &amp; refund policy →</a></div>`, '', 'mt-4')}

<div class="modal" id="return-modal"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">
<div class="card-head"><h3>Request a return or exchange</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5">
<label class="label">Select order <span class="req">*</span></label>
<select class="select mb-3"><option>HB-884109 — Cotton Panjabi (Delivered 11 Aug)</option><option>HB-883942 — Organic Honey 500g (Delivered 8 Aug)</option><option>HB-883311 — 24 inch LED Monitor (Delivered 19 Jul)</option></select>
<label class="label">Select item(s) <span class="req">*</span></label>
<div class="space-y-2 mb-3">${[['Cotton Panjabi — Navy Blue (L)', '৳1,850', 1]].map((it, i) => `<label class="flex items-center gap-3 p-3 rounded-xl border border-[#e7e9ef] cursor-pointer"><input type="checkbox" checked class="w-[18px] h-[18px]" style="accent-color:#ff2525">${ph(i, 'shirt', 'w-11 h-11 rounded-lg')}
<span class="flex-1 min-w-0"><span class="block text-[13px] font-bold">${it[0]}</span><span class="block text-[12px] text-ink-500">${it[1]} · Qty ${it[2]}</span></span>
<select class="select input-sm !w-[74px]"><option>Qty 1</option></select></label>`).join('')}</div>
<div class="grid sm:grid-cols-2 gap-3 mb-3">
<div><label class="label">Request type <span class="req">*</span></label><select class="select"><option>Return &amp; refund</option><option>Exchange for another size</option><option>Exchange for another colour</option><option>Repair under warranty</option></select></div>
<div><label class="label">Reason <span class="req">*</span></label><select class="select"><option>Item damaged or broken</option><option>Wrong item received</option><option>Item defective / not working</option><option>Different from description</option><option>Size or fit issue</option><option>Missing parts or accessories</option><option>Changed my mind</option></select></div></div>
<label class="label">Describe the issue <span class="req">*</span></label><textarea class="textarea !min-h-[90px] mb-3" placeholder="Tell us what went wrong so we can resolve it faster…"></textarea>
<label class="label">Upload photos <span class="req">*</span></label><div class="upload-box mb-3">${svg('camera', 'w-5 h-5')}<span>Add clear photos of the item and packaging (up to 5 files)</span></div>
<div class="grid sm:grid-cols-2 gap-3 mb-3">
<div><label class="label">Preferred pickup date</label><input type="date" class="input"></div>
<div><label class="label">Refund destination</label><select class="select"><option>Original payment method (bKash)</option><option>HaatBazar wallet (instant)</option><option>Bank account transfer</option></select></div></div>
<label class="label">Pickup address</label><select class="select mb-3"><option>Home — House 42, Road 8, Banani, Dhaka 1213</option><option>Office — Level 5, Gulshan 1, Dhaka 1212</option></select>
<label class="check mb-4"><input type="checkbox" checked>I confirm the item is unused, in original packaging with all accessories.</label>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Return request submitted — RTN-4835">Submit request</button></div></div></div></div>`
});

/* ------------------------------- BOOKINGS ------------------------------- */
W('bookings.html', {
  title: 'Service Bookings', sub: 'Manage appointments, quotes and enquiries with local service providers.', active: 'bookings.html', crumbs: ['Shopping', 'Bookings'],
  actions: `<a href="../services.html" class="btn btn-sm btn-outline">${svg('search')}Find a provider</a><button class="btn btn-sm btn-service" data-modal-open="book-modal">${svg('plus')}New booking</button>`,
  body: `
${stats([['Total bookings', '18', '', 'cal', 'service'], ['Upcoming', '2', '', 'clock', 'gold'], ['Completed', '15', '', 'check', 'service'], ['Quotes received', '4', '', 'file', 'brand']])}
${tabs([['All', '18'], ['Upcoming', '2'], ['Pending confirmation', '1'], ['In progress', '0'], ['Completed', '15'], ['Cancelled', '1'], ['My enquiries', '4']])}
${filterbar(['search', ['All categories', 'AC & Appliance', 'Home Cleaning', 'Plumbing', 'Electrician', 'Beauty & Salon', 'Tutors'], ['All statuses', 'Pending', 'Confirmed', 'Completed', 'Cancelled'], 'date'])}
<div class="grid lg:grid-cols-2 gap-3.5">${[
      ['BKG-2841', 'AC Servicing — Split 1.5 Ton', 'Kamal AC Servicing', '18 Aug 2026', '10:00 AM – 12:00 PM', 'Confirmed', '৳1,200', 'Banani, Dhaka', 'fan'],
      ['BKG-2836', 'Home Deep Cleaning — 3 Bedroom', 'Nirapod Home Cleaning', '22 Aug 2026', '02:00 PM – 06:00 PM', 'Pending', '৳3,500', 'Banani, Dhaka', 'broom'],
      ['BKG-2790', 'Electrical Wiring Repair', 'Rahim Electric Service', '2 Aug 2026', '11:00 AM – 01:00 PM', 'Completed', '৳900', 'Banani, Dhaka', 'bolt'],
      ['BKG-2745', 'Bridal Makeup Trial', 'Glamour Beauty Parlour', '26 Jul 2026', '04:00 PM – 06:00 PM', 'Completed', '৳4,500', 'Gulshan, Dhaka', 'sparkle'],
      ['BKG-2698', 'Maths Tutor — Class 9 (Weekly)', 'Jaman Tutorial', '20 Jul 2026', '05:00 PM – 06:30 PM', 'Completed', '৳6,000/mo', 'Banani, Dhaka', 'graduation'],
      ['BKG-2612', 'Pest Control — Full Flat', 'SafeHome Pest Control', '12 Jul 2026', '09:00 AM – 12:00 PM', 'Cancelled', '৳2,400', 'Banani, Dhaka', 'shield']
    ].map((b, i) => `<div class="card p-4">
<div class="flex items-start gap-3 mb-3">${ph(i, b[8], 'w-14 h-14 rounded-xl shrink-0')}
<div class="flex-1 min-w-0"><div class="flex items-center gap-2 flex-wrap"><p class="text-[14px] font-extrabold clamp-1">${b[1]}</p>${st(b[5])}</div>
<p class="text-[12.5px] text-ink-500 mt-0.5">${b[2]} ${svg('shield', 'w-3.5 h-3.5 inline text-service-500')}</p>
<p class="text-[11.5px] text-ink-400">${b[0]}</p></div>
<p class="text-[15px] font-extrabold text-brand-600 shrink-0">${b[6]}</p></div>
<div class="grid grid-cols-2 gap-2 mb-3">${[['cal', b[3]], ['clock', b[4]], ['pin', b[7]], ['wallet', 'Pay after service']].map(x => `<p class="flex items-center gap-1.5 text-[12px] text-ink-600">${svg(x[0], 'w-3.5 h-3.5 text-ink-400')}${x[1]}</p>`).join('')}</div>
<div class="flex flex-wrap gap-2">${b[5] === 'Confirmed' ? `<button class="btn btn-xs btn-service">${svg('phone')}Call provider</button><button class="btn btn-xs btn-outline">${svg('cal')}Reschedule</button><button class="btn btn-xs btn-danger">Cancel</button>` :
        b[5] === 'Pending' ? `<button class="btn btn-xs btn-outline">${svg('msg')}Message</button><button class="btn btn-xs btn-danger">Withdraw request</button>` :
          b[5] === 'Completed' ? `<button class="btn btn-xs btn-primary" data-modal-open="srv-review">${svg('star')}Rate service</button><button class="btn btn-xs btn-outline">${svg('refresh')}Book again</button><button class="btn btn-xs btn-outline">${svg('file')}Invoice</button>` :
            `<button class="btn btn-xs btn-outline">${svg('refresh')}Book again</button>`}
<button class="btn btn-xs btn-outline ml-auto">Details</button></div></div>`).join('')}</div>

<h2 class="text-[16px] font-extrabold mt-6 mb-3">My enquiries &amp; quotes</h2>
${card('', table([['Enquiry'], ['Service requested'], ['Providers contacted'], ['Quotes'], ['Best quote'], ['Status'], ['']], [
      ['<b>ENQ-1182</b><p class="text-[11.5px] text-ink-400">16 Aug 2026</p>', 'Interior painting — 1,400 sq ft flat', '5 providers', '<b>3 received</b>', '<b class="text-brand-600">৳38,000</b>', st('Open'), `<button class="btn btn-xs btn-primary">View quotes</button>`],
      ['<b>ENQ-1174</b><p class="text-[11.5px] text-ink-400">12 Aug 2026</p>', 'Wedding photography — full day', '4 providers', '<b>4 received</b>', '<b class="text-brand-600">৳45,000</b>', st('Open'), `<button class="btn btn-xs btn-primary">View quotes</button>`],
      ['<b>ENQ-1150</b><p class="text-[11.5px] text-ink-400">2 Aug 2026</p>', 'House shifting — Banani to Uttara', '6 providers', '<b>5 received</b>', '<b class="text-brand-600">৳12,500</b>', st('Closed'), `<button class="btn btn-xs btn-outline">View</button>`],
      ['<b>ENQ-1121</b><p class="text-[11.5px] text-ink-400">24 Jul 2026</p>', 'Car AC gas refill &amp; servicing', '3 providers', '<b>2 received</b>', '<b class="text-brand-600">৳4,200</b>', st('Closed'), `<button class="btn btn-xs btn-outline">View</button>`]
    ]))}

<div class="modal" id="book-modal"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">
<div class="card-head"><h3>Book a service</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5"><div class="grid sm:grid-cols-2 gap-3 mb-3">
<div><label class="label">Service category <span class="req">*</span></label><select class="select"><option>AC &amp; Appliance Repair</option><option>Home Cleaning</option><option>Plumbing</option><option>Electrician</option><option>Painting</option><option>Pest Control</option><option>Beauty &amp; Salon</option><option>Tutors &amp; Coaching</option></select></div>
<div><label class="label">Specific service <span class="req">*</span></label><select class="select"><option>AC servicing &amp; cleaning</option><option>AC installation</option><option>AC gas refill</option><option>AC repair</option></select></div>
<div><label class="label">Preferred date <span class="req">*</span></label><input type="date" class="input"></div>
<div><label class="label">Preferred time slot <span class="req">*</span></label><select class="select"><option>Morning (8 AM – 12 PM)</option><option>Afternoon (12 PM – 4 PM)</option><option>Evening (4 PM – 8 PM)</option><option>Flexible</option></select></div></div>
<label class="label">Service address <span class="req">*</span></label><select class="select mb-3"><option>Home — House 42, Road 8, Banani, Dhaka 1213</option><option>Office — Level 5, Gulshan 1, Dhaka 1212</option><option>+ Add a new address</option></select>
<label class="label">Describe your requirement <span class="req">*</span></label><textarea class="textarea mb-3" placeholder="e.g. 2 split ACs need servicing, one is not cooling properly…"></textarea>
<label class="label">Photos (optional)</label><div class="upload-box mb-3">${svg('camera', 'w-5 h-5')}<span>Add photos so providers can quote accurately</span></div>
<div class="p-3 rounded-xl bg-service-50 mb-4 flex gap-2.5">${svg('info', 'w-4 h-4 text-service-600 shrink-0 mt-0.5')}<p class="text-[12px] text-service-700">We will share your request with up to 5 verified providers nearby. You will receive quotes within 2 hours and can choose the one you like.</p></div>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-service flex-1" data-modal-close data-toast="Request sent to 5 providers nearby">Send request</button></div></div></div></div>

<div class="modal" id="srv-review"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">
<div class="card-head"><h3>Rate this service</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5"><div class="flex gap-3 mb-4">${ph(2, 'bolt', 'w-14 h-14 rounded-xl')}<div><p class="text-[13.5px] font-bold">Electrical Wiring Repair</p><p class="text-[12px] text-ink-500">Rahim Electric Service · 2 Aug 2026</p></div></div>
<label class="label">Overall rating <span class="req">*</span></label>
<div class="flex items-center gap-2 mb-4" data-rate data-value="0">${[1, 2, 3, 4, 5].map(() => `<button data-rate-star class="text-ink-200">${svg('star', 'w-7 h-7', 0)}</button>`).join('')}<span class="text-[13px] font-bold ml-1" data-rate-out>0.0</span></div>
<div class="grid sm:grid-cols-2 gap-3 mb-4">${['Punctuality', 'Work quality', 'Professionalism', 'Value for money'].map(x => `<div><label class="label !text-[12px]">${x}</label>${stars(5)}</div>`).join('')}</div>
<label class="label">Your review</label><textarea class="textarea mb-3" placeholder="How was the service? Would you recommend this provider?"></textarea>
<label class="label">Add photos of the work</label><div class="upload-box mb-4">${svg('camera', 'w-5 h-5')}<span>Before / after photos help other customers</span></div>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-service flex-1" data-modal-close data-toast="Thanks for rating this provider!">Submit review</button></div></div></div></div>`
});

/* -------------------------------- REVIEWS ------------------------------- */
W('reviews.html', {
  title: 'My Reviews', sub: 'Reviews you have written and items still waiting for your feedback.', active: 'reviews.html', crumbs: ['Shopping', 'Reviews'],
  actions: `<button class="btn btn-sm btn-outline">${svg('dl')}Export</button>`,
  body: `
${stats([['Reviews written', '28', '', 'star', 'gold'], ['Awaiting review', '6', '', 'clock', 'brand'], ['Helpful votes', '184', '+24', 'up', 'service'], ['Reviewer rank', '#412', '', 'award', 'brand', 'Top 5% of reviewers']])}
${tabs([['To review', '6'], ['My product reviews', '22'], ['My service reviews', '6'], ['Replies to me', '4']])}
${card('Waiting for your review (6)', `<div class="p-4 grid sm:grid-cols-2 xl:grid-cols-3 gap-3">${[['Organic Honey 500g', 'Sundarban Naturals', 'Delivered 8 Aug', 'drop'], ['24 inch LED Monitor', 'TechZone BD', 'Delivered 19 Jul', 'monitor'], ['Leather Handbag — Brown', 'Dhaka Leather Co.', 'Delivered 28 Jul', 'bag'], ['Maths Tutor — Class 9', 'Jaman Tutorial', 'Completed 20 Jul', 'graduation'], ['Bridal Makeup Trial', 'Glamour Beauty', 'Completed 26 Jul', 'sparkle'], ['Ceramic Dinner Set', 'Home Decor BD', 'Delivered 14 Jul', 'home']].map((p, i) => `<div class="p-3 rounded-xl border border-[#e7e9ef] flex gap-3">${ph(i, p[3], 'w-14 h-14 rounded-lg shrink-0')}
<div class="min-w-0 flex-1"><p class="text-[13px] font-bold clamp-1">${p[0]}</p><p class="text-[11.5px] text-ink-500">${p[1]}</p><p class="text-[11.5px] text-ink-400 mb-2">${p[2]}</p>
<button class="btn btn-xs btn-primary btn-block">${svg('star')}Write a review</button></div></div>`).join('')}</div>`)}
<div class="space-y-3.5 mt-4">${[
      ['Realme C100X 6/128GB — Green', 'Rahim Electronics', 5, 'Excellent value for the price', 'Battery easily lasts two days with normal use and the display is bright enough outdoors. Charging is fast at 45W. The only downside is the plastic back which picks up fingerprints. Delivery took only 2 days to Banani.', '12 Aug 2026', 32, 'Published', 2],
      ['Cotton Panjabi — Navy Blue (L)', 'Aarong Style', 4, 'Good fabric, runs slightly large', 'The cotton is soft and breathable — perfect for Dhaka summer. I usually wear L but this felt closer to XL, so consider sizing down. Stitching is neat and the colour matched the photos.', '13 Aug 2026', 18, 'Published', 1],
      ['Electrical Wiring Repair', 'Rahim Electric Service', 5, 'Professional and on time', 'Arrived exactly at the booked slot, diagnosed the fault in 15 minutes and finished the whole job in under two hours. Cleaned up afterwards too. Charged exactly the quoted amount.', '3 Aug 2026', 24, 'Published', 0],
      ['Power Bank 50,000mAh', 'Gadget Hub BD', 2, 'Capacity is not as advertised', 'It charged my phone only 3 times before running out, which is nowhere near 50,000mAh. Build quality is fine but the capacity claim is misleading. Seller responded quickly and offered a partial refund.', '28 Jul 2026', 41, 'Published', 1]
    ].map((r, i) => `<div class="card p-4">
<div class="flex flex-wrap gap-3 mb-3">${ph(i, 'pkg', 'w-14 h-14 rounded-xl shrink-0')}
<div class="flex-1 min-w-[200px]"><p class="text-[13.5px] font-bold">${r[0]}</p><p class="text-[12px] text-ink-500">${r[1]}</p></div>
<div class="flex items-center gap-2">${st(r[7])}${actionsCell([['Edit review', 'edit'], ['Add photos', 'camera'], ['Share', 'share'], ['Delete review', 'trash', true]])}</div></div>
<div class="flex items-center gap-2 mb-1.5">${stars(r[2])}<span class="text-[12.5px] font-extrabold">${r[3]}</span><span class="text-[11.5px] text-ink-400 ml-auto">${r[5]}</span></div>
<p class="text-[13px] text-ink-600 leading-relaxed mb-3">${r[4]}</p>
<div class="flex gap-2 mb-3">${[0, 1].map(x => ph(x + i, 'camera', 'w-16 h-16 rounded-lg')).join('')}</div>
<div class="flex flex-wrap items-center gap-3 text-[12px] text-ink-400 pt-3 border-t border-[#f0f1f5]">
<span class="flex items-center gap-1">${svg('up', 'w-3.5 h-3.5')}${r[6]} found this helpful</span>
${r[8] ? `<span class="flex items-center gap-1">${svg('msg', 'w-3.5 h-3.5')}${r[8]} seller ${r[8] > 1 ? 'replies' : 'reply'}</span>` : ''}
<button class="btn btn-xs btn-outline ml-auto">${svg('edit')}Edit</button><button class="btn btn-xs btn-outline">${svg('eye')}View on page</button></div>
${r[8] ? `<div class="mt-3 p-3 rounded-xl bg-ink-50 flex gap-2.5"><span class="avatar avatar-sm bg-ink-700">${r[1][0]}</span>
<div class="min-w-0"><p class="text-[12.5px] font-bold">${r[1]} <span class="badge badge-gray ml-1">Seller</span></p>
<p class="text-[12.5px] text-ink-600 mt-0.5">Thank you for the detailed feedback! We have shared your note with our team and would love to help if you need anything else.</p></div></div>` : ''}</div>`).join('')}</div>
<div class="card mt-3">${tfoot(1, 4, 28)}</div>`
});

/* -------------------------------- WISHLIST ------------------------------ */
W('wishlist.html', {
  title: 'My Wishlist', sub: '14 saved items · 3 dropped in price this week', active: 'wishlist.html', crumbs: ['Shopping', 'Wishlist'],
  actions: `<button class="btn btn-sm btn-outline">${svg('share')}Share wishlist</button><button class="btn btn-sm btn-outline">${svg('plus')}New list</button><button class="btn btn-sm btn-primary" data-cart-add>${svg('cart')}Add all to cart</button>`,
  body: `
<div class="flex flex-wrap gap-2 mb-4" data-chip-group>${[['All items', 14], ['Price dropped', 3], ['Back in stock', 2], ['Electronics', 5], ['Fashion', 4], ['Home', 3], ['Services', 2]].map((c, i) => `<button class="chip ${i === 0 ? 'is-active' : ''}">${c[0]} <span class="text-ink-400">(${c[1]})</span></button>`).join('')}</div>
${filterbar([['Sort: Recently added', 'Price: Low to high', 'Price: High to low', 'Biggest discount', 'Name A–Z'], ['All lists', 'Default wishlist', 'Eid shopping', 'Home upgrade']], `<div class="seg" data-view-toggle data-view-target="#wl"><button class="is-active" data-view="grid">${svg('grid', 'w-4 h-4')}</button><button data-view="list">${svg('list', 'w-4 h-4')}</button></div>`)}
<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5" id="wl">${[
      ['Bluetooth Speaker — Portable', '৳1,850', '৳2,100', 'In stock', 'Gadget Hub BD', 4.6, 'bolt', 'Price dropped ৳250'],
      ['Cotton Saree — Handloom', '৳1,850', '৳2,050', 'In stock', 'Tangail Weavers', 4.8, 'shirt', 'Price dropped ৳200'],
      ['Table Fan — Rechargeable', '৳1,650', '৳1,850', 'Low stock', 'Home Appliance BD', 4.4, 'fan', 'Only 3 left'],
      ['Wireless Earbuds Pro', '৳2,450', '', 'In stock', 'TechZone BD', 4.7, 'bolt', ''],
      ['Leather Office Bag', '৳3,200', '', 'In stock', 'Dhaka Leather Co.', 4.9, 'bag', ''],
      ['Air Fryer 5.5L Digital', '৳6,900', '৳7,900', 'In stock', 'Kitchen World', 4.5, 'home', 'Price dropped ৳1,000'],
      ['Study Table — Engineered Wood', '৳5,400', '', 'Out of stock', 'Kaner Furniture', 4.3, 'home', 'Notify me when available'],
      ['Men\'s Running Shoe', '৳2,890', '', 'In stock', 'SportsGear BD', 4.6, 'shirt', ''],
      ['Ceramic Dinner Set — 24pc', '৳3,200', '', 'In stock', 'Home Decor BD', 4.7, 'home', ''],
      ['Smart LED Bulb — 9W RGB', '৳750', '', 'In stock', 'TechZone BD', 4.2, 'sun', ''],
      ['Yoga Mat — Anti Slip 6mm', '৳980', '', 'In stock', 'SportsGear BD', 4.5, 'dumbbell', ''],
      ['Nokshi Kantha Bedcover', '৳4,200', '', 'In stock', 'Jamalpur Crafts', 4.9, 'shirt', '']
    ].map((p, i) => `<div class="pcard card-hover">
<button class="wish-btn is-on" data-wish>${svg('heart', 'w-4 h-4')}</button>
${p[2] ? `<span class="discount-flag">-${Math.round((1 - parseInt(p[1].replace(/\D/g, '')) / parseInt(p[2].replace(/\D/g, ''))) * 100)}%</span>` : ''}
<a href="../product-details.html">${ph(i, p[6], 'aspect-square w-full')}</a>
<div class="pcard-body"><a href="../product-details.html" class="pcard-title mb-1.5">${p[0]}</a>
<div class="flex items-center gap-1.5 mb-1.5">${stars(p[5])}<span class="text-[11.5px] text-ink-400">${p[5]}</span></div>
<p class="mb-1"><span class="price">${p[1]}</span>${p[2] ? ` <span class="price-old">${p[2]}</span>` : ''}</p>
<p class="text-[11.5px] text-ink-400 mb-2 clamp-1">${p[4]}</p>
${p[7] ? `<p class="badge ${p[3] === 'Out of stock' ? 'badge-gray' : p[3] === 'Low stock' ? 'badge-amber' : 'badge-green'} mb-2">${p[7]}</p>` : ''}
<div class="flex gap-1.5">${p[3] === 'Out of stock' ? `<button class="btn btn-sm btn-outline flex-1">${svg('bell')}Notify me</button>` : `<button class="btn btn-sm btn-primary flex-1" data-cart-add>${svg('cart')}Add to cart</button>`}
<button class="btn btn-sm btn-outline btn-icon">${svg('trash')}</button></div></div></div>`).join('')}</div>
<div class="card mt-4">${tfoot(1, 12, 14)}</div>
${card('Saved service providers (2)', `<div class="p-4 grid sm:grid-cols-2 gap-3">${[['Kamal AC Servicing', 'AC & Appliance Repair', 4.5, 74, 'Mirpur, Dhaka', 'fan'], ['Glamour Beauty Parlour', 'Beauty & Salon', 4.8, 210, 'Gulshan, Dhaka', 'sparkle']].map((s, i) => `<div class="p-3 rounded-xl border border-[#e7e9ef] flex gap-3">${ph(i + 4, s[5], 'w-14 h-14 rounded-xl shrink-0')}
<div class="flex-1 min-w-0"><p class="text-[13.5px] font-bold clamp-1">${s[0]} ${svg('shield', 'w-3.5 h-3.5 inline text-service-500')}</p>
<p class="text-[12px] text-ink-500">${s[1]} · ${s[4]}</p>
<div class="flex items-center gap-1.5 my-1"><span class="rating-pill">${svg('star')}${s[2]}</span><span class="text-[11.5px] text-ink-400">(${s[3]} reviews)</span></div>
<div class="flex gap-1.5"><button class="btn btn-xs btn-service">${svg('phone')}Call</button><a href="../service-details.html" class="btn btn-xs btn-outline">View</a><button class="btn btn-xs btn-outline">${svg('trash')}</button></div></div></div>`).join('')}</div>`, '', 'mt-4')}`
});

/* ------------------------------- ADDRESSES ------------------------------ */
W('addresses.html', {
  title: 'Address Book', sub: 'Manage delivery and billing addresses for faster checkout.', active: 'addresses.html', crumbs: ['Account', 'Addresses'],
  actions: `<button class="btn btn-sm btn-primary" data-modal-open="addr-modal">${svg('plus')}Add new address</button>`,
  body: `
<div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-3.5">${[
      ['Home', 'Nusrat Jahan', '+880 1712-345678', 'House 42, Road 8, Block C', 'Banani, Dhaka 1213', 'Dhaka', 'Banani', true, true, 'Please call before arriving. Green gate, 3rd floor.'],
      ['Office', 'Nusrat Jahan', '+880 1712-345678', 'Level 5, Rangs Babylonia, Plot 246', 'Gulshan 1, Dhaka 1212', 'Dhaka', 'Gulshan', false, false, 'Reception will receive after 10 AM.'],
      ['Parents\' house', 'Abdul Karim', '+880 1811-223344', 'Village: Char Kalibari, Post: Sadar', 'Jamalpur 2000', 'Jamalpur', 'Sadar', false, false, ''],
      ['Sister\'s flat', 'Farhana Jahan', '+880 1911-556677', 'Flat B4, House 12, Road 3', 'Dhanmondi, Dhaka 1205', 'Dhaka', 'Dhanmondi', false, false, '']
    ].map((a, i) => `<div class="card p-4 ${a[7] ? 'ring-2 ring-brand-500/20 border-brand-200' : ''}">
<div class="flex items-center gap-2 mb-3"><span class="w-9 h-9 rounded-xl bg-${a[7] ? 'brand' : 'ink'}-50 text-${a[7] ? 'brand' : 'ink'}-600 grid place-items-center">${svg(a[0] === 'Home' ? 'home' : a[0] === 'Office' ? 'store' : 'pin', 'w-4 h-4')}</span>
<p class="text-[14px] font-extrabold">${a[0]}</p>
${a[7] ? '<span class="badge badge-brand">Default shipping</span>' : ''}${a[8] ? '<span class="badge badge-gray">Billing</span>' : ''}
<div class="ml-auto">${actionsCell([['Edit address', 'edit'], ['Set as default', 'check'], ['Set as billing', 'file'], ['Delete', 'trash', true]])}</div></div>
<p class="text-[13.5px] font-bold mb-0.5">${a[1]}</p>
<p class="text-[12.5px] text-ink-500 mb-2">${a[2]}</p>
<p class="text-[13px] text-ink-600 leading-relaxed">${a[3]}<br>${a[4]}<br>${a[5]} Division · ${a[6]}</p>
${a[9] ? `<p class="text-[12px] text-ink-400 mt-2 p-2 rounded-lg bg-ink-50">${svg('info', 'w-3.5 h-3.5 inline')} ${a[9]}</p>` : ''}
<div class="flex gap-2 mt-3 pt-3 border-t border-[#f0f1f5]"><button class="btn btn-xs btn-outline flex-1" data-modal-open="addr-modal">${svg('edit')}Edit</button>
${!a[7] ? `<button class="btn btn-xs btn-outline flex-1">Set default</button>` : ''}
<button class="btn btn-xs btn-danger btn-icon">${svg('trash')}</button></div></div>`).join('')}
<button class="card p-4 border-dashed border-2 grid place-items-center min-h-[220px] hover:border-brand-300 hover:bg-brand-50" data-modal-open="addr-modal">
<span class="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 grid place-items-center mb-2">${svg('plus', 'w-5 h-5')}</span>
<p class="text-[13.5px] font-extrabold">Add a new address</p><p class="text-[12px] text-ink-400">Save up to 10 addresses</p></button></div>

${card('Delivery preferences', `<div class="p-5 space-y-3">${[['Leave parcel with security or neighbour if I am not home', true], ['Send SMS before the rider arrives', true], ['Call me before delivery attempt', true], ['Allow contactless delivery', false]].map(p => `<label class="flex items-center justify-between gap-3 py-2 border-b border-[#f4f5f8] last:border-0"><span class="text-[13px] text-ink-700">${p[0]}</span>
<span class="switch"><input type="checkbox" ${p[1] ? 'checked' : ''}><span class="track"></span></span></label>`).join('')}</div>`, '', 'mt-4')}

<div class="modal" id="addr-modal"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">
<div class="card-head"><h3>Add / edit address</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5"><div class="grid sm:grid-cols-2 gap-3 mb-3">
<div><label class="label">Full name <span class="req">*</span></label><input class="input" value="Nusrat Jahan"></div>
<div><label class="label">Mobile number <span class="req">*</span></label><div class="input-affix"><span class="affix">+880</span><input class="input" value="1712-345678"></div></div>
<div><label class="label">Alternate phone</label><input class="input" placeholder="Optional backup number"></div>
<div><label class="label">Email (for updates)</label><input class="input" placeholder="you@example.com"></div>
<div><label class="label">Division <span class="req">*</span></label><select class="select"><option>Dhaka</option><option>Chattogram</option><option>Rajshahi</option><option>Khulna</option><option>Barishal</option><option>Sylhet</option><option>Rangpur</option><option>Mymensingh</option></select></div>
<div><label class="label">District <span class="req">*</span></label><select class="select"><option>Dhaka</option><option>Gazipur</option><option>Narayanganj</option><option>Savar</option></select></div>
<div><label class="label">Area / Thana <span class="req">*</span></label><select class="select"><option>Banani</option><option>Gulshan</option><option>Dhanmondi</option><option>Mirpur</option><option>Uttara</option><option>Mohakhali</option></select></div>
<div><label class="label">Postal code</label><input class="input" value="1213"></div></div>
<label class="label">Street address <span class="req">*</span></label><input class="input mb-3" value="House 42, Road 8, Block C">
<label class="label">Landmark / delivery note</label><textarea class="textarea !min-h-[70px] mb-3" placeholder="e.g. Opposite Banani Kacha Bazar, green gate">Please call before arriving. Green gate, 3rd floor.</textarea>
<label class="label">Pin location on map</label><div class="rounded-xl overflow-hidden border border-[#e7e9ef] mb-3 relative">${ph(3, 'pin', 'h-[150px] w-full')}<button class="btn btn-xs btn-outline absolute right-2 bottom-2 !bg-white">${svg('pin')}Use my location</button></div>
<label class="label">Address label</label><div class="flex gap-2 mb-3" data-chip-group>${['Home', 'Office', 'Other'].map((l, i) => `<button class="chip ${i === 0 ? 'is-active' : ''}">${l}</button>`).join('')}</div>
<div class="space-y-2 mb-4"><label class="check"><input type="checkbox" checked>Set as default shipping address</label>
<label class="check"><input type="checkbox">Set as default billing address</label></div>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Address saved successfully">Save address</button></div></div></div></div>`
});
console.log('user: dashboard, orders, order-details, returns, bookings, reviews, wishlist, addresses');
