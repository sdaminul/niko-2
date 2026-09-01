/* Admin moderation: reviews, questions, moderation (reports & abuse) */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, stars, hbars, bars, modal, modalFoot } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('reviews.html', {
  title: 'Reviews Moderation', sub: 'Product and service reviews, ratings, photos, replies and fake-review detection.', crumb: 'Reviews',
  actions: [['Moderation rules', 'cog'], ['Export', 'dl'], ['Bulk approve verified', 'check', 'primary', 'data-toast="Verified reviews approved"']],
  stats: [['Pending review', '47', '', 'clock', 'brand', 'SLA 12 hrs'],
    ['Published (30d)', '2,48,600', '+18%', 'star', 'service', 'Avg. 4.6 ★'],
    ['Flagged as suspicious', '842', '', 'shield', 'gold', 'AI confidence > 80%'],
    ['Removed (30d)', '1,242', '', 'ban', 'ink', 'Policy violations']],
  tabs: [['Pending', '47'], ['Published', '2,48,600'], ['Flagged / suspicious', '842'], ['Reported by users', '186'], ['With photos', '48,620'], ['1–2 star', '18,420'], ['Vendor replies pending', '4,862'], ['Removed', '1,242']],
  filters: ['search', ['Type: All', 'Product review', 'Service review', 'Shop review', 'Delivery review'], ['Rating: All', '5 star', '4 star', '3 star', '2 star', '1 star'], ['Verified: All', 'Verified purchase', 'Unverified'], ['Flag: All', 'Suspicious pattern', 'Abusive language', 'Contains contact info', 'Competitor mention', 'Image issue'], 'date'],
  bulk: ['Approve', 'Reject', 'Remove', 'Mark as spam', 'Notify vendor'],
  head: ['Review', 'Rating', 'Item / Vendor', 'Customer', 'Verified', 'Photos', 'Helpful votes', 'Reports', 'AI flag', 'Submitted', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>"Excellent phone at this price"</b><p class="text-[11px] text-ink-400 max-w-[320px]">Battery lasts 2 days, camera is decent. Delivery was fast and packaging was good.</p>', stars(5) + ' 5.0', '<b>Realme C100X</b><p class="text-[11px] text-ink-400">Rahim Electric</p>', prow(0, 'Karim Uddin', '#CUS-84219'), bd('Verified purchase', 'green'), '3 photos', '48', '0', bd('Clean', 'green'), '2 hrs ago', st('Pending'), A([['Approve', 'check'], ['View full review', 'eye'], ['Edit text', 'edit'], ['Reject', 'x'], ['Remove photos', 'image'], ['Ban reviewer', 'ban', 1]])],
    ['<b>"Product not as described"</b><p class="text-[11px] text-ink-400 max-w-[320px]">Received a different colour. Seller is not responding. Call me on 01712xxxxxx.</p>', stars(1) + ' 1.0', '<b>Cotton Saree</b><p class="text-[11px] text-ink-400">Style Hub</p>', prow(1, 'Nusrat Jahan', '#CUS-42180'), bd('Verified purchase', 'green'), '2 photos', '182', '1', bd('Contains phone number', 'amber'), '4 hrs ago', st('Pending'), A([['Mask phone & approve', 'shield'], ['View full review', 'eye'], ['Edit text', 'edit'], ['Open dispute', 'flag'], ['Reject', 'x']])],
    ['<b>"Best service ever!!! Highly recommend"</b><p class="text-[11px] text-ink-400 max-w-[320px]">Amazing amazing amazing service great great.</p>', stars(5) + ' 5.0', '<b>AC Servicing</b><p class="text-[11px] text-ink-400">Dhaka AC Service</p>', prow(2, 'New Account 8842', 'Created 1 hr ago'), bd('Unverified', 'red'), '0', '0', '2', bd('Fake pattern — 92%', 'red'), '1 hr ago', st('Flagged'), A([['View evidence', 'shield'], ['Remove review', 'trash'], ['Investigate vendor', 'store'], ['Ban reviewer', 'ban', 1]])],
    ['<b>"Delivery was late by 5 days"</b>', stars(2) + ' 2.0', '<b>Delivery experience</b><p class="text-[11px] text-ink-400">Pathao Courier</p>', prow(3, 'Sabbir Hossain', '#CUS-18420'), bd('Verified purchase', 'green'), '0', '86', '0', bd('Clean', 'green'), '1 day ago', st('Published'), A([['View review', 'eye'], ['Forward to courier', 'truck'], ['Remove', 'trash', 1]])],
    ['<b>"Technician was professional and on time"</b>', stars(5) + ' 5.0', '<b>Electrical Wiring</b><p class="text-[11px] text-ink-400">Rahim Electric</p>', prow(4, 'Farhana Akter', '#CUS-24816'), bd('Verified booking', 'green'), '1 photo', '124', '0', bd('Clean', 'green'), '2 days ago', st('Published'), A([['View review', 'eye'], ['Feature this review', 'star'], ['Remove', 'trash', 1]])],
    ['<b>"Buy from XYZ shop instead, cheaper"</b>', stars(1) + ' 1.0', '<b>Smart LED TV</b><p class="text-[11px] text-ink-400">Gadget World BD</p>', prow(5, 'Anonymous 4482', '#CUS-99120'), bd('Unverified', 'red'), '0', '4', '8', bd('Competitor promotion', 'red'), '3 days ago', st('Removed'), A([['View reason', 'info'], ['Restore', 'refresh'], ['Ban reviewer', 'ban', 1]])]
  ], total: 47,
  after: row3(card('Rating distribution', `<div class="p-4">${bars([['5 ★', 68, '#00b894'], ['4 ★', 18, '#7bd389'], ['3 ★', 7, '#ffb020'], ['2 ★', 3, '#ff8f4f'], ['1 ★', 4, '#ff2525']])}
${kv([['Platform average', '4.6 ★ (18,42,000 reviews)'], ['Product average', '4.5 ★'], ['Service average', '4.7 ★'], ['Courier average', '4.2 ★'], ['Review rate', '18% of delivered orders'], ['Photo review rate', '24%']])}</div>`),
    card('Fake review detection', `<div class="p-4">${table([['Signal'], ['Detected'], ['', 'text-right']], [
      ['New account + 5 ★ only', '482', A([['Review', 'eye']])],
      ['Same device, many reviews', '186', A([['Review', 'eye']])],
      ['Repeated text pattern', '124', A([['Review', 'eye']])],
      ['Review before delivery', '86', A([['Review', 'eye']])],
      ['Vendor self-review (IP match)', '42', A([['Review', 'eye']])],
      ['Paid-review keywords', '18', A([['Review', 'eye']])]
    ])}
<div class="p-3">${note('842 reviews are flagged by AI. Approving them without checking may damage buyer trust.', 'gold', 'warn')}</div></div>`),
    card('Moderation rules', `<div class="p-4">${gridForm([fld('Auto-publish threshold', sel(['Verified purchase & clean text', 'All 4–5 star reviews', 'Nothing — manual only'])), fld('Minimum review length', inp('10 characters')), fld('Edit window for customer', inp('7 days')), fld('Vendor reply window', inp('14 days'))], 1)}
${frows([['Only verified purchases can review', 'Reviews require a delivered order or completed booking.', true],
  ['Mask phone numbers and emails', 'Hide contact details inside review text.', true],
  ['Block abusive language', 'Filter against the banned-word list.', true],
  ['Allow photo & video reviews', 'Customers can upload up to 5 photos.', true],
  ['Allow vendor replies', 'Vendors may reply publicly once per review.', true],
  ['Notify vendor on 1–2 star reviews', 'Give them a chance to resolve quickly.', true],
  ['Hide reviews of deleted products', 'Keeps rating history clean.', false]])}
<div class="p-4 pt-0 flex flex-wrap gap-2">${btn('Banned word list', 'ban')}${btn('Save rules', 'check', 'primary', 'data-toast="Rules saved"')}</div></div>`))
});

