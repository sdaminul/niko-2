/* Admin support: tickets, chats (live chat monitor) */
const K = require('./kit'), R = require('./gen-rest');
const { dashPage, card, table, tfoot, st, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, tabs, filterbar, bulkbar, stats,
  timeline, people, bars, hbars, donut, modal, modalFoot, chatShell, svg } = K;
const { AD, btn, A, row2, row3, side, acts } = R;
const fs = require('fs');
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('tickets.html', {
  title: 'Support Tickets', sub: 'Customer and vendor tickets across orders, bookings, payments and accounts.', crumb: 'Support tickets',
  actions: [['SLA settings', 'clock'], ['Canned replies', 'bolt'], ['Export', 'dl'], ['New ticket', 'plus', 'primary', 'data-modal-open="m-tkt"']],
  stats: [['Open tickets', '63', '+8', 'question', 'brand', '18 unassigned'],
    ['Breaching SLA', '9', '', 'warn', 'gold', 'Escalate now'],
    ['Avg. first response', '42 min', '-8 min', 'clock', 'service', 'Target 60 min'],
    ['CSAT (30d)', '4.6 / 5', '+0.2', 'thumb', 'ink', '8,420 ratings']],
  tabs: [['Open', '63'], ['Unassigned', '18'], ['My tickets', '12'], ['Pending customer', '24'], ['Escalated', '9'], ['On hold', '6'], ['Resolved today', '186'], ['Closed', '48,620'], ['Spam', '42']],
  filters: ['search', ['Type: All', 'Order issue', 'Delivery delay', 'Refund / payment', 'Return request', 'Booking issue', 'Account & login', 'Vendor issue', 'Product complaint', 'App / website bug', 'Other'], ['Requester: All', 'Customer', 'Vendor — seller', 'Vendor — provider', 'Guest'], ['Priority: All', 'Urgent', 'High', 'Normal', 'Low'], ['Assigned to: All', 'Unassigned', 'Nafisa Karim', 'Sabbir Ahmed', 'Mehedi Hasan', 'Tania Rahman'], ['Channel: All', 'Web form', 'Live chat', 'Email', 'Phone', 'App', 'Facebook'], 'date'],
  bulk: ['Assign', 'Change priority', 'Add tag', 'Merge tickets', 'Resolve', 'Close', 'Mark spam'],
  head: ['Ticket', 'Subject', 'Type', 'Requester', 'Related to', 'Channel', 'Priority', 'Assigned to', 'SLA', 'Last update', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>#TKT-98421</b><p class="text-[11px] text-ink-400">Opened 2 hrs ago</p>', '<b>Order not delivered after 7 days</b><p class="text-[11px] text-ink-400 max-w-[240px]">Courier shows in transit since 15 Aug…</p>', bd('Delivery delay', 'amber'), prow(0, 'Karim Uddin', 'Customer · 24 orders'), '<a class="link">#NK-84219</a>', bd('Live chat', 'blue'), bd('Urgent', 'red'), prow(1, 'Nafisa Karim', 'Support L2'), '<b class="text-brand-600">Breached 20 min</b>', '8 min ago', st('Open'), A([['Open ticket', 'eye'], ['Reply', 'msg'], ['Assign to me', 'user'], ['Escalate', 'up'], ['Contact courier', 'truck'], ['Refund order', 'money'], ['Merge', 'copy'], ['Close', 'x', 1]])],
    ['<b>#TKT-98420</b><p class="text-[11px] text-ink-400">Opened 4 hrs ago</p>', '<b>Refund not received after 10 days</b>', bd('Refund / payment', 'red'), prow(2, 'Nusrat Jahan', 'Customer · 8 orders'), '<a class="link">#RET-4821</a>', bd('Email', 'gray'), bd('High', 'red'), 'Unassigned', 'Due in 2 hrs', '1 hr ago', st('Open'), A([['Open ticket', 'eye'], ['Assign to me', 'user'], ['Check refund status', 'money'], ['Reply', 'msg']])],
    ['<b>#TKT-98419</b><p class="text-[11px] text-ink-400">Opened 6 hrs ago</p>', '<b>Technician did not arrive at booked slot</b>', bd('Booking issue', 'amber'), prow(3, 'Farhana Akter', 'Customer · 4 bookings'), '<a class="link">#BKG-2214</a>', bd('Phone', 'green'), bd('High', 'red'), prow(4, 'Mehedi Hasan', 'Services'), 'Due in 4 hrs', '2 hrs ago', st('Open'), A([['Open ticket', 'eye'], ['Reply', 'msg'], ['Call provider', 'phone'], ['Reassign booking', 'refresh'], ['Refund booking', 'money']])],
    ['<b>#TKT-98418</b><p class="text-[11px] text-ink-400">Opened 1 day ago</p>', '<b>Payout not credited to bank account</b>', bd('Vendor issue', 'blue'), prow(5, 'Rahim Electric', 'Seller · #VND-1042'), '<a class="link">#PO-8842</a>', bd('Web form', 'gray'), bd('Normal', 'amber'), prow(6, 'Tania Rahman', 'Finance'), 'Due in 8 hrs', '4 hrs ago', st('Pending'), A([['Open ticket', 'eye'], ['Reply', 'msg'], ['View payout', 'bank'], ['Ask for bank proof', 'file']])],
    ['<b>#TKT-98417</b><p class="text-[11px] text-ink-400">Opened 1 day ago</p>', '<b>Cannot log in — OTP not received</b>', bd('Account & login', 'gray'), prow(7, 'Sabbir Hossain', 'Customer · 2 orders'), '—', bd('App', 'blue'), bd('Normal', 'amber'), prow(8, 'Sabbir Ahmed', 'Support L1'), 'Due in 12 hrs', '6 hrs ago', st('Pending'), A([['Open ticket', 'eye'], ['Resend OTP', 'refresh'], ['Verify identity', 'shield'], ['Reset password', 'key']])],
    ['<b>#TKT-98416</b><p class="text-[11px] text-ink-400">Opened 2 days ago</p>', '<b>Received a fake product — want a return</b>', bd('Product complaint', 'red'), prow(9, 'Imran Hossain', 'Customer · 42 orders'), '<a class="link">#NK-84102</a>', bd('Live chat', 'blue'), bd('Urgent', 'red'), prow(10, 'Nafisa Karim', 'Support L2'), 'Escalated', '1 day ago', st('Escalated'), A([['Open ticket', 'eye'], ['Create abuse report', 'flag'], ['Approve return', 'return'], ['Suspend vendor', 'ban']])],
    ['<b>#TKT-98415</b><p class="text-[11px] text-ink-400">Opened 3 days ago</p>', '<b>Website checkout error on bKash payment</b>', bd('App / website bug', 'gray'), prow(11, 'Guest user', 'Not registered'), '—', bd('Web form', 'gray'), bd('High', 'red'), prow(12, 'Engineering', 'Bug queue'), 'On hold', '2 days ago', st('On hold'), A([['Open ticket', 'eye'], ['Link bug report', 'code'], ['Reply', 'msg'], ['Resume', 'refresh']])],
    ['<b>#TKT-98414</b><p class="text-[11px] text-ink-400">Opened 4 days ago</p>', '<b>Requesting invoice with company VAT number</b>', bd('Other', 'gray'), prow(13, 'Ahmed Traders', 'Customer · business'), '<a class="link">#NK-83920</a>', bd('Email', 'gray'), bd('Low', 'gray'), prow(14, 'Tania Rahman', 'Finance'), 'Met', '3 days ago', st('Resolved'), A([['View ticket', 'eye'], ['Download invoice', 'dl'], ['Reopen', 'refresh']])]
  ], total: 63,
  after: row3(card('Ticket detail — #TKT-98421', `<div class="p-4">
${kv([['Subject', 'Order not delivered after 7 days'], ['Requester', 'Karim Uddin · 01712-xxxxxx'], ['Email', 'karim@example.com'], ['Order', '#NK-84219 · ' + tk(23480)], ['Vendor', 'Rahim Electric'], ['Courier', 'Pathao · TRK-8842190'], ['Channel', 'Live chat → ticket'], ['Priority', 'Urgent'], ['Tags', 'delivery, courier-delay, refund-risk']])}
<div class="mt-3">${timeline([['Ticket created from live chat', '2 hrs ago · Karim Uddin'], ['Auto-assigned to Support L2', '2 hrs ago · System'], ['First reply sent', '1 hr 40 min ago · Nafisa Karim'], ['Courier escalation raised', '1 hr ago · Nafisa Karim'], ['Customer replied — still not delivered', '8 min ago · Karim Uddin', 'brand']])}</div>
${gridForm([fld('Reply to customer', ta('Type your reply… use / for canned replies'), 'sm:col-span-2'),
  fld('Canned reply', sel(['None', 'Delivery delay apology + compensation', 'Refund initiated', 'Courier escalated', 'Ask for more information'])),
  fld('Change status', sel(['Open', 'Pending customer', 'On hold', 'Escalated', 'Resolved', 'Closed']))], 2)}
<div class="flex flex-wrap gap-2 mt-3">${btn('Send reply', 'send', 'primary', 'data-toast="Reply sent"')}${btn('Add internal note', 'note')}${btn('Attach file', 'clip')}${btn('Send voucher', 'ticket')}${btn('Refund ' + tk(23480), 'money')}${btn('Escalate to manager', 'up')}${btn('Resolve ticket', 'check')}</div></div>`),
    card('Agent workload', people([['Nafisa Karim', 'Support L2 · 18 open · CSAT 4.8', 'Online', 'brand'],
      ['Sabbir Ahmed', 'Support L1 · 14 open · CSAT 4.5', 'Online', 'service'],
      ['Mehedi Hasan', 'Services desk · 11 open · CSAT 4.7', 'On call', 'gold'],
      ['Tania Rahman', 'Finance desk · 9 open · CSAT 4.6', 'Online', 'ink'],
      ['Rashed Kabir', 'Escalations · 5 open · CSAT 4.9', 'Away', 'brand'],
      ['Unassigned queue', '18 tickets waiting', 'Action needed', 'ink']]),
      btn('Manage agents & shifts', 'users', 'ghost')),
    card('Volume & SLA', `<div class="p-4">${bars([['Delivery', 32, '#ff2525'], ['Refund', 24, '#ffb020'], ['Booking', 16, '#00b894'], ['Account', 12, '#3b82f6'], ['Vendor', 10, '#8b5cf6'], ['Other', 6, '#94a3b8']])}
${kv([['First response SLA', '60 min (met 92%)'], ['Resolution SLA', '24 hrs (met 88%)'], ['Reopen rate', '6.2%'], ['Tickets per 1,000 orders', '18'], ['Deflected by help centre', '68%'], ['Escalation rate', '4.8%']])}
<div class="flex gap-2 mt-3">${btn('SLA policy', 'clock')}${btn('CSAT report', 'chart')}</div></div>`))
    + modal('m-tkt', 'Create ticket on behalf of user', gridForm([
      fld('Requester *', inp('Search customer / vendor by name, phone or email')),
      fld('Requester type', sel(['Customer', 'Vendor — seller', 'Vendor — provider', 'Guest'])),
      fld('Subject *', inp('Short summary of the issue')),
      fld('Ticket type *', sel(['Order issue', 'Delivery delay', 'Refund / payment', 'Return request', 'Booking issue', 'Account & login', 'Vendor issue', 'Product complaint', 'App / website bug', 'Other'])),
      fld('Related order / booking', inp('#NK-…  /  #BKG-…')), fld('Channel', sel(['Phone', 'Email', 'Live chat', 'Web form', 'Walk-in', 'Facebook'])),
      fld('Priority', sel(['Normal', 'Low', 'High', 'Urgent'])), fld('Assign to', sel(['Unassigned', 'Nafisa Karim', 'Sabbir Ahmed', 'Mehedi Hasan', 'Tania Rahman'])),
      fld('Description *', ta('Full details of the customer complaint…'), 'sm:col-span-2'),
      fld('Tags', inp('delivery, courier-delay')), fld('Attachments', inp('Upload screenshots / documents')),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Notify requester by SMS', true)}${chk('Notify requester by email', true)}${chk('Notify vendor', false)}${chk('Mark as urgent escalation', false)}</div>`
    ]) + modalFoot('Create ticket', 'Ticket created'))
});

