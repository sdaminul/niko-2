const fs = require('fs');
const { svg, tk, ph, stars } = require('./ui');
const L = require('./layout');
const B = require('./blocks');
const { PRODUCTS: P, SERVICES: S, pcard, scard, catTile } = B;
const d = false;

const hero = `
<section class="pt-4 pb-2"><div class="shell grid lg:grid-cols-[1fr_318px] gap-4">
<div class="relative rounded-2xl overflow-hidden" data-slider>
<div class="slides flex transition-transform duration-500" data-slides>
${[['Eid Mega Sale','Up to 60% off on 2 lakh+ products','Free delivery over ৳999 · EMI from ৳500/mo','offers.html','Shop the sale','ph-a','bag'],
  ['Book verified home services','8,500+ background-checked professionals','Electricians, AC repair, cleaning, tutors &amp; more','services.html','Find a provider','ph-b','wrench'],
  ['One account, two businesses','Sell products &amp; list your services together','Zero commission for the first 3 months','sell-with-us.html','Start selling free','ph-c','store']]
.map((s,i)=>`<div class="min-w-full relative ${s[5]} h-[240px] sm:h-[320px] lg:h-[368px] grid-noise">
<div class="relative z-10 h-full flex flex-col justify-center p-6 sm:p-10 max-w-[560px] text-white">
<span class="badge !bg-white/18 !text-white mb-3 w-fit">${svg(s[6],'w-3.5 h-3.5')}${i===0?'Campaign live now':i===1?'Verified network':'For sellers &amp; providers'}</span>
<h2 class="font-display text-[26px] sm:text-[36px] lg:text-[42px] font-extrabold leading-[1.08] tracking-tight mb-2.5">${s[0]}</h2>
<p class="text-[14px] sm:text-[16px] font-semibold text-white/90 mb-1">${s[1]}</p>
<p class="text-[12.5px] sm:text-[13.5px] text-white/70 mb-5">${s[2]}</p>
<div class="flex flex-wrap gap-2.5"><a href="${s[3]}" class="btn btn-lg !bg-white !text-ink-950 hover:!bg-white/90">${s[4]} ${svg('chevR')}</a>
<a href="categories.html" class="btn btn-lg !border-white/40 !text-white hover:!bg-white/10 btn-outline !bg-transparent">Browse categories</a></div></div></div>`).join('')}
</div>
<button class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white grid place-items-center shadow-pop z-10" data-slide-prev>${svg('chevL','w-5 h-5')}</button>
<button class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white grid place-items-center shadow-pop z-10" data-slide-next>${svg('chevR','w-5 h-5')}</button>
<div class="absolute bottom-4 left-6 flex gap-1.5 z-10" data-slide-dots>${[0,1,2].map(i=>`<button class="h-1.5 rounded-full transition-all ${i===0?'w-7 bg-white':'w-1.5 bg-white/50'}"></button>`).join('')}</div></div>

<div class="grid grid-cols-2 lg:grid-cols-1 gap-4">
<a href="services.html" class="relative rounded-2xl overflow-hidden ph ph-b h-[112px] lg:h-[118px] p-4 text-white flex flex-col justify-center">
<span class="relative z-10"><span class="block font-display text-[15px] font-extrabold leading-tight">Service Provider<br>Network</span><span class="block text-[11.5px] text-white/75 mt-1">8,500+ verified pros in your city</span></span></a>
<a href="sell-with-us.html" class="relative rounded-2xl overflow-hidden ph ph-d h-[112px] lg:h-[118px] p-4 text-white flex flex-col justify-center">
<span class="relative z-10"><span class="block font-display text-[15px] font-extrabold leading-tight">Become a Seller<br>— it's free</span><span class="block text-[11.5px] text-white/80 mt-1">List today, get paid every week</span></span></a>
<div class="col-span-2 lg:col-span-1 card p-4 h-[112px] lg:h-[118px] flex items-center gap-3">
<span class="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 grid place-items-center shrink-0">${svg('ticket','w-6 h-6')}</span>
<div class="min-w-0"><p class="text-[13px] font-extrabold">Collect ৳500 welcome voucher</p><p class="text-[11.5px] text-ink-500 mt-0.5 clamp-2">New customers only. Use code <b class="text-brand-600">HAAT500</b> on your first order or booking.</p>
<button class="text-[12px] font-extrabold text-brand-600 mt-1" data-toast="Voucher HAAT500 collected">Collect now →</button></div></div></div>
</div></section>

<section class="pt-3"><div class="shell grid grid-cols-2 md:grid-cols-5 gap-3">
${[['shield','100% Verified','Every seller &amp; provider is KYC checked'],['truck','Cash on Delivery','Pay when your parcel arrives'],['bolt','Instant Booking','Confirm a service in under a minute'],['return','7-Day Easy Return','No-question return window'],['phone','24/7 Support','Call, chat or email anytime']]
.map(x=>`<div class="card flex items-center gap-2.5 p-3.5"><span class="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 grid place-items-center shrink-0">${svg(x[0],'w-5 h-5')}</span>
<div class="min-w-0"><p class="text-[12.5px] font-extrabold clamp-1">${x[1]}</p><p class="text-[11px] text-ink-500 clamp-1">${x[2]}</p></div></div>`).join('')}
</div></section>`;

