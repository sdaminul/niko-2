const fs = require('fs');
const { svg, ph, stars } = require('./ui');
const L = require('./layout');
const B = require('./blocks');
const { PRODUCTS: P, SERVICES: S, pcard, scard, catTile, pager, modals } = B;
const d = false;
const W = (f, o) => fs.writeFileSync(f, L.page(o));

/* ============================== CATEGORIES ============================== */
const pCats = [
  ['Electronics & Gadgets', 'monitor', ['Smartphones', 'Laptops', 'Monitors', 'Cameras', 'Headphones', 'Smart Watches', 'Power Banks', 'Printers'], '184,210'],
  ['Mobile & Tablets', 'phoneDev', ['Android Phones', 'iPhones', 'Tablets', 'Cases & Covers', 'Screen Protectors', 'Chargers', 'Cables', 'Memory Cards'], '96,420'],
  ['Fashion & Lifestyle', 'shirt', ['Men\'s Clothing', 'Women\'s Clothing', 'Sarees', 'Panjabi', 'Shoes', 'Bags', 'Watches', 'Jewellery'], '241,860'],
  ['Health & Beauty', 'drop', ['Skin Care', 'Hair Care', 'Makeup', 'Fragrances', 'Personal Care', 'Health Devices', 'Supplements', 'Baby Care'], '58,330'],
  ['Home & Living', 'home', ['Furniture', 'Bedding', 'Kitchenware', 'Home Decor', 'Lighting', 'Cleaning', 'Storage', 'Garden'], '112,940'],
  ['Groceries & Food', 'bag', ['Rice & Dal', 'Cooking Oil', 'Spices', 'Snacks', 'Beverages', 'Dairy', 'Frozen Food', 'Organic'], '41,205'],
  ['Baby, Kids & Toys', 'gift', ['Diapers', 'Baby Food', 'Toys', 'Kids Clothing', 'School Supplies', 'Strollers', 'Feeding', 'Bath'], '33,780'],
  ['Sports & Outdoor', 'dumbbell', ['Cricket', 'Football', 'Gym Equipment', 'Cycling', 'Camping', 'Sportswear', 'Yoga', 'Swimming'], '27,110'],
  ['Automobile Parts', 'car', ['Car Accessories', 'Bike Accessories', 'Engine Oil', 'Tyres', 'Batteries', 'Car Care', 'Helmets', 'Tools'], '19,640'],
  ['Books & Stationery', 'book', ['Academic Books', 'Novels', 'Islamic Books', 'Notebooks', 'Pens', 'Art Supplies', 'Office Supplies', 'Calculators'], '22,470']
];
const sCats = [
  ['Home Services', 'wrench', ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Cleaning', 'Pest Control', 'Masonry', 'Interior'], '18,220'],
  ['AC & Appliance Repair', 'fan', ['AC Service', 'Fridge Repair', 'Washing Machine', 'Microwave', 'TV Repair', 'Water Filter', 'Geyser', 'Oven'], '9,860'],
  ['Beauty & Salon', 'scissors', ['Ladies Parlour', 'Gents Salon', 'Bridal Makeup', 'Spa', 'Hair Treatment', 'Home Service', 'Nail Art', 'Skin Clinic'], '12,410'],
  ['Doctors & Clinics', 'stethoscope', ['General Physician', 'Dentist', 'Child Specialist', 'Gynaecologist', 'Diagnostic', 'Physiotherapy', 'Eye Care', 'Psychologist'], '15,970'],
  ['Tutors & Coaching', 'graduation', ['Home Tutor', 'IELTS', 'Coaching Centre', 'Online Tuition', 'Quran Teacher', 'Music', 'Art Class', 'Computer Training'], '21,540'],
  ['Restaurants & Catering', 'chef', ['Restaurants', 'Fast Food', 'Biryani House', 'Catering', 'Cake Shop', 'Chinese', 'Thai', 'Buffet'], '30,860'],
  ['Event & Wedding', 'sparkle', ['Wedding Planner', 'Photographer', 'Decorator', 'Community Centre', 'Car Rental', 'Sound System', 'Mehendi', 'Holud Stage'], '8,220'],
  ['Packers & Movers', 'truck', ['House Shifting', 'Office Shifting', 'Truck Rental', 'Pickup Van', 'Courier', 'Cargo', 'Labour', 'Storage'], '5,940'],
  ['Travel Agents', 'plane', ['Air Ticket', 'Hajj & Umrah', 'Visa Processing', 'Tour Package', 'Hotel Booking', 'Passport Help', 'Student Visa', 'Bus Ticket'], '6,780'],
  ['Pet Care', 'pet', ['Vet Doctor', 'Pet Grooming', 'Pet Shop', 'Pet Food', 'Pet Boarding', 'Training', 'Aquarium', 'Bird Care'], '2,410']
];
const catBlock = (list, tone) => list.map((c, i) => `
<div class="card overflow-hidden card-hover">
<div class="flex items-center gap-3 p-4 border-b border-[#e7e9ef]">
<span class="w-11 h-11 rounded-xl ${tone === 'service' ? 'bg-service-50 text-service-600' : 'bg-brand-50 text-brand-600'} grid place-items-center shrink-0">${svg(c[1], 'w-5 h-5')}</span>
<div class="min-w-0 flex-1"><a href="${tone === 'service' ? 'services.html' : 'products.html'}" class="text-[14.5px] font-extrabold clamp-1 hover:text-brand-600">${c[0]}</a>
<p class="text-[11.5px] text-ink-500">${c[3]} ${tone === 'service' ? 'providers' : 'products'}</p></div>
<a href="${tone === 'service' ? 'services.html' : 'products.html'}" class="btn btn-xs btn-outline shrink-0">View</a></div>
<div class="p-4 grid grid-cols-2 gap-x-3 gap-y-1.5">${c[2].map(s => `<a href="${tone === 'service' ? 'services.html' : 'products.html'}" class="text-[12.5px] text-ink-600 hover:text-brand-600 clamp-1">${s}</a>`).join('')}</div></div>`).join('');

const catsBody = `
${L.crumb([{ t: 'All Categories' }], d)}
<main class="shell py-6">
<div class="card p-5 mb-5"><h1 class="font-display text-[24px] font-extrabold tracking-tight mb-1.5">Browse all categories</h1>
<p class="text-[13px] text-ink-500 mb-4">Everything on HaatBazar in one place — 1.2 million products from 48,000 sellers and 132,000 verified service providers across 64 districts.</p>
<div class="input-group max-w-lg">${svg('search')}<input class="input" placeholder="Search a category, e.g. 'AC repair' or 'smartphones'"></div></div>

<div class="flex items-center gap-3 mb-4"><span class="w-9 h-9 rounded-xl bg-brand-500 text-white grid place-items-center">${svg('bag', 'w-4 h-4')}</span>
<div><h2 class="font-display text-[19px] font-extrabold">Shop by product category</h2><p class="text-[12.5px] text-ink-500">10 main categories · 480 sub-categories</p></div></div>
<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-9">${catBlock(pCats, 'product')}</div>

<div class="flex items-center gap-3 mb-4"><span class="w-9 h-9 rounded-xl bg-service-500 text-white grid place-items-center">${svg('wrench', 'w-4 h-4')}</span>
<div><h2 class="font-display text-[19px] font-extrabold">Find a local service</h2><p class="text-[12.5px] text-ink-500">10 main categories · 360 sub-categories</p></div></div>
<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-9">${catBlock(sCats, 'service')}</div>

<div class="card p-5"><h2 class="font-display text-[17px] font-extrabold mb-3">Browse by city</h2>
<div class="flex flex-wrap gap-2">${['Dhaka', 'Chattogram', 'Khulna', 'Rajshahi', 'Sylhet', 'Barishal', 'Rangpur', 'Mymensingh', 'Cumilla', 'Narayanganj', 'Gazipur', 'Bogura', 'Jessore', 'Cox\'s Bazar', 'Dinajpur', 'Faridpur', 'Tangail', 'Pabna'].map(c => `<a href="services.html" class="chip">${svg('pin', 'w-3.5 h-3.5')}${c}</a>`).join('')}</div></div>
</main>${modals(d)}`;
W('categories.html', { title: 'All Categories', body: catsBody, active: 'categories' });

/* ============================== SHOPS ============================== */
const shops = [
  ['Realme Official Store', 'Mall', 'Mirpur 10, Dhaka', 4.8, '12,480', 'Electronics', 'phoneDev'],
  ['Rongdhonu Fashion', 'Verified', 'Narayanganj', 4.7, '3,120', 'Fashion', 'shirt'],
  ['Khaas Food Corner', 'Verified', 'Gulshan, Dhaka', 4.9, '860', 'Groceries', 'bag'],
  ['Gadget Hub BD', 'Mall', 'Elephant Road, Dhaka', 4.6, '9,340', 'Electronics', 'monitor'],
  ['Aarong Home', 'Mall', 'Tejgaon, Dhaka', 4.8, '5,720', 'Home & Living', 'home'],
  ['Bikroy Sports', 'Verified', 'Chattogram', 4.5, '1,940', 'Sports', 'dumbbell'],
  ['Nokshi Handicrafts', 'New', 'Jamalpur', 4.4, '420', 'Handicrafts', 'gift'],
  ['Walton Plaza Online', 'Mall', 'Gazipur', 4.7, '14,210', 'Appliances', 'monitor'],
  ['BookWorm BD', 'Verified', 'Banglabazar, Dhaka', 4.9, '18,600', 'Books', 'book'],
  ['Green Pharma', 'Verified', 'Dhanmondi, Dhaka', 4.8, '2,380', 'Health', 'drop'],
  ['AutoParts Express', 'Verified', 'Bangshal, Dhaka', 4.3, '6,140', 'Automobile', 'car'],
  ['Little Star Kids', 'New', 'Sylhet', 4.6, '780', 'Baby & Kids', 'gift']
];
const shopsBody = `
${L.crumb([{ t: 'Shops & Sellers' }], d)}
<main class="shell py-6">
<div class="card p-5 mb-5"><h1 class="font-display text-[24px] font-extrabold tracking-tight mb-1.5">Shops &amp; sellers</h1>
<p class="text-[13px] text-ink-500 mb-4">48,320 verified sellers across Bangladesh. Every shop is identity-verified and rated by real buyers.</p>
<div class="flex flex-col sm:flex-row gap-2.5">
<div class="input-group flex-1">${svg('search')}<input class="input" placeholder="Search shop name…"></div>
<select class="select sm:w-44"><option>All categories</option>${pCats.map(c => `<option>${c[0]}</option>`).join('')}</select>
<select class="select sm:w-40"><option>All cities</option><option>Dhaka</option><option>Chattogram</option><option>Sylhet</option><option>Khulna</option></select>
<button class="btn btn-primary">${svg('search')}Search</button></div></div>
<div class="flex flex-wrap gap-2 mb-4">${['All shops', 'Mall stores', 'Top rated', 'Newly joined', 'Local shops', 'Free delivery', 'Fastest shipping'].map((x, i) => `<button class="chip ${i === 0 ? 'is-active' : ''}">${x}</button>`).join('')}</div>
<div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
${shops.map((s, i) => `<div class="card overflow-hidden card-hover">
<div class="relative h-[74px] ph ${['ph-a', 'ph-b', 'ph-c', 'ph-d', 'ph-e', 'ph-f'][i % 6]} grid-noise"></div>
<div class="px-4 pb-4 -mt-7">
<div class="w-14 h-14 rounded-2xl bg-white p-1 shadow-soft mb-2.5">${ph(i, s[6], 'w-full h-full rounded-xl')}</div>
<div class="flex items-center gap-1.5 mb-1"><a href="shop-profile.html" class="text-[14px] font-extrabold clamp-1 hover:text-brand-600">${s[0]}</a>
<span class="badge ${s[1] === 'Mall' ? 'badge-dark' : s[1] === 'New' ? 'badge-blue' : 'badge-green'} shrink-0">${s[1]}</span></div>
<p class="text-[11.5px] text-ink-500 flex items-center gap-1 mb-2">${svg('pin', 'w-3.5 h-3.5')}${s[2]} · ${s[5]}</p>
<div class="flex items-center gap-2 text-[12px] mb-3">${stars(s[3])}<b>${s[3]}</b><span class="text-ink-400">· ${s[4]} products</span></div>
<div class="flex gap-2"><a href="shop-profile.html" class="btn btn-xs btn-outline flex-1">Visit shop</a><button class="btn btn-xs btn-primary" data-toast="Following">Follow</button></div></div></div>`).join('')}</div>
${pager(d)}
<div class="card p-6 mt-6 bg-ink-950 text-white flex flex-col md:flex-row items-center gap-5">
<div class="flex-1"><h2 class="font-display text-[20px] font-extrabold mb-1.5">Want your shop listed here?</h2>
<p class="text-[13px] text-white/70">Join 48,000+ sellers. Zero commission for the first 3 months, free product photography in Dhaka and same-day payouts.</p></div>
<div class="flex gap-2"><a href="become-seller.html" class="btn btn-primary">Start selling</a><a href="seller-register.html" class="btn !bg-white/10 !text-white">Create seller account</a></div></div>
</main>${modals(d)}`;
W('shops.html', { title: 'Shops & Sellers', body: shopsBody });

/* ============================== SHOP PROFILE ============================== */
const shopBody = `
${L.crumb([{ t: 'Shops', h: 'shops.html' }, { t: 'Realme Official Store' }], d)}
<main class="shell py-5">
<div class="card overflow-hidden mb-4">
<div class="relative h-[130px] sm:h-[190px] ph ph-a grid-noise"><button class="absolute top-3 right-3 btn btn-sm !bg-white/90 !text-ink-900">${svg('camera')}Store gallery</button></div>
<div class="p-4 sm:p-5"><div class="flex flex-col sm:flex-row gap-4 -mt-16 sm:-mt-14">
<div class="w-[92px] h-[92px] rounded-2xl bg-white p-1.5 shadow-pop shrink-0">${ph(1, 'store', 'w-full h-full rounded-xl')}</div>
<div class="flex-1 min-w-0 sm:pt-14">
<div class="flex flex-wrap items-center gap-2 mb-1"><h1 class="font-display text-[22px] sm:text-[26px] font-extrabold tracking-tight">Realme Official Store</h1>
<span class="badge badge-dark">${svg('award')}Mall</span><span class="badge badge-green">${svg('shield')}Verified seller</span><span class="badge badge-amber">${svg('bolt')}Fast shipper</span></div>
<p class="text-[13px] text-ink-500 mb-3">Official brand store · Mirpur 10, Dhaka · Joined March 2021 · 12,480 products</p>
<div class="flex flex-wrap gap-2"><button class="btn btn-primary" data-toast="You are now following this store">${svg('plus')}Follow store (128k)</button>
<button class="btn btn-outline">${svg('msg')}Chat with seller</button><button class="btn btn-outline">${svg('phone')}Call shop</button>
<button class="btn btn-outline btn-icon" aria-label="Share">${svg('share', 'w-5 h-5')}</button><button class="btn btn-outline btn-icon" aria-label="Report">${svg('flag', 'w-5 h-5')}</button></div></div></div>
<div class="grid grid-cols-2 md:grid-cols-5 gap-2.5 mt-4">${[['4.8/5', 'Seller rating', 'star'], ['98%', 'On-time shipping', 'truck'], ['~8 min', 'Chat response', 'msg'], ['0.4%', 'Return rate', 'return'], ['128k', 'Followers', 'users']].map(x => `<div class="p-3 rounded-xl bg-ink-50 text-center"><span class="w-8 h-8 rounded-lg bg-white text-brand-500 grid place-items-center mx-auto mb-1.5">${svg(x[2], 'w-4 h-4')}</span><p class="text-[16px] font-extrabold">${x[0]}</p><p class="text-[11px] text-ink-500">${x[1]}</p></div>`).join('')}</div></div></div>

<div class="card mb-4"><div class="tabs px-4" data-tabs>${['All products', 'Flash deals', 'New arrivals', 'Best sellers', 'Vouchers', 'Reviews', 'About the shop'].map((t, i) => `<button class="tab ${i === 0 ? 'is-active' : ''}" data-tab="${i}">${t}</button>`).join('')}</div>
<div class="p-4 sm:p-5" data-tab-panel="0">
<div class="flex flex-wrap gap-2 mb-4">${['All (12,480)', 'Smartphones', 'Earbuds', 'Watches', 'Chargers', 'Cases', 'Power banks'].map((x, i) => `<button class="chip ${i === 0 ? 'is-active' : ''}">${x}</button>`).join('')}</div>
<div class="flex flex-wrap items-center gap-2 mb-4"><span class="text-[12.5px] text-ink-500">Sort:</span>${['Popular', 'Newest', 'Price ↑', 'Price ↓', 'Top rated'].map((x, i) => `<button class="chip !h-8 ${i === 0 ? 'is-active' : ''}">${x}</button>`).join('')}
<div class="ml-auto"><div class="input-group w-56">${svg('search')}<input class="input input-sm" placeholder="Search in this store"></div></div></div>
<div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">${[...P, ...P.slice(0, 5)].map((p, i) => pcard(p, i, d)).join('')}</div>
${pager(d)}</div>
<div class="p-5" data-tab-panel="1" hidden>
<div class="rounded-2xl ph ph-a p-5 mb-4 flex flex-wrap items-center gap-4 text-white"><div class="relative z-10 flex-1"><p class="font-display text-[19px] font-extrabold">Store flash sale — up to 42% off</p><p class="text-[12.5px] text-white/80">Ends in 04:12:52 · limited stock</p></div>
<div class="relative z-10 flex gap-1.5">${['04', '12', '52'].map(t => `<span class="w-11 h-11 rounded-xl bg-white/15 grid place-items-center font-display text-[17px] font-extrabold mono">${t}</span>`).join('')}</div></div>
<div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">${P.slice(0, 10).map((p, i) => pcard(p, i, d)).join('')}</div></div>
<div class="p-5" data-tab-panel="2" hidden><div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">${P.slice(2, 12).map((p, i) => pcard(p, i + 2, d)).join('')}</div></div>
<div class="p-5" data-tab-panel="3" hidden><div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">${P.slice(1, 11).map((p, i) => pcard(p, i + 1, d)).join('')}</div></div>
<div class="p-5" data-tab-panel="4" hidden><div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
${[['৳300 OFF', 'Min. spend ৳5,000', 'RLM300', '3 days left'], ['12% OFF', 'Max discount ৳800', 'RLM12', '6 days left'], ['Free delivery', 'On orders above ৳1,500', 'RLMSHIP', '10 days left'], ['৳1,000 OFF', 'On smartphones above ৳15,000', 'RLM1000', '2 days left'], ['5% cashback', 'bKash payment only', 'RLMBK5', '1 week left'], ['Buy 2 get 1', 'On accessories', 'RLMB2G1', '5 days left']]
.map(v => `<div class="flex items-center rounded-xl border border-dashed border-brand-300 bg-brand-50/40 overflow-hidden">
<div class="w-[92px] shrink-0 bg-brand-500 text-white p-3 text-center"><p class="font-display text-[15px] font-extrabold leading-tight">${v[0]}</p></div>
<div class="flex-1 min-w-0 p-3"><p class="text-[12.5px] font-bold clamp-1">${v[1]}</p><p class="text-[11.5px] text-ink-500 mono">Code: ${v[2]}</p><p class="text-[11px] text-brand-600 font-bold mt-0.5">${v[3]}</p></div>
<button class="btn btn-xs btn-primary mr-3 shrink-0" data-toast="Voucher collected">Collect</button></div>`).join('')}</div></div>
<div class="p-5" data-tab-panel="5" hidden>
<div class="grid md:grid-cols-[220px_1fr] gap-6 pb-5 border-b border-[#f0f1f5]">
<div class="text-center"><p class="font-display text-[42px] font-extrabold leading-none">4.8</p>${stars(4.8, 'stars-lg')}<p class="text-[12.5px] text-ink-500 mt-1.5">32,410 store ratings</p></div>
<div class="space-y-2">${[[5, 86], [4, 9], [3, 3], [2, 1], [1, 1]].map(r => `<div class="flex items-center gap-3"><span class="text-[12.5px] font-bold w-8">${r[0]}★</span><div class="bar flex-1"><i style="width:${r[1]}%"></i></div><span class="text-[12px] text-ink-500 w-10 text-right">${r[1]}%</span></div>`).join('')}</div></div>
<div class="divide-y divide-[#f0f1f5]">${[['Imran Hossain', '4.5', '2 days ago', 'Genuine products and quick delivery. The seller replied to my query within 5 minutes.'], ['Sadia Islam', '5', '5 days ago', 'Bought a phone and earbuds — both original with warranty cards. Packaging was excellent.'], ['Rakib Mia', '4', '1 week ago', 'Product was fine, but delivery took one day longer than promised.']].map(r => `<div class="py-4 flex gap-3"><span class="avatar avatar-md bg-ink-700">${r[0][0]}</span><div class="flex-1 min-w-0"><div class="flex items-center gap-2"><p class="text-[13.5px] font-extrabold">${r[0]}</p><span class="text-[11.5px] text-ink-400 ml-auto">${r[2]}</span></div>${stars(Number(r[1]))}<p class="text-[13px] text-ink-700 mt-1.5">${r[3]}</p></div></div>`).join('')}</div></div>
<div class="p-5" data-tab-panel="6" hidden>
<div class="grid md:grid-cols-2 gap-6">
<div><h3 class="text-[15px] font-extrabold mb-2">About the store</h3>
<p class="text-[13px] text-ink-600 leading-relaxed mb-4">Realme Official Store is the authorised online outlet of Realme Bangladesh. Every device sold here carries official BTRC approval and a full manufacturer warranty serviced through 46 care centres nationwide.</p>
<div class="space-y-2.5">${[['Business name', 'Realme Bangladesh Ltd.'], ['Store type', 'Brand / Mall store'], ['Trade licence', 'Verified'], ['Established', '2021'], ['Warehouse', 'Mirpur 10 &amp; Tejgaon, Dhaka'], ['Ships to', 'All 64 districts'], ['Return window', '7 days'], ['Support hours', '9 AM – 10 PM daily']].map(x => `<div class="flex gap-3 py-2 border-b border-[#f4f5f8]"><span class="w-[40%] shrink-0 text-[12.5px] font-bold text-ink-500">${x[0]}</span><span class="text-[13px] text-ink-800">${x[1]}</span></div>`).join('')}</div></div>
<div><h3 class="text-[15px] font-extrabold mb-2">Store policies</h3>
<div class="space-y-3">${[['return', 'Returns', '7-day return for damaged, defective or wrong items. Free pickup.'], ['shield', 'Warranty', 'Official manufacturer warranty on all devices; 6 months on accessories.'], ['truck', 'Shipping', 'Same-day dispatch for orders before 4 PM. Free shipping above ৳2,000.'], ['money', 'Payment', 'bKash, Nagad, Rocket, cards, EMI and cash on delivery.']].map(x => `<div class="flex gap-3 p-3.5 rounded-xl border border-[#e7e9ef]"><span class="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 grid place-items-center shrink-0">${svg(x[0], 'w-4 h-4')}</span><div><p class="text-[13px] font-extrabold">${x[1]}</p><p class="text-[12px] text-ink-500">${x[2]}</p></div></div>`).join('')}</div>
<h3 class="text-[15px] font-extrabold mt-5 mb-2">Physical outlets</h3>
<div class="rounded-xl overflow-hidden border border-[#e7e9ef] mb-2">${ph(9, 'pin', 'h-[150px] w-full')}</div>
<p class="text-[12.5px] text-ink-600">Shop 214, Level 2, Mirpur Shopping Complex, Mirpur 10, Dhaka 1216 · 10 AM – 9 PM</p></div></div></div>
</div>
</main>${modals(d)}`;
W('shop-profile.html', { title: 'Realme Official Store — Shop Profile', body: shopBody });

/* ============================== OFFERS ============================== */
const offersBody = `
${L.crumb([{ t: 'Offers & Deals' }], d)}
<main class="shell py-6">
<div class="rounded-2xl overflow-hidden ph ph-a p-6 sm:p-9 mb-5 text-white relative">
<div class="relative z-10 max-w-xl"><span class="badge !bg-white/20 !text-white mb-2">${svg('bolt')}Mega Sale 2026</span>
<h1 class="font-display text-[28px] sm:text-[38px] font-extrabold tracking-tight mb-2">Up to 70% off on 1.2M products &amp; services</h1>
<p class="text-[13.5px] text-white/85 mb-4">Flash deals refresh every 6 hours. Collect vouchers, stack cashback and get free delivery all week.</p>
<div class="flex gap-2">${[['04', 'Hours'], ['12', 'Min'], ['52', 'Sec']].map(t => `<div class="text-center"><span class="w-14 h-14 rounded-xl bg-white/15 grid place-items-center font-display text-[20px] font-extrabold mono">${t[0]}</span><p class="text-[10.5px] mt-1 text-white/70">${t[1]}</p></div>`).join('')}</div></div></div>

<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">${[['Flash deals', 'Ends in 4 hours', 'bolt', 'ph-a'], ['Voucher centre', '24 coupons to collect', 'ticket', 'ph-b'], ['Free delivery zone', 'No shipping fee', 'truck', 'ph-c'], ['Clearance', 'Last pieces up to 70% off', 'tag', 'ph-d']].map(x => `<a href="#" class="card p-4 card-hover flex items-center gap-3"><span class="w-11 h-11 rounded-xl ph ${x[3]} grid place-items-center text-white shrink-0">${svg(x[2], 'w-5 h-5')}</span><div class="min-w-0"><p class="text-[13.5px] font-extrabold clamp-1">${x[0]}</p><p class="text-[12px] text-ink-500 clamp-1">${x[1]}</p></div></a>`).join('')}</div>

<div class="card p-4 sm:p-5 mb-5">${L.sectionHead('Flash deals ending soon', 'Grab them before stock runs out', 'products.html', 'bolt')}
<div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">${P.slice(0, 10).map((p, i) => pcard(p, i, d)).join('')}</div></div>

<div class="card p-4 sm:p-5 mb-5">${L.sectionHead('Collect vouchers', 'Apply at checkout — stackable with bank offers', '', 'ticket')}
<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
${[['৳500 OFF', 'Orders above ৳5,000', 'MEGA500', 'All categories'], ['15% OFF', 'Max ৳1,200 discount', 'FASHION15', 'Fashion only'], ['Free delivery', 'No minimum spend', 'SHIPFREE', 'Inside Dhaka'], ['৳200 OFF', 'Orders above ৳1,000', 'GROCERY200', 'Groceries'], ['20% cashback', 'Max ৳500 · bKash', 'BKASH20', 'All payments'], ['৳1,000 OFF', 'Electronics above ৳20,000', 'TECH1000', 'Electronics'], ['25% OFF', 'First service booking', 'SERVICE25', 'Services'], ['৳150 OFF', 'On AC servicing', 'ACCARE150', 'Home services'], ['10% OFF', 'Restaurant orders', 'FOOD10', 'Food & dining']]
.map((v, i) => `<div class="flex items-center rounded-xl border border-dashed ${i % 3 === 0 ? 'border-brand-300 bg-brand-50/40' : i % 3 === 1 ? 'border-service-300 bg-service-50/40' : 'border-gold-300 bg-gold-50/40'} overflow-hidden">
<div class="w-[104px] shrink-0 ${i % 3 === 0 ? 'bg-brand-500' : i % 3 === 1 ? 'bg-service-500' : 'bg-gold-400'} text-white p-3.5 text-center"><p class="font-display text-[16px] font-extrabold leading-tight">${v[0]}</p></div>
<div class="flex-1 min-w-0 p-3"><p class="text-[12.5px] font-bold clamp-1">${v[1]}</p><p class="text-[11.5px] text-ink-500">${v[3]}</p><p class="text-[11.5px] font-extrabold mono mt-0.5">${v[2]}</p></div>
<button class="btn btn-xs btn-dark mr-3 shrink-0" data-toast="Voucher collected">Collect</button></div>`).join('')}</div></div>

<div class="card p-4 sm:p-5 mb-5">${L.sectionHead('Bank & payment offers', 'Extra savings with partner banks', '', 'money')}
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">${[['bKash', '10% cashback up to ৳300', 'Every Friday'], ['City Bank', '0% EMI up to 12 months', 'Amex & Visa'], ['BRAC Bank', '৳500 instant discount', 'Min ৳8,000'], ['Nagad', '15% cashback on groceries', 'Weekends only']].map(x => `<div class="p-4 rounded-xl border border-[#e7e9ef]"><div class="w-16 h-9 rounded bg-ink-100 grid place-items-center text-[11px] font-extrabold text-ink-600 mb-2.5">${x[0]}</div><p class="text-[13px] font-extrabold mb-0.5">${x[1]}</p><p class="text-[11.5px] text-ink-500">${x[2]}</p></div>`).join('')}</div></div>

<div class="card p-4 sm:p-5">${L.sectionHead('Service deals near you', 'Book verified professionals for less', 'services.html', 'wrench', 'service')}
<div class="grid md:grid-cols-2 gap-3.5">${S.slice(0, 4).map((s, i) => scard(s, i, d)).join('')}</div></div>
</main>${modals(d)}`;
W('offers.html', { title: 'Offers & Deals', body: offersBody });

/* ============================== BRANDS ============================== */
const brandList = ['Samsung', 'Xiaomi', 'Realme', 'Walton', 'Vivo', 'Oppo', 'Infinix', 'Tecno', 'Apple', 'OnePlus', 'Nokia', 'Symphony', 'Gree', 'Singer', 'Marcel', 'Vision', 'Minister', 'Konka', 'Aarong', 'Yellow', 'Ecstasy', 'Sailor', 'Bata', 'Apex', 'Lotto', 'Fay', 'Le Reve', 'Cats Eye', 'Pran', 'Square', 'ACI', 'Fresh', 'Teer', 'Rupchanda', 'Radhuni', 'Nestlé', 'Unilever', 'Lux', 'Dove', 'Himalaya', 'Nivea', 'Garnier', 'Loreal', 'Sunsilk', 'Anker', 'Logitech', 'HP', 'Dell', 'Lenovo', 'Asus', 'Acer', 'Canon'];
const brandsBody = `
${L.crumb([{ t: 'Brands' }], d)}
<main class="shell py-6">
<div class="card p-5 mb-5"><h1 class="font-display text-[24px] font-extrabold tracking-tight mb-1.5">Shop by brand</h1>
<p class="text-[13px] text-ink-500 mb-4">1,240 official and authorised brands on HaatBazar — 100% genuine products with brand warranty.</p>
<div class="input-group max-w-lg">${svg('search')}<input class="input" placeholder="Search a brand…"></div></div>
<div class="card p-4 sm:p-5 mb-5">${L.sectionHead('Featured brand stores', 'Official outlets with exclusive launches', 'shops.html', 'award')}
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">${['Samsung', 'Walton', 'Aarong', 'Pran'].map((b, i) => `<a href="shop-profile.html" class="card-hover rounded-2xl overflow-hidden border border-[#e7e9ef]"><div class="ph ${['ph-a', 'ph-b', 'ph-c', 'ph-d'][i]} h-[92px] grid-noise"></div>
<div class="p-3.5"><p class="text-[14px] font-extrabold">${b}</p><p class="text-[11.5px] text-ink-500">Official store · 4.8★ · ${(i + 3) * 1240} products</p></div></a>`).join('')}</div></div>
<div class="card p-4 sm:p-5">
<div class="flex flex-wrap gap-1.5 mb-4">${['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')].map((x, i) => `<button class="chip !h-8 !px-3 ${i === 0 ? 'is-active' : ''}">${x}</button>`).join('')}</div>
<div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">${brandList.map((b, i) => `<a href="products.html" class="p-3.5 rounded-xl border border-[#e7e9ef] hover:border-brand-200 hover:shadow-soft text-center">
${ph(i, 'award', 'w-12 h-12 rounded-xl mx-auto mb-2')}<p class="text-[12.5px] font-bold clamp-1">${b}</p><p class="text-[11px] text-ink-400">${(i * 37 + 120)} products</p></a>`).join('')}</div>
${pager(d)}</div>
</main>${modals(d)}`;
W('brands.html', { title: 'Brands', body: brandsBody });

/* ============================== SEARCH RESULTS ============================== */
const searchBody = `
<main class="shell py-6">
<div class="mb-4"><h1 class="font-display text-[22px] font-extrabold tracking-tight">Search results for “<span class="text-brand-600">ac repair</span>”</h1>
<p class="text-[12.5px] text-ink-500 mt-1">4,128 results · 312 products · 3,816 services · showing results near Dhanmondi, Dhaka</p></div>
<div class="card p-3.5 mb-4 flex flex-wrap items-center gap-2">
<div class="seg"><button class="is-active">All (4,128)</button><button>Products (312)</button><button>Services (3,816)</button><button>Shops (48)</button><button>Blog (12)</button></div>
<div class="ml-auto flex flex-wrap gap-1.5">${['Best match', 'Nearest', 'Top rated', 'Price ↑', 'Newest'].map((x, i) => `<button class="chip !h-8 ${i === 0 ? 'is-active' : ''}">${x}</button>`).join('')}</div></div>
<div class="card p-3.5 mb-5 flex flex-wrap items-center gap-2 text-[12.5px]">
<span class="text-ink-500">Did you mean:</span>${['ac servicing', 'ac gas refill', 'ac installation', 'air conditioner parts'].map(x => `<a href="search.html" class="link">${x}</a>`).join('<span class="text-ink-300">·</span>')}</div>

<div class="card p-4 sm:p-5 mb-5">${L.sectionHead('Service providers matching “ac repair”', '3,816 verified providers near you', 'services.html', 'wrench', 'service')}
<div class="space-y-3.5">${S.slice(0, 4).map((s, i) => scard(s, i, d)).join('')}</div>
<a href="services.html" class="btn btn-outline btn-block mt-4">View all 3,816 service providers ${svg('chevR')}</a></div>

<div class="card p-4 sm:p-5 mb-5">${L.sectionHead('Products matching “ac repair”', 'Parts, tools and accessories', 'products.html', 'bag')}
<div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">${P.slice(0, 10).map((p, i) => pcard(p, i, d)).join('')}</div>
<a href="products.html" class="btn btn-outline btn-block mt-4">View all 312 products ${svg('chevR')}</a></div>

<div class="card p-4 sm:p-5 mb-5">${L.sectionHead('Shops matching your search', 'Verified sellers', 'shops.html', 'store')}
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">${shops.slice(0, 4).map((s, i) => `<div class="p-4 rounded-xl border border-[#e7e9ef] flex gap-3">${ph(i, s[6], 'w-12 h-12 rounded-xl shrink-0')}<div class="min-w-0"><a href="shop-profile.html" class="text-[13px] font-extrabold clamp-1">${s[0]}</a><p class="text-[11.5px] text-ink-500 clamp-1">${s[2]}</p><div class="flex items-center gap-1 mt-1">${stars(s[3])}<span class="text-[11px] text-ink-400">${s[3]}</span></div></div></div>`).join('')}</div></div>

<div class="card p-5"><h2 class="text-[15px] font-extrabold mb-3">Related searches</h2>
<div class="flex flex-wrap gap-2">${['ac servicing dhanmondi', 'ac gas refill price', 'split ac installation cost', 'window ac repair', 'ac compressor price bd', 'ac remote', 'ac stabilizer', 'ac amc package', 'refrigerator repair', 'washing machine repair'].map(x => `<a href="search.html" class="chip">${svg('search', 'w-3.5 h-3.5')}${x}</a>`).join('')}</div></div>
</main>${modals(d)}`;
W('search.html', { title: 'Search Results', body: searchBody });
console.log('categories, shops, shop-profile, offers, brands, search');
