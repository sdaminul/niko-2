/* Admin system: activity (audit log), logs, system-health */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, timeline, bars, hbars, lineChart, modal, modalFoot } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('activity.html', {
  title: 'Audit Log', sub: 'Every action taken by admins, staff, vendors and the system — immutable and searchable.', crumb: 'Audit log',
  actions: [['Retention policy', 'cog'], ['Export log', 'dl'], ['Suspicious activity', 'shield']],
  stats: [['Events today', '48,620', '+8%', 'db', 'brand', '842 by staff'],
    ['Admin actions (30d)', '18,420', '', 'key', 'service', '24 staff members'],
    ['Critical actions', '186', '', 'warn', 'gold', 'Refunds, bans, settings'],
    ['Failed permission attempts', '42', '', 'ban', 'ink', 'Review needed']],
  tabs: [['All events', '48,620'], ['Admin & staff', '18,420'], ['Vendor actions', '24,800'], ['Customer actions', '4,862'], ['System / automated', '842'], ['Critical', '186'], ['Failed / denied', '42'], ['Login history', '8,420']],
  filters: ['search', ['Actor: All', 'Admin', 'Staff', 'Vendor', 'Customer', 'System', 'API'], ['Action: All', 'Create', 'Update', 'Delete', 'Approve', 'Reject', 'Suspend', 'Refund', 'Payout', 'Login', 'Export', 'Settings change', 'Permission change'], ['Module: All', 'Products', 'Services', 'Orders', 'Bookings', 'Vendors', 'Customers', 'Finance', 'Marketing', 'Content', 'Settings', 'Staff'], ['Severity: All', 'Critical', 'High', 'Normal', 'Info'], 'date'],
  bulk: ['Export selected', 'Flag for review'],
  head: ['Timestamp', 'Actor', 'Role', 'Action', 'Module', 'Target', 'Before → After', 'IP address', 'Device', 'Severity', ['Actions', 'text-right']],
  rows: [
    ['<b>23 Aug 2026, 4:02 PM</b><p class="text-[11px] text-ink-400">2 min ago</p>', prow(0, 'Aminul Islam', 'admin@niko.com.bd'), bd('Super Admin', 'red'), '<b>Refund issued</b>', 'Orders', '<a class="link">#NK-84219</a>', tk(0) + ' → ' + tk(23480), '103.120.x.x', 'Chrome / Windows', bd('Critical', 'red'), A([['View details', 'eye'], ['View order', 'bag'], ['Flag for review', 'flag']])],
    ['<b>23 Aug 2026, 3:48 PM</b>', prow(1, 'Nafisa Karim', 'nafisa@niko.com.bd'), bd('Support L2', 'blue'), '<b>Vendor suspended</b>', 'Vendors', '<a class="link">Fake Store BD #VND-1442</a>', 'Active → Suspended', '103.120.x.x', 'Chrome / macOS', bd('Critical', 'red'), A([['View details', 'eye'], ['View vendor', 'store'], ['Reverse action', 'refresh']])],
    ['<b>23 Aug 2026, 3:12 PM</b>', prow(2, 'Rashed Kabir', 'rashed@niko.com.bd'), bd('Catalog Manager', 'amber'), '<b>Commission plan updated</b>', 'Finance', 'Electronics — standard plan', '10% → 12%', '103.120.x.x', 'Chrome / Windows', bd('High', 'amber'), A([['View diff', 'code'], ['View plan', 'percent'], ['Revert', 'refresh']])],
    ['<b>23 Aug 2026, 2:40 PM</b>', prow(3, 'Tania Rahman', 'tania@niko.com.bd'), bd('Finance', 'gold'), '<b>Payout batch approved</b>', 'Finance', 'Batch #PB-2026-34 · 842 vendors', tk(0) + ' → ' + tk(48620000), '103.120.x.x', 'Chrome / Windows', bd('Critical', 'red'), A([['View batch', 'bank'], ['Download advice', 'dl']])],
    ['<b>23 Aug 2026, 1:24 PM</b>', prow(4, 'Rahim Electric', 'Vendor #VND-1042'), bd('Vendor', 'green'), '<b>Product price changed</b>', 'Products', 'Realme C100X 6/128GB', tk(12490) + ' → ' + tk(11290), '45.62.x.x', 'Android app', bd('Normal', 'gray'), A([['View product', 'box'], ['Price history', 'chart']])],
    ['<b>23 Aug 2026, 12:08 PM</b>', prow(5, 'Mehedi Hasan', 'mehedi@niko.com.bd'), bd('Services', 'blue'), '<b>Listing approved</b>', 'Services', 'AC Repair — Dhaka AC Service', 'Pending → Live', '103.120.x.x', 'Chrome / Windows', bd('Normal', 'gray'), A([['View listing', 'wrench'], ['View details', 'eye']])],
    ['<b>23 Aug 2026, 11:42 AM</b>', prow(6, 'System', 'Automated job'), bd('System', 'gray'), '<b>Auto-cancelled unpaid orders</b>', 'Orders', '42 orders', 'Pending → Cancelled', 'internal', 'Cron worker', bd('Info', 'gray'), A([['View list', 'list'], ['Job log', 'db']])],
    ['<b>23 Aug 2026, 10:18 AM</b>', prow(7, 'Sabbir Ahmed', 'sabbir@niko.com.bd'), bd('Support L1', 'blue'), '<b>Permission denied — payout access</b>', 'Finance', 'Payout batch #PB-2026-34', '—', '103.120.x.x', 'Chrome / Windows', bd('High', 'amber'), A([['View details', 'eye'], ['Grant permission', 'key'], ['Flag', 'flag']])],
    ['<b>23 Aug 2026, 9:04 AM</b>', prow(8, 'Aminul Islam', 'admin@niko.com.bd'), bd('Super Admin', 'red'), '<b>Platform settings changed</b>', 'Settings', 'COD limit — verified customer', tk(15000) + ' → ' + tk(20000), '103.120.x.x', 'Chrome / Windows', bd('Critical', 'red'), A([['View diff', 'code'], ['Revert', 'refresh']])],
    ['<b>22 Aug 2026, 11:52 PM</b>', prow(9, 'Unknown', 'admin@niko.com.bd attempt'), bd('Failed login', 'red'), '<b>5 failed login attempts — locked</b>', 'Security', 'Admin panel', '—', '188.42.x.x (Russia)', 'Unknown browser', bd('Critical', 'red'), A([['View details', 'eye'], ['Block IP', 'ban'], ['Force password reset', 'key'], ['Security report', 'shield']])]
  ], total: 48620,
  after: row3(card('Event detail', `<div class="p-4">${kv([['Event ID', 'EVT-2026-08-23-48620'], ['Timestamp', '23 Aug 2026, 4:02:18 PM (GMT+6)'], ['Actor', 'Aminul Islam (Super Admin)'], ['Action', 'Refund issued'], ['Module', 'Orders → Refunds'], ['Target', 'Order #NK-84219'], ['Amount', tk(23480)], ['Reason', 'Courier lost the parcel'], ['Approved by', 'Self (super admin)'], ['IP address', '103.120.x.x — Dhaka, BD'], ['User agent', 'Chrome 141 / Windows 11'], ['Session ID', 'ses_8842190x'], ['Request ID', 'req_4820x8842']])}
<div class="mt-3">${note('Audit entries cannot be edited or deleted. They are retained for 24 months and archived for 7 years.', 'blue', 'shield')}</div>
<div class="flex flex-wrap gap-2 mt-3">${btn('Download JSON', 'dl')}${btn('View related events', 'db')}${btn('Flag for compliance', 'flag')}</div></div>`),
    card('Most active staff (30d)', `<div class="p-4">${hbars([['Nafisa Karim', 92, '4,862 actions'], ['Rashed Kabir', 78, '3,842 actions'], ['Mehedi Hasan', 64, '2,480 actions'], ['Tania Rahman', 52, '1,842 actions'], ['Sabbir Ahmed', 46, '1,240 actions'], ['Aminul Islam', 28, '842 actions']])}
${kv([['Total staff accounts', '24'], ['Active in last 7 days', '21'], ['Never logged in', '2'], ['Critical actions this month', '186']])}</div>`),
    card('Retention & compliance', `<div class="p-4">${gridForm([fld('Hot retention (searchable)', inp('24 months')), fld('Archive retention', inp('7 years')),
      fld('Export format', sel(['JSON', 'CSV', 'Both'])), fld('Compliance contact', inp('legal@niko.com.bd'))], 1)}
${frows([['Log all admin actions', 'Cannot be disabled.', true],
  ['Log vendor panel actions', 'Product, price and order changes.', true],
  ['Log customer data access', 'Who viewed which customer profile.', true],
  ['Alert on critical actions', 'Email super admins immediately.', true],
  ['Require reason for refunds & bans', 'Force a note before the action completes.', true],
  ['Tamper-proof hashing', 'Chain each entry with a SHA-256 hash.', true]])}</div>`))
});

