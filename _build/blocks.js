const { svg, tk, ph, stars } = require('./ui');
const { R } = require('./layout');

// ---------------- data -------------------------------------------------
const PRODUCTS = [
  ['Realme C100x 6/128GB 8000mAh 45W 6.8"', 11499, 13999, 4.6, 1240, 'phoneDev', 'Realme Official Store', 'Dhaka', 18],
  ['Walton 1.5 Ton Inverter Split AC WSI-KRYSTALINE', 54900, 62500, 4.4, 386, 'fan', 'Walton Plaza Mirpur', 'Dhaka', 12],
  ['Xiaomi Redmi Note 13 Pro 8/256GB Global', 28990, 32990, 4.8, 2114, 'phoneDev', 'Gadget Hub BD', 'Dhaka', 12],
  ['Original Jamdani Half Silk Saree with Blouse Piece', 4850, 6200, 4.7, 512, 'shirt', 'Tangail Weavers House', 'Tangail', 22],
  ['Havit HV-H2002d Wired Gaming Headphone RGB', 1890, 2450, 4.3, 891, 'mic', 'Star Tech Digital', 'Dhaka', 23],
  ['Aarong Cotton Panjabi — Embroidered Chest', 2450, 2900, 4.5, 274, 'shirt', 'Aarong Official', 'Dhaka', 15],
  ['Anker 323 PowerBank 20000mAh 22.5W PD', 3290, 3990, 4.9, 1533, 'wallet', 'Anker Bangladesh', 'Dhaka', 17],
  ['Sunflower Organic Honey 500gm — Sundarban', 690, 850, 4.6, 402, 'drop', 'Khaas Food', 'Dhaka', 19],
  ['Asus Vivobook 15 Core i5 12th Gen 8/512GB', 78500, 85000, 4.5, 168, 'monitor', 'Ryans Computers', 'Dhaka', 8],
  ['Philips HL7756 Mixer Grinder 750W 3 Jars', 8450, 9900, 4.2, 96, 'fan', 'Electro Mart', 'Chattogram', 15],
  ['Nike Revolution 6 Running Shoes — Men', 6950, 8500, 4.7, 355, 'dumbbell', 'Sports World BD', 'Dhaka', 18],
  ['Lotus Herbals Whiteglow Gel Cream SPF25 60g', 1150, 1450, 4.4, 738, 'drop', 'Beauty Box BD', 'Dhaka', 21],
  ['Rooftop Gardening Starter Kit — 12 items', 2350, 2999, 4.3, 61, 'drop', 'Green Nursery', 'Savar', 22],
  ['Baby Diaper Pants XL 44pcs — Savlon Care', 1290, 1490, 4.6, 289, 'gift', 'Baby Care Zone', 'Dhaka', 13],
  ['Steel Non-Stick Cookware Set 5pcs Kiam', 4590, 5600, 4.1, 143, 'chef', 'Kiam Metal Store', 'Dhaka', 18],
  ['Bosch Cordless Drill Machine 12V + 30 Bits', 9250, 11200, 4.8, 77, 'wrench', 'Tools Bazar BD', 'Dhaka', 17]
];

