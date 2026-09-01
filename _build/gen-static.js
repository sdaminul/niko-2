const fs = require('fs');
const { svg, ph, stars } = require('./ui');
const L = require('./layout');
const B = require('./blocks');
const { modals } = B;
const d = false;
const W = (f, o) => fs.writeFileSync(f, L.page(o));

/* ------------------------------- ABOUT ------------------------------- */
W('about.html', {
  title: 'About Us', body: `
<section class="ph ph-c grid-noise text-white"><div class="shell py-14 sm:py-20 relative z-10 max-w-3xl">
<span class="badge !bg-white/20 !text-white mb-3">${svg('sparkle')}Our story</span>
<h1 class="font-display text-[32px] sm:text-[46px] font-extrabold leading-[1.1] tracking-tight mb-4">Connecting every Bangladeshi to the products and services they need</h1>
<p class="text-[15px] text-white/85 leading-relaxed">HaatBazar is Bangladesh's first platform where you can buy a smartphone and book an AC technician in the same session — one account, one cart, one trusted experience.</p></div></section>
<main class="shell py-12">
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">${[['4.2M', 'Monthly shoppers'], ['48,320', 'Product sellers'], ['132,400', 'Service providers'], ['64', 'Districts served']].map(s => `<div class="card p-5 text-center"><p class="font-display text-[30px] font-extrabold text-brand-600">${s[0]}</p><p class="text-[12.5px] text-ink-500 mt-1">${s[1]}</p></div>`).join('')}</div>
<div class="grid lg:grid-cols-2 gap-8 items-center mb-12">
<div>${ph(1, 'store', 'h-[300px] w-full rounded-2xl')}</div>
<div class="rich"><h2 class="!mt-0">Why we exist</h2>
<p>In 2019 our founders ran a small electronics shop in Mirpur. Customers who bought an air conditioner always asked the same question: “Who will install it?” There was no reliable answer — just a phone number scribbled on a business card.</p>
<p>That gap became HaatBazar. We built a single platform where a verified seller can list a product and a verified technician can list a service, so customers never have to choose between convenience and trust.</p>
<p>Today more than 180,000 businesses — from Dhaka mall stores to single-person workshops in Jamalpur — earn a living on HaatBazar, and 4.2 million people shop and book with us every month.</p></div></div>
<div class="grid md:grid-cols-3 gap-4 mb-12">${[['heart', 'Customer obsession', 'Every decision starts with the shopper. If it is not better for them, we do not ship it.'], ['shield', 'Trust by default', 'Manual verification, secure payments and honest reviews — no shortcuts.'], ['users', 'Local empowerment', 'We help small businesses in every district compete with the biggest brands.'], ['bolt', 'Speed matters', 'Fast pages, fast delivery and fast answers. Waiting is a design failure.'], ['globe', 'Built for Bangladesh', 'bKash, cash on delivery, Bangla support and district-level logistics.'], ['award', 'Fair for sellers', 'Low commission, weekly payouts and transparent policies.']].map(v => `<div class="card p-5"><span class="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 grid place-items-center mb-3">${svg(v[0], 'w-5 h-5')}</span><p class="text-[15px] font-extrabold mb-1.5">${v[1]}</p><p class="text-[13px] text-ink-500 leading-relaxed">${v[2]}</p></div>`).join('')}</div>
<div class="card p-6 sm:p-8 mb-12"><h2 class="font-display text-[22px] font-extrabold mb-6">Our journey</h2>
<div class="timeline">${[['2019 — The idea', 'Founded in a Mirpur electronics shop after one too many “who will install it?” questions.', 'is-done'], ['2020 — First 1,000 sellers', 'Launched the product marketplace during the pandemic, delivering essentials in Dhaka.', 'is-done'], ['2021 — Services launch', 'Added the local directory with 8,000 verified providers in 6 cities.', 'is-done'], ['2023 — Nationwide', 'Reached all 64 districts with our own logistics network.', 'is-done'], ['2025 — 1 million products', 'Crossed 1.2M listings and ৳240 crore paid out to sellers.', 'is-done'], ['2026 — What’s next', 'Same-hour delivery in 12 cities and an AI assistant that books services for you.', 'is-active']].map(t => `<div class="tl-item ${t[2]}"><p class="text-[14px] font-extrabold">${t[0]}</p><p class="text-[13px] text-ink-500">${t[1]}</p></div>`).join('')}</div></div>
<div class="mb-12"><h2 class="font-display text-[22px] font-extrabold mb-5 text-center">Leadership team</h2>
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">${[['Tanvir Rahman', 'Co-founder & CEO'], ['Sadia Karim', 'Co-founder & COO'], ['Arif Hossain', 'Chief Technology Officer'], ['Nabila Chowdhury', 'VP, Seller Growth'], ['Mahmud Alam', 'VP, Logistics'], ['Farhana Yeasmin', 'Head of Trust & Safety'], ['Rezaul Karim', 'Head of Service Network'], ['Ishrat Jahan', 'Head of Customer Care']].map((m, i) => `<div class="card p-5 text-center card-hover">${ph(i, 'user', 'w-20 h-20 rounded-2xl mx-auto mb-3')}<p class="text-[14px] font-extrabold">${m[0]}</p><p class="text-[12px] text-ink-500">${m[1]}</p></div>`).join('')}</div></div>
<div class="rounded-2xl ph ph-a grid-noise p-8 text-white text-center"><h2 class="font-display text-[26px] font-extrabold mb-2 relative z-10">Join the marketplace</h2>
<p class="text-[14px] text-white/80 mb-5 relative z-10">Whether you sell products or provide services, your next customer is here.</p>
<div class="flex flex-wrap justify-center gap-2.5 relative z-10"><a href="become-seller.html" class="btn btn-lg !bg-white !text-brand-600">Start selling</a><a href="become-provider.html" class="btn btn-lg !bg-white/15 !text-white">List a service</a></div></div>
</main>${modals(d)}` });