AD('logs.html', {
  title: 'System Logs', sub: 'Application errors, background jobs, emails, SMS, webhooks and API traffic.', crumb: 'System logs',
  actions: [['Log settings', 'cog'], ['Download logs', 'dl'], ['Clear resolved', 'trash']],
  stats: [['Errors (24h)', '842', '-18%', 'warn', 'brand', '12 unresolved critical'],
    ['Failed jobs', '186', '', 'refresh', 'gold', 'Retry queue 42'],
    ['Failed messages', '1,242', '', 'mail', 'service', 'SMS 842 · Email 400'],
    ['Avg. API latency', '182 ms', '-24 ms', 'bolt', 'ink', 'p95 640 ms']],
  tabs: [['Application errors', '842'], ['Background jobs', '186'], ['Email log', '48,62,000'], ['SMS log', '4,20,000'], ['Webhook log', '1,84,200'], ['API requests', '48,62,000'], ['Payment gateway log', '1,84,200'], ['Courier API log', '86,420'], ['Search queries', '12,48,000'], ['Cron schedule', '42']],
  filters: ['search', ['Level: All', 'Critical', 'Error', 'Warning', 'Info', 'Debug'], ['Source: All', 'Web app', 'Mobile API', 'Admin panel', 'Vendor panel', 'Worker / cron', 'Payment gateway', 'Courier API', 'Search engine'], ['Status: All', 'Unresolved', 'Investigating', 'Resolved', 'Ignored'], 'date'],
  bulk: ['Mark resolved', 'Retry', 'Ignore', 'Create bug ticket'],
  head: ['Time', 'Level', 'Source', 'Message', 'Occurrences', 'Affected users', 'Endpoint / job', 'Trace', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>4:02 PM</b><p class="text-[11px] text-ink-400">2 min ago</p>', bd('Critical', 'red'), 'Payment gateway', '<b>bKash callback timeout — order not marked paid</b><p class="text-[11px] text-ink-400 max-w-[300px]">GatewayTimeoutException at PaymentController@callback:184</p>', '<b>42</b>', '42 customers', 'POST /api/pay/callback', 'trace_8842190', st('Open'), A([['View stack trace', 'code'], ['Retry callbacks (42)', 'refresh'], ['Create bug ticket', 'question'], ['Notify affected users', 'mail'], ['Mark resolved', 'check']])],
    ['<b>3:48 PM</b>', bd('Error', 'red'), 'Courier API', '<b>RedX API returned 500 on shipment create</b>', '86', '86 orders', 'POST /courier/redx/create', 'trace_4820x', st('Investigating'), A([['View stack trace', 'code'], ['Retry (86)', 'refresh'], ['Switch courier', 'truck']])],
    ['<b>3:12 PM</b>', bd('Error', 'red'), 'Worker / cron', '<b>Payout batch job failed — bank file rejected</b>', '1', '842 vendors', 'job: payout.beftn.generate', 'trace_1842x', st('Open'), A([['View job log', 'db'], ['Retry job', 'refresh'], ['Download file', 'dl'], ['Escalate', 'up']])],
    ['<b>2:40 PM</b>', bd('Warning', 'amber'), 'Search engine', '<b>Index lag 6 minutes — new products not searchable</b>', '1', '—', 'search.index.sync', 'trace_2480x', st('Investigating'), A([['Rebuild index', 'refresh'], ['View metrics', 'chart']])],
    ['<b>1:24 PM</b>', bd('Error', 'red'), 'Mobile API', '<b>NullPointer on cart merge after login</b>', '482', '482 users', 'POST /api/cart/merge', 'trace_4862x', st('Open'), A([['View stack trace', 'code'], ['Create bug ticket', 'question'], ['Assign to engineering', 'user']])],
    ['<b>12:08 PM</b>', bd('Warning', 'amber'), 'Web app', '<b>Slow query: order list for vendor with 48k orders (4.2 s)</b>', '124', '18 vendors', 'GET /vendor/orders', 'trace_1240x', st('Open'), A([['View query plan', 'db'], ['Add index', 'bolt']])],
    ['<b>11:42 AM</b>', bd('Error', 'red'), 'SMS gateway', '<b>SSL Wireless: insufficient balance — OTP not delivered</b>', '842', '842 users', 'sms.send.otp', 'trace_8420x', st('Resolved'), A([['View log', 'db'], ['Recharge balance', 'wallet'], ['Resend OTPs', 'refresh']])],
    ['<b>10:18 AM</b>', bd('Info', 'gray'), 'Worker / cron', '<b>Nightly sitemap regenerated (4,86,000 URLs)</b>', '1', '—', 'job: seo.sitemap', 'trace_4820y', st('Resolved'), A([['View job log', 'db']])],
    ['<b>9:04 AM</b>', bd('Critical', 'red'), 'Web app', '<b>Redis connection refused — cache bypassed for 4 minutes</b>', '1', 'All visitors', 'cache.redis', 'trace_1188x', st('Resolved'), A([['View incident', 'eye'], ['Post-mortem', 'file']])]
  ], total: 842,
  after: row3(card('Background jobs & cron', table([['Job'], ['Schedule'], ['Last run'], ['Status'], ['', 'text-right']], [
    ['<b>payout.beftn.generate</b>', 'Weekly Sun 2:00 AM', '3:12 PM', bd('Failed', 'red'), A([['Retry', 'refresh'], ['Log', 'db']])],
    ['<b>order.autocancel.unpaid</b>', 'Every 15 min', '11:42 AM', bd('Success', 'green'), A([['Run now', 'bolt'], ['Log', 'db']])],
    ['<b>search.index.sync</b>', 'Every 2 min', '4:00 PM', bd('Lagging', 'amber'), A([['Rebuild', 'refresh'], ['Log', 'db']])],
    ['<b>abandoned-cart.reminder</b>', 'Hourly', '4:00 PM', bd('Success', 'green'), A([['Run now', 'bolt']])],
    ['<b>review.request.email</b>', 'Daily 10:00 AM', '10:00 AM', bd('Success', 'green'), A([['Run now', 'bolt']])],
    ['<b>vendor.score.recalculate</b>', 'Daily 1:00 AM', '1:00 AM', bd('Success', 'green'), A([['Run now', 'bolt']])],
    ['<b>seo.sitemap</b>', 'Daily 3:00 AM', '10:18 AM', bd('Success', 'green'), A([['Run now', 'bolt']])],
    ['<b>db.backup.full</b>', 'Daily 4:00 AM', '4:00 AM', bd('Success', 'green'), A([['Run now', 'bolt'], ['Restore', 'refresh']])]
  ]), btn('Job scheduler', 'clock', 'ghost')),
    card('Error trend (7 days)', `<div class="p-4">${lineChart([120, 186, 142, 284, 842, 486, 842], '7 day error volume')}
${bars([['Payment', 32, '#ff2525'], ['Courier', 24, '#ffb020'], ['API', 18, '#3b82f6'], ['Worker', 12, '#00b894'], ['Search', 8, '#8b5cf6'], ['Other', 6, '#94a3b8']])}</div>`),
    card('Log settings', `<div class="p-4">${gridForm([fld('Log level', sel(['Warning and above', 'Error only', 'Info', 'Debug (verbose)'])),
      fld('Retention — errors', inp('90 days')), fld('Retention — API traffic', inp('30 days')),
      fld('Retention — email / SMS log', inp('12 months')), fld('Alert channel', sel(['Slack #alerts + email', 'Email only', 'SMS for critical'])),
      fld('Error rate alert threshold', inp('100 errors / 5 min'))], 1)}
${frows([['Alert on critical errors', 'Notify on-call engineer immediately.', true],
  ['Auto-retry failed jobs', 'Up to 3 attempts with backoff.', true],
  ['Auto-retry failed webhooks', 'Exponential backoff up to 24 hrs.', true],
  ['Mask personal data in logs', 'Hide phone, email and card numbers.', true],
  ['Send weekly error digest', 'Every Monday to the engineering team.', true]])}</div>`))
});