const catStrip = `
<section class="section pb-0"><div class="shell">
<div class="card p-4 sm:p-5">
<div class="flex items-center justify-between mb-4"><div><h2 class="font-display text-[19px] font-extrabold">Shop by category</h2><p class="text-[12.5px] text-ink-500">240+ categories across products and services</p></div>
<a href="categories.html" class="text-[13px] font-bold text-brand-600 flex items-center gap-1">All categories ${svg('chevR','w-4 h-4')}</a></div>
<div class="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">${L.CATS.map((c,i)=>catTile(c,i,d)).join('')}</div>
<div class="dotted-sep my-4"></div>
<div class="flex items-center justify-between mb-3"><p class="text-[13px] font-extrabold flex items-center gap-2">${svg('wrench','w-4 h-4 text-service-600')}Popular local services</p>
<a href="services.html" class="text-[13px] font-bold text-service-600 flex items-center gap-1">All services ${svg('chevR','w-4 h-4')}</a></div>
<div class="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
${L.SCATS.map((c,i)=>`<a href="services.html" class="group flex flex-col items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-[#eef0f4] hover:border-service-200 hover:shadow-soft transition text-center">
<span class="w-14 h-14 rounded-2xl bg-service-50 text-service-600 grid place-items-center group-hover:bg-service-500 group-hover:text-white transition">${svg(c[1],'w-7 h-7','1.7')}</span>
<span class="text-[12.5px] font-bold text-ink-800 leading-tight clamp-2">${c[0]}</span><span class="text-2xs text-ink-400">${420+i*133} pros</span></a>`).join('')}</div>
</div></div></section>`;

const flash = `
<section class="section"><div class="shell"><div class="card overflow-hidden">
<div class="flex flex-wrap items-center gap-3 p-4 sm:p-5 border-b border-[#e7e9ef]">
<span class="w-10 h-10 rounded-xl bg-brand-500 text-white grid place-items-center shrink-0">${svg('bolt','w-5 h-5')}</span>
<div class="mr-auto"><h2 class="font-display text-[19px] sm:text-[21px] font-extrabold">Flash deals today</h2><p class="text-[12.5px] text-ink-500">Limited stock · products &amp; services together</p></div>
<div class="flex items-center gap-2"><span class="text-[12px] font-bold text-ink-500">Ends in</span>
<div class="flex gap-1" data-countdown>${['04','12','52'].map(t=>`<span class="w-9 h-9 rounded-lg bg-ink-950 text-white grid place-items-center text-[14px] font-extrabold mono">${t}</span>`).join('<span class="grid place-items-center font-extrabold text-ink-400">:</span>')}</div></div>
<a href="offers.html" class="btn btn-sm btn-soft">See all deals ${svg('chevR')}</a></div>
<div class="p-4 sm:p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
${P.slice(0,4).map((p,i)=>pcard(p,i,d)).join('')}
${S.slice(0,2).map((s,i)=>`<article class="pcard card-hover">
${ph(i+1,s[5],'ratio-sq w-full')}<button class="wish-btn">${svg('heart','w-4 h-4')}</button>
<span class="discount-flag !bg-service-500">Service</span>
<div class="pcard-body"><a href="service-details.html" class="pcard-title block mb-1.5">${s[0]}</a>
<div class="flex items-center gap-1.5 mb-1"><span class="rating-pill">${s[2]} ${svg('star','w-3 h-3')}</span><span class="text-2xs text-ink-400">(${s[3]})</span></div>
<p class="text-[13px] font-extrabold text-service-600 mb-2">${s[6]}</p>
<button class="btn btn-sm btn-service btn-block" data-modal-open="quoteModal">${svg('cal')}Book now</button></div></article>`).join('')}
</div></div></div></section>`;

