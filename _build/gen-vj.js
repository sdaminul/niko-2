/* Vendor: academy, notifications, settings */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, svg, ph, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, tiles, mini, timeline, modal, modalFoot, hbars, empty } = K;
const { V, btn, A, row2, row3 } = R;

/* ----------------------------- ACADEMY -------------------------------- */
const courseCard = (t, d, len, lv, prog, tag) => `<div class="card overflow-hidden group">
<div class="relative">${ph('16/9', t)}<span class="badge badge-solid absolute top-2 left-2">${tag}</span>
<span class="absolute bottom-2 right-2 badge bg-black/70 text-white border-0">${len}</span></div>
<div class="p-3.5"><p class="text-[13px] font-extrabold clamp-2 leading-snug mb-1">${t}</p>
<p class="text-[11.5px] text-ink-400 clamp-2 mb-2">${d}</p>
<div class="flex items-center gap-2 mb-2.5"><span class="badge badge-gray">${lv}</span>${prog === 100 ? '<span class="badge badge-green">Completed</span>' : prog > 0 ? `<span class="badge badge-amber">${prog}% done</span>` : ''}</div>
${prog > 0 ? `<div class="pbar mb-2.5"><i style="width:${prog}%"></i></div>` : ''}
<button class="btn btn-sm ${prog > 0 && prog < 100 ? 'btn-primary' : 'btn-outline'} btn-block">${svg(prog === 100 ? 'refresh' : 'play')}${prog === 100 ? 'Watch again' : prog > 0 ? 'Continue' : 'Start course'}</button></div></div>`;

