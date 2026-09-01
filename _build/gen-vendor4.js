/* Vendor Dashboard — batch 2: reviews, messages, Q&A, shipping */
const fs = require('fs');
const K = require('./kit');
const { dashPage, stats, card, table, tfoot, st, filterbar, tabs, bulkbar, svg, ph, stars, tk, actionsCell, empty, prow, hbars, donut, lineChart, barChart,
  mini, tiles, kv, note, fld, inp, sel, ta, sw, chk, gridForm, frows, formCard, people, timeline, bars, modal, modalFoot, listPage, kanban, calendar, chatShell } = K;
const OUT = 'f:/niko-design/vendor/';
const W = (f, h) => { fs.writeFileSync(OUT + f, h); console.log('vendor/' + f); };
const V = (o) => dashPage(Object.assign({ role: 'vendor' }, o));
const btn = (l, i, c = 'outline', x = '') => `<button class="btn btn-sm btn-${c}" ${x}>${i ? svg(i) : ''}${l}</button>`;
const a2 = (l, i, h, c = 'outline') => `<a href="${h}" class="btn btn-sm btn-${c}">${i ? svg(i) : ''}${l}</a>`;

/* ---------------------------- REVIEWS --------------------------------- */
const rvw = (n, txt, item, rating, when, extra = '', reply = '') => `<div class="p-4 border-b border-[#f0f1f5] last:border-0">
<div class="flex items-start gap-3"><span class="avatar avatar-md bg-ink-700 shrink-0">${n[0]}</span>
<div class="min-w-0 flex-1"><div class="flex flex-wrap items-center gap-2 mb-1">
<p class="text-[13.5px] font-extrabold">${n}</p><span class="badge badge-green !text-[10px]">${svg('check', 'w-3 h-3')}Verified purchase</span>
<span class="text-[11.5px] text-ink-400 ml-auto">${when}</span></div>
<div class="flex items-center gap-2 mb-1.5">${stars(rating)}<span class="text-[12px] font-bold">${rating}.0</span></div>
<p class="text-[13px] text-ink-600 leading-relaxed">${txt}</p>
${extra}
<div class="flex items-center gap-2 mt-2.5 text-[11.5px] text-ink-400"><span class="flex items-center gap-1">${svg('box', 'w-3.5 h-3.5')}${item}</span>
<span class="flex items-center gap-1">${svg('heart', 'w-3.5 h-3.5')}12 found helpful</span></div>
${reply || `<div class="flex flex-wrap gap-1.5 mt-3">${btn('Reply publicly', 'msg', 'primary', 'data-modal-open="m-reply"')}${btn('Thank customer', 'heart')}${btn('Report review', 'flag')}${btn('Contact buyer', 'phone', 'ghost')}</div>`}
</div></div></div>`;