const nearby = `
<section class="pb-1"><div class="shell">
${L.sectionHead('Service providers near you','Top-rated professionals within 5 km of Dhanmondi','services.html','pin','service')}
<div class="flex flex-wrap items-center gap-2 mb-4">
<span class="text-[12.5px] font-bold text-ink-500 mr-1">Sort:</span>
${['Recommended','Highest rated','Nearest first','Most reviewed','Open now'].map((x,i)=>`<button class="chip chip-service ${i===0?'is-active':''}">${x}</button>`).join('')}
<a href="services.html" class="btn btn-sm btn-outline ml-auto hidden sm:inline-flex">${svg('pin')}View on map</a></div>
<div class="grid md:grid-cols-2 gap-3.5">${S.slice(0,6).map((s,i)=>scard(s,i,d)).join('')}</div>
<div class="text-center mt-5"><a href="services.html" class="btn btn-outline-brand">Browse all 8,500+ providers ${svg('chevR')}</a></div>
</div></section>`;

const prodRail = (title, sub, list, off) => `
<section class="section"><div class="shell"><div class="card p-4 sm:p-5">
${L.sectionHead(title, sub, 'products.html', 'grid')}
<div class="flex flex-wrap gap-2 mb-4">${['Recommended','New arrivals','Price: low to high','Top rated','Best selling'].map((x,i)=>`<button class="chip ${i===0?'is-active':''}">${x}</button>`).join('')}</div>
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">${list.map((p,i)=>pcard(p,i+off,d)).join('')}</div>
</div></div></section>`;

const dualCta = `
<section class="section"><div class="shell">
<div class="relative overflow-hidden rounded-3xl bg-ink-950 text-white p-6 sm:p-10 grid lg:grid-cols-[1.15fr_1fr] gap-8 items-center grid-noise">
<div class="relative z-10"><span class="badge !bg-white/15 !text-white mb-3">${svg('sparkle','w-3.5 h-3.5')}Grow with HaatBazar</span>
<h2 class="font-display text-[24px] sm:text-[32px] font-extrabold leading-tight mb-3">One vendor account.<br>Two ways to earn.</h2>
<p class="text-[14px] text-white/70 max-w-[520px] mb-5">Sell physical products with nationwide delivery, or list your local service business and receive verified customer leads every day. Set up in 10 minutes — no registration fee, zero commission for the first 3 months.</p>
<div class="grid sm:grid-cols-3 gap-3 mb-6">
${[['2.4M+','Monthly buyers'],['64','Districts covered'],['৳0','Setup cost']].map(x=>`<div class="rounded-xl bg-white/[.06] border border-white/10 p-3.5"><p class="font-display text-[22px] font-extrabold">${x[0]}</p><p class="text-[11.5px] text-white/60">${x[1]}</p></div>`).join('')}</div>
<div class="flex flex-wrap gap-2.5"><a href="vendor-register.html" class="btn btn-lg btn-primary">${svg('plus')}Open a free store</a>
<a href="list-business.html" class="btn btn-lg btn-outline !bg-white/5 !border-white/25 !text-white hover:!bg-white/10">${svg('store')}List my business</a></div></div>
<div class="relative z-10 grid sm:grid-cols-2 gap-3.5">
${[['bag','Product Seller','Inventory, orders, shipping labels, payouts, ads &amp; analytics.','products'],['wrench','Service Provider','Listings, leads, booking calendar, quotes, reviews &amp; ranking boost.','services']]
.map(x=>`<div class="rounded-2xl bg-white p-5 text-ink-900"><span class="w-11 h-11 rounded-xl ${x[3]==='products'?'bg-brand-50 text-brand-600':'bg-service-50 text-service-600'} grid place-items-center mb-3">${svg(x[0],'w-6 h-6')}</span>
<p class="font-display text-[16px] font-extrabold mb-1.5">${x[1]}</p><p class="text-[12.5px] text-ink-500 leading-relaxed mb-3.5">${x[2]}</p>
<ul class="space-y-1.5 text-[12.5px] text-ink-600">${(x[3]==='products'?['Weekly payouts','Discounted courier rates','Free product photography tips']:['Verified badge after KYC','Lead credits every month','Appointment reminders by SMS']).map(li=>`<li class="flex items-center gap-1.5">${svg('check','w-3.5 h-3.5 text-green-600')}${li}</li>`).join('')}</ul></div>`).join('')}
</div></div></div></section>`;

