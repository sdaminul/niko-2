const { svg, ic, tk, ph, stars } = require('./ui');
const R = d => d ? '../' : '';

const head = (title, desc, d) => `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — HaatBazar</title><meta name="description" content="${desc}">
<link rel="icon" href="${R(d)}images/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com/3.4.5"></script><script src="${R(d)}js/tailwind.config.js"></script>
<link rel="stylesheet" href="${R(d)}css/fonts.css"><link rel="stylesheet" href="${R(d)}css/style.css">
<link rel="stylesheet" href="${R(d)}css/components.css"><link rel="stylesheet" href="${R(d)}css/dashboard.css">`;

const CATS = [['Electronics & Gadgets','monitor'],['Mobile & Tablets','phoneDev'],['Fashion & Lifestyle','shirt'],['Health & Beauty','drop'],['Home & Living','home'],['Groceries & Food','bag'],['Baby, Kids & Toys','gift'],['Sports & Outdoor','dumbbell'],['Automobile Parts','car'],['Books & Stationery','book']];
const SCATS = [['Home Services','wrench'],['AC & Appliance Repair','fan'],['Beauty & Salon','scissors'],['Doctors & Clinics','stethoscope'],['Tutors & Coaching','graduation'],['Restaurants & Catering','chef'],['Event & Wedding','sparkle'],['Packers & Movers','truck'],['Travel Agents','plane'],['Pet Care','pet']];