const SERVICES = [
  ['Rahim Electric &amp; Wiring Service', 'Electricians', 4.7, 624, 'Mirpur 10, Dhaka', 'wrench', '৳400 – ৳2,500', 11, 'Open now · Closes 10 PM', ['Emergency 24/7', 'Free estimate', 'Verified'], 0.8],
  ['CoolCare AC Servicing &amp; Repair', 'AC Repair &amp; Service', 4.8, 1032, 'Uttara Sector 7, Dhaka', 'fan', '৳600 – ৳3,500', 9, 'Open now · Closes 9 PM', ['Same-day service', 'Warranty 90 days', 'Verified'], 2.4],
  ['Glam Studio — Ladies Beauty Parlour', 'Beauty Parlour', 4.6, 489, 'Dhanmondi 27, Dhaka', 'scissors', '৳500 – ৳12,000', 7, 'Open now · Closes 8 PM', ['Home service', 'Bridal package', 'AC lounge'], 1.2],
  ['Dr. Farhana Rahman — Skin &amp; Laser', 'Dermatologist', 4.9, 318, 'Green Road, Dhaka', 'stethoscope', '৳800 consultation', 14, 'Chamber: 5 PM – 9 PM', ['Online booking', 'MBBS, FCPS', 'Card accepted'], 3.1],
  ['Scholars Home Tutor Network', 'Home Tutors', 4.5, 742, 'Mohammadpur, Dhaka', 'graduation', '৳3,000 – ৳12,000/mo', 6, 'Open now · Closes 11 PM', ['Demo class free', 'All boards', 'Female tutor'], 1.9],
  ['Nawab Bari Kacchi &amp; Catering', 'Restaurants &amp; Catering', 4.4, 2841, 'Bailey Road, Dhaka', 'chef', '৳250 for two', 5, 'Open now · Closes 12 AM', ['Home delivery', 'Party order', 'Pure halal'], 0.6],
  ['Dream Wedding Event Planners', 'Event &amp; Wedding Planner', 4.7, 213, 'Banani 11, Dhaka', 'sparkle', '৳25,000 onwards', 12, 'Open now · Closes 8 PM', ['Full package', 'Photography', 'Stage decor'], 4.2],
  ['Speedy Packers &amp; Movers BD', 'Packers &amp; Movers', 4.3, 566, 'Badda Link Road, Dhaka', 'truck', '৳3,500 onwards', 8, 'Open 24 hours', ['Insured shifting', 'Labour included', 'Truck fleet'], 3.7],
  ['CleanPro Home &amp; Office Cleaning', 'Cleaning Services', 4.6, 421, 'Bashundhara R/A, Dhaka', 'broom', '৳1,200 onwards', 4, 'Open now · Closes 9 PM', ['Deep cleaning', 'Eco chemicals', 'Trained staff'], 5.1],
  ['Rider Auto Care — Car Servicing', 'Car Repair &amp; Service', 4.5, 289, 'Tejgaon I/A, Dhaka', 'car', '৳2,000 onwards', 10, 'Open now · Closes 8 PM', ['Pickup & drop', 'Genuine parts', 'Diagnostics'], 2.8],
  ['PawLove Veterinary &amp; Pet Grooming', 'Veterinary &amp; Pet Care', 4.8, 176, 'Gulshan 2, Dhaka', 'pet', '৳700 onwards', 6, 'Open now · Closes 7 PM', ['Vaccination', 'Grooming', 'Home visit'], 4.6],
  ['SkyHigh Travels — Visa &amp; Air Ticket', 'Travel Agents', 4.4, 934, 'Motijheel C/A, Dhaka', 'plane', 'Free consultation', 9, 'Open now · Closes 6 PM', ['Visa processing', 'Umrah package', 'IATA agent'], 6.3]
];

// ---------------- cards ------------------------------------------------
const pcard = (p, i, d, opts = {}) => {
  const [t, price, old, rate, sold, icon, shop, city, off] = p;
  return `<article class="pcard card-hover group">
<a href="${R(d)}product-details.html" class="block relative">
${off ? `<span class="discount-flag">-${off}%</span>` : ''}
${i % 5 === 0 ? '<span class="absolute top-8 left-2 z-[2] badge badge-dark !text-[10px]">Mall</span>' : ''}
${ph(i, icon, 'ratio-sq w-full')}
</a>
<button class="wish-btn" data-toggle-class="is-on" aria-label="Add to wishlist">${svg('heart', 'w-4 h-4')}</button>
<div class="pcard-body">
<a href="${R(d)}product-details.html" class="pcard-title block mb-1.5">${t}</a>
<div class="flex items-end gap-2 mb-1"><span class="price">${tk(price)}</span>${old ? `<span class="price-old">${tk(old)}</span>` : ''}</div>
<div class="flex items-center gap-1.5 mb-2">${stars(rate)}<span class="text-2xs text-ink-400">(${sold.toLocaleString()})</span><span class="text-2xs text-ink-400 ml-auto">${sold > 800 ? `${(sold / 100).toFixed(1)}k sold` : `${sold} sold`}</span></div>
<div class="flex items-center gap-1.5 text-2xs text-ink-500 mb-2.5">${svg('pin', 'w-3 h-3')}<span class="clamp-1">${city}</span><span class="text-ink-200">|</span><span class="clamp-1">${shop}</span></div>
${opts.hideCta ? '' : `<div class="flex gap-1.5"><button class="btn btn-sm btn-primary flex-1" data-toast="Added to cart">${svg('cart')}Add to cart</button>
<button class="btn btn-sm btn-outline btn-icon !w-9" data-modal-open="quickViewModal" aria-label="Quick view">${svg('eye')}</button></div>`}
</div></article>`;
};