const trustBand = `
<section class="pb-2"><div class="shell grid md:grid-cols-4 gap-3">
${[['shield','Verified providers &amp; sellers','KYC, NID and trade licence checked before approval'],['lock','Secure payments','bKash, Nagad, cards &amp; COD with buyer protection'],['pin','Hyper-local focus','Results ranked by distance from your exact area'],['phone','Real human support','Call 16247 · 8 AM – 11 PM, 7 days a week']]
.map(x=>`<div class="card card-pad flex gap-3"><span class="w-10 h-10 rounded-xl bg-ink-50 text-ink-700 grid place-items-center shrink-0">${svg(x[0],'w-5 h-5')}</span>
<div><p class="text-[13.5px] font-extrabold mb-0.5">${x[1]}</p><p class="text-[12px] text-ink-500 leading-relaxed">${x[2]}</p></div></div>`).join('')}
</div></section>`;

const blogBand = `
<section class="section"><div class="shell">${L.sectionHead('Guides, tips &amp; buying advice','Fresh from the HaatBazar blog','blog.html','book')}
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
${[['How to choose the right AC for a Dhaka flat','Buying Guide','6 min read','fan'],['10 questions to ask before hiring an electrician','Service Tips','4 min read','wrench'],['Seller playbook: your first 100 orders','Seller Story','8 min read','store'],['Eid shopping checklist for a family of four','Lifestyle','5 min read','gift']]
.map((b,i)=>`<a href="blog-details.html" class="card card-hover overflow-hidden">${ph(i+2,b[3],'ratio-wide w-full')}
<div class="p-4"><span class="badge badge-brand mb-2">${b[1]}</span><p class="font-display text-[14.5px] font-extrabold leading-snug mb-2 clamp-2">${b[0]}</p>
<p class="flex items-center gap-2 text-[11.5px] text-ink-400">${svg('clock','w-3.5 h-3.5')}${b[2]} · 12 Aug 2026</p></div></a>`).join('')}
</div></div></section>`;

const appBand = `
<section class="section pt-0"><div class="shell"><div class="card overflow-hidden grid lg:grid-cols-2">
<div class="p-6 sm:p-9"><span class="badge badge-brand mb-3">${svg('sparkle','w-3.5 h-3.5')}HaatBazar App</span>
<h2 class="font-display text-[24px] sm:text-[28px] font-extrabold leading-tight mb-3">Shop &amp; book faster<br>on the mobile app</h2>
<p class="text-[13.5px] text-ink-500 mb-5 max-w-[420px]">App-only vouchers, live order tracking, one-tap service booking and instant chat with sellers. Download free on Android and iOS.</p>
<div class="grid sm:grid-cols-2 gap-2.5 mb-5">${[['bolt','App-only flash vouchers'],['bell','Live delivery updates'],['msg','Chat with sellers &amp; pros'],['wallet','Save cards securely']].map(x=>`<p class="flex items-center gap-2 text-[13px] font-semibold text-ink-700">${svg(x[0],'w-4 h-4 text-brand-500')}${x[1]}</p>`).join('')}</div>
<div class="flex flex-wrap gap-2.5">${['Google Play','App Store'].map(s=>`<a href="#" class="btn btn-lg btn-dark">${svg('play')}${s}</a>`).join('')}</div>
<div class="mt-5 flex items-center gap-3"><div class="flex -space-x-2">${['A','B','C','D'].map((x,i)=>`<span class="avatar avatar-sm ring-2 ring-white ${['bg-brand-500','bg-service-500','bg-gold-400','bg-ink-700'][i]}">${x}</span>`).join('')}</div>
<p class="text-[12.5px] text-ink-500">${stars(5)} <b class="text-ink-900">4.7</b> from 82,000+ app reviews</p></div></div>
<div class="ph ph-c min-h-[280px] relative grid-noise"><div class="absolute inset-0 grid place-items-center p-8"><div class="w-[190px] rounded-3xl bg-white shadow-pop p-3 rotate-3">
<div class="h-1.5 w-10 bg-ink-100 rounded-full mx-auto mb-2.5"></div>
<div class="rounded-xl ph ph-a h-24 mb-2.5"></div>
<div class="space-y-1.5">${[80,60,90,45].map(w=>`<div class="h-2 rounded-full bg-ink-100" style="width:${w}%"></div>`).join('')}</div>
<div class="mt-3 h-8 rounded-lg bg-brand-500 grid place-items-center text-white text-[11px] font-bold">Add to cart</div></div></div></div>
</div></div></section>`;

