/* Vendor: staff, documents, subscription, promotions, ads, academy, notifications, settings */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, svg, ph, stars, tk, prow, hbars, lineChart, barChart, donut, mini, tiles, kv, note, fld, inp, sel, ta, sw, chk, gridForm, frows, formCard, people, timeline, bars, modal, modalFoot, tfoot, empty } = K;
const { V, btn, A, row2, row3, side } = R;

/* ----------------------------- STAFF ---------------------------------- */
const PERMS = ['Dashboard', 'Products', 'Inventory', 'Orders', 'Returns', 'Shipping', 'Services', 'Leads', 'Bookings', 'Customers', 'Reviews & Q&A', 'Messages', 'Promotions', 'Ads', 'Payouts & finance', 'Reports', 'Staff', 'Settings'];
V('staff.html', {
  title: 'Staff & Permissions', sub: 'Invite team members and control exactly what each person can access.', crumb: 'Staff',
  actions: [['Activity log', 'db'], ['Roles', 'lock'], ['Invite staff', 'plus', 'primary', 'data-modal-open="m-staff"']],
  stats: [['Team members', '7', '', 'users', 'brand', '5 active · 1 invited · 1 disabled'],
    ['Roles configured', '4', '', 'lock', 'service', 'Manager, Packer, Technician, Support'],
    ['Actions logged today', '184', '', 'db', 'gold', 'All staff activity tracked'],
    ['Seats available', '3', '', 'key', 'ink', 'Business plan: 10 seats']],
  head: ['Member', 'Role', 'Access scope', 'Last active', 'Added on', '2FA', 'Status', ['Actions', 'text-right']],
  tableTitle: 'Team members',
  filters: ['search', ['All roles', 'Owner', 'Manager', 'Order packer', 'Technician', 'Support agent'], ['All statuses', 'Active', 'Invited', 'Disabled'], ['Sort: Name', 'Last active', 'Role']],
  rows: [
    [prow(0, 'Rahim Uddin (You)', 'rahim@rahimelectric.com.bd', 'user'), '<span class="badge badge-red">Owner</span>', 'Full access to everything', 'Online now', '12 Mar 2023', '<span class="badge badge-green">On</span>', st('Active'), A([['Edit profile', 'edit'], ['Change password', 'lock'], ['Transfer ownership', 'refresh']])],
    [prow(1, 'Jamal Uddin', 'jamal@rahimelectric.com.bd', 'user'), '<span class="badge badge-blue">Manager</span>', 'Products, orders, inventory, customers', '10 min ago', '04 Jan 2024', '<span class="badge badge-green">On</span>', st('Active'), A([['Edit permissions', 'key'], ['View activity', 'db'], ['Reset password', 'lock'], ['Disable access', 'ban', 1], ['Remove', 'trash', 1]])],
    [prow(2, 'Sumon Islam', 'sumon@rahimelectric.com.bd', 'user'), '<span class="badge badge-green">Technician</span>', 'Bookings, leads (own jobs only)', '2 hours ago', '18 Feb 2024', '<span class="badge badge-gray">Off</span>', st('Active'), A([['Edit permissions', 'key'], ['View activity', 'db'], ['Disable access', 'ban', 1]])],
    [prow(3, 'Rakib Hasan', 'rakib@rahimelectric.com.bd', 'user'), '<span class="badge badge-green">Technician</span>', 'Bookings (own jobs only)', 'Yesterday', '22 Jun 2024', '<span class="badge badge-gray">Off</span>', st('Active'), A([['Edit permissions', 'key'], ['Disable access', 'ban', 1]])],
    [prow(4, 'Farhana Akter', 'farhana@rahimelectric.com.bd', 'user'), '<span class="badge badge-amber">Order packer</span>', 'Orders, shipping labels only', '4 hours ago', '09 Nov 2025', '<span class="badge badge-gray">Off</span>', st('Active'), A([['Edit permissions', 'key'], ['Disable access', 'ban', 1]])],
    [prow(5, 'Nabila Karim', 'nabila@rahimelectric.com.bd', 'user'), '<span class="badge badge-purple">Support agent</span>', 'Messages, reviews, Q&A, returns', 'Invite sent 2 days ago', '15 Aug 2026', '—', st('Pending'), A([['Resend invite', 'send'], ['Copy invite link', 'copy'], ['Cancel invite', 'x', 1]])],
    [prow(6, 'Former Employee', 'old@rahimelectric.com.bd', 'user'), '<span class="badge badge-gray">Manager</span>', 'Revoked', '3 months ago', '10 Jan 2025', '—', st('Suspended'), A([['View activity', 'db'], ['Re-enable', 'refresh'], ['Delete permanently', 'trash', 1]])]
  ], total: 7,
  after: row2(card('Roles & permission matrix', `<div class="table-wrap"><table class="dt"><thead><tr><th>Permission</th><th class="text-center">Owner</th><th class="text-center">Manager</th><th class="text-center">Packer</th><th class="text-center">Technician</th><th class="text-center">Support</th></tr></thead><tbody>
${PERMS.map((p, i) => `<tr><td class="font-semibold">${p}</td>
${[1, i < 16 ? 1 : 0, [3, 4, 5].includes(i) ? 1 : 0, [0, 6, 7, 8].includes(i) ? 1 : 0, [0, 4, 10, 11].includes(i) ? 1 : 0].map(v => `<td class="text-center">${v ? svg('check', 'w-4 h-4 text-service-600 mx-auto') : svg('x', 'w-4 h-4 text-ink-300 mx-auto')}</td>`).join('')}</tr>`).join('')}
</tbody></table></div><div class="p-4 flex gap-2">${btn('Create custom role', 'plus', 'primary')}${btn('Edit roles', 'edit')}</div>`),
    card('Recent staff activity', timeline([
      ['Jamal Uddin updated stock for "Realme C100X" (48 → 36)', '10 min ago', 'edit', 'brand'],
      ['Farhana Akter printed 8 shipping labels', '1 hour ago', 'print', 'service'],
      ['Sumon Islam marked booking BK-40218 completed', '2 hours ago', 'check', 'gold'],
      ['Jamal Uddin replied to 4 customer messages', '3 hours ago', 'msg', 'ink'],
      ['Nabila Karim invited as Support agent', '2 days ago', 'plus', 'brand'],
      ['Login from new device — Dhaka, Chrome', '2 days ago', 'shield', 'service']
    ]), btn('Full audit log', 'db', 'ghost'))
  ) + card('Security policies', frows([
    ['Require 2FA for all staff', 'Every member must enable two-factor authentication.', false],
    ['IP restriction', 'Allow staff logins only from approved IP addresses.', false],
    ['Auto-logout', 'Sign out inactive staff sessions after 30 minutes.', true],
    ['Restrict finance access', 'Only the owner can view payouts and bank details.', true],
    ['Approval for price changes', 'Manager price edits above 10% need owner approval.', true],
    ['Download restrictions', 'Block customer data exports for non-owners.', true]
  ]))
    + modal('m-staff', 'Invite a team member', gridForm([
      fld('Full name *', inp('e.g. Nabila Karim')), fld('Email address *', inp('name@example.com')),
      fld('Mobile number', inp('+880 1XXXXXXXXX')), fld('Role *', sel(['Manager', 'Order packer', 'Technician', 'Support agent', 'Accountant', 'Custom role'])),
      fld('Permissions', `<div class="grid sm:grid-cols-3 gap-2 p-3 rounded-xl border border-[#e7e9ef] max-h-[190px] overflow-auto">${PERMS.map((p, i) => chk(p, i < 6)).join('')}</div>`, 'sm:col-span-2'),
      fld('Access scope', sel(['All data', 'Own records only', 'Assigned area only'])), fld('Expires on', inp('', '', 'date')),
      fld('Welcome note', ta('Optional message included in the invitation email'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Require 2FA setup', true)}${chk('Send login credentials by SMS', true)}${chk('Notify me when they first log in', true)}</div>`
    ]) + modalFoot('Send invitation', 'Invitation sent'))
});

/* --------------------------- DOCUMENTS / KYC --------------------------- */
V('documents.html', {
  title: 'Verification & KYC', sub: 'Upload and manage the documents that keep your seller account verified.', crumb: 'Verification',
  actions: [['Verification guide', 'book'], ['Contact support', 'msg'], ['Upload document', 'up', 'primary', 'data-modal-open="m-doc"']],
  stats: [['Verification level', 'Level 3', '', 'shield', 'service', 'Verified Pro seller'],
    ['Documents approved', '6 of 7', '', 'check', 'brand', '1 pending review'],
    ['Trust score', '94 / 100', '+3', 'award', 'gold', 'Top 8% of sellers'],
    ['Next renewal', '12 Jan 2027', '', 'cal', 'ink', 'Trade licence expiry']],
  top: card('Verification progress', `<div class="p-5"><div class="flex flex-wrap items-center gap-4 mb-4">
<div class="w-[80px] h-[80px] shrink-0" data-ring="86" data-ring-color="#00b894"></div>
<div class="min-w-0"><div class="flex items-center gap-2"><p class="text-[15px] font-extrabold">Verified Pro Seller</p><span class="badge badge-green">${svg('shield', 'w-3 h-3')}Level 3</span></div>
<p class="text-[12.5px] text-ink-500 mt-1">Your account is fully verified for product sales and services. Complete the last document to unlock Level 4 (higher payout limits and priority support).</p></div>
<div class="ml-auto flex gap-2">${btn('What is Level 4?', 'info')}${btn('Upload missing doc', 'up', 'primary')}</div></div>
<div class="grid sm:grid-cols-4 gap-2.5">${[['Level 1', 'Phone & email', 1], ['Level 2', 'NID & bank', 1], ['Level 3', 'Trade licence', 1], ['Level 4', 'BIN + audited accounts', 0]].map(l => `<div class="p-3 rounded-xl border ${l[2] ? 'border-service-200 bg-service-50' : 'border-dashed border-[#d8dbe4]'} text-center">
${svg(l[2] ? 'check' : 'lock', `w-5 h-5 mx-auto mb-1.5 ${l[2] ? 'text-service-600' : 'text-ink-300'}`)}
<p class="text-[12.5px] font-extrabold">${l[0]}</p><p class="text-[11.5px] text-ink-400">${l[1]}</p></div>`).join('')}</div></div>`),
  head: ['Document', 'Type', 'Document no.', 'Uploaded', 'Expiry', 'Reviewed by', 'Status', ['Actions', 'text-right']],
  tableTitle: 'My documents',
  rows: [
    ['<b>National ID (NID)</b><p class="text-[11px] text-ink-400">Owner: Rahim Uddin</p>', 'Identity', '19•• ••• •••4821', '12 Mar 2023', 'Lifetime', 'HaatBazar KYC team', st('Verified'), A([['View document', 'eye'], ['Download', 'dl'], ['Replace', 'up']])],
    ['<b>Trade licence</b>', 'Business', 'TRAD/DNCC/2015/48210', '12 Mar 2023', '12 Jan 2027', 'HaatBazar KYC team', st('Verified'), A([['View document', 'eye'], ['Renew', 'refresh'], ['Replace', 'up']])],
    ['<b>TIN certificate</b>', 'Tax', 'TIN-482910334821', '12 Mar 2023', 'Lifetime', 'HaatBazar KYC team', st('Verified'), A([['View document', 'eye'], ['Download', 'dl']])],
    ['<b>Bank account proof</b><p class="text-[11px] text-ink-400">BRAC Bank cheque copy</p>', 'Financial', '•••• ••••4821', '14 Mar 2023', '—', 'Finance team', st('Verified'), A([['View document', 'eye'], ['Update bank', 'bank']])],
    ['<b>Business address proof</b><p class="text-[11px] text-ink-400">Utility bill — Banani</p>', 'Address', 'DESCO 4821904', '20 Jun 2026', '—', 'HaatBazar KYC team', st('Verified'), A([['View document', 'eye'], ['Replace', 'up']])],
    ['<b>Authorised dealer certificate</b><p class="text-[11px] text-ink-400">Gree Bangladesh</p>', 'Brand authorisation', 'GREE/AD/2024/1182', '02 Aug 2026', '31 Dec 2026', 'Catalog team', st('Verified'), A([['View document', 'eye'], ['Replace', 'up']])],
    ['<b>VAT / BIN certificate</b>', 'Tax', '004821904-0201', '16 Aug 2026', '—', 'Under review', st('Under review'), A([['View document', 'eye'], ['Replace file', 'up'], ['Withdraw', 'x', 1]])]
  ], total: 7,
  after: row2(card('Upload requirements', `<div class="p-4 space-y-2.5 text-[12.5px] text-ink-600">
${[['Files must be clear, colour scans or photos — no screenshots.', 'camera'], ['Accepted formats: JPG, PNG, PDF · max 5 MB per file.', 'file'], ['All four corners of the document must be visible.', 'crop'], ['Name on documents must match your bank account name.', 'user'], ['Expired documents are auto-flagged 30 days before expiry.', 'clock'], ['Review usually completes within 24–48 working hours.', 'clock']].map(r => `<p class="flex gap-2">${svg(r[1], 'w-4 h-4 text-ink-400 shrink-0 mt-0.5')}${r[0]}</p>`).join('')}
${note('Never share your KYC documents with anyone claiming to be HaatBazar staff over phone or WhatsApp.', 'brand', 'shield')}</div>`),
    card('Verification history', timeline([
      ['VAT / BIN certificate submitted — under review', '16 Aug 2026', 'up', 'gold'],
      ['Authorised dealer certificate approved', '03 Aug 2026', 'check', 'service'],
      ['Address proof re-verified after office move', '20 Jun 2026', 'pin', 'brand'],
      ['Upgraded to Verified Pro (Level 3)', '18 Apr 2024', 'shield', 'service'],
      ['Bank account verified — BRAC Bank', '14 Mar 2023', 'bank', 'ink'],
      ['Account created & phone verified', '12 Mar 2023', 'user', 'ink']
    ]))
  ) + modal('m-doc', 'Upload document', gridForm([
    fld('Document type *', sel(['National ID (NID)', 'Passport', 'Trade licence', 'TIN certificate', 'VAT / BIN certificate', 'Bank statement / cheque copy', 'Address proof', 'Brand authorisation letter', 'Company registration (RJSC)', 'Other'])),
    fld('Document number', inp('As printed on the document')),
    fld('Issue date', inp('', '', 'date')), fld('Expiry date', inp('', '', 'date')),
    fld('Upload file *', `<button class="dz w-full">${svg('up', 'w-6 h-6 mx-auto mb-1.5')}<b class="block text-[13px] text-ink-800">Click to upload or drag & drop</b>JPG, PNG or PDF · max 5 MB</button>`, 'sm:col-span-2'),
    fld('Back side (if any)', `<button class="dz w-full">${svg('up', 'w-5 h-5 mx-auto mb-1')}<span class="text-[12px]">Upload back side</span></button>`, 'sm:col-span-2'),
    fld('Notes for reviewer', ta('Anything the KYC team should know'), 'sm:col-span-2'),
    `<div class="sm:col-span-2">${chk('I confirm these documents are genuine and belong to my business', true)}</div>`
  ]) + modalFoot('Submit for review', 'Document submitted for review'))
});

/* --------------------------- SUBSCRIPTION ----------------------------- */
const planCard = (name, price, per, feats, cur, badge) => `<div class="p-4 rounded-2xl border-2 ${cur ? 'border-brand-500 bg-brand-50/30' : 'border-[#e7e9ef]'} relative">
${badge ? `<span class="badge badge-solid absolute -top-2.5 left-4">${badge}</span>` : ''}
<p class="text-[14px] font-extrabold">${name}</p><div class="flex items-end gap-1 mt-1.5 mb-3"><span class="text-[26px] font-extrabold leading-none">${price}</span><span class="text-[12px] text-ink-400 mb-0.5">${per}</span></div>
<div class="space-y-1.5 mb-3.5">${feats.map(f => `<p class="flex gap-2 text-[12.5px] text-ink-600">${svg(f[1] === 0 ? 'x' : 'check', `w-4 h-4 shrink-0 mt-0.5 ${f[1] === 0 ? 'text-ink-300' : 'text-service-600'}`)}${f[0]}</p>`).join('')}</div>
${cur ? `<button class="btn btn-sm btn-outline btn-block" disabled>Current plan</button>` : `<button class="btn btn-sm btn-primary btn-block">Upgrade to ${name}</button>`}</div>`;

V('subscription.html', {
  title: 'Plan & Billing', sub: 'Your seller plan, commission rate, invoices and add-ons.', crumb: 'Plan & billing',
  actions: [['Billing history', 'receipt'], ['Compare plans', 'layers'], ['Upgrade plan', 'award', 'primary']],
  stats: [['Current plan', 'Business', '', 'award', 'brand', 'Renews 01 Sep 2026'],
    ['Commission rate', '8%', '-2%', 'percent', 'service', 'Reduced by plan'],
    ['Monthly fee', tk(2500), '', 'money', 'gold', 'Billed monthly'],
    ['Add-ons active', '3', '', 'plus', 'ink', 'Ads credit, extra seats, API']],
  top: `<div class="grid lg:grid-cols-4 gap-4 mb-4">
${planCard('Starter', 'Free', '/month', [['Up to 20 products', 1], ['10% commission', 1], ['3 service listings', 1], ['Basic analytics', 1], ['2 staff seats', 1], ['Priority support', 0], ['Featured placement', 0], ['API access', 0]], false)}
${planCard('Growth', tk(900), '/month', [['Up to 200 products', 1], ['9% commission', 1], ['10 service listings', 1], ['Full analytics', 1], ['5 staff seats', 1], ['Email support', 1], ['Featured placement', 0], ['API access', 0]], false)}
${planCard('Business', tk(2500), '/month', [['Unlimited products', 1], ['8% commission', 1], ['Unlimited services', 1], ['Advanced analytics + exports', 1], ['10 staff seats', 1], ['Priority chat support', 1], ['2 featured slots / month', 1], ['API access', 1]], true, 'Current')}
${planCard('Enterprise', tk(7500), '/month', [['Unlimited everything', 1], ['6% commission', 1], ['Dedicated account manager', 1], ['Custom reports & BI export', 1], ['Unlimited seats', 1], ['24/7 phone support', 1], ['Homepage banner slots', 1], ['Full API + webhooks', 1]], false, 'Best value')}
</div>`,
  head: ['Invoice', 'Plan / item', 'Billing period', 'Amount', 'VAT', 'Total', 'Method', 'Status', ['', 'text-right']],
  tableTitle: 'Billing history',
  rows: [
    ['<b>SUB-2026-0824</b>', 'Business plan — monthly', '01–31 Aug 2026', tk(2381), tk(119), `<b>${tk(2500)}</b>`, 'Auto-debit · balance', st('Paid'), A([['Download invoice', 'dl'], ['Email', 'mail']])],
    ['<b>SUB-2026-0812</b>', 'Ads credit top-up', '12 Aug 2026', tk(4762), tk(238), `<b>${tk(5000)}</b>`, 'bKash ••5678', st('Paid'), A([['Download invoice', 'dl']])],
    ['<b>SUB-2026-0805</b>', 'Extra staff seats (×3)', 'Aug 2026', tk(857), tk(43), `<b>${tk(900)}</b>`, 'Auto-debit · balance', st('Paid'), A([['Download invoice', 'dl']])],
    ['<b>SUB-2026-0724</b>', 'Business plan — monthly', '01–31 Jul 2026', tk(2381), tk(119), `<b>${tk(2500)}</b>`, 'Auto-debit · balance', st('Paid'), A([['Download invoice', 'dl']])],
    ['<b>SUB-2026-0901</b>', 'Business plan — monthly', '01–30 Sep 2026', tk(2381), tk(119), `<b>${tk(2500)}</b>`, 'Auto-debit · balance', st('Scheduled'), A([['Change plan', 'refresh'], ['Cancel renewal', 'x', 1]])]
  ], total: 42,
  after: row2(card('Add-ons & extras', `<div class="p-4 space-y-2.5">
${[['Ads & boost credit', 'Prepaid balance for promotions', '৳3,500 remaining', 1], ['Extra staff seats', '3 additional seats beyond plan limit', '৳300 / seat / month', 1], ['API & webhooks access', 'Sync your own ERP or POS', 'Included in Business', 1], ['Dedicated account manager', 'Personal growth consultant', '৳3,000 / month', 0], ['Priority listing badge', 'Highlighted in category pages', '৳1,200 / month', 0], ['Advanced fraud protection', 'Auto-screen risky COD orders', '৳800 / month', 0]].map(r => `<div class="flex items-center gap-3 p-3 rounded-xl border ${r[3] ? 'border-service-200 bg-service-50/40' : 'border-[#e7e9ef]'}">
<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold">${r[0]}</p><p class="text-[11.5px] text-ink-400">${r[1]}</p></div>
<span class="text-[11.5px] font-bold text-ink-500 shrink-0">${r[2]}</span>
<button class="btn btn-xs ${r[3] ? 'btn-outline' : 'btn-primary'} shrink-0">${r[3] ? 'Manage' : 'Add'}</button></div>`).join('')}</div>`),
    card('Payment method & billing info', `<div class="p-5">${gridForm([
      fld('Billing method', sel(['Deduct from seller balance', 'bKash ••5678', 'Card ••4242', 'Bank transfer'])),
      fld('Billing cycle', sel(['Monthly', 'Quarterly (save 5%)', 'Yearly (save 15%)'])),
      fld('Billing name', inp('', 'Rahim Electric & Home Services')), fld('Billing email', inp('', 'accounts@rahimelectric.com.bd')),
      fld('BIN for invoice', inp('', '004821904-0201')), fld('Billing address', inp('', 'House 42, Road 11, Banani, Dhaka'))
    ])}<div class="flex flex-wrap gap-4 mt-3.5">${chk('Auto-renew my plan', true)}${chk('Email invoice every cycle', true)}${chk('Warn me 3 days before renewal', true)}</div>
<div class="flex flex-wrap gap-2 mt-3.5">${btn('Save billing info', 'check', 'primary', 'data-toast="Billing info saved"')}${btn('Downgrade plan', 'down')}${btn('Cancel subscription', 'x', 'ghost')}</div>
${note('If you cancel, your account moves to the free Starter plan at the end of the current billing period. Products above the free limit will be paused, not deleted.', 'gold', 'warn')}</div>`))
});
