const fs = require('fs');
const { svg, ph, stars } = require('./ui');
const L = require('./layout');
const B = require('./blocks');
const { PRODUCTS: P, SERVICES: S, pcard, scard, catTile, pager, modals } = B;
const d = false;
const W = (f, o) => fs.writeFileSync(f, L.page(o));

/* ============================== CART ============================== */
const cartItems = [
  ['Realme C100x 6/128GB — Dreamy Purple', 'Realme Official Store', '৳11,499', '৳13,999', 1, 'phoneDev', 'In stock'],
  ['Anker 20W PD Fast Charger', 'Gadget Hub BD', '৳1,290', '', 2, 'bolt', 'In stock'],
  ['Cotton Panjabi — Hand Embroidered (L)', 'Rongdhonu Fashion', '৳1,200', '৳1,500', 1, 'shirt', 'Only 3 left'],
  ['Organic Honey — 500g Sundarban', 'Khaas Food Corner', '৳550', '', 3, 'drop', 'In stock']
];
const cartBody = `
${L.crumb([{ t: 'Shopping Cart' }], d)}
<main class="shell py-6">
<div class="flex flex-wrap items-center justify-between gap-3 mb-5">
<div><h1 class="font-display text-[24px] font-extrabold tracking-tight">Shopping Cart <span class="text-ink-400 font-bold text-[16px]">(4 items)</span></h1>
<p class="text-[12.5px] text-ink-500 mt-1">Items in your cart are not reserved — check out now to secure the price.</p></div>
<a href="products.html" class="btn btn-sm btn-outline">${svg('chevL')}Continue shopping</a></div>
<div class="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-5">
<div class="min-w-0 space-y-4">
<div class="card p-3.5 flex flex-wrap items-center gap-3">
<label class="check"><input type="checkbox" checked><b>Select all (4)</b></label>
<div class="ml-auto flex gap-2"><button class="btn btn-xs btn-outline">${svg('heart')}Move to wishlist</button><button class="btn btn-xs btn-danger">${svg('trash')}Delete selected</button></div></div>

${[['Realme Official Store', 'Free delivery over ৳2,000', [0, 1]], ['Rongdhonu Fashion', 'Ships from Narayanganj', [2]], ['Khaas Food Corner', '৳60 delivery', [3]]].map(g => `
<div class="card overflow-hidden">
<div class="flex items-center gap-2.5 px-4 py-3 border-b border-[#e7e9ef] bg-ink-50/60">
<input type="checkbox" checked class="w-4 h-4 accent-brand-500">${svg('store', 'w-4 h-4 text-ink-500')}
<a href="shop-profile.html" class="text-[13px] font-extrabold hover:text-brand-600">${g[0]}</a>
<span class="badge badge-green">${svg('check')}Verified</span>
<span class="text-[11.5px] text-ink-500 hidden sm:block">· ${g[1]}</span>
<button class="btn btn-xs btn-outline ml-auto">${svg('msg')}Chat</button></div>
${g[2].map(i => { const it = cartItems[i]; return `
<div class="flex gap-3 p-4 border-b border-[#f0f1f5] last:border-0">
<input type="checkbox" checked class="w-4 h-4 accent-brand-500 mt-1 shrink-0">
${ph(i, it[5], 'w-[86px] h-[86px] rounded-xl shrink-0')}
<div class="flex-1 min-w-0">
<a href="product-details.html" class="text-[13.5px] font-semibold hover:text-brand-600 clamp-2">${it[0]}</a>
<p class="text-[11.5px] text-ink-400 mt-1">Sold by ${it[1]} · ${it[6]}</p>
<div class="flex items-center gap-2 mt-1.5"><span class="price !text-[16px]">${it[2]}</span>${it[3] ? `<span class="price-old">${it[3]}</span>` : ''}</div>
<div class="flex flex-wrap items-center gap-2 mt-2.5">
<div class="flex items-center border border-[#e7e9ef] rounded-lg h-8"><button class="w-8 h-full grid place-items-center hover:bg-ink-50">${svg('minus', 'w-3.5 h-3.5')}</button><input class="w-9 text-center text-[13px] font-bold" value="${it[4]}"><button class="w-8 h-full grid place-items-center hover:bg-ink-50">${svg('plus', 'w-3.5 h-3.5')}</button></div>
<button class="btn btn-xs btn-ghost">${svg('heart')}Save</button>
<button class="btn btn-xs btn-ghost !text-ink-400">${svg('trash')}Remove</button>
<button class="btn btn-xs btn-ghost">${svg('refresh')}Change variant</button></div></div></div>`; }).join('')}
</div>`).join('')}

<div class="card p-4"><p class="text-[13px] font-extrabold mb-3">Frequently bought with your cart</p>
<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">${P.slice(3, 7).map((p, i) => pcard(p, i + 3, d, { hideCta: true })).join('')}</div></div>

<div class="card p-4 flex flex-col sm:flex-row items-center gap-3 bg-service-50/50 border-service-100">
<span class="w-11 h-11 rounded-xl bg-white text-service-600 grid place-items-center shrink-0">${svg('wrench', 'w-5 h-5')}</span>
<div class="flex-1 min-w-0 text-center sm:text-left"><p class="text-[13.5px] font-extrabold">Need installation for these items?</p><p class="text-[12px] text-ink-500">Add a verified technician visit — pay after the job is done.</p></div>
<a href="services.html" class="btn btn-sm btn-service shrink-0">Add a service</a></div>
</div>

<aside class="lg:w-[360px] shrink-0 space-y-4">
<div class="card p-4 sticky-24">
<h2 class="text-[15px] font-extrabold mb-3">Order summary</h2>
<div class="space-y-2 text-[13px] mb-3">
${[['Subtotal (4 items)', '৳16,829'], ['Item discount', '- ৳2,800'], ['Coupon (SAVE300)', '- ৳300'], ['Delivery fee', '৳120'], ['VAT (included)', '৳0']].map(r => `<div class="flex justify-between"><span class="text-ink-500">${r[0]}</span><b class="${r[1].startsWith('-') ? 'text-green-700' : ''}">${r[1]}</b></div>`).join('')}</div>
<div class="dotted-sep my-3"></div>
<div class="flex justify-between items-end mb-1"><span class="text-[14px] font-extrabold">Total</span><span class="font-display text-[24px] font-extrabold text-brand-600">৳13,849</span></div>
<p class="text-[11.5px] text-green-700 font-bold mb-3">You saved ৳3,100 on this order 🎉</p>
<div class="flex gap-2 mb-3"><input class="input input-sm" placeholder="Enter voucher code"><button class="btn btn-sm btn-dark shrink-0">Apply</button></div>
<button class="btn btn-xs btn-outline btn-block mb-3" data-modal-open="couponModal">${svg('ticket')}View 12 available coupons</button>
<a href="checkout.html" class="btn btn-lg btn-primary btn-block mb-2">Proceed to checkout ${svg('chevR')}</a>
<p class="text-[11.5px] text-ink-400 text-center mb-3">Secure checkout · SSL encrypted</p>
<div class="flex flex-wrap gap-1.5 justify-center">${['bKash', 'Nagad', 'Rocket', 'Visa', 'Mastercard', 'COD'].map(x => `<span class="badge badge-gray">${x}</span>`).join('')}</div>
<div class="dotted-sep my-4"></div>
<div class="space-y-2.5 text-[12px]">${[['shield', 'Buyer protection on every order'], ['return', '7-day easy return policy'], ['truck', 'Delivery to all 64 districts'], ['phone', '24/7 customer support']].map(x => `<p class="flex items-center gap-2.5">${svg(x[0], 'w-4 h-4 text-brand-500')}<span class="text-ink-600">${x[1]}</span></p>`).join('')}</div>
</div></aside></div></main>
<div class="modal" id="couponModal"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel is-narrow">
<div class="flex items-center justify-between p-5 border-b border-[#e7e9ef]"><h3 class="font-display text-[17px] font-extrabold">Available coupons</h3><button class="icon-btn" data-modal-close>${svg('x', 'w-5 h-5')}</button></div>
<div class="p-5 space-y-2.5">${[['SAVE300', '৳300 off on orders above ৳5,000', 'Expires 31 Aug'], ['BKASH10', '10% cashback with bKash, max ৳200', 'Expires 25 Aug'], ['FREESHIP', 'Free delivery inside Dhaka', 'Expires 20 Aug'], ['NEW500', '৳500 off for first order', 'New users only']].map((c, i) => `<div class="flex items-center gap-3 p-3 rounded-xl border border-dashed ${i === 0 ? 'border-brand-300 bg-brand-50/50' : 'border-[#e7e9ef]'}">
<div class="flex-1 min-w-0"><p class="text-[13px] font-extrabold mono">${c[0]}</p><p class="text-[12px] text-ink-500">${c[1]}</p><p class="text-[11px] text-ink-400 mt-0.5">${c[2]}</p></div>
<button class="btn btn-xs ${i === 0 ? 'btn-outline' : 'btn-primary'}" data-modal-close>${i === 0 ? 'Applied' : 'Apply'}</button></div>`).join('')}</div></div></div>
${modals(d)}`;
W('cart.html', { title: 'Shopping Cart', body: cartBody });