AD('questions.html', {
  title: 'Q&A Moderation', sub: 'Customer questions on products and services, vendor answers and community replies.', crumb: 'Q&A moderation',
  actions: [['Auto-answer rules', 'bolt'], ['Export', 'dl'], ['Answer as Niko', 'msg', 'primary', 'data-modal-open="m-ans"']],
  stats: [['Pending moderation', '18', '', 'clock', 'brand', 'Questions + answers'],
    ['Unanswered questions', '4,862', '', 'question', 'service', 'Older than 48 hrs: 842'],
    ['Answered (30d)', '48,620', '+22%', 'check', 'gold', 'Avg. response 6 hrs'],
    ['Removed (30d)', '486', '', 'ban', 'ink', 'Spam or abuse']],
  tabs: [['Pending', '18'], ['Unanswered', '4,862'], ['Answered', '48,620'], ['Flagged', '124'], ['Service enquiries', '8,420'], ['Removed', '486']],
  filters: ['search', ['Type: All', 'Product question', 'Service question', 'Shop question'], ['Answered by: All', 'Vendor', 'Niko support', 'Other customers', 'Nobody'], ['Age: All', 'Under 24 hrs', '1–3 days', 'Over 3 days'], ['Flag: All', 'Contains contact info', 'Abusive', 'Spam', 'Off-topic']],
  bulk: ['Approve', 'Remove', 'Assign to vendor', 'Answer with template'],
  head: ['Question', 'Item / Vendor', 'Asked by', 'Answers', 'Answered by', 'Waiting time', 'Views', 'Flag', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>"Does this phone support 5G in Bangladesh?"</b>', '<b>Realme C100X</b><p class="text-[11px] text-ink-400">Rahim Electric</p>', prow(0, 'Karim Uddin', '#CUS-84219'), '0', '—', '<b class="text-brand-600">3 days</b>', '482', bd('Clean', 'green'), st('Unanswered'), A([['Answer as Niko', 'msg'], ['Remind vendor', 'bell'], ['Assign to vendor', 'store'], ['Remove', 'trash', 1]])],
    ['<b>"Is installation included in the price?"</b>', '<b>AC Servicing</b><p class="text-[11px] text-ink-400">Dhaka AC Service</p>', prow(1, 'Nusrat Jahan', '#CUS-42180'), '2', 'Vendor + 1 customer', '4 hrs', '1,240', bd('Clean', 'green'), st('Answered'), A([['View thread', 'eye'], ['Feature answer', 'star'], ['Edit answer', 'edit']])],
    ['<b>"Call me at 01712xxxxxx for a better price"</b>', '<b>Smart LED TV</b><p class="text-[11px] text-ink-400">Gadget World BD</p>', prow(2, 'Anonymous 8842', '#CUS-99120'), '0', '—', '1 hr', '18', bd('Contains phone number', 'red'), st('Pending'), A([['Remove', 'trash'], ['Warn user', 'warn'], ['Ban user', 'ban', 1]])],
    ['<b>"What is the warranty period?"</b>', '<b>Walton Refrigerator</b><p class="text-[11px] text-ink-400">Walton Plaza</p>', prow(3, 'Sabbir Hossain', '#CUS-18420'), '1', 'Vendor', '2 hrs', '842', bd('Clean', 'green'), st('Answered'), A([['View thread', 'eye'], ['Add to product FAQ', 'plus']])],
    ['<b>"Do you provide service in Uttara?"</b>', '<b>Plumbing Service</b><p class="text-[11px] text-ink-400">Quick Fix BD</p>', prow(4, 'Farhana Akter', '#CUS-24816'), '1', 'Niko support', '30 min', '284', bd('Clean', 'green'), st('Answered'), A([['View thread', 'eye'], ['Edit answer', 'edit']])],
    ['<b>"This seller is a fraud, do not buy"</b>', '<b>Cotton Saree</b><p class="text-[11px] text-ink-400">Style Hub</p>', prow(5, 'Angry Buyer', '#CUS-77120'), '0', '—', '6 hrs', '482', bd('Abusive / unverified claim', 'red'), st('Flagged'), A([['Review evidence', 'shield'], ['Convert to complaint', 'flag'], ['Remove', 'trash'], ['Contact customer', 'phone']])]
  ], total: 18,
  after: row2(card('Answer templates & canned replies', table([['Template'], ['Used'], ['', 'text-right']], [
    ['<b>Warranty policy answer</b>', '4,862', A([['Edit', 'edit'], ['Use', 'msg']])],
    ['<b>Delivery time by city</b>', '2,480', A([['Edit', 'edit'], ['Use', 'msg']])],
    ['<b>Installation & service charge</b>', '1,842', A([['Edit', 'edit'], ['Use', 'msg']])],
    ['<b>Return eligibility</b>', '1,240', A([['Edit', 'edit'], ['Use', 'msg']])],
    ['<b>Genuine product assurance</b>', '842', A([['Edit', 'edit'], ['Use', 'msg']])],
    ['<b>EMI availability</b>', '486', A([['Edit', 'edit'], ['Use', 'msg']])]
  ]), btn('Add template', 'plus', 'outline')),
    card('Q&A policy', `<div class="p-4">${gridForm([fld('Vendor answer SLA', inp('24 hours')), fld('Escalate to Niko after', inp('48 hours')), fld('Max question length', inp('300 characters')), fld('Answers per question', inp('Unlimited'))], 1)}
${frows([['Moderate questions before publishing', 'AI pre-check plus manual review for flagged items.', true],
  ['Allow customers to answer', 'Community answers marked as "Customer".', true],
  ['Mask contact information', 'Hide phone numbers and emails automatically.', true],
  ['Notify vendor of new questions', 'Push and email alerts.', true],
  ['Auto-answer common questions', 'Use templates when confidence is high.', true],
  ['Show answer helpfulness voting', 'Customers can vote on answers.', true]])}</div>`)
    + modal('m-ans', 'Answer as Niko support', gridForm([
      fld('Question', ta('Does this phone support 5G in Bangladesh?'), 'sm:col-span-2'),
      fld('Answer template', sel(['None — write manually', 'Warranty policy answer', 'Delivery time by city', 'Installation & service charge', 'Return eligibility'])),
      fld('Answer language', sel(['English', 'Bengali'])),
      fld('Answer *', ta('This model supports 4G LTE. 5G is not available on this device…'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Mark as official answer', true)}${chk('Notify the customer', true)}${chk('Add to product FAQ', true)}${chk('Save as template', false)}</div>`
    ]) + modalFoot('Post answer', 'Answer posted')))
});

AD('moderation.html', {
  title: 'Reports & Abuse', sub: 'User reports, counterfeit complaints, prohibited items and enforcement actions.', crumb: 'Reports & abuse',
  actions: [['Policy library', 'book'], ['Banned word list', 'ban'], ['Enforcement log', 'db']],
  stats: [['Open reports', '12', '', 'flag', 'brand', '4 high priority'],
    ['Resolved (30d)', '842', '+12%', 'check', 'service', 'Avg. 6 hrs'],
    ['Enforcement actions', '486', '', 'ban', 'gold', '86 suspensions'],
    ['Repeat offenders', '48', '', 'warn', 'ink', 'Vendors with 3+ strikes']],
  tabs: [['Open', '12'], ['High priority', '4'], ['Counterfeit claims', '18'], ['Prohibited items', '24'], ['Fake reviews', '842'], ['Abusive users', '86'], ['Vendor misconduct', '42'], ['Resolved', '842'], ['Appeals', '18']],
  filters: ['search', ['Report type: All', 'Counterfeit / fake product', 'Prohibited item', 'Misleading listing', 'Wrong category', 'Copyright / trademark', 'Abusive review', 'Fraud / scam', 'Off-platform selling', 'Harassment', 'Unsafe service'], ['Reported by: All', 'Customer', 'Vendor', 'Brand owner', 'Staff', 'AI system'], ['Priority: All', 'High', 'Medium', 'Low'], ['Status: All', 'Open', 'Investigating', 'Resolved', 'Dismissed'], 'date'],
  bulk: ['Assign to me', 'Change priority', 'Resolve', 'Dismiss'],
  head: ['Report ID', 'Subject', 'Type', 'Reported item / user', 'Reported by', 'Evidence', 'Priority', 'Assigned to', 'Age', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>#RPT-8842</b>', 'Counterfeit Samsung charger being sold', bd('Counterfeit', 'red'), '<b>Fast Charger 25W</b><p class="text-[11px] text-ink-400">Quick Deals BD · #VND-1388</p>', 'Samsung BD (brand owner)', '3 photos + invoice', bd('High', 'red'), 'Nafisa Karim', '2 hrs', st('Investigating'), A([['Open case', 'eye'], ['View evidence', 'image'], ['Remove listing', 'trash'], ['Suspend vendor', 'ban'], ['Notify brand owner', 'mail'], ['Resolve', 'check']])],
    ['<b>#RPT-8841</b>', 'Prohibited item — e-cigarette listed as gadget', bd('Prohibited item', 'red'), '<b>Vape Kit 5000 puffs</b><p class="text-[11px] text-ink-400">Gadget World BD</p>', 'AI system', 'Auto-detected keywords', bd('High', 'red'), 'Unassigned', '4 hrs', st('Open'), A([['Open case', 'eye'], ['Remove listing', 'trash'], ['Warn vendor', 'warn'], ['Assign to me', 'user']])],
    ['<b>#RPT-8840</b>', 'Seller asking to pay outside the platform', bd('Off-platform selling', 'amber'), prow(0, 'Style Hub', '#VND-1240'), 'Customer — Nusrat J.', 'Chat screenshot', bd('High', 'red'), 'Sabbir Ahmed', '6 hrs', st('Investigating'), A([['Open case', 'eye'], ['View chat log', 'msg'], ['Add strike', 'warn'], ['Suspend vendor', 'ban'], ['Resolve', 'check']])],
    ['<b>#RPT-8839</b>', 'Misleading discount — price inflated before sale', bd('Misleading listing', 'amber'), '<b>Smart LED TV 43"</b><p class="text-[11px] text-ink-400">Mobile Zone</p>', 'Staff — Rashed K.', 'Price history chart', bd('Medium', 'amber'), 'Nafisa Karim', '1 day', st('Open'), A([['Open case', 'eye'], ['Price history', 'chart'], ['Force price correction', 'edit'], ['Warn vendor', 'warn']])],
    ['<b>#RPT-8838</b>', 'Technician behaved rudely at customer home', bd('Unsafe service', 'red'), prow(1, 'Quick Fix BD', '#VND-2240'), 'Customer — Farhana A.', 'Call recording + note', bd('High', 'red'), 'Mehedi Hasan', '1 day', st('Investigating'), A([['Open case', 'eye'], ['Listen to recording', 'phone'], ['Suspend provider', 'ban'], ['Refund booking', 'money'], ['Resolve', 'check']])],
    ['<b>#RPT-8837</b>', 'Abusive language in review', bd('Abusive review', 'amber'), '<b>Review #RV-48620</b>', 'Vendor — Rahim Electric', 'Review text', bd('Low', 'gray'), 'Auto', '2 days', st('Resolved'), A([['View resolution', 'eye'], ['Reopen', 'refresh']])],
    ['<b>#RPT-8836</b>', 'Copyright claim on product photos', bd('Copyright', 'amber'), '<b>18 listings</b><p class="text-[11px] text-ink-400">Multiple vendors</p>', 'Walton BD (brand owner)', 'DMCA notice PDF', bd('Medium', 'amber'), 'Legal team', '3 days', st('Resolved'), A([['View resolution', 'eye'], ['Download notice', 'dl']])],
    ['<b>#RPT-8835</b>', 'Appeal against suspension', bd('Appeal', 'blue'), prow(2, 'Fake Store BD', '#VND-1442'), 'Vendor', 'Explanation + documents', bd('Medium', 'amber'), 'Aminul Islam', '4 days', st('Open'), A([['Review appeal', 'eye'], ['Reinstate vendor', 'check'], ['Uphold suspension', 'ban'], ['Request documents', 'msg']])]
  ], total: 12,
  after: row3(card('Enforcement policy — strike system', `<div class="p-4">${table([['Strike'], ['Action'], ['Duration']], [
    ['<b>1st strike</b>', 'Warning email + listing removed', '—'],
    ['<b>2nd strike</b>', 'Search visibility reduced 50%', '7 days'],
    ['<b>3rd strike</b>', 'New listings blocked', '14 days'],
    ['<b>4th strike</b>', 'Shop suspended, payouts held', '30 days'],
    ['<b>5th strike</b>', 'Permanent ban + payout forfeit review', 'Permanent']
  ])}
<div class="p-3">${kv([['Strike expiry', 'After 180 days of good behaviour'], ['Appeal window', '14 days'], ['Payout hold on suspension', 'Yes — until case closes']])}</div></div>`),
    card('Prohibited items list', `<div class="p-4">${hbars([['Weapons & ammunition', 100, 'Blocked'], ['Tobacco & vape', 92, 'Blocked'], ['Medicines (Rx)', 84, 'Restricted'], ['Adult products', 78, 'Blocked'], ['Counterfeit goods', 100, 'Blocked'], ['Live animals', 68, 'Blocked'], ['Currency / crypto', 62, 'Blocked'], ['Hazardous chemicals', 74, 'Blocked']])}
<div class="flex flex-wrap gap-2 mt-3">${btn('Edit prohibited list', 'edit')}${btn('Keyword blocklist', 'ban')}${btn('AI detection settings', 'bolt')}</div></div>`),
    card('Case handling', `<div class="p-4">${gridForm([fld('Default SLA — high priority', inp('4 hours')), fld('Default SLA — medium', inp('24 hours')), fld('Auto-assign', sel(['Round robin', 'By category expertise', 'Manual'])), fld('Escalation manager', sel(['Aminul Islam', 'Rashed Kabir']))], 1)}
${frows([['Auto-remove AI-confirmed counterfeits', 'Confidence above 95% removes the listing immediately.', true],
  ['Hold payouts during investigation', 'Freeze vendor payouts on high-priority cases.', true],
  ['Notify reporter of outcome', 'Send a resolution email to the reporter.', true],
  ['Allow vendor appeals', 'Vendors can appeal within 14 days.', true],
  ['Log all enforcement actions', 'Immutable audit trail.', true]])}</div>`))
});
