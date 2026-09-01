const fs = require('fs');
const { svg, ph } = require('./ui');
const L = require('./layout');
const B = require('./blocks');
const { modals } = B;
const d = false;

/* Split-screen auth shell */
const authShell = (opts) => `
<div class="min-h-screen grid lg:grid-cols-2">
<div class="hidden lg:flex flex-col justify-between p-10 ph ${opts.tone === 'service' ? 'ph-b' : 'ph-a'} grid-noise text-white relative">
<a href="index.html" class="relative z-10 flex items-center gap-2.5">
<span class="w-9 h-9 rounded-xl bg-white/15 grid place-items-center">${svg('bag', 'w-5 h-5')}</span>
<span class="font-display text-[19px] font-extrabold tracking-tight">HaatBazar</span></a>
<div class="relative z-10 max-w-md">
<h2 class="font-display text-[32px] font-extrabold leading-tight tracking-tight mb-3">${opts.heroTitle}</h2>
<p class="text-[14px] text-white/80 leading-relaxed mb-7">${opts.heroText}</p>
<div class="space-y-3.5">${opts.heroPoints.map(p => `<div class="flex gap-3"><span class="w-8 h-8 rounded-lg bg-white/15 grid place-items-center shrink-0">${svg(p[0], 'w-4 h-4')}</span><div><p class="text-[13.5px] font-bold">${p[1]}</p><p class="text-[12px] text-white/70">${p[2]}</p></div></div>`).join('')}</div></div>
<div class="relative z-10 flex items-center gap-5 text-[12px] text-white/70">
${[['1.2M+', 'Products'], ['132k+', 'Providers'], ['4.8/5', 'App rating']].map(s => `<div><p class="font-display text-[19px] font-extrabold text-white">${s[0]}</p><p>${s[1]}</p></div>`).join('')}</div></div>
<div class="flex items-center justify-center p-5 sm:p-8 bg-white">
<div class="w-full ${opts.wide ? 'max-w-2xl' : 'max-w-[420px]'}">
<a href="index.html" class="lg:hidden flex items-center gap-2.5 mb-7">
<span class="w-9 h-9 rounded-xl bg-brand-500 text-white grid place-items-center">${svg('bag', 'w-5 h-5')}</span>
<span class="font-display text-[19px] font-extrabold tracking-tight">HaatBazar</span></a>
${opts.form}
</div></div></div>`;

const socialRow = `
<div class="flex items-center gap-3 my-5"><span class="flex-1 h-px bg-[#e7e9ef]"></span><span class="text-[11.5px] text-ink-400 font-bold">OR CONTINUE WITH</span><span class="flex-1 h-px bg-[#e7e9ef]"></span></div>
<div class="grid grid-cols-3 gap-2.5">${['Google', 'Facebook', 'Apple'].map(x => `<button class="btn btn-outline !px-2 text-[12.5px]"><span class="w-4 h-4 rounded-full bg-ink-200 inline-block"></span>${x}</button>`).join('')}</div>`;

/* ------------------------------- LOGIN ------------------------------- */
fs.writeFileSync('login.html', L.bare({
  title: 'Sign In', bodyClass: 'bg-white', body: authShell({
    heroTitle: 'Welcome back to Bangladesh’s everything marketplace',
    heroText: 'One account for shopping products and booking trusted local services — with order tracking, wishlists and saved addresses.',
    heroPoints: [['shield', 'Buyer protection', 'Refund guarantee on every order'], ['bolt', 'Faster checkout', 'Saved addresses and payment methods'], ['bell', 'Live updates', 'Order and booking status in real time']],
    form: `
<h1 class="font-display text-[26px] font-extrabold tracking-tight mb-1.5">Sign in to your account</h1>
<p class="text-[13.5px] text-ink-500 mb-6">New to HaatBazar? <a href="register.html" class="link">Create an account</a></p>
<div class="seg w-full mb-5"><button class="is-active flex-1">Phone number</button><button class="flex-1">Email address</button></div>
<form class="space-y-4">
<div><label class="label">Mobile number <span class="req">*</span></label><div class="input-affix"><span class="affix">+880</span><input class="input" placeholder="1XXXXXXXXX" value="1712345678"></div></div>
<div><div class="flex items-center justify-between mb-1.5"><label class="label !mb-0">Password <span class="req">*</span></label><a href="forgot-password.html" class="text-[12.5px] font-bold text-brand-600">Forgot password?</a></div>
<div class="input-group">${svg('lock')}<input type="password" class="input" placeholder="Enter your password" value="password123">
<button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700">${svg('eye', 'w-4 h-4')}</button></div></div>
<div class="flex items-center justify-between"><label class="check"><input type="checkbox" checked>Keep me signed in</label>
<a href="otp-verify.html" class="text-[12.5px] font-bold text-brand-600">Sign in with OTP</a></div>
<a href="user/dashboard.html" class="btn btn-lg btn-primary btn-block">Sign in ${svg('chevR')}</a>
</form>
${socialRow}
<div class="mt-6 p-3.5 rounded-xl bg-ink-50 flex items-start gap-2.5">${svg('info', 'w-4 h-4 text-ink-400 shrink-0 mt-0.5')}
<p class="text-[12px] text-ink-500">Selling on HaatBazar? <a href="vendor/login.html" class="link">Sign in to the seller centre</a> · Platform staff? <a href="admin/login.html" class="link">Admin sign in</a></p></div>
<p class="text-[11.5px] text-ink-400 text-center mt-6">By signing in you agree to our <a href="terms.html" class="link">Terms</a> and <a href="privacy-policy.html" class="link">Privacy Policy</a>.</p>`
  })
}));