W('reviews.html', V({
  title: 'Reviews & Ratings', sub: 'Reply to customer feedback, request reviews and track your rating health.',
  active: 'reviews.html', crumbs: ['Reviews'],
  actions: [btn('Request reviews', 'send', 'outline', 'data-modal-open="m-req"'), btn('Export', 'dl'), btn('Reply settings', 'cog')].join(''),
  body: `${stats([
    ['Overall rating', '4.9', '+0.1', 'star', 'gold', 'From 486 reviews'],
    ['Reviews awaiting reply', '3', '', 'msg', 'brand', 'Reply within 48h'],
    ['Positive rate', '96.4%', '+1.2%', 'heart', 'service', '4★ and above'],
    ['Review requests sent', '124', '+18%', 'send', 'ink', '38% response rate']
  ])}
<div class="grid lg:grid-cols-3 gap-4 mb-4">
${card('Rating breakdown', `<div class="p-4 flex gap-5"><div class="text-center shrink-0">
<p class="text-[38px] font-extrabold leading-none">4.9</p>${stars(5, 'mt-1.5')}<p class="text-[11.5px] text-ink-400 mt-1">486 reviews</p></div>
<div class="flex-1">${[[5, 88, 428], [4, 8, 39], [3, 2, 10], [2, 1, 5], [1, 1, 4]].map(r => `<div class="flex items-center gap-2 mb-1.5"><span class="text-[11.5px] font-bold w-6">${r[0]}★</span>
<div class="bar flex-1"><i style="width:${r[1]}%;background:#ffb020"></i></div><span class="text-[11.5px] text-ink-400 w-8 text-right">${r[2]}</span></div>`).join('')}</div></div>`)}
${card('Rating by attribute', `<div class="p-4">${bars([['Product quality', 98, '4.9'], ['Value for money', 94, '4.7', '#00b894'], ['Delivery speed', 96, '4.8', '#ffb020'], ['Seller service', 100, '5.0', '#8b5cf6'], ['Description accuracy', 92, '4.6', '#6c7a91']])}</div>`)}
${card('Rating trend (6 months)', `<div class="p-4">${lineChart([4.6, 4.7, 4.7, 4.8, 4.9, 4.9], '#ffb020', 150)}
<div class="flex justify-between text-[11px] text-ink-400 px-1">${['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'].map(m => `<span>${m}</span>`).join('')}</div>
${note('Keep your rating above 4.5 to stay eligible for the Verified Pro badge.', 'service', 'shield')}</div>`)}
</div>
${tabs([['All reviews', '486'], ['Needs reply', '3'], ['5 star', '428'], ['4 star', '39'], ['1–3 star', '19'], ['With photos', '84'], ['Reported', '2'], ['Replied', '312']])}
${filterbar(['search', ['All ratings', '5 star', '4 star', '3 star', '2 star', '1 star'], ['All items', 'Products', 'Services'], ['With media: Any', 'Photo only', 'Video only'], 'date', ['Sort: Newest', 'Oldest', 'Lowest rating', 'Most helpful']],
    `${btn('Bulk reply', 'msg')}${btn('Export', 'dl')}`)}
${card('', rvw('Kamal Uddin', 'Excellent phone for the price! Battery lasts almost two days with normal use and the display is bright enough outdoors. Seller packed it very well and delivered a day earlier than promised. Original warranty card included.', 'Realme C100X 6/128GB — Green', 5, '2 days ago',
    `<div class="flex gap-2 mt-2.5">${[0, 1, 2].map(i => ph(i, 'image', 'w-16 h-16 rounded-lg')).join('')}</div>`)
  + rvw('Sadia Rahman', 'Good AC servicing work, the technician arrived on time and was polite. Only issue was that he did not bring a proper drop cloth, so I had to clean afterwards. Otherwise the cooling improved a lot.', 'AC Servicing (Split) — 2 units', 4, '4 days ago', '',
    `<div class="mt-3 ml-1 pl-3.5 border-l-2 border-brand-200"><div class="flex items-center gap-2 mb-1"><span class="avatar avatar-sm bg-brand-500 !w-6 !h-6 !text-[10px]">R</span>
<p class="text-[12.5px] font-extrabold">Rahim Electric</p><span class="badge badge-red !text-[10px]">Seller</span><span class="text-[11px] text-ink-400">3 days ago</span></div>
<p class="text-[12.5px] text-ink-600">Thank you for the honest feedback, Sadia! We have now added protective floor sheets to every technician's kit. Please call us for a free follow-up check within 30 days.</p>
<div class="flex gap-1.5 mt-2">${btn('Edit reply', 'edit', 'ghost')}${btn('Delete reply', 'trash', 'ghost')}</div></div>`)
  + rvw('Tanvir Alam', 'Delivery took 5 days instead of 2 and the box was slightly damaged. The product itself works fine but the courier handling was poor. Please use better packaging for electronics.', 'Walton Ceiling Fan 56"', 3, '1 week ago')
  + rvw('Anonymous Buyer', 'Product does not match the description at all. Requesting a refund. Do not buy.', 'Gree 1.5 Ton Inverter AC', 1, '1 week ago',
    `<div class="mt-2.5 p-2.5 rounded-xl bg-brand-50 text-[12px] text-brand-700 flex gap-2">${svg('flag', 'w-4 h-4 shrink-0 mt-0.5')}<span>You reported this review as <b>possibly fake</b> — HaatBazar moderation is reviewing it. Expected decision within 48 hours.</span></div>`,
    `<div class="flex flex-wrap gap-1.5 mt-3">${btn('View report status', 'eye', 'primary')}${btn('Add public reply', 'msg')}${btn('Offer resolution', 'gift')}</div>`)
  + tfoot(1, 4, 486))}
<div class="grid lg:grid-cols-2 gap-4 mt-4">
${card('Saved reply templates', `<div class="p-4 space-y-2.5">
${[['Thank you (5★)', 'Thank you so much for your kind words! We hope to serve you again soon.'], ['Apology (low rating)', 'We are very sorry about your experience. Our team will contact you within 24 hours to fix this.'], ['Delivery delay', 'Apologies for the delay — this was caused by courier congestion. We have shared feedback with our partner.'], ['Warranty guidance', 'Your product carries a 1-year official warranty. Please share your order ID and we will arrange service.']].map(t => `<div class="p-3 rounded-xl border border-[#e7e9ef]">
<div class="flex items-center justify-between gap-2 mb-1"><p class="text-[12.5px] font-bold">${t[0]}</p>
<div class="flex gap-1"><button class="icon-btn icon-btn-sm">${svg('copy', 'w-3.5 h-3.5')}</button><button class="icon-btn icon-btn-sm">${svg('edit', 'w-3.5 h-3.5')}</button><button class="icon-btn icon-btn-sm text-brand-600">${svg('trash', 'w-3.5 h-3.5')}</button></div></div>
<p class="text-[12px] text-ink-500">${t[1]}</p></div>`).join('')}
${btn('Add new template', 'plus', 'outline')}</div>`)}
${card('Review requests', `<div class="p-4">${mini([['124', 'Requests sent'], ['47', 'Reviews received'], ['38%', 'Response rate'], ['2.4 days', 'Avg. response time']])}
<div class="mt-3.5 space-y-2.5">${[['Auto-request after delivery', 'Send 3 days after order is delivered', true], ['Auto-request after service', 'Send 1 day after job completion', true], ['Send reminder once', 'One follow-up after 5 days', true], ['Include ৳50 voucher incentive', 'Boosts response rate by ~2×', false]].map(r => `<div class="flex items-center justify-between gap-3 py-1.5"><div><p class="text-[12.5px] font-bold">${r[0]}</p><p class="text-[11.5px] text-ink-400">${r[1]}</p></div>${sw(r[2])}</div>`).join('')}</div>
<div class="flex gap-2 mt-3">${btn('Send requests now', 'send', 'primary', 'data-modal-open="m-req"')}${btn('View history', 'clock')}</div></div>`)}
</div>
${modal('m-reply', 'Reply to review', `<div class="p-5">
<div class="p-3 rounded-xl bg-ink-50 mb-3.5"><div class="flex items-center gap-2 mb-1.5"><span class="avatar avatar-sm bg-ink-700">K</span><p class="text-[12.5px] font-bold">Kamal Uddin</p>${stars(5)}</div>
<p class="text-[12.5px] text-ink-600">Excellent phone for the price! Battery lasts almost two days…</p></div>
<label class="label">Use a template</label>${sel(['Choose a saved template…', 'Thank you (5★)', 'Apology (low rating)', 'Delivery delay', 'Warranty guidance'])}
<label class="label mt-3.5">Your public reply *</label>${ta('Write a professional, helpful reply. Never share phone numbers or external links.', '', 110)}
<p class="hint">Replies are public and cannot be deleted after 24 hours. Max 1,000 characters.</p>
<div class="flex flex-wrap gap-4 mt-3">${chk('Also send as private message', true)}${chk('Offer a voucher with this reply')}</div></div>`
    + modalFoot('Post reply', 'Reply posted publicly'))}
${modal('m-req', 'Request reviews from customers', gridForm([
    fld('Select customers', sel(['All delivered orders (last 30 days) — 184', 'Completed service jobs — 96', 'VIP customers — 308', 'Choose manually'])),
    fld('Channel', sel(['In-app + Email', 'SMS only', 'All channels'])),
    fld('Message', ta('', 'Hi {name}, thanks for choosing Rahim Electric! Could you take 30 seconds to rate your experience? It really helps our small business.', 100), 'sm:col-span-2'),
    fld('Incentive', sel(['None', '৳50 voucher on next order', 'Free delivery voucher', 'Loyalty points ×2'])),
    fld('Send at', sel(['Send now', 'Tomorrow 10:00 AM', 'Custom schedule'])),
    `<div class="sm:col-span-2">${note('You may request a review only once per order. HaatBazar policy forbids paying for positive reviews.', 'gold', 'warn')}</div>`
  ]) + modalFoot('Send requests', '184 review requests queued'))}`
}));

