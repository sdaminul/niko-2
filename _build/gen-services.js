const fs = require('fs');
const { svg, ph, stars } = require('./ui');
const L = require('./layout');
const B = require('./blocks');
const { SERVICES: S, PRODUCTS: P, scard, pcard, filterSidebar, pager, modals } = B;
const d = false;

const servicesBody = `
${L.crumb([{t:'Local Services',h:'services.html'},{t:'Dhaka',h:'services.html'},{t:'Home Services'}],d)}
<main class="shell py-5">
<div class="card p-4 sm:p-5 mb-4">
<div class="flex flex-col lg:flex-row gap-4 lg:items-center">
<div class="flex-1"><h1 class="font-display text-[22px] sm:text-[26px] font-extrabold tracking-tight mb-1.5">Home Services in Dhaka</h1>
<p class="text-[13px] text-ink-500">3,412 verified providers · showing results near <b class="text-ink-900">Dhanmondi</b> · average response time 12 minutes</p></div>
<div class="flex flex-wrap gap-2"><button class="btn btn-sm btn-service" data-modal-open="quoteModal">${svg('bolt')}Get free quotes</button>
<button class="btn btn-sm btn-outline" data-toast="Alert created">${svg('bell')}Create alert</button>
<button class="btn btn-sm btn-outline">${svg('share')}Share</button></div></div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-4">
${[['shield','100% verified','NID & trade licence checked'],['clock','Fast response','Average reply in 12 min'],['money','No booking fee','Pay the provider directly'],['star','Real reviews','Only from confirmed jobs']].map(x=>`<div class="flex items-center gap-2.5 p-3 rounded-xl bg-service-50/60"><span class="w-9 h-9 rounded-lg bg-white text-service-600 grid place-items-center shrink-0">${svg(x[0],'w-4 h-4')}</span><div class="min-w-0"><p class="text-[12.5px] font-extrabold clamp-1">${x[1]}</p><p class="text-[11px] text-ink-500 clamp-1">${x[2]}</p></div></div>`).join('')}</div></div>

<div class="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-1">${['All home services','Electrician','Plumber','AC repair','Cleaning','Painter','Carpenter','Pest control','Appliance repair','CCTV install','Interior design'].map((x,i)=>`<button class="chip chip-service ${i===0?'is-active':''}">${x}</button>`).join('')}</div>

<div class="flex gap-5">
${filterSidebar(d,'service')}
<div class="flex-1 min-w-0">
<div class="card p-3 mb-4 flex flex-wrap items-center gap-2">
<button class="btn btn-sm btn-outline lg:hidden" data-drawer-open="filterDrawer">${svg('filter')}Filters<span class="badge badge-brand ml-1">2</span></button>
<span class="hidden sm:block text-[12.5px] text-ink-500">Sort</span>
<div class="flex flex-wrap gap-1.5">${['Relevance','Nearest first','Highest rated','Most reviewed','Newest','Quickest response'].map((x,i)=>`<button class="chip ${i===0?'is-active':''}">${x}</button>`).join('')}</div>
<div class="ml-auto flex items-center gap-2"><label class="check hidden sm:flex"><input type="checkbox" checked>Open now</label><button class="btn btn-sm btn-outline">${svg('pin')}Map view</button></div></div>

<div class="card overflow-hidden mb-4"><div class="ph ph-j h-[170px] relative">
<div class="absolute inset-0 grid place-items-center"><div class="text-center"><span class="w-11 h-11 rounded-full bg-white shadow-pop grid place-items-center mx-auto mb-2 text-brand-500">${svg('pin','w-6 h-6')}</span>
<p class="text-[13px] font-extrabold text-ink-800">12 providers within 3 km of Dhanmondi</p><button class="btn btn-sm btn-dark mt-2">Explore the map</button></div></div>
${[['18%','22%'],['62%','35%'],['40%','68%'],['78%','58%'],['30%','44%']].map(pos=>`<span class="absolute w-7 h-7 rounded-full bg-brand-500 text-white text-[10px] font-extrabold grid place-items-center shadow-pop" style="left:${pos[0]};top:${pos[1]}">৳</span>`).join('')}</div></div>

<div class="space-y-3.5">${[...S,...S.slice(0,4)].map((s,i)=>scard(s,i,d)).join('')}</div>
${pager(d)}

<div class="card p-5 mt-5"><h2 class="font-display text-[17px] font-extrabold mb-2">Hiring a home service provider in Dhaka</h2>
<p class="text-[13px] text-ink-500 leading-relaxed mb-4">Every provider listed on HaatBazar submits a National ID, trade licence (where applicable) and at least two customer references before the verified badge is issued. Compare quotes from multiple professionals, check genuine reviews from completed jobs, and only pay after you are satisfied with the work.</p>
<div class="grid sm:grid-cols-3 gap-4 text-[12.5px]">${[['Popular services',['Electrician','Plumber','AC servicing','Deep cleaning','Painting','Pest control','Carpenter','Appliance repair']],['Popular areas',['Dhanmondi','Gulshan','Banani','Mirpur','Uttara','Bashundhara','Mohammadpur','Motijheel']],['Other cities',['Chattogram','Sylhet','Khulna','Rajshahi','Barishal','Rangpur','Cumilla','Narayanganj']]]
.map(g=>`<div><p class="font-extrabold text-ink-800 mb-2">${g[0]}</p><div class="flex flex-wrap gap-1.5">${g[1].map(x=>`<a href="services.html" class="badge badge-gray hover:!bg-service-50 hover:!text-service-700">${x}</a>`).join('')}</div></div>`).join('')}</div></div>
</div></div></main>

<div class="drawer" id="filterDrawer"><div class="drawer-backdrop" data-drawer-close></div><div class="drawer-panel">
<div class="flex items-center justify-between p-4 border-b border-[#e7e9ef]"><span class="font-display text-[16px] font-extrabold">Filters</span><button class="icon-btn" data-drawer-close>${svg('x','w-5 h-5')}</button></div>
<div class="flex-1 overflow-y-auto p-4 space-y-5">${[['Category',['Electricians','Plumbers','AC Service','Painters','Cleaning']],['Distance',['Within 1 km','Within 3 km','Within 5 km','Within 10 km']],['Availability',['Open now','Open 24 hours','Weekend available','Emergency service']],['Budget',['Under ৳1,000','৳1,000–5,000','৳5,000+']],['Ratings',['4★ &amp; up','3★ &amp; up']],['Payment',['Cash','bKash / Nagad','Card']]]
.map(g=>`<div><p class="text-[13px] font-extrabold mb-2">${g[0]}</p><div class="space-y-2 text-[13px]">${g[1].map(x=>`<label class="check"><input type="checkbox">${x}</label>`).join('')}</div></div>`).join('')}</div>
<div class="p-4 border-t border-[#e7e9ef] flex gap-2"><button class="btn btn-outline flex-1" data-drawer-close>Reset</button><button class="btn btn-service flex-1" data-drawer-close>Show 3,412 providers</button></div></div></div>
${modals(d)}`;