AD('system-health.html', {
  title: 'System Health', sub: 'Uptime, performance, infrastructure, backups and incident status.', crumb: 'System health',
  actions: [['Status page', 'globe'], ['Run diagnostics', 'bolt'], ['Create incident', 'plus', 'primary', 'data-modal-open="m-inc"']],
  stats: [['Uptime (30d)', '99.97%', '+0.02%', 'server', 'brand', '13 min downtime'],
    ['Avg. response time', '182 ms', '-24 ms', 'bolt', 'service', 'p95 640 ms'],
    ['Error rate', '0.41%', '-0.12%', 'warn', 'gold', 'Target below 0.5%'],
    ['Active incidents', '1', '', 'flag', 'ink', 'Payment callback delays']],
  tabs: [['Overview', ''], ['Services', '12'], ['Infrastructure', '8'], ['Database', '4'], ['Cache & queue', '3'], ['Backups', '90'], ['Incidents', '18'], ['Scheduled maintenance', '2'], ['Capacity', '']],
  top: row3(card('Service status', table([['Service'], ['Status'], ['Latency'], ['Uptime 30d'], ['', 'text-right']], [
    ['<b>Storefront (web)</b>', bd('Operational', 'green'), '164 ms', '99.99%', A([['Metrics', 'chart']])],
    ['<b>Mobile API</b>', bd('Operational', 'green'), '142 ms', '99.98%', A([['Metrics', 'chart']])],
    ['<b>Admin panel</b>', bd('Operational', 'green'), '210 ms', '100%', A([['Metrics', 'chart']])],
    ['<b>Vendor panel</b>', bd('Operational', 'green'), '224 ms', '99.96%', A([['Metrics', 'chart']])],
    ['<b>Checkout & payments</b>', bd('Degraded', 'amber'), '842 ms', '99.82%', A([['Incident', 'flag'], ['Metrics', 'chart']])],
    ['<b>Search service</b>', bd('Operational', 'green'), '86 ms', '99.94%', A([['Metrics', 'chart']])],
    ['<b>Image CDN</b>', bd('Operational', 'green'), '42 ms', '100%', A([['Metrics', 'chart']])],
    ['<b>Notification service</b>', bd('Operational', 'green'), '124 ms', '99.92%', A([['Metrics', 'chart']])],
    ['<b>Courier integrations</b>', bd('Partial outage', 'red'), '2.4 s', '98.86%', A([['Incident', 'flag']])],
    ['<b>Background workers</b>', bd('Operational', 'green'), '—', '99.90%', A([['Queue depth', 'layers']])]
  ]), btn('Public status page', 'globe', 'ghost')),
    card('Infrastructure', `<div class="p-4">${hbars([['Web servers — CPU', 42, '6 × 8 vCPU'], ['App servers — CPU', 58, '12 × 16 vCPU'], ['Memory usage', 64, '384 GB total'], ['Database — CPU', 72, 'Primary + 2 replicas'], ['Database — storage', 48, '2.4 TB of 5 TB'], ['Redis memory', 38, '64 GB'], ['Queue depth', 22, '4,862 jobs'], ['CDN bandwidth', 56, '18.4 TB / month'], ['Object storage', 42, '842 GB of 2 TB']])}
<div class="flex flex-wrap gap-2 mt-3">${btn('Scale up', 'up')}${btn('Capacity plan', 'chart')}${btn('Cost report', 'money')}</div></div>`),
    card('Backups & recovery', `<div class="p-4">${table([['Backup'], ['Last run'], ['Size'], ['', 'text-right']], [
      ['<b>Database — full</b>', 'Today 4:00 AM', '486 GB', A([['Download', 'dl'], ['Restore', 'refresh']])],
      ['<b>Database — incremental</b>', '30 min ago', '4.2 GB', A([['Restore', 'refresh']])],
      ['<b>Media / object storage</b>', 'Today 5:00 AM', '842 GB', A([['Restore', 'refresh']])],
      ['<b>Configuration snapshot</b>', 'Today 4:30 AM', '18 MB', A([['Download', 'dl']])],
      ['<b>Off-site replica (Singapore)</b>', '1 hr ago', '1.3 TB', A([['Verify', 'check']])]
    ])}
<div class="p-3">${kv([['Backup retention', '90 days daily + 12 monthly'], ['RPO', '30 minutes'], ['RTO', '2 hours'], ['Last restore test', '10 Aug 2026 — passed'], ['Encryption', 'AES-256 at rest']])}
<div class="flex gap-2 mt-2">${btn('Run backup now', 'db')}${btn('Test restore', 'bolt')}</div></div></div>`)),
  after: row2(card('Incidents & maintenance', table([['Incident'], ['Impact'], ['Started'], ['Duration'], ['Status'], ['', 'text-right']], [
    ['<b>#INC-042 — bKash callback delays</b>', 'Some orders not marked paid', '23 Aug, 3:48 PM', 'Ongoing 14 min', bd('Investigating', 'amber'), A([['Open incident', 'eye'], ['Post update', 'msg'], ['Resolve', 'check']])],
    ['<b>#INC-041 — RedX API 500 errors</b>', '86 shipments delayed', '23 Aug, 3:12 PM', 'Ongoing 50 min', bd('Identified', 'amber'), A([['Open incident', 'eye'], ['Post update', 'msg']])],
    ['<b>#INC-040 — Redis outage</b>', 'Slow pages for 4 min', '23 Aug, 9:04 AM', '4 min', bd('Resolved', 'green'), A([['Post-mortem', 'file']])],
    ['<b>#INC-039 — Search index lag</b>', 'New products not searchable 22 min', '21 Aug, 11:20 PM', '22 min', bd('Resolved', 'green'), A([['Post-mortem', 'file']])],
    ['<b>#INC-038 — SMS gateway balance</b>', 'OTP delivery failed for 842 users', '18 Aug, 6:40 PM', '38 min', bd('Resolved', 'green'), A([['Post-mortem', 'file']])],
    ['<b>Scheduled — DB upgrade</b>', 'Read-only mode 30 min', '28 Aug, 3:00 AM', 'Planned', bd('Scheduled', 'blue'), A([['Edit window', 'edit'], ['Notify users', 'bell']])]
  ]), btn('Incident history', 'db', 'ghost')),
    card('Performance & capacity', `<div class="p-4">${lineChart([164, 172, 186, 210, 842, 420, 182], 'Response time (ms) — last 7 days')}
${kv([['Peak concurrent users', '48,620 (Eid sale)'], ['Current concurrent users', '8,420'], ['Requests per second (peak)', '4,862'], ['Orders per minute (peak)', '186'], ['Database connections', '482 of 1,000'], ['Cache hit rate', '94.2%'], ['Slow queries (24h)', '124'], ['Auto-scaling', 'Enabled — up to 24 app servers'], ['Next capacity review', '01 Sep 2026']])}
<div class="mt-3">${note('Traffic is projected to triple during the Eid campaign. Reserve extra capacity by 15 Sep.', 'gold', 'warn')}</div>
<div class="flex flex-wrap gap-2 mt-3">${btn('Load test report', 'file')}${btn('Scaling rules', 'cog')}${btn('Uptime SLA report', 'shield')}</div></div>`))
    + modal('m-inc', 'Create incident', gridForm([
      fld('Incident title *', inp('e.g. Checkout failing on bKash payments')),
      fld('Affected service *', sel(['Storefront (web)', 'Mobile API', 'Checkout & payments', 'Search service', 'Courier integrations', 'Notification service', 'Admin panel', 'Vendor panel'])),
      fld('Severity *', sel(['SEV1 — full outage', 'SEV2 — major degradation', 'SEV3 — minor issue', 'SEV4 — cosmetic'])),
      fld('Status', sel(['Investigating', 'Identified', 'Monitoring', 'Resolved'])),
      fld('Started at', inp('23 Aug 2026, 3:48 PM')), fld('Incident commander', sel(['Engineering on-call', 'Aminul Islam', 'Platform team'])),
      fld('Customer impact', ta('Some customers cannot complete bKash payments. Orders may show as unpaid.'), 'sm:col-span-2'),
      fld('Public status message', ta('We are investigating an issue affecting bKash payments. Your money is safe and orders will be updated automatically.'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Publish to public status page', true)}${chk('Notify affected customers by SMS', false)}${chk('Notify vendors', true)}${chk('Show banner on storefront', true)}${chk('Page on-call engineer', true)}</div>`
    ]) + modalFoot('Create incident', 'Incident created'))
});
