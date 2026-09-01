/* Admin system: payment-methods, integrations */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, tk, kv, note, fld, inp, sel, ta, chk, gridForm, frows, modal, modalFoot } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('payment-methods.html', {
  title: 'Payment Methods', sub: 'Gateways, mobile wallets, cards, COD, EMI and payout channels.', crumb: 'Payment methods',
  actions: [['Test transactions', 'bolt'], ['Reconciliation', 'scale'], ['Add method', 'plus', 'primary', 'data-modal-open="m-pm"']],
  stats: [['Active methods', '14', '+2', 'wallet', 'brand', '3 in test mode'],
    ['Success rate (30d)', '96.4%', '+1.2%', 'check', 'service', '18,420 failures'],
    ['Gateway fees (30d)', tk(3860000), '', 'percent', 'gold', 'Avg. 1.8%'],
    ['COD share', '42%', '-4%', 'truck', 'ink', 'Target below 35%']],
  tabs: [['All methods', '14'], ['Mobile financial services', '5'], ['Cards', '3'], ['Internet banking', '2'], ['COD', '1'], ['Wallet & gift card', '2'], ['EMI', '1'], ['Disabled', '4'], ['Payout channels', '6']],
  filters: ['search', ['Type: All', 'MFS', 'Card', 'Internet banking', 'COD', 'Wallet', 'EMI'], ['Status: All', 'Live', 'Test mode', 'Disabled'], ['Availability: All', 'Web', 'App', 'Both']],
  bulk: ['Enable', 'Disable', 'Reorder', 'Set fees'],
  head: ['Method', 'Type', 'Provider / gateway', 'Fee', 'Fee borne by', 'Min – Max', 'Success rate', 'Volume (30d)', 'Availability', 'Mode', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>bKash</b><p class="text-[11px] text-ink-400">Payment + payout</p>', bd('MFS', 'green'), 'bKash PGW', '1.85%', 'Platform', tk(10) + ' – ' + tk(50000), '<b>97.8%</b>', tk(184200000), 'Web + App', bd('Live', 'green'), st('Active'), A([['Edit settings', 'edit'], ['API credentials', 'key'], ['Test payment', 'bolt'], ['Transaction log', 'db'], ['Reconciliation', 'scale'], ['Disable', 'ban', 1]])],
    ['<b>Nagad</b>', bd('MFS', 'green'), 'Nagad PGW', '1.60%', 'Platform', tk(10) + ' – ' + tk(50000), '96.4%', tk(86400000), 'Web + App', bd('Live', 'green'), st('Active'), A([['Edit settings', 'edit'], ['API credentials', 'key'], ['Test payment', 'bolt']])],
    ['<b>Rocket</b>', bd('MFS', 'green'), 'DBBL Rocket', '1.80%', 'Platform', tk(10) + ' – ' + tk(30000), '94.2%', tk(24800000), 'Web + App', bd('Live', 'green'), st('Active'), A([['Edit settings', 'edit'], ['API credentials', 'key']])],
    ['<b>Upay</b>', bd('MFS', 'green'), 'UCB Upay', '1.50%', 'Platform', tk(10) + ' – ' + tk(25000), '92.8%', tk(8420000), 'Web + App', bd('Live', 'green'), st('Active'), A([['Edit settings', 'edit'], ['API credentials', 'key']])],
    ['<b>Visa / Mastercard</b>', bd('Card', 'blue'), 'SSLCOMMERZ', '2.75%', 'Platform', tk(50) + ' – ' + tk(500000), '95.6%', tk(124800000), 'Web + App', bd('Live', 'green'), st('Active'), A([['Edit settings', 'edit'], ['API credentials', 'key'], ['3D Secure settings', 'shield'], ['Test payment', 'bolt']])],
    ['<b>American Express</b>', bd('Card', 'blue'), 'City Bank Amex', '3.00%', 'Customer', tk(100) + ' – ' + tk(500000), '93.4%', tk(4860000), 'Web', bd('Live', 'green'), st('Active'), A([['Edit settings', 'edit'], ['API credentials', 'key']])],
    ['<b>Internet banking</b>', bd('Banking', 'gray'), 'SSLCOMMERZ (12 banks)', '1.50%', 'Platform', tk(100) + ' – ' + tk(1000000), '91.2%', tk(18420000), 'Web', bd('Live', 'green'), st('Active'), A([['Edit settings', 'edit'], ['Bank list (12)', 'bank']])],
    ['<b>Cash on Delivery</b>', bd('COD', 'amber'), 'Courier collection', tk(0), '—', tk(100) + ' – ' + tk(20000), 'RTO 8.4%', tk(248600000), 'Web + App', bd('Live', 'green'), st('Active'), A([['Edit settings', 'edit'], ['COD limits by zone', 'pin'], ['RTO report', 'chart'], ['Blocked customers', 'ban']])],
    ['<b>Niko Wallet</b>', bd('Wallet', 'blue'), 'Internal ledger', tk(0), '—', tk(1) + ' – ' + tk(100000), '99.8%', tk(48620000), 'Web + App', bd('Live', 'green'), st('Active'), A([['Edit settings', 'edit'], ['Wallet ledger', 'db'], ['Top-up methods', 'wallet']])],
    ['<b>Gift card / voucher</b>', bd('Wallet', 'blue'), 'Internal', tk(0), '—', tk(100) + ' – ' + tk(50000), '99.9%', tk(8420000), 'Web + App', bd('Live', 'green'), st('Active'), A([['Edit settings', 'edit'], ['Gift card list', 'gift']])],
    ['<b>EMI (0% 3–12 months)</b>', bd('EMI', 'gold'), '8 partner banks', '4.50%', 'Vendor', tk(5000) + ' – ' + tk(500000), '89.4%', tk(42800000), 'Web + App', bd('Live', 'green'), st('Active'), A([['Edit settings', 'edit'], ['Partner banks (8)', 'bank'], ['Eligible products', 'box'], ['Tenure & rates', 'percent']])],
    ['<b>Apple Pay</b>', bd('Card', 'blue'), 'Stripe', '2.90%', 'Platform', tk(50) + ' – ' + tk(500000), '—', tk(0), 'App (iOS)', bd('Test mode', 'amber'), st('Pending'), A([['Complete setup', 'cog'], ['Test payment', 'bolt'], ['Go live', 'check']])],
    ['<b>PayPal (international)</b>', bd('Card', 'gray'), 'PayPal', '4.40% + $0.30', 'Customer', '$1 – $10,000', '—', tk(0), 'Web', bd('Disabled', 'gray'), st('Disabled'), A([['Enable', 'check'], ['Edit settings', 'edit'], ['Remove', 'trash', 1]])]
  ], total: 14,
  after: row3(card('Payout channels', table([['Channel'], ['Fee'], ['Speed'], ['', 'text-right']], [
    ['<b>Bank transfer (BEFTN)</b>', tk(15), '1–2 working days', A([['Configure', 'cog']])],
    ['<b>Bank transfer (RTGS)</b>', tk(120), 'Same day', A([['Configure', 'cog']])],
    ['<b>bKash payout</b>', '1.0%', 'Instant', A([['Configure', 'cog']])],
    ['<b>Nagad payout</b>', '0.9%', 'Instant', A([['Configure', 'cog']])],
    ['<b>Rocket payout</b>', '1.0%', 'Instant', A([['Configure', 'cog']])],
    ['<b>Cheque</b>', tk(0), '3–5 days', A([['Configure', 'cog']])]
  ]), btn('Add payout channel', 'plus', 'outline')),
    card('COD & risk controls', `<div class="p-4">${gridForm([fld('COD limit — new customer', inp('৳5,000')), fld('COD limit — verified customer', inp('৳20,000')),
      fld('Block COD after failed deliveries', inp('2 RTOs')), fld('COD OTP verification', sel(['Required above ৳5,000', 'Always', 'Never'])),
      fld('Advance payment for high-value COD', inp('20% above ৳20,000')), fld('COD collection fee (customer)', inp('৳0'))], 1)}
${frows([['Require phone verification for COD', 'OTP confirmation before order is accepted.', true],
  ['Auto-block repeat RTO customers', 'Blacklist after 3 refusals.', true],
  ['Disable COD for remote zones', 'Zone E and uncovered areas.', true],
  ['Fraud scoring on checkout', 'Score device, address and order history.', true],
  ['Require full payment for pre-orders', 'No COD on pre-order items.', true]])}</div>`),
    card('Gateway health & fees', `<div class="p-4">${kv([['Gateway uptime (30d)', '99.94%'], ['Failed payments (30d)', '18,420'], ['Top failure reason', 'Insufficient balance (42%)'], ['Auto-retry enabled', 'Yes — 2 attempts'], ['Settlement cycle — MFS', 'T+1'], ['Settlement cycle — cards', 'T+3'], ['Unsettled amount', tk(18420000)], ['Chargebacks (30d)', '42 · ' + tk(486000)]])}
<div class="flex flex-wrap gap-2 mt-3">${btn('Failure analysis', 'chart')}${btn('Chargeback queue', 'flag')}${btn('Settlement report', 'file')}${btn('Fee calculator', 'percent')}</div></div>`))
    + modal('m-pm', 'Add payment method', gridForm([
      fld('Method name *', inp('e.g. Tap by Trust Bank')),
      fld('Type *', sel(['Mobile financial service', 'Card', 'Internet banking', 'Cash on delivery', 'Wallet', 'EMI', 'Buy now pay later'])),
      fld('Gateway / provider *', sel(['SSLCOMMERZ', 'bKash PGW', 'Nagad PGW', 'ShurjoPay', 'AamarPay', 'Stripe', 'PayPal', 'Custom API'])),
      fld('Display name (storefront)', inp('Tap')),
      fld('Icon / logo', inp('Upload 120×40 PNG')), fld('Display order', inp('5')),
      fld('Transaction fee', inp('1.75%')), fld('Fee borne by', sel(['Platform', 'Customer', 'Vendor', 'Split 50/50'])),
      fld('Minimum amount', inp('৳10')), fld('Maximum amount', inp('৳50,000')),
      fld('Merchant ID / API key', inp('••••••••••••')), fld('API secret', inp('••••••••••••')),
      fld('Callback / IPN URL', inp('https://niko.com.bd/api/pay/callback')), fld('Environment', sel(['Sandbox / test', 'Live'])),
      fld('Availability', sel(['Web + App', 'Web only', 'App only'])), fld('Supported currencies', sel(['BDT', 'BDT + USD'])),
      fld('Instructions for customer', ta('Shown on the checkout page before redirect.'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Enable immediately', false)}${chk('Enable for vendors payouts', false)}${chk('Enable auto-refund via API', true)}${chk('Show saved-card option', true)}${chk('Enable for guest checkout', true)}${chk('Log every API call', true)}</div>`
    ]) + modalFoot('Save method', 'Payment method saved'))
});

AD('integrations.html', {
  title: 'Integrations & API', sub: 'Third-party services, couriers, SMS, analytics, webhooks and API keys.', crumb: 'Integrations & API',
  actions: [['API documentation', 'book'], ['Webhook log', 'db'], ['Generate API key', 'key', 'primary', 'data-modal-open="m-api"']],
  stats: [['Active integrations', '28', '+3', 'cloud', 'brand', '4 need attention'],
    ['API calls (24h)', '48,62,000', '+8%', 'code', 'service', 'Error rate 0.4%'],
    ['Webhooks delivered (24h)', '1,84,200', '', 'bolt', 'gold', '842 failed / retrying'],
    ['Active API keys', '18', '', 'key', 'ink', '6 vendor apps']],
  tabs: [['All integrations', '28'], ['Couriers & logistics', '8'], ['Payments', '6'], ['SMS & email', '4'], ['Analytics & ads', '5'], ['Maps & location', '2'], ['Accounting & ERP', '2'], ['Chat & CRM', '3'], ['API keys', '18'], ['Webhooks', '24'], ['Error log', '842']],
  filters: ['search', ['Category: All', 'Courier', 'Payment', 'SMS', 'Email', 'Analytics', 'Ads', 'Maps', 'Accounting', 'Chat'], ['Status: All', 'Connected', 'Needs attention', 'Not connected'], ['Environment: All', 'Live', 'Sandbox']],
  head: ['Integration', 'Category', 'Purpose', 'Environment', 'Last sync', 'Calls (24h)', 'Errors', 'Owner', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>Pathao Courier</b>', bd('Courier', 'blue'), 'Delivery booking, tracking, COD collection', bd('Live', 'green'), '2 min ago', '86,420', '12', 'Logistics', st('Connected'), A([['Configure', 'cog'], ['API credentials', 'key'], ['Test connection', 'bolt'], ['Sync now', 'refresh'], ['Error log', 'db'], ['Disconnect', 'ban', 1]])],
    ['<b>Steadfast Courier</b>', bd('Courier', 'blue'), 'Nationwide delivery + tracking', bd('Live', 'green'), '4 min ago', '48,200', '4', 'Logistics', st('Connected'), A([['Configure', 'cog'], ['API credentials', 'key'], ['Test connection', 'bolt']])],
    ['<b>RedX</b>', bd('Courier', 'blue'), 'Same-day Dhaka delivery', bd('Live', 'green'), '6 min ago', '24,800', '86', 'Logistics', st('Needs attention'), A([['View errors (86)', 'warn'], ['Configure', 'cog'], ['Test connection', 'bolt']])],
    ['<b>eCourier</b>', bd('Courier', 'blue'), 'Outside Dhaka delivery', bd('Live', 'green'), '18 min ago', '8,420', '0', 'Logistics', st('Connected'), A([['Configure', 'cog'], ['Test connection', 'bolt']])],
    ['<b>SSLCOMMERZ</b>', bd('Payment', 'green'), 'Card & internet banking gateway', bd('Live', 'green'), 'Real-time', '1,24,800', '482', 'Finance', st('Connected'), A([['Configure', 'cog'], ['API credentials', 'key'], ['Transaction log', 'db']])],
    ['<b>bKash PGW</b>', bd('Payment', 'green'), 'MFS payment + payout', bd('Live', 'green'), 'Real-time', '1,84,200', '284', 'Finance', st('Connected'), A([['Configure', 'cog'], ['API credentials', 'key']])],
    ['<b>SSL Wireless SMS</b>', bd('SMS', 'amber'), 'Transactional SMS & OTP', bd('Live', 'green'), '1 min ago', '4,20,000', '842', 'Marketing', st('Connected'), A([['Configure', 'cog'], ['Balance: ' + tk(482000), 'wallet'], ['Recharge', 'plus'], ['Delivery report', 'chart']])],
    ['<b>Amazon SES</b>', bd('Email', 'amber'), 'Transactional & marketing email', bd('Live', 'green'), 'Real-time', '48,62,000', '1,242', 'Marketing', st('Connected'), A([['Configure', 'cog'], ['Suppression list', 'ban'], ['Reputation', 'shield']])],
    ['<b>Firebase Cloud Messaging</b>', bd('Push', 'amber'), 'App & web push notifications', bd('Live', 'green'), 'Real-time', '18,42,000', '482', 'Product', st('Connected'), A([['Configure', 'cog'], ['Topics', 'layers']])],
    ['<b>Google Analytics 4</b>', bd('Analytics', 'gray'), 'Traffic & conversion tracking', bd('Live', 'green'), '5 min ago', '—', '0', 'Marketing', st('Connected'), A([['Configure', 'cog'], ['Open GA4', 'globe']])],
    ['<b>Google Tag Manager</b>', bd('Analytics', 'gray'), 'Tag & pixel management', bd('Live', 'green'), '—', '—', '0', 'Marketing', st('Connected'), A([['Configure', 'cog'], ['Container: GTM-XXXX', 'code']])],
    ['<b>Meta (Facebook) Pixel + CAPI</b>', bd('Ads', 'gray'), 'Ad tracking & catalog sync', bd('Live', 'green'), '12 min ago', '4,86,000', '124', 'Marketing', st('Connected'), A([['Configure', 'cog'], ['Catalog sync', 'refresh'], ['Event log', 'db']])],
    ['<b>Google Merchant Center</b>', bd('Ads', 'gray'), 'Shopping feed for 4,86,000 products', bd('Live', 'green'), '1 hr ago', '—', '842', 'Marketing', st('Needs attention'), A([['View disapprovals (842)', 'warn'], ['Configure', 'cog'], ['Resync feed', 'refresh']])],
    ['<b>Google Maps Platform</b>', bd('Maps', 'blue'), 'Address autocomplete, geocoding, service maps', bd('Live', 'green'), 'Real-time', '2,48,000', '18', 'Engineering', st('Connected'), A([['Configure', 'cog'], ['Usage & billing', 'money']])],
    ['<b>Tally / QuickBooks</b>', bd('Accounting', 'gold'), 'GL export, invoices, VAT reports', bd('Sandbox', 'amber'), '1 day ago', '482', '4', 'Finance', st('Pending'), A([['Complete setup', 'cog'], ['Test export', 'bolt'], ['Go live', 'check']])],
    ['<b>Freshdesk / CRM</b>', bd('Chat', 'blue'), 'Ticket sync & customer 360', bd('Live', 'green'), '8 min ago', '18,420', '0', 'Support', st('Connected'), A([['Configure', 'cog'], ['Field mapping', 'sliders']])]
  ], total: 28,
  after: row2(card('API keys & apps', table([['Key / app name'], ['Type'], ['Scopes'], ['Rate limit'], ['Last used'], ['', 'text-right']], [
    ['<b>Mobile app (Android)</b><p class="text-[11px] text-ink-400">pk_live_••••8421</p>', bd('Public', 'blue'), 'catalog:read, orders:write, user:*', '600 / min', '2 sec ago', A([['Rotate key', 'refresh'], ['Edit scopes', 'sliders'], ['Revoke', 'ban', 1]])],
    ['<b>Mobile app (iOS)</b><p class="text-[11px] text-ink-400">pk_live_••••2240</p>', bd('Public', 'blue'), 'catalog:read, orders:write, user:*', '600 / min', '4 sec ago', A([['Rotate key', 'refresh'], ['Edit scopes', 'sliders']])],
    ['<b>Vendor ERP — Walton</b><p class="text-[11px] text-ink-400">sk_live_••••1042</p>', bd('Secret', 'red'), 'products:*, inventory:*, orders:read', '120 / min', '18 min ago', A([['Rotate key', 'refresh'], ['Edit scopes', 'sliders'], ['View logs', 'db']])],
    ['<b>Affiliate partner API</b><p class="text-[11px] text-ink-400">sk_live_••••8842</p>', bd('Secret', 'red'), 'catalog:read, feed:read', '60 / min', '1 hr ago', A([['Rotate key', 'refresh'], ['Edit scopes', 'sliders']])],
    ['<b>Internal BI pipeline</b><p class="text-[11px] text-ink-400">sk_live_••••4820</p>', bd('Secret', 'red'), 'reports:read, orders:read', '30 / min', '30 min ago', A([['Rotate key', 'refresh'], ['View logs', 'db']])],
    ['<b>Old partner key (unused)</b><p class="text-[11px] text-ink-400">sk_live_••••1188</p>', bd('Secret', 'gray'), 'catalog:read', '10 / min', '86 days ago', A([['Revoke', 'ban', 1]])]
  ]), btn('Generate API key', 'key', 'outline')),
    card('Webhooks', table([['Event'], ['Endpoint'], ['Success'], ['', 'text-right']], [
      ['<b>order.created</b>', 'https://erp.walton.com/hooks/order', '99.8%', A([['Edit', 'edit'], ['Retry failed (4)', 'refresh'], ['Log', 'db']])],
      ['<b>order.status_changed</b>', 'https://erp.walton.com/hooks/status', '99.4%', A([['Edit', 'edit'], ['Log', 'db']])],
      ['<b>shipment.updated</b>', 'https://internal.niko/hooks/ship', '98.2%', A([['Edit', 'edit'], ['Log', 'db']])],
      ['<b>payment.succeeded</b>', 'https://finance.niko/hooks/pay', '99.9%', A([['Edit', 'edit'], ['Log', 'db']])],
      ['<b>refund.processed</b>', 'https://finance.niko/hooks/refund', '99.6%', A([['Edit', 'edit'], ['Log', 'db']])],
      ['<b>booking.created</b>', 'https://ops.niko/hooks/booking', '97.8%', A([['Edit', 'edit'], ['Retry failed (86)', 'refresh']])],
      ['<b>vendor.approved</b>', 'https://crm.niko/hooks/vendor', '100%', A([['Edit', 'edit']])],
      ['<b>review.published</b>', 'https://bi.niko/hooks/review', '99.2%', A([['Edit', 'edit']])]
    ]), btn('Add webhook', 'plus', 'outline')))
    + modal('m-api', 'Generate API key', gridForm([
      fld('Key name *', inp('e.g. Vendor ERP — Rahim Electric')),
      fld('Key type *', sel(['Secret (server-side)', 'Public (client-side)', 'Restricted read-only'])),
      fld('Owner / team', sel(['Engineering', 'Finance', 'Marketing', 'Vendor', 'Affiliate partner'])),
      fld('Environment', sel(['Live', 'Sandbox'])),
      fld('Rate limit', inp('120 requests / minute')), fld('Expires on', inp('Never / choose date')),
      fld('IP allowlist', inp('103.x.x.x, 45.x.x.x')), fld('Webhook secret', inp('Auto-generated')),
      `<div class="sm:col-span-2"><p class="text-[12px] font-bold mb-2">Scopes</p><div class="flex flex-wrap gap-4">${['catalog:read', 'catalog:write', 'inventory:read', 'inventory:write', 'orders:read', 'orders:write', 'shipments:write', 'services:read', 'services:write', 'bookings:read', 'leads:read', 'customers:read', 'reviews:read', 'payouts:read', 'reports:read', 'webhooks:manage'].map(s => chk(s, /read/.test(s))).join('')}</div></div>`,
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Log every request', true)}${chk('Notify on suspicious usage', true)}${chk('Allow CORS from listed domains', false)}</div>`
    ]) + modalFoot('Generate key', 'API key generated'))
});
