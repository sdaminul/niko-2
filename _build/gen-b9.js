/* Admin system: settings, locations */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, tk, kv, note, fld, inp, sel, ta, chk, gridForm, frows, tabs, modal, modalFoot, svg } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;
const F = (t, rows, cols) => card(t, `<div class="p-4">${gridForm(rows, cols || 2)}</div>`);

AD('settings.html', {
  title: 'Platform Settings', sub: 'Global configuration for the marketplace, storefront, orders, services and security.', crumb: 'Platform settings',
  actions: [['Import config', 'up'], ['Export config', 'dl'], ['Save all changes', 'check', 'primary', 'data-toast="Settings saved"']],
  tabs: [['General', ''], ['Storefront', ''], ['Orders & checkout', ''], ['Services & bookings', ''], ['Vendors', ''], ['Customers', ''], ['SEO & analytics', ''], ['Notifications', ''], ['Security', ''], ['Legal & compliance', ''], ['Maintenance', '']],
  top: row2(F('General', [fld('Platform name *', inp('Niko')), fld('Tagline', inp('Everything local. Everything online.')),
    fld('Support email', inp('support@niko.com.bd')), fld('Support hotline', inp('16xxx')),
    fld('Head office address', ta('Level 8, Rangs Babylonia, Gulshan-1, Dhaka 1212'), 'sm:col-span-2'),
    fld('Logo (light)', inp('images/logo.svg')), fld('Logo (dark)', inp('images/logo-white.svg')),
    fld('Favicon', inp('images/favicon.svg')), fld('Default language', sel(['English', 'Bengali'])),
    fld('Secondary language', sel(['Bengali', 'None'])), fld('Timezone', sel(['Asia/Dhaka (GMT+6)', 'UTC'])),
    fld('Currency', sel(['BDT — ৳', 'USD — $'])), fld('Currency position', sel(['Before amount (৳1,200)', 'After amount (1,200৳)'])),
    fld('Number format', sel(['Indian (1,20,000)', 'International (120,000)'])), fld('Date format', sel(['DD MMM YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'])),
    fld('Weight unit', sel(['Kilogram (kg)', 'Gram (g)'])), fld('Dimension unit', sel(['Centimetre (cm)', 'Inch (in)']))]),
    F('Storefront', [fld('Home page layout', sel(['Default (hero + categories + deals)', 'Marketplace focus', 'Services focus'])),
      fld('Products per page', inp('40')), fld('Default product sort', sel(['Best match', 'Popularity', 'Newest', 'Price low → high'])),
      fld('Default service sort', sel(['Relevance', 'Top rated', 'Nearest', 'Most reviewed'])),
      fld('Products in "You may also like"', inp('12')), fld('Max compare items', inp('4')),
      fld('Recently viewed items kept', inp('20')), fld('Reviews per page', inp('10')),
      fld('Search suggestions', sel(['Products + services + shops', 'Products only', 'Disabled'])),
      fld('Guest browsing', sel(['Allowed', 'Login required'])),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Show prices to guests', true)}${chk('Enable wishlist', true)}${chk('Enable compare', true)}${chk('Enable product Q&A', true)}${chk('Show stock quantity', true)}${chk('Show vendor name on cards', true)}${chk('Enable dark mode toggle', false)}${chk('Show "Sold by" ratings', true)}</div>`])),
  after: row2(F('Orders & checkout', [fld('Minimum order value', inp('৳100')), fld('Maximum order value', inp('৳5,00,000')),
    fld('Free delivery threshold', inp('৳1,000')), fld('Guest checkout', sel(['Allowed', 'Not allowed'])),
    fld('Order number prefix', inp('NK-')), fld('Order auto-cancel if unpaid', inp('60 minutes')),
    fld('Auto-complete order after delivery', inp('7 days')), fld('Return window (default)', inp('7 days')),
    fld('Cancellation allowed until', sel(['Before shipment', 'Before delivery', 'Not allowed'])),
    fld('Max quantity per item', inp('10')),
    fld('COD limit', inp('৳20,000')), fld('Partial shipment', sel(['Allowed', 'Not allowed'])),
    `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Enable cash on delivery', true)}${chk('Enable online payment', true)}${chk('Enable EMI', true)}${chk('Enable wallet payment', true)}${chk('Enable gift cards', true)}${chk('Allow coupon stacking', false)}${chk('Require OTP for COD orders', true)}${chk('Split multi-vendor orders', true)}</div>`]),
    F('Services & bookings', [fld('Booking lead time (min)', inp('2 hours')), fld('Booking window (max)', inp('60 days')),
      fld('Default slot duration', inp('60 minutes')), fld('Free lead credits (new provider)', inp('10')),
      fld('Lead price — default', inp('৳30')), fld('Quote validity', inp('7 days')),
      fld('Cancellation window (customer)', inp('4 hours before slot')), fld('No-show penalty (provider)', inp('৳200')),
      fld('Provider response SLA', inp('30 minutes')), fld('Booking advance payment', sel(['Full amount', 'Partial (20%)', 'Pay after service'])),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Enable instant booking', true)}${chk('Enable quote requests', true)}${chk('Enable call-back requests', true)}${chk('Show provider phone after booking only', true)}${chk('Mask provider phone number', true)}${chk('Allow service area radius pricing', true)}${chk('Require provider KYC before going live', true)}</div>`]))
    + row2(F('Vendors', [fld('New shop approval', sel(['Manual approval', 'Auto-approve with KYC', 'Auto-approve all'])),
      fld('Product approval', sel(['Manual for new vendors', 'Manual for all', 'Auto-approve'])),
      fld('Default commission', inp('12%')), fld('Payout cycle', sel(['Weekly (Sunday)', 'Bi-weekly', 'Monthly'])),
      fld('Minimum payout amount', inp('৳1,000')), fld('Payout hold period', inp('7 days after delivery')),
      fld('Max products (basic plan)', inp('200')), fld('Max images per product', inp('8')),
      fld('Staff accounts per vendor', inp('5')), fld('Shop URL pattern', inp('/shop-profile.html?shop=slug')),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Require trade licence', true)}${chk('Require NID verification', true)}${chk('Require bank account', true)}${chk('Allow vendor coupons', true)}${chk('Allow vendor ads & boost', true)}${chk('Allow vendor-managed shipping', true)}${chk('Show vendor performance score publicly', true)}${chk('Block vendor from seeing customer phone', true)}</div>`]),
      F('Customers & accounts', [fld('Registration method', sel(['Phone OTP + email', 'Phone OTP only', 'Email only'])),
        fld('Social login', sel(['Google + Facebook', 'Google only', 'Disabled'])),
        fld('Referral reward (referrer)', inp('৳100 voucher')), fld('Referral reward (friend)', inp('৳50 voucher')),
        fld('Reward points per ৳100', inp('1 point')), fld('Point value', inp('৳1 = 1 point')),
        fld('Wallet cash-out', sel(['Allowed to bank/MFS', 'Store credit only'])), fld('Inactive account cleanup', inp('After 36 months')),
        `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Email verification required', true)}${chk('Phone verification required', true)}${chk('Allow account deletion', true)}${chk('Enable loyalty programme', true)}${chk('Enable referral programme', true)}${chk('Allow multiple addresses', true)}${chk('Enable customer wallet', true)}${chk('Allow reviews without purchase', false)}</div>`]))
    + row3(F('SEO & analytics', [fld('Meta title pattern', inp('{page} | Niko Bangladesh')),
      fld('Meta description default', ta('Shop products and hire trusted local services on Niko.')),
      fld('Google Analytics 4 ID', inp('G-XXXXXXXXXX')), fld('Google Tag Manager', inp('GTM-XXXXXXX')),
      fld('Facebook Pixel ID', inp('1234567890')), fld('TikTok Pixel', inp('C4XXXXXXXX')),
      fld('Google Search Console', inp('Verified')), fld('Robots.txt', ta('User-agent: *\nAllow: /\nSitemap: https://niko.com.bd/sitemap.xml')),
      `<div class="flex flex-wrap gap-4">${chk('Auto-generate sitemap', true)}${chk('Product schema markup', true)}${chk('Local business schema', true)}${chk('Canonical URLs', true)}${chk('Noindex out-of-stock pages', false)}</div>`], 1),
      F('Notifications', [fld('Push provider', sel(['Firebase Cloud Messaging', 'OneSignal'])),
        fld('Default notification language', sel(['English', 'Bengali'])),
        fld('Quiet hours', inp('11:00 PM – 8:00 AM')), fld('Max marketing pushes / week', inp('3')),
        `<div class="flex flex-wrap gap-4">${chk('Order updates (SMS)', true)}${chk('Order updates (email)', true)}${chk('Order updates (push)', true)}${chk('Booking reminders', true)}${chk('Price drop alerts', true)}${chk('Back-in-stock alerts', true)}${chk('Abandoned cart reminders', true)}${chk('Review requests', true)}${chk('Vendor lead alerts', true)}${chk('Payout notifications', true)}</div>`], 1),
      F('Security', [fld('Admin session timeout', inp('30 minutes')), fld('Password minimum length', inp('8 characters')),
        fld('Failed login lockout', inp('5 attempts / 15 min')), fld('OTP validity', inp('3 minutes')),
        fld('OTP resend limit', inp('3 per 10 minutes')), fld('Admin IP allowlist', ta('103.x.x.x, 45.x.x.x')),
        `<div class="flex flex-wrap gap-4">${chk('Force 2FA for admin & staff', true)}${chk('Force 2FA for vendors', false)}${chk('reCAPTCHA on login & signup', true)}${chk('Block VPN / proxy checkout', false)}${chk('Encrypt KYC documents at rest', true)}${chk('Mask customer phone in vendor panel', true)}${chk('Log every admin action', true)}</div>`], 1))
    + row2(F('Legal & compliance', [fld('Company legal name', inp('Niko Technologies Ltd.')), fld('Trade licence no.', inp('TRAD/DSCC/123456/2024')),
      fld('BIN / VAT registration', inp('004123456789')), fld('TIN', inp('123456789012')),
      fld('E-commerce licence (DBID)', inp('DBID-2024-08842')), fld('Consumer rights helpline', inp('16121')),
      fld('Terms version', inp('v4.2 — 04 Jul 2026')), fld('Privacy policy version', inp('v3.8 — 04 Jul 2026')),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Show cookie consent banner', true)}${chk('Require terms acceptance at signup', true)}${chk('Age gate for restricted categories', true)}${chk('Data export on user request', true)}${chk('Right to be forgotten workflow', true)}${chk('Store invoices for 6 years', true)}</div>`]),
      card('Maintenance mode & danger zone', `<div class="p-4">${gridForm([fld('Maintenance message', ta('We are upgrading Niko. We will be back within 30 minutes.'), 'sm:col-span-2'),
        fld('Allowed IPs during maintenance', inp('Office IP range')), fld('Estimated back-online time', inp('23 Aug 2026, 3:00 AM'))])}
${frows([['Storefront maintenance mode', 'Show a maintenance page to all visitors.', false],
  ['Vendor panel maintenance', 'Temporarily block vendor logins.', false],
  ['Disable new registrations', 'Stop new customer and vendor signups.', false],
  ['Disable checkout', 'Allow browsing but block new orders.', false],
  ['Read-only mode', 'No writes to the database.', false]])}
<div class="p-4 pt-0">${note('Danger zone — these actions affect the entire platform and are logged in the audit trail.', 'brand', 'warn')}
<div class="flex flex-wrap gap-2 mt-2">${btn('Clear cache', 'refresh')}${btn('Rebuild search index', 'search')}${btn('Recalculate vendor ratings', 'star')}${btn('Purge CDN', 'cloud')}${btn('Reset demo data', 'trash', 'outline')}</div></div></div>`))
});

AD('locations.html', {
  title: 'Locations & Zones', sub: 'Divisions, districts, cities, areas, delivery zones and service coverage.', crumb: 'Locations & zones',
  actions: [['Import CSV', 'up'], ['Export', 'dl'], ['Add zone', 'plus'], ['Add location', 'plus', 'primary', 'data-modal-open="m-loc"']],
  stats: [['Divisions', '8', '', 'pin', 'brand', '64 districts'],
    ['Cities & upazilas', '492', '+12', 'grid', 'service', '4,862 areas mapped'],
    ['Delivery zones', '24', '', 'truck', 'gold', 'Same-day in 6 zones'],
    ['Service coverage', '86%', '+4%', 'wrench', 'ink', 'By population']],
  tabs: [['All locations', '4,862'], ['Divisions', '8'], ['Districts', '64'], ['Cities', '492'], ['Areas', '4,862'], ['Delivery zones', '24'], ['Service zones', '18'], ['Not covered', '682'], ['Pickup hubs', '48']],
  filters: ['search', ['Division: All', 'Dhaka', 'Chattogram', 'Khulna', 'Rajshahi', 'Sylhet', 'Barishal', 'Rangpur', 'Mymensingh'], ['Type: All', 'Division', 'District', 'City', 'Upazila', 'Area / thana'], ['Delivery: All', 'Same-day', 'Next-day', '2–3 days', 'Not covered'], ['Status: All', 'Active', 'Inactive']],
  bulk: ['Activate', 'Deactivate', 'Assign zone', 'Set delivery charge', 'Delete'],
  head: ['Location', 'Type', 'Parent', 'Postal code', 'Delivery zone', 'Delivery charge', 'Delivery time', 'COD', 'Vendors', 'Orders (30d)', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>Gulshan</b>', bd('Area', 'blue'), 'Dhaka North', '1212', 'Zone A — Dhaka Metro', tk(60), 'Same-day', bd('Available', 'green'), '842', '18,420', st('Active'), A([['Edit location', 'edit'], ['Set charges', 'money'], ['Coverage map', 'pin'], ['Assign zone', 'layers'], ['Deactivate', 'ban', 1]])],
    ['<b>Mirpur</b>', bd('Area', 'blue'), 'Dhaka North', '1216', 'Zone A — Dhaka Metro', tk(60), 'Same-day', bd('Available', 'green'), '1,240', '24,860', st('Active'), A([['Edit location', 'edit'], ['Set charges', 'money'], ['Coverage map', 'pin']])],
    ['<b>Uttara Sector 7</b>', bd('Area', 'blue'), 'Dhaka North', '1230', 'Zone A — Dhaka Metro', tk(60), 'Same-day', bd('Available', 'green'), '648', '12,480', st('Active'), A([['Edit location', 'edit'], ['Set charges', 'money']])],
    ['<b>Savar</b>', bd('Upazila', 'gray'), 'Dhaka', '1340', 'Zone B — Dhaka Suburb', tk(90), 'Next-day', bd('Available', 'green'), '186', '4,862', st('Active'), A([['Edit location', 'edit'], ['Set charges', 'money']])],
    ['<b>Chattogram City</b>', bd('City', 'amber'), 'Chattogram', '4000', 'Zone C — Chattogram', tk(110), 'Next-day', bd('Available', 'green'), '2,480', '48,620', st('Active'), A([['Edit location', 'edit'], ['Set charges', 'money'], ['Coverage map', 'pin']])],
    ['<b>Sylhet City</b>', bd('City', 'amber'), 'Sylhet', '3100', 'Zone D — Outside Dhaka', tk(130), '2–3 days', bd('Available', 'green'), '842', '18,420', st('Active'), A([['Edit location', 'edit'], ['Set charges', 'money']])],
    ['<b>Kuakata</b>', bd('Area', 'blue'), 'Patuakhali', '8650', 'Zone E — Remote', tk(180), '3–5 days', bd('Not available', 'red'), '18', '284', st('Active'), A([['Edit location', 'edit'], ['Set charges', 'money'], ['Enable COD', 'check']])],
    ['<b>Rangamati Hill Area</b>', bd('Area', 'blue'), 'Rangamati', '4500', '—', '—', 'Not covered', bd('Not available', 'red'), '4', '42', st('Inactive'), A([['Edit location', 'edit'], ['Add to zone', 'layers'], ['Activate', 'check']])]
  ], total: 4862,
  after: row2(card('Delivery zones & charges', table([['Zone'], ['Coverage'], ['Base charge'], ['Per kg extra'], ['Delivery time'], ['Same-day'], ['COD'], ['', 'text-right']], [
    ['<b>Zone A — Dhaka Metro</b>', '186 areas', tk(60), tk(20), '4–24 hrs', bd('Yes', 'green'), bd('Yes', 'green'), A([['Edit zone', 'edit'], ['Areas (186)', 'pin']])],
    ['<b>Zone B — Dhaka Suburb</b>', '48 areas', tk(90), tk(25), '1–2 days', bd('No', 'gray'), bd('Yes', 'green'), A([['Edit zone', 'edit'], ['Areas (48)', 'pin']])],
    ['<b>Zone C — Chattogram</b>', '124 areas', tk(110), tk(30), '1–2 days', bd('Selected areas', 'amber'), bd('Yes', 'green'), A([['Edit zone', 'edit'], ['Areas (124)', 'pin']])],
    ['<b>Zone D — Outside Dhaka</b>', '3,842 areas', tk(130), tk(35), '2–3 days', bd('No', 'gray'), bd('Yes', 'green'), A([['Edit zone', 'edit'], ['Areas', 'pin']])],
    ['<b>Zone E — Remote / hill tracts</b>', '482 areas', tk(180), tk(45), '3–5 days', bd('No', 'gray'), bd('No', 'red'), A([['Edit zone', 'edit'], ['Areas', 'pin']])],
    ['<b>Zone F — Not covered</b>', '682 areas', '—', '—', '—', bd('No', 'gray'), bd('No', 'red'), A([['Request courier', 'truck']])]
  ]), btn('Create delivery zone', 'plus', 'outline')),
    card('Service coverage & pickup hubs', `<div class="p-4">${table([['Service zone'], ['Providers'], ['Categories'], ['', 'text-right']], [
      ['<b>Dhaka North</b>', '4,862', '128', A([['Edit', 'edit'], ['Map', 'pin']])],
      ['<b>Dhaka South</b>', '3,842', '124', A([['Edit', 'edit'], ['Map', 'pin']])],
      ['<b>Gazipur & Savar</b>', '842', '86', A([['Edit', 'edit'], ['Map', 'pin']])],
      ['<b>Chattogram Metro</b>', '2,480', '112', A([['Edit', 'edit'], ['Map', 'pin']])],
      ['<b>Sylhet Metro</b>', '648', '74', A([['Edit', 'edit'], ['Map', 'pin']])],
      ['<b>Khulna Metro</b>', '486', '68', A([['Edit', 'edit'], ['Map', 'pin']])]
    ])}
<div class="p-3">${kv([['Pickup hubs', '48 across 12 cities'], ['Warehouse locations', '6'], ['Return centres', '4'], ['Cash collection points', '18'], ['Uncovered demand (searches)', '4,862 / month']])}
<div class="flex flex-wrap gap-2 mt-2">${btn('Manage pickup hubs', 'store')}${btn('Uncovered demand report', 'chart')}${btn('Bulk update charges', 'money')}</div></div></div>`))
    + modal('m-loc', 'Add location', gridForm([
      fld('Location name *', inp('e.g. Bashundhara R/A')),
      fld('Type *', sel(['Division', 'District', 'City / Upazila', 'Area / Thana'])),
      fld('Parent location *', sel(['Dhaka North', 'Dhaka South', 'Chattogram', 'Sylhet', 'Khulna'])),
      fld('Bengali name', inp('বসুন্ধরা আবাসিক')),
      fld('Postal code', inp('1229')), fld('Delivery zone', sel(['Zone A — Dhaka Metro', 'Zone B — Dhaka Suburb', 'Zone C — Chattogram', 'Zone D — Outside Dhaka', 'Zone E — Remote'])),
      fld('Service zone', sel(['Dhaka North', 'Dhaka South', 'Gazipur & Savar', 'None'])),
      fld('Latitude / Longitude', inp('23.8103, 90.4125')),
      fld('Delivery charge override', inp('Leave blank to use zone charge')), fld('Delivery time', sel(['Same-day', 'Next-day', '2–3 days', '3–5 days'])),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Active', true)}${chk('Cash on delivery available', true)}${chk('Same-day delivery available', true)}${chk('Service providers allowed', true)}${chk('Show in location picker', true)}</div>`
    ]) + modalFoot('Add location', 'Location added'))
});
