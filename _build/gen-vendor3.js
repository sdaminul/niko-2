/* Vendor Dashboard — remaining pages (batch generator) */
const fs = require('fs');
const K = require('./kit');
const { dashPage, stats, card, table, tfoot, st, filterbar, tabs, bulkbar, svg, ph, stars, tk, actionsCell, empty, prow, hbars, donut, lineChart, barChart,
  mini, tiles, kv, note, fld, inp, sel, ta, sw, chk, gridForm, frows, formCard, people, timeline, bars, modal, modalFoot, listPage, kanban, calendar, chatShell } = K;

const OUT = 'f:/niko-design/vendor/';
const W = (f, html) => { fs.writeFileSync(OUT + f, html); console.log('vendor/' + f); };
const V = (o) => dashPage(Object.assign({ role: 'vendor' }, o));
const btn = (l, i, c = 'outline', extra = '') => `<button class="btn btn-sm btn-${c}" ${extra}>${i ? svg(i) : ''}${l}</button>`;
const a2 = (l, i, h, c = 'outline') => `<a href="${h}" class="btn btn-sm btn-${c}">${i ? svg(i) : ''}${l}</a>`;

/* ============================== PAGES ================================== */

/* ---------------------------- 1. LEADS -------------------------------- */
W('leads.html', V({
  title: 'Leads & Enquiries', sub: 'Customer enquiries from your service listings — respond fast to win more jobs.',
  active: 'leads.html', crumbs: ['Leads'],
  actions: [btn('Export leads', 'dl'), btn('Lead settings', 'cog'), btn('Add manual lead', 'plus', 'primary', 'data-modal-open="m-lead"')].join(''),
  body: stats([
    ['New leads today', '14', '+22%', 'phone', 'brand', '9 unanswered'],
    ['Response rate', '92%', '+4%', 'bolt', 'service', 'Avg. reply 18 min'],
    ['Leads won', '48', '+11%', 'award', 'gold', 'This month'],
    ['Conversion rate', '31.4%', '+2.8%', 'chart', 'ink', '153 leads → 48 jobs']
  ]) + `<div class="grid lg:grid-cols-3 gap-4 mb-4">
${card('Lead pipeline', `<div class="p-4">${bars([['New', 28, '43 leads'], ['Contacted', 46, '38 leads', '#00b894'], ['Quoted', 62, '25 leads', '#ffb020'], ['Won', 31, '48 jobs', '#067647'], ['Lost', 12, '19 leads', '#b42318']])}</div>`, btn('Details', 'chart', 'ghost'))}
${card('Lead sources', `<div class="p-4">${hbars([['Listing page', 84, '96'], ['Search results', 62, '71', '#00b894'], ['Phone reveal', 48, '54', '#ffb020'], ['Google', 31, '35', '#6c7a91'], ['Direct WhatsApp', 22, '25', '#8b5cf6']])}</div>`)}
${card('Missed & overdue', `<div class="p-4 space-y-2.5">
${[['Kamal Uddin', 'AC servicing · Banani', '2h overdue', 'brand'], ['Sadia Rahman', 'Fridge repair · Dhanmondi', '5h overdue', 'gold'], ['Tanvir Alam', 'Wiring · Mirpur', '1d overdue', 'ink']].map(r => `<div class="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#f0f1f5]">
<span class="avatar avatar-sm bg-${r[3]}-500">${r[0][0]}</span><div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold clamp-1">${r[0]}</p><p class="text-[11.5px] text-ink-400 clamp-1">${r[1]}</p></div>
<span class="badge badge-red shrink-0">${r[2]}</span></div>`).join('')}
${note('Leads unanswered for 24h are auto-shared with nearby providers. Reply fast to keep your Response Badge.', 'gold', 'warn')}</div>`)}
</div>` + tabs([['All leads', '153'], ['New', '43'], ['Contacted', '38'], ['Quoted', '25'], ['Won', '48'], ['Lost', '19'], ['Spam', '4']])
    + filterbar(['search', ['All services', 'AC repair', 'Fridge repair', 'Electrical wiring', 'CCTV install'], ['All sources', 'Listing page', 'Search', 'Phone reveal', 'WhatsApp'], ['All areas', 'Banani', 'Gulshan', 'Dhanmondi', 'Mirpur'], 'date', ['Sort: Newest', 'Oldest', 'Highest budget', 'Response due']],
      `${btn('Board view', 'grid')}${btn('Export', 'dl')}`)
    + bulkbar(['Mark contacted', 'Assign to staff', 'Send quote', 'Mark won', 'Mark spam', 'Delete'])
    + card('', table([['Lead'], ['Service required'], ['Budget'], ['Area'], ['Source'], ['Received'], ['Status'], ['Actions', 'text-right']], [
      [prow(0, 'Kamal Uddin', '+880 17•• ••8821 · Verified', 'user'), 'Split AC servicing (2 units)', '৳3,000–5,000', 'Banani, Dhaka', '<span class="badge badge-gray">Listing page</span>', '18 min ago', st('New'),
        `<div class="flex justify-end gap-1.5">${btn('Call', 'phone', 'primary')}${btn('Quote', 'file')}${actionsCell([['View lead', 'eye'], ['Send quote', 'file'], ['WhatsApp', 'msg'], ['Assign staff', 'users'], ['Add note', 'edit'], ['Mark spam', 'flag', 1], ['Delete', 'trash', 1]])}</div>`],
      [prow(1, 'Sadia Rahman', '+880 19•• ••4410', 'user'), 'Refrigerator not cooling', '৳1,500–2,500', 'Dhanmondi', '<span class="badge badge-blue">Search</span>', '1 hour ago', st('Contacted'),
        `<div class="flex justify-end gap-1.5">${btn('Quote', 'file', 'primary')}${btn('Chat', 'msg')}${actionsCell([['View lead', 'eye'], ['Mark won', 'check'], ['Mark lost', 'x'], ['Add note', 'edit']])}</div>`],
      [prow(2, 'Tanvir Alam', '+880 16•• ••7702', 'user'), 'Full house wiring — 3 bedrooms', '৳25,000+', 'Mirpur 10', '<span class="badge badge-amber">Phone reveal</span>', '3 hours ago', st('Quoted'),
        `<div class="flex justify-end gap-1.5">${btn('Follow up', 'phone', 'primary')}${btn('View', 'eye')}${actionsCell([['Resend quote', 'send'], ['Mark won', 'check'], ['Mark lost', 'x']])}</div>`],
      [prow(3, 'Nusrat Jahan', '+880 18•• ••2214 · Repeat client', 'user'), 'CCTV 4-camera installation', '৳18,000', 'Gulshan 2', '<span class="badge badge-green">WhatsApp</span>', 'Yesterday', st('Won'),
        `<div class="flex justify-end gap-1.5">${a2('Create booking', 'cal', 'bookings.html', 'primary')}${actionsCell([['View lead', 'eye'], ['Invoice', 'receipt'], ['Ask for review', 'star']])}</div>`],
      [prow(4, 'Imran Hossain', '+880 15•• ••9930', 'user'), 'Washing machine repair', '৳800–1,200', 'Uttara 7', '<span class="badge badge-gray">Listing page</span>', '2 days ago', st('Lost'),
        `<div class="flex justify-end gap-1.5">${btn('Reopen', 'refresh')}${actionsCell([['View lead', 'eye'], ['Reason: price too high', 'info'], ['Delete', 'trash', 1]])}</div>`],
      [prow(5, 'Unknown caller', 'Number hidden · flagged 3×', 'user'), 'Repeated blank enquiry', '—', '—', '<span class="badge badge-gray">Search</span>', '2 days ago', st('Rejected'),
        `<div class="flex justify-end gap-1.5">${btn('Block', 'ban')}${actionsCell([['Report to HaatBazar', 'flag'], ['Delete', 'trash', 1]])}</div>`]
    ]) + tfoot(1, 10, 153))
    + `<div class="mt-4">${card('Lead board (drag to update stage)', kanban([
      ['New', 'phone', [['Kamal Uddin', 'Split AC servicing (2 units) · Banani · ৳3,000–5,000', '18 min ago', 'New', 'red'], ['Rafiq Mia', 'Ceiling fan installation · Badda', '40 min ago', 'New', 'red']], 'brand'],
      ['Contacted', 'msg', [['Sadia Rahman', 'Fridge not cooling · Dhanmondi', '1 hour ago', 'Called', 'blue']], 'service'],
      ['Quoted', 'file', [['Tanvir Alam', 'Full house wiring · Mirpur 10 · ৳25,000', '3 hours ago', '৳26,500', 'amber']], 'gold'],
      ['Won', 'award', [['Nusrat Jahan', 'CCTV 4-camera install · Gulshan 2', 'Yesterday', '৳18,000', 'green']], 'ink']
    ]), btn('Refresh', 'refresh', 'ghost'))}</div>`
    + modal('m-lead', 'Add manual lead', gridForm([
      fld('Customer name', inp('e.g. Kamal Uddin')), fld('Phone number', inp('+880 1XXXXXXXXX')),
      fld('Service required', sel(['AC repair & servicing', 'Refrigerator repair', 'Electrical wiring', 'CCTV installation'])), fld('Estimated budget', inp('৳3,000–5,000')),
      fld('Area / location', inp('Banani, Dhaka')), fld('Lead source', sel(['Phone call', 'Walk-in', 'WhatsApp', 'Referral', 'Facebook'])),
      fld('Requirement details', ta('What does the customer need?'), 'sm:col-span-2'),
      fld('Assign to', sel(['Myself', 'Jamal (Technician)', 'Sumon (Technician)'])), fld('Follow-up date', inp('', '', 'date'))
    ]) + modalFoot('Save lead', 'Lead added to pipeline'))
}));