const scard = (s, i, d) => {
  const [name, cat, rate, rev, addr, icon, price, yrs, hours, tags, km] = s;
  return `<article class="card card-hover overflow-hidden">
<div class="flex gap-3.5 p-3.5">
<a href="${R(d)}service-details.html" class="shrink-0">${ph(i + 3, icon, 'w-[84px] h-[84px] sm:w-[104px] sm:h-[104px] rounded-xl')}</a>
<div class="min-w-0 flex-1">
<div class="flex items-start gap-2">
<div class="min-w-0"><a href="${R(d)}service-details.html" class="font-display text-[15px] font-extrabold text-ink-900 hover:text-service-600 clamp-1">${name}</a>
<p class="text-[12px] text-ink-500 mt-0.5 clamp-1">${cat} · ${yrs} yrs in business</p></div>
<span class="badge badge-teal ml-auto shrink-0">${svg('shield')}Verified</span></div>
<div class="flex flex-wrap items-center gap-2 mt-1.5">
<span class="rating-pill">${rate} ${svg('star', 'w-3 h-3')}</span><span class="text-2xs text-ink-400">${rev.toLocaleString()} ratings</span>
<span class="badge badge-gray !text-[10.5px]">${km} km away</span></div>
<p class="flex items-center gap-1.5 text-[12.5px] text-ink-600 mt-2">${svg('pin', 'w-3.5 h-3.5 text-ink-400')}<span class="clamp-1">${addr}</span></p>
<p class="flex items-center gap-1.5 text-[12.5px] mt-1">${svg('clock', 'w-3.5 h-3.5 text-ink-400')}<span class="text-green-700 font-semibold">${hours}</span></p>
<div class="hidden sm:flex flex-wrap gap-1.5 mt-2">${tags.map(x => `<span class="badge badge-gray !text-[10.5px]">${x}</span>`).join('')}</div>
</div></div>
<div class="flex flex-wrap items-center gap-2 px-3.5 pb-3.5">
<span class="text-[13px] font-extrabold text-ink-900 mr-auto">${price}</span>
<button class="btn btn-sm btn-service" data-modal-open="callModal">${svg('phone')}Show number</button>
<button class="btn btn-sm btn-outline" data-modal-open="quoteModal">${svg('msg')}Get quote</button>
<a href="${R(d)}service-details.html#book" class="btn btn-sm btn-outline hidden sm:inline-flex">${svg('cal')}Book</a>
<button class="btn btn-sm btn-outline btn-icon !w-9" data-toggle-class="is-on" aria-label="Save">${svg('heart')}</button>
<button class="btn btn-sm btn-outline btn-icon !w-9 hidden sm:grid" aria-label="Share">${svg('share')}</button>
</div></article>`;
};

const catTile = (c, i, d, url = 'products.html') => `<a href="${R(d)}${url}" class="group flex flex-col items-center gap-2.5 p-3.5 rounded-2xl bg-white border border-[#eef0f4] hover:border-brand-200 hover:shadow-soft transition text-center">
<span class="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 grid place-items-center group-hover:bg-brand-500 group-hover:text-white transition">${svg(c[1], 'w-7 h-7', '1.7')}</span>
<span class="text-[12.5px] font-bold text-ink-800 leading-tight clamp-2">${c[0]}</span>
<span class="text-2xs text-ink-400">${1200 + i * 317} listings</span></a>`;

