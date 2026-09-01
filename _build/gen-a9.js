/* Admin people: customers, vendors, vendor-approvals, kyc, staff, roles */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, hbars, donut, lineChart, modal, modalFoot } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('customers.html', {
  title: 'Customers', sub: 'All registered buyers with orders, wallet, loyalty tier and risk signals.', crumb: 'Customers',
  actions: [['Segments', 'users'], ['Export', 'dl'], ['Add customer', 'plus', 'primary']],
  stats: [['Total customers', '12,48,620', '+8%', 'users', 'brand', '48,620 new this month'],
    ['Active (30d)', '4,86,200', '+11%', 'bolt', 'service', '38.9% of base'],
    ['Repeat buyers', '2,84,000', '+14%', 'refresh', 'gold', '62% repeat rate'],
    ['Avg. lifetime value', tk(18400), '+6%', 'money', 'ink', '4.2 orders each']],
  tabs: [['All', '12,48,620'], ['Active', '4,86,200'], ['New (30d)', '48,620'], ['Repeat', '2,84,000'], ['VIP / Gold', '18,420'], ['Inactive 90d', '3,86,400'], ['Flagged / risky', '842'], ['Blocked', '184']],
  filters: ['search', ['Tier: All', 'Bronze', 'Silver', 'Gold', 'Platinum VIP'], ['All cities', 'Dhaka', 'Chittagong', 'Sylhet', 'Khulna'], ['Orders: All', 'No orders', '1–5', '6–20', '20+'], ['Spend: All', 'Above ' + tk(100000), tk(10000) + '–' + tk(100000)], ['Source: All', 'Web', 'Android', 'iOS', 'Referral'], 'date'],
  bulk: ['Send email', 'Send SMS', 'Add to segment', 'Issue voucher', 'Block', 'Export'],
  head: ['Customer', 'Contact', 'Location', 'Orders', 'Bookings', 'Total spend', 'Wallet', 'Points', 'Tier', 'Return rate', 'Last active', 'Status', ['Actions', 'text-right']],
  rows: [
    [prow(0, 'Nusrat Jahan', 'ID #CUS-48219 · Joined 04 Mar 2024'), 'nusrat@mail.com<p class="text-[11px] text-ink-400">01711-234567 ✓</p>', 'Gulshan, Dhaka', '<b>42</b>', '8', '<b>' + tk(486000) + '</b>', tk(1200), '18,400', bd('Platinum VIP', 'amber'), '2.4%', '12 min ago', st('Active'), A([['View profile', 'eye'], ['Order history', 'bag'], ['Wallet ledger', 'wallet'], ['Login as customer', 'key'], ['Issue voucher', 'gift'], ['Send message', 'msg'], ['Reset password', 'lock'], ['Block account', 'ban', 1]])],
    [prow(1, 'Rakib Hasan', 'ID #CUS-48180 · Joined 18 Jan 2025'), 'rakib@mail.com<p class="text-[11px] text-ink-400">01811-345678 ✓</p>', 'Agrabad, Chittagong', '18', '2', tk(184000), tk(0), '12,600', bd('Gold', 'amber'), '4.1%', '2 hrs ago', st('Active'), A([['View profile', 'eye'], ['Order history', 'bag'], ['Send message', 'msg']])],
    [prow(2, 'Farhana Akter', 'ID #CUS-48102 · Joined 22 Sep 2025'), 'farhana@mail.com', 'Dhanmondi, Dhaka', '9', '14', tk(96000), tk(4925), '6,200', bd('Silver', 'gray'), '1.2%', '1 day ago', st('Active'), A([['View profile', 'eye'], ['Booking history', 'cal'], ['Wallet ledger', 'wallet']])],
    [prow(3, 'Imran Khan', 'ID #CUS-47960 · Joined 02 Feb 2026'), 'imran@mail.com<p class="text-[11px] text-brand-600">Phone unverified</p>', 'Uttara, Dhaka', '2', '0', tk(8400), tk(0), '400', bd('Bronze', 'gray'), '<b class="text-brand-600">50%</b>', '3 days ago', st('Flagged'), A([['View profile', 'eye'], ['Risk report', 'shield'], ['Restrict COD', 'ban'], ['Block account', 'ban', 1]])],
    [prow(4, 'Sadia Islam', 'ID #CUS-47842 · Joined 11 Jul 2024'), 'sadia@mail.com', 'Mirpur, Dhaka', '24', '4', tk(242000), tk(11290), '9,800', bd('Gold', 'amber'), '6.2%', '5 hrs ago', st('Active'), A([['View profile', 'eye'], ['Open disputes (1)', 'flag'], ['Send message', 'msg']])],
    [prow(5, 'Fake Buyer 01', 'ID #CUS-47101 · 12 failed COD orders'), 'temp@mail.com<p class="text-[11px] text-brand-600">Disposable email</p>', 'Unknown', '12', '0', tk(0), tk(0), '0', bd('Blocked', 'red'), '<b class="text-brand-600">100%</b>', '18 days ago', st('Blocked'), A([['View profile', 'eye'], ['Fraud report', 'shield'], ['Unblock', 'unlock'], ['Delete account', 'trash', 1]])]
  ], total: 1248620,
  after: row3(card('Customer growth', `<div class="p-4">${lineChart([24, 28, 26, 32, 36, 34, 42, 40, 46, 52, 48, 56, 62, 68], ['Mar', 'May', 'Jul', 'Aug'])}
${kv([['New customers (30d)', '48,620'], ['Activation rate (1st order)', '42.6%'], ['Churn rate (90d)', '18.2%'], ['Referral signups', '8,420']])}</div>`),
    card('Segments', table([['Segment'], ['Size'], ['', 'text-right']], [
      ['<b>VIP — spend above ' + tk(100000) + '</b>', '18,420', A([['View', 'eye'], ['Campaign', 'megaphone']])],
      ['<b>At risk — no order in 90 days</b>', '3,86,400', A([['View', 'eye'], ['Win-back campaign', 'megaphone']])],
      ['<b>Cart abandoners</b>', '48,620', A([['View', 'eye'], ['Campaign', 'megaphone']])],
      ['<b>Service-only users</b>', '2,84,000', A([['View', 'eye'], ['Cross-sell', 'megaphone']])],
      ['<b>New signups (no order)</b>', '1,86,000', A([['View', 'eye'], ['Welcome offer', 'gift']])],
      ['<b>High return rate (&gt;20%)</b>', '842', A([['View', 'eye'], ['Restrict COD', 'ban']])]
    ]), btn('Create segment', 'plus', 'outline')),
    card('Risk & fraud signals', `<div class="p-4">${kv([['Multiple accounts, same device', '482'], ['High COD refusal rate', '184'], ['Disposable email domains', '286'], ['Unusual return pattern', '842'], ['Chargeback history', '48'], ['Blacklisted phone numbers', '124']])}
<div class="flex flex-wrap gap-2 mt-3">${btn('Fraud rules', 'shield')}${btn('Blacklist manager', 'ban')}${btn('Review queue', 'eye')}</div></div>`))
});

