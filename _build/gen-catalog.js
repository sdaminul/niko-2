const fs = require('fs');
const { svg, tk, ph, stars } = require('./ui');
const L = require('./layout');
const B = require('./blocks');
const { PRODUCTS: P, SERVICES: S, pcard, scard, filterSidebar, pager, modals } = B;
const d = false;

/* ========================= PRODUCT LIST ========================= */
const listToolbar = (mode) => `<div class="card p-3 mb-4 flex flex-wrap items-center gap-2">
<button class="btn btn-sm btn-outline lg:hidden" data-drawer-open="filterDrawer">${svg('filter')}Filters <span class="badge badge-brand ml-1">3</span></button>
<span class="hidden sm:block text-[12.5px] text-ink-500">Sort by</span>
<div class="flex flex-wrap gap-1.5">${(mode==='p'?['Best match','Popularity','Newest','Price: low → high','Price: high → low','Top rated','Best selling']:['Relevance','Highest rated','Nearest first','Most reviewed','Newest listing','Price: low → high']).map((x,i)=>`<button class="chip ${i===0?'is-active':''}">${x}</button>`).join('')}</div>
<div class="ml-auto flex items-center gap-2">
<label class="check hidden sm:flex"><input type="checkbox">${mode==='p'?'Free delivery only':'Open now only'}</label>
<div class="seg"><button class="is-active" aria-label="Grid view">${svg('grid','w-4 h-4')}</button><button aria-label="List view">${svg('list','w-4 h-4')}</button></div></div></div>`;

const chipsRow = (items) => `<div class="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-1">${items.map((x,i)=>`<button class="chip ${i===0?'is-active':''}">${x}</button>`).join('')}</div>`;

const filterDrawer = (mode) => `<div class="drawer" id="filterDrawer"><div class="drawer-backdrop" data-drawer-close></div><div class="drawer-panel">
<div class="flex items-center justify-between p-4 border-b border-[#e7e9ef]"><span class="font-display text-[16px] font-extrabold">Filters</span><button class="icon-btn" data-drawer-close>${svg('x','w-5 h-5')}</button></div>
<div class="flex-1 overflow-y-auto p-4 space-y-5">
${(mode==='p'?[['Category',['Smartphones','Tablets','Smart Watches','Accessories']],['Brand',['Samsung','Xiaomi','Realme','Walton','Vivo']],['Price',['Under ৳5,000','৳5,000–15,000','৳15,000–30,000','৳30,000+']],['Delivery',['Free delivery','Express','Cash on delivery']],['Ratings',['4★ & up','3★ & up']],['Seller',['Mall store','Verified seller','Local shop']]]
:[['Category',['Electricians','Plumbers','AC Service','Painters']],['Distance',['Within 1 km','Within 3 km','Within 5 km','Within 10 km']],['Availability',['Open now','Open 24 hours','Weekend available']],['Budget',['Under ৳1,000','৳1,000–5,000','৳5,000+']],['Ratings',['4★ & up','3★ & up']],['Mode',['At my home','At their place','Online']]])
.map(g=>`<div><p class="text-[13px] font-extrabold mb-2">${g[0]}</p><div class="space-y-2 text-[13px]">${g[1].map(x=>`<label class="check"><input type="checkbox">${x}</label>`).join('')}</div></div>`).join('')}</div>
<div class="p-4 border-t border-[#e7e9ef] flex gap-2"><button class="btn btn-outline flex-1" data-drawer-close>Reset</button><button class="btn btn-primary flex-1" data-drawer-close>Show 12,841 results</button></div></div></div>`;