/* ------------------------------ CONTACT ------------------------------ */
W('contact.html', {
  title: 'Contact Us', body: `
${L.crumb([{ t: 'Contact Us' }], d)}
<main class="shell py-8">
<div class="max-w-2xl mb-8"><h1 class="font-display text-[28px] font-extrabold tracking-tight mb-2">We're here to help</h1>
<p class="text-[14px] text-ink-500">Reach our support team 24/7 by phone, chat or email — or drop into one of our offices.</p></div>
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">${[['phone', 'Call us', '16247 (24/7)', 'Toll free from any operator'], ['msg', 'Live chat', 'Start a chat', 'Average reply in 2 minutes'], ['mail', 'Email', 'support@haatbazar.com.bd', 'Reply within 6 hours'], ['question', 'Help centre', 'Browse articles', '240+ answers ready']].map(x => `<div class="card p-5 card-hover"><span class="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 grid place-items-center mb-3">${svg(x[0], 'w-5 h-5')}</span><p class="text-[13px] text-ink-500 mb-0.5">${x[1]}</p><p class="text-[15px] font-extrabold mb-1">${x[2]}</p><p class="text-[12px] text-ink-400">${x[3]}</p></div>`).join('')}</div>
<div class="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-5">
<div class="card p-5 sm:p-6"><h2 class="font-display text-[19px] font-extrabold mb-4">Send us a message</h2>
<div class="grid sm:grid-cols-2 gap-4">
<div><label class="label">Full name <span class="req">*</span></label><input class="input" placeholder="Your name"></div>
<div><label class="label">Mobile number <span class="req">*</span></label><div class="input-affix"><span class="affix">+880</span><input class="input" placeholder="1XXXXXXXXX"></div></div>
<div><label class="label">Email address</label><input class="input" placeholder="you@example.com"></div>
<div><label class="label">I am a <span class="req">*</span></label><select class="select"><option>Customer</option><option>Product seller</option><option>Service provider</option><option>Corporate / partnership</option><option>Media / press</option></select></div>
<div><label class="label">Topic <span class="req">*</span></label><select class="select"><option>Order issue</option><option>Return or refund</option><option>Delivery delay</option><option>Payment problem</option><option>Account &amp; login</option><option>Seller onboarding</option><option>Service booking</option><option>Report a listing</option><option>Feedback / suggestion</option><option>Other</option></select></div>
<div><label class="label">Order or booking ID</label><input class="input" placeholder="e.g. HB-2026-884213"></div>
<div class="sm:col-span-2"><label class="label">Subject <span class="req">*</span></label><input class="input" placeholder="Short summary of your issue"></div>
<div class="sm:col-span-2"><label class="label">Message <span class="req">*</span></label><textarea class="textarea !min-h-[140px]" placeholder="Describe your issue in detail…"></textarea></div>
<div class="sm:col-span-2"><label class="label">Attachments</label><div class="upload-box">${svg('camera', 'w-5 h-5')}<span>Upload screenshots or photos (max 5 files, 5 MB each)</span></div></div>
<div class="sm:col-span-2"><label class="check"><input type="checkbox" checked>I agree that HaatBazar may contact me about this enquiry.</label></div>
<div class="sm:col-span-2 flex gap-2.5"><button class="btn btn-lg btn-primary" data-toast="Message sent — ticket #58120 created">${svg('mail')}Send message</button><button class="btn btn-lg btn-outline">Clear form</button></div></div></div>
<aside class="space-y-4">
<div class="card p-5"><h3 class="text-[15px] font-extrabold mb-3">Head office</h3>
<div class="rounded-xl overflow-hidden border border-[#e7e9ef] mb-3">${ph(9, 'pin', 'h-[140px] w-full')}</div>
<p class="text-[13px] text-ink-600 leading-relaxed">Level 9, Rangs Babylonia<br>246 Bir Uttam Mir Shawkat Sarak<br>Tejgaon, Dhaka 1208, Bangladesh</p>
<div class="dotted-sep my-3"></div>
<div class="space-y-2 text-[12.5px]">${[['phone', '+880 9612-345678'], ['mail', 'hello@haatbazar.com.bd'], ['clock', 'Sun–Thu, 9 AM – 6 PM']].map(x => `<p class="flex items-center gap-2 text-ink-600">${svg(x[0], 'w-4 h-4 text-brand-500')}${x[1]}</p>`).join('')}</div></div>
<div class="card p-5"><h3 class="text-[15px] font-extrabold mb-3">Regional offices</h3>
<div class="space-y-3">${[['Chattogram', 'Agrabad C/A, Chattogram 4100', '+880 9612-345679'], ['Sylhet', 'Zindabazar, Sylhet 3100', '+880 9612-345680'], ['Khulna', 'KDA Avenue, Khulna 9100', '+880 9612-345681'], ['Rajshahi', 'Shaheb Bazar, Rajshahi 6100', '+880 9612-345682']].map(o => `<div class="p-3 rounded-xl bg-ink-50"><p class="text-[13px] font-extrabold">${o[0]}</p><p class="text-[12px] text-ink-500">${o[1]}</p><p class="text-[12px] text-brand-600 font-bold">${o[2]}</p></div>`).join('')}</div></div>
<div class="card p-5"><h3 class="text-[15px] font-extrabold mb-3">Department contacts</h3>
<div class="space-y-2 text-[12.5px]">${[['Seller support', 'sellers@haatbazar.com.bd'], ['Provider support', 'providers@haatbazar.com.bd'], ['Corporate sales', 'business@haatbazar.com.bd'], ['Press &amp; media', 'press@haatbazar.com.bd'], ['Careers', 'jobs@haatbazar.com.bd'], ['Report abuse', 'trust@haatbazar.com.bd']].map(x => `<div class="flex justify-between gap-2 py-1.5 border-b border-[#f4f5f8]"><span class="text-ink-500">${x[0]}</span><a href="#" class="link">${x[1]}</a></div>`).join('')}</div></div>
</aside></div></main>${modals(d)}` });