/* ------------------------------ REGISTER ------------------------------ */
fs.writeFileSync('register.html', L.bare({
  title: 'Create Account', bodyClass: 'bg-white', body: authShell({
    heroTitle: 'Create your free HaatBazar account',
    heroText: 'Shop from 48,000 sellers and book 132,000 verified service providers — all from one login.',
    heroPoints: [['gift', '৳500 welcome voucher', 'Applied automatically to your first order'], ['heart', 'Wishlist & alerts', 'Save items and get price-drop alerts'], ['route', 'Order tracking', 'Follow every parcel and booking live']],
    form: `
<h1 class="font-display text-[26px] font-extrabold tracking-tight mb-1.5">Create an account</h1>
<p class="text-[13.5px] text-ink-500 mb-6">Already registered? <a href="login.html" class="link">Sign in instead</a></p>
<form class="space-y-4">
<div class="grid sm:grid-cols-2 gap-4">
<div><label class="label">First name <span class="req">*</span></label><input class="input" placeholder="Nusrat"></div>
<div><label class="label">Last name <span class="req">*</span></label><input class="input" placeholder="Ahmed"></div></div>
<div><label class="label">Mobile number <span class="req">*</span></label><div class="input-affix"><span class="affix">+880</span><input class="input" placeholder="1XXXXXXXXX"></div><p class="hint">We will send a 6-digit verification code to this number.</p></div>
<div><label class="label">Email address</label><div class="input-group">${svg('mail')}<input class="input" placeholder="you@example.com"></div></div>
<div><label class="label">Password <span class="req">*</span></label><div class="input-group">${svg('lock')}<input type="password" class="input" placeholder="Minimum 8 characters"></div>
<div class="flex gap-1 mt-2">${[1, 2, 3, 4].map(i => `<span class="h-1 flex-1 rounded-full ${i <= 2 ? 'bg-gold-400' : 'bg-ink-100'}"></span>`).join('')}</div>
<p class="hint">Use 8+ characters with a mix of letters, numbers and symbols.</p></div>
<div><label class="label">Confirm password <span class="req">*</span></label><div class="input-group">${svg('lock')}<input type="password" class="input" placeholder="Re-type your password"></div></div>
<div><label class="label">Your city</label><select class="select"><option>Dhaka</option><option>Chattogram</option><option>Khulna</option><option>Rajshahi</option><option>Sylhet</option><option>Barishal</option><option>Rangpur</option><option>Mymensingh</option></select></div>
<div><label class="label">Referral code (optional)</label><input class="input" placeholder="Enter a friend's code"></div>
<div class="space-y-2.5"><label class="check"><input type="checkbox" checked>I agree to the <a href="terms.html" class="link">Terms of Service</a> and <a href="privacy-policy.html" class="link">Privacy Policy</a>.</label>
<label class="check"><input type="checkbox" checked>Send me deals, vouchers and order updates by SMS and email.</label></div>
<a href="otp-verify.html" class="btn btn-lg btn-primary btn-block">Create account ${svg('chevR')}</a></form>
${socialRow}
<div class="mt-6 grid sm:grid-cols-2 gap-2.5">
<a href="become-seller.html" class="p-3.5 rounded-xl border border-[#e7e9ef] hover:border-brand-200 flex items-center gap-2.5"><span class="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 grid place-items-center shrink-0">${svg('store', 'w-4 h-4')}</span><div><p class="text-[12.5px] font-extrabold">Sell products</p><p class="text-[11px] text-ink-500">Open a shop</p></div></a>
<a href="become-provider.html" class="p-3.5 rounded-xl border border-[#e7e9ef] hover:border-service-200 flex items-center gap-2.5"><span class="w-9 h-9 rounded-lg bg-service-50 text-service-600 grid place-items-center shrink-0">${svg('wrench', 'w-4 h-4')}</span><div><p class="text-[12.5px] font-extrabold">List a service</p><p class="text-[11px] text-ink-500">Get customers</p></div></a></div>`
  })
}));

/* ------------------------------ OTP VERIFY ------------------------------ */
fs.writeFileSync('otp-verify.html', L.bare({
  title: 'Verify Your Number', bodyClass: 'bg-white', body: authShell({
    heroTitle: 'One last step — verify your number',
    heroText: 'Verification keeps your account and every order secure. It takes less than a minute.',
    heroPoints: [['shield', 'Account safety', 'Prevents fraud and fake accounts'], ['msg', 'Order updates', 'Delivery alerts by SMS'], ['key', 'Easy recovery', 'Reset your password anytime']],
    form: `
<span class="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 grid place-items-center mb-4">${svg('msg', 'w-6 h-6')}</span>
<h1 class="font-display text-[26px] font-extrabold tracking-tight mb-1.5">Enter verification code</h1>
<p class="text-[13.5px] text-ink-500 mb-6">We sent a 6-digit code to <b class="text-ink-800">+880 1712-345678</b>. <a href="register.html" class="link">Change number</a></p>
<div class="flex gap-2 mb-5">${[2, 4, 8, '', '', ''].map(v => `<input class="input !h-14 text-center !text-[22px] font-extrabold" maxlength="1" value="${v}">`).join('')}</div>
<a href="user/dashboard.html" class="btn btn-lg btn-primary btn-block mb-4">Verify &amp; continue</a>
<div class="flex items-center justify-between text-[12.5px]"><span class="text-ink-500">Didn't get the code? Resend in <b class="text-ink-800 mono">00:42</b></span><button class="font-bold text-brand-600">Resend</button></div>
<div class="dotted-sep my-6"></div>
<div class="space-y-2.5">
<button class="btn btn-outline btn-block">${svg('phone')}Get the code by voice call</button>
<button class="btn btn-ghost btn-block">${svg('msg')}Send to WhatsApp instead</button></div>
<div class="mt-6 p-3.5 rounded-xl bg-ink-50 flex items-start gap-2.5">${svg('info', 'w-4 h-4 text-ink-400 shrink-0 mt-0.5')}
<p class="text-[12px] text-ink-500">HaatBazar will never ask for your OTP over a phone call. Never share this code with anyone.</p></div>`
  })
}));