AD('vendors.html', {
  title: 'Vendors', sub: 'All product sellers and service providers with performance, plan and compliance data.', crumb: 'Vendors',
  actions: [['Vendor rules', 'cog'], ['Export', 'dl'], ['Add vendor', 'plus', 'primary']],
  stats: [['Total vendors', '8,642', '+6%', 'store', 'brand', '6,462 sellers · 2,180 providers'],
    ['Active this month', '6,842', '+9%', 'bolt', 'service', '79.2% activity'],
    ['Paid plans', '4,860', '+12%', 'award', 'gold', tk(4820000) + ' MRR'],
    ['At risk / low rated', '184', '', 'warn', 'ink', 'Below 3.5 ★ or high disputes']],
  tabs: [['All', '8,642'], ['Product sellers', '6,462'], ['Service providers', '2,180'], ['Both', '284'], ['Pending approval', '142'], ['Suspended', '86'], ['At risk', '184'], ['Top performers', '482']],
  filters: ['search', ['Type: All', 'Product seller', 'Service provider', 'Both'], ['Plan: All', 'Free', 'Silver', 'Gold', 'Platinum', 'Enterprise'], ['All cities', 'Dhaka', 'Chittagong', 'Sylhet'], ['Rating: All', '4.5+', '4.0–4.5', 'Below 3.5'], ['KYC: All', 'Verified', 'Pending', 'Rejected'], ['Status: All', 'Active', 'Suspended', 'Closed'], ['Sort: Newest', 'Highest GMV', 'Best rated', 'Most disputes']],
  bulk: ['Verify', 'Change plan', 'Send notice', 'Suspend', 'Export'],
  head: ['Vendor', 'Type', 'Plan', 'Location', 'Products / Listings', 'Orders / Leads', 'GMV (30d)', 'Commission', 'Rating', 'Disputes', 'KYC', 'Joined', 'Status', ['Actions', 'text-right']],
  rows: [
    [prow(0, 'Rahim Electric & Electronics', 'ID #VND-1042 · Nawabpur, Dhaka'), bd('Seller', 'blue'), bd('Platinum', 'amber'), 'Dhaka', '248', '2,842', '<b>' + tk(2280000) + '</b>', tk(182400), '4.8 ★ (3,842)', bd('0.8%', 'green'), bd('Verified', 'green'), '12 Mar 2024', st('Active'), A([['View vendor', 'eye'], ['Open shop page', 'globe'], ['Login as vendor', 'key'], ['Products', 'box'], ['Payouts', 'bank'], ['Commission override', 'percent'], ['Change plan', 'award'], ['Send notice', 'warn'], ['Suspend', 'ban', 1]])],
    [prow(1, 'Gadget World BD', 'ID #VND-1088 · Elephant Road, Dhaka'), bd('Seller', 'blue'), bd('Gold', 'amber'), 'Dhaka', '486', '1,842', tk(1840000), tk(147200), '4.6 ★ (2,148)', bd('1.4%', 'green'), bd('Verified', 'green'), '08 Jul 2024', st('Active'), A([['View vendor', 'eye'], ['Products', 'box'], ['Payouts', 'bank'], ['Change plan', 'award']])],
    [prow(2, 'Dhaka AC Service & Repair', 'ID #VND-2140 · Mirpur, Dhaka'), bd('Provider', 'amber'), bd('Gold', 'amber'), 'Dhaka', '6 listings', '412 leads', tk(486000), tk(48600), '4.8 ★ (642)', bd('0.4%', 'green'), bd('Verified', 'green'), '18 Jan 2026', st('Active'), A([['View vendor', 'eye'], ['Listings', 'briefcase'], ['Leads', 'users'], ['Bookings', 'cal']])],
    [prow(3, 'Mobile Zone', 'ID #VND-1284 · Bashundhara City'), bd('Seller', 'blue'), bd('Silver', 'gray'), 'Dhaka', '142', '486', tk(342000), tk(34200), '<b class="text-brand-600">3.2 ★</b> (486)', bd('8.4%', 'red'), bd('Under review', 'amber'), '22 Feb 2025', st('At risk'), A([['View vendor', 'eye'], ['Disputes (4)', 'flag'], ['Performance notice', 'warn'], ['Hold payouts', 'lock'], ['Suspend', 'ban', 1]])],
    [prow(4, 'Style Hub', 'ID #VND-1142 · New Market, Dhaka'), bd('Seller', 'blue'), bd('Gold', 'amber'), 'Dhaka', '842', '1,240', tk(684000), tk(82080), '4.7 ★ (1,842)', bd('2.1%', 'amber'), bd('Verified', 'green'), '04 Nov 2024', st('Active'), A([['View vendor', 'eye'], ['Products', 'box'], ['Payouts', 'bank']])],
    [prow(5, 'Quick Deals BD', 'ID #VND-1388 · Suspended 12 Aug'), bd('Seller', 'blue'), bd('Free', 'gray'), 'Chittagong', '48', '0', tk(0), tk(0), '2.8 ★ (142)', bd('6.2%', 'red'), bd('Rejected', 'red'), '30 May 2026', st('Suspended'), A([['View vendor', 'eye'], ['Violation log', 'file'], ['Reinstate', 'refresh'], ['Blacklist', 'ban', 1]])]
  ], total: 8642,
  after: row3(card('Vendor mix & plans', `<div class="p-4 flex items-center gap-4">${donut([['Free', 44, '#c0c4cc'], ['Silver', 27, '#6c7a91'], ['Gold', 20, '#ffb020'], ['Platinum', 8, '#ff2525'], ['Enterprise', 1, '#00b894']], ['56%', 'Paid'])}
<div class="flex-1">${kv([['Product sellers', '6,462'], ['Service providers', '2,180'], ['Selling both', '284'], ['Avg. vendor GMV', tk(97400)], ['Vendors with 0 sales', '842']])}</div></div>`),
    card('Top vendors by GMV', table([['Vendor'], ['GMV (30d)'], ['', 'text-right']], [
      ['<b>Rahim Electric</b>', tk(2280000), A([['View', 'eye']])],
      ['<b>Gadget World BD</b>', tk(1840000), A([['View', 'eye']])],
      ['<b>Walton Plaza</b>', tk(1420000), A([['View', 'eye']])],
      ['<b>Style Hub</b>', tk(684000), A([['View', 'eye']])],
      ['<b>Dhaka AC Service</b>', tk(486000), A([['View', 'eye']])],
      ['<b>Fresh Mart</b>', tk(184000), A([['View', 'eye']])]
    ]), btn('Full leaderboard', 'chart', 'ghost')),
    card('Compliance & health', `<div class="p-4">${kv([['KYC verified', '7,842 (90.7%)'], ['Trade licence on file', '5,842'], ['TIN / BIN submitted', '4,286'], ['Bank account verified', '7,240'], ['Signed seller agreement', '8,642'], ['Vendors with warnings', '284'], ['Repeat policy violators', '48']])}
<div class="flex flex-wrap gap-2 mt-3">${btn('KYC queue', 'shield')}${btn('Send bulk notice', 'bell')}</div></div>`))
});