/* live chat monitor — custom layout with chat shell */
const threads = [
  ['Karim Uddin', 'Order still not delivered, please help', '2 min', '3', 'brand', 'Urgent · #NK-84219', 'red'],
  ['Nusrat Jahan', 'Refund status please', '8 min', '1', 'service', 'Refund', 'amber'],
  ['Rahim Electric (vendor)', 'Payout query for August', '14 min', '', 'gold', 'Vendor', 'blue'],
  ['Farhana Akter', 'Technician is late', '22 min', '2', 'ink', 'Booking', 'amber'],
  ['Guest visitor 8842', 'Is COD available in Sylhet?', '30 min', '', 'brand', 'Pre-sales', 'gray'],
  ['Imran Hossain', 'Product looks fake', '42 min', '', 'service', 'Escalated', 'red'],
  ['Style Hub (vendor)', 'Listing rejected, why?', '1 hr', '', 'gold', 'Vendor', 'blue'],
  ['Sabbir Hossain', 'OTP not coming', '1 hr', '', 'ink', 'Account', 'gray']
];
const chatSide = card('Conversation context', `<div class="p-4">${kv([['Visitor', 'Karim Uddin · logged in'], ['Customer since', 'Mar 2024'], ['Lifetime value', tk(184200)], ['Open tickets', '1 (#TKT-98421)'], ['Current page', '/track-order.html'], ['Device', 'Android app 4.2.1'], ['Location', 'Banani, Dhaka'], ['Wait time', '18 seconds'], ['Agent', 'Nafisa Karim'], ['Sentiment', 'Negative — angry']])}
<div class="flex flex-wrap gap-2 mt-3">${btn('Open order', 'bag')}${btn('Create ticket', 'question')}${btn('Send voucher', 'ticket')}${btn('Transfer chat', 'refresh')}${btn('Invite supervisor', 'users')}${btn('End chat', 'x')}${btn('Block visitor', 'ban')}</div>
<div class="mt-3">${note('This visitor has 2 previous chats about the same order. Consider an immediate refund or compensation voucher.', 'brand', 'info')}</div></div>`)
  + card('Live queue', `<div class="p-4">${kv([['Chats waiting', '4'], ['Longest wait', '2 min 40 sec'], ['Active chats', '18'], ['Agents online', '9 of 14'], ['Avg. handling time', '6 min 20 sec'], ['Missed chats today', '12']])}
<div class="flex gap-2 mt-3">${btn('Pick next chat', 'msg', 'primary')}${btn('Queue settings', 'cog')}</div></div>`);