/* ------------------------------- FAQ / HELP ------------------------------- */
const faqGroups = [
  ['Orders & shopping', 'cart', [['How do I place an order?', 'Add products to your cart, choose a delivery address and payment method, then tap “Place order”. You can also check out as a guest using just your phone number.'], ['Can I change or cancel my order?', 'Yes — before the seller ships it. Go to My Orders, open the order and tap Cancel. Once shipped, you can refuse the parcel at delivery or start a return.'], ['How do I track my order?', 'Open My Orders in your dashboard, or use the Track Order page with your order number and phone. You will also get SMS updates at every stage.'], ['Why was my order split into multiple parcels?', 'Items from different sellers ship separately so each one reaches you as fast as possible. You are charged delivery per shipment, shown at checkout.']]],
  ['Payments & pricing', 'wallet', [['What payment methods can I use?', 'bKash, Nagad, Rocket, Visa/Mastercard/Amex, internet banking, EMI on 12 banks, HaatBazar wallet and cash on delivery.'], ['Is cash on delivery available everywhere?', 'COD is available in all 64 districts for orders below ৳50,000. Some remote unions may require partial advance payment.'], ['When am I charged?', 'Online payments are captured at checkout. For COD you pay the rider on delivery. Failed payments are auto-refunded within 3–7 working days.'], ['How do vouchers and cashback work?', 'Collect vouchers from the Offers page or seller pages, then apply them in the cart. Bank cashback is credited by the bank within 30 days.']]],
  ['Delivery & shipping', 'truck', [['How long does delivery take?', 'Inside Dhaka: same day or next day. Other cities: 2–3 days. Remote areas: 3–5 days. Every product page shows an exact estimate for your area.'], ['How much is the delivery fee?', 'From ৳60 inside Dhaka and ৳120 outside, calculated by weight and seller location. Many sellers offer free delivery above a minimum spend.'], ['Can I choose a delivery time?', 'Yes — express slots are available in Dhaka, Chattogram and Sylhet. You can also reschedule a delivery once from the tracking page.'], ['What if I am not home?', 'The rider will call you and attempt delivery up to 3 times. You can also nominate a neighbour or ask for hold at the nearest hub.']]],
  ['Returns & refunds', 'return', [['What is the return policy?', 'Most items can be returned within 7 days of delivery if damaged, defective, wrong or significantly different from the description. Some categories are non-returnable for hygiene reasons.'], ['How do I return an item?', 'Go to My Orders → Return/Cancel, choose the item and reason, upload photos, and we arrange a free pickup within 48 hours.'], ['When will I get my refund?', 'Refunds are issued within 3–7 working days after the item passes inspection. bKash/Nagad refunds are instant to your HaatBazar wallet if you prefer.'], ['Which items cannot be returned?', 'Innerwear, cosmetics that have been opened, perishable food, customised items and digital products — unless they arrive damaged.']]],
  ['Services & bookings', 'wrench', [['How do I book a service provider?', 'Open the provider’s page and tap Book now or Request a quote. Choose a date and time slot, describe the job and confirm. Many providers also accept direct calls.'], ['Do I pay through HaatBazar for services?', 'For most jobs you pay the provider directly after the work is completed. Some providers accept advance online booking payments, clearly marked on their page.'], ['Are providers verified?', 'Verified Pro and Premium providers have submitted NID and trade licence, which our team checks manually. Look for the green verified badge.'], ['What if the provider does not show up?', 'Report it from your Bookings page. We follow up with the provider, refund any advance and may suspend repeat offenders.']]],
  ['Account & security', 'lock', [['How do I create an account?', 'Tap Register, enter your name, phone number and password, then verify the 6-digit OTP. You can also sign up with Google, Facebook or Apple.'], ['I forgot my password — what now?', 'Use Forgot password on the sign-in page. We send a reset code to your registered phone or email; the code expires in 10 minutes.'], ['How do you protect my data?', 'All traffic is encrypted with TLS, passwords are hashed, and card details are handled by PCI-DSS certified gateways — we never store them.'], ['How do I delete my account?', 'Go to Profile → Settings → Delete account. We remove your personal data within 30 days, keeping only what tax law requires.']]],
  ['Selling on HaatBazar', 'store', [['How do I become a seller?', 'Complete the seller registration form with your NID and business details. Most accounts are approved within 24 hours.'], ['What are the fees?', 'No listing or monthly fees. Category commission is 3–8% and is only charged on delivered orders.'], ['When do sellers get paid?', 'Every Sunday for all orders delivered and past the return window. Funds arrive in your bank or bKash within 1–2 working days.'], ['Can I sell both products and services?', 'Yes. Your seller centre lets you switch between the product shop and the service listing dashboards from one login.']]]
];
W('faq.html', {
  title: 'FAQ', body: `
${L.crumb([{ t: 'FAQ' }], d)}
<main class="shell py-8">
<div class="max-w-2xl mb-7"><h1 class="font-display text-[28px] font-extrabold tracking-tight mb-2">Frequently asked questions</h1>
<p class="text-[14px] text-ink-500 mb-4">Quick answers about orders, payments, delivery, returns, services and selling.</p>
<div class="input-group">${svg('search')}<input class="input" placeholder="Search a question…"></div></div>
<div class="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-6">
<aside class="lg:sticky-24 h-max"><div class="card p-3">${faqGroups.map((g, i) => `<a href="#g${i}" class="dd-item ${i === 0 ? '!bg-brand-50 !text-brand-700' : ''}">${svg(g[1])}${g[0]}</a>`).join('')}</div>
<div class="card p-5 mt-4 text-center"><span class="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 grid place-items-center mx-auto mb-2.5">${svg('msg', 'w-5 h-5')}</span>
<p class="text-[13.5px] font-extrabold mb-1">Still stuck?</p><p class="text-[12px] text-ink-500 mb-3">Our team replies in about 2 minutes.</p>
<a href="contact.html" class="btn btn-sm btn-primary btn-block">Contact support</a></div></aside>
<div class="space-y-6">${faqGroups.map((g, gi) => `<div class="card p-5" id="g${gi}">
<h2 class="font-display text-[18px] font-extrabold mb-4 flex items-center gap-2.5"><span class="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 grid place-items-center">${svg(g[1], 'w-4 h-4')}</span>${g[0]}</h2>
<div class="space-y-2.5">${g[2].map((f, i) => `<details class="rounded-xl border border-[#e7e9ef] p-4" ${gi === 0 && i === 0 ? 'open' : ''}>
<summary class="flex items-center justify-between gap-3 cursor-pointer text-[14px] font-extrabold list-none">${f[0]}${svg('chevD', 'w-4 h-4 text-ink-400 shrink-0')}</summary>
<p class="text-[13px] text-ink-500 leading-relaxed mt-2.5">${f[1]}</p>
<div class="flex items-center gap-2 mt-3 pt-3 border-t border-[#f4f5f8]"><span class="text-[12px] text-ink-400">Was this helpful?</span><button class="btn btn-xs btn-outline">${svg('up')}Yes</button><button class="btn btn-xs btn-outline">${svg('down')}No</button></div></details>`).join('')}</div></div>`).join('')}</div></div></main>${modals(d)}` });

W('help-center.html', {
  title: 'Help Centre', body: `
${L.crumb([{ t: 'Help Centre' }], d)}
<main class="shell py-8">
<div class="rounded-2xl ph ph-c grid-noise p-8 sm:p-10 text-white mb-7 text-center">
<h1 class="font-display text-[28px] sm:text-[34px] font-extrabold tracking-tight mb-2 relative z-10">How can we help you?</h1>
<p class="text-[14px] text-white/80 mb-5 relative z-10">Search 240+ help articles or browse by topic.</p>
<div class="max-w-xl mx-auto relative z-10"><div class="input-group">${svg('search')}<input class="input !h-12" placeholder="Search: refund, delivery time, cancel order…"></div></div>
<div class="flex flex-wrap justify-center gap-2 mt-4 relative z-10">${['Track my order', 'Return an item', 'Refund status', 'Change address', 'Cancel booking'].map(x => `<a href="#" class="badge !bg-white/20 !text-white">${x}</a>`).join('')}</div></div>
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">${[['box', 'Orders & delivery', '48 articles'], ['return', 'Returns & refunds', '32 articles'], ['wallet', 'Payments & wallet', '29 articles'], ['wrench', 'Service bookings', '35 articles'], ['user', 'Account & profile', '22 articles'], ['store', 'Selling & seller centre', '41 articles'], ['shield', 'Trust & safety', '18 articles'], ['question', 'Everything else', '15 articles']].map(x => `<a href="faq.html" class="card p-5 card-hover"><span class="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 grid place-items-center mb-3">${svg(x[0], 'w-5 h-5')}</span><p class="text-[14.5px] font-extrabold mb-0.5">${x[1]}</p><p class="text-[12px] text-ink-500">${x[2]}</p></a>`).join('')}</div>
<div class="grid lg:grid-cols-2 gap-5 mb-8">
<div class="card p-5"><h2 class="text-[16px] font-extrabold mb-3">Popular articles</h2>
<div class="space-y-1">${['How to track your order step by step', 'What to do if your parcel is damaged', 'How refunds are processed and how long they take', 'How to change your delivery address after ordering', 'Understanding delivery charges', 'How to leave a review with photos', 'What the verified provider badge means', 'How to report a fake product'].map(a => `<a href="#" class="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-ink-50 text-[13px] text-ink-700">${svg('file', 'w-4 h-4 text-ink-400 shrink-0')}<span class="clamp-1">${a}</span>${svg('chevR', 'w-4 h-4 text-ink-300 ml-auto shrink-0')}</a>`).join('')}</div></div>
<div class="card p-5"><h2 class="text-[16px] font-extrabold mb-3">Contact options</h2>
<div class="space-y-3">${[['phone', 'Call 16247', '24 hours · toll free', 'btn-primary', 'Call now'], ['msg', 'Live chat', 'Average wait 2 minutes', 'btn-outline', 'Start chat'], ['mail', 'Email support', 'Reply within 6 hours', 'btn-outline', 'Send email'], ['ticket', 'My support tickets', 'Track your open issues', 'btn-outline', 'View tickets']].map(x => `<div class="flex items-center gap-3 p-3.5 rounded-xl border border-[#e7e9ef]"><span class="w-10 h-10 rounded-lg bg-ink-50 text-ink-600 grid place-items-center shrink-0">${svg(x[0], 'w-4 h-4')}</span><div class="flex-1 min-w-0"><p class="text-[13.5px] font-extrabold">${x[1]}</p><p class="text-[12px] text-ink-500">${x[2]}</p></div><button class="btn btn-xs ${x[3]}">${x[4]}</button></div>`).join('')}</div></div></div>
</main>${modals(d)}` });

