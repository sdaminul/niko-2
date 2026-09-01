/* Admin services: services, service-approvals, service-categories, bookings, leads */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, svg, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, hbars, donut, modal, modalFoot, stars } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('services.html', {
  title: 'Service Listings', sub: 'All directory listings from service providers across Bangladesh.', crumb: 'Service listings',
  actions: [['Import listings', 'up'], ['Export', 'dl'], ['Add listing', 'plus', 'primary']],
  stats: [['Total listings', '1,24,000', '+9%', 'briefcase', 'service', 'In 64 districts'],
    ['Verified listings', '86,420', '+12%', 'shield', 'brand', '69.7% verified'],
    ['Pending approval', '142', '', 'clock', 'gold', 'Oldest: 2 days'],
    ['Claim requests', '68', '', 'flag', 'ink', 'Business ownership claims']],
  tabs: [['All', '1,24,000'], ['Live', '1,18,240'], ['Pending', '142'], ['Unverified', '37,580'], ['Claim requests', '68'], ['Suspended', '842'], ['Reported', '96']],
  filters: ['search', ['All categories', 'Restaurants', 'Home services', 'Health', 'Education', 'Beauty & Spa', 'Automotive', 'Events'], ['All cities', 'Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi'], ['All areas', 'Gulshan', 'Dhanmondi', 'Uttara', 'Banani'], ['All plans', 'Free', 'Silver', 'Gold', 'Platinum'], ['All statuses', 'Live', 'Pending', 'Suspended'], ['Verification: All', 'Verified', 'Unverified'], ['Sort: Newest', 'Most leads', 'Highest rated', 'Most viewed']],
  fbtns: btn('Map view', 'map') + btn('Export', 'dl'),
  bulk: ['Approve', 'Verify', 'Feature listing', 'Change category', 'Assign plan', 'Suspend', 'Export'],
  head: ['Business', 'Category', 'Location', 'Plan', 'Contact', 'Leads (30d)', 'Bookings', 'Views', 'Rating', 'Verified', 'Status', ['Actions', 'text-right']],
  rows: [
    [prow(0, 'Shree Rath Pure Veg Restaurant', 'Listed 12 Mar 2025 · 24 photos · Menu uploaded'), 'Restaurants › Pure Veg', 'Ambernath, Dhaka', bd('Platinum', 'amber'), '01711-000111<p class="text-[11px] text-ink-400">Verified phone</p>', '<b>284</b>', '86', '48.2K', '4.6 ★ (1,284)', bd('Verified', 'green'), st('Live'), A([['View on site', 'globe'], ['Edit listing', 'edit'], ['Verification docs', 'shield'], ['Change plan', 'award'], ['Boost visibility', 'bolt'], ['View leads', 'users'], ['Suspend', 'ban', 1]])],
    [prow(1, 'Dhaka AC Service & Repair', 'Listed 08 Jan 2026 · 18 photos'), 'Home services › AC repair', 'Mirpur, Dhaka', bd('Gold', 'amber'), '01811-222333', '<b>412</b>', '184', '62.4K', '4.8 ★ (642)', bd('Verified', 'green'), A => A, A([['View on site', 'globe'], ['Edit listing', 'edit'], ['View bookings', 'cal']])],
    [prow(2, 'Green Life Diagnostic Centre', 'Listed 22 Feb 2026 · 12 photos'), 'Health › Diagnostics', 'Dhanmondi, Dhaka', bd('Gold', 'amber'), '01911-444555', '<b>186</b>', '242', '38.6K', '4.5 ★ (386)', bd('Verified', 'green'), st('Live'), A([['View on site', 'globe'], ['Edit listing', 'edit'], ['Licence documents', 'file']])],
    [prow(3, 'Prime Coaching Centre', 'Submitted 20 Aug 2026 · awaiting review'), 'Education › Coaching', 'Uttara, Dhaka', bd('Free', 'gray'), '01611-666777<p class="text-[11px] text-brand-600">Unverified</p>', '—', '—', '—', '—', bd('Pending', 'amber'), st('Pending'), A([['Review listing', 'eye'], ['Verify phone', 'phone'], ['Approve', 'check'], ['Reject', 'x', 1]])],
    [prow(4, 'Glamour Beauty Parlour', 'Listed 05 Jul 2026 · 32 photos'), 'Beauty & Spa › Parlour', 'Gulshan, Dhaka', bd('Silver', 'gray'), '01511-888999', '<b>142</b>', '96', '24.8K', '4.4 ★ (218)', bd('Verified', 'green'), st('Live'), A([['View on site', 'globe'], ['Edit listing', 'edit'], ['Upsell plan', 'award']])],
    [prow(5, 'Rapid Car Rental BD', 'Suspended 12 Aug · fake reviews detected'), 'Automotive › Car rental', 'Banani, Dhaka', bd('Gold', 'amber'), '01411-101010', '0', '0', '18.2K', '3.1 ★ (86)', bd('Under review', 'red'), st('Suspended'), A([['View case', 'flag'], ['Review evidence', 'file'], ['Reinstate', 'refresh'], ['Blacklist', 'ban', 1]])],
    [prow(6, 'Elite Wedding Planners', 'Claim request from owner · 3 days ago'), 'Events › Wedding planner', 'Bashundhara, Dhaka', bd('Free', 'gray'), '01311-121212', '68', '12', '14.6K', '4.2 ★ (48)', bd('Claim pending', 'amber'), st('Live'), A([['Review claim', 'shield'], ['Contact claimant', 'phone'], ['Approve claim', 'check'], ['Reject claim', 'x', 1]])]
  ], total: 124000,
  after: row3(card('Listings by city', `<div class="p-4">${hbars([['Dhaka', 96, '52,480'], ['Chittagong', 48, '18,240', '#00b894'], ['Sylhet', 32, '11,860', '#ffb020'], ['Khulna', 26, '9,420', '#8b5cf6'], ['Rajshahi', 22, '8,120', '#6c7a91'], ['Other districts', 38, '23,880', '#b42318']])}
<div class="mt-2">${btn('Manage locations', 'map')}</div></div>`),
    card('Plan distribution', `<div class="p-4 flex items-center gap-4">${donut([['Free', 62, '#c0c4cc'], ['Silver', 18, '#6c7a91'], ['Gold', 14, '#ffb020'], ['Platinum', 6, '#ff2525']], ['1.24L', 'Listings'])}
<div class="flex-1">${kv([['Free listings', '76,880'], ['Silver', '22,320'], ['Gold', '17,360'], ['Platinum', '7,440'], ['Plan revenue (MRR)', tk(4820000)], ['Upgrade rate', '4.8%']])}</div></div>`),
    card('Verification & quality', `<div class="p-4">${kv([['Phone verified', '92,480 (74.5%)'], ['Address verified (field visit)', '38,420'], ['Trade licence uploaded', '48,620'], ['With photos (5+)', '68,240'], ['With business hours', '86,180'], ['With price list / menu', '32,480'], ['Duplicate listings detected', '1,842']])}
<div class="flex gap-2 mt-3">${btn('Verification queue', 'shield')}${btn('Merge duplicates', 'copy')}</div></div>`))
});