const filterSidebar = (d, mode = 'product') => {
  const isP = mode === 'product';
  return `<aside class="hidden lg:block w-[262px] shrink-0">
<div class="card sticky-24 overflow-hidden">
<div class="flex items-center justify-between px-4 py-3 border-b border-[#e7e9ef]"><h3 class="text-[14px] font-extrabold flex items-center gap-2">${svg('filter', 'w-4 h-4 text-brand-500')}Filters</h3><button class="text-[12px] font-bold text-brand-600">Clear all</button></div>
<div class="max-h-[calc(100vh-190px)] overflow-y-auto thin-scroll divide-y divide-[#f0f1f5]">
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Active filters</p><div class="flex flex-wrap gap-1.5">
${['Dhaka', isP ? 'Free delivery' : 'Open now', '4★ & up'].map(t => `<span class="badge badge-brand">${t}<button class="ml-0.5">${svg('x', 'w-3 h-3')}</button></span>`).join('')}</div></div>
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Category</p>
<div class="space-y-2 text-[13px]">${(isP ? ['Smartphones (4,281)', 'Feature Phones (612)', 'Tablets (338)', 'Smart Watches (901)', 'Accessories (5,120)'] : ['Electricians (612)', 'Plumbers (438)', 'AC Service (351)', 'Painters (207)', 'Carpenters (188)']).map(x => `<label class="check"><input type="checkbox">${x}</label>`).join('')}</div>
<button class="text-[12px] font-bold text-brand-600 mt-2.5">+ Show 14 more</button></div>
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">${isP ? 'Price range (৳)' : 'Budget (৳)'}</p>
<div class="flex items-center gap-2 mb-3"><input class="input input-sm" placeholder="Min" value="1000"><span class="text-ink-300">—</span><input class="input input-sm" placeholder="Max" value="30000"></div>
<input type="range" class="w-full accent-brand-500" value="60"><div class="flex flex-wrap gap-1.5 mt-2.5">${['Under 5k', '5k–15k', '15k–30k', '30k+'].map(x => `<button class="chip !h-7 !text-[11.5px]">${x}</button>`).join('')}</div></div>
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Location / Area</p>
<div class="input-group mb-2.5">${svg('search')}<input class="input input-sm !pl-9" placeholder="Search area…"></div>
<div class="space-y-2 text-[13px]">${['Dhanmondi', 'Gulshan', 'Mirpur', 'Uttara', 'Mohammadpur', 'Bashundhara R/A'].map((x, i) => `<label class="check"><input type="checkbox" ${i === 0 ? 'checked' : ''}>${x} <span class="text-ink-400">(${300 - i * 27})</span></label>`).join('')}</div></div>
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Ratings</p>
<div class="space-y-2">${[4, 3, 2].map(r => `<label class="check"><input type="radio" name="rt">${stars(r)} <span class="text-[12.5px]">${r}★ &amp; up</span></label>`).join('')}</div></div>
${isP ? `<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Brand</p>
<div class="input-group mb-2.5">${svg('search')}<input class="input input-sm !pl-9" placeholder="Search brand…"></div>
<div class="space-y-2 text-[13px]">${['Samsung (612)', 'Xiaomi (508)', 'Realme (377)', 'Walton (296)', 'Vivo (241)', 'Oppo (233)'].map(x => `<label class="check"><input type="checkbox">${x}</label>`).join('')}</div></div>
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Delivery options</p>
<div class="space-y-2 text-[13px]">${['Free delivery', 'Express (same day)', 'Cash on delivery', 'Pickup from shop'].map(x => `<label class="check"><input type="checkbox">${x}</label>`).join('')}</div></div>
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Seller type</p>
<div class="space-y-2 text-[13px]">${['Mall / Official store', 'Verified seller', 'Local shop', 'Top rated (4.5★+)'].map(x => `<label class="check"><input type="checkbox">${x}</label>`).join('')}</div></div>
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Warranty &amp; condition</p>
<div class="space-y-2 text-[13px]">${['Brand warranty', 'Seller warranty', 'No warranty', 'Brand new', 'Refurbished'].map(x => `<label class="check"><input type="checkbox">${x}</label>`).join('')}</div></div>
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Offers</p>
<div class="space-y-2 text-[13px]">${['Flash sale items', 'Voucher available', 'Bundle deals', 'Installment (EMI)'].map(x => `<label class="check"><input type="checkbox">${x}</label>`).join('')}</div></div>`
      : `<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Availability</p>
<div class="space-y-2 text-[13px]">${['Open now', 'Open 24 hours', 'Available today', 'Available on weekend', 'Emergency service'].map((x, i) => `<label class="check"><input type="checkbox" ${i === 0 ? 'checked' : ''}>${x}</label>`).join('')}</div></div>
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Distance</p>
<div class="space-y-2 text-[13px]">${['Within 1 km', 'Within 3 km', 'Within 5 km', 'Within 10 km', 'Anywhere in city'].map(x => `<label class="check"><input type="radio" name="dist">${x}</label>`).join('')}</div></div>
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Service mode</p>
<div class="space-y-2 text-[13px]">${['At my home', 'At their place', 'Online / remote', 'Pickup &amp; drop'].map(x => `<label class="check"><input type="checkbox">${x}</label>`).join('')}</div></div>
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Payment accepted</p>
<div class="space-y-2 text-[13px]">${['Cash', 'bKash / Nagad', 'Card', 'Bank transfer'].map(x => `<label class="check"><input type="checkbox">${x}</label>`).join('')}</div></div>
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Trust &amp; badges</p>
<div class="space-y-2 text-[13px]">${['HaatBazar Verified', 'Trust seal (KYC done)', 'Top rated pro', '5+ years experience', 'Insured / bonded'].map(x => `<label class="check"><input type="checkbox">${x}</label>`).join('')}</div></div>
<div class="p-4"><p class="text-[12.5px] font-extrabold mb-2.5">Gender preference</p>
<div class="space-y-2 text-[13px]">${['Any', 'Female staff available', 'Male staff available'].map(x => `<label class="check"><input type="radio" name="gen">${x}</label>`).join('')}</div></div>`}
</div>
<div class="p-3 border-t border-[#e7e9ef] flex gap-2"><button class="btn btn-sm btn-outline flex-1">Reset</button><button class="btn btn-sm btn-primary flex-1">Apply filters</button></div>
</div></aside>`;
};