/* ------------------------------ POLICIES ------------------------------ */
const policyPage = (file, title, intro, sections) => W(file, {
  title, body: `
${L.crumb([{ t: title }], d)}
<main class="shell py-8"><div class="grid lg:grid-cols-[250px_minmax(0,1fr)] gap-6">
<aside class="lg:sticky-24 h-max"><div class="card p-4"><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">On this page</p>
${sections.map((s, i) => `<a href="#s${i}" class="block py-1.5 text-[12.5px] text-ink-600 hover:text-brand-600">${s[0]}</a>`).join('')}</div>
<div class="card p-4 mt-4"><p class="text-[12.5px] font-extrabold mb-2">Related policies</p>
<div class="space-y-1.5 text-[12.5px]">${[['Terms of Service', 'terms.html'], ['Privacy Policy', 'privacy-policy.html'], ['Return &amp; Refund Policy', 'return-policy.html'], ['Shipping Policy', 'shipping-policy.html'], ['Seller Agreement', 'terms.html']].map(x => `<a href="${x[1]}" class="block link-muted">${x[0]}</a>`).join('')}</div></div></aside>
<div class="card p-6 sm:p-8"><h1 class="font-display text-[28px] font-extrabold tracking-tight mb-2">${title}</h1>
<p class="text-[12.5px] text-ink-400 mb-5">Last updated: 1 August 2026 · Effective from 15 August 2026</p>
<div class="rich"><p class="!text-[15px]">${intro}</p>
${sections.map((s, i) => `<h2 id="s${i}">${i + 1}. ${s[0]}</h2>${s[1]}`).join('')}
<blockquote>Questions about this policy? Email <a href="contact.html">legal@haatbazar.com.bd</a> or call 16247. We respond to every policy enquiry within 3 working days.</blockquote></div>
<div class="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#f0f1f5]"><button class="btn btn-sm btn-outline">${svg('print')}Print</button><button class="btn btn-sm btn-outline">${svg('dl')}Download PDF</button><a href="contact.html" class="btn btn-sm btn-outline">${svg('msg')}Ask a question</a></div></div></div></main>${modals(d)}` });

policyPage('terms.html', 'Terms of Service', 'These Terms govern your use of HaatBazar — our website, mobile apps and all related services. By creating an account, placing an order, booking a service or listing a business, you agree to these Terms in full.', [
  ['Definitions', '<p>“Platform” means the HaatBazar website and apps. “Customer” means any person who browses, buys or books. “Vendor” means a product seller or service provider listing on the Platform. “Order” means a purchase of goods; “Booking” means an appointment for a service; “Lead” means a customer enquiry sent to a provider.</p>'],
  ['Eligibility and accounts', '<p>You must be at least 18 years old, or use the Platform under the supervision of a parent or guardian. You are responsible for keeping your password confidential and for all activity under your account.</p><ul><li>One person may hold one customer account.</li><li>Vendor accounts require identity verification (NID) and, where applicable, a trade licence.</li><li>We may suspend accounts that provide false information, abuse promotions, or violate these Terms.</li></ul>'],
  ['Marketplace role', '<p>HaatBazar is a marketplace. Contracts for goods are formed between the customer and the seller; contracts for services are formed between the customer and the provider. We facilitate discovery, communication, payment and dispute resolution, but we are not the manufacturer or the service performer unless a listing is explicitly marked “Fulfilled by HaatBazar”.</p>'],
  ['Listings and content', '<p>Vendors are solely responsible for the accuracy of their listings, including price, stock, specifications, images and service descriptions. Prohibited listings include counterfeit goods, weapons, narcotics, prescription-only medicine without licence, wildlife products, adult content, and anything illegal under Bangladeshi law.</p>'],
  ['Pricing, payment and taxes', '<p>All prices are in Bangladeshi Taka and include VAT unless stated otherwise. We accept mobile financial services, cards, bank transfer, EMI and cash on delivery. Where a price is listed in obvious error, we may cancel the order and refund you in full.</p>'],
  ['Delivery and performance', '<p>Delivery estimates are indicative. Risk passes to the customer on delivery. For services, the provider must arrive within the agreed slot or notify the customer at least 2 hours in advance.</p>'],
  ['Cancellations, returns and refunds', '<p>Cancellation and return rights are described in our <a href="return-policy.html">Return &amp; Refund Policy</a>, which forms part of these Terms.</p>'],
  ['Reviews and community rules', '<p>Reviews must reflect genuine experience. We remove reviews containing abuse, personal data, competitor promotion or paid manipulation, and we may suspend accounts that post them.</p>'],
  ['Intellectual property', '<p>The HaatBazar name, logo, design and software are our property. Vendors grant us a non-exclusive licence to display their content for the purpose of operating and marketing the Platform.</p>'],
  ['Limitation of liability', '<p>To the maximum extent permitted by law, our aggregate liability for any claim is limited to the value of the order or booking concerned. We are not liable for indirect or consequential loss.</p>'],
  ['Suspension and termination', '<p>We may suspend or terminate access for breach of these Terms, fraud, repeated policy violations or legal requirement. You may close your account at any time from your profile settings.</p>'],
  ['Governing law and disputes', '<p>These Terms are governed by the laws of Bangladesh. Disputes are subject to the exclusive jurisdiction of the courts of Dhaka. We encourage you to contact our resolution centre first — most disputes are settled within 7 days.</p>'],
  ['Changes to these Terms', '<p>We may update these Terms. Material changes are notified by email or in-app notice at least 7 days before they take effect. Continued use after that date means you accept the updated Terms.</p>']
]);

policyPage('privacy-policy.html', 'Privacy Policy', 'This Policy explains what personal data HaatBazar collects, why we collect it, how we use and share it, and the choices and rights you have. We designed our systems so that we only collect what is genuinely needed to run the marketplace.', [
  ['Information we collect', '<p>We collect information you give us, information generated by your use of the Platform, and limited information from partners.</p><table><thead><tr><th>Category</th><th>Examples</th><th>Purpose</th></tr></thead><tbody><tr><td>Account data</td><td>Name, phone, email, password hash</td><td>Create and secure your account</td></tr><tr><td>Order data</td><td>Addresses, items, payment status</td><td>Fulfil orders and bookings</td></tr><tr><td>Device data</td><td>IP, browser, device ID, app version</td><td>Security, fraud prevention, analytics</td></tr><tr><td>Location</td><td>Approximate or precise location (with permission)</td><td>Show nearby providers and delivery estimates</td></tr><tr><td>Vendor KYC</td><td>NID, trade licence, bank details</td><td>Legal verification and payouts</td></tr><tr><td>Support data</td><td>Chat transcripts, call recordings</td><td>Resolve your issues and train our team</td></tr></tbody></table>'],
  ['How we use your data', '<ul><li>Process orders, bookings, payments and refunds</li><li>Show relevant products, services and offers</li><li>Prevent fraud, abuse and unauthorised access</li><li>Send transactional messages (always) and marketing messages (only with consent)</li><li>Improve search ranking, recommendations and app performance</li><li>Meet legal, tax and regulatory obligations</li></ul>'],
  ['Payment information', '<p>Card details are captured directly by PCI-DSS certified payment gateways. HaatBazar never stores full card numbers or CVV. Mobile wallet transactions share only a masked account reference with us.</p>'],
  ['Sharing your data', '<p>We share only what is necessary: your name, address and phone with the seller and courier fulfilling your order; your enquiry details with a service provider you contact; anonymised analytics with our tools; and information with regulators or courts when legally required. We never sell your personal data.</p>'],
  ['Cookies and similar technologies', '<p>We use essential cookies (login, cart), preference cookies (language, city) and analytics cookies. You can manage non-essential cookies from the cookie banner or your browser settings.</p>'],
  ['Data retention', '<p>Account data is kept while your account is active. Order and invoice records are retained for 6 years to meet tax law. Support recordings are deleted after 12 months. Deleted accounts are anonymised within 30 days.</p>'],
  ['Your rights and choices', '<ul><li>Access and download a copy of your data</li><li>Correct inaccurate information from your profile</li><li>Delete your account and personal data</li><li>Opt out of marketing at any time</li><li>Withdraw location or notification permissions from your device</li></ul>'],
  ['Children’s privacy', '<p>The Platform is not intended for children under 13. If we learn we have collected data from a child, we delete it promptly.</p>'],
  ['Security', '<p>We use TLS encryption in transit, encryption at rest for sensitive fields, hashed passwords, role-based staff access, audit logging and regular penetration testing. No system is perfectly secure, so please use a strong, unique password.</p>'],
  ['Contact and complaints', '<p>Email our Data Protection Officer at dpo@haatbazar.com.bd. If you are unsatisfied with our response, you may escalate to the relevant authority in Bangladesh.</p>']
]);