const header = (d, active='') => `
<div class="hidden md:block bg-ink-950 text-white/70 text-xs"><div class="shell flex items-center justify-between h-9">
<p class="flex items-center gap-2">${svg('sparkle','w-3.5 h-3.5 text-brand-400')}Welcome to HaatBazar — Bangladesh's marketplace for products &amp; verified local services</p>
<div class="flex items-center gap-5">
<a href="${R(d)}track-order.html" class="hover:text-white flex items-center gap-1.5">${svg('truck','w-3.5 h-3.5')}Track Order</a>
<a href="${R(d)}sell-with-us.html" class="hover:text-white">Sell on HaatBazar</a>
<a href="${R(d)}list-business.html" class="hover:text-white">List Your Business</a>
<a href="${R(d)}help-center.html" class="hover:text-white">Help Center</a>
<span class="w-px h-3.5 bg-white/15"></span>
<div data-dropdown><button data-dropdown-toggle class="hover:text-white flex items-center gap-1.5">${svg('globe','w-3.5 h-3.5')}English ${svg('chevD','w-3 h-3')}</button>
<div data-dropdown-menu class="right-0 !min-w-[170px]"><a class="dd-item !text-brand-600 !bg-brand-50">English</a><a class="dd-item">বাংলা</a><div class="dd-sep"></div><div class="dd-label">Currency</div><a class="dd-item">৳ BDT — Taka</a></div></div>
</div></div></div>

<header class="bg-white sticky top-0 z-50 border-b border-[#e7e9ef]" data-sticky-head><div class="shell">
<div class="flex items-center gap-3 lg:gap-4 py-3">
<button class="lg:hidden icon-btn -ml-2" data-drawer-open="mobileMenu" aria-label="Menu">${svg('menu','w-6 h-6')}</button>
<a href="${R(d)}index.html" class="flex items-center gap-2.5 shrink-0"><span class="w-10 h-10 rounded-xl bg-brand-500 grid place-items-center shadow-brand">${svg('home','w-6 h-6 text-white','1.8')}</span>
<span class="leading-none"><span class="block font-display text-[21px] font-extrabold tracking-tight text-ink-950">Haat<span class="text-brand-500">Bazar</span></span><span class="hidden sm:block text-[9.5px] font-semibold tracking-[.14em] text-ink-400 uppercase mt-1">Shop &amp; Services</span></span></a>
<button class="hidden xl:flex items-center gap-2 h-11 px-3 rounded-xl border border-[#e7e9ef] hover:border-brand-200 transition shrink-0" data-modal-open="locationModal">${svg('pin','w-4 h-4 text-brand-500')}
<span class="text-left leading-tight"><span class="block text-[9.5px] font-bold text-ink-400 uppercase tracking-wider">Deliver / service in</span><span class="block text-[13px] font-bold text-ink-900">Dhanmondi, Dhaka</span></span>${svg('chevD','w-4 h-4 text-ink-400')}</button>
<div class="flex-1 min-w-0 relative" data-search-box>
<form class="flex items-stretch h-11 rounded-xl border-2 border-brand-500 overflow-hidden bg-white" onsubmit="return false">
<div data-dropdown class="hidden sm:block"><button type="button" data-dropdown-toggle class="h-full px-3 flex items-center gap-1.5 bg-brand-50 text-brand-700 text-[13px] font-bold border-r border-brand-100">All ${svg('chevD','w-3.5 h-3.5')}</button>
<div data-dropdown-menu class="left-0 !min-w-[190px]"><a class="dd-item !text-brand-600 !bg-brand-50">${svg('search')}Everything</a><a class="dd-item">${svg('box')}Products only</a><a class="dd-item">${svg('wrench')}Services only</a><a class="dd-item">${svg('store')}Shops &amp; Businesses</a></div></div>
<input type="search" class="flex-1 min-w-0 px-3.5 text-sm outline-none" placeholder="Search products, services, shops or businesses…">
<button class="px-4 sm:px-6 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold flex items-center gap-2 transition">${svg('search','w-4 h-4','2.2')}<span class="hidden sm:inline">Search</span></button></form>
<div data-search-panel class="mega absolute left-0 right-0 top-[calc(100%+8px)] bg-white rounded-2xl border border-[#e7e9ef] shadow-pop p-4 grid sm:grid-cols-2 gap-5 z-50">
<div><p class="text-[11px] font-extrabold uppercase tracking-[.09em] text-ink-400 mb-2">Trending searches</p><div class="space-y-1">
${['Smartphones under ৳20,000','AC servicing in Dhaka','Jamdani saree original','Best biryani near me','Home tutor for class 9'].map(t=>`<a href="${R(d)}search.html" class="flex items-center gap-2.5 p-2 rounded-lg hover:bg-ink-50 text-[13.5px] font-medium">${svg('search','w-4 h-4 text-ink-400')}${t}</a>`).join('')}</div></div>
<div><p class="text-[11px] font-extrabold uppercase tracking-[.09em] text-ink-400 mb-2">Recently viewed</p><div class="space-y-1">
<a href="${R(d)}product-details.html" class="flex items-center gap-2.5 p-2 rounded-lg hover:bg-ink-50 text-[13.5px]">${ph(1,'phoneDev','w-9 h-9 rounded-lg')}<span class="min-w-0"><span class="block font-semibold clamp-1">Realme C100x 6/128GB</span><span class="block text-2xs text-ink-400">Mobile &amp; Gadgets · ৳11,499</span></span></a>
<a href="${R(d)}service-details.html" class="flex items-center gap-2.5 p-2 rounded-lg hover:bg-ink-50 text-[13.5px]">${ph(0,'wrench','w-9 h-9 rounded-lg')}<span class="min-w-0"><span class="block font-semibold clamp-1">Rahim Electric Service</span><span class="block text-2xs text-ink-400">Electrician · Mirpur · 4.7★</span></span></a>
<button class="text-xs font-bold text-brand-600 hover:underline px-2 pt-1">Clear recent searches</button></div></div></div></div>
<div class="flex items-center gap-0.5 shrink-0">
<a href="${R(d)}services.html" class="hidden lg:grid place-items-center w-16 h-12 rounded-xl hover:bg-ink-50 text-ink-600 hover:text-brand-600 transition">${svg('pin','w-5 h-5','1.9')}<span class="text-[10.5px] font-bold mt-1">Nearby</span></a>
<a href="${R(d)}compare.html" class="hidden lg:grid place-items-center w-16 h-12 rounded-xl hover:bg-ink-50 text-ink-600 hover:text-brand-600 transition">${svg('layers','w-5 h-5','1.9')}<span class="text-[10.5px] font-bold mt-1">Compare</span></a>
<a href="${R(d)}user/wishlist.html" class="relative grid place-items-center w-12 lg:w-16 h-12 rounded-xl hover:bg-ink-50 text-ink-600 hover:text-brand-600 transition">${svg('heart','w-5 h-5','1.9')}<span class="hidden lg:block text-[10.5px] font-bold mt-1">Wishlist</span><span class="absolute top-1 right-1 lg:right-3 min-w-[17px] h-[17px] px-1 rounded-full bg-ink-900 text-white text-[10px] font-extrabold grid place-items-center">5</span></a>
<a href="${R(d)}cart.html" class="relative grid place-items-center w-12 lg:w-16 h-12 rounded-xl hover:bg-ink-50 text-ink-600 hover:text-brand-600 transition">${svg('cart','w-5 h-5','1.9')}<span class="hidden lg:block text-[10.5px] font-bold mt-1">Cart</span><span class="absolute top-1 right-1 lg:right-3 min-w-[17px] h-[17px] px-1 rounded-full bg-brand-500 text-white text-[10px] font-extrabold grid place-items-center" data-cart-count>3</span></a>
<div data-dropdown class="hidden sm:block"><button data-dropdown-toggle class="flex items-center gap-2 h-12 pl-1.5 pr-2.5 rounded-xl hover:bg-ink-50 transition"><span class="avatar avatar-md bg-gradient-to-br from-ink-700 to-ink-950">NA</span>
<span class="hidden xl:block text-left leading-tight"><span class="block text-[10px] text-ink-400 font-bold">Hello,</span><span class="block text-[13px] font-bold text-ink-900">Nusrat A.</span></span>${svg('chevD','hidden xl:block w-4 h-4 text-ink-400')}</button>
<div data-dropdown-menu class="right-0 !min-w-[250px]">
<div class="flex items-center gap-3 p-2.5 mb-1 rounded-xl bg-ink-50"><span class="avatar avatar-md bg-brand-500">NA</span><span class="min-w-0"><span class="block text-[13.5px] font-bold clamp-1">Nusrat Ahmed</span><span class="block text-[11.5px] text-ink-500">+880 1712-345678</span></span></div>
<a href="${R(d)}user/dashboard.html" class="dd-item">${svg('grid')}My Dashboard</a>
<a href="${R(d)}user/orders.html" class="dd-item">${svg('box')}My Orders<span class="ml-auto badge badge-brand">2</span></a>
<a href="${R(d)}user/bookings.html" class="dd-item">${svg('cal')}Service Bookings</a>
<a href="${R(d)}user/inquiries.html" class="dd-item">${svg('msg')}My Inquiries</a>
<a href="${R(d)}user/reviews.html" class="dd-item">${svg('star')}My Reviews</a>
<a href="${R(d)}user/wishlist.html" class="dd-item">${svg('heart')}Wishlist &amp; Saved</a>
<a href="${R(d)}user/wallet.html" class="dd-item">${svg('wallet')}Wallet &amp; Vouchers</a>
<a href="${R(d)}user/profile.html" class="dd-item">${svg('cog')}Account Settings</a>
<div class="dd-sep"></div><a href="${R(d)}vendor/dashboard.html" class="dd-item">${svg('store')}Seller / Provider Center</a>
<a href="${R(d)}admin/dashboard.html" class="dd-item">${svg('shield')}Admin Panel</a>
<a href="${R(d)}login.html" class="dd-item is-danger">${svg('lock')}Sign out</a></div></div>
<a href="${R(d)}login.html" class="sm:hidden icon-btn">${svg('user','w-5 h-5','1.9')}</a></div></div></div>

<div class="hidden lg:block border-t border-[#eef0f4]"><div class="shell flex items-center gap-5">
<div class="has-mega relative"><button class="nav-link !text-white bg-ink-950 hover:!text-white px-4 rounded-t-lg">${svg('menu','w-4 h-4','2.2')}All Categories ${svg('chevD','w-3.5 h-3.5')}</button>
<div class="mega absolute left-0 top-full w-[900px] bg-white rounded-b-2xl rounded-tr-2xl border border-[#e7e9ef] shadow-pop grid grid-cols-[236px_1fr] overflow-hidden z-50">
<div class="bg-ink-50/70 border-r border-[#e7e9ef] py-2 max-h-[430px] overflow-y-auto thin-scroll">
${CATS.map((c,i)=>`<a href="${R(d)}products.html" class="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-semibold ${i===0?'text-brand-600 bg-white shadow-[inset_3px_0_0_#ff2525]':'text-ink-700 hover:text-brand-600 hover:bg-white'}">${svg(c[1],'w-4 h-4')}<span class="flex-1">${c[0]}</span>${svg('chevR','w-3.5 h-3.5 text-ink-300')}</a>`).join('')}
<div class="my-2 mx-4 h-px bg-[#e2e5eb]"></div><p class="px-4 pb-1.5 text-[10px] font-extrabold tracking-[.11em] uppercase text-service-600">Local Services</p>
${SCATS.slice(0,6).map(c=>`<a href="${R(d)}services.html" class="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-semibold text-ink-700 hover:text-service-600 hover:bg-white">${svg(c[1],'w-4 h-4')}<span class="flex-1">${c[0]}</span>${svg('chevR','w-3.5 h-3.5 text-ink-300')}</a>`).join('')}
<a href="${R(d)}categories.html" class="flex items-center gap-2 px-4 py-3 text-[13px] font-extrabold text-brand-600">All 240+ categories ${svg('chevR','w-3.5 h-3.5')}</a></div>
<div class="p-5 grid grid-cols-3 gap-5 max-h-[430px] overflow-y-auto thin-scroll">
${[['Mobile & Accessories',['Smartphones','Feature Phones','Power Banks','Chargers & Cables','Cases & Covers','Screen Protectors']],['Computers',['Laptops','Desktops','Monitors','Printers','Keyboards & Mice']],['Audio & Wearables',['Bluetooth Speakers','Earbuds','Headphones','Smart Watches','Fitness Bands']],['Home Appliances',['Air Conditioners','Refrigerators','Rechargeable Fans','Rice Cookers','Blenders','Water Filters']]].map(g=>`<div><p class="text-[12.5px] font-extrabold text-ink-900 mb-2">${g[0]}</p><ul class="space-y-1.5 text-[12.5px] text-ink-600">${g[1].map(x=>`<li><a href="${R(d)}products.html" class="hover:text-brand-600">${x}</a></li>`).join('')}</ul></div>`).join('')}
<div class="space-y-3"><a href="${R(d)}offers.html" class="block rounded-xl overflow-hidden ph ph-a h-[128px] p-4 text-white"><span class="relative z-10 block"><span class="badge !bg-white/20 !text-white mb-1.5">Campaign</span><span class="block font-display text-[15px] font-extrabold leading-tight">Eid Mega Sale<br>up to 60% off</span></span></a>
<a href="${R(d)}services.html" class="block rounded-xl overflow-hidden ph ph-b h-[128px] p-4 text-white"><span class="relative z-10 block"><span class="badge !bg-white/20 !text-white mb-1.5">Services</span><span class="block font-display text-[15px] font-extrabold leading-tight">8,500+ verified<br>providers near you</span></span></a></div></div></div></div>
${[['Flash Deals','offers.html','bolt'],['Home Services','services.html'],['Electronics','products.html'],['Doctors','services.html'],['Fashion','products.html'],['Restaurants','services.html'],['Brand Mall','brands.html'],['Shops','shops.html']].map(n=>`<a href="${R(d)}${n[1]}" class="nav-link ${n[2]?'!text-brand-600':''} ${active===n[0]?'!text-brand-600':''}">${n[2]?svg(n[2],'w-4 h-4'):''}${n[0]}</a>`).join('')}
<div class="ml-auto flex items-center gap-2 py-1.5"><a href="${R(d)}sell-with-us.html" class="btn btn-sm btn-soft">${svg('plus','','2.2')}Become a Seller</a><a href="${R(d)}help-center.html" class="btn btn-sm btn-outline">${svg('question')}Help</a></div>
</div></div></header>`;