V('academy.html', {
  title: 'Seller Academy', sub: 'Free courses, guides and webinars to grow your business on HaatBazar.', crumb: 'Seller Academy',
  actions: [['My certificates', 'award'], ['Ask a mentor', 'msg'], ['Browse all courses', 'book', 'primary']],
  stats: [['Courses completed', '8 of 24', '', 'graduation', 'brand', '33% of curriculum'],
    ['Learning hours', '14.5 hrs', '+2.5', 'clock', 'service', 'This month'],
    ['Certificates earned', '3', '', 'award', 'gold', 'Shown on your shop page'],
    ['Seller score impact', '+6 pts', '', 'up', 'ink', 'From completed training']],
  top: card('Continue learning', `<div class="p-4"><div class="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-brand-50 to-white border border-brand-100">
<div class="w-[132px] shrink-0">${ph('16/9', 'Lesson')}</div>
<div class="min-w-0 flex-1"><span class="badge badge-red mb-1.5">Module 3 of 6</span>
<p class="text-[14px] font-extrabold">Mastering product photography on a budget</p>
<p class="text-[12px] text-ink-500 clamp-1">Lesson 4: Lighting a product at home with two lamps · 6 min remaining</p>
<div class="pbar mt-2 max-w-[320px]"><i style="width:62%"></i></div></div>
<div class="flex gap-2 shrink-0">${btn('Resume lesson', 'play', 'primary')}${btn('Course outline', 'list')}</div></div></div>`)
    + `<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
${courseCard('Seller onboarding: first 30 days', 'Set up your shop, add products and get your first order.', '42 min', 'Beginner', 100, 'Essential')}
${courseCard('Mastering product photography', 'Shoot professional product photos with a phone.', '1h 12m', 'Beginner', 62, 'Popular')}
${courseCard('Winning the buy box: pricing strategy', 'How ranking, price and delivery speed affect sales.', '55 min', 'Intermediate', 0, 'New')}
${courseCard('Running profitable ad campaigns', 'Keyword research, bidding and ROAS optimisation.', '1h 30m', 'Advanced', 24, 'Trending')}
${courseCard('Service provider playbook', 'Convert leads into bookings and repeat customers.', '48 min', 'Beginner', 100, 'Essential')}
${courseCard('Inventory & packaging best practice', 'Reduce damage claims and stock-outs.', '36 min', 'Beginner', 0, 'Guide')}
${courseCard('Handling returns & difficult customers', 'Protect your ratings while staying fair.', '40 min', 'Intermediate', 0, 'Guide')}
${courseCard('Growing with festival campaigns', 'Plan Eid, Puja and 11.11 like a top seller.', '1h 05m', 'Advanced', 0, 'Seasonal')}</div>`,
  after: row3(card('Guides & downloads', `<div class="p-4 space-y-2">${[['Seller policy handbook 2026', 'PDF · 2.4 MB'], ['Product listing quality checklist', 'PDF · 480 KB'], ['Packaging guideline (with photos)', 'PDF · 3.1 MB'], ['Commission & fee schedule', 'PDF · 210 KB'], ['Prohibited items list', 'PDF · 340 KB'], ['Service SLA & code of conduct', 'PDF · 620 KB']].map(g => `<a href="#" class="flex items-center gap-3 p-2.5 rounded-xl border border-[#e7e9ef] hover:border-brand-300">
${svg('file', 'w-4 h-4 text-ink-400 shrink-0')}<span class="min-w-0 flex-1"><span class="block text-[12.5px] font-bold clamp-1">${g[0]}</span><span class="block text-[11px] text-ink-400">${g[1]}</span></span>${svg('dl', 'w-4 h-4 text-ink-400')}</a>`).join('')}</div>`),
    card('Upcoming live webinars', `<div class="p-4 space-y-2.5">${[['Eid 2026 sales masterclass', '24 Aug, 8:00 PM · Bangla', 'Register'], ['Ads deep-dive with the growth team', '28 Aug, 4:00 PM · Bangla', 'Register'], ['Q&A: Returns and disputes', '02 Sep, 6:00 PM · Bangla', 'Register'], ['Scaling a service business', '09 Sep, 8:00 PM · Bangla', 'Register']].map(w => `<div class="flex items-center gap-3 p-3 rounded-xl border border-[#e7e9ef]">
${svg('cal', 'w-8 h-8 text-brand-400 shrink-0')}<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold clamp-1">${w[0]}</p><p class="text-[11.5px] text-ink-400">${w[1]}</p></div>
<button class="btn btn-xs btn-primary shrink-0">${w[2]}</button></div>`).join('')}</div>`),
    card('My certificates', `<div class="p-4 space-y-2.5">${[['Certified HaatBazar Seller', 'Issued 18 Apr 2024'], ['Service Excellence Level 2', 'Issued 02 Feb 2026'], ['Packaging & Safety Certified', 'Issued 20 Jun 2026']].map(c => `<div class="p-3 rounded-xl border border-gold-200 bg-gold-50/40 flex items-center gap-3">
${svg('award', 'w-8 h-8 text-gold-600 shrink-0')}<div class="min-w-0 flex-1"><p class="text-[12.5px] font-extrabold clamp-1">${c[0]}</p><p class="text-[11.5px] text-ink-400">${c[1]}</p></div>
<div class="flex gap-1 shrink-0"><button class="icon-btn icon-btn-sm">${svg('dl', 'w-3.5 h-3.5')}</button><button class="icon-btn icon-btn-sm">${svg('share', 'w-3.5 h-3.5')}</button></div></div>`).join('')}
${note('Certificates appear as trust badges on your public shop page and improve buyer confidence.', 'service', 'info')}</div>`))
});

/* -------------------------- NOTIFICATIONS ----------------------------- */
const nrow = (icon, color, title, body, time, unread, acts) => `<div class="flex gap-3 p-4 border-b border-[#eef0f4] last:border-0 ${unread ? 'bg-brand-50/30' : ''} hover:bg-ink-50/60 transition">
<span class="w-9 h-9 rounded-xl bg-${color}-50 text-${color}-600 grid place-items-center shrink-0">${svg(icon, 'w-4 h-4')}</span>
<div class="min-w-0 flex-1"><div class="flex items-start gap-2"><p class="text-[13px] font-bold flex-1">${title}${unread ? '<span class="w-1.5 h-1.5 rounded-full bg-brand-500 inline-block ml-1.5 align-middle"></span>' : ''}</p>
<span class="text-[11px] text-ink-400 shrink-0">${time}</span></div>
<p class="text-[12.5px] text-ink-500 mt-0.5">${body}</p>
<div class="flex flex-wrap gap-1.5 mt-2">${(acts || []).map(a => `<button class="btn btn-xs btn-outline">${svg(a[1])}${a[0]}</button>`).join('')}</div></div>
<div class="flex flex-col gap-1 shrink-0"><button class="icon-btn icon-btn-sm" title="Mark read">${svg('check', 'w-3.5 h-3.5')}</button><button class="icon-btn icon-btn-sm" title="Delete">${svg('trash', 'w-3.5 h-3.5')}</button></div></div>`;