/* ---------------------------- FORGOT PASSWORD ---------------------------- */
fs.writeFileSync('forgot-password.html', L.bare({
  title: 'Forgot Password', bodyClass: 'bg-white', body: authShell({
    heroTitle: 'Reset your password in two minutes',
    heroText: 'Enter the phone number or email linked to your account and we will send a secure reset code.',
    heroPoints: [['key', 'Secure reset', 'One-time code, expires in 10 minutes'], ['shield', 'Account protection', 'We alert you of every reset'], ['phone', 'Need help?', '24/7 support on 16247']],
    form: `
<span class="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 grid place-items-center mb-4">${svg('key', 'w-6 h-6')}</span>
<h1 class="font-display text-[26px] font-extrabold tracking-tight mb-1.5">Forgot your password?</h1>
<p class="text-[13.5px] text-ink-500 mb-6">No problem. We'll send you a reset code.</p>
<div class="seg w-full mb-5"><button class="is-active flex-1">By SMS</button><button class="flex-1">By email</button></div>
<form class="space-y-4">
<div><label class="label">Registered mobile number <span class="req">*</span></label><div class="input-affix"><span class="affix">+880</span><input class="input" placeholder="1XXXXXXXXX"></div></div>
<a href="reset-password.html" class="btn btn-lg btn-primary btn-block">Send reset code</a>
<a href="login.html" class="btn btn-ghost btn-block">${svg('chevL')}Back to sign in</a></form>
<div class="mt-7 p-4 rounded-xl border border-[#e7e9ef]"><p class="text-[13px] font-extrabold mb-1.5">Can't access your number?</p>
<p class="text-[12.5px] text-ink-500 mb-3">Contact our support team with your order ID and NID for manual verification.</p>
<a href="contact.html" class="btn btn-sm btn-outline">${svg('msg')}Contact support</a></div>`
  })
}));

/* ---------------------------- RESET PASSWORD ---------------------------- */
fs.writeFileSync('reset-password.html', L.bare({
  title: 'Set a New Password', bodyClass: 'bg-white', body: authShell({
    heroTitle: 'Choose a strong new password',
    heroText: 'A strong password protects your orders, addresses and saved payment methods.',
    heroPoints: [['lock', 'At least 8 characters', 'Longer is stronger'], ['sparkle', 'Mix it up', 'Letters, numbers and symbols'], ['x', 'Avoid reuse', 'Don’t use the same password elsewhere']],
    form: `
<span class="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 grid place-items-center mb-4">${svg('lock', 'w-6 h-6')}</span>
<h1 class="font-display text-[26px] font-extrabold tracking-tight mb-1.5">Set a new password</h1>
<p class="text-[13.5px] text-ink-500 mb-6">Your identity has been verified. Create a new password below.</p>
<form class="space-y-4">
<div><label class="label">New password <span class="req">*</span></label><div class="input-group">${svg('lock')}<input type="password" class="input" placeholder="Enter new password"></div>
<div class="flex gap-1 mt-2">${[1, 2, 3, 4].map(i => `<span class="h-1 flex-1 rounded-full ${i <= 3 ? 'bg-green-500' : 'bg-ink-100'}"></span>`).join('')}</div>
<p class="hint">Strength: strong</p></div>
<div><label class="label">Confirm new password <span class="req">*</span></label><div class="input-group">${svg('lock')}<input type="password" class="input" placeholder="Re-type new password"></div></div>
<div class="space-y-2 p-3.5 rounded-xl bg-ink-50">${['At least 8 characters', 'One uppercase letter', 'One number', 'One special character'].map((r, i) => `<p class="flex items-center gap-2 text-[12.5px] ${i < 3 ? 'text-green-700' : 'text-ink-400'}">${svg(i < 3 ? 'check' : 'x', 'w-3.5 h-3.5')}${r}</p>`).join('')}</div>
<label class="check"><input type="checkbox" checked>Sign me out of all other devices</label>
<a href="login.html" class="btn btn-lg btn-primary btn-block">Update password</a></form>`
  })
}));