const chatBody = stats([['Active chats', '18', '+4', 'msg', 'brand', '9 agents online'],
  ['Waiting in queue', '4', '', 'clock', 'gold', 'Longest 2 min 40 s'],
  ['Avg. response time', '32 sec', '-6 s', 'bolt', 'service', 'Target 45 sec'],
  ['Chat CSAT (today)', '4.7 / 5', '+0.1', 'thumb', 'ink', '486 ratings']])
  + tabs([['Active chats', '18'], ['Waiting', '4'], ['Vendor chats', '6'], ['Flagged / abusive', '2'], ['Bot handled', '842'], ['Transcripts', '48,620'], ['Missed', '12']])
  + filterbar(['search', ['Agent: All', 'Nafisa Karim', 'Sabbir Ahmed', 'Mehedi Hasan', 'Bot'], ['Type: All', 'Customer', 'Vendor', 'Guest visitor'], ['Sentiment: All', 'Positive', 'Neutral', 'Negative'], ['Language: All', 'English', 'Bengali']],
    acts([['Join chat', 'msg', 'primary'], ['Whisper to agent', 'ear'], ['Download transcript', 'dl']]))
  + chatShell(threads, 0)
  + row2(card('Live chat settings', `<div class="p-4">${gridForm([fld('Widget position', sel(['Bottom right', 'Bottom left'])), fld('Office hours', inp('9:00 AM – 11:00 PM')),
    fld('Max chats per agent', inp('4')), fld('Auto-close idle chat after', inp('10 minutes')),
    fld('Pre-chat form fields', sel(['Name + phone', 'Name + phone + order ID', 'None'])), fld('Offline behaviour', sel(['Show ticket form', 'Show help centre', 'Hide widget']))])}
${frows([['Enable chatbot for first response', 'Bot answers FAQs and collects order details.', true],
  ['Show agent name & photo', 'Builds trust with customers.', true],
  ['Allow file sharing in chat', 'Customers can send screenshots.', true],
  ['Mask contact details from vendors', 'Prevents off-platform deals.', true],
  ['Record chat transcripts', 'Store for 24 months for dispute handling.', true],
  ['Ask for CSAT rating after chat', '1–5 star rating with comment.', true],
  ['Enable Bengali auto-translate', 'Translate between EN and BN in real time.', true]])}</div>`),
    card('Chatbot flows & quick replies', table([['Flow / reply'], ['Trigger'], ['Resolved by bot'], ['', 'text-right']], [
      ['<b>Track my order</b>', '"where is my order"', '86%', A([['Edit flow', 'edit'], ['Test', 'bolt']])],
      ['<b>Return a product</b>', '"return", "refund"', '72%', A([['Edit flow', 'edit'], ['Test', 'bolt']])],
      ['<b>Delivery charge & COD</b>', '"delivery charge", "cod"', '94%', A([['Edit flow', 'edit']])],
      ['<b>Book a service</b>', '"book", "technician"', '68%', A([['Edit flow', 'edit']])],
      ['<b>Become a seller</b>', '"sell", "vendor"', '90%', A([['Edit flow', 'edit']])],
      ['<b>Escalate to human</b>', '"agent", "human"', '—', A([['Edit flow', 'edit']])]
    ]), btn('New chatbot flow', 'plus', 'outline')));

fs.writeFileSync('f:/niko-design/admin/chats.html', dashPage({
  role: 'admin', title: 'Live Chat Monitor', sub: 'Monitor and join live conversations between customers, vendors and agents.',
  active: 'chats.html', crumbs: ['Live chat monitor'],
  actions: acts([['Chat settings', 'cog'], ['Agent status', 'users'], ['Transcripts', 'db']]),
  body: side(chatBody, chatSide)
}));
console.log('admin/chats.html');