/* ============================== CHECKOUT ============================== */
const checkoutBody = `
<main class="shell py-6">
<div class="mb-6"><h1 class="font-display text-[24px] font-extrabold tracking-tight mb-4">Checkout</h1>
<div class="steps max-w-2xl"><span class="step is-done"><span class="num">${svg('check', 'w-3.5 h-3.5')}</span>Cart</span><span class="step-line"></span>
<span class="step is-current"><span class="num">2</span>Address &amp; payment</span><span class="step-line"></span>
<span class="step"><span class="num">3</span>Review</span><span class="step-line"></span><span class="step"><span class="num">4</span>Done</span></div></div>
<div class="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-5">
<div class="min-w-0 space-y-4">
<div class="card p-4 sm:p-5">
<div class="flex items-center justify-between mb-3"><h2 class="text-[15px] font-extrabold flex items-center gap-2">${svg('pin', 'w-4 h-4 text-brand-500')}Delivery address</h2><button class="btn btn-xs btn-outline" data-modal-open="addrModal">${svg('plus')}Add new address</button></div>
<div class="grid sm:grid-cols-2 gap-3">
${[['Home', 'Nusrat Ahmed', '+880 1712-345678', 'Flat 5B, House 27, Road 11, Dhanmondi, Dhaka 1209', 1], ['Office', 'Nusrat Ahmed', '+880 1912-887766', 'Level 8, Rangs Babylonia, 246 Bir Uttam Mir Shawkat Sarak, Tejgaon, Dhaka 1208', 0]].map(a => `
<label class="p-4 rounded-xl border ${a[4] ? 'border-brand-400 ring-2 ring-brand-100 bg-brand-50/30' : 'border-[#e7e9ef]'} cursor-pointer block">
<div class="flex items-start gap-2.5"><input type="radio" name="addr" ${a[4] ? 'checked' : ''} class="mt-1 accent-brand-500">
<div class="min-w-0"><div class="flex items-center gap-2 mb-1"><span class="badge ${a[4] ? 'badge-brand' : 'badge-gray'}">${a[0]}</span>${a[4] ? '<span class="badge badge-green">Default</span>' : ''}</div>
<p class="text-[13px] font-bold">${a[1]}</p><p class="text-[12.5px] text-ink-500">${a[2]}</p><p class="text-[12.5px] text-ink-600 mt-1">${a[3]}</p>
<div class="flex gap-3 mt-2 text-[12px] font-bold"><button class="link">Edit</button><button class="link-muted">Delete</button></div></div></div></label>`).join('')}</div>
<div class="mt-4 grid sm:grid-cols-2 gap-3">
<div><label class="label">Delivery instructions (optional)</label><input class="input" placeholder="e.g. Call before arriving, leave with guard"></div>
<div><label class="label">Alternate contact number</label><div class="input-affix"><span class="affix">+880</span><input class="input" placeholder="1XXXXXXXXX"></div></div></div>
</div>

<div class="card p-4 sm:p-5"><h2 class="text-[15px] font-extrabold flex items-center gap-2 mb-3">${svg('truck', 'w-4 h-4 text-brand-500')}Shipment 1 of 3 — Realme Official Store</h2>
<div class="flex gap-3 mb-4">${[0, 1].map(i => `<div class="flex gap-2.5 items-center p-2.5 rounded-xl bg-ink-50 flex-1 min-w-0">${ph(i, i ? 'bolt' : 'phoneDev', 'w-12 h-12 rounded-lg')}<div class="min-w-0"><p class="text-[12.5px] font-semibold clamp-2">${cartItems[i][0]}</p><p class="text-[11.5px] text-ink-500">Qty ${cartItems[i][4]} · ${cartItems[i][2]}</p></div></div>`).join('')}</div>
<div class="space-y-2">${[['Express delivery', 'Today, before 10 PM', '৳120', 1], ['Standard delivery', 'Wed 19 Aug – Thu 20 Aug', '৳60', 0], ['Store pickup', 'Ready in 2 hours · Mirpur 10', 'Free', 0]].map(o => `
<label class="flex items-center gap-3 p-3.5 rounded-xl border ${o[3] ? 'border-brand-400 bg-brand-50/30' : 'border-[#e7e9ef]'} cursor-pointer">
<input type="radio" name="ship1" ${o[3] ? 'checked' : ''} class="accent-brand-500">
<div class="flex-1 min-w-0"><p class="text-[13px] font-bold">${o[0]}</p><p class="text-[12px] text-ink-500">${o[1]}</p></div>
<b class="text-[13px] ${o[2] === 'Free' ? 'text-green-700' : ''}">${o[2]}</b></label>`).join('')}</div></div>

<div class="card p-4 sm:p-5"><h2 class="text-[15px] font-extrabold flex items-center gap-2 mb-3">${svg('wallet', 'w-4 h-4 text-brand-500')}Payment method</h2>
<div class="grid sm:grid-cols-2 gap-2.5">
${[['bKash', 'Pay from your bKash wallet · 10% cashback', 1], ['Nagad', 'Instant payment from Nagad account', 0], ['Rocket', 'DBBL mobile banking', 0], ['Card', 'Visa, Mastercard, AMEX — 3D secure', 0], ['Cash on delivery', 'Pay ৳13,849 when the parcel arrives', 0], ['Bank transfer', 'City Bank / BRAC / DBBL', 0], ['EMI', '0% EMI on 12 banks — from ৳1,154/mo', 0], ['HaatBazar wallet', 'Balance ৳2,340', 0]].map(p => `
<label class="flex items-center gap-3 p-3.5 rounded-xl border ${p[2] ? 'border-brand-400 bg-brand-50/30' : 'border-[#e7e9ef]'} cursor-pointer">
<input type="radio" name="pay" ${p[2] ? 'checked' : ''} class="accent-brand-500">
<span class="w-10 h-7 rounded bg-ink-100 grid place-items-center text-[9.5px] font-extrabold text-ink-600 shrink-0">${p[0].slice(0, 6)}</span>
<div class="min-w-0"><p class="text-[13px] font-bold">${p[0]}</p><p class="text-[11.5px] text-ink-500 clamp-1">${p[1]}</p></div></label>`).join('')}</div>
<div class="mt-4 p-4 rounded-xl bg-ink-50">
<p class="text-[12.5px] font-extrabold mb-2.5">bKash payment details</p>
<div class="grid sm:grid-cols-2 gap-3"><div><label class="label">bKash account number</label><div class="input-affix"><span class="affix">+880</span><input class="input" placeholder="1XXXXXXXXX"></div></div>
<div><label class="label">Save this number</label><label class="check h-11 items-center"><input type="checkbox" checked>Save for faster checkout next time</label></div></div>
<p class="hint">You will be redirected to the secure bKash page to enter your PIN.</p></div></div>

<div class="card p-4 sm:p-5"><h2 class="text-[15px] font-extrabold flex items-center gap-2 mb-3">${svg('file', 'w-4 h-4 text-brand-500')}Invoice &amp; extras</h2>
<div class="grid sm:grid-cols-2 gap-3">
<div><label class="label">Invoice type</label><select class="select"><option>Personal invoice</option><option>Business invoice (with BIN)</option></select></div>
<div><label class="label">Company BIN / VAT number</label><input class="input" placeholder="Optional"></div></div>
<div class="space-y-2 mt-3"><label class="check"><input type="checkbox">This is a gift — hide prices on the invoice</label>
<label class="check"><input type="checkbox">Add gift wrapping (+৳80)</label>
<label class="check"><input type="checkbox" checked>Send order updates by SMS and email</label></div>
<div class="mt-3"><label class="label">Gift message</label><textarea class="textarea !min-h-[70px]" placeholder="Write a short note to be printed on the gift card…"></textarea></div></div>
</div>

<aside class="lg:w-[360px] shrink-0 space-y-4">
<div class="card p-4 sticky-24">
<h2 class="text-[15px] font-extrabold mb-3">Order summary</h2>
<div class="space-y-2.5 max-h-[190px] overflow-auto thin-scroll pr-1 mb-3">${cartItems.map((it, i) => `<div class="flex gap-2.5">${ph(i, it[5], 'w-11 h-11 rounded-lg shrink-0')}<div class="min-w-0 flex-1"><p class="text-[12px] font-semibold clamp-1">${it[0]}</p><p class="text-[11px] text-ink-400">Qty ${it[4]}</p></div><span class="text-[12.5px] font-extrabold">${it[2]}</span></div>`).join('')}</div>
<div class="dotted-sep my-3"></div>
<div class="space-y-2 text-[13px] mb-3">${[['Subtotal', '৳16,829'], ['Discount', '- ৳2,800'], ['Coupon SAVE300', '- ৳300'], ['Delivery (3 shipments)', '৳240'], ['Gift wrap', '৳0']].map(r => `<div class="flex justify-between"><span class="text-ink-500">${r[0]}</span><b class="${r[1].startsWith('-') ? 'text-green-700' : ''}">${r[1]}</b></div>`).join('')}</div>
<div class="dotted-sep my-3"></div>
<div class="flex justify-between items-end mb-4"><span class="text-[14px] font-extrabold">Total payable</span><span class="font-display text-[24px] font-extrabold text-brand-600">৳13,969</span></div>
<label class="check mb-3"><input type="checkbox" checked>I have read and agree to the <a href="terms.html" class="link">Terms of Service</a> and <a href="privacy-policy.html" class="link">Privacy Policy</a>.</label>
<a href="order-success.html" class="btn btn-lg btn-primary btn-block">${svg('lock')}Place order · ৳13,969</a>
<p class="text-[11.5px] text-ink-400 text-center mt-2.5">Your payment information is encrypted and never stored on our servers.</p></div></aside></div></main>
<div class="modal" id="addrModal"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">
<div class="flex items-center justify-between p-5 border-b border-[#e7e9ef]"><h3 class="font-display text-[17px] font-extrabold">Add a new address</h3><button class="icon-btn" data-modal-close>${svg('x', 'w-5 h-5')}</button></div>
<div class="p-5 grid sm:grid-cols-2 gap-4">
<div><label class="label">Full name <span class="req">*</span></label><input class="input" placeholder="Your name"></div>
<div><label class="label">Mobile number <span class="req">*</span></label><div class="input-affix"><span class="affix">+880</span><input class="input" placeholder="1XXXXXXXXX"></div></div>
<div><label class="label">Division <span class="req">*</span></label><select class="select"><option>Dhaka</option><option>Chattogram</option><option>Khulna</option><option>Rajshahi</option><option>Sylhet</option><option>Barishal</option><option>Rangpur</option><option>Mymensingh</option></select></div>
<div><label class="label">District <span class="req">*</span></label><select class="select"><option>Dhaka</option><option>Gazipur</option><option>Narayanganj</option></select></div>
<div><label class="label">Area / Thana <span class="req">*</span></label><select class="select"><option>Dhanmondi</option><option>Gulshan</option><option>Mirpur</option><option>Uttara</option></select></div>
<div><label class="label">Post code</label><input class="input" placeholder="1209"></div>
<div class="sm:col-span-2"><label class="label">Full address <span class="req">*</span></label><textarea class="textarea !min-h-[80px]" placeholder="House, road, flat, landmark…"></textarea></div>
<div class="sm:col-span-2"><label class="label">Address label</label><div class="flex gap-2">${['Home', 'Office', 'Other'].map((x, i) => `<button class="chip ${i === 0 ? 'is-active' : ''}">${x}</button>`).join('')}</div></div>
<div class="sm:col-span-2"><div class="rounded-xl overflow-hidden border border-[#e7e9ef]">${ph(9, 'pin', 'h-[150px] w-full')}</div><p class="hint">Drag the pin to your exact location for faster delivery.</p></div>
<div class="sm:col-span-2"><label class="check"><input type="checkbox" checked>Set as default delivery address</label></div>
<div class="sm:col-span-2 flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Address saved">Save address</button></div></div></div></div>
${modals(d)}`;
W('checkout.html', { title: 'Checkout', body: checkoutBody });