policyPage('return-policy.html', 'Return & Refund Policy', 'We want you to be completely satisfied. This Policy explains when you can return an item, how the process works, how long refunds take, and what is not eligible.', [
  ['Return window', '<p>You may request a return within <b>7 days</b> of delivery for most categories. Selected electronics carry a 3-day dead-on-arrival window, and fresh food must be reported within 24 hours.</p>'],
  ['Valid return reasons', '<ul><li>Item arrived damaged or broken</li><li>Wrong item, size, colour or variant delivered</li><li>Item is defective or does not power on</li><li>Item significantly differs from its description or photos</li><li>Counterfeit or unauthorised product</li><li>Missing parts or accessories</li></ul>'],
  ['Non-returnable items', '<p>For hygiene, safety and legal reasons the following cannot be returned unless they arrive damaged: innerwear and swimwear, opened cosmetics and skincare, perishable food, medicines, customised or made-to-order items, digital goods and gift cards, and items with a broken security seal.</p>'],
  ['Condition requirements', '<p>Items must be returned in their original packaging with all tags, manuals, free gifts and accessories included. Products showing signs of use, installation damage or unauthorised repair may be rejected.</p>'],
  ['How to request a return', '<ol><li>Go to <b>My Orders</b> → select the order → <b>Return / Cancel</b></li><li>Choose the item and the reason, and upload clear photos</li><li>Submit — you receive a return ID immediately</li><li>Our courier collects the parcel free of charge within 48 hours</li><li>The seller inspects the item within 2 working days</li><li>Your refund is approved and issued</li></ol>'],
  ['Refund methods and timelines', '<table><thead><tr><th>Original payment</th><th>Refund destination</th><th>Timeline</th></tr></thead><tbody><tr><td>bKash / Nagad / Rocket</td><td>Same wallet</td><td>1–3 working days</td></tr><tr><td>Card</td><td>Same card</td><td>5–10 working days</td></tr><tr><td>Internet banking</td><td>Same bank account</td><td>3–7 working days</td></tr><tr><td>Cash on delivery</td><td>Bank / bKash of your choice</td><td>3–7 working days</td></tr><tr><td>Any method</td><td>HaatBazar wallet</td><td>Instant</td></tr></tbody></table>'],
  ['Cancellations', '<p>Orders can be cancelled free of charge any time before the seller ships them. After shipping, refuse the parcel at the door or file a return. Service bookings can be cancelled up to 4 hours before the slot without any charge.</p>'],
  ['Exchanges', '<p>Where the seller has stock, you can request an exchange for a different size or colour instead of a refund. Exchange parcels ship within 2 working days of the returned item passing inspection.</p>'],
  ['Warranty claims', '<p>Warranty issues discovered after the return window are handled by the brand’s service centre. Open a support ticket and we will share the nearest authorised centre and help you follow up.</p>'],
  ['Disputes', '<p>If a return is rejected and you disagree, escalate to our Resolution Centre within 7 days. An independent HaatBazar agent reviews the evidence and issues a final decision, usually within 5 working days.</p>']
]);

policyPage('shipping-policy.html', 'Shipping & Delivery Policy', 'This Policy explains delivery areas, timelines, charges, packaging standards and what happens when something goes wrong in transit.', [
  ['Coverage', '<p>We deliver to all 64 districts of Bangladesh through HaatBazar Express and partner couriers, covering over 4,800 unions. A small number of char and hill areas may require pickup from the nearest hub.</p>'],
  ['Delivery timelines', '<table><thead><tr><th>Zone</th><th>Standard</th><th>Express</th></tr></thead><tbody><tr><td>Dhaka metro</td><td>Next day</td><td>Same day (order before 2 PM)</td></tr><tr><td>Chattogram, Sylhet, Khulna, Rajshahi</td><td>2 working days</td><td>Next day</td></tr><tr><td>Other district towns</td><td>3 working days</td><td>2 working days</td></tr><tr><td>Upazila &amp; rural</td><td>3–5 working days</td><td>Not available</td></tr></tbody></table>'],
  ['Delivery charges', '<p>Charges start at ৳60 inside Dhaka and ৳120 outside, calculated on weight, size and seller location. Multiple sellers mean multiple shipments, each with its own fee, always shown before payment. Many sellers offer free delivery above a minimum order value.</p>'],
  ['Order processing', '<p>Sellers must confirm and hand over parcels within 24 hours (48 hours for made-to-order items). You receive an SMS with tracking as soon as the courier scans your parcel.</p>'],
  ['Delivery attempts', '<p>Our rider attempts delivery up to 3 times and calls before each attempt. After 3 failed attempts the parcel returns to the seller and prepaid amounts are refunded, minus the return shipping fee where the failure was avoidable.</p>'],
  ['Packaging standards', '<p>Fragile items must be bubble-wrapped and marked; liquids must be sealed and double-bagged; electronics must ship in original boxes. Sellers who repeatedly breach packaging standards face penalties.</p>'],
  ['Damaged or lost parcels', '<p>Report damage within 48 hours with photos of the parcel and item. Lost parcels are investigated within 5 working days; if confirmed lost, you receive a full refund or replacement at your choice.</p>'],
  ['Store pickup', '<p>Selected sellers offer free pickup from their outlet. Choose “Store pickup” at checkout, wait for the ready notification, and collect within 3 days with your order ID.</p>']
]);