fs.writeFileSync('services.html', L.page({title:'Home Services in Dhaka — Local Service Directory', desc:'Find verified electricians, plumbers, AC technicians, cleaners and more near you.', body:servicesBody}));

/* ===================== SERVICE DETAILS ===================== */
const hours = [['Saturday','9:00 AM – 9:00 PM'],['Sunday','9:00 AM – 9:00 PM'],['Monday','9:00 AM – 9:00 PM'],['Tuesday','9:00 AM – 9:00 PM'],['Wednesday','9:00 AM – 9:00 PM'],['Thursday','9:00 AM – 9:00 PM'],['Friday','3:00 PM – 9:00 PM']];
const priceList = [['Split AC servicing (up to 1.5 ton)','৳1,200','60–90 min'],['Split AC servicing (2 ton and above)','৳1,600','90 min'],['Window AC servicing','৳900','45–60 min'],['Gas refill R22 (per ton)','৳2,200','60 min'],['Gas refill R410a (per ton)','৳2,800','60 min'],['AC installation (split, indoor + outdoor)','৳3,500','2–3 hours'],['AC uninstallation','৳1,500','60 min'],['Compressor replacement','Quote after inspection','Half day'],['PCB / thermostat repair','৳2,500 onwards','2 hours'],['Annual maintenance contract (4 visits)','৳4,800/year','—']];
const srev = [['Mahmudul Karim','3 days ago',5,'Booked at 10 AM, technician reached by 12:30 PM. Cleaned both indoor and outdoor units, checked gas pressure and left the place spotless. Charged exactly what was quoted — ৳1,200.','AC servicing · Uttara',31],
['Farhana Yasmin','1 week ago',5,'My AC was not cooling for a week. They diagnosed a gas leak, fixed the joint and refilled. 3 months warranty given in writing. Very professional team.','Gas refill · Banani',19],
['Shakil Ahmed','2 weeks ago',4,'Good service overall, arrived 40 minutes late but informed me by phone beforehand. Work quality was fine and price was reasonable.','AC installation · Mirpur',7],
['Rownak Jahan','1 month ago',5,'Took an annual maintenance package for 2 ACs. Reminders come by SMS and they never miss a visit. Highly recommended for offices.','AMC · Dhanmondi',12]];