/* ============================== ORDER SUCCESS ============================== */
const successBody = `
<main class="shell py-8 max-w-3xl">
<div class="card p-6 sm:p-8 text-center mb-5">
<span class="w-16 h-16 rounded-full bg-green-50 text-green-600 grid place-items-center mx-auto mb-4">${svg('check', 'w-8 h-8', '2.5')}</span>
<h1 class="font-display text-[26px] font-extrabold tracking-tight mb-2">Thank you! Your order is confirmed</h1>
<p class="text-[13.5px] text-ink-500 mb-5">A confirmation has been sent to <b class="text-ink-800">nusrat.ahmed@email.com</b> and <b class="text-ink-800">+880 1712-345678</b>.</p>
<div class="grid sm:grid-cols-3 gap-3 mb-6 text-left">
${[['Order number', 'HB-2026-884213'], ['Payment', 'bKash · ৳13,969 paid'], ['Estimated delivery', 'Wed, 19 Aug 2026']].map(x => `<div class="p-3.5 rounded-xl bg-ink-50"><p class="text-[11.5px] text-ink-500 mb-0.5">${x[0]}</p><p class="text-[13.5px] font-extrabold">${x[1]}</p></div>`).join('')}</div>
<div class="flex flex-wrap justify-center gap-2">
<a href="track-order.html" class="btn btn-primary">${svg('route')}Track my order</a>
<a href="user/orders.html" class="btn btn-outline">${svg('box')}View order details</a>
<button class="btn btn-outline">${svg('print')}Print receipt</button>
<a href="index.html" class="btn btn-ghost">Continue shopping</a></div></div>

<div class="card p-5 mb-5"><h2 class="text-[15px] font-extrabold mb-3">What happens next</h2>
<div class="timeline">${[['Order placed', 'Just now — we received your order', 'is-done'], ['Seller confirmation', 'Within 2 hours — sellers accept and pack', 'is-active'], ['Handover to courier', 'Today evening', ''], ['Out for delivery', 'Wed, 19 Aug, morning', ''], ['Delivered', 'Wed, 19 Aug, before 10 PM', '']].map(t => `<div class="tl-item ${t[2]}"><p class="text-[13.5px] font-extrabold">${t[0]}</p><p class="text-[12.5px] text-ink-500">${t[1]}</p></div>`).join('')}</div></div>

<div class="card p-5 mb-5"><h2 class="text-[15px] font-extrabold mb-3">Items in this order (3 shipments)</h2>
<div class="space-y-3">${cartItems.map((it, i) => `<div class="flex gap-3 items-center">${ph(i, it[5], 'w-14 h-14 rounded-lg shrink-0')}<div class="flex-1 min-w-0"><p class="text-[13px] font-semibold clamp-1">${it[0]}</p><p class="text-[11.5px] text-ink-500">${it[1]} · Qty ${it[4]}</p></div><span class="text-[13px] font-extrabold">${it[2]}</span></div>`).join('')}</div>
<div class="dotted-sep my-4"></div>
<div class="flex justify-between text-[15px] font-extrabold"><span>Total paid</span><span class="text-brand-600">৳13,969</span></div></div>

<div class="card p-5"><h2 class="text-[15px] font-extrabold mb-3">You may also like</h2>
<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">${P.slice(6, 10).map((p, i) => pcard(p, i + 6, d, { hideCta: true })).join('')}</div></div>
</main>${modals(d)}`;
W('order-success.html', { title: 'Order Confirmed', body: successBody });