const footer = d => `
<footer class="bg-ink-950 text-white mt-14">
<div class="shell py-12 grid gap-9 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
<div><a href="${R(d)}index.html" class="flex items-center gap-2.5 mb-4"><span class="w-10 h-10 rounded-xl bg-brand-500 grid place-items-center">${svg('home','w-6 h-6 text-white','1.8')}</span><span class="font-display text-[20px] font-extrabold">Haat<span class="text-brand-400">Bazar</span></span></a>
<p class="text-[13px] text-white/60 leading-relaxed mb-5 max-w-[290px]">Bangladesh's dual marketplace — buy authentic products from verified sellers and hire trusted local service providers, all from one account.</p>
<p class="text-[11px] font-extrabold uppercase tracking-[.1em] text-white/40 mb-2.5">Get the app</p>
<div class="flex gap-2.5 mb-5">${['Google Play','App Store'].map(s=>`<a href="#" class="flex items-center gap-2 h-11 px-3.5 rounded-xl border border-white/12 hover:border-white/30 hover:bg-white/5 transition">${svg('play','w-4 h-4 text-brand-400')}<span class="leading-tight"><span class="block text-[9px] text-white/50 uppercase tracking-wide">Get it on</span><span class="block text-[12.5px] font-bold">${s}</span></span></a>`).join('')}</div>
<p class="text-[11px] font-extrabold uppercase tracking-[.1em] text-white/40 mb-2.5">Follow us</p>
<div class="flex gap-2">${['f','in','X','ig','yt'].map(s=>`<a href="#" class="w-9 h-9 rounded-lg border border-white/12 grid place-items-center text-[12px] font-bold text-white/60 hover:bg-brand-500 hover:border-brand-500 hover:text-white transition">${s}</a>`).join('')}</div></div>
${[['Shop Products',['All Categories|categories.html','Flash Deals|offers.html','Brand Mall|brands.html','All Shops|shops.html','New Arrivals|products.html','Best Sellers|products.html','Gift Cards|gift-cards.html','Bulk / Wholesale|products.html']],
['Local Services',['Browse Services|services.html','Home Services|services.html','Doctors & Clinics|services.html','Tutors & Coaching|services.html','Restaurants|services.html','Event Planners|services.html','Get Free Quotes|services.html','Emergency Services|services.html']],
['Sell & Grow',['Sell on HaatBazar|sell-with-us.html','List Your Business|list-business.html','Seller Center|vendor/dashboard.html','Provider Center|vendor/leads.html','Seller Policies|seller-policy.html','Commission & Fees|seller-policy.html','Advertising Solutions|advertise.html','Affiliate Program|affiliate.html']],
['Help & Company',['Help Center|help-center.html','Track My Order|track-order.html','Returns & Refunds|returns-policy.html','Shipping & Delivery|shipping-policy.html','About HaatBazar|about.html','Careers|careers.html','Contact Us|contact.html','Blog & Guides|blog.html']]]
.map(col=>`<div><p class="text-[13px] font-extrabold mb-3.5">${col[0]}</p><ul class="space-y-2.5">${col[1].map(l=>{const[t,h]=l.split('|');return `<li><a href="${R(d)}${h}" class="f-link">${t}</a></li>`}).join('')}</ul></div>`).join('')}
</div>
<div class="shell pb-8"><div class="rounded-2xl border border-white/10 bg-white/[.03] p-5 grid md:grid-cols-2 gap-5 items-center">
<div><p class="font-display text-[15px] font-extrabold mb-1">Weekly deals &amp; service offers in your inbox</p><p class="text-[12.5px] text-white/55">Join 240,000+ subscribers. Unsubscribe anytime.</p></div>
<form class="flex gap-2" onsubmit="return false"><input type="email" class="input !bg-white/5 !border-white/15 !text-white placeholder:!text-white/40" placeholder="you@example.com"><button class="btn btn-primary shrink-0">Subscribe</button></form></div></div>
<div class="border-t border-white/8"><div class="shell py-5 flex flex-col md:flex-row items-center justify-between gap-4">
<p class="text-[12px] text-white/45">© 2026 HaatBazar Ltd. All rights reserved. Trade licence: TRAD/DNCC/043921/2024 · e-TIN: 431-902-773</p>
<div class="flex flex-wrap items-center gap-4 text-[12px] text-white/45">
${['Privacy Policy|privacy-policy.html','Terms of Use|terms.html','Refund Policy|returns-policy.html','Sitemap|sitemap.html'].map(l=>{const[t,h]=l.split('|');return `<a href="${R(d)}${h}" class="hover:text-white">${t}</a>`}).join('')}</div>
<div class="flex items-center gap-1.5">${['bKash','Nagad','Rocket','Visa','Mastercard','COD'].map(p=>`<span class="px-2 py-1 rounded-md bg-white/8 text-[10px] font-bold text-white/70">${p}</span>`).join('')}</div>
</div></div></footer>
<button data-to-top class="no-print fixed bottom-20 lg:bottom-6 right-4 z-40 w-11 h-11 rounded-full bg-ink-900 text-white grid place-items-center shadow-pop opacity-0 transition-opacity" aria-label="Back to top">${svg('up','w-5 h-5')}</button>
<nav data-bottom-nav class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#e7e9ef] grid grid-cols-5 no-print">
${[['index.html','home','Home'],['categories.html','grid','Categories'],['services.html','wrench','Services'],['cart.html','cart','Cart'],['user/dashboard.html','user','Account']].map(n=>`<a href="${R(d)}${n[0]}" class="py-2.5 grid place-items-center gap-1 text-ink-500"><span class="relative">${svg(n[1],'w-5 h-5','1.9')}${n[1]==='cart'?'<span class="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 rounded-full bg-brand-500 text-white text-[9px] font-extrabold grid place-items-center">3</span>':''}</span><span class="text-[10px] font-bold">${n[2]}</span></a>`).join('')}</nav>
<div class="h-16 lg:hidden"></div>`;