const pager = (d) => `<div class="flex flex-col sm:flex-row items-center justify-between gap-3 mt-7">
<p class="text-[12.5px] text-ink-500">Showing <b class="text-ink-900">1–40</b> of <b class="text-ink-900">12,841</b> results</p>
<div class="pager"><a href="#">${svg('chevL')}</a><span class="is-current">1</span><a href="#">2</a><a href="#">3</a><a href="#">4</a><span>…</span><a href="#">322</a><a href="#">${svg('chevR')}</a></div>
<div class="flex items-center gap-2 text-[12.5px]"><span class="text-ink-500">Per page</span><select class="select input-sm !w-auto"><option>40</option><option>60</option><option>100</option></select></div></div>`;

const modals = d => `
<div class="modal" id="quickViewModal"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel is-wide">
<div class="flex items-center justify-between p-4 border-b border-[#e7e9ef]"><h3 class="font-display text-[16px] font-extrabold">Quick view</h3><button class="icon-btn" data-modal-close>${svg('x','w-5 h-5')}</button></div>
<div class="p-5 grid sm:grid-cols-2 gap-5">
<div>${ph(2,'phoneDev','ratio-sq w-full rounded-xl mb-2.5')}<div class="grid grid-cols-4 gap-2">${[0,1,2,3].map(i=>ph(i+4,'phoneDev','ratio-sq rounded-lg')).join('')}</div></div>
<div><span class="badge badge-brand mb-2">Flash deal · ends in 04:12:52</span>
<h4 class="font-display text-[18px] font-extrabold leading-snug mb-1.5">Realme C100x 6/128GB 8000mAh 45W 6.8"</h4>
<div class="flex items-center gap-2 mb-2">${stars(4.6)}<span class="text-[12px] text-ink-500">4.6 · 1,240 ratings · 2.1k sold</span></div>
<div class="flex items-end gap-2 mb-3"><span class="price-lg">৳11,499</span><span class="price-old">৳13,999</span><span class="badge badge-red">-18%</span></div>
<p class="text-[13px] text-ink-600 mb-3">6.8" HD+ 90Hz display · 8000mAh battery · 45W SuperVOOC · Unisoc T612 · 2 years official warranty.</p>
<p class="label">Colour</p><div class="flex gap-2 mb-3">${['Dreamy Purple','Midnight Black','Cyber Green'].map((c,i)=>`<button class="chip ${i===0?'is-active':''}">${c}</button>`).join('')}</div>
<p class="label">Quantity</p><div class="flex items-center gap-3 mb-4"><div class="flex items-center border border-[#e7e9ef] rounded-lg h-10"><button class="w-9 h-full grid place-items-center">${svg('minus')}</button><input class="w-11 text-center text-[14px] font-bold" value="1"><button class="w-9 h-full grid place-items-center">${svg('plus')}</button></div><span class="text-[12.5px] text-ink-500">32 pieces available</span></div>
<div class="flex gap-2"><button class="btn btn-primary flex-1" data-toast="Added to cart">${svg('cart')}Add to cart</button><a href="${R(d)}checkout.html" class="btn btn-dark flex-1">Buy now</a></div>
<a href="${R(d)}product-details.html" class="link block text-center mt-3 text-[13px]">See full product details</a></div></div></div></div>

<div class="modal" id="callModal"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel is-narrow">
<div class="p-6 text-center"><span class="w-14 h-14 rounded-2xl bg-service-50 text-service-600 grid place-items-center mx-auto mb-3">${svg('phone','w-7 h-7')}</span>
<h3 class="font-display text-[17px] font-extrabold mb-1">CoolCare AC Servicing</h3><p class="text-[12.5px] text-ink-500 mb-4">Uttara Sector 7, Dhaka · 4.8★ (1,032)</p>
<div class="rounded-xl bg-ink-50 p-4 mb-4"><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-1">Primary number</p>
<p class="font-display text-[22px] font-extrabold tracking-tight">+880 1712-998877</p>
<p class="text-[11.5px] text-ink-500 mt-1">Alternate: +880 9612-334455 · Landline: 02-58054412</p></div>
<div class="flex gap-2 mb-3"><a href="tel:+8801712998877" class="btn btn-service flex-1">${svg('phone')}Call now</a><button class="btn btn-outline flex-1">${svg('msg')}WhatsApp</button></div>
<p class="text-[11.5px] text-ink-400">By calling you agree to our <a href="${R(d)}terms.html" class="link">Terms</a>. Never pay in advance without an invoice.</p></div></div></div>

<div class="modal" id="quoteModal"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">
<div class="flex items-center justify-between p-5 border-b border-[#e7e9ef]"><div><h3 class="font-display text-[17px] font-extrabold">Get free quotes</h3><p class="text-[12.5px] text-ink-500">Tell us what you need — up to 5 providers will reply.</p></div><button class="icon-btn" data-modal-close>${svg('x','w-5 h-5')}</button></div>
<div class="p-5 grid sm:grid-cols-2 gap-4">
<div class="sm:col-span-2"><label class="label">What service do you need? <span class="req">*</span></label><select class="select"><option>AC Servicing &amp; Repair</option><option>Electrician</option><option>Plumber</option><option>House Cleaning</option><option>Home Tutor</option><option>Event Planner</option></select></div>
<div><label class="label">Your name <span class="req">*</span></label><input class="input" value="Nusrat Ahmed"></div>
<div><label class="label">Mobile number <span class="req">*</span></label><div class="input-affix"><span class="affix">+880</span><input class="input" value="1712-345678"></div></div>
<div><label class="label">Area / Location <span class="req">*</span></label><input class="input" value="Dhanmondi, Dhaka"></div>
<div><label class="label">When do you need it?</label><select class="select"><option>As soon as possible</option><option>Today</option><option>Tomorrow</option><option>This week</option><option>Just exploring</option></select></div>
<div><label class="label">Approximate budget</label><select class="select"><option>Not sure yet</option><option>Under ৳1,000</option><option>৳1,000 – ৳5,000</option><option>৳5,000 – ৳20,000</option><option>Above ৳20,000</option></select></div>
<div><label class="label">Preferred contact</label><select class="select"><option>Phone call</option><option>WhatsApp</option><option>SMS</option><option>Email</option></select></div>
<div class="sm:col-span-2"><label class="label">Describe your requirement</label><textarea class="textarea" placeholder="e.g. 1.5 ton split AC not cooling, need servicing and gas refill this weekend…"></textarea></div>
<div class="sm:col-span-2"><div class="upload-box">${svg('camera','w-5 h-5')}<span>Attach photos or documents (optional) — max 5 files, 5 MB each</span></div></div>
<div class="sm:col-span-2"><label class="check"><input type="checkbox" checked><span>Share my number with matching providers so they can call me back</span></label></div>
<div class="sm:col-span-2 flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Request sent to 5 providers">Send my request</button></div></div></div></div>`;

module.exports = { PRODUCTS, SERVICES, pcard, scard, catTile, filterSidebar, pager, modals };