V('notifications.html', {
  title: 'Notifications', sub: 'Orders, leads, payouts, policy updates and platform announcements.', crumb: 'Notifications',
  actions: [['Notification settings', 'cog'], ['Mark all as read', 'check'], ['Clear all', 'trash', 'ghost']],
  stats: [['Unread', '4', '', 'bell', 'brand', 'Needs your attention'],
    ['Action required', '3', '', 'warn', 'gold', 'Orders & KYC'],
    ['Today', '12', '', 'cal', 'service', 'All notifications'],
    ['This week', '86', '', 'db', 'ink', 'Across all channels']],
  tabs: [['All', '86'], ['Unread', '4'], ['Orders', '38'], ['Leads & bookings', '18'], ['Payments', '12'], ['Reviews & Q&A', '9'], ['Policy & system', '9']],
  filters: ['search', ['All types', 'Orders', 'Leads', 'Payouts', 'Reviews', 'Policy', 'Ads'], ['All channels', 'In-app', 'Email', 'SMS', 'Push'], 'date'],
  after: card('Notifications', `<div>
${nrow('bag', 'brand', 'New order received — HB-884213', 'Kamal Uddin ordered Realme C100X (৳11,290) · COD · Deliver by 20 Aug.', '5 min ago', true, [['View order', 'eye'], ['Accept & pack', 'check'], ['Print label', 'print']])}
${nrow('phone', 'service', '3 new service enquiries', 'AC servicing in Banani, Gulshan and Mohakhali. Respond within 30 min to keep your response score.', '18 min ago', true, [['View leads', 'phone'], ['Call now', 'phone']])}
${nrow('warn', 'gold', 'Low stock alert — 6 products', 'Gree 1.5 Ton AC has only 2 units left. Restock to avoid losing the buy box.', '1 hour ago', true, [['Update stock', 'edit'], ['View inventory', 'layers']])}
${nrow('idcard', 'brand', 'KYC document under review', 'Your VAT / BIN certificate is being verified. Expected completion within 48 hours.', '2 hours ago', true, [['View documents', 'idcard']])}
${nrow('bank', 'service', 'Payout completed — ৳2,39,760', 'PO-2026-0248 has been transferred to BRAC Bank ••4821.', 'Yesterday', false, [['View payout', 'eye'], ['Download receipt', 'dl']])}
${nrow('star', 'gold', 'New 5-star review', 'Sadia Rahman: "Fast delivery and genuine product. Highly recommended!"', 'Yesterday', false, [['Reply', 'msg'], ['View review', 'eye']])}
${nrow('question', 'ink', '9 unanswered product questions', 'Buyers are waiting for answers on 4 products. Answering improves conversion by up to 22%.', '2 days ago', false, [['Answer now', 'msg']])}
${nrow('return', 'brand', 'Return request — RT-88402', 'Nusrat Jahan requested a return for "Walton Blender" citing "Item damaged".', '2 days ago', false, [['Review request', 'eye'], ['Approve', 'check'], ['Reject', 'x']])}
${nrow('rocket', 'service', 'Join 11.11 Mega Sale', 'Registration is open until 25 Oct. Sellers joining early get homepage placement.', '3 days ago', false, [['Join campaign', 'rocket'], ['Learn more', 'info']])}
${nrow('shield', 'ink', 'Policy update — packaging standards', 'New packaging requirements for fragile items take effect 01 Sep 2026.', '4 days ago', false, [['Read policy', 'file']])}
${nrow('bolt', 'gold', 'Ad balance running low', 'Your ad credit is ৳3,500 — about 4 days of spend. Top up to keep campaigns running.', '5 days ago', false, [['Top up', 'wallet'], ['Manage ads', 'bolt']])}
${nrow('cal', 'brand', 'Booking reminder — tomorrow 10 AM', 'AC servicing at Gulshan 2 for Tanvir Alam. Assign a technician.', '5 days ago', false, [['View booking', 'cal'], ['Assign technician', 'user']])}
</div><div class="p-3 text-center border-t border-[#eef0f4]">${btn('Load older notifications', 'refresh')}</div>`)
    + row2(card('Notification preferences', frows([
      ['New orders', 'Instant alert on every new order.', true], ['Order cancellations', 'When a buyer cancels before shipping.', true],
      ['Low stock', 'Alert when stock falls below threshold.', true], ['New leads & enquiries', 'Service enquiries and quote requests.', true],
      ['Booking reminders', 'Reminder 1 day and 1 hour before a job.', true], ['Payout updates', 'Payout initiated, completed or failed.', true],
      ['Reviews & questions', 'New reviews, ratings and product questions.', true], ['Ads & promotions', 'Budget, performance and campaign approvals.', false],
      ['Policy & platform news', 'Policy changes and feature announcements.', true], ['Seller Academy', 'New courses and live webinars.', false]
    ]), btn('Save preferences', 'check', 'primary', 'data-toast="Preferences saved"')),
      card('Delivery channels', `<div class="p-4">
<div class="table-wrap"><table class="dt"><thead><tr><th>Event</th><th class="text-center">In-app</th><th class="text-center">Email</th><th class="text-center">SMS</th><th class="text-center">Push</th></tr></thead><tbody>
${[['New order', 1, 1, 1, 1], ['Order cancelled', 1, 1, 0, 1], ['New lead', 1, 1, 1, 1], ['Booking reminder', 1, 0, 1, 1], ['Payout', 1, 1, 1, 0], ['Review', 1, 0, 0, 1], ['Low stock', 1, 1, 0, 1], ['Policy update', 1, 1, 0, 0]].map(r => `<tr><td class="font-semibold">${r[0]}</td>${r.slice(1).map(v => `<td class="text-center"><label class="chk justify-center"><input type="checkbox" ${v ? 'checked' : ''}><span></span></label></td>`).join('')}</tr>`).join('')}
</tbody></table></div>
<div class="mt-3.5">${gridForm([fld('Quiet hours', sel(['Off', '10 PM – 8 AM', '11 PM – 7 AM', 'Custom'])), fld('SMS number', inp('', '+880 1712 345678')), fld('Notification email', inp('', 'rahim@rahimelectric.com.bd')), fld('Digest frequency', sel(['Instant', 'Hourly digest', 'Daily digest at 9 AM']))])}</div>
<div class="flex gap-2 mt-3.5">${btn('Save channels', 'check', 'primary', 'data-toast="Channels updated"')}${btn('Send test notification', 'send')}</div></div>`))
});