AD('vendor-approvals.html', {
  title: 'Vendor Approvals', sub: 'Review seller and service-provider applications before they go live.', crumb: 'Vendor approvals',
  actions: [['Approval settings', 'cog'], ['Assign reviewer', 'user'], ['Approve selected', 'check', 'primary']],
  stats: [['Pending applications', '142', '', 'clock', 'brand', 'Avg. wait 6.2 hrs'],
    ['Approved (30d)', '842', '+14%', 'check', 'service', '86% approval rate'],
    ['Rejected (30d)', '124', '', 'x', 'gold', 'Mostly invalid documents'],
    ['Info requested', '68', '', 'msg', 'ink', 'Waiting on applicant']],
  tabs: [['Pending', '142'], ['Under review', '48'], ['Info requested', '68'], ['Approved', '842'], ['Rejected', '124'], ['Blacklisted', '18']],
  filters: ['search', ['Type: All', 'Product seller', 'Service provider'], ['Business: All', 'Individual', 'Sole proprietor', 'Limited company'], ['All cities', 'Dhaka', 'Chittagong', 'Sylhet'], ['Docs: All', 'Complete', 'Incomplete'], ['Reviewer: Anyone', 'Assigned to me', 'Unassigned']],
  head: ['Applicant', 'Type', 'Business type', 'Category', 'Location', 'Documents', 'Bank', 'Plan chosen', 'Applied', 'Reviewer', 'Status', ['Actions', 'text-right']],
  rows: [
    [prow(0, 'Nabila Fashion House', 'Nabila Sultana · nabila@mail.com · 01711-888999'), bd('Seller', 'blue'), 'Sole proprietor', 'Fashion › Women', 'Bashundhara, Dhaka', bd('NID ✓', 'green') + ' ' + bd('Trade licence ✓', 'green') + ' ' + bd('TIN ✓', 'green'), 'DBBL ****1122 ✓', bd('Silver', 'gray'), '2 hrs ago', 'Unassigned', st('Pending'), A([['Review application', 'eye'], ['View documents', 'file'], ['Verify bank', 'bank'], ['Approve', 'check'], ['Request info', 'msg'], ['Reject', 'x', 1]])],
    [prow(1, 'TechnoMart BD Ltd.', 'Arif Rahman · arif@technomart.com'), bd('Seller', 'blue'), 'Limited company', 'Electronics', 'Motijheel, Dhaka', bd('Incorporation ✓', 'green') + ' ' + bd('BIN ✓', 'green') + ' ' + bd('TIN ✓', 'green'), 'City Bank ****8844 ✓', bd('Platinum', 'amber'), '5 hrs ago', 'Nafisa K.', st('Under review'), A([['Review application', 'eye'], ['Verify company', 'shield'], ['Approve', 'check'], ['Reject', 'x', 1]])],
    [prow(2, 'Sundori Beauty Lounge', 'Rina Akter · 01911-777888'), bd('Provider', 'amber'), 'Individual', 'Beauty & Spa', 'Uttara, Dhaka', bd('NID ✓', 'green') + ' ' + bd('Trade licence missing', 'red'), 'bKash 01911-***888', bd('Free', 'gray'), '1 day ago', 'Sabbir A.', st('Info requested'), A([['Review application', 'eye'], ['Send reminder', 'bell'], ['Approve without licence', 'check'], ['Reject', 'x', 1]])],
    [prow(3, 'Cheap Electronics Hub', 'Unknown owner · temp@mail.com'), bd('Seller', 'blue'), 'Individual', 'Electronics', 'Not provided', bd('Blurred NID', 'red') + ' ' + bd('No licence', 'red'), 'Not provided', bd('Free', 'gray'), '2 days ago', 'Nafisa K.', st('Pending'), A([['Review application', 'eye'], ['Request clear documents', 'msg'], ['Reject', 'x', 1], ['Blacklist', 'ban', 1]])],
    [prow(4, 'Ideal Tutors Bangladesh', 'Dr. Sohel Rana · 01611-555444'), bd('Provider', 'amber'), 'Sole proprietor', 'Education › Tutors', 'Dhanmondi, Dhaka', bd('NID ✓', 'green') + ' ' + bd('Certificates ✓', 'green'), 'Brac Bank ****9911 ✓', bd('Gold', 'amber'), '3 days ago', 'Unassigned', st('Pending'), A([['Review application', 'eye'], ['Verify certificates', 'shield'], ['Approve', 'check']])]
  ], total: 142,
  after: row2(card('Application review — Nabila Fashion House', `<div class="p-4">${kv([['Business name', 'Nabila Fashion House'], ['Owner / contact', 'Nabila Sultana'], ['Email / phone', 'nabila@mail.com · 01711-888999 (verified)'], ['Business type', 'Sole proprietorship'], ['Trade licence no.', 'TRAD/DNCC/018842/2025'], ['TIN', '482910384756'], ['Warehouse address', 'Block C, Bashundhara R/A, Dhaka'], ['Product categories', 'Women\'s fashion, Sarees, Kurti'], ['Expected monthly volume', '200–500 orders'], ['Bank account', 'Dutch-Bangla Bank ****1122 (name matched)'], ['Plan chosen', 'Silver — ' + tk(1500) + '/month'], ['Agreement signed', 'Yes · 22 Aug 2026']])}
${gridForm([fld('Commission rate to apply', sel(['Default (12% fashion)', 'New vendor promo (3%, 90 days)', 'Custom'])), fld('Product limit', sel(['200 (Silver)', 'Custom'])), fld('Reviewer note', ta('Internal note')), fld('Onboarding manager', sel(['Auto-assign', 'Nafisa Karim', 'Sabbir Ahmed']))], 1)}
<div class="flex flex-wrap gap-2 mt-3">${btn('Approve & activate', 'check', 'primary', 'data-toast="Vendor approved & activated"')}${btn('Approve with limits', 'check')}${btn('Request more info', 'msg')}${btn('Reject application', 'x', 'outline')}</div></div>`),
    card('Onboarding rules', `<div class="p-4">${frows([['Require NID for all vendors', 'Owner national ID is mandatory.', true],
      ['Require trade licence for companies', 'Limited companies must submit incorporation papers.', true],
      ['Require bank account name match', 'Bank account holder must match the owner or business name.', true],
      ['Auto-approve verified brands', 'Brands with authorised distributor letters skip manual review.', false],
      ['Probation for new vendors', 'Limit to 20 products and hold payouts for 14 days.', true],
      ['Mandatory seller agreement', 'Digital signature required before activation.', true],
      ['Category restrictions', 'Restricted categories require extra approval.', true]])}
<div class="p-4 pt-0">${note('Applications not reviewed within 48 hours are escalated to the operations lead automatically.', 'blue', 'info')}</div></div>`))
});