const productsBody = `
${L.crumb([{t:'Electronics & Gadgets',h:'categories.html'},{t:'Mobile & Tablets',h:'products.html'},{t:'Smartphones'}],d)}
<main class="shell py-5">
<div class="card p-4 sm:p-5 mb-4 flex flex-col md:flex-row gap-4 md:items-center">
<div class="flex-1"><h1 class="font-display text-[22px] sm:text-[26px] font-extrabold tracking-tight mb-1.5">Smartphones in Bangladesh</h1>
<p class="text-[13px] text-ink-500">12,841 results found for <b class="text-ink-900">“Smartphones”</b> · prices from ৳1,190 to ৳2,45,000 · updated 12 minutes ago</p>
<div class="flex flex-wrap gap-3 mt-3 text-[12px] text-ink-500">
${[['truck','Free delivery on 6,120 items'],['shield','2,915 with official warranty'],['money','EMI available on 1,208 items'],['store','From 940 verified sellers']].map(x=>`<span class="flex items-center gap-1.5">${svg(x[0],'w-4 h-4 text-brand-500')}${x[1]}</span>`).join('')}</div></div>
<div class="flex gap-2 shrink-0"><button class="btn btn-outline btn-sm" data-toast="Search saved">${svg('bell')}Save this search</button><button class="btn btn-outline btn-sm">${svg('share')}Share</button></div></div>
${chipsRow(['All smartphones','Under ৳10,000','৳10k–20k','5G phones','Gaming phones','Big battery','Best camera','Official warranty','EMI available','Refurbished'])}
<div class="flex gap-5">
${filterSidebar(d,'product')}
<div class="flex-1 min-w-0">
${listToolbar('p')}
<div class="rounded-2xl overflow-hidden ph ph-a p-5 mb-4 flex flex-wrap items-center gap-4 text-white">
<div class="relative z-10 flex-1 min-w-[220px]"><span class="badge !bg-white/20 !text-white mb-1.5">Sponsored</span><p class="font-display text-[18px] font-extrabold">Redmi Note 13 series — from ৳18,999</p><p class="text-[12.5px] text-white/80">Official Xiaomi store · 2 years warranty · free delivery</p></div>
<a href="product-details.html" class="relative z-10 btn !bg-white !text-ink-950">Shop now ${svg('chevR')}</a></div>
<div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">${[...P,...P.slice(0,8)].map((p,i)=>pcard(p,i,d)).join('')}</div>
${pager(d)}
<div class="card p-5 mt-5"><h2 class="font-display text-[17px] font-extrabold mb-2">About smartphones on HaatBazar</h2>
<p class="text-[13px] text-ink-500 leading-relaxed mb-3">Buy original smartphones from authorised sellers across Bangladesh with official warranty, EMI facility and same-day delivery inside Dhaka. Compare specifications, read verified buyer reviews, and choose Cash on Delivery if you prefer to pay at your door.</p>
<div class="grid sm:grid-cols-3 gap-4 text-[12.5px]">
${[['Popular brands',['Samsung','Xiaomi','Realme','Vivo','Oppo','Infinix','Walton','Tecno']],['Popular price ranges',['Under ৳8,000','৳8,000–12,000','৳12,000–20,000','৳20,000–35,000','Above ৳35,000']],['Related categories',['Tablets','Smart Watches','Power Banks','Phone Cases','Screen Protectors','Earbuds']]]
.map(g=>`<div><p class="font-extrabold text-ink-800 mb-2">${g[0]}</p><div class="flex flex-wrap gap-1.5">${g[1].map(x=>`<a href="products.html" class="badge badge-gray hover:!bg-brand-50 hover:!text-brand-700">${x}</a>`).join('')}</div></div>`).join('')}</div></div>
</div></div></main>${filterDrawer('p')}${modals(d)}`;

fs.writeFileSync('products.html', L.page({title:'Smartphones — Product List', desc:'Buy smartphones online in Bangladesh with warranty, EMI and cash on delivery.', body:productsBody}));

/* ========================= PRODUCT DETAILS ========================= */
const specs = [['Brand','Realme'],['Model','C100x'],['Warranty','2 years official (brand)'],['SIM','Dual Nano-SIM, 4G LTE'],['Display','6.8" HD+ IPS, 90Hz, 560 nits'],['Processor','Unisoc Tiger T612 (12nm), Octa-core'],['RAM / Storage','6 GB + 128 GB (expandable up to 1 TB)'],['Rear camera','50 MP AI dual + 2 MP depth, LED flash'],['Front camera','8 MP, f/2.0'],['Battery','8000 mAh Li-Po, 45W SuperVOOC'],['OS','Android 14, Realme UI 5.0'],['Fingerprint','Side-mounted'],['Colours','Dreamy Purple, Midnight Black, Cyber Green'],['Weight','198 g'],['Box contents','Handset, 45W charger, USB-C cable, SIM tool, case, warranty card'],['Country of origin','China (assembled in Bangladesh)']];
const reviews = [['Tanvir Hasan','2 days ago',5,'Battery is a beast — 2 full days with heavy use. Charging is genuinely fast, 0–60% in about half an hour. Delivery took only 1 day in Dhaka.',['Colour: Dreamy Purple','128GB'],42,'Verified purchase'],
['Sumaiya Akter','1 week ago',4,'Display is bright and smooth for the price. Camera is average in low light but fine in daylight. Seller packed it very well and the warranty card was inside.',['Colour: Midnight Black','128GB'],18,'Verified purchase'],
['Rafiqul Islam','2 weeks ago',5,'Bought it for my father. Big screen, loud speaker, simple UI — he loves it. Got it with ৳500 voucher, great value.',['Colour: Cyber Green','128GB'],9,'Verified purchase'],
['Nabila Chowdhury','3 weeks ago',3,'Phone is good but it took 4 days to arrive in Sylhet and the box was slightly dented. Product itself works perfectly.',['Colour: Dreamy Purple','128GB'],5,'Verified purchase']];