const drawers = d => `
<div class="drawer" id="mobileMenu"><div class="drawer-backdrop" data-drawer-close></div><div class="drawer-panel">
<div class="flex items-center justify-between p-4 border-b border-[#e7e9ef]"><span class="font-display text-[17px] font-extrabold">Menu</span><button class="icon-btn" data-drawer-close>${svg('x','w-5 h-5')}</button></div>
<div class="p-4 border-b border-[#e7e9ef] flex items-center gap-3"><span class="avatar avatar-lg bg-brand-500">NA</span><div><p class="font-bold text-[15px]">Nusrat Ahmed</p><p class="text-[12.5px] text-ink-500">+880 1712-345678</p><a href="${R(d)}user/profile.html" class="text-[12px] font-bold text-brand-600">View profile</a></div></div>
<div class="p-3 overflow-y-auto flex-1">
<button class="flex items-center gap-2 w-full p-3 mb-2 rounded-xl bg-ink-50 text-[13px] font-bold" data-modal-open="locationModal">${svg('pin','w-4 h-4 text-brand-500')}Dhanmondi, Dhaka<span class="ml-auto text-brand-600">Change</span></button>
<p class="dd-label">Shop products</p>${CATS.map(c=>`<a href="${R(d)}products.html" class="dd-item">${svg(c[1])}${c[0]}</a>`).join('')}
<p class="dd-label">Local services</p>${SCATS.map(c=>`<a href="${R(d)}services.html" class="dd-item">${svg(c[1])}${c[0]}</a>`).join('')}
<p class="dd-label">My account</p>
${['My Orders|user/orders.html|box','Service Bookings|user/bookings.html|cal','Wishlist|user/wishlist.html|heart','Wallet|user/wallet.html|wallet','Notifications|user/notifications.html|bell','Help Center|help-center.html|question'].map(l=>{const[t,h,i]=l.split('|');return `<a href="${R(d)}${h}" class="dd-item">${svg(i)}${t}</a>`}).join('')}
<div class="dd-sep"></div><a href="${R(d)}sell-with-us.html" class="dd-item">${svg('store')}Become a Seller</a><a href="${R(d)}login.html" class="dd-item is-danger">${svg('lock')}Sign out</a></div></div></div>

<div class="modal" id="locationModal"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel is-narrow">
<div class="flex items-center justify-between p-5 border-b border-[#e7e9ef]"><h3 class="font-display text-[17px] font-extrabold">Choose your location</h3><button class="icon-btn" data-modal-close>${svg('x','w-5 h-5')}</button></div>
<div class="p-5"><p class="text-[13px] text-ink-500 mb-4">We use your location to show nearby service providers, accurate delivery times and shipping fees.</p>
<button class="btn btn-primary btn-block mb-4" data-toast="Location detected: Dhanmondi, Dhaka">${svg('pin')}Use my current location</button>
<div class="dotted-sep my-4"></div>
<label class="label">Division</label><select class="select mb-3"><option>Dhaka</option><option>Chattogram</option><option>Khulna</option><option>Rajshahi</option><option>Sylhet</option><option>Barishal</option><option>Rangpur</option><option>Mymensingh</option></select>
<label class="label">District / City</label><select class="select mb-3"><option>Dhaka</option><option>Gazipur</option><option>Narayanganj</option><option>Savar</option></select>
<label class="label">Area / Thana</label><select class="select mb-3"><option>Dhanmondi</option><option>Gulshan</option><option>Mirpur</option><option>Uttara</option><option>Mohammadpur</option><option>Bashundhara R/A</option></select>
<label class="label">Post code <span class="text-ink-400 font-medium">(optional)</span></label><input class="input mb-4" placeholder="1209">
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Location saved">Save location</button></div></div></div></div>`;