/* ------------------------------- BLOG ------------------------------- */
const posts = [['How to spot a genuine smartphone before you pay', 'Buying Guide', '8 min read', '14 Aug 2026'], ['10 questions to ask before hiring an AC technician', 'Services', '6 min read', '12 Aug 2026'], ['Eid shopping on a budget: 25 gifts under ৳1,000', 'Deals', '5 min read', '10 Aug 2026'], ['From Jamalpur to nationwide: a nokshi kantha story', 'Seller Stories', '7 min read', '8 Aug 2026'], ['Monsoon home maintenance checklist for Dhaka flats', 'Home & Living', '9 min read', '5 Aug 2026'], ['Cash on delivery vs online payment: which is safer?', 'Payments', '4 min read', '2 Aug 2026'], ['How our couriers reach 4,800 unions every week', 'Behind the Scenes', '10 min read', '29 Jul 2026'], ['Starting an online shop with only ৳5,000 capital', 'Seller Guide', '11 min read', '26 Jul 2026'], ['The complete guide to booking a wedding photographer', 'Services', '8 min read', '22 Jul 2026']];
W('blog.html', {
  title: 'Blog', body: `
${L.crumb([{ t: 'Blog' }], d)}
<main class="shell py-8">
<div class="max-w-2xl mb-7"><h1 class="font-display text-[28px] font-extrabold tracking-tight mb-2">HaatBazar Blog</h1>
<p class="text-[14px] text-ink-500">Buying guides, service tips, seller stories and news from Bangladesh's everything marketplace.</p></div>
<div class="grid lg:grid-cols-2 gap-5 mb-8">
<a href="blog-details.html" class="card overflow-hidden card-hover">${ph(0, 'phoneDev', 'h-[240px] w-full')}
<div class="p-5"><span class="badge badge-brand mb-2">Buying Guide</span><h2 class="font-display text-[21px] font-extrabold leading-snug mb-2">${posts[0][0]}</h2>
<p class="text-[13px] text-ink-500 clamp-2 mb-3">Counterfeit devices look convincing. Here is a five-minute checklist — IMEI, box seal, warranty card, display test and price sanity — that protects every purchase.</p>
<div class="flex items-center gap-2 text-[12px] text-ink-400"><span class="avatar avatar-sm bg-ink-700">T</span>Tanvir Rahman · ${posts[0][3]} · ${posts[0][2]}</div></div></a>
<div class="space-y-4">${posts.slice(1, 4).map((p, i) => `<a href="blog-details.html" class="card overflow-hidden card-hover flex gap-4">${ph(i + 1, 'file', 'w-[130px] shrink-0')}
<div class="py-4 pr-4 min-w-0"><span class="badge badge-gray mb-1.5">${p[1]}</span><p class="text-[15px] font-extrabold leading-snug clamp-2 mb-1.5">${p[0]}</p>
<p class="text-[12px] text-ink-400">${p[3]} · ${p[2]}</p></div></a>`).join('')}</div></div>
<div class="flex flex-wrap gap-2 mb-5">${['All posts', 'Buying Guide', 'Services', 'Deals', 'Seller Stories', 'Home & Living', 'Payments', 'Behind the Scenes'].map((x, i) => `<button class="chip ${i === 0 ? 'is-active' : ''}">${x}</button>`).join('')}</div>
<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">${posts.map((p, i) => `<a href="blog-details.html" class="card overflow-hidden card-hover">${ph(i, ['phoneDev', 'fan', 'gift', 'shirt', 'home', 'wallet', 'truck', 'store', 'camera'][i], 'h-[150px] w-full')}
<div class="p-4"><span class="badge badge-gray mb-2">${p[1]}</span><p class="text-[14.5px] font-extrabold leading-snug clamp-2 mb-2">${p[0]}</p>
<p class="text-[12px] text-ink-400">${p[3]} · ${p[2]}</p></div></a>`).join('')}</div>
${B.pager(d)}
<div class="card p-6 sm:p-8 mt-7 bg-ink-950 text-white flex flex-col md:flex-row items-center gap-5">
<div class="flex-1"><h2 class="font-display text-[20px] font-extrabold mb-1.5">Get the weekly HaatBazar digest</h2>
<p class="text-[13px] text-white/70">Deals, guides and seller tips every Thursday. No spam, unsubscribe anytime.</p></div>
<div class="flex gap-2 w-full md:w-auto"><input class="input md:w-64" placeholder="you@example.com"><button class="btn btn-primary shrink-0">Subscribe</button></div></div>
</main>${modals(d)}` });