AD('service-approvals.html', {
  title: 'Service Approvals & Claims', sub: 'Approve new listings, verification documents and business ownership claims.', crumb: 'Service approvals',
  actions: [['Verification rules', 'cog'], ['Assign reviewer', 'user'], ['Approve selected', 'check', 'primary']],
  stats: [['Pending listings', '142', '', 'clock', 'brand', 'Avg. review time 4.2 hrs'],
    ['Document reviews', '86', '', 'file', 'service', 'Trade licence / NID'],
    ['Ownership claims', '68', '', 'shield', 'gold', 'Business claim requests'],
    ['Field visits scheduled', '24', '', 'map', 'ink', 'Physical verification']],
  tabs: [['New listings', '142'], ['Documents', '86'], ['Ownership claims', '68'], ['Field visits', '24'], ['Approved', '486'], ['Rejected', '42']],
  filters: ['search', ['All categories', 'Restaurants', 'Home services', 'Health', 'Education'], ['All cities', 'Dhaka', 'Chittagong', 'Sylhet'], ['Priority: All', 'Paid plan first', 'Oldest first', 'Flagged'], ['Reviewer: Anyone', 'Assigned to me', 'Unassigned']],
  head: ['Business', 'Type', 'Category', 'Location', 'Submitted by', 'Documents', 'Phone', 'Submitted', 'Reviewer', ['Actions', 'text-right']],
  rows: [
    [prow(0, 'Prime Coaching Centre', 'Free plan · 4 photos'), bd('New listing', 'blue'), 'Education › Coaching', 'Uttara, Dhaka', 'Kamal Hossain<p class="text-[11px] text-ink-400">kamal@mail.com</p>', bd('Trade licence ✓', 'green') + ' ' + bd('NID ✓', 'green'), bd('Verified', 'green'), '2 hours ago', 'Unassigned', A([['Review', 'eye'], ['Approve', 'check'], ['Request info', 'msg'], ['Schedule field visit', 'cal'], ['Reject', 'x', 1]])],
    [prow(1, 'City Dental Care', 'Gold plan · paid'), bd('New listing', 'blue'), 'Health › Dental', 'Mirpur, Dhaka', 'Dr. Nusrat Jahan', bd('BMDC licence ✓', 'green') + ' ' + bd('NID pending', 'amber'), bd('Verified', 'green'), '5 hours ago', 'Nafisa K.', A([['Review', 'eye'], ['Verify licence', 'shield'], ['Approve', 'check'], ['Reject', 'x', 1]])],
    [prow(2, 'Elite Wedding Planners', 'Existing listing (unclaimed)'), bd('Ownership claim', 'amber'), 'Events › Wedding', 'Bashundhara, Dhaka', 'Rifat Chowdhury', bd('NID ✓', 'green') + ' ' + bd('Utility bill ✓', 'green'), bd('Verified', 'green'), '3 days ago', 'Sabbir A.', A([['Review claim', 'shield'], ['Call claimant', 'phone'], ['Approve claim', 'check'], ['Reject claim', 'x', 1]])],
    [prow(3, 'Bismillah Biryani House', 'Silver plan'), bd('Document review', 'blue'), 'Restaurants › Biryani', 'Old Dhaka', 'Jashim Uddin', bd('Trade licence ✓', 'green') + ' ' + bd('Food licence missing', 'red'), bd('Verified', 'green'), '1 day ago', 'Unassigned', A([['Review docs', 'file'], ['Request food licence', 'msg'], ['Approve', 'check']])],
    [prow(4, 'Smart Home Electricians', 'Free plan'), bd('New listing', 'blue'), 'Home services › Electrician', 'Chittagong', 'Rakib Islam', bd('No documents', 'red'), bd('Unverified', 'red'), '2 days ago', 'Unassigned', A([['Send OTP', 'phone'], ['Request documents', 'msg'], ['Reject', 'x', 1]])]
  ], total: 142,
  after: row2(card('Verification checklist — Prime Coaching Centre', `<div class="p-4">${[['Business name matches trade licence', 1], ['Owner NID verified & matches applicant', 1], ['Phone number OTP verified', 1], ['Address found on map (geo-code)', 1], ['Photos are original (not stock)', 0], ['Category correctly selected', 1], ['No duplicate listing exists', 1], ['Business hours provided', 0], ['No prohibited service offered', 1]].map(c => `<label class="flex items-start gap-2.5 py-2 border-b border-[#f0f1f5] last:border-0">
<input type="checkbox" ${c[1] ? 'checked' : ''} class="mt-0.5"><span class="text-[12.5px] font-semibold flex-1">${c[0]}</span>${c[1] ? bd('Passed', 'green') : bd('Needs check', 'amber')}</label>`).join('')}
${gridForm([fld('Reviewer note', ta('Internal note about this verification')), fld('Verification level', sel(['Basic (phone only)', 'Standard (documents)', 'Premium (field visit)']))], 1)}
<div class="flex flex-wrap gap-2 mt-3">${btn('Approve & publish', 'check', 'primary', 'data-toast="Listing approved & published"')}${btn('Approve without verified badge', 'check')}${btn('Schedule field visit', 'cal')}${btn('Reject', 'x', 'outline')}</div></div>`),
    card('Claim & document rules', `<div class="p-4">${frows([
      ['Require NID for ownership claims', 'Claimant must upload national ID matching business documents.', true],
      ['Require trade licence for paid plans', 'Silver, Gold and Platinum listings must submit a licence.', true],
      ['Mandatory phone OTP', 'All listings must verify a business phone number.', true],
      ['Auto-notify existing owner on claim', 'Give the current owner 7 days to dispute a claim.', true],
      ['Field visit for Platinum', 'Physical verification for the highest tier.', true],
      ['Special licence categories', 'Health, education, food and finance require regulator licence.', true]
    ])}<div class="p-4 pt-0">${note('42 categories are marked as regulated. Listings in these categories cannot be published without a valid licence number.', 'blue', 'info')}</div></div>`))
});