/* ----------------------------- SETTINGS ------------------------------- */
V('settings.html', {
  title: 'Settings', sub: 'Account, shop, security, notification and integration preferences.', crumb: 'Settings',
  actions: [['Download my data', 'dl'], ['Save all changes', 'check', 'primary', 'data-toast="All settings saved"']],
  tabs: [['Account'], ['Shop & selling'], ['Order handling'], ['Security'], ['Integrations'], ['Danger zone']],
  after: row2(card('Account information', `<div class="p-5">
<div class="flex items-center gap-4 mb-4"><span class="avatar avatar-xl bg-brand-500">R</span>
<div><p class="text-[14px] font-extrabold">Rahim Uddin</p><p class="text-[12px] text-ink-400">Owner · Verified Pro seller since Mar 2023</p>
<div class="flex gap-2 mt-2">${btn('Change photo', 'camera')}${btn('Remove', 'trash', 'ghost')}</div></div></div>
${gridForm([fld('Full name *', inp('', 'Rahim Uddin')), fld('Display name', inp('', 'Rahim Electric')),
      fld('Email address *', `<div class="flex gap-2">${inp('', 'rahim@rahimelectric.com.bd')}<span class="badge badge-green shrink-0 self-center">Verified</span></div>`),
      fld('Mobile number *', `<div class="flex gap-2">${inp('', '+880 1712 345678')}<span class="badge badge-green shrink-0 self-center">Verified</span></div>`),
      fld('Alternate phone', inp('', '+880 1912 445566')), fld('WhatsApp number', inp('', '+880 1712 345678')),
      fld('Date of birth', inp('', '1988-04-12', 'date')), fld('Gender', sel(['Male', 'Female', 'Prefer not to say'])),
      fld('National ID', inp('', '19•• ••• •••4821')), fld('Preferred language', sel(['English', 'বাংলা'])),
      fld('Timezone', sel(['(GMT+6) Dhaka'])), fld('Currency display', sel(['BDT (৳)', 'USD ($)']))])}
<div class="flex gap-2 mt-4">${btn('Update account', 'check', 'primary', 'data-toast="Account updated"')}${btn('Cancel', '', 'ghost')}</div></div>`),
    card('Shop & selling preferences', `<div class="p-5">${gridForm([
      fld('Shop name *', inp('', 'Rahim Electric & Home Services')), fld('Shop URL', `<div class="input-group"><span class="text-[12px] text-ink-400 pl-3">haatbazar.com/shop/</span><input class="input !pl-[132px]" value="rahim-electric"></div>`),
      fld('Business type', sel(['Both products & services', 'Products only', 'Services only'])), fld('Primary category', sel(['Electronics & Appliances', 'Home Services', 'Mobile & Gadgets'])),
      fld('Shop tagline', inp('', 'Genuine electronics & trusted home service since 2015'), 'sm:col-span-2'),
      fld('Vacation mode', sel(['Off — shop is open', 'On — pause new orders'])), fld('Vacation end date', inp('', '', 'date')),
      fld('Order processing time', sel(['Same day', '1 working day', '2 working days', '3 working days'])), fld('Service response time', sel(['Within 15 minutes', 'Within 30 minutes', 'Within 1 hour', 'Same day'])),
      fld('Auto-accept orders', sel(['Yes — accept automatically', 'No — I confirm manually'])), fld('Minimum order value', inp('', '0'))
    ])}<div class="mt-3.5">${frows([
      ['Show stock quantity to buyers', 'Display exact remaining units on product pages.', true],
      ['Allow price negotiation', 'Let buyers send offers on selected products.', false],
      ['Accept COD orders', 'Cash on delivery (2% collection fee applies).', true],
      ['Accept international orders', 'Ship outside Bangladesh.', false],
      ['Auto-reply to messages', 'Send an instant acknowledgement to new messages.', true],
      ['Show my phone number publicly', 'Display a call button on your listings.', true]
    ])}</div>
<div class="flex gap-2 mt-3.5">${btn('Save shop settings', 'check', 'primary', 'data-toast="Shop settings saved"')}${btn('Preview shop', 'eye')}</div></div>`))
    + row2(card('Security', `<div class="p-5">${gridForm([
      fld('Current password', inp('••••••••', '', 'password')), fld('New password', inp('Minimum 8 characters', '', 'password')),
      fld('Confirm new password', inp('Re-enter new password', '', 'password')), fld('Password strength', `<div class="pbar"><i style="width:82%;background:#00b894"></i></div><p class="text-[11.5px] text-service-600 font-bold mt-1">Strong</p>`)
    ])}<div class="mt-3.5">${frows([
      ['Two-factor authentication', 'Require an OTP on every new login.', true],
      ['Login alerts', 'Email me when a new device signs in.', true],
      ['Withdrawal OTP', 'Require OTP for every payout request.', true],
      ['Trusted devices only', 'Block logins from unrecognised devices.', false]
    ])}
<p class="text-[12px] font-extrabold uppercase tracking-wide text-ink-400 mt-4 mb-2">Active sessions</p>
${[['Chrome · Windows 11 — Dhaka', 'Current session · 192.168.1.4', 1], ['HaatBazar Seller App · Android', '2 hours ago · Dhaka', 0], ['Safari · iPhone 14', 'Yesterday · Chattogram', 0]].map(s => `<div class="flex items-center gap-3 p-2.5 rounded-xl border border-[#e7e9ef] mb-2">
${svg('monitor', 'w-4 h-4 text-ink-400 shrink-0')}<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold clamp-1">${s[0]}</p><p class="text-[11px] text-ink-400">${s[1]}</p></div>
${s[2] ? '<span class="badge badge-green shrink-0">Active</span>' : `<button class="btn btn-xs btn-outline shrink-0">Sign out</button>`}</div>`).join('')}
<div class="flex gap-2 mt-2">${btn('Update password', 'lock', 'primary', 'data-toast="Password updated"')}${btn('Sign out all devices', 'ban')}</div></div>`),
      card('Integrations & API', `<div class="p-4 space-y-2.5">
${[['Facebook Page', 'Sync products to your Facebook shop', 'Connected', 1], ['WhatsApp Business', 'Receive order alerts on WhatsApp', 'Connected', 1], ['Google Merchant Center', 'List products on Google Shopping', 'Not connected', 0], ['Steadfast courier', 'Auto-create parcels & track', 'Connected', 1], ['Pathao courier', 'Auto-create parcels & track', 'Not connected', 0], ['Accounting software (Tally/Zoho)', 'Export invoices automatically', 'Not connected', 0]].map(i => `<div class="flex items-center gap-3 p-3 rounded-xl border ${i[3] ? 'border-service-200 bg-service-50/40' : 'border-[#e7e9ef]'}">
${svg('cloud', 'w-8 h-8 text-ink-300 shrink-0')}<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold">${i[0]}</p><p class="text-[11.5px] text-ink-400 clamp-1">${i[1]}</p></div>
<button class="btn btn-xs ${i[3] ? 'btn-outline' : 'btn-primary'} shrink-0">${i[3] ? 'Manage' : 'Connect'}</button></div>`).join('')}
<div class="p-3.5 rounded-xl border border-[#e7e9ef] mt-1"><p class="text-[12.5px] font-extrabold mb-2">API credentials</p>
${gridForm([fld('API key', `<div class="flex gap-2">${inp('', 'hb_live_sk_••••••••••••4821')}<button class="icon-btn shrink-0">${svg('copy', 'w-4 h-4')}</button></div>`), fld('Webhook URL', inp('https://yourapp.com/webhooks/haatbazar'))], 1)}
<div class="flex gap-2 mt-2.5">${btn('Regenerate key', 'refresh')}${btn('API docs', 'book')}${btn('View webhook logs', 'db')}</div></div></div>`))
    + card('Danger zone', `<div class="p-5 space-y-3">
${[['Pause my shop temporarily', 'Hide all listings and stop new orders. You can reactivate anytime.', 'Pause shop', 'gold'],
      ['Transfer shop ownership', 'Move this shop to another verified HaatBazar account.', 'Start transfer', 'gold'],
      ['Close my seller account', 'Permanently close the shop. Pending orders must be completed and balance withdrawn first.', 'Close account', 'brand'],
      ['Delete all listings', 'Remove every product and service listing. This cannot be undone.', 'Delete listings', 'brand']].map(d => `<div class="flex flex-wrap items-center gap-3 p-3.5 rounded-xl border border-${d[3]}-200 bg-${d[3]}-50/40">
<div class="min-w-0 flex-1"><p class="text-[13px] font-extrabold">${d[0]}</p><p class="text-[12px] text-ink-500">${d[1]}</p></div>
<button class="btn btn-sm ${d[3] === 'brand' ? 'btn-danger' : 'btn-outline'} shrink-0">${d[2]}</button></div>`).join('')}
${note('Closing your account does not remove completed order records, which are retained for 6 years for tax and legal compliance.', 'ink', 'info')}</div>`)
});