W('blog-details.html', {
  title: 'How to spot a genuine smartphone', body: `
${L.crumb([{ t: 'Blog', h: 'blog.html' }, { t: 'Buying Guide' }], d)}
<main class="shell py-8"><div class="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-7">
<article class="min-w-0">
<span class="badge badge-brand mb-3">Buying Guide</span>
<h1 class="font-display text-[28px] sm:text-[36px] font-extrabold leading-tight tracking-tight mb-4">How to spot a genuine smartphone before you pay</h1>
<div class="flex flex-wrap items-center gap-3 mb-5 pb-5 border-b border-[#f0f1f5]">
<span class="avatar avatar-md bg-ink-700">T</span>
<div class="flex-1 min-w-0"><p class="text-[13.5px] font-extrabold">Tanvir Rahman</p><p class="text-[12px] text-ink-500">Published 14 Aug 2026 · 8 min read · Updated 16 Aug 2026</p></div>
<div class="flex gap-1.5"><button class="btn btn-xs btn-outline">${svg('share')}Share</button><button class="btn btn-xs btn-outline">${svg('heart')}Save</button><button class="btn btn-xs btn-outline">${svg('print')}Print</button></div></div>
${ph(0, 'phoneDev', 'h-[260px] sm:h-[380px] w-full rounded-2xl mb-6')}
<div class="rich">
<p class="!text-[16px]">Every month our trust team removes thousands of counterfeit listings — but the safest defence is a buyer who knows what to check. This guide walks through the exact five-minute inspection our own quality inspectors use.</p>
<h2>1. Verify the IMEI before opening the box</h2>
<p>Dial <b>*#06#</b> on the device and compare the IMEI with the sticker on the retail box and the one printed under the battery cover or SIM tray. All three must match. Then check the IMEI on the BTRC NEIR portal to confirm the handset is legally imported.</p>
<blockquote>If a seller refuses to let you check the IMEI before payment, walk away. Genuine sellers never object.</blockquote>
<h2>2. Inspect the seal and packaging</h2>
<p>Original boxes use precise, factory-applied shrink wrap with clean, tight corners. Look for:</p>
<ul><li>Crisp printing with no colour bleed or pixelation</li><li>A model and colour label that matches the handset exactly</li><li>Untampered security stickers with holographic elements</li><li>Accessories in sealed compartments, not loose in the box</li></ul>
<h2>3. Test the display and sensors</h2>
<p>Open the dialler test menu, run a full-screen colour test, and check the touch response at the edges. Confirm the fingerprint sensor registers on the first try and the proximity sensor blanks the screen during calls.</p>
<h2>4. Confirm the warranty card and service network</h2>
<p>An official device includes a warranty card with the importer's stamp. Confirm the brand has authorised care centres in Bangladesh and that your model appears on their supported list.</p>
<h2>5. Apply the price sanity test</h2>
<table><thead><tr><th>Situation</th><th>What it usually means</th></tr></thead><tbody><tr><td>5–10% below market</td><td>Normal seller competition — safe</td></tr><tr><td>15–25% below market</td><td>Grey import or refurbished — ask questions</td></tr><tr><td>40%+ below market</td><td>Almost certainly counterfeit — avoid</td></tr></tbody></table>
<h2>What HaatBazar does for you</h2>
<p>Every phone sold by a Mall store is sourced from an authorised importer, and our buyer protection covers you for 7 days after delivery. If a device fails any check above, open a return in one tap and we arrange free pickup.</p>
<p>Still unsure? Book a verified mobile technician near you to inspect the device for a small fee — many of them do house calls the same day.</p></div>
<div class="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#f0f1f5]">${['smartphone', 'buying guide', 'counterfeit', 'IMEI', 'warranty', 'consumer tips'].map(t => `<a href="blog.html" class="chip !h-8">#${t}</a>`).join('')}</div>
<div class="card p-5 mt-6 flex flex-col sm:flex-row gap-4 items-center">
<span class="avatar avatar-xl bg-ink-700">T</span>
<div class="min-w-0 text-center sm:text-left"><p class="text-[15px] font-extrabold">Tanvir Rahman</p><p class="text-[12.5px] text-ink-500 mb-2">Co-founder &amp; CEO at HaatBazar. Writes about consumer protection, retail and building marketplaces in Bangladesh.</p>
<div class="flex gap-2 justify-center sm:justify-start"><button class="btn btn-xs btn-outline">Follow</button><button class="btn btn-xs btn-outline">All posts</button></div></div></div>
<div class="card p-5 mt-6"><h2 class="text-[16px] font-extrabold mb-3">Comments (24)</h2>
<div class="flex gap-3 mb-5"><span class="avatar avatar-md bg-brand-500">N</span>
<div class="flex-1"><textarea class="textarea !min-h-[80px]" placeholder="Share your thoughts…"></textarea>
<div class="flex justify-end mt-2"><button class="btn btn-sm btn-primary">Post comment</button></div></div></div>
<div class="space-y-4">${[['Imran Hossain', '2 days ago', 'The IMEI tip saved me last week — the box and handset numbers did not match and the seller could not explain why.'], ['Sadia Islam', '3 days ago', 'Please write one for laptops too! Same problem with grey imports.'], ['Rakib Mia', '5 days ago', 'Very useful. I always check the warranty card now before paying the rider.']].map(c => `<div class="flex gap-3"><span class="avatar avatar-md bg-ink-700">${c[0][0]}</span>
<div class="flex-1 min-w-0"><div class="flex items-center gap-2"><p class="text-[13.5px] font-extrabold">${c[0]}</p><span class="text-[11.5px] text-ink-400">${c[1]}</span></div>
<p class="text-[13px] text-ink-600 mt-1">${c[2]}</p>
<div class="flex gap-3 mt-1.5 text-[12px] font-bold text-ink-400"><button class="hover:text-brand-600">Like</button><button class="hover:text-brand-600">Reply</button><button class="hover:text-brand-600">Report</button></div></div></div>`).join('')}</div>
<button class="btn btn-sm btn-outline btn-block mt-4">Load more comments</button></div>
</article>
<aside class="space-y-4"><div class="lg:sticky-24 space-y-4">
<div class="card p-5"><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2.5">Table of contents</p>
<div class="space-y-1.5">${['Verify the IMEI', 'Inspect the seal', 'Test display &amp; sensors', 'Confirm the warranty', 'Price sanity test', 'What HaatBazar does'].map((x, i) => `<a href="#" class="block text-[12.5px] ${i === 0 ? 'text-brand-600 font-bold' : 'text-ink-600'} hover:text-brand-600">${i + 1}. ${x}</a>`).join('')}</div></div>
<div class="card p-5"><p class="text-[15px] font-extrabold mb-3">Related posts</p>
<div class="space-y-3">${posts.slice(1, 5).map((p, i) => `<a href="blog-details.html" class="flex gap-2.5">${ph(i + 2, 'file', 'w-16 h-16 rounded-lg shrink-0')}<div class="min-w-0"><p class="text-[12.5px] font-bold clamp-2">${p[0]}</p><p class="text-[11px] text-ink-400 mt-1">${p[3]}</p></div></a>`).join('')}</div></div>
<div class="card p-5 bg-brand-50 border-brand-100"><p class="text-[15px] font-extrabold mb-1.5">Shop verified phones</p>
<p class="text-[12.5px] text-ink-600 mb-3">Browse Mall stores with official warranty and 7-day returns.</p>
<a href="products.html" class="btn btn-sm btn-primary btn-block">Browse smartphones</a></div>
</div></aside></div></main>${modals(d)}` });

/* ------------------------------ CAREERS ------------------------------ */
W('careers.html', {
  title: 'Careers', body: `
<section class="ph ph-e grid-noise text-white"><div class="shell py-14 sm:py-20 relative z-10 max-w-3xl">
<span class="badge !bg-white/20 !text-white mb-3">${svg('users')}We're hiring</span>
<h1 class="font-display text-[32px] sm:text-[44px] font-extrabold leading-[1.1] tracking-tight mb-4">Build the marketplace 4 million Bangladeshis rely on</h1>
<p class="text-[15px] text-white/85 leading-relaxed mb-6">We are 640 people across Dhaka, Chattogram and Sylhet solving hard problems in commerce, logistics and local services.</p>
<a href="#openings" class="btn btn-lg !bg-white !text-ink-950">See open roles ${svg('chevD')}</a></div></section>
<main class="shell py-12">
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">${[['640', 'Team members'], ['3', 'Offices'], ['38%', 'Women in tech'], ['4.6/5', 'Employee rating']].map(s => `<div class="card p-5 text-center"><p class="font-display text-[30px] font-extrabold text-brand-600">${s[0]}</p><p class="text-[12.5px] text-ink-500 mt-1">${s[1]}</p></div>`).join('')}</div>
<h2 class="font-display text-[22px] font-extrabold mb-5">Benefits &amp; perks</h2>
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">${[['money', 'Competitive salary', 'Reviewed twice a year against market data'], ['stethoscope', 'Health coverage', 'Family medical insurance from day one'], ['home', 'Hybrid work', '3 days in office, 2 days remote'], ['graduation', 'Learning budget', '৳50,000 per year for courses and conferences'], ['cal', 'Generous leave', '24 days annual plus all public holidays'], ['gift', 'Festival bonus', 'Two bonuses per year'], ['bag', 'Employee discount', '20% off everything on the platform'], ['users', 'Parental leave', '6 months maternity, 15 days paternity']].map(x => `<div class="card p-5"><span class="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 grid place-items-center mb-3">${svg(x[0], 'w-5 h-5')}</span><p class="text-[14px] font-extrabold mb-1">${x[1]}</p><p class="text-[12.5px] text-ink-500">${x[2]}</p></div>`).join('')}</div>
<h2 class="font-display text-[22px] font-extrabold mb-4" id="openings">Open positions</h2>
<div class="card p-3.5 mb-4 flex flex-col sm:flex-row gap-2.5">
<div class="input-group flex-1">${svg('search')}<input class="input" placeholder="Search roles…"></div>
<select class="select sm:w-44"><option>All departments</option><option>Engineering</option><option>Product &amp; Design</option><option>Operations</option><option>Marketing</option><option>Customer Care</option><option>Finance</option></select>
<select class="select sm:w-40"><option>All locations</option><option>Dhaka</option><option>Chattogram</option><option>Sylhet</option><option>Remote</option></select></div>
<div class="space-y-2.5">${[['Senior Frontend Engineer', 'Engineering', 'Dhaka · Hybrid', 'Full-time'], ['Backend Engineer (Go)', 'Engineering', 'Dhaka · Hybrid', 'Full-time'], ['Android Engineer', 'Engineering', 'Dhaka · Hybrid', 'Full-time'], ['Product Designer', 'Product & Design', 'Dhaka · Hybrid', 'Full-time'], ['Data Analyst', 'Product & Design', 'Dhaka · Remote', 'Full-time'], ['Seller Growth Manager', 'Operations', 'Chattogram', 'Full-time'], ['Service Network Lead', 'Operations', 'Sylhet', 'Full-time'], ['Logistics Coordinator', 'Operations', 'Dhaka', 'Full-time'], ['Performance Marketing Lead', 'Marketing', 'Dhaka · Hybrid', 'Full-time'], ['Content Writer (Bangla)', 'Marketing', 'Remote', 'Contract'], ['Customer Care Executive', 'Customer Care', 'Dhaka', 'Full-time'], ['Finance Analyst', 'Finance', 'Dhaka', 'Full-time']].map(j => `<div class="card p-4 flex flex-wrap items-center gap-3 card-hover">
<div class="flex-1 min-w-[200px]"><p class="text-[14.5px] font-extrabold">${j[0]}</p><p class="text-[12.5px] text-ink-500">${j[1]} · ${j[2]}</p></div>
<span class="badge badge-gray">${j[3]}</span><button class="btn btn-sm btn-outline">View &amp; apply ${svg('chevR')}</button></div>`).join('')}</div>
<div class="card p-6 mt-8 text-center"><p class="text-[15px] font-extrabold mb-1.5">Don't see your role?</p>
<p class="text-[13px] text-ink-500 mb-4">Send us your CV and we will reach out when something matching opens up.</p>
<a href="contact.html" class="btn btn-primary">${svg('mail')}Send an open application</a></div>
</main>${modals(d)}` });

/* ------------------------------ 404 & SITEMAP ------------------------------ */
W('404.html', {
  title: 'Page Not Found', body: `
<main class="shell py-16 text-center max-w-2xl">
<p class="font-display text-[80px] sm:text-[110px] font-extrabold leading-none text-brand-500 mb-2">404</p>
<h1 class="font-display text-[26px] font-extrabold tracking-tight mb-2">This page has gone shopping</h1>
<p class="text-[14px] text-ink-500 mb-6">The page you're looking for doesn't exist or has been moved. Let's get you back on track.</p>
<div class="input-group max-w-md mx-auto mb-5">${svg('search')}<input class="input !h-12" placeholder="Search products or services…"></div>
<div class="flex flex-wrap justify-center gap-2.5 mb-9"><a href="index.html" class="btn btn-primary">${svg('home')}Back to home</a>
<a href="products.html" class="btn btn-outline">Browse products</a><a href="services.html" class="btn btn-outline">Find services</a><a href="contact.html" class="btn btn-ghost">Contact support</a></div>
<div class="grid sm:grid-cols-3 gap-3 text-left">${[['bag', 'Popular products', 'products.html'], ['wrench', 'Top services', 'services.html'], ['ticket', 'Today\'s offers', 'offers.html']].map(x => `<a href="${x[2]}" class="card p-4 card-hover flex items-center gap-3"><span class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 grid place-items-center shrink-0">${svg(x[0], 'w-4 h-4')}</span><p class="text-[13.5px] font-extrabold">${x[1]}</p></a>`).join('')}</div>
</main>${modals(d)}` });

const smGroups = [
  ['Marketplace', [['Home', 'index.html'], ['All categories', 'categories.html'], ['Products', 'products.html'], ['Product details', 'product-details.html'], ['Services', 'services.html'], ['Service details', 'service-details.html'], ['Shops', 'shops.html'], ['Shop profile', 'shop-profile.html'], ['Brands', 'brands.html'], ['Offers &amp; deals', 'offers.html'], ['Search results', 'search.html'], ['Compare', 'compare.html']]],
  ['Shopping', [['Cart', 'cart.html'], ['Checkout', 'checkout.html'], ['Order confirmed', 'order-success.html'], ['Track order', 'track-order.html']]],
  ['Account', [['Sign in', 'login.html'], ['Register', 'register.html'], ['Verify OTP', 'otp-verify.html'], ['Forgot password', 'forgot-password.html'], ['Reset password', 'reset-password.html']]],
  ['Customer dashboard', [['Dashboard', 'user/dashboard.html'], ['My orders', 'user/orders.html'], ['Order details', 'user/order-details.html'], ['Returns &amp; cancellations', 'user/returns.html'], ['My bookings', 'user/bookings.html'], ['My reviews', 'user/reviews.html'], ['Wishlist', 'user/wishlist.html'], ['Addresses', 'user/addresses.html'], ['Wallet &amp; payments', 'user/wallet.html'], ['Vouchers', 'user/vouchers.html'], ['Notifications', 'user/notifications.html'], ['Messages', 'user/messages.html'], ['Profile', 'user/profile.html'], ['Settings', 'user/settings.html'], ['Support tickets', 'user/support.html']]],
  ['Vendor centre', [['Vendor sign in', 'vendor/login.html'], ['Dashboard', 'vendor/dashboard.html'], ['Products', 'vendor/products.html'], ['Add product', 'vendor/add-product.html'], ['Orders', 'vendor/orders.html'], ['Order details', 'vendor/order-details.html'], ['Returns', 'vendor/returns.html'], ['Reviews', 'vendor/reviews.html'], ['Shop profile', 'vendor/shop-profile.html'], ['Service listings', 'vendor/services.html'], ['Add service', 'vendor/add-service.html'], ['Leads', 'vendor/leads.html'], ['Bookings', 'vendor/bookings.html'], ['Business profile', 'vendor/business-profile.html'], ['Promotions', 'vendor/promotions.html'], ['Analytics', 'vendor/analytics.html'], ['Payouts', 'vendor/payouts.html'], ['Messages', 'vendor/messages.html'], ['Settings', 'vendor/settings.html']]],
  ['Admin', [['Admin sign in', 'admin/login.html'], ['Dashboard', 'admin/dashboard.html'], ['Users', 'admin/users.html'], ['Vendors', 'admin/vendors.html'], ['Vendor approvals', 'admin/vendor-approvals.html'], ['Products', 'admin/products.html'], ['Product approvals', 'admin/product-approvals.html'], ['Services', 'admin/services.html'], ['Orders', 'admin/orders.html'], ['Bookings &amp; leads', 'admin/bookings.html'], ['Returns &amp; disputes', 'admin/disputes.html'], ['Categories', 'admin/categories.html'], ['Reviews', 'admin/reviews.html'], ['Promotions', 'admin/promotions.html'], ['Banners &amp; CMS', 'admin/cms.html'], ['Payouts', 'admin/payouts.html'], ['Reports', 'admin/reports.html'], ['Support tickets', 'admin/tickets.html'], ['Staff &amp; roles', 'admin/staff.html'], ['Settings', 'admin/settings.html']]],
  ['Company &amp; policies', [['About us', 'about.html'], ['Contact us', 'contact.html'], ['Careers', 'careers.html'], ['Blog', 'blog.html'], ['Blog article', 'blog-details.html'], ['Help centre', 'help-center.html'], ['FAQ', 'faq.html'], ['Terms of service', 'terms.html'], ['Privacy policy', 'privacy-policy.html'], ['Return policy', 'return-policy.html'], ['Shipping policy', 'shipping-policy.html'], ['Become a seller', 'become-seller.html'], ['Seller registration', 'seller-register.html'], ['List your service', 'become-provider.html'], ['Provider registration', 'provider-register.html'], ['404 page', '404.html']]]
];
W('sitemap.html', {
  title: 'Sitemap', body: `
${L.crumb([{ t: 'Sitemap' }], d)}
<main class="shell py-8">
<div class="max-w-2xl mb-7"><h1 class="font-display text-[28px] font-extrabold tracking-tight mb-2">Sitemap</h1>
<p class="text-[14px] text-ink-500">Every page on HaatBazar in one place — ${smGroups.reduce((a, g) => a + g[1].length, 0)} pages across the marketplace, dashboards and company sections.</p></div>
<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">${smGroups.map((g, i) => `<div class="card p-5">
<h2 class="text-[15px] font-extrabold mb-3 pb-3 border-b border-[#f0f1f5] flex items-center gap-2"><span class="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 grid place-items-center text-[12px] font-extrabold">${i + 1}</span>${g[0]}</h2>
<div class="space-y-1">${g[1].map(p => `<a href="${p[1]}" class="flex items-center gap-2 py-1.5 text-[13px] text-ink-600 hover:text-brand-600">${svg('chevR', 'w-3.5 h-3.5 text-ink-300')}${p[0]}</a>`).join('')}</div></div>`).join('')}</div>
</main>${modals(d)}` });
console.log('about, contact, faq, help-center, terms, privacy, return, shipping, blog, blog-details, careers, 404, sitemap');