AD('service-categories.html', {
  title: 'Service Categories', sub: 'Directory category tree, lead pricing and city-wise availability.', crumb: 'Service categories',
  actions: [['Reorder', 'move'], ['Import', 'up'], ['Add category', 'plus', 'primary', 'data-modal-open="m-scat"']],
  stats: [['Service categories', '386', '', 'layers', 'service', '10 root · 84 level-2'],
    ['Regulated categories', '42', '', 'shield', 'brand', 'Licence required'],
    ['Avg. lead price', tk(45), '', 'money', 'gold', 'Per verified lead'],
    ['Bookable categories', '164', '', 'cal', 'ink', 'Online booking enabled']],
  filters: ['search', ['All levels', 'Root', 'Level 2'], ['All statuses', 'Active', 'Disabled'], ['Booking: All', 'Bookable', 'Lead only'], ['Sort: Tree order', 'Most listings', 'Most leads']],
  head: ['Category', 'Slug', 'Listings', 'Leads (30d)', 'Lead price', 'Booking', 'Licence', 'Cities', 'Status', ['Actions', 'text-right']],
  rows: [
    [`<b class="text-[12.5px] inline-flex items-center gap-2">${svg('layers', 'w-4 h-4 text-service-500')}Home Services</b>`, '<code class="text-[11px]">home-services</code>', '32,480', '18,420', tk(40), bd('Enabled', 'green'), bd('Not required', 'gray'), '64', st('Active'), A([['Edit', 'edit'], ['Add subcategory', 'plus'], ['Lead pricing', 'money'], ['Booking settings', 'cal'], ['Disable', 'ban', 1]])],
    ['<span class="pl-5 text-[12.5px] font-semibold">AC repair & service</span>', '<code class="text-[11px]">…/ac-repair</code>', '4,860', '3,240', tk(55), bd('Enabled', 'green'), bd('Not required', 'gray'), '42', st('Active'), A([['Edit', 'edit'], ['Lead pricing', 'money']])],
    ['<span class="pl-5 text-[12.5px] font-semibold">Electrician</span>', '<code class="text-[11px]">…/electrician</code>', '6,240', '4,180', tk(35), bd('Enabled', 'green'), bd('Not required', 'gray'), '58', st('Active'), A([['Edit', 'edit'], ['Lead pricing', 'money']])],
    [`<b class="text-[12.5px] inline-flex items-center gap-2">${svg('layers', 'w-4 h-4 text-service-500')}Health & Medical</b>`, '<code class="text-[11px]">health</code>', '18,640', '9,860', tk(85), bd('Enabled', 'green'), bd('Required', 'red'), '52', st('Active'), A([['Edit', 'edit'], ['Licence rules', 'shield'], ['Lead pricing', 'money']])],
    [`<b class="text-[12.5px] inline-flex items-center gap-2">${svg('layers', 'w-4 h-4 text-service-500')}Restaurants & Food</b>`, '<code class="text-[11px]">restaurants</code>', '22,840', '12,480', tk(30), bd('Table booking', 'blue'), bd('Food licence', 'amber'), '64', st('Active'), A([['Edit', 'edit'], ['Booking settings', 'cal']])],
    [`<b class="text-[12.5px] inline-flex items-center gap-2">${svg('layers', 'w-4 h-4 text-service-500')}Education & Training</b>`, '<code class="text-[11px]">education</code>', '14,280', '8,240', tk(60), bd('Enquiry only', 'gray'), bd('Required', 'red'), '48', st('Active'), A([['Edit', 'edit'], ['Licence rules', 'shield']])],
    [`<b class="text-[12.5px] inline-flex items-center gap-2">${svg('layers', 'w-4 h-4 text-ink-300')}Money Lending</b>`, '<code class="text-[11px]">money-lending</code>', '0', '0', '—', bd('Disabled', 'gray'), bd('Regulated', 'red'), '0', st('Disabled'), A([['Edit', 'edit'], ['Enable', 'check'], ['Delete', 'trash', 1]])]
  ], total: 386,
  after: row2(card('Lead pricing rules', `<div class="p-4">${gridForm([
    fld('Default lead price', inp(tk(45))), fld('Premium city multiplier', sel(['1.0×', '1.25× (Dhaka)', '1.5×'])),
    fld('Verified lead only', sel(['Charge for verified leads only', 'Charge for all leads'])), fld('Free leads for new providers', inp('First 10 leads')),
    fld('Refund window', sel(['24 hours', '48 hours', '7 days'])), fld('Max refunds per month', inp('5 leads'))
  ])}
<div class="flex gap-2 mt-3">${btn('Save pricing', 'check', 'primary', 'data-toast="Lead pricing saved"')}${btn('Price history', 'db')}</div></div>`),
    card('Most requested services', `<div class="p-4">${hbars([['AC repair & service', 92, '3,240 leads'], ['Electrician', 84, '4,180 leads', '#00b894'], ['Doctors & clinics', 68, '2,860 leads', '#ffb020'], ['Home cleaning', 56, '2,180 leads', '#8b5cf6'], ['Tutors', 48, '1,940 leads', '#6c7a91'], ['Car servicing', 38, '1,480 leads', '#b42318']])}</div>`))
    + modal('m-scat', 'Add / edit service category', gridForm([
      fld('Category name *', inp('e.g. AC repair & service')), fld('Parent category', sel(['None (root)', 'Home Services', 'Health & Medical', 'Restaurants & Food', 'Education', 'Beauty & Spa', 'Automotive', 'Events'])),
      fld('URL slug *', inp('e.g. home-services/ac-repair')), fld('Icon', inp('Choose icon')),
      fld('Lead price (BDT)', inp('e.g. 55')), fld('Lead type', sel(['Phone + form leads', 'Form leads only', 'Booking only'])),
      fld('Booking mode', sel(['Instant booking', 'Request & confirm', 'Enquiry only', 'Table reservation'])), fld('Licence requirement', sel(['Not required', 'Trade licence', 'Regulator licence (BMDC, BSTI…)', 'Food licence'])),
      fld('Available in cities', inp('All cities / select…'), 'sm:col-span-2'),
      fld('Description', ta('Shown on the category landing page'), 'sm:col-span-2'),
      fld('SEO title', inp('')), fld('SEO description', inp('')),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Show in mega menu', true)}${chk('Show on homepage', true)}${chk('Allow online payment', true)}${chk('Emergency / 24×7 tag', false)}${chk('Requires field verification', false)}</div>`
    ]) + modalFoot('Save category', 'Category saved'))
});