/* ============================== TRACK ORDER ============================== */
const trackBody = `
${L.crumb([{ t: 'Track Order' }], d)}
<main class="shell py-6 max-w-4xl">
<h1 class="font-display text-[24px] font-extrabold tracking-tight mb-1">Track your order</h1>
<p class="text-[13px] text-ink-500 mb-5">Enter your order number and phone to see live status — no login required.</p>
<div class="card p-4 sm:p-5 mb-5"><div class="grid sm:grid-cols-[1fr_1fr_auto] gap-3">
<div><label class="label">Order number</label><input class="input" value="HB-2026-884213"></div>
<div><label class="label">Mobile number</label><div class="input-affix"><span class="affix">+880</span><input class="input" value="1712-345678"></div></div>
<div class="flex items-end"><button class="btn btn-primary">${svg('search')}Track</button></div></div></div>

<div class="card p-4 sm:p-5 mb-5">
<div class="flex flex-wrap items-center justify-between gap-3 mb-4">
<div><p class="text-[12px] text-ink-500">Order HB-2026-884213 · placed 17 Aug 2026, 8:42 PM</p><p class="font-display text-[18px] font-extrabold">Shipment 1 of 3 — Realme Official Store</p></div>
<span class="badge badge-blue">${svg('truck')}Out for delivery</span></div>
<div class="grid sm:grid-cols-4 gap-2 mb-5">${[['Confirmed', '17 Aug'], ['Packed', '17 Aug'], ['Shipped', '18 Aug'], ['Delivery', 'Today']].map((s, i) => `<div class="p-3 rounded-xl ${i < 3 ? 'bg-green-50' : 'bg-brand-50'} text-center"><span class="w-8 h-8 rounded-full ${i < 3 ? 'bg-green-600' : 'bg-brand-500'} text-white grid place-items-center mx-auto mb-1.5">${svg(i < 3 ? 'check' : 'truck', 'w-4 h-4')}</span><p class="text-[12.5px] font-extrabold">${s[0]}</p><p class="text-[11px] text-ink-500">${s[1]}</p></div>`).join('')}</div>
<div class="rounded-xl overflow-hidden border border-[#e7e9ef] mb-4">${ph(9, 'route', 'h-[180px] w-full')}</div>
<div class="grid sm:grid-cols-3 gap-3 mb-5">${[['Courier', 'HaatBazar Express'], ['Tracking ID', 'HBX-77120934'], ['Rider', 'Jamal U. · +880 1799-112233']].map(x => `<div class="p-3 rounded-xl bg-ink-50"><p class="text-[11.5px] text-ink-500">${x[0]}</p><p class="text-[13px] font-extrabold">${x[1]}</p></div>`).join('')}</div>
<h3 class="text-[14px] font-extrabold mb-3">Tracking history</h3>
<div class="timeline">${[['Out for delivery — Dhanmondi hub', 'Today, 9:15 AM', 'is-active'], ['Arrived at Dhanmondi hub', 'Today, 6:40 AM', 'is-done'], ['Departed from Tejgaon sorting centre', 'Yesterday, 11:20 PM', 'is-done'], ['Parcel received by courier', 'Yesterday, 6:05 PM', 'is-done'], ['Seller packed the item', '17 Aug, 10:30 PM', 'is-done'], ['Order confirmed', '17 Aug, 8:42 PM', 'is-done']].map(t => `<div class="tl-item ${t[2]}"><p class="text-[13.5px] font-extrabold">${t[0]}</p><p class="text-[12px] text-ink-500">${t[1]}</p></div>`).join('')}</div>
<div class="flex flex-wrap gap-2 mt-4"><button class="btn btn-sm btn-outline">${svg('phone')}Call rider</button><button class="btn btn-sm btn-outline">${svg('msg')}Chat with support</button><button class="btn btn-sm btn-outline">${svg('cal')}Reschedule delivery</button><button class="btn btn-sm btn-danger">${svg('x')}Cancel shipment</button></div></div>

<div class="card p-4 sm:p-5"><h2 class="text-[15px] font-extrabold mb-3">Other shipments in this order</h2>
<div class="space-y-2.5">${[['Shipment 2 — Rongdhonu Fashion', 'Packed · ships tomorrow', 'badge-amber'], ['Shipment 3 — Khaas Food Corner', 'Confirmed · awaiting pickup', 'badge-gray']].map(s => `<div class="flex items-center gap-3 p-3.5 rounded-xl border border-[#e7e9ef]"><span class="w-9 h-9 rounded-lg bg-ink-50 grid place-items-center shrink-0">${svg('box', 'w-4 h-4')}</span><div class="flex-1 min-w-0"><p class="text-[13px] font-bold clamp-1">${s[0]}</p><p class="text-[12px] text-ink-500">${s[1]}</p></div><span class="badge ${s[2]}">Track</span></div>`).join('')}</div></div>
</main>${modals(d)}`;
W('track-order.html', { title: 'Track Order', body: trackBody });