/* --------------------------- 2. BOOKINGS ------------------------------ */
W('bookings.html', V({
  title: 'Bookings & Appointments', sub: 'Manage confirmed service jobs, schedules, technicians and site visits.',
  active: 'bookings.html', crumbs: ['Bookings'],
  actions: [btn('Sync calendar', 'refresh'), btn('Availability', 'clock'), btn('New booking', 'plus', 'primary', 'data-modal-open="m-book"')].join(''),
  body: stats([
    ['Today\u2019s jobs', '7', '', 'cal', 'brand', '3 completed · 4 upcoming'],
    ['This week', '31', '+8%', 'clock', 'service', '2 reschedule requests'],
    ['Completion rate', '96%', '+1%', 'check', 'gold', '4 cancelled this month'],
    ['Booking revenue', tk(214800), '+16%', 'money', 'ink', 'Aug 2026']
  ]) + tabs([['Upcoming', '18'], ['Today', '7'], ['Pending confirmation', '5'], ['In progress', '3'], ['Completed', '164'], ['Cancelled', '9'], ['Reschedule requests', '2']])
    + filterbar(['search', ['All services', 'AC servicing', 'Fridge repair', 'Wiring', 'CCTV'], ['All technicians', 'Jamal', 'Sumon', 'Rakib'], ['All slots', 'Morning', 'Afternoon', 'Evening'], 'date'],
      `${btn('Calendar', 'cal', 'primary')}${btn('List', 'list')}${btn('Print schedule', 'print', 'outline', 'data-print')}`)
    + `<div class="grid xl:grid-cols-[1fr_340px] gap-4">
<div class="space-y-4">${card('August 2026', `<div class="flex items-center justify-between px-4 pt-4"><div class="flex items-center gap-1.5">
<button class="icon-btn icon-btn-bd icon-btn-sm">${svg('chevL')}</button><p class="text-[13.5px] font-extrabold px-1">August 2026</p><button class="icon-btn icon-btn-bd icon-btn-sm">${svg('chevR')}</button></div>
<div class="flex gap-1.5">${['Month', 'Week', 'Day', 'Agenda'].map((v, i) => `<button class="chip !h-8 ${i === 0 ? 'is-active' : ''}">${v}</button>`).join('')}</div></div>`
      + calendar({ 3: [['AC service · 10 AM', 1]], 5: [['Wiring · 2 PM']], 8: [['CCTV · 11 AM', 1], ['+2 more']], 12: [['Fridge · 9 AM']], 17: [['AC service · 10 AM', 1], ['Wiring · 1 PM'], ['+2 more']], 19: [['CCTV · 3 PM']], 22: [['Fan install · 11 AM', 1]], 25: [['AC service · 4 PM']], 28: [['Deep clean · 10 AM', 1]] })
      + `<div class="px-4 pb-4 flex flex-wrap gap-3 text-[11.5px] text-ink-500">
${[['#ff2525', 'Confirmed'], ['#00b894', 'Completed'], ['#ffb020', 'Pending'], ['#6c7a91', 'Cancelled']].map(l => `<span class="flex items-center gap-1.5"><i class="legend-dot" style="background:${l[0]}"></i>${l[1]}</span>`).join('')}</div>`)}
${card('Today\u2019s schedule — 17 Aug 2026', table([['Time'], ['Customer'], ['Service'], ['Technician'], ['Amount'], ['Status'], ['Actions', 'text-right']], [
  ['<b>09:00 AM</b><p class="text-[11px] text-ink-400">60 min</p>', prow(0, 'Kamal Uddin', 'Banani · +880 17•• ••8821', 'user'), 'AC servicing (2 units)', '<span class="badge badge-gray">Jamal</span>', tk(3200), st('Completed'), `<div class="flex justify-end gap-1.5">${btn('Invoice', 'receipt')}${btn('Review', 'star')}</div>`],
  ['<b>11:30 AM</b><p class="text-[11px] text-ink-400">120 min</p>', prow(1, 'Sadia Rahman', 'Dhanmondi 27 · +880 19•• ••4410', 'user'), 'Fridge compressor repair', '<span class="badge badge-gray">Sumon</span>', tk(4500), st('Processing'), `<div class="flex justify-end gap-1.5">${btn('Track', 'pin', 'primary')}${btn('Call', 'phone')}</div>`],
  ['<b>02:00 PM</b><p class="text-[11px] text-ink-400">90 min</p>', prow(2, 'Tanvir Alam', 'Mirpur 10 · +880 16•• ••7702', 'user'), 'Wiring inspection', '<span class="badge badge-gray">Jamal</span>', tk(1800), st('Confirmed'), `<div class="flex justify-end gap-1.5">${btn('Start job', 'play', 'primary')}${actionsCell([['Reschedule', 'cal'], ['Reassign', 'users'], ['Cancel', 'x', 1]])}</div>`],
  ['<b>04:30 PM</b><p class="text-[11px] text-ink-400">45 min</p>', prow(3, 'Nusrat Jahan', 'Gulshan 2 · +880 18•• ••2214', 'user'), 'CCTV camera check', '<span class="badge badge-amber">Unassigned</span>', tk(1200), st('Pending'), `<div class="flex justify-end gap-1.5">${btn('Confirm', 'check', 'primary')}${btn('Assign', 'users')}</div>`]
]), btn('View all', 'chevR', 'ghost'))}
${card('Reschedule & cancellation requests', `<div class="p-4 space-y-3">
${[['Imran Hossain', 'Requested to move AC servicing from 18 Aug 10:00 AM → 20 Aug 2:00 PM', 'Reschedule', 'gold'], ['Farhana Akter', 'Wants to cancel deep cleaning booking (reason: travelling)', 'Cancellation', 'brand']].map(r => `<div class="p-3 rounded-xl border border-[#e7e9ef]">
<div class="flex items-start justify-between gap-3 mb-2"><div><p class="text-[13px] font-bold">${r[0]}</p><p class="text-[12px] text-ink-500 mt-0.5">${r[1]}</p></div>
<span class="badge badge-${r[3] === 'gold' ? 'amber' : 'red'} shrink-0">${r[2]}</span></div>
<div class="flex flex-wrap gap-1.5">${btn('Approve', 'check', 'primary')}${btn('Propose new time', 'cal')}${btn('Decline', 'x')}${btn('Message', 'msg', 'ghost')}</div></div>`).join('')}</div>`)}</div>
<div class="space-y-4">
${card('Job stats', `<div class="p-4 space-y-3">${mini([[tk(214800), 'Revenue (Aug)'], ['4.9', 'Avg. job rating'], ['96%', 'On-time arrival'], ['38 min', 'Avg. travel time']])}
<div>${bars([['AC servicing', 46, '78 jobs'], ['Fridge repair', 28, '47 jobs', '#00b894'], ['Wiring', 18, '31 jobs', '#ffb020'], ['CCTV', 8, '14 jobs', '#8b5cf6']])}</div></div>`)}
${card('Technicians on duty', people([['Jamal Uddin', 'AC & wiring · 3 jobs today', '★ 4.9', 'brand'], ['Sumon Islam', 'Refrigeration · 2 jobs today', '★ 4.8', 'service'], ['Rakib Hasan', 'CCTV & electrical · Off duty', '★ 4.7', 'ink']]) + `<div class="px-4 pb-4">${btn('Manage team', 'users', 'outline')}</div>`)}
${card('Service area & slots', `<div class="p-4 space-y-3">${kv([['Coverage radius', '12 km from Banani'], ['Working days', 'Sat – Thu'], ['Working hours', '09:00 AM – 08:00 PM'], ['Slot duration', '60 minutes'], ['Buffer between jobs', '30 minutes'], ['Emergency service', 'Yes (+৳500)']])}
${btn('Edit availability', 'cog', 'outline')}</div>`)}
${card('Booking policy', `<div class="p-4 space-y-2.5 text-[12.5px] text-ink-600">
<p class="flex gap-2">${svg('check', 'w-4 h-4 text-service-600 shrink-0 mt-0.5')}Free cancellation up to 6 hours before the slot.</p>
<p class="flex gap-2">${svg('check', 'w-4 h-4 text-service-600 shrink-0 mt-0.5')}Visit charge ৳300, waived if job is confirmed.</p>
<p class="flex gap-2">${svg('check', 'w-4 h-4 text-service-600 shrink-0 mt-0.5')}30-day service warranty on all repairs.</p>
${btn('Edit policy', 'edit', 'outline')}</div>`)}</div></div>`
    + modal('m-book', 'Create new booking', gridForm([
      fld('Customer', inp('Search customer or type name')), fld('Phone', inp('+880 1XXXXXXXXX')),
      fld('Service', sel(['AC repair & servicing', 'Refrigerator repair', 'Electrical wiring', 'CCTV installation', 'Deep cleaning'])), fld('Package', sel(['Basic — ৳1,200', 'Standard — ৳2,500', 'Premium — ৳4,500', 'Custom'])),
      fld('Date', inp('', '', 'date')), fld('Time slot', sel(['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'])),
      fld('Duration', sel(['30 min', '60 min', '90 min', '120 min', 'Half day'])), fld('Assign technician', sel(['Auto-assign', 'Jamal Uddin', 'Sumon Islam', 'Rakib Hasan'])),
      fld('Full address', ta('House, road, area, city'), 'sm:col-span-2'),
      fld('Amount', inp('৳3,200')), fld('Payment', sel(['Cash after service', 'Online (advance)', 'bKash', 'Card'])),
      fld('Job notes', ta('Anything the technician should know'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Send SMS confirmation', true)}${chk('Send reminder 2h before', true)}${chk('Emergency / priority job')}</div>`
    ]) + modalFoot('Create booking', 'Booking created'))
}));

/* ----------------------- 3. BUSINESS PROFILE -------------------------- */
const hrs = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
W('business-profile.html', V({
  title: 'Business Profile', sub: 'This is what customers see on your public service listing page.',
  active: 'business-profile.html', crumbs: ['Business profile'],
  actions: [a2('Preview public page', 'eye', '../service-details.html'), btn('Copy link', 'copy', 'outline', 'data-copy="haatbazar.com/rahim-electric"'), btn('Save changes', 'check', 'primary', 'data-toast="Business profile updated"')].join(''),
  body: `<div class="grid xl:grid-cols-[1fr_330px] gap-4">
<div class="space-y-4">
${card('Profile completeness', `<div class="p-5"><div class="flex items-center gap-4 mb-4">
<div class="w-[86px] h-[86px] shrink-0" data-ring="82" data-ring-color="#ff2525"></div>
<div><p class="text-[15px] font-extrabold">Your profile is 82% complete</p><p class="text-[12.5px] text-ink-500 mt-1">Complete profiles get up to 3× more leads. Finish these to reach 100%:</p></div></div>
<div class="grid sm:grid-cols-2 gap-2.5">${[['Add 5 more work photos', 'camera', 0], ['Upload trade licence', 'file', 0], ['Add business video', 'video', 0], ['Verify phone number', 'phone', 1], ['Add service areas', 'pin', 1], ['Set business hours', 'clock', 1]].map(t => `<div class="flex items-center gap-2.5 p-2.5 rounded-xl border ${t[2] ? 'border-service-200 bg-service-50' : 'border-[#e7e9ef]'}">
${svg(t[2] ? 'check' : t[1], `w-4 h-4 ${t[2] ? 'text-service-600' : 'text-ink-400'} shrink-0`)}<span class="text-[12.5px] font-semibold ${t[2] ? 'text-service-700' : ''}">${t[0]}</span>
${t[2] ? '' : `<button class="btn btn-xs btn-outline ml-auto shrink-0">Add</button>`}</div>`).join('')}</div></div>`)}
${card('Cover photo & logo', `<div class="p-5"><div class="ph ph-b rounded-xl h-[170px] relative mb-3 grid place-items-center">${svg('image', 'w-8 h-8 text-white/70')}
<div class="absolute bottom-3 right-3 flex gap-1.5">${btn('Change cover', 'camera')}${btn('Remove', 'trash')}</div>
<div class="absolute -bottom-8 left-5 w-[84px] h-[84px] rounded-2xl bg-white p-1.5 shadow-card"><span class="ph ph-a rounded-xl w-full h-full grid place-items-center text-[22px] font-extrabold text-white">R</span></div></div>
<div class="pt-8 flex flex-wrap gap-2">${btn('Upload logo', 'up')}${btn('Upload cover', 'image')}<span class="text-[11.5px] text-ink-400 self-center">Logo 400×400px · Cover 1600×500px · JPG/PNG · max 2MB</span></div></div>`)}
${formCard('Business information', [
    fld('Business name *', inp('', 'Rahim Electric & Home Services')),
    fld('Business type *', sel(['Service provider', 'Product seller', 'Both product & service'])),
    fld('Primary category *', sel(['AC Repair & Servicing', 'Electrician', 'Home Appliance Repair', 'CCTV & Security'])),
    fld('Additional categories', inp('', 'Electrician, CCTV Installation, Fan Repair'), '', 'Up to 5 categories — helps you appear in more searches'),
    fld('Established year', inp('', '2015')), fld('Team size', sel(['1–5 people', '6–15 people', '16–50 people', '50+ people'])),
    fld('Tagline', inp('', 'Trusted AC & appliance experts in Dhaka since 2015'), 'sm:col-span-2', 'Max 90 characters — appears under your business name'),
    fld('About your business *', ta('', 'Rahim Electric is a Dhaka-based home service provider specialising in air-conditioner installation, servicing and repair. Our factory-trained technicians handle all major brands including Gree, Walton, Midea, Samsung and General. We offer same-day service, genuine spare parts, transparent pricing and a 30-day service warranty on every job.', 130), 'sm:col-span-2'),
    fld('Languages spoken', inp('', 'Bangla, English'), '', ''), fld('Year-round availability', sel(['Open all week', 'Weekdays only', 'By appointment']))
  ], 'sm:grid-cols-2', btn('AI rewrite description', 'sparkle', 'ghost'))}
${card('Services & pricing', `<div class="p-5"><div class="space-y-2.5" id="svc-rows">
${[['AC servicing (split)', 'Per unit', '1,200', '60 min'], ['AC gas refill', 'Per unit', '3,500', '90 min'], ['Fridge repair (visit)', 'Per visit', '500', '45 min'], ['House wiring', 'Per point', '250', 'Varies']].map(r => `<div class="grid sm:grid-cols-[1.6fr_1fr_1fr_1fr_auto] gap-2 items-center" data-repeat-row>
<input class="input input-sm" value="${r[0]}"><select class="select input-sm"><option>${r[1]}</option><option>Fixed</option><option>Hourly</option><option>Custom quote</option></select>
<div class="input-group"><span class="text-[12px] font-bold text-ink-400 pl-2">৳</span><input class="input input-sm !pl-6" value="${r[2]}"></div>
<input class="input input-sm" value="${r[3]}"><button class="icon-btn icon-btn-sm text-brand-600" data-repeat-remove>${svg('trash')}</button></div>`).join('')}</div>
<button class="btn btn-sm btn-outline mt-3" data-repeat-add="#svc-rows">${svg('plus')}Add service row</button>
<div class="mt-3 flex flex-wrap gap-4">${chk('Show prices publicly', true)}${chk('Show "starting from" only')}${chk('Free site inspection', true)}</div></div>`)}
${card('Service areas & coverage', `<div class="p-5"><div class="ph ph-d ratio-map rounded-xl grid place-items-center mb-3">${svg('pin', 'w-8 h-8 text-white/70')}</div>
<div class="grid sm:grid-cols-2 gap-3.5 mb-3">${[fld('City *', sel(['Dhaka', 'Chattogram', 'Sylhet', 'Khulna'])), fld('Coverage radius', sel(['5 km', '10 km', '12 km', '20 km', 'Whole city']))].join('')}</div>
<label class="label">Areas served</label><div class="flex flex-wrap gap-1.5 mb-2">${['Banani', 'Gulshan 1', 'Gulshan 2', 'Baridhara', 'Mohakhali', 'Bashundhara', 'Uttara', 'Dhanmondi', 'Mirpur'].map(t => `<span class="chip is-active !h-8">${t}${svg('x', 'w-3 h-3')}</span>`).join('')}
<button class="chip !h-8">${svg('plus', 'w-3 h-3')}Add area</button></div>
${note('Listings with 8+ service areas receive 42% more enquiries on average.', 'service', 'bolt')}</div>`)}
${card('Business hours', `<div class="p-5 space-y-2">${hrs.map((d, i) => `<div class="flex items-center gap-3 py-1.5">
<span class="w-[92px] text-[13px] font-bold">${d}</span>${sw(i !== 6)}
${i === 6 ? '<span class="text-[12.5px] text-ink-400">Closed</span>' : `<select class="select input-sm !w-auto"><option>09:00 AM</option><option>10:00 AM</option></select><span class="text-ink-400">–</span><select class="select input-sm !w-auto"><option>08:00 PM</option><option>09:00 PM</option></select>
<label class="check ml-auto"><input type="checkbox" ${i < 2 ? 'checked' : ''}>Emergency 24/7</label>`}</div>`).join('')}
<div class="pt-2 flex flex-wrap gap-2">${btn('Copy to all days', 'copy')}${btn('Add holiday / special hours', 'cal')}</div></div>`)}
${card('Photo & video gallery', `<div class="p-5"><div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
${Array.from({ length: 7 }, (_, i) => `<div class="relative group"><span class="ph ${['ph-a', 'ph-b', 'ph-c', 'ph-d', 'ph-e', 'ph-f', 'ph-g'][i]} ratio-4 rounded-xl w-full grid place-items-center">${svg(i === 6 ? 'video' : 'image', 'w-6 h-6 text-white/70')}</span>
${i === 0 ? '<span class="badge badge-solid absolute top-1.5 left-1.5 !text-[10px]">Cover</span>' : ''}
<div class="absolute inset-0 bg-black/45 rounded-xl opacity-0 group-hover:opacity-100 transition grid place-items-center gap-1.5 grid-flow-col">
<button class="icon-btn icon-btn-sm !text-white">${svg('eye')}</button><button class="icon-btn icon-btn-sm !text-white">${svg('star')}</button><button class="icon-btn icon-btn-sm !text-white">${svg('trash')}</button></div></div>`).join('')}
<button class="dz ratio-4 grid place-items-center">${svg('plus', 'w-6 h-6 mb-1')}<span>Add photo</span></button></div>
<div class="grid sm:grid-cols-2 gap-3.5">${[fld('YouTube / video URL', inp('https://youtube.com/watch?v=…')), fld('Virtual tour link', inp('Google 360° / Street View link'))].join('')}</div></div>`)}
${card('Certifications, licences & awards', `<div class="p-5"><div class="space-y-2.5 mb-3">
${[['Trade licence', 'TRAD/DNCC/2015/48210', 'Verified', 'green'], ['TIN certificate', 'TIN-482910334', 'Verified', 'green'], ['Gree authorised service partner', 'Certificate 2024–2026', 'Pending review', 'amber'], ['Best Home Service 2025', 'HaatBazar Awards', 'Verified', 'green']].map((r, i) => `<div class="flex items-center gap-3 p-3 rounded-xl border border-[#e7e9ef]">
${ph(i, 'file', 'w-10 h-10 rounded-lg shrink-0')}<div class="min-w-0 flex-1"><p class="text-[13px] font-bold clamp-1">${r[0]}</p><p class="text-[11.5px] text-ink-400">${r[1]}</p></div>
<span class="badge badge-${r[3]} shrink-0">${r[2]}</span><button class="icon-btn icon-btn-sm text-ink-400">${svg('trash')}</button></div>`).join('')}</div>
<button class="dz w-full">${svg('up', 'w-6 h-6 mx-auto mb-1.5')}<b class="block text-[13px] text-ink-800">Upload certificate or licence</b>PDF, JPG or PNG · max 5MB each</button></div>`)}
${formCard('Contact & social links', [
    fld('Primary phone *', inp('', '+880 1712 345678')), fld('Secondary phone', inp('', '+880 1912 345678')),
    fld('WhatsApp number', inp('', '+880 1712 345678')), fld('Business email *', inp('', 'info@rahimelectric.com.bd')),
    fld('Website', inp('', 'https://rahimelectric.com.bd')), fld('Google Maps link', inp('https://maps.google.com/…')),
    fld('Facebook page', inp('', 'facebook.com/rahimelectric')), fld('Instagram', inp('instagram.com/username')),
    fld('YouTube channel', inp('youtube.com/@channel')), fld('LinkedIn', inp('linkedin.com/company/…')),
    fld('Full address *', ta('', 'House 42, Road 11, Block C, Banani, Dhaka 1213, Bangladesh'), 'sm:col-span-2'),
    fld('Landmark / directions', inp('', 'Beside Banani Bazar, opposite City Bank'), 'sm:col-span-2')
  ])}
${formCard('SEO & discoverability', [
    fld('Public URL slug', `<div class="input-group"><span class="text-[12px] text-ink-400 pl-3">haatbazar.com/</span><input class="input !pl-[112px]" value="rahim-electric-banani"></div>`, 'sm:col-span-2'),
    fld('Meta title', inp('', 'Rahim Electric — AC Repair & Home Services in Banani, Dhaka'), 'sm:col-span-2'),
    fld('Meta description', ta('', 'Book trusted AC servicing, gas refill, fridge repair and electrical work in Banani, Gulshan and Dhanmondi. Same-day service, genuine parts, 30-day warranty.', 70), 'sm:col-span-2'),
    fld('Search keywords', inp('', 'ac repair banani, ac servicing dhaka, fridge repair gulshan, electrician near me'), 'sm:col-span-2', 'Comma separated · max 15 keywords')
  ], 'sm:grid-cols-2')}
${card('Trust & safety badges', frows([
    ['Verified business', 'Your trade licence and phone number are verified by HaatBazar.', '<span class="badge badge-green">' + svg('check', 'w-3 h-3') + 'Verified</span>'],
    ['Background-checked staff', 'All technicians have submitted NID and police clearance.', '<span class="badge badge-green">Active</span>'],
    ['Insurance coverage', 'Property damage insurance up to ৳2,00,000 per job.', true],
    ['Warranty on work', 'Show a 30-day service warranty badge on your listing.', true],
    ['Free cancellation', 'Allow customers to cancel free up to 6 hours before the slot.', true],
    ['Digital payment accepted', 'bKash, Nagad, card and HaatBazar wallet.', true]
  ]))}
</div>
<div class="space-y-4">
${card('Live preview', `<div class="p-4"><div class="rounded-xl border border-[#e7e9ef] overflow-hidden">
<div class="ph ph-b h-[74px]"></div><div class="p-3.5 -mt-8"><span class="ph ph-a w-14 h-14 rounded-xl border-[3px] border-white grid place-items-center text-[18px] font-extrabold text-white">R</span>
<div class="flex items-center gap-1.5 mt-2"><p class="text-[14px] font-extrabold">Rahim Electric</p>${svg('shield', 'w-4 h-4 text-service-600')}</div>
<p class="text-[12px] text-ink-500">AC Repair & Home Services</p>
<div class="flex items-center gap-1.5 mt-1.5">${stars(5)}<span class="text-[12px] font-bold">4.9</span><span class="text-[11.5px] text-ink-400">(486)</span></div>
<div class="flex flex-wrap gap-1.5 mt-2">${['11 yrs', 'Verified', 'Same-day'].map(t => `<span class="badge badge-gray !text-[10px]">${t}</span>`).join('')}</div>
<div class="flex gap-1.5 mt-3">${btn('Call now', 'phone', 'primary')}${btn('Enquire', 'msg')}</div></div></div>
<p class="text-[11.5px] text-ink-400 mt-2.5 text-center">Preview of your listing card in search results</p></div>`)}
${card('Listing performance', `<div class="p-4">${mini([['18.4K', 'Profile views'], ['1,240', 'Phone reveals'], ['153', 'Leads (30d)'], ['#3', 'Category rank']])}
<div class="mt-3">${bars([['Search impressions', 78, '42.8K'], ['Profile views', 62, '18.4K', '#00b894'], ['Contact clicks', 41, '3.2K', '#ffb020'], ['Leads', 24, '153', '#8b5cf6']])}</div>
<a href="analytics.html" class="btn btn-sm btn-outline btn-block mt-3">${svg('chart')}Full analytics</a></div>`)}
${card('Boost visibility', `<div class="p-4 space-y-2.5">${tiles([
    ['bolt', 'Get Featured badge', 'Appear at the top of your category', 'ads.html', 'brand'],
    ['megaphone', 'Run a promotion', 'Discount campaigns for services', 'promotions.html', 'gold'],
    ['star', 'Collect more reviews', 'Send review requests to past clients', 'reviews.html', 'service'],
    ['graduation', 'Profile masterclass', '12-minute course for providers', 'academy.html', 'ink']
  ], 'grid-cols-1')}</div>`)}
${card('Verification status', `<div class="p-4 space-y-2.5">
${[['Phone number', 'Verified', 'green'], ['Email address', 'Verified', 'green'], ['NID / owner identity', 'Verified', 'green'], ['Trade licence', 'Verified', 'green'], ['Bank account', 'Verified', 'green'], ['Physical address', 'Pending visit', 'amber']].map(r => `<div class="flex items-center justify-between text-[12.5px]"><span class="text-ink-600">${r[0]}</span><span class="badge badge-${r[2]}">${r[1]}</span></div>`).join('')}
<a href="documents.html" class="btn btn-sm btn-outline btn-block mt-1">${svg('idcard')}Manage documents</a></div>`)}
${card('Need help?', `<div class="p-4 space-y-2">${note('Profile changes are reviewed within 2 hours during business days. Category and name changes need admin approval.', 'brand', 'info')}
${btn('Chat with support', 'msg')}${btn('Read profile guide', 'book', 'ghost')}</div>`)}
</div></div>`
}));

/* ---------------------------- 4. CUSTOMERS ---------------------------- */
W('customers.html', V({
  title: 'My Customers', sub: 'Everyone who has ordered products or booked services from you.',
  active: 'customers.html', crumbs: ['Customers'],
  actions: [btn('Import contacts', 'up'), btn('Export CSV', 'dl'), btn('Send broadcast', 'send', 'primary', 'data-modal-open="m-bcast"')].join(''),
  body: `${stats([
    ['Total customers', '3,842', '+6.2%', 'users', 'brand', '284 new this month'],
    ['Repeat buyers', '1,164', '+9%', 'refresh', 'service', '30.3% repeat rate'],
    ['Avg. order value', tk(2480), '+3.4%', 'money', 'gold', 'Last 30 days'],
    ['Lifetime value', tk(8940), '+5%', 'award', 'ink', 'Average per customer']
  ])}
<div class="grid lg:grid-cols-3 gap-4 mb-4">
${card('Customer segments', `<div class="p-4">${bars([['New (first order)', 42, '1,612'], ['Repeat (2–4 orders)', 28, '1,076', '#00b894'], ['Loyal (5+ orders)', 18, '692', '#ffb020'], ['VIP (৳50K+ spent)', 8, '308', '#8b5cf6'], ['At risk (90d inactive)', 12, '461', '#b42318']])}</div>`, btn('Manage segments', 'layers', 'ghost'))}
${card('Top locations', `<div class="p-4">${hbars([['Dhaka', 92, '2,410'], ['Chattogram', 46, '621', '#00b894'], ['Sylhet', 28, '312', '#ffb020'], ['Khulna', 21, '243', '#6c7a91'], ['Rajshahi', 14, '186', '#8b5cf6']])}</div>`)}
${card('Top customers', people([['Nusrat Jahan', '18 orders · ৳1,84,200', 'VIP', 'brand'], ['Kamal Uddin', '14 orders · ৳96,400', 'Loyal', 'service'], ['Sadia Rahman', '11 orders · ৳74,100', 'Loyal', 'gold'], ['Tanvir Alam', '9 orders · ৳62,800', 'Repeat', 'ink']]))}
</div>
${tabs([['All customers', '3,842'], ['New', '284'], ['Repeat', '1,164'], ['VIP', '308'], ['At risk', '461'], ['Blocked', '12']])}
${filterbar(['search', ['All segments', 'New', 'Repeat', 'Loyal', 'VIP', 'At risk'], ['All cities', 'Dhaka', 'Chattogram', 'Sylhet'], ['Type: All', 'Product buyers', 'Service clients', 'Both'], ['Sort: Highest spend', 'Most orders', 'Newest', 'Last active']],
    `${btn('Send SMS', 'phone')}${btn('Send voucher', 'ticket')}${btn('Export', 'dl')}`)}
${bulkbar(['Send voucher', 'Send message', 'Add to segment', 'Add tag', 'Export selected', 'Block'])}
${card('', table([['Customer'], ['Contact'], ['Location'], ['Orders'], ['Total spent'], ['Last order'], ['Segment'], ['Actions', 'text-right']], [
    [prow(0, 'Nusrat Jahan', 'Member since Mar 2023 · ID #C-40821', 'user'), 'nusrat@email.com<p class="text-[11.5px] text-ink-400">+880 18•• ••2214</p>', 'Gulshan 2, Dhaka', '<b>18</b><p class="text-[11px] text-ink-400">2 returns</p>', `<b>${tk(184200)}</b>`, '2 days ago', '<span class="badge badge-purple">VIP</span>',
      `<div class="flex justify-end gap-1.5">${btn('Message', 'msg')}${actionsCell([['View profile', 'eye'], ['Order history', 'bag'], ['Send voucher', 'ticket'], ['Add note', 'edit'], ['Add tag', 'tag'], ['Block customer', 'ban', 1]])}</div>`],
    [prow(1, 'Kamal Uddin', 'Member since Jan 2024 · ID #C-51204', 'user'), 'kamal@email.com<p class="text-[11.5px] text-ink-400">+880 17•• ••8821</p>', 'Banani, Dhaka', '<b>14</b>', `<b>${tk(96400)}</b>`, '5 hours ago', '<span class="badge badge-amber">Loyal</span>',
      `<div class="flex justify-end gap-1.5">${btn('Message', 'msg')}${actionsCell([['View profile', 'eye'], ['Order history', 'bag'], ['Send voucher', 'ticket']])}</div>`],
    [prow(2, 'Sadia Rahman', 'Member since Aug 2024 · ID #C-60912', 'user'), 'sadia@email.com<p class="text-[11.5px] text-ink-400">+880 19•• ••4410</p>', 'Dhanmondi, Dhaka', '<b>11</b><p class="text-[11px] text-ink-400">1 return</p>', `<b>${tk(74100)}</b>`, '1 week ago', '<span class="badge badge-amber">Loyal</span>',
      `<div class="flex justify-end gap-1.5">${btn('Message', 'msg')}${actionsCell([['View profile', 'eye'], ['Order history', 'bag'], ['Send voucher', 'ticket']])}</div>`],
    [prow(3, 'Tanvir Alam', 'Member since Feb 2025 · ID #C-71430', 'user'), 'tanvir@email.com<p class="text-[11.5px] text-ink-400">+880 16•• ••7702</p>', 'Mirpur, Dhaka', '<b>9</b>', `<b>${tk(62800)}</b>`, '3 weeks ago', '<span class="badge badge-blue">Repeat</span>',
      `<div class="flex justify-end gap-1.5">${btn('Message', 'msg')}${actionsCell([['View profile', 'eye'], ['Win-back offer', 'gift'], ['Send voucher', 'ticket']])}</div>`],
    [prow(4, 'Imran Hossain', 'Member since Jun 2026 · ID #C-88204', 'user'), 'imran@email.com<p class="text-[11.5px] text-ink-400">+880 15•• ••9930</p>', 'Uttara, Dhaka', '<b>1</b>', `<b>${tk(11290)}</b>`, '4 months ago', '<span class="badge badge-red">At risk</span>',
      `<div class="flex justify-end gap-1.5">${btn('Win-back', 'gift', 'primary')}${actionsCell([['View profile', 'eye'], ['Send voucher', 'ticket']])}</div>`],
    [prow(5, 'Blocked User', 'Repeated fake orders · blocked 12 Jul', 'user'), 'hidden@email.com', 'Unknown', '<b>3</b>', `<b>${tk(0)}</b>`, '—', '<span class="badge badge-gray">Blocked</span>',
      `<div class="flex justify-end gap-1.5">${btn('Unblock', 'refresh')}${actionsCell([['View reason', 'info'], ['Report to admin', 'flag']])}</div>`]
  ]) + tfoot(1, 10, 3842))}
${modal('m-bcast', 'Send broadcast message', gridForm([
    fld('Send to', sel(['All customers (3,842)', 'VIP customers (308)', 'Repeat buyers (1,164)', 'At-risk customers (461)', 'Custom segment'])),
    fld('Channel', sel(['In-app notification', 'SMS', 'Email', 'All channels'])),
    fld('Subject / title', inp('e.g. 20% off all AC servicing this week'), 'sm:col-span-2'),
    fld('Message', ta('Write your message… Use {name} to personalise.', '', 110), 'sm:col-span-2'),
    fld('Attach voucher', sel(['None', 'SAVE10 — 10% off', 'FREEDEL — Free delivery', 'Create new voucher'])),
    fld('Send time', sel(['Send now', 'Schedule for later'])),
    `<div class="sm:col-span-2">${note('SMS broadcasts cost ৳0.35 per message and are deducted from your ad balance. Estimated cost: ৳1,344 for 3,842 recipients.', 'gold', 'info')}</div>`
  ]) + modalFoot('Send broadcast', 'Broadcast queued for delivery'))}`
}));