const pdBody = `
${L.crumb([{t:'Electronics & Gadgets',h:'categories.html'},{t:'Mobile & Tablets',h:'products.html'},{t:'Smartphones',h:'products.html'},{t:'Realme C100x'}],d)}
<main class="shell py-5">
<div class="grid lg:grid-cols-[minmax(0,1fr)_318px] gap-5">
<div class="min-w-0">
<div class="card p-4 sm:p-5 mb-4 grid md:grid-cols-[minmax(0,420px)_1fr] gap-6">
<div><div class="relative rounded-xl overflow-hidden mb-3">${ph(2,'phoneDev','ratio-sq w-full')}
<span class="discount-flag !text-[12px] !px-2.5 !py-1">-18%</span>
<button class="wish-btn !w-10 !h-10" data-toggle-class="is-on">${svg('heart','w-5 h-5')}</button>
<button class="absolute bottom-3 right-3 btn btn-sm !bg-white/90 !text-ink-900">${svg('scan')}Zoom</button></div>
<div class="grid grid-cols-5 gap-2">${[0,1,2,3,4].map(i=>`<button class="rounded-lg overflow-hidden ${i===0?'ring-2 ring-brand-500':'opacity-70 hover:opacity-100'}">${ph(i+3,'phoneDev','ratio-sq')}</button>`).join('')}</div>
<div class="mt-3 flex items-center gap-2 text-[12px] text-ink-500">${svg('play','w-4 h-4 text-brand-500')}2 product videos · 14 images · 360° view available</div></div>
<div class="min-w-0">
<div class="flex flex-wrap items-center gap-2 mb-2"><span class="badge badge-dark">${svg('award')}Mall</span><span class="badge badge-green">${svg('check')}In stock</span><span class="badge badge-brand">${svg('bolt')}Flash deal</span><span class="badge badge-blue">Top seller in Smartphones</span></div>
<h1 class="font-display text-[21px] sm:text-[25px] font-extrabold leading-snug tracking-tight mb-2">Realme C100x 6/128GB — 8000mAh Battery, 45W SuperVOOC, 6.8" 90Hz Display (Official Warranty)</h1>
<div class="flex flex-wrap items-center gap-3 mb-3 text-[12.5px]">
<span class="flex items-center gap-1.5">${stars(4.6)}<b class="text-ink-900">4.6</b><a href="#reviews" class="link">1,240 ratings</a></span>
<span class="text-ink-300">|</span><a href="#qna" class="link">86 answered questions</a>
<span class="text-ink-300">|</span><span class="text-ink-500">2.1k sold</span>
<span class="text-ink-300">|</span><span class="text-ink-500">Brand: <a href="brands.html" class="link">Realme</a></span>
<span class="text-ink-300">|</span><span class="text-ink-500">SKU: RLM-C100X-6128-PUR</span></div>
<div class="rounded-xl bg-brand-50 border border-brand-100 p-4 mb-4">
<div class="flex flex-wrap items-end gap-2.5 mb-1.5"><span class="price-lg">৳11,499</span><span class="price-old !text-[14px]">৳13,999</span><span class="badge badge-solid">Save ৳2,500 (18%)</span></div>
<p class="text-[12px] text-ink-600 mb-2.5">Price incl. VAT · Flash price ends in <b class="text-brand-700 mono" data-countdown-inline>04:12:52</b></p>
<div class="flex flex-wrap gap-2 text-[12px]"><span class="badge !bg-white">${svg('ticket')}৳300 voucher — code C100X300</span><span class="badge !bg-white">${svg('money')}EMI ৳958/mo × 12</span><span class="badge !bg-white">${svg('refresh')}Trade-in up to ৳3,000</span></div></div>
<div class="space-y-4 mb-4">
<div><p class="label">Colour: <span class="text-ink-500 font-medium">Dreamy Purple</span></p><div class="flex flex-wrap gap-2">${[['Dreamy Purple',1],['Midnight Black',0],['Cyber Green',0]].map(c=>`<button class="flex items-center gap-2 h-11 pl-1.5 pr-3 rounded-xl border ${c[1]?'border-brand-500 bg-brand-50':'border-[#e7e9ef] hover:border-ink-300'}">${ph(c[1]?2:5,'phoneDev','w-8 h-8 rounded-lg')}<span class="text-[12.5px] font-bold">${c[0]}</span></button>`).join('')}</div></div>
<div><p class="label">Storage</p><div class="flex flex-wrap gap-2">${[['4GB + 64GB','৳9,999',0],['6GB + 128GB','৳11,499',1],['8GB + 256GB','৳13,999',0]].map(v=>`<button class="chip !h-auto !py-2 !px-3.5 ${v[2]?'is-active':''}"><span class="text-left"><span class="block text-[12.5px] font-bold">${v[0]}</span><span class="block text-[11px] ${v[2]?'text-white/80':'text-ink-400'}">${v[1]}</span></span></button>`).join('')}</div></div>
<div><p class="label">Add-ons <span class="text-ink-400 font-medium">(optional)</span></p><div class="space-y-2">
${[['Tempered glass + back cover','৳290'],['1 year extended warranty','৳1,190'],['Screen replacement insurance (12m)','৳990']].map(a=>`<label class="check items-center justify-between w-full p-2.5 rounded-lg border border-[#e7e9ef]"><span class="flex items-center gap-2.5"><input type="checkbox"><span class="text-[13px] font-semibold">${a[0]}</span></span><span class="text-[13px] font-extrabold text-brand-600">+${a[1]}</span></label>`).join('')}</div></div>
<div class="flex flex-wrap items-end gap-4"><div><p class="label">Quantity</p>
<div class="flex items-center border border-[#e7e9ef] rounded-lg h-11 w-fit"><button class="w-10 h-full grid place-items-center hover:bg-ink-50">${svg('minus')}</button><input class="w-12 text-center text-[15px] font-bold" value="1"><button class="w-10 h-full grid place-items-center hover:bg-ink-50">${svg('plus')}</button></div></div>
<p class="text-[12.5px] text-ink-500 pb-2.5">Only <b class="text-brand-600">32 pieces</b> left · max 5 per customer</p></div></div>
<div class="flex flex-wrap gap-2.5">
<button class="btn btn-lg btn-primary flex-1 min-w-[170px]" data-toast="Added to cart">${svg('cart')}Add to cart</button>
<a href="checkout.html" class="btn btn-lg btn-dark flex-1 min-w-[150px]">${svg('bolt')}Buy now</a>
<button class="btn btn-lg btn-outline btn-icon !w-12" data-toggle-class="is-on" aria-label="Wishlist">${svg('heart','w-5 h-5')}</button>
<a href="compare.html" class="btn btn-lg btn-outline btn-icon !w-12" aria-label="Compare">${svg('layers','w-5 h-5')}</a>
<button class="btn btn-lg btn-outline btn-icon !w-12" aria-label="Share">${svg('share','w-5 h-5')}</button></div>
<div class="grid sm:grid-cols-2 gap-2.5 mt-4">${[['msg','Chat with seller','Replies in ~8 min'],['phone','Call the shop','10 AM – 9 PM'],['store','Pickup in store','Mirpur 10 branch'],['question','Ask a question','86 already answered']].map(x=>`<button class="flex items-center gap-2.5 p-3 rounded-xl border border-[#e7e9ef] hover:border-brand-200 text-left"><span class="w-9 h-9 rounded-lg bg-ink-50 text-ink-700 grid place-items-center shrink-0">${svg(x[0],'w-4 h-4')}</span><span class="min-w-0"><span class="block text-[12.5px] font-bold clamp-1">${x[1]}</span><span class="block text-[11px] text-ink-500 clamp-1">${x[2]}</span></span></button>`).join('')}</div>
</div></div>

<div class="card mb-4">
<div class="tabs px-4" data-tabs>
${['Description','Specifications','Reviews (1,240)','Q&amp;A (86)','Shipping &amp; Returns','Warranty','Seller info'].map((t,i)=>`<button class="tab ${i===0?'is-active':''}" data-tab="${i}">${t}</button>`).join('')}</div>
<div class="p-5" data-tab-panel="0"><div class="rich max-w-none">
<h2>Realme C100x — big battery, bigger screen</h2>
<p>The Realme C100x is built for people who use their phone all day. An enormous <b>8000 mAh battery</b> paired with the efficient Unisoc T612 chipset delivers up to two full days of mixed usage, while <b>45W SuperVOOC charging</b> gets you back to 60% in roughly 30 minutes. The 6.8-inch HD+ display refreshes at 90Hz, so scrolling, gaming and video all feel noticeably smoother than on typical budget phones.</p>
<h3>Key highlights</h3>
<ul><li><b>8000 mAh battery</b> with reverse charging — power your earbuds from the phone</li><li><b>45W SuperVOOC</b> fast charger included in the box</li><li><b>6.8" 90Hz HD+</b> display with 560 nits peak brightness</li><li><b>50 MP AI dual camera</b> with night mode and 1080p video</li><li><b>6 GB RAM + 6 GB dynamic RAM</b>, 128 GB storage expandable to 1 TB</li><li>Android 14 with Realme UI 5.0 — 2 years of security updates</li><li>Official Realme Bangladesh warranty: 2 years handset, 6 months accessories</li></ul>
<h3>What's in the box</h3><p>Handset · 45W charging adapter · USB Type-C cable · SIM ejector tool · protective case · quick start guide · warranty card.</p>
<blockquote>Seller note: This unit is an official Realme Bangladesh product with BTRC approval. IMEI is registered — you can verify it on the government NEIR portal after delivery.</blockquote>
<h3>Care instructions</h3><ul><li>Use only the supplied 45W charger to preserve battery health.</li><li>Do not expose to water — the device has no IP rating.</li><li>Keep the original box and invoice for warranty claims.</li></ul></div></div>
<div class="p-5" data-tab-panel="1" hidden><div class="grid md:grid-cols-2 gap-x-8">
${specs.map((s,i)=>`<div class="flex gap-4 py-2.5 ${i<specs.length-1?'border-b border-[#f0f1f5]':''}"><span class="w-[42%] shrink-0 text-[12.5px] font-bold text-ink-500">${s[0]}</span><span class="text-[13px] text-ink-800">${s[1]}</span></div>`).join('')}
</div><button class="btn btn-sm btn-outline mt-4">${svg('dl')}Download full spec sheet (PDF)</button></div>
<div class="p-5" data-tab-panel="2" hidden id="reviews">
<div class="grid md:grid-cols-[240px_1fr] gap-6 pb-5 border-b border-[#f0f1f5]">
<div class="text-center"><p class="font-display text-[44px] font-extrabold leading-none">4.6</p>${stars(4.6,'stars-lg')}<p class="text-[12.5px] text-ink-500 mt-1.5">1,240 ratings · 512 written reviews</p>
<button class="btn btn-sm btn-primary mt-3" data-modal-open="reviewModal">${svg('edit')}Write a review</button></div>
<div class="space-y-2">${[[5,72],[4,18],[3,6],[2,2],[1,2]].map(r=>`<div class="flex items-center gap-3"><span class="text-[12.5px] font-bold w-8">${r[0]}★</span><div class="bar flex-1"><i style="width:${r[1]}%"></i></div><span class="text-[12px] text-ink-500 w-12 text-right">${r[1]}%</span></div>`).join('')}
<div class="flex flex-wrap gap-2 pt-3">${['With photos (128)','5★ only','Critical (34)','Battery (211)','Camera (96)','Delivery (77)'].map((x,i)=>`<button class="chip !h-8 ${i===0?'is-active':''}">${x}</button>`).join('')}</div></div></div>
<div class="divide-y divide-[#f0f1f5]">${reviews.map(r=>`<div class="py-5">
<div class="flex items-start gap-3"><span class="avatar avatar-md bg-ink-700">${r[0][0]}</span>
<div class="flex-1 min-w-0"><div class="flex flex-wrap items-center gap-2"><p class="text-[13.5px] font-extrabold">${r[0]}</p><span class="badge badge-green !text-[10.5px]">${svg('check')}${r[6]}</span><span class="text-[11.5px] text-ink-400 ml-auto">${r[1]}</span></div>
<div class="flex items-center gap-2 mt-1">${stars(r[2])}<span class="text-[11.5px] text-ink-400">${r[3].split(' ').slice(0,0).join('')}${r[4].join(' · ')}</span></div>
<p class="text-[13.5px] text-ink-700 leading-relaxed mt-2">${r[3]}</p>
<div class="flex gap-2 mt-3">${[0,1].map(i=>ph(i+4,'camera','w-16 h-16 rounded-lg')).join('')}</div>
<div class="flex items-center gap-4 mt-3 text-[12px]"><button class="flex items-center gap-1.5 font-bold text-ink-500 hover:text-brand-600">${svg('up','w-3.5 h-3.5')}Helpful (${r[5]})</button><button class="font-bold text-ink-500 hover:text-brand-600">Reply</button><button class="font-bold text-ink-400 hover:text-brand-600">Report</button></div>
<div class="mt-3 ml-1 pl-3.5 border-l-2 border-brand-100"><p class="text-[12px] font-extrabold text-brand-700 mb-1">Realme Official Store replied</p><p class="text-[12.5px] text-ink-600">Thank you for your feedback! For any warranty support, visit our Mirpur service point with the invoice.</p></div>
</div></div></div>`).join('')}</div>
<div class="text-center pt-4"><button class="btn btn-outline">Load 508 more reviews</button></div></div>
<div class="p-5" data-tab-panel="3" hidden id="qna">
<div class="flex flex-col sm:flex-row gap-2 mb-5"><input class="input" placeholder="Ask a question about this product…"><button class="btn btn-primary shrink-0" data-toast="Question submitted">Post question</button></div>
<div class="divide-y divide-[#f0f1f5]">${[['Does it support 5G?','No, the C100x supports 4G LTE only on both SIM slots.','Seller · Realme Official Store','2 days ago',12],['Is the charger 45W in the box?','Yes, the retail box includes the original 45W SuperVOOC adapter and a Type-C cable.','Seller · Realme Official Store','5 days ago',31],['Can I claim warranty in Chattogram?','Yes. Realme has authorised service centres in Chattogram, Sylhet, Khulna and Rajshahi.','Verified buyer · Imran H.','1 week ago',8],['Does it have a fingerprint sensor?','Yes, a side-mounted fingerprint sensor plus face unlock.','Seller · Realme Official Store','2 weeks ago',15]]
.map(q=>`<div class="py-4"><p class="flex gap-2 text-[13.5px] font-extrabold"><span class="w-5 h-5 rounded bg-ink-100 text-ink-600 grid place-items-center text-[10px] shrink-0 mt-0.5">Q</span>${q[0]}</p>
<p class="flex gap-2 text-[13px] text-ink-600 mt-2"><span class="w-5 h-5 rounded bg-brand-50 text-brand-600 grid place-items-center text-[10px] font-extrabold shrink-0 mt-0.5">A</span>${q[1]}</p>
<div class="flex items-center gap-3 mt-2 ml-7 text-[11.5px] text-ink-400"><span>${q[2]}</span><span>·</span><span>${q[3]}</span><button class="font-bold hover:text-brand-600">${svg('up','w-3.5 h-3.5 inline')} Helpful (${q[4]})</button></div></div>`).join('')}</div></div>
<div class="p-5" data-tab-panel="4" hidden><div class="grid md:grid-cols-2 gap-6">
<div><h3 class="text-[15px] font-extrabold mb-3">Delivery options</h3><div class="space-y-2.5">
${[['Standard delivery','৳60','2–4 days · all 64 districts'],['Express delivery (Dhaka)','৳120','Same day if ordered before 2 PM'],['Store pickup','Free','Ready in 2 hours at Mirpur 10'],['Cash on delivery','Available','Pay when you receive the parcel']].map(x=>`<div class="flex items-start gap-3 p-3 rounded-xl border border-[#e7e9ef]"><span class="w-9 h-9 rounded-lg bg-ink-50 grid place-items-center shrink-0">${svg('truck','w-4 h-4')}</span><div class="min-w-0 flex-1"><p class="text-[13px] font-extrabold">${x[0]}</p><p class="text-[12px] text-ink-500">${x[2]}</p></div><span class="text-[13px] font-extrabold text-brand-600 shrink-0">${x[1]}</span></div>`).join('')}</div>
<div class="mt-4 p-3.5 rounded-xl bg-ink-50"><p class="text-[12.5px] font-extrabold mb-1">Check delivery to your area</p><div class="flex gap-2"><input class="input input-sm" placeholder="Enter post code e.g. 1209"><button class="btn btn-sm btn-dark shrink-0">Check</button></div></div></div>
<div><h3 class="text-[15px] font-extrabold mb-3">Returns &amp; refunds</h3>
<ul class="space-y-2.5 text-[13px] text-ink-600">${['7-day easy return if the item is damaged, defective or not as described','Return pickup is free — our courier collects from your address','Refund to bKash/Nagad/card within 3–7 working days after inspection','Item must include all accessories, box and invoice','Change-of-mind returns accepted only for unopened boxes'].map(x=>`<li class="flex gap-2">${svg('check','w-4 h-4 text-green-600 shrink-0 mt-0.5')}${x}</li>`).join('')}</ul>
<a href="returns-policy.html" class="link text-[13px] inline-block mt-3">Read the full return policy →</a>
<h3 class="text-[15px] font-extrabold mt-6 mb-2">Packaging</h3><p class="text-[13px] text-ink-600">Shipped in tamper-proof bubble wrap with a sealed HaatBazar security tape. Please record a video while opening if the parcel looks damaged.</p></div></div></div>
<div class="p-5" data-tab-panel="5" hidden><div class="grid md:grid-cols-2 gap-6">
<div class="rounded-2xl border border-[#e7e9ef] p-5"><span class="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 grid place-items-center mb-3">${svg('shield','w-6 h-6')}</span>
<p class="font-display text-[16px] font-extrabold mb-1">2 years official brand warranty</p><p class="text-[13px] text-ink-500 mb-3">Covers manufacturing defects on the handset. Accessories (charger, cable, earphones) carry a 6-month warranty.</p>
<ul class="space-y-2 text-[12.5px] text-ink-600">${['Service through 46 Realme care centres in Bangladesh','Physical damage &amp; water damage are not covered','Keep the invoice — required for every claim'].map(x=>`<li class="flex gap-2">${svg('check','w-4 h-4 text-green-600 shrink-0 mt-0.5')}${x}</li>`).join('')}</ul></div>
<div class="rounded-2xl border border-[#e7e9ef] p-5"><span class="w-11 h-11 rounded-xl bg-gold-50 text-gold-600 grid place-items-center mb-3">${svg('award','w-6 h-6')}</span>
<p class="font-display text-[16px] font-extrabold mb-1">Extend your protection</p><p class="text-[13px] text-ink-500 mb-3">Add HaatBazar Care for accidental damage, screen crack and liquid damage cover.</p>
<div class="space-y-2">${[['1 year extended warranty','৳1,190'],['Screen protection plan','৳990'],['Complete care (both)','৳1,890']].map(x=>`<label class="check items-center justify-between w-full p-2.5 rounded-lg border border-[#e7e9ef]"><span class="flex items-center gap-2.5"><input type="radio" name="care"><span class="text-[13px] font-semibold">${x[0]}</span></span><span class="text-[13px] font-extrabold">${x[1]}</span></label>`).join('')}</div></div></div></div>
<div class="p-5" data-tab-panel="6" hidden>
<div class="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-2xl bg-ink-50 mb-5">
${ph(1,'store','w-16 h-16 rounded-xl')}
<div class="flex-1 min-w-0"><div class="flex flex-wrap items-center gap-2"><p class="font-display text-[17px] font-extrabold">Realme Official Store</p><span class="badge badge-dark">${svg('award')}Mall</span><span class="badge badge-green">${svg('shield')}Verified</span></div>
<p class="text-[12.5px] text-ink-500 mt-1">Mirpur 10, Dhaka · On HaatBazar since 2021 · 12,480 products</p>
<div class="flex flex-wrap gap-5 mt-3">${[['4.8/5','Seller rating'],['98%','Ship on time'],['~8 min','Chat response'],['0.4%','Return rate']].map(x=>`<div><p class="text-[15px] font-extrabold">${x[0]}</p><p class="text-[11px] text-ink-500">${x[1]}</p></div>`).join('')}</div></div>
<div class="flex gap-2 shrink-0"><a href="shop-profile.html" class="btn btn-sm btn-outline">Visit store</a><button class="btn btn-sm btn-primary" data-toast="Following store">Follow</button></div></div>
<h3 class="text-[15px] font-extrabold mb-3">More from this seller</h3>
<div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">${P.slice(2,7).map((p,i)=>pcard(p,i+2,d,{hideCta:true})).join('')}</div></div>
</div>

<div class="card p-4 sm:p-5 mb-4">${L.sectionHead('Compare with similar products','Specs side by side','compare.html','layers')}
<div class="tbl-wrap"><table class="tbl">
<thead><tr><th>Product</th><th>Price</th><th>Display</th><th>Battery</th><th>RAM/ROM</th><th>Rating</th><th></th></tr></thead>
<tbody>${[['Realme C100x (this)','৳11,499','6.8" 90Hz','8000 mAh','6/128 GB','4.6'],['Redmi 13C','৳12,999','6.74" 90Hz','5000 mAh','6/128 GB','4.5'],['Infinix Hot 40i','৳13,499','6.56" 90Hz','5000 mAh','8/256 GB','4.4'],['Walton Primo NF5','৳9,999','6.5" 60Hz','5000 mAh','4/64 GB','4.1']]
.map((r,i)=>`<tr><td><div class="flex items-center gap-2.5">${ph(i,'phoneDev','w-9 h-9 rounded-lg')}<span class="font-semibold text-ink-900">${r[0]}</span></div></td><td class="font-extrabold text-brand-600">${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${stars(Number(r[5]))} ${r[5]}</td><td><button class="btn btn-xs btn-outline">Add to compare</button></td></tr>`).join('')}</tbody></table></div></div>

<div class="card p-4 sm:p-5 mb-4">${L.sectionHead('Frequently bought together','Bundle and save ৳390','','gift')}
<div class="flex flex-wrap items-center gap-3">${[['Realme C100x','৳11,499'],['Tempered glass 9H','৳190'],['Anker 20W charger','৳1,290']].map((x,i)=>`${i?'<span class="text-[20px] font-bold text-ink-300">+</span>':''}<label class="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#e7e9ef]"><input type="checkbox" checked class="w-4 h-4 accent-brand-500">${ph(i+2,'pkg','w-12 h-12 rounded-lg')}<span><span class="block text-[12.5px] font-bold">${x[0]}</span><span class="block text-[12.5px] text-brand-600 font-extrabold">${x[1]}</span></span></label>`).join('')}
<div class="ml-auto text-right"><p class="text-[12px] text-ink-500">Bundle total</p><p class="font-display text-[20px] font-extrabold text-brand-600">৳12,589</p><button class="btn btn-sm btn-primary mt-1" data-toast="Bundle added to cart">Add all 3 to cart</button></div></div></div>

<div class="card p-4 sm:p-5">${L.sectionHead('Customers also viewed','Popular in Smartphones','products.html','eye')}
<div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">${P.slice(8,13).map((p,i)=>pcard(p,i+8,d)).join('')}</div></div>
</div>

<aside class="lg:w-[318px] shrink-0 space-y-4">
<div class="card p-4 sticky-24">
<div class="flex items-center justify-between mb-3"><p class="text-[13px] font-extrabold">Delivery &amp; service</p><button class="text-[12px] font-bold text-brand-600" data-modal-open="locationModal">Change</button></div>
<div class="space-y-3 text-[12.5px]">
<div class="flex gap-2.5">${svg('pin','w-4 h-4 text-brand-500 shrink-0 mt-0.5')}<div><p class="font-bold text-ink-900">Dhanmondi, Dhaka 1209</p><p class="text-ink-500">Standard: ৳60 · arrives Wed, 19 Aug</p></div></div>
<div class="flex gap-2.5">${svg('bolt','w-4 h-4 text-brand-500 shrink-0 mt-0.5')}<div><p class="font-bold text-ink-900">Express same-day ৳120</p><p class="text-ink-500">Order within 3h 20m</p></div></div>
<div class="flex gap-2.5">${svg('money','w-4 h-4 text-brand-500 shrink-0 mt-0.5')}<div><p class="font-bold text-ink-900">Cash on delivery available</p><p class="text-ink-500">Inspect before you pay</p></div></div>
<div class="flex gap-2.5">${svg('return','w-4 h-4 text-brand-500 shrink-0 mt-0.5')}<div><p class="font-bold text-ink-900">7-day free returns</p><p class="text-ink-500">Pickup from your address</p></div></div>
<div class="flex gap-2.5">${svg('shield','w-4 h-4 text-brand-500 shrink-0 mt-0.5')}<div><p class="font-bold text-ink-900">2 years official warranty</p><p class="text-ink-500">46 service centres nationwide</p></div></div></div>
<div class="dotted-sep my-4"></div>
<p class="text-[13px] font-extrabold mb-2.5">Pay with</p><div class="flex flex-wrap gap-1.5 mb-4">${['bKash','Nagad','Rocket','Visa','Mastercard','AMEX','COD','EMI'].map(x=>`<span class="badge badge-gray">${x}</span>`).join('')}</div>
<div class="rounded-xl bg-service-50 border border-service-100 p-3.5 mb-4"><p class="flex items-center gap-2 text-[12.5px] font-extrabold text-service-700 mb-1">${svg('wrench','w-4 h-4')}Need installation or repair?</p><p class="text-[12px] text-ink-600 mb-2.5">Book a verified technician for mobile screen replacement, data transfer or setup help.</p><a href="services.html" class="btn btn-sm btn-service btn-block">Find a technician</a></div>
<div class="rounded-xl border border-[#e7e9ef] p-3.5"><p class="text-[12.5px] font-extrabold mb-2">Sold &amp; shipped by</p>
<div class="flex items-center gap-2.5 mb-2.5">${ph(1,'store','w-10 h-10 rounded-lg')}<div class="min-w-0"><p class="text-[12.5px] font-bold clamp-1">Realme Official Store</p><p class="text-[11px] text-ink-500">4.8★ seller · 98% on time</p></div></div>
<div class="flex gap-2"><a href="shop-profile.html" class="btn btn-xs btn-outline flex-1">Visit</a><button class="btn btn-xs btn-outline flex-1">${svg('msg')}Chat</button></div></div>
<button class="btn btn-sm btn-ghost btn-block mt-3 !text-ink-400">${svg('flag')}Report this listing</button>
</div></aside></div></main>
<div class="modal" id="reviewModal"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">
<div class="flex items-center justify-between p-5 border-b border-[#e7e9ef]"><h3 class="font-display text-[17px] font-extrabold">Write a review</h3><button class="icon-btn" data-modal-close>${svg('x','w-5 h-5')}</button></div>
<div class="p-5 space-y-4"><div class="flex items-center gap-3 p-3 rounded-xl bg-ink-50">${ph(2,'phoneDev','w-12 h-12 rounded-lg')}<p class="text-[13px] font-bold">Realme C100x 6/128GB — Dreamy Purple</p></div>
<div><label class="label">Overall rating <span class="req">*</span></label><div class="flex gap-1.5">${[1,2,3,4,5].map(()=>`<button class="text-gold-400">${svg('star','w-8 h-8','1.5')}</button>`).join('')}</div></div>
<div class="grid sm:grid-cols-3 gap-3">${['Value for money','Build quality','Battery life'].map(x=>`<div><label class="label !text-[12px]">${x}</label><select class="select input-sm"><option>5 — Excellent</option><option>4 — Good</option><option>3 — Average</option><option>2 — Poor</option><option>1 — Very poor</option></select></div>`).join('')}</div>
<div><label class="label">Review title</label><input class="input" placeholder="Sum it up in one line"></div>
<div><label class="label">Your review <span class="req">*</span></label><textarea class="textarea" placeholder="What did you like or dislike? How was the delivery and packaging?"></textarea><p class="hint">Minimum 30 characters. Please don't share personal contact details.</p></div>
<div><label class="label">Add photos or a video</label><div class="upload-box">${svg('camera','w-5 h-5')}<span>Drop files here or browse — up to 6 photos / 1 video</span></div></div>
<label class="check"><input type="checkbox" checked>Post as “Nusrat A.” (hide my full name)</label>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Review submitted for approval">Submit review</button></div></div></div></div>
${modals(d)}`;

fs.writeFileSync('product-details.html', L.page({title:'Realme C100x 6/128GB — Product Details', desc:'Realme C100x 6/128GB with 8000mAh battery, 45W charging and 2 years official warranty.', body:pdBody}));
console.log('products.html, product-details.html');