/* ============================== COMPARE ============================== */
const cmpRows = [['Price', ['৳11,499', '৳12,999', '৳13,499', '৳9,999']], ['Rating', ['4.6 (1,240)', '4.5 (890)', '4.4 (410)', '4.1 (2,100)']], ['Display', ['6.8" 90Hz HD+', '6.74" 90Hz HD+', '6.56" 90Hz HD+', '6.5" 60Hz HD+']], ['Processor', ['Unisoc T612', 'Helio G85', 'Helio G88', 'Unisoc T606']], ['RAM / Storage', ['6 / 128 GB', '6 / 128 GB', '8 / 256 GB', '4 / 64 GB']], ['Battery', ['8000 mAh', '5000 mAh', '5000 mAh', '5000 mAh']], ['Charging', ['45W', '18W', '18W', '10W']], ['Rear camera', ['50 MP + 2 MP', '50 MP + 2 MP', '50 MP + 2 MP', '13 MP']], ['Front camera', ['8 MP', '8 MP', '8 MP', '5 MP']], ['Network', ['4G LTE', '4G LTE', '4G LTE', '4G LTE']], ['Warranty', ['2 years', '1 year', '1 year', '1 year']], ['Delivery', ['Free · today', '৳60 · 2 days', '৳60 · 3 days', 'Free · 2 days']], ['Seller', ['Realme Official', 'Gadget Hub BD', 'Tech Zone', 'Walton Plaza']]];
const compareBody = `
${L.crumb([{ t: 'Compare Products' }], d)}
<main class="shell py-6">
<div class="flex flex-wrap items-center justify-between gap-3 mb-4">
<div><h1 class="font-display text-[24px] font-extrabold tracking-tight">Compare products</h1><p class="text-[12.5px] text-ink-500 mt-1">4 of 4 slots used · add up to 4 items</p></div>
<div class="flex gap-2"><label class="check"><input type="checkbox" checked>Highlight differences</label><button class="btn btn-sm btn-outline">${svg('trash')}Clear all</button><button class="btn btn-sm btn-outline">${svg('share')}Share comparison</button></div></div>
<div class="card overflow-hidden"><div class="tbl-wrap"><table class="tbl">
<thead><tr><th class="w-[170px]">Specification</th>${['Realme C100x', 'Redmi 13C', 'Infinix Hot 40i', 'Walton Primo NF5'].map((n, i) => `<th class="min-w-[190px]"><div class="py-2">${ph(i, 'phoneDev', 'w-full h-[110px] rounded-xl mb-2')}<p class="text-[13px] font-extrabold text-ink-900 normal-case tracking-normal clamp-2">${n}</p>
<div class="flex gap-1.5 mt-2"><a href="cart.html" class="btn btn-xs btn-primary flex-1">${svg('cart')}Add</a><button class="btn btn-xs btn-outline">${svg('x')}</button></div></div></th>`).join('')}</tr></thead>
<tbody>${cmpRows.map(r => `<tr><td class="font-extrabold text-ink-800">${r[0]}</td>${r[1].map((v, i) => `<td class="${r[0] === 'Price' ? 'text-brand-600 font-extrabold text-[15px]' : ''}">${v}</td>`).join('')}</tr>`).join('')}
<tr><td class="font-extrabold text-ink-800">Verdict</td>${['Best battery &amp; value', 'Balanced all-rounder', 'Most storage', 'Cheapest option'].map(v => `<td><span class="badge badge-brand">${v}</span></td>`).join('')}</tr></tbody></table></div></div>
<div class="card p-5 mt-5"><h2 class="text-[15px] font-extrabold mb-3">Add another product to compare</h2>
<div class="input-group max-w-md mb-4">${svg('search')}<input class="input" placeholder="Search products to add…"></div>
<div class="grid grid-cols-2 sm:grid-cols-5 gap-3">${P.slice(0, 5).map((p, i) => pcard(p, i, d, { hideCta: true })).join('')}</div></div>
</main>${modals(d)}`;
W('compare.html', { title: 'Compare Products', body: compareBody });
console.log('cart, checkout, order-success, track-order, compare');