/* ---------------------------- MESSAGES -------------------------------- */
W('messages.html', V({
  title: 'Messages', sub: 'Chat with customers about products, orders and service enquiries.',
  active: 'messages.html', crumbs: ['Messages'],
  actions: [btn('Quick replies', 'bolt'), btn('Auto-reply settings', 'cog'), btn('New message', 'plus', 'primary')].join(''),
  body: `${stats([
    ['Unread messages', '5', '', 'msg', 'brand', '2 waiting over 1 hour'],
    ['Response rate', '96%', '+3%', 'bolt', 'service', 'Target: 90%+'],
    ['Avg. response time', '18 min', '-6 min', 'clock', 'gold', 'Chat badge active'],
    ['Chats → orders', '34%', '+4%', 'bag', 'ink', '82 orders from chat']
  ])}
${chatShell([
    ['Kamal Uddin', 'Perfect, ordering now. Thank you!', '10:22 AM', '2', 'brand', 'Order HB-884213', 'red'],
    ['Sadia Rahman', 'Is the fridge repair service available in Dhanmondi?', '9:40 AM', '1', 'service', 'Service lead', 'green'],
    ['Tanvir Alam', 'Can you share the wiring quotation again?', 'Yesterday', '', 'gold', 'Quote sent', 'amber'],
    ['Nusrat Jahan', 'Thanks for the fast delivery! ⭐⭐⭐⭐⭐', 'Yesterday', '', 'ink', 'Completed', 'green'],
    ['Imran Hossain', 'I want to cancel my order please', '2 days ago', '2', 'brand', 'Cancellation', 'red'],
    ['HaatBazar Support', 'Your payout of ৳48,200 has been processed.', '3 days ago', '', 'service', 'Official', 'blue'],
    ['Farhana Akter', 'Do you deliver to Chattogram?', '4 days ago', '', 'gold', '', ''],
    ['Rafiq Mia', 'Ceiling fan installation charge?', '5 days ago', '', 'ink', 'Service lead', 'green']
  ])}
<div class="grid lg:grid-cols-3 gap-4 mt-4">
${card('Quick reply library', `<div class="p-4 space-y-2">${[['Greeting', 'Hello! Thanks for contacting Rahim Electric. How can I help you today?'], ['In stock', 'Yes, this item is currently in stock and ready to ship.'], ['Delivery time', 'Delivery inside Dhaka takes 1–2 days, outside Dhaka 3–5 days.'], ['Warranty', 'This product comes with 1 year official warranty.'], ['Service area', 'We serve Banani, Gulshan, Baridhara, Mohakhali, Dhanmondi and Uttara.']].map(q => `<div class="flex items-center gap-2 p-2.5 rounded-xl border border-[#e7e9ef]">
<div class="min-w-0 flex-1"><p class="text-[12px] font-bold">${q[0]}</p><p class="text-[11.5px] text-ink-400 clamp-1">${q[1]}</p></div>
<button class="icon-btn icon-btn-sm">${svg('edit', 'w-3.5 h-3.5')}</button></div>`).join('')}
${btn('Add quick reply', 'plus', 'outline')}</div>`)}
${card('Auto-reply & away message', frows([
    ['Instant auto-reply', 'Send an automatic greeting when a customer messages you first.', true],
    ['Away message', 'Reply automatically outside business hours (8 PM – 9 AM).', true],
    ['Auto-share catalogue', 'Send your top 5 products when someone asks for a price list.', false],
    ['Read receipts', 'Let customers see when you have read their message.', true],
    ['Chat notifications', 'Push and email alerts for new messages.', true]
  ]))}
${card('Chat rules & safety', `<div class="p-4 space-y-2.5 text-[12.5px] text-ink-600">
${[['Never share personal phone numbers before an order is confirmed.', 'warn'], ['Do not request payment outside HaatBazar checkout.', 'ban'], ['Abusive language may result in account suspension.', 'shield'], ['All chats are stored for 12 months for dispute resolution.', 'db']].map(r => `<p class="flex gap-2">${svg(r[1], 'w-4 h-4 text-brand-600 shrink-0 mt-0.5')}${r[0]}</p>`).join('')}
${a2('Read full chat policy', 'book', '../terms.html', 'outline')}</div>`)}
</div>`
}));