AD('kyc.html', {
  title: 'KYC Verification', sub: 'Identity, business and bank verification for vendors and high-value customers.', crumb: 'KYC verification',
  actions: [['KYC policy', 'file'], ['Bulk verify', 'check'], ['Request documents', 'msg', 'primary']],
  stats: [['Pending KYC', '184', '', 'idcard', 'brand', '48 above 72 hours'],
    ['Verified vendors', '7,842', '+8%', 'shield', 'service', '90.7% of vendors'],
    ['Rejected', '286', '', 'x', 'gold', 'Fake / mismatched documents'],
    ['Re-verification due', '482', '', 'refresh', 'ink', 'Licence expiring soon']],
  tabs: [['Pending', '184'], ['NID / identity', '86'], ['Business documents', '62'], ['Bank verification', '36'], ['Verified', '7,842'], ['Rejected', '286'], ['Expiring soon', '482']],
  filters: ['search', ['Entity: All', 'Vendor', 'Customer', 'Staff'], ['Document: All', 'NID', 'Passport', 'Driving licence', 'Trade licence', 'TIN', 'BIN', 'Bank statement', 'Cheque book'], ['Status: All', 'Pending', 'Verified', 'Rejected', 'Expired'], ['Age: All', 'Above 72 hours', 'Above 7 days']],
  head: ['Entity', 'Type', 'Document', 'Document no.', 'Name match', 'Face match', 'Expiry', 'Submitted', 'Reviewer', 'Status', ['Actions', 'text-right']],
  rows: [
    [prow(0, 'Nabila Fashion House', 'Vendor #VND-1442'), bd('Vendor', 'blue'), 'National ID (front + back)', '1994823847562', bd('Matched', 'green'), bd('98% match', 'green'), 'No expiry', '2 hrs ago', 'Unassigned', st('Pending'), A([['View documents', 'file'], ['Verify with NID API', 'bolt'], ['Approve', 'check'], ['Request re-upload', 'msg'], ['Reject', 'x', 1]])],
    [prow(1, 'TechnoMart BD Ltd.', 'Vendor #VND-1448'), bd('Vendor', 'blue'), 'Incorporation + BIN + TIN', 'C-184926/2022', bd('Matched', 'green'), '—', '31 Dec 2026', '5 hrs ago', 'Nafisa K.', st('Under review'), A([['View documents', 'file'], ['Verify BIN with NBR', 'bolt'], ['Approve', 'check'], ['Reject', 'x', 1]])],
    [prow(2, 'Sundori Beauty Lounge', 'Vendor #VND-1452'), bd('Vendor', 'blue'), 'Trade licence', 'TRAD/DNCC/0048219', bd('Partial mismatch', 'amber'), '—', '<b class="text-brand-600">30 Jun 2026 (expired)</b>', '1 day ago', 'Sabbir A.', st('Rejected'), A([['View documents', 'file'], ['Request renewed licence', 'msg'], ['Approve with condition', 'check']])],
    [prow(3, 'Rahim Electric', 'Vendor #VND-1042'), bd('Vendor', 'blue'), 'Bank account verification', 'DBBL ****4521', bd('Matched', 'green'), '—', '—', '2 days ago', 'Nafisa K.', st('Verified'), A([['View documents', 'file'], ['Verification report', 'shield']])],
    [prow(4, 'Nusrat Jahan', 'Customer #CUS-48219 · High-value'), bd('Customer', 'gray'), 'NID for wallet withdrawal', '1992384756201', bd('Matched', 'green'), bd('96% match', 'green'), 'No expiry', '3 days ago', 'Unassigned', st('Pending'), A([['View documents', 'file'], ['Approve', 'check'], ['Reject', 'x', 1]])]
  ], total: 184,
  after: row2(card('Verification checks', `<div class="p-4">${frows([['NID API verification (Election Commission)', 'Auto-validate NID number, name and date of birth.', true],
    ['Face match with selfie', 'AI comparison of NID photo and live selfie.', true],
    ['Trade licence validation', 'Check licence number against city corporation records.', true],
    ['BIN / TIN validation (NBR)', 'Verify VAT and tax registration numbers.', true],
    ['Bank account name match', 'Match account title with owner or business name.', true],
    ['Sanctions & blacklist screening', 'Screen against internal and external blacklists.', true],
    ['Annual re-verification', 'Ask vendors to re-confirm documents every 12 months.', true]])}
<div class="p-4 pt-0">${note('4 documents failed the automated face-match check today and need manual review.', 'gold', 'warn')}</div></div>`),
    card('Document viewer', `<div class="p-4"><div class="grid grid-cols-2 gap-3">
${['NID — front', 'NID — back', 'Selfie', 'Trade licence'].map(l => `<div class="rounded-xl border border-[#e7e9ef] overflow-hidden"><div class="ph aspect-[4/3]"></div><p class="text-[11.5px] font-semibold p-2">${l}</p></div>`).join('')}</div>
${gridForm([fld('Extracted name (OCR)', inp('Nabila Sultana')), fld('Extracted NID', inp('1994823847562')), fld('Date of birth', inp('12 Apr 1994')), fld('Address on document', inp('Bashundhara R/A, Dhaka')), fld('Verification level', sel(['Basic', 'Standard', 'Enhanced'])), fld('Decision note', ta('Reason for approval or rejection'))])}
<div class="flex flex-wrap gap-2 mt-3">${btn('Approve KYC', 'check', 'primary', 'data-toast="KYC approved"')}${btn('Request re-upload', 'msg')}${btn('Reject', 'x', 'outline')}${btn('Download all', 'dl')}</div></div>`))
});