const sdBody = `
${L.crumb([{t:'Local Services',h:'services.html'},{t:'Dhaka',h:'services.html'},{t:'AC Repair & Service',h:'services.html'},{t:'CoolCare AC Servicing'}],d)}
<main class="shell py-5">
<div class="card overflow-hidden mb-4">
<div class="relative ph ph-b h-[150px] sm:h-[210px] grid-noise"><div class="absolute top-3 right-3 flex gap-2">
<button class="btn btn-sm !bg-white/90 !text-ink-900">${svg('camera')}42 photos</button><button class="btn btn-sm !bg-white/90 !text-ink-900">${svg('play')}3 videos</button></div></div>
<div class="p-4 sm:p-5 -mt-12 relative">
<div class="flex flex-col sm:flex-row gap-4">
<div class="w-[92px] h-[92px] rounded-2xl bg-white p-1.5 shadow-pop shrink-0">${ph(1,'fan','w-full h-full rounded-xl')}</div>
<div class="flex-1 min-w-0 sm:pt-11">
<div class="flex flex-wrap items-center gap-2 mb-1.5">
<h1 class="font-display text-[22px] sm:text-[27px] font-extrabold tracking-tight">CoolCare AC Servicing &amp; Repair</h1>
<span class="badge badge-teal">${svg('shield')}HaatBazar Verified</span><span class="badge badge-gold !bg-gold-50 !text-gold-700">${svg('award')}Top Pro 2026</span><span class="badge badge-green badge-dot">Open now</span></div>
<p class="text-[13.5px] text-ink-600 mb-2">AC Repair &amp; Service · Appliance Repair · Since 2017 · Trade licence verified</p>
<div class="flex flex-wrap items-center gap-3 text-[12.5px] mb-3">
<span class="flex items-center gap-1.5"><span class="rating-pill">4.8 ${svg('star','w-3 h-3')}</span><a href="#reviews" class="link">1,032 ratings</a></span>
<span class="text-ink-300">|</span><span class="text-ink-500">4,280 jobs completed</span>
<span class="text-ink-300">|</span><span class="text-ink-500">Responds in ~12 min</span>
<span class="text-ink-300">|</span><span class="text-ink-500">Serving 14 areas in Dhaka</span></div>
<p class="flex items-start gap-2 text-[13px] text-ink-600 mb-1">${svg('pin','w-4 h-4 text-service-600 shrink-0 mt-0.5')}House 42, Road 7, Sector 7, Uttara, Dhaka 1230 · <button class="link">Get directions</button></p>
<p class="flex items-center gap-2 text-[13px] text-ink-600">${svg('clock','w-4 h-4 text-service-600')}Open today until 9:00 PM · <button class="link" data-scroll="#hours">See all hours</button></p></div></div>
<div class="flex flex-wrap gap-2 mt-4">
<button class="btn btn-service" data-modal-open="callModal">${svg('phone')}Show number</button>
<a href="#book" class="btn btn-primary">${svg('cal')}Book appointment</a>
<button class="btn btn-outline" data-modal-open="quoteModal">${svg('msg')}Request a quote</button>
<button class="btn btn-outline">${svg('msg')}WhatsApp</button>
<button class="btn btn-outline btn-icon" data-toggle-class="is-on" aria-label="Save">${svg('heart','w-5 h-5')}</button>
<button class="btn btn-outline btn-icon" aria-label="Share">${svg('share','w-5 h-5')}</button>
<button class="btn btn-outline btn-icon" aria-label="Report">${svg('flag','w-5 h-5')}</button></div>
<div class="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-4">
${[['award','9 years in business'],['users','24 trained technicians'],['shield','90-day service warranty'],['money','Cash, bKash, Nagad, card']].map(x=>`<div class="flex items-center gap-2.5 p-3 rounded-xl border border-[#e7e9ef]"><span class="w-9 h-9 rounded-lg bg-service-50 text-service-600 grid place-items-center shrink-0">${svg(x[0],'w-4 h-4')}</span><p class="text-[12.5px] font-bold">${x[1]}</p></div>`).join('')}</div>
</div></div>

<div class="grid lg:grid-cols-[minmax(0,1fr)_330px] gap-5">
<div class="min-w-0">
<div class="card mb-4"><div class="tabs px-4" data-tabs>
${['Overview','Services &amp; Prices','Photos','Reviews (1,032)','Q&amp;A','Team','Offers'].map((t,i)=>`<button class="tab ${i===0?'is-active':''}" data-tab="${i}">${t}</button>`).join('')}</div>
<div class="p-5" data-tab-panel="0">
<h2 class="font-display text-[17px] font-extrabold mb-2">About CoolCare</h2>
<p class="text-[13.5px] text-ink-600 leading-relaxed mb-4">CoolCare has been servicing air conditioners across Dhaka since 2017. Our team of 24 factory-trained technicians handles split, window, cassette and VRF systems for homes, offices, showrooms and restaurants. Every job comes with a written 90-day service warranty and a transparent price list — no hidden charges, no surprise "extra parts" bills.</p>
<div class="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-5">
${[['Established','2017'],['Business type','Service provider (Pvt. Ltd.)'],['Trade licence','TRAD/DNCC/117420/2019 — verified'],['Team size','24 technicians, 4 supervisors'],['Service areas','Uttara, Airport, Khilkhet, Banani, Gulshan, Baridhara, Mirpur, Dhanmondi +6 more'],['Emergency service','Yes — until 11 PM'],['Languages','Bangla, English'],['Payment modes','Cash, bKash, Nagad, Rocket, Visa/Mastercard, bank transfer']].map(x=>`<div class="flex gap-3 py-2 border-b border-[#f4f5f8]"><span class="w-[40%] shrink-0 text-[12.5px] font-bold text-ink-500">${x[0]}</span><span class="text-[13px] text-ink-800">${x[1]}</span></div>`).join('')}</div>
<h3 class="text-[15px] font-extrabold mb-2.5">Services offered</h3>
<div class="flex flex-wrap gap-2 mb-5">${['AC servicing','Gas refill','AC installation','AC uninstallation','Compressor repair','PCB repair','Duct cleaning','Annual maintenance','Chiller service','VRF service','Refrigerator repair','Washing machine repair'].map(x=>`<span class="badge badge-teal">${x}</span>`).join('')}</div>
<h3 class="text-[15px] font-extrabold mb-2.5">Brands we service</h3>
<div class="flex flex-wrap gap-2 mb-5">${['Gree','Walton','General','Midea','Samsung','LG','Daikin','Carrier','Hitachi','Chigo','Singer','Panasonic'].map(x=>`<span class="badge badge-gray">${x}</span>`).join('')}</div>
<h3 class="text-[15px] font-extrabold mb-2.5">Why customers choose us</h3>
<div class="grid sm:grid-cols-2 gap-3 mb-5">${[['clock','On-time arrival','93% of jobs start within the promised time slot'],['shield','Written warranty','90 days on labour, 6 months on replaced parts'],['money','Fixed price list','Quoted before work starts — approved by you'],['users','Background-checked staff','Every technician carries a photo ID card']].map(x=>`<div class="flex gap-3 p-3.5 rounded-xl border border-[#e7e9ef]"><span class="w-9 h-9 rounded-lg bg-service-50 text-service-600 grid place-items-center shrink-0">${svg(x[0],'w-4 h-4')}</span><div><p class="text-[13px] font-extrabold mb-0.5">${x[1]}</p><p class="text-[12px] text-ink-500 leading-relaxed">${x[2]}</p></div></div>`).join('')}</div>
<h3 class="text-[15px] font-extrabold mb-2.5" id="hours">Business hours</h3>
<div class="rounded-xl border border-[#e7e9ef] overflow-hidden mb-5">${hours.map((h,i)=>`<div class="flex items-center justify-between px-4 py-2.5 ${i%2?'bg-ink-50/50':''} ${i===0?'':'border-t border-[#f0f1f5]'}"><span class="text-[13px] font-bold ${i===0?'text-service-700':'text-ink-700'}">${h[0]} ${i===0?'<span class="badge badge-green ml-1.5">Today</span>':''}</span><span class="text-[13px] text-ink-600 mono">${h[1]}</span></div>`).join('')}</div>
<h3 class="text-[15px] font-extrabold mb-2.5">Location &amp; service area</h3>
<div class="rounded-xl overflow-hidden border border-[#e7e9ef] mb-3"><div class="ph ph-j h-[220px] relative"><div class="absolute inset-0 grid place-items-center"><span class="w-10 h-10 rounded-full bg-brand-500 text-white grid place-items-center shadow-pop animate-pulse-soft">${svg('pin','w-5 h-5')}</span></div>
<div class="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2"><button class="btn btn-sm btn-dark">${svg('pin')}Get directions</button><button class="btn btn-sm !bg-white !text-ink-900">Open in Google Maps</button></div></div></div>
<p class="text-[12.5px] text-ink-500 mb-6">House 42, Road 7, Sector 7, Uttara, Dhaka 1230. Landmark: opposite Rajlakshmi Complex, beside BRAC Bank ATM.</p>
<h3 class="text-[15px] font-extrabold mb-2.5">Certifications &amp; documents</h3>
<div class="grid sm:grid-cols-3 gap-3">${[['Trade licence','Verified 12 Jan 2026'],['TIN certificate','Verified 12 Jan 2026'],['Technician training cert.','Gree authorised']].map(x=>`<div class="p-3.5 rounded-xl border border-[#e7e9ef] flex gap-2.5"><span class="w-9 h-9 rounded-lg bg-green-50 text-green-700 grid place-items-center shrink-0">${svg('check','w-4 h-4')}</span><div><p class="text-[12.5px] font-extrabold">${x[0]}</p><p class="text-[11px] text-ink-500">${x[1]}</p></div></div>`).join('')}</div></div>

<div class="p-5" data-tab-panel="1" hidden>
<div class="flex items-center justify-between mb-3"><h2 class="font-display text-[17px] font-extrabold">Price list</h2><span class="badge badge-gray">Updated 2 days ago</span></div>
<div class="tbl-wrap card-flat"><table class="tbl"><thead><tr><th>Service</th><th>Starting price</th><th>Duration</th><th></th></tr></thead>
<tbody>${priceList.map(p=>`<tr><td class="font-semibold text-ink-900">${p[0]}</td><td class="font-extrabold text-service-600">${p[1]}</td><td>${p[2]}</td><td class="text-right"><a href="#book" class="btn btn-xs btn-service">Book</a></td></tr>`).join('')}</tbody></table></div>
<p class="text-[12px] text-ink-400 mt-3">* Prices exclude spare parts. A ৳300 inspection fee applies if no work is carried out. Prices valid inside Dhaka city; outside Dhaka a travel charge applies.</p>
<h3 class="text-[15px] font-extrabold mt-6 mb-3">Packages</h3>
<div class="grid sm:grid-cols-3 gap-3">${[['Basic Clean','৳1,200',['Indoor unit cleaning','Filter wash','Performance check'],0],['Deep Service','৳2,400',['Indoor + outdoor cleaning','Chemical wash','Gas pressure check','90-day warranty'],1],['Annual Contract','৳4,800',['4 scheduled visits','Priority booking','15% off spare parts','Free emergency visit'],0]]
.map(p=>`<div class="rounded-2xl border ${p[3]?'border-service-300 ring-2 ring-service-100':'border-[#e7e9ef]'} p-4 relative">${p[3]?'<span class="badge badge-teal absolute -top-2.5 left-4">Most popular</span>':''}
<p class="font-display text-[15px] font-extrabold mb-1">${p[0]}</p><p class="font-display text-[24px] font-extrabold text-service-600 mb-3">${p[1]}</p>
<ul class="space-y-1.5 mb-4">${p[2].map(x=>`<li class="flex gap-2 text-[12.5px] text-ink-600">${svg('check','w-4 h-4 text-green-600 shrink-0 mt-0.5')}${x}</li>`).join('')}</ul>
<a href="#book" class="btn btn-sm ${p[3]?'btn-service':'btn-outline'} btn-block">Choose plan</a></div>`).join('')}</div></div>

<div class="p-5" data-tab-panel="2" hidden>
<div class="flex flex-wrap gap-2 mb-4">${['All (42)','Work in progress (18)','Before &amp; after (9)','Team (7)','Office (5)','Certificates (3)'].map((x,i)=>`<button class="chip ${i===0?'is-active':''}">${x}</button>`).join('')}</div>
<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">${Array.from({length:12}).map((_,i)=>`<button class="rounded-xl overflow-hidden card-hover">${ph(i,'camera','ratio-4 w-full')}</button>`).join('')}</div>
<div class="text-center mt-4"><button class="btn btn-outline">Load 30 more photos</button></div></div>

<div class="p-5" data-tab-panel="3" hidden id="reviews">
<div class="grid md:grid-cols-[250px_1fr] gap-6 pb-5 border-b border-[#f0f1f5]">
<div class="text-center"><p class="font-display text-[44px] font-extrabold leading-none">4.8</p>${stars(4.8,'stars-lg')}
<p class="text-[12.5px] text-ink-500 mt-1.5">1,032 ratings · 640 written</p><button class="btn btn-sm btn-service mt-3" data-modal-open="srevModal">${svg('edit')}Rate this business</button></div>
<div><div class="space-y-2 mb-4">${[[5,84],[4,11],[3,3],[2,1],[1,1]].map(r=>`<div class="flex items-center gap-3"><span class="text-[12.5px] font-bold w-8">${r[0]}★</span><div class="bar flex-1"><i style="width:${r[1]}%"></i></div><span class="text-[12px] text-ink-500 w-10 text-right">${r[1]}%</span></div>`).join('')}</div>
<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">${[['Punctuality','4.9'],['Work quality','4.8'],['Pricing','4.6'],['Behaviour','4.9']].map(x=>`<div class="p-2.5 rounded-xl bg-ink-50 text-center"><p class="text-[16px] font-extrabold">${x[1]}</p><p class="text-[11px] text-ink-500">${x[0]}</p></div>`).join('')}</div></div></div>
<div class="flex flex-wrap gap-2 py-4">${['All reviews','With photos (86)','5★ (866)','Critical (21)','Punctuality (120)','Pricing (98)'].map((x,i)=>`<button class="chip !h-8 ${i===0?'is-active':''}">${x}</button>`).join('')}</div>
<div class="divide-y divide-[#f0f1f5]">${srev.map(r=>`<div class="py-5"><div class="flex items-start gap-3"><span class="avatar avatar-md bg-service-600">${r[0][0]}</span>
<div class="flex-1 min-w-0"><div class="flex flex-wrap items-center gap-2"><p class="text-[13.5px] font-extrabold">${r[0]}</p><span class="badge badge-green !text-[10.5px]">${svg('check')}Job verified</span><span class="text-[11.5px] text-ink-400 ml-auto">${r[1]}</span></div>
<div class="flex items-center gap-2 mt-1">${stars(r[2])}<span class="text-[11.5px] text-ink-400">${r[4]}</span></div>
<p class="text-[13.5px] text-ink-700 leading-relaxed mt-2">${r[3]}</p>
<div class="flex items-center gap-4 mt-3 text-[12px]"><button class="flex items-center gap-1.5 font-bold text-ink-500 hover:text-service-600">${svg('up','w-3.5 h-3.5')}Helpful (${r[5]})</button><button class="font-bold text-ink-500">Share</button><button class="font-bold text-ink-400">Report</button></div>
<div class="mt-3 pl-3.5 border-l-2 border-service-100"><p class="text-[12px] font-extrabold text-service-700 mb-1">Owner replied</p><p class="text-[12.5px] text-ink-600">Thank you for choosing CoolCare! Your AMC reminder is scheduled — our team will contact you before the next visit.</p></div></div></div></div>`).join('')}</div>
<div class="text-center pt-4"><button class="btn btn-outline">Load 636 more reviews</button></div></div>

<div class="p-5" data-tab-panel="4" hidden>
<div class="flex flex-col sm:flex-row gap-2 mb-5"><input class="input" placeholder="Ask CoolCare a question…"><button class="btn btn-service shrink-0" data-toast="Question sent">Ask</button></div>
<div class="divide-y divide-[#f0f1f5]">${[['Do you serve Mirpur 12?','Yes, we cover all of Mirpur. Travel charge ৳150 applies beyond Mirpur 11.','Owner','1 day ago'],['Is there any charge if the AC cannot be repaired?','An inspection fee of ৳300 applies if you decide not to proceed after diagnosis.','Owner','4 days ago'],['Can I get a service invoice for office claim?','Yes, we provide a printed VAT invoice with BIN on request.','Owner','1 week ago'],['Do you work on Fridays?','Yes, from 3 PM to 9 PM. Emergency calls are accepted from 9 AM.','Owner','2 weeks ago']]
.map(q=>`<div class="py-4"><p class="flex gap-2 text-[13.5px] font-extrabold"><span class="w-5 h-5 rounded bg-ink-100 text-ink-600 grid place-items-center text-[10px] shrink-0 mt-0.5">Q</span>${q[0]}</p>
<p class="flex gap-2 text-[13px] text-ink-600 mt-2"><span class="w-5 h-5 rounded bg-service-50 text-service-600 grid place-items-center text-[10px] font-extrabold shrink-0 mt-0.5">A</span>${q[1]}</p>
<p class="ml-7 mt-1.5 text-[11.5px] text-ink-400">${q[2]} · ${q[3]}</p></div>`).join('')}</div></div>

<div class="p-5" data-tab-panel="5" hidden>
<h2 class="font-display text-[17px] font-extrabold mb-3">Meet the team</h2>
<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">${[['Mizanur Rahman','Founder &amp; Chief Technician','16 years experience'],['Sohel Rana','Senior Technician','9 years · Gree certified'],['Kamrul Hasan','Technician','6 years · Split &amp; VRF'],['Ayesha Siddika','Customer Support Lead','Booking &amp; complaints'],['Jahangir Alam','Supervisor — Uttara zone','11 years'],['Rakib Hossain','Technician','4 years · Window AC']].map((t,i)=>`<div class="p-4 rounded-xl border border-[#e7e9ef] flex gap-3">${ph(i,'user','w-14 h-14 rounded-xl')}<div class="min-w-0"><p class="text-[13.5px] font-extrabold clamp-1">${t[0]}</p><p class="text-[12px] text-ink-500 clamp-1">${t[1]}</p><p class="text-[11.5px] text-ink-400 mt-1">${t[2]}</p></div></div>`).join('')}</div></div>

<div class="p-5" data-tab-panel="6" hidden>
<div class="space-y-3">${[['20% off on first booking','New customers only. Valid on servicing packages up to ৳3,000.','FIRSTCOOL20','Ends 31 Aug 2026'],['Free gas pressure check','With any deep service package booked online.','AUTO','Ends 30 Sep 2026'],['AMC bundle — 2 ACs','Annual contract for two units at ৳8,600 instead of ৳9,600.','AMC2','Limited to 50 customers']]
.map(o=>`<div class="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-dashed border-service-300 bg-service-50/40">
<span class="w-11 h-11 rounded-xl bg-white text-service-600 grid place-items-center shrink-0">${svg('ticket','w-5 h-5')}</span>
<div class="flex-1 min-w-0"><p class="text-[13.5px] font-extrabold">${o[0]}</p><p class="text-[12px] text-ink-500">${o[1]}</p><p class="text-[11.5px] text-ink-400 mt-1">${o[3]}</p></div>
<div class="flex items-center gap-2"><span class="px-3 py-1.5 rounded-lg bg-white border border-dashed border-service-300 text-[12.5px] font-extrabold mono">${o[2]}</span><button class="btn btn-sm btn-service" data-toast="Coupon copied">Copy</button></div></div>`).join('')}</div></div>
</div>

<div class="card p-4 sm:p-5 mb-4" id="book">
<h2 class="font-display text-[18px] font-extrabold mb-1">Book an appointment</h2>
<p class="text-[12.5px] text-ink-500 mb-4">Choose a slot — CoolCare confirms within 15 minutes during business hours.</p>
<div class="grid md:grid-cols-2 gap-4">
<div><label class="label">Select service <span class="req">*</span></label><select class="select"><option>Split AC servicing (up to 1.5 ton) — ৳1,200</option><option>Deep service package — ৳2,400</option><option>Gas refill — from ৳2,200</option><option>AC installation — ৳3,500</option><option>Other / not sure</option></select></div>
<div><label class="label">Number of units</label><select class="select"><option>1 unit</option><option>2 units</option><option>3 units</option><option>4+ units</option></select></div>
<div><label class="label">Preferred date <span class="req">*</span></label><input type="date" class="input" value="2026-08-19"></div>
<div><label class="label">Preferred time slot <span class="req">*</span></label>
<div class="grid grid-cols-3 gap-2">${['9–11 AM','11 AM–1 PM','2–4 PM','4–6 PM','6–8 PM','Flexible'].map((t,i)=>`<button class="chip !justify-center ${i===2?'is-active':''}">${t}</button>`).join('')}</div></div>
<div class="md:col-span-2"><label class="label">Service address <span class="req">*</span></label><textarea class="textarea !min-h-[70px]">Flat 5B, House 27, Road 11, Dhanmondi, Dhaka 1209</textarea>
<label class="check mt-2"><input type="checkbox" checked>Use my saved home address</label></div>
<div><label class="label">Your name <span class="req">*</span></label><input class="input" value="Nusrat Ahmed"></div>
<div><label class="label">Mobile number <span class="req">*</span></label><div class="input-affix"><span class="affix">+880</span><input class="input" value="1712-345678"></div></div>
<div class="md:col-span-2"><label class="label">Problem description</label><textarea class="textarea" placeholder="Describe the issue, AC brand, model and how old the unit is…"></textarea></div>
<div class="md:col-span-2"><label class="label">Attach photos (optional)</label><div class="upload-box">${svg('camera','w-5 h-5')}<span>Upload photos of the unit or error code — helps the technician prepare</span></div></div>
<div class="md:col-span-2 rounded-xl bg-ink-50 p-4">
<div class="flex justify-between text-[13px] mb-1.5"><span class="text-ink-600">Service charge (estimated)</span><b>৳1,200</b></div>
<div class="flex justify-between text-[13px] mb-1.5"><span class="text-ink-600">Visiting charge</span><b class="text-green-700">Free</b></div>
<div class="flex justify-between text-[13px] mb-1.5"><span class="text-ink-600">Spare parts</span><span class="text-ink-500">Charged after your approval</span></div>
<div class="dotted-sep my-2.5"></div>
<div class="flex justify-between text-[15px] font-extrabold"><span>Estimated total</span><span class="text-service-600">৳1,200</span></div></div>
<div class="md:col-span-2"><label class="check"><input type="checkbox" checked>I agree to the <a href="terms.html" class="link">booking terms</a> and understand the final price may change after inspection.</label></div>
<div class="md:col-span-2 flex flex-wrap gap-2"><button class="btn btn-lg btn-service flex-1 min-w-[200px]" data-toast="Booking request sent to CoolCare">${svg('cal')}Confirm booking request</button>
<button class="btn btn-lg btn-outline" data-modal-open="callModal">${svg('phone')}Call instead</button></div>
</div></div>

<div class="card p-4 sm:p-5">${L.sectionHead('Similar providers nearby','Compare before you decide','services.html','users','service')}
<div class="grid md:grid-cols-2 gap-3.5">${S.slice(1,5).map((s,i)=>scard(s,i+2,d)).join('')}</div></div>
</div>

<aside class="lg:w-[330px] shrink-0 space-y-4">
<div class="card p-4 sticky-24">
<div class="rounded-xl bg-service-500 text-white p-4 mb-4"><p class="text-[11.5px] font-bold uppercase tracking-wider text-white/70 mb-1">Contact this business</p>
<p class="font-display text-[20px] font-extrabold tracking-tight mb-2">+880 1712-99••••</p>
<button class="btn btn-block !bg-white !text-service-700" data-modal-open="callModal">${svg('phone')}Show full number</button>
<p class="text-[11px] text-white/70 mt-2 text-center">Free to call · 4,280 people contacted this month</p></div>
<div class="space-y-2 mb-4">
<a href="#book" class="btn btn-primary btn-block">${svg('cal')}Book appointment</a>
<button class="btn btn-outline btn-block" data-modal-open="quoteModal">${svg('msg')}Get a free quote</button>
<button class="btn btn-outline btn-block">${svg('msg')}Chat on WhatsApp</button></div>
<div class="dotted-sep my-4"></div>
<p class="text-[13px] font-extrabold mb-2.5">Quick facts</p>
<div class="space-y-2.5 text-[12.5px]">${[['clock','Responds in ~12 minutes'],['check','93% jobs on time'],['shield','90-day service warranty'],['users','24 verified technicians'],['money','No advance payment needed'],['bolt','Emergency service until 11 PM']].map(x=>`<p class="flex items-center gap-2.5">${svg(x[0],'w-4 h-4 text-service-600')}<span class="text-ink-700">${x[1]}</span></p>`).join('')}</div>
<div class="dotted-sep my-4"></div>
<p class="text-[13px] font-extrabold mb-2.5">Service areas</p>
<div class="flex flex-wrap gap-1.5 mb-4">${['Uttara','Airport','Khilkhet','Banani','Gulshan','Baridhara','Mirpur','Dhanmondi','Mohakhali','Badda'].map(x=>`<span class="badge badge-gray">${x}</span>`).join('')}</div>
<div class="dotted-sep my-4"></div>
<p class="text-[13px] font-extrabold mb-2.5">Payment accepted</p>
<div class="flex flex-wrap gap-1.5 mb-4">${['Cash','bKash','Nagad','Rocket','Visa','Mastercard','Bank'].map(x=>`<span class="badge badge-gray">${x}</span>`).join('')}</div>
<div class="rounded-xl border border-[#e7e9ef] p-3.5"><p class="text-[12.5px] font-extrabold mb-1.5">Need AC parts too?</p><p class="text-[12px] text-ink-500 mb-2.5">Buy genuine filters, remotes and stabilisers from verified sellers.</p>
<a href="products.html" class="btn btn-sm btn-outline-brand btn-block">${svg('bag')}Shop AC accessories</a></div>
<button class="btn btn-sm btn-ghost btn-block mt-3 !text-ink-400">${svg('flag')}Report this listing</button>
<p class="text-[11px] text-ink-400 text-center mt-2">Listing ID: SRV-2026-04412 · Claimed by owner</p>
</div></aside></div></main>

<div class="modal" id="srevModal"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">
<div class="flex items-center justify-between p-5 border-b border-[#e7e9ef]"><h3 class="font-display text-[17px] font-extrabold">Rate CoolCare AC Servicing</h3><button class="icon-btn" data-modal-close>${svg('x','w-5 h-5')}</button></div>
<div class="p-5 space-y-4">
<div><label class="label">Overall experience <span class="req">*</span></label><div class="flex gap-1.5">${[1,2,3,4,5].map(()=>`<button class="text-gold-400">${svg('star','w-8 h-8','1.5')}</button>`).join('')}</div></div>
<div class="grid sm:grid-cols-2 gap-3">${['Punctuality','Work quality','Pricing','Staff behaviour'].map(x=>`<div><label class="label !text-[12px]">${x}</label><div class="flex gap-1">${[1,2,3,4,5].map(()=>`<button class="text-gold-400">${svg('star','w-5 h-5','1.5')}</button>`).join('')}</div></div>`).join('')}</div>
<div><label class="label">Which service did you take?</label><select class="select"><option>AC servicing</option><option>Gas refill</option><option>Installation</option><option>Repair</option><option>Annual contract</option></select></div>
<div><label class="label">Your review <span class="req">*</span></label><textarea class="textarea" placeholder="Tell others about the work quality, timing and pricing…"></textarea></div>
<div><label class="label">Add photos of the work</label><div class="upload-box">${svg('camera','w-5 h-5')}<span>Up to 6 photos</span></div></div>
<label class="check"><input type="checkbox" checked>I confirm I actually used this service</label>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-service flex-1" data-modal-close data-toast="Thanks! Your review is under moderation">Submit review</button></div></div></div></div>
${modals(d)}`;

fs.writeFileSync('service-details.html', L.page({title:'CoolCare AC Servicing & Repair, Uttara — Service Details', desc:'CoolCare AC Servicing & Repair in Uttara, Dhaka. Ratings, price list, photos, timings and online booking.', body:sdBody}));
console.log('services.html, service-details.html');