/* ---------------------------- PRODUCT Q&A ----------------------------- */
W('questions.html', V({
  title: 'Product Q&A', sub: 'Answer buyer questions on your product pages — fast answers increase conversion by 28%.',
  active: 'questions.html', crumbs: ['Product Q&A'],
  actions: [btn('Answer templates', 'bolt'), btn('Export', 'dl'), btn('Q&A settings', 'cog')].join(''),
  body: `${stats([
    ['Unanswered', '9', '', 'question', 'brand', '3 older than 24h'],
    ['Answered this month', '64', '+21%', 'check', 'service', 'Avg. 4h response'],
    ['Total questions', '312', '+9%', 'msg', 'gold', 'On 248 products'],
    ['Helpful votes', '1,284', '+14%', 'heart', 'ink', 'On your answers']
  ])}
${tabs([['Unanswered', '9'], ['Answered', '303'], ['My answers', '281'], ['Flagged', '2'], ['All', '312']])}
${filterbar(['search', ['All products', 'Realme C100X', 'Gree 1.5 Ton AC', 'Walton Fan'], ['All categories', 'Electronics', 'Home appliance'], 'date', ['Sort: Newest', 'Oldest', 'Most voted']], `${btn('Bulk answer', 'msg')}${btn('Export', 'dl')}`)}
${card('', [
    ['Kamal Uddin', 'Does this phone support 45W fast charging with the in-box charger, or do I need to buy it separately?', 'Realme C100X 6/128GB', '2 hours ago', 0, 14],
    ['Sadia Rahman', 'Is the warranty valid if I buy from HaatBazar? Do I get an official warranty card?', 'Gree 1.5 Ton Inverter AC', '5 hours ago', 0, 8],
    ['Tanvir Alam', 'What is the exact blade sweep size and does it come with a regulator?', 'Walton Ceiling Fan 56"', '1 day ago', 0, 3],
    ['Nusrat Jahan', 'Can this AC be installed on the 8th floor? Do you provide installation in Gulshan?', 'Gree 1.5 Ton Inverter AC', '2 days ago', 1, 22]
  ].map(q => `<div class="p-4 border-b border-[#f0f1f5] last:border-0">
<div class="flex items-start gap-3"><span class="avatar avatar-md bg-${q[4] ? 'service' : 'brand'}-500 shrink-0">${q[0][0]}</span>
<div class="min-w-0 flex-1"><div class="flex flex-wrap items-center gap-2 mb-1"><p class="text-[13px] font-extrabold">${q[0]}</p>
${q[4] ? '<span class="badge badge-green !text-[10px]">Answered</span>' : '<span class="badge badge-red !text-[10px]">Awaiting answer</span>'}
<span class="text-[11.5px] text-ink-400 ml-auto">${q[3]}</span></div>
<p class="text-[13.5px] font-semibold text-ink-800 leading-relaxed">${q[1]}</p>
<div class="flex items-center gap-3 mt-2 text-[11.5px] text-ink-400"><span class="flex items-center gap-1">${svg('box', 'w-3.5 h-3.5')}${q[2]}</span><span class="flex items-center gap-1">${svg('up', 'w-3.5 h-3.5')}${q[5]} people want to know</span></div>
${q[4] ? `<div class="mt-3 ml-1 pl-3.5 border-l-2 border-service-200"><div class="flex items-center gap-2 mb-1"><span class="avatar avatar-sm bg-brand-500 !w-6 !h-6 !text-[10px]">R</span><p class="text-[12.5px] font-extrabold">Rahim Electric</p><span class="badge badge-red !text-[10px]">Seller</span></div>
<p class="text-[12.5px] text-ink-600">Yes, we install on all floors up to 12 storeys and Gulshan is inside our free-installation zone. Installation is complimentary with AC purchase.</p>
<div class="flex gap-1.5 mt-2">${btn('Edit answer', 'edit', 'ghost')}${btn('Delete', 'trash', 'ghost')}</div></div>`
    : `<div class="mt-3"><textarea class="textarea !min-h-[70px] !text-[12.5px]" placeholder="Write a clear, accurate answer… Avoid sharing contact details."></textarea>
<div class="flex flex-wrap gap-1.5 mt-2">${btn('Post answer', 'send', 'primary', 'data-toast="Answer published"')}${btn('Use template', 'bolt')}${btn('Ask admin', 'shield')}${btn('Report question', 'flag', 'ghost')}</div></div>`}
</div></div></div>`).join('') + tfoot(1, 4, 312))}
<div class="grid lg:grid-cols-2 gap-4 mt-4">
${card('Answer templates', `<div class="p-4 space-y-2">${[['Warranty', 'All our products carry official manufacturer warranty with a valid warranty card.'], ['Delivery', 'Inside Dhaka 1–2 days, outside Dhaka 3–5 days via Pathao/Steadfast.'], ['Installation', 'Free installation inside Dhaka within 48 hours of delivery.'], ['Stock', 'Yes, this item is in stock and ships the same day if ordered before 4 PM.']].map(t => `<div class="flex items-center gap-2 p-2.5 rounded-xl border border-[#e7e9ef]"><div class="min-w-0 flex-1"><p class="text-[12px] font-bold">${t[0]}</p><p class="text-[11.5px] text-ink-400 clamp-1">${t[1]}</p></div>
<button class="btn btn-xs btn-outline shrink-0">Use</button></div>`).join('')}${btn('Add template', 'plus', 'outline')}</div>`)}
${card('Q&A performance', `<div class="p-4">${bars([['Questions answered within 4h', 82, '82%'], ['Answer helpfulness', 91, '91%', '#00b894'], ['Questions → purchase', 28, '28%', '#ffb020'], ['Products with Q&A', 64, '158 of 248', '#8b5cf6']])}
${note('Products with at least 3 answered questions convert 28% better. 90 of your products have no Q&A yet.', 'service', 'bolt')}</div>`)}
</div>`
}));