/* ---------------------------- BECOME A SELLER ---------------------------- */
const sellerBody = `
<section class="ph ph-a grid-noise text-white">
<div class="shell py-14 sm:py-20 relative z-10 grid lg:grid-cols-2 gap-10 items-center">
<div><span class="badge !bg-white/20 !text-white mb-3">${svg('store')}Seller Centre</span>
<h1 class="font-display text-[32px] sm:text-[44px] font-extrabold leading-[1.1] tracking-tight mb-4">Sell to 4.2 million shoppers across Bangladesh</h1>
<p class="text-[15px] text-white/85 leading-relaxed mb-6">Open your online shop in 15 minutes. Zero commission for the first 3 months, free product photography in Dhaka, and payouts every week.</p>
<div class="flex flex-wrap gap-2.5 mb-7"><a href="seller-register.html" class="btn btn-lg !bg-white !text-brand-600">Start selling free ${svg('chevR')}</a>
<a href="vendor/login.html" class="btn btn-lg !bg-white/15 !text-white">Seller sign in</a></div>
<div class="flex flex-wrap gap-6">${[['48,320', 'Active sellers'], ['৳240cr+', 'Paid to sellers'], ['64', 'Districts covered']].map(s => `<div><p class="font-display text-[24px] font-extrabold">${s[0]}</p><p class="text-[12px] text-white/70">${s[1]}</p></div>`).join('')}</div></div>
<div class="hidden lg:block">${ph(3, 'chart', 'h-[300px] w-full rounded-2xl')}</div></div></section>

<main class="shell py-12">
<div class="text-center max-w-2xl mx-auto mb-9"><h2 class="font-display text-[26px] font-extrabold tracking-tight mb-2">Why sell on HaatBazar?</h2>
<p class="text-[14px] text-ink-500">Everything you need to run an online business — traffic, tools, logistics and payments.</p></div>
<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
${[['users', 'Ready-made customers', '4.2 million monthly shoppers already browsing categories like yours.'], ['money', 'Low commission', '3–8% category commission with zero listing fees, ever.'], ['truck', 'Nationwide logistics', 'We pick up from your door and deliver to all 64 districts.'], ['wallet', 'Weekly payouts', 'Money in your bank or bKash every Sunday — no minimum.'], ['chart', 'Business insights', 'Live dashboards on traffic, conversion, stock and returns.'], ['camera', 'Free photography', 'Complimentary studio shoot for your first 20 products in Dhaka.'], ['sparkle', 'Marketing tools', 'Vouchers, flash sales, sponsored ads and push campaigns.'], ['phone', 'Dedicated support', 'A named account manager once you cross ৳1 lakh monthly sales.'], ['shield', 'Fraud protection', 'Verified buyers, secured payments and dispute mediation.']]
.map(x => `<div class="card p-5 card-hover"><span class="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 grid place-items-center mb-3">${svg(x[0], 'w-5 h-5')}</span>
<p class="text-[15px] font-extrabold mb-1.5">${x[1]}</p><p class="text-[13px] text-ink-500 leading-relaxed">${x[2]}</p></div>`).join('')}</div>

<div class="card p-6 sm:p-8 mb-12"><h2 class="font-display text-[24px] font-extrabold tracking-tight text-center mb-8">Start selling in 4 simple steps</h2>
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">${[['Create your account', 'Sign up with your phone number and business name — takes 2 minutes.'], ['Verify your identity', 'Upload NID and trade licence (if any). Approval within 24 hours.'], ['List your products', 'Add photos, price and stock. Use bulk upload for large catalogues.'], ['Start earning', 'Get orders, ship with our courier and receive weekly payouts.']]
.map((s, i) => `<div class="relative"><span class="w-10 h-10 rounded-xl bg-ink-950 text-white grid place-items-center font-display text-[16px] font-extrabold mb-3">${i + 1}</span>
<p class="text-[14.5px] font-extrabold mb-1.5">${s[0]}</p><p class="text-[13px] text-ink-500 leading-relaxed">${s[1]}</p></div>`).join('')}</div></div>

<div class="grid lg:grid-cols-2 gap-5 mb-12">
<div class="card p-6"><h2 class="font-display text-[20px] font-extrabold mb-4">Commission &amp; fees</h2>
<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Category</th><th>Commission</th><th>Payout cycle</th></tr></thead>
<tbody>${[['Electronics &amp; Gadgets', '3%', 'Weekly'], ['Mobile &amp; Tablets', '3%', 'Weekly'], ['Fashion &amp; Lifestyle', '8%', 'Weekly'], ['Health &amp; Beauty', '7%', 'Weekly'], ['Home &amp; Living', '6%', 'Weekly'], ['Groceries &amp; Food', '5%', 'Weekly'], ['Books &amp; Stationery', '4%', 'Weekly']].map(r => `<tr><td class="font-semibold text-ink-900">${r[0]}</td><td class="font-extrabold text-brand-600">${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody></table></div>
<p class="text-[12px] text-ink-400 mt-3">No listing fee · no monthly fee · commission charged only on delivered orders.</p></div>
<div class="card p-6"><h2 class="font-display text-[20px] font-extrabold mb-4">What you need to register</h2>
<div class="space-y-3">${[['file', 'National ID (NID)', 'Front and back photo of the owner’s NID'], ['store', 'Business name &amp; address', 'Shop name, pickup address and contact number'], ['bank', 'Bank or bKash account', 'For receiving your weekly payouts'], ['file', 'Trade licence', 'Optional for individuals, required for companies'], ['file', 'TIN / BIN certificate', 'Required for VAT-registered businesses']]
.map(x => `<div class="flex gap-3 p-3.5 rounded-xl border border-[#e7e9ef]"><span class="w-9 h-9 rounded-lg bg-ink-50 text-ink-600 grid place-items-center shrink-0">${svg(x[0], 'w-4 h-4')}</span><div><p class="text-[13px] font-extrabold">${x[1]}</p><p class="text-[12px] text-ink-500">${x[2]}</p></div></div>`).join('')}</div></div></div>

<div class="card p-6 sm:p-8 mb-12"><h2 class="font-display text-[22px] font-extrabold text-center mb-6">Seller success stories</h2>
<div class="grid md:grid-cols-3 gap-4">${[['Rongdhonu Fashion', 'Narayanganj', '“We went from 20 orders a month at our physical shop to 900+ online orders. The free photography really helped.”', '৳18 lakh monthly sales'], ['Khaas Food Corner', 'Gulshan, Dhaka', '“Our organic honey now reaches customers in Rangpur and Cox’s Bazar. Payouts arrive on time, every week.”', '2,400 orders/month'], ['Nokshi Handicrafts', 'Jamalpur', '“As a women-led craft collective, HaatBazar gave 40 artisans a national market from a small town.”', '40 artisans employed']]
.map((s, i) => `<div class="p-5 rounded-2xl border border-[#e7e9ef]">${svg('quote', 'w-7 h-7 text-brand-200 mb-3')}
<p class="text-[13.5px] text-ink-700 leading-relaxed mb-4">${s[2]}</p>
<div class="flex items-center gap-2.5">${ph(i, 'store', 'w-10 h-10 rounded-xl')}<div><p class="text-[13px] font-extrabold">${s[0]}</p><p class="text-[11.5px] text-ink-500">${s[1]} · ${s[3]}</p></div></div></div>`).join('')}</div></div>

<div class="card p-6 sm:p-8 mb-12"><h2 class="font-display text-[22px] font-extrabold mb-5">Seller FAQ</h2>
<div class="space-y-2.5">${[['How much does it cost to start selling?', 'Nothing. Registration, listing and your shop page are completely free. We only charge a category commission on delivered orders.'], ['When do I get paid?', 'Payouts are processed every Sunday for all orders delivered and past the 7-day return window. Money reaches your bank or bKash within 1–2 working days.'], ['Who handles delivery?', 'HaatBazar Express picks up from your address, or you can use your own courier. Pickup is free inside Dhaka, Chattogram and Sylhet.'], ['Can I sell services instead of products?', 'Yes — service providers use a separate listing flow. Visit the “List your service” page to get started.'], ['What happens if a customer returns an item?', 'The customer raises a return, we inspect it, and if it is your fault we deduct the amount. If the claim is invalid, you keep the payment.'], ['Do I need a trade licence?', 'Individuals can start with NID only. Companies and VAT-registered businesses must upload a trade licence and BIN certificate.']]
.map((f, i) => `<details class="rounded-xl border border-[#e7e9ef] p-4 group" ${i === 0 ? 'open' : ''}><summary class="flex items-center justify-between cursor-pointer text-[14px] font-extrabold list-none">${f[0]}${svg('chevD', 'w-4 h-4 text-ink-400')}</summary>
<p class="text-[13px] text-ink-500 leading-relaxed mt-2.5">${f[1]}</p></details>`).join('')}</div></div>

<div class="rounded-2xl ph ph-c grid-noise p-8 sm:p-10 text-white text-center">
<h2 class="font-display text-[26px] sm:text-[32px] font-extrabold tracking-tight mb-2 relative z-10">Ready to grow your business?</h2>
<p class="text-[14px] text-white/80 mb-5 relative z-10">Join 48,320 sellers already earning on HaatBazar.</p>
<div class="flex flex-wrap justify-center gap-2.5 relative z-10"><a href="seller-register.html" class="btn btn-lg !bg-white !text-ink-950">Create seller account</a><a href="contact.html" class="btn btn-lg !bg-white/15 !text-white">Talk to our team</a></div></div>
</main>${modals(d)}`;
fs.writeFileSync('become-seller.html', L.page({ title: 'Become a Seller', body: sellerBody }));

/* -------------------------- BECOME A PROVIDER -------------------------- */
const providerBody = `
<section class="ph ph-b grid-noise text-white">
<div class="shell py-14 sm:py-20 relative z-10 grid lg:grid-cols-2 gap-10 items-center">
<div><span class="badge !bg-white/20 !text-white mb-3">${svg('wrench')}Service Provider Network</span>
<h1 class="font-display text-[32px] sm:text-[44px] font-extrabold leading-[1.1] tracking-tight mb-4">Get customers for your service business — every single day</h1>
<p class="text-[15px] text-white/85 leading-relaxed mb-6">List your business free, receive verified leads and phone calls from customers near you, and build a public reputation with real reviews.</p>
<div class="flex flex-wrap gap-2.5 mb-7"><a href="provider-register.html" class="btn btn-lg !bg-white !text-service-700">List your business free ${svg('chevR')}</a>
<a href="vendor/login.html" class="btn btn-lg !bg-white/15 !text-white">Provider sign in</a></div>
<div class="flex flex-wrap gap-6">${[['132,400', 'Listed providers'], ['2.8M', 'Leads per month'], ['12 min', 'Avg. response time']].map(s => `<div><p class="font-display text-[24px] font-extrabold">${s[0]}</p><p class="text-[12px] text-white/70">${s[1]}</p></div>`).join('')}</div></div>
<div class="hidden lg:block">${ph(1, 'users', 'h-[300px] w-full rounded-2xl')}</div></div></section>

<main class="shell py-12">
<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
${[['phone', 'Direct phone leads', 'Customers call you straight from your listing — no middleman.'], ['pin', 'Local visibility', 'Rank for searches in your area, city and category.'], ['star', 'Build trust', 'Verified badge, real reviews and a public rating.'], ['cal', 'Online bookings', 'Accept appointments with date and time slots.'], ['chart', 'Lead analytics', 'See views, calls, quote requests and conversion.'], ['ticket', 'Run offers', 'Publish discounts and packages to win more jobs.'], ['camera', 'Photo portfolio', 'Show your work with unlimited photos and videos.'], ['file', 'Digital catalogue', 'Publish a transparent price list customers can trust.'], ['users', 'Team profiles', 'Introduce your technicians and their certifications.']]
.map(x => `<div class="card p-5 card-hover"><span class="w-11 h-11 rounded-xl bg-service-50 text-service-600 grid place-items-center mb-3">${svg(x[0], 'w-5 h-5')}</span>
<p class="text-[15px] font-extrabold mb-1.5">${x[1]}</p><p class="text-[13px] text-ink-500 leading-relaxed">${x[2]}</p></div>`).join('')}</div>

<div class="card p-6 sm:p-8 mb-12"><h2 class="font-display text-[24px] font-extrabold text-center mb-8">Choose your plan</h2>
<div class="grid md:grid-cols-3 gap-5">${[['Free Listing', '৳0', 'forever', ['Public business profile', 'Up to 10 photos', 'Receive customer calls', 'Basic listing in search', 'Customer reviews'], 0],
['Verified Pro', '৳1,200', 'per month', ['Everything in Free', 'Verified badge', 'Top 10 search placement', 'Unlimited photos &amp; videos', 'Online booking calendar', 'Lead analytics dashboard', 'Publish offers &amp; packages'], 1],
['Premium Partner', '৳3,500', 'per month', ['Everything in Verified Pro', 'Top 3 sponsored placement', 'Homepage category feature', 'Dedicated account manager', 'Priority lead routing', 'Monthly performance report', 'WhatsApp lead alerts'], 0]]
.map(p => `<div class="rounded-2xl border ${p[5] ? 'border-service-300 ring-2 ring-service-100' : 'border-[#e7e9ef]'} p-6 relative">${p[5] ? '<span class="badge badge-teal absolute -top-3 left-6">Most popular</span>' : ''}
<p class="text-[15px] font-extrabold mb-1">${p[0]}</p><p class="font-display text-[32px] font-extrabold text-service-600">${p[1]}<span class="text-[13px] text-ink-400 font-bold"> /${p[2]}</span></p>
<ul class="space-y-2 my-5">${p[3].map(f => `<li class="flex gap-2 text-[13px] text-ink-600">${svg('check', 'w-4 h-4 text-green-600 shrink-0 mt-0.5')}${f}</li>`).join('')}</ul>
<a href="provider-register.html" class="btn ${p[5] ? 'btn-service' : 'btn-outline'} btn-block">Get started</a></div>`).join('')}</div></div>

<div class="grid lg:grid-cols-2 gap-5 mb-12">
<div class="card p-6"><h2 class="font-display text-[20px] font-extrabold mb-4">How it works</h2>
<div class="timeline">${[['List your business', 'Add your name, category, address, hours and services — free and takes 10 minutes.'], ['Get verified', 'Submit NID and trade licence. Our team verifies within 24–48 hours.'], ['Receive leads', 'Customers call, chat or request quotes directly from your listing.'], ['Do the job', 'Serve the customer, get paid directly — HaatBazar takes no cut of your job.'], ['Collect reviews', 'Happy customers rate you, pushing you higher in search results.']]
.map((t, i) => `<div class="tl-item ${i === 0 ? 'is-active' : ''}"><p class="text-[13.5px] font-extrabold">${t[0]}</p><p class="text-[12.5px] text-ink-500">${t[1]}</p></div>`).join('')}</div></div>
<div class="card p-6"><h2 class="font-display text-[20px] font-extrabold mb-4">Categories in demand right now</h2>
<div class="space-y-2.5">${[['AC repair &amp; service', '18,400 monthly searches'], ['Electrician', '14,200 monthly searches'], ['Home cleaning', '11,800 monthly searches'], ['Plumber', '9,600 monthly searches'], ['Home tutor', '22,100 monthly searches'], ['Beauty parlour', '16,700 monthly searches'], ['Packers &amp; movers', '7,300 monthly searches'], ['Wedding photographer', '6,900 monthly searches']]
.map(x => `<div class="flex items-center justify-between p-3 rounded-xl bg-ink-50"><p class="text-[13px] font-bold">${x[0]}</p><span class="text-[12px] text-service-600 font-extrabold">${x[1]}</span></div>`).join('')}</div></div></div>

<div class="rounded-2xl ph ph-b grid-noise p-8 sm:p-10 text-white text-center">
<h2 class="font-display text-[26px] sm:text-[32px] font-extrabold tracking-tight mb-2 relative z-10">Your next customer is searching right now</h2>
<p class="text-[14px] text-white/80 mb-5 relative z-10">List your business in under 10 minutes — completely free.</p>
<div class="flex flex-wrap justify-center gap-2.5 relative z-10"><a href="provider-register.html" class="btn btn-lg !bg-white !text-service-700">List my business</a><a href="contact.html" class="btn btn-lg !bg-white/15 !text-white">Request a callback</a></div></div>
</main>${modals(d)}`;
fs.writeFileSync('become-provider.html', L.page({ title: 'List Your Service', body: providerBody }));

/* ------------------------- SELLER / PROVIDER REGISTER ------------------------- */
const regForm = (isService) => `
<main class="shell py-8 max-w-4xl">
<div class="mb-6"><h1 class="font-display text-[26px] font-extrabold tracking-tight mb-1.5">${isService ? 'List your service business' : 'Open your online shop'}</h1>
<p class="text-[13.5px] text-ink-500">Complete the steps below. Verification usually takes less than 24 hours.</p></div>
<div class="card p-4 mb-5"><div class="steps">
<span class="step is-current"><span class="num">1</span>Account</span><span class="step-line"></span>
<span class="step"><span class="num">2</span>Business info</span><span class="step-line"></span>
<span class="step"><span class="num">3</span>Documents</span><span class="step-line"></span>
<span class="step"><span class="num">4</span>${isService ? 'Services &amp; areas' : 'Bank &amp; pickup'}</span><span class="step-line"></span>
<span class="step"><span class="num">5</span>Review</span></div></div>

<div class="card p-5 sm:p-6 mb-5"><h2 class="text-[16px] font-extrabold mb-4 flex items-center gap-2">${svg('user', 'w-4 h-4 text-brand-500')}1. Account details</h2>
<div class="grid sm:grid-cols-2 gap-4">
<div><label class="label">Owner full name <span class="req">*</span></label><input class="input" placeholder="As printed on your NID"></div>
<div><label class="label">Mobile number <span class="req">*</span></label><div class="input-affix"><span class="affix">+880</span><input class="input" placeholder="1XXXXXXXXX"></div></div>
<div><label class="label">Email address <span class="req">*</span></label><input class="input" placeholder="you@business.com"></div>
<div><label class="label">Password <span class="req">*</span></label><input type="password" class="input" placeholder="Minimum 8 characters"></div></div></div>

<div class="card p-5 sm:p-6 mb-5"><h2 class="text-[16px] font-extrabold mb-4 flex items-center gap-2">${svg('store', 'w-4 h-4 text-brand-500')}2. Business information</h2>
<div class="grid sm:grid-cols-2 gap-4">
<div><label class="label">${isService ? 'Business name' : 'Shop name'} <span class="req">*</span></label><input class="input" placeholder="${isService ? 'e.g. CoolCare AC Servicing' : 'e.g. Gadget Hub BD'}"><p class="hint">This is what customers will see.</p></div>
<div><label class="label">${isService ? 'Primary service category' : 'Main product category'} <span class="req">*</span></label><select class="select">${(isService ? ['Home Services', 'AC &amp; Appliance Repair', 'Beauty &amp; Salon', 'Doctors &amp; Clinics', 'Tutors &amp; Coaching', 'Restaurants &amp; Catering', 'Event &amp; Wedding', 'Packers &amp; Movers', 'Travel Agents', 'Pet Care'] : ['Electronics &amp; Gadgets', 'Mobile &amp; Tablets', 'Fashion &amp; Lifestyle', 'Health &amp; Beauty', 'Home &amp; Living', 'Groceries &amp; Food', 'Baby, Kids &amp; Toys', 'Sports &amp; Outdoor']).map(c => `<option>${c}</option>`).join('')}</select></div>
<div><label class="label">Business type <span class="req">*</span></label><select class="select"><option>Individual / sole proprietor</option><option>Partnership</option><option>Private limited company</option><option>Brand / authorised distributor</option></select></div>
<div><label class="label">Year established</label><input class="input" placeholder="e.g. 2017"></div>
<div><label class="label">Division <span class="req">*</span></label><select class="select"><option>Dhaka</option><option>Chattogram</option><option>Khulna</option><option>Rajshahi</option><option>Sylhet</option><option>Barishal</option><option>Rangpur</option><option>Mymensingh</option></select></div>
<div><label class="label">District / City <span class="req">*</span></label><select class="select"><option>Dhaka</option><option>Gazipur</option><option>Narayanganj</option></select></div>
<div class="sm:col-span-2"><label class="label">Full business address <span class="req">*</span></label><textarea class="textarea !min-h-[80px]" placeholder="House, road, area, landmark…"></textarea></div>
<div class="sm:col-span-2"><label class="label">Short description <span class="req">*</span></label><textarea class="textarea" placeholder="Tell customers what you ${isService ? 'do' : 'sell'}, since when, and what makes you different…"></textarea><p class="hint">50–500 characters. This appears at the top of your public profile.</p></div>
<div><label class="label">${isService ? 'Business logo' : 'Shop logo'}</label><div class="upload-box">${svg('camera', 'w-5 h-5')}<span>Square image, min 300×300px</span></div></div>
<div><label class="label">Cover banner</label><div class="upload-box">${svg('camera', 'w-5 h-5')}<span>1200×300px recommended</span></div></div></div></div>

<div class="card p-5 sm:p-6 mb-5"><h2 class="text-[16px] font-extrabold mb-4 flex items-center gap-2">${svg('file', 'w-4 h-4 text-brand-500')}3. Verification documents</h2>
<div class="grid sm:grid-cols-2 gap-4">
<div><label class="label">NID front <span class="req">*</span></label><div class="upload-box">${svg('file', 'w-5 h-5')}<span>JPG or PNG, max 5 MB</span></div></div>
<div><label class="label">NID back <span class="req">*</span></label><div class="upload-box">${svg('file', 'w-5 h-5')}<span>JPG or PNG, max 5 MB</span></div></div>
<div><label class="label">Trade licence ${isService ? '' : '<span class="text-ink-400 font-medium">(required for companies)</span>'}</label><div class="upload-box">${svg('file', 'w-5 h-5')}<span>PDF or image</span></div></div>
<div><label class="label">TIN / BIN certificate</label><div class="upload-box">${svg('file', 'w-5 h-5')}<span>Optional but recommended</span></div></div>
<div class="sm:col-span-2"><label class="label">NID number <span class="req">*</span></label><input class="input" placeholder="10 or 17 digit NID number"></div></div></div>

${isService ? `
<div class="card p-5 sm:p-6 mb-5"><h2 class="text-[16px] font-extrabold mb-4 flex items-center gap-2">${svg('wrench', 'w-4 h-4 text-service-500')}4. Services &amp; coverage</h2>
<div class="grid sm:grid-cols-2 gap-4">
<div class="sm:col-span-2"><label class="label">Services you offer <span class="req">*</span></label>
<div class="flex flex-wrap gap-2 mb-2">${['AC servicing', 'Gas refill', 'Installation', 'Repair', 'Annual contract'].map(x => `<span class="badge badge-teal">${x}<button class="ml-1">${svg('x', 'w-3 h-3')}</button></span>`).join('')}</div>
<input class="input" placeholder="Type a service and press Enter…"></div>
<div class="sm:col-span-2"><label class="label">Areas you serve <span class="req">*</span></label>
<div class="flex flex-wrap gap-2 mb-2">${['Uttara', 'Banani', 'Gulshan', 'Mirpur'].map(x => `<span class="badge badge-gray">${x}<button class="ml-1">${svg('x', 'w-3 h-3')}</button></span>`).join('')}</div>
<input class="input" placeholder="Add an area…"></div>
<div><label class="label">Team size</label><select class="select"><option>Just me</option><option>2–5 people</option><option>6–20 people</option><option>20+ people</option></select></div>
<div><label class="label">Emergency service</label><select class="select"><option>Not available</option><option>Available until 11 PM</option><option>24 hours</option></select></div>
<div class="sm:col-span-2"><label class="label">Business hours <span class="req">*</span></label>
<div class="space-y-2">${['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, i) => `<div class="flex flex-wrap items-center gap-2.5"><span class="w-24 text-[13px] font-bold">${day}</span>
<label class="switch switch-service"><input type="checkbox" ${i < 6 ? 'checked' : ''}><span class="track"></span></label>
<input type="time" class="input input-sm w-32" value="09:00"><span class="text-ink-400">to</span><input type="time" class="input input-sm w-32" value="21:00"></div>`).join('')}</div></div>
<div class="sm:col-span-2"><label class="label">Payment methods accepted</label><div class="flex flex-wrap gap-2">${['Cash', 'bKash', 'Nagad', 'Rocket', 'Card', 'Bank transfer'].map((x, i) => `<label class="chip"><input type="checkbox" ${i < 3 ? 'checked' : ''} class="w-3.5 h-3.5 accent-brand-500">${x}</label>`).join('')}</div></div>
<div class="sm:col-span-2"><label class="label">Choose your plan</label>
<div class="grid sm:grid-cols-3 gap-2.5">${[['Free Listing', '৳0'], ['Verified Pro', '৳1,200/mo'], ['Premium Partner', '৳3,500/mo']].map((p, i) => `<label class="p-3.5 rounded-xl border ${i === 1 ? 'border-service-400 bg-service-50/40' : 'border-[#e7e9ef]'} flex items-center gap-2.5 cursor-pointer"><input type="radio" name="plan" ${i === 1 ? 'checked' : ''} class="accent-brand-500"><div><p class="text-[13px] font-extrabold">${p[0]}</p><p class="text-[12px] text-ink-500">${p[1]}</p></div></label>`).join('')}</div></div>
</div></div>` : `
<div class="card p-5 sm:p-6 mb-5"><h2 class="text-[16px] font-extrabold mb-4 flex items-center gap-2">${svg('bank', 'w-4 h-4 text-brand-500')}4. Payout &amp; pickup details</h2>
<div class="grid sm:grid-cols-2 gap-4">
<div><label class="label">Payout method <span class="req">*</span></label><select class="select"><option>Bank account</option><option>bKash</option><option>Nagad</option><option>Rocket</option></select></div>
<div><label class="label">Account holder name <span class="req">*</span></label><input class="input" placeholder="As per bank record"></div>
<div><label class="label">Bank name <span class="req">*</span></label><select class="select"><option>BRAC Bank</option><option>City Bank</option><option>Dutch-Bangla Bank</option><option>Islami Bank Bangladesh</option><option>Eastern Bank</option><option>Sonali Bank</option></select></div>
<div><label class="label">Branch name <span class="req">*</span></label><input class="input" placeholder="e.g. Gulshan Branch"></div>
<div><label class="label">Account number <span class="req">*</span></label><input class="input" placeholder="Enter account number"></div>
<div><label class="label">Routing number</label><input class="input" placeholder="9 digit routing number"></div>
<div class="sm:col-span-2 dotted-sep pt-4"><label class="label">Warehouse / pickup address <span class="req">*</span></label><textarea class="textarea !min-h-[80px]" placeholder="Where our courier will collect parcels…"></textarea></div>
<div><label class="label">Pickup contact person</label><input class="input" placeholder="Name"></div>
<div><label class="label">Pickup contact number</label><div class="input-affix"><span class="affix">+880</span><input class="input" placeholder="1XXXXXXXXX"></div></div>
<div><label class="label">Daily handover time</label><select class="select"><option>10 AM – 12 PM</option><option>12 PM – 3 PM</option><option>3 PM – 6 PM</option></select></div>
<div><label class="label">Estimated monthly orders</label><select class="select"><option>Less than 50</option><option>50 – 200</option><option>200 – 1,000</option><option>1,000+</option></select></div></div></div>`}

<div class="card p-5 sm:p-6 mb-5"><h2 class="text-[16px] font-extrabold mb-4 flex items-center gap-2">${svg('check', 'w-4 h-4 text-brand-500')}5. Review &amp; submit</h2>
<div class="space-y-2.5 mb-4">
<label class="check"><input type="checkbox" checked>I confirm all information provided is accurate and the documents belong to me.</label>
<label class="check"><input type="checkbox" checked>I accept the <a href="terms.html" class="link">${isService ? 'Provider' : 'Seller'} Agreement</a>, <a href="terms.html" class="link">Terms of Service</a> and <a href="privacy-policy.html" class="link">Privacy Policy</a>.</label>
<label class="check"><input type="checkbox">Send me tips, product updates and marketing opportunities.</label></div>
<div class="p-4 rounded-xl bg-ink-50 flex items-start gap-2.5 mb-4">${svg('info', 'w-4 h-4 text-ink-400 shrink-0 mt-0.5')}
<p class="text-[12.5px] text-ink-500">Our verification team reviews every application within 24 hours. You will receive an SMS and email once your account is approved. You can save this form and come back anytime.</p></div>
<div class="flex flex-wrap gap-2.5"><button class="btn btn-lg ${isService ? 'btn-service' : 'btn-primary'} flex-1 min-w-[200px]" data-toast="Application submitted for review">Submit application</button>
<button class="btn btn-lg btn-outline">${svg('file')}Save as draft</button></div></div>
<p class="text-center text-[12.5px] text-ink-500">Already have an account? <a href="vendor/login.html" class="link">Sign in to the ${isService ? 'provider' : 'seller'} centre</a></p>
</main>${modals(d)}`;
fs.writeFileSync('seller-register.html', L.page({ title: 'Seller Registration', body: regForm(false) }));
fs.writeFileSync('provider-register.html', L.page({ title: 'Service Provider Registration', body: regForm(true) }));
console.log('login, register, otp-verify, forgot-password, reset-password, become-seller, become-provider, seller-register, provider-register');