const foot_js = d => `<script src="${R(d)}js/main.js"></script></body></html>`;

const page = ({ title, desc = 'HaatBazar — products and local services in Bangladesh.', body, active = '', bodyClass = 'bg-canvas', d = false }) =>
  `${head(title, desc, d)}\n</head>\n<body class="${bodyClass}">\n${header(d, active)}\n${body}\n${footer(d)}\n${drawers(d)}\n${foot_js(d)}`;

const bare = ({ title, desc = 'HaatBazar', body, bodyClass = 'bg-canvas', d = false }) =>
  `${head(title, desc, d)}\n</head>\n<body class="${bodyClass}">\n${body}\n${foot_js(d)}`;

const crumb = (items, d) => `<div class="bg-white border-b border-[#e7e9ef]"><div class="shell py-3"><nav class="crumb"><a href="${R(d)}index.html">Home</a>${items.map((x, i) => `${svg('chevR')}${i === items.length - 1 ? `<span class="is-current">${x.t}</span>` : `<a href="${R(d)}${x.h}">${x.t}</a>`}`).join('')}</nav></div></div>`;

const sectionHead = (title, sub, link, icon = 'sparkle', color = 'brand') => `
<div class="flex items-end justify-between gap-4 mb-4">
<div class="flex items-center gap-3"><span class="w-10 h-10 rounded-xl bg-${color}-50 text-${color}-600 grid place-items-center">${svg(icon, 'w-5 h-5')}</span>
<div><h2 class="font-display text-[19px] sm:text-[21px] font-extrabold tracking-tight">${title}</h2><p class="text-[12.5px] text-ink-500">${sub}</p></div></div>
${link ? `<a href="${link}" class="hidden sm:flex items-center gap-1 text-[13px] font-bold text-${color}-600 hover:gap-2 transition-all shrink-0">View all ${svg('chevR', 'w-4 h-4')}</a>` : ''}</div>`;

module.exports = { head, header, footer, drawers, page, bare, crumb, sectionHead, R, CATS, SCATS, foot_js };