/* --------------------------- SHIPPING --------------------------------- */
W('shipping.html', V({
  title: 'Shipping & Couriers', sub: 'Delivery zones, shipping rates, courier partners and pickup settings.',
  active: 'shipping.html', crumbs: ['Shipping'],
  actions: [btn('Print labels', 'print', 'outline', 'data-print'), btn('Request pickup', 'truck'), btn('Add shipping rule', 'plus', 'primary', 'data-modal-open="m-rate"')].join(''),
  body: `${stats([
    ['Ready to ship', '18', '', 'pkg', 'brand', 'Pack before 4 PM cut-off'],
    ['In transit', '42', '', 'truck', 'service', '3 delayed shipments'],
    ['On-time delivery', '94.2%', '+1.8%', 'clock', 'gold', 'Last 30 days'],
    ['Avg. shipping cost', tk(78), '-4%', 'money', 'ink', 'Per order']
  ])}
${tabs([['Shipping rates', ''], ['Courier partners', '4'], ['Pickup schedule', ''], ['Packaging', ''], ['Delivery performance', '']])}
<div class="grid xl:grid-cols-[1fr_340px] gap-4">
<div class="space-y-4">
${card('Shipping zones & rates', table([['Zone'], ['Coverage'], ['Courier'], ['Rate'], ['Free above'], ['Delivery time'], ['Status'], ['', 'text-right']], [
    ['<b>Dhaka City</b><p class="text-[11px] text-ink-400">Inside metro</p>', 'Dhaka North & South, 42 thanas', 'Pathao Courier', `<b>${tk(60)}</b>`, tk(1000), '1–2 days', st('Active'), actionsCell([['Edit rate', 'edit'], ['Duplicate', 'copy'], ['Disable', 'ban'], ['Delete', 'trash', 1]])],
    ['<b>Dhaka Suburb</b>', 'Savar, Keraniganj, Gazipur, Narayanganj', 'Steadfast', `<b>${tk(80)}</b>`, tk(1500), '2–3 days', st('Active'), actionsCell([['Edit rate', 'edit'], ['Duplicate', 'copy'], ['Delete', 'trash', 1]])],
    ['<b>Outside Dhaka</b>', 'All other 61 districts', 'RedX / Sundarban', `<b>${tk(130)}</b>`, tk(2500), '3–5 days', st('Active'), actionsCell([['Edit rate', 'edit'], ['Duplicate', 'copy'], ['Delete', 'trash', 1]])],
    ['<b>Heavy items</b><p class="text-[11px] text-ink-400">Over 15 kg</p>', 'Nationwide — AC, fridge, furniture', 'Sundarban Cargo', `<b>${tk(450)}</b>`, '—', '4–7 days', st('Active'), actionsCell([['Edit rate', 'edit'], ['Delete', 'trash', 1]])],
    ['<b>Same-day express</b>', 'Gulshan, Banani, Baridhara, Bashundhara', 'Own delivery', `<b>${tk(150)}</b>`, '—', 'Within 6 hours', st('Active'), actionsCell([['Edit rate', 'edit'], ['Delete', 'trash', 1]])],
    ['<b>Store pickup</b>', 'Banani outlet — House 42, Road 11', 'Self pickup', `<b>Free</b>`, '—', 'Ready in 2 hours', st('Active'), actionsCell([['Edit', 'edit'], ['Disable', 'ban']])]
  ]), btn('Add zone', 'plus', 'outline', 'data-modal-open="m-rate"'))}
${card('Courier partners', `<div class="p-4 grid sm:grid-cols-2 gap-3">
${[['Pathao Courier', 'Dhaka + 64 districts', '৳60 base', '96% on-time', 1, 'Connected'], ['Steadfast Courier', 'Nationwide', '৳70 base', '94% on-time', 1, 'Connected'], ['RedX', 'Nationwide', '৳75 base', '91% on-time', 1, 'Connected'], ['Sundarban Cargo', 'Heavy & bulk items', '৳450 base', '89% on-time', 0, 'Not connected']].map((c, i) => `<div class="p-3.5 rounded-xl border ${c[4] ? 'border-service-200 bg-service-50/40' : 'border-[#e7e9ef]'}">
<div class="flex items-start gap-2.5 mb-2.5">${ph(i, 'truck', 'w-11 h-11 rounded-lg shrink-0')}
<div class="min-w-0 flex-1"><p class="text-[13px] font-extrabold clamp-1">${c[0]}</p><p class="text-[11.5px] text-ink-400">${c[1]}</p></div>
<span class="badge badge-${c[4] ? 'green' : 'gray'} shrink-0">${c[5]}</span></div>
<div class="grid grid-cols-2 gap-2 mb-2.5">${[['Base rate', c[2]], ['Performance', c[3]]].map(k => `<div class="mini !p-2"><p class="v !text-[13px]">${k[1]}</p><p class="l">${k[0]}</p></div>`).join('')}</div>
<div class="flex gap-1.5">${c[4] ? btn('Settings', 'cog') + btn('Disconnect', 'x', 'ghost') : btn('Connect', 'plus', 'primary')}</div></div>`).join('')}</div>`)}
${card('Pickup schedule', `<div class="p-5"><div class="grid sm:grid-cols-2 gap-3.5 mb-4">
${[fld('Pickup mode', sel(['Courier picks up from my warehouse', 'I drop off at courier hub', 'Both'])), fld('Daily cut-off time', sel(['02:00 PM', '04:00 PM', '06:00 PM'])),
    fld('Pickup address', inp('', 'Warehouse 2, Tejgaon I/A, Dhaka 1208')), fld('Contact person', inp('', 'Jamal Uddin — +880 1712 345678')),
    fld('Pickup days', inp('', 'Saturday – Thursday')), fld('Preferred slot', sel(['10:00 AM – 12:00 PM', '02:00 PM – 04:00 PM', '05:00 PM – 07:00 PM']))].join('')}</div>
<div class="flex flex-wrap gap-4 mb-4">${chk('Auto-request pickup when 5+ orders are packed', true)}${chk('Send SMS when courier is on the way', true)}${chk('Weekend pickup (Friday)')}</div>
<div class="flex gap-2">${btn('Save pickup settings', 'check', 'primary', 'data-toast="Pickup settings saved"')}${btn('Request pickup now', 'truck')}</div></div>`)}
${card('Delivery performance by courier', table([['Courier'], ['Shipments'], ['On-time'], ['Delayed'], ['Lost / damaged'], ['Avg. days'], ['Rating']], [
    ['Pathao Courier', '1,842', '<b class="text-service-600">96.2%</b>', '68', '4', '1.8', stars(5)],
    ['Steadfast', '1,204', '<b class="text-service-600">94.1%</b>', '71', '6', '2.4', stars(5)],
    ['RedX', '684', '<b class="text-gold-700">91.4%</b>', '59', '9', '3.1', stars(4)],
    ['Sundarban Cargo', '148', '<b class="text-gold-700">89.2%</b>', '16', '2', '5.2', stars(4)]
  ]))}
</div>
<div class="space-y-4">
${card('Ready to ship (18)', `<div class="p-4 space-y-2.5">
${[['HB-884213', 'Realme C100X ×1', 'Pathao'], ['HB-884198', 'Walton Fan ×2', 'Steadfast'], ['HB-884176', 'Gree AC 1.5T ×1', 'Sundarban']].map((o, i) => `<div class="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#e7e9ef]">
${ph(i, 'pkg', 'w-9 h-9 rounded-lg shrink-0')}<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold">${o[0]}</p><p class="text-[11.5px] text-ink-400 clamp-1">${o[1]} · ${o[2]}</p></div>
<button class="btn btn-xs btn-primary shrink-0">${svg('print', 'w-3 h-3')}Label</button></div>`).join('')}
${a2('View all orders', 'bag', 'orders.html', 'outline')}</div>`)}
${card('Packaging & handling', `<div class="p-4 space-y-3">${kv([['Default box size', 'Medium (30×25×15 cm)'], ['Avg. package weight', '1.4 kg'], ['Fragile handling', 'Enabled'], ['Branded packaging', 'Yes — HaatBazar + own sticker'], ['Insurance', 'Auto for orders over ৳10,000']])}
<div class="pt-1">${btn('Edit packaging', 'edit', 'outline')}${btn('Order supplies', 'box', 'ghost')}</div></div>`)}
${card('Shipping settings', frows([
    ['Free shipping campaign', 'Free delivery on all orders above ৳1,000 inside Dhaka.', true],
    ['Cash on delivery', 'Accept COD (2% courier fee applies).', true],
    ['Partial COD', 'Require 20% advance for orders over ৳20,000.', true],
    ['Auto-assign courier', 'Choose the cheapest courier for each zone automatically.', true],
    ['Shipping label auto-print', 'Generate label as soon as order is confirmed.', false],
    ['Delay alerts', 'Notify me if a shipment is stuck for over 48 hours.', true]
  ]))}
${card('Delayed shipments', `<div class="p-4 space-y-2.5">
${[['HB-883012', 'Stuck at Chattogram hub · 3 days', 'RedX'], ['HB-882874', 'Address not found · 2 attempts', 'Pathao'], ['HB-882640', 'Customer unreachable', 'Steadfast']].map(d => `<div class="p-2.5 rounded-xl bg-brand-50">
<div class="flex items-center justify-between gap-2"><p class="text-[12.5px] font-bold text-brand-700">${d[0]}</p><span class="badge badge-red !text-[10px]">${d[2]}</span></div>
<p class="text-[11.5px] text-brand-600 mt-0.5">${d[1]}</p>
<div class="flex gap-1.5 mt-2">${btn('Contact courier', 'phone', 'ghost')}${btn('Call buyer', 'msg', 'ghost')}</div></div>`).join('')}</div>`)}
</div></div>
${modal('m-rate', 'Add shipping zone & rate', gridForm([
    fld('Zone name *', inp('e.g. Dhaka City')), fld('Courier partner', sel(['Pathao Courier', 'Steadfast', 'RedX', 'Sundarban Cargo', 'Own delivery'])),
    fld('Covered districts / areas', ta('Type district or area names, comma separated'), 'sm:col-span-2'),
    fld('Rate type', sel(['Flat rate', 'Weight based', 'Price based', 'Per item', 'Free'])), fld('Base rate (৳)', inp('60')),
    fld('Per extra kg (৳)', inp('20')), fld('Free shipping above (৳)', inp('1000')),
    fld('Estimated delivery', inp('1–2 business days')), fld('Max weight (kg)', inp('15')),
    `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Allow cash on delivery', true)}${chk('Allow express upgrade')}${chk('Enable this zone', true)}</div>`
  ]) + modalFoot('Save zone', 'Shipping zone added'))}`
}));