const recent = `
<section class="section pt-0"><div class="shell"><div class="card p-4 sm:p-5">
<div class="flex items-center justify-between mb-4"><div class="flex items-center gap-3"><span class="w-10 h-10 rounded-xl bg-ink-50 text-ink-600 grid place-items-center">${svg('clock','w-5 h-5')}</span>
<div><h2 class="font-display text-[19px] font-extrabold">Recently viewed</h2><p class="text-[12.5px] text-ink-500">Pick up where you left off</p></div></div>
<button class="text-[12.5px] font-bold text-ink-500 hover:text-brand-600">Clear history</button></div>
<div class="hscroll">${P.slice(6,13).map((p,i)=>`<div class="w-[170px]">${pcard(p,i+6,d,{hideCta:true})}</div>`).join('')}</div>
</div></div></section>`;

const seoBand = `
<section class="pb-4"><div class="shell card p-5 sm:p-7">
<h2 class="font-display text-[19px] font-extrabold mb-2">HaatBazar — Bangladesh's marketplace for products and local services</h2>
<p class="text-[13.5px] text-ink-500 leading-relaxed mb-5 max-w-[900px]">From smartphones and sarees to electricians, tutors and wedding planners — HaatBazar brings verified sellers and service providers from all 64 districts into one trusted platform. Compare prices, read genuine reviews, book instantly and pay the way you prefer.</p>
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
${[['Popular product searches',['Smartphones under 20000','Air conditioner price in BD','Jamdani saree online','Gaming laptop Dhaka','Baby diaper offer','Winter jacket for men']],
['Popular service searches',['Electrician near me','AC servicing Dhaka','Home tutor for HSC','Bridal makeup artist','House shifting service','Car servicing Tejgaon']],
['Top cities',['Dhaka','Chattogram','Sylhet','Khulna','Rajshahi','Cumilla','Narayanganj','Gazipur']],
['Helpful links',['How to order','Return &amp; refund policy','Delivery charges','Become a seller','List your business','Report a problem']]]
.map(g=>`<div><p class="text-[13px] font-extrabold mb-2.5">${g[0]}</p><ul class="space-y-2 text-[12.5px] text-ink-500">${g[1].map(x=>`<li><a href="search.html" class="hover:text-brand-600">${x}</a></li>`).join('')}</ul></div>`).join('')}
</div></div></section>`;

const body = `<main>${hero}${catStrip}${flash}${nearby}
${prodRail('Electronics &amp; gadgets','Direct from authorised local shops and brand stores',P.slice(0,5),0)}
${trustBand}
${prodRail('Fashion &amp; lifestyle','Handloom, ethnic and everyday wear from local designers',P.slice(5,10),5)}
${dualCta}
${prodRail('Home, kitchen &amp; groceries','Daily essentials delivered across Bangladesh',P.slice(10,15),10)}
${blogBand}${appBand}${recent}${seoBand}</main>${B.modals(d)}`;

fs.writeFileSync('index.html', L.page({ title: 'Online Shopping & Local Services in Bangladesh', desc: 'Shop products from verified sellers and book trusted local services on HaatBazar — Bangladesh\'s dual marketplace.', body, active: 'Home' }));
console.log('index.html');
