/* Admin marketing: cms, campaigns, promotions, ads, notifications, seo */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, hbars, donut, lineChart, modal, modalFoot } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('cms.html', {
  title: 'Homepage & Banners', sub: 'Control every block on the storefront home page, sliders, banners and placements.', crumb: 'Homepage & banners',
  actions: [['Preview storefront', 'eye'], ['Reorder blocks', 'move'], ['Add banner', 'plus', 'primary', 'data-modal-open="m-ban"']],
  stats: [['Active banners', '48', '+6', 'image', 'brand', '12 placements'],
    ['Banner impressions (7d)', '1.24 Cr', '+8%', 'eye', 'service', 'CTR 2.8%'],
    ['Homepage blocks', '22', '', 'layers', 'gold', '18 visible now'],
    ['Scheduled changes', '6', '', 'cal', 'ink', 'Next: 25 Aug 00:00']],
  tabs: [['Banners', '48'], ['Home blocks', '22'], ['Sliders', '4'], ['Popups', '6'], ['App banners', '18'], ['Category banners', '124'], ['Scheduled', '6'], ['Expired', '186']],
  filters: ['search', ['Placement: All', 'Hero slider', 'Below hero', 'Mid-page strip', 'Category page', 'Product page', 'Cart page', 'App home', 'Popup'], ['Device: All', 'Desktop', 'Mobile', 'App'], ['Status: All', 'Active', 'Scheduled', 'Expired', 'Draft'], 'date'],
  bulk: ['Activate', 'Pause', 'Duplicate', 'Delete'],
  head: ['Banner', 'Placement', 'Device', 'Target link', 'Audience', 'Schedule', 'Impressions', 'Clicks', 'CTR', 'Priority', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<div class="flex items-center gap-2"><span class="ph w-16 h-9 rounded"></span><div><b>Eid Mega Sale hero</b><p class="text-[11px] text-ink-400">1920×640 · WebP</p></div></div>', 'Hero slider — slide 1', bd('Desktop + Mobile', 'blue'), '/offers.html?c=eid', 'All visitors', '20–31 Aug 2026', '48,20,000', '1,84,000', '<b class="text-service-600">3.8%</b>', '1', st('Active'), A([['Edit banner', 'edit'], ['Preview', 'eye'], ['Duplicate', 'copy'], ['Analytics', 'chart'], ['Pause', 'pause'], ['Delete', 'trash', 1]])],
    ['<div class="flex items-center gap-2"><span class="ph w-16 h-9 rounded"></span><div><b>Smartphone fest</b><p class="text-[11px] text-ink-400">1920×640</p></div></div>', 'Hero slider — slide 2', bd('Desktop', 'blue'), '/products.html?cat=smartphones', 'New visitors', '18–28 Aug 2026', '32,40,000', '86,000', '2.6%', '2', st('Active'), A([['Edit banner', 'edit'], ['Preview', 'eye'], ['Analytics', 'chart']])],
    ['<div class="flex items-center gap-2"><span class="ph w-16 h-9 rounded"></span><div><b>Service providers strip</b><p class="text-[11px] text-ink-400">1200×300</p></div></div>', 'Mid-page strip', bd('All', 'gray'), '/services.html', 'Returning users', 'Always on', '18,60,000', '42,000', '2.3%', '4', st('Active'), A([['Edit banner', 'edit'], ['Preview', 'eye']])],
    ['<div class="flex items-center gap-2"><span class="ph w-16 h-9 rounded"></span><div><b>App download popup</b><p class="text-[11px] text-ink-400">600×600</p></div></div>', 'Popup — after 20s', bd('Mobile web', 'amber'), 'App store link', 'Non-app users', 'Always on', '8,40,000', '38,000', '4.5%', '1', st('Active'), A([['Edit banner', 'edit'], ['Frequency cap', 'clock'], ['Pause', 'pause']])],
    ['<div class="flex items-center gap-2"><span class="ph w-16 h-9 rounded"></span><div><b>Winter collection teaser</b></div></div>', 'Hero slider — slide 3', bd('All', 'gray'), '/products.html?cat=winter', 'All visitors', '01–30 Nov 2026', '0', '0', '—', '3', st('Scheduled'), A([['Edit banner', 'edit'], ['Preview', 'eye'], ['Activate now', 'play'], ['Delete', 'trash', 1]])],
    ['<div class="flex items-center gap-2"><span class="ph w-16 h-9 rounded"></span><div><b>Ramadan grocery</b></div></div>', 'Category — Grocery', bd('All', 'gray'), '/products.html?cat=grocery', 'All visitors', '01–30 Mar 2026', '68,40,000', '2,40,000', '3.5%', '2', st('Expired'), A([['Duplicate for 2027', 'copy'], ['Analytics', 'chart'], ['Delete', 'trash', 1]])]
  ], total: 48,
  after: row2(card('Homepage block builder', table([['#'], ['Block'], ['Type'], ['Items'], ['Devices'], ['Visible'], ['', 'text-right']], [
    ['1', '<b>Top search bar & location</b>', 'System', '—', 'All', chk('', true), A([['Configure', 'cog']])],
    ['2', '<b>Hero slider</b>', 'Slider', '4 banners', 'All', chk('', true), A([['Edit items', 'edit'], ['Move', 'move']])],
    ['3', '<b>Quick category grid</b>', 'Categories', '16 tiles', 'All', chk('', true), A([['Edit items', 'edit'], ['Move', 'move']])],
    ['4', '<b>Service quick-request form</b>', 'Lead form', '—', 'All', chk('', true), A([['Configure', 'cog'], ['Move', 'move']])],
    ['5', '<b>Flash sale countdown</b>', 'Product carousel', '12 products', 'All', chk('', true), A([['Edit items', 'edit'], ['Move', 'move']])],
    ['6', '<b>Popular services near you</b>', 'Service carousel', '12 listings', 'All', chk('', true), A([['Edit items', 'edit'], ['Move', 'move']])],
    ['7', '<b>Top brands strip</b>', 'Brands', '18 brands', 'All', chk('', true), A([['Edit items', 'edit']])],
    ['8', '<b>Just for you (recommended)</b>', 'AI carousel', 'Dynamic', 'All', chk('', true), A([['Configure', 'cog']])],
    ['9', '<b>New arrivals</b>', 'Product grid', '24 products', 'All', chk('', true), A([['Edit items', 'edit']])],
    ['10', '<b>Category showcase — Electronics</b>', 'Category block', '8 + banner', 'Desktop', chk('', true), A([['Edit items', 'edit']])],
    ['11', '<b>Trust & USP strip</b>', 'Static', '4 items', 'All', chk('', true), A([['Edit content', 'edit']])],
    ['12', '<b>Blog & buying guides</b>', 'Blog block', '4 posts', 'All', chk('', false), A([['Edit items', 'edit']])],
    ['13', '<b>App download banner</b>', 'Static', '—', 'Mobile', chk('', true), A([['Edit content', 'edit']])],
    ['14', '<b>Newsletter subscribe</b>', 'Form', '—', 'All', chk('', true), A([['Configure', 'cog']])]
  ]), btn('Add block', 'plus', 'outline') + btn('Save order', 'check', 'primary', 'data-toast="Homepage layout saved"')),
    card('Banner performance', `<div class="p-4">${hbars([['Hero slider', 100, tk(4820000) + ' revenue'], ['Popup', 62, tk(1240000)], ['Mid-page strip', 48, tk(840000)], ['Category banners', 38, tk(620000)], ['App home', 74, tk(1840000)]])}
${kv([['Best performing banner', 'Eid Mega Sale (3.8% CTR)'], ['Worst performing', 'Winter teaser (0.4% CTR)'], ['Revenue attributed', tk(9360000)], ['Avg. CTR all placements', '2.8%']])}
<div class="flex gap-2 mt-3">${btn('Full report', 'chart')}${btn('A/B test banners', 'bolt')}</div></div>`))
    + modal('m-ban', 'Add banner', gridForm([
      fld('Banner title *', inp('e.g. Eid Mega Sale hero')),
      fld('Placement *', sel(['Hero slider', 'Below hero (3-up)', 'Mid-page strip', 'Category page top', 'Product page sidebar', 'Cart page', 'Checkout success', 'App home', 'Popup modal', 'Floating bar'])),
      fld('Desktop image (1920×640) *', inp('Upload / choose from media')),
      fld('Mobile image (768×480)', inp('Upload / choose from media')),
      fld('Alt text (SEO)', inp('Eid Mega Sale — up to 70% off')),
      fld('Link type', sel(['Internal page', 'Category', 'Product', 'Vendor shop', 'Campaign', 'External URL', 'No link'])),
      fld('Target URL', inp('/offers.html?c=eid')), fld('Open in', sel(['Same tab', 'New tab'])),
      fld('Audience', sel(['All visitors', 'New visitors', 'Returning users', 'Logged-in only', 'Guests only', 'Specific city', 'Segment'])),
      fld('City targeting', sel(['All Bangladesh', 'Dhaka', 'Chittagong', 'Sylhet'])),
      fld('Start date & time', inp('23 Aug 2026 00:00')), fld('End date & time', inp('31 Aug 2026 23:59')),
      fld('Priority / order', inp('1')), fld('Frequency cap (popups)', sel(['Once per session', 'Once per day', 'Once per user', 'No cap'])),
      fld('Overlay text', inp('Optional heading shown over image')), fld('Button label', inp('Shop now')),
      fld('Internal note', ta('Campaign owner, design reference…'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Publish immediately', true)}${chk('Track clicks', true)}${chk('Include in A/B test', false)}${chk('Show on app too', true)}</div>`
    ]) + modalFoot('Save banner', 'Banner saved'))
});

AD('campaigns.html', {
  title: 'Campaigns & Flash Sales', sub: 'Plan festival campaigns, flash sales, vendor participation and campaign budgets.', crumb: 'Campaigns',
  actions: [['Campaign calendar', 'cal'], ['Templates', 'copy'], ['Create campaign', 'plus', 'primary', 'data-modal-open="m-camp"']],
  stats: [['Running campaigns', '8', '', 'rocket', 'brand', '2 flash sales live'],
    ['Campaign GMV (30d)', tk(184000000), '+42%', 'money', 'service', '38% of total GMV'],
    ['Vendors participating', '4,862', '+18%', 'store', 'gold', '18,420 products'],
    ['Avg. discount funded', '18%', '', 'percent', 'ink', 'Platform share 4%']],
  tabs: [['Running', '8'], ['Scheduled', '12'], ['Flash sales', '6'], ['Draft', '4'], ['Ended', '86'], ['Vendor requests', '482'], ['Calendar', '']],
  filters: ['search', ['Type: All', 'Festival campaign', 'Flash sale', 'Category sale', 'Clearance', 'Free delivery', 'Cashback', 'Bundle'], ['Scope: All', 'Products', 'Services', 'Both'], ['Status: All', 'Running', 'Scheduled', 'Ended', 'Draft'], 'date'],
  bulk: ['Approve products', 'Extend', 'End now', 'Duplicate'],
  head: ['Campaign', 'Type', 'Scope', 'Period', 'Discount range', 'Products / Listings', 'Vendors', 'Orders', 'GMV', 'Budget used', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>Eid Mega Sale 2026</b><p class="text-[11px] text-ink-400">Banner + landing page + push</p>', bd('Festival', 'red'), 'Products + Services', '20–31 Aug 2026', '10–70%', '18,420', '4,862', '1,86,420', '<b>' + tk(184000000) + '</b>', tk(4820000) + ' / ' + tk(8000000), st('Running'), A([['View campaign', 'eye'], ['Landing page', 'globe'], ['Approved products', 'box'], ['Vendor requests (482)', 'store'], ['Edit campaign', 'edit'], ['Extend', 'cal'], ['End campaign', 'x', 1]])],
    ['<b>Midnight Flash — Electronics</b><p class="text-[11px] text-ink-400">12 AM – 3 AM</p>', bd('Flash sale', 'amber'), 'Products', 'Tonight 00:00–03:00', '20–60%', '842', '284', '0', tk(0), tk(0) + ' / ' + tk(500000), st('Scheduled'), A([['View campaign', 'eye'], ['Product list', 'box'], ['Stock check', 'pkg'], ['Push reminder', 'bell'], ['Edit', 'edit']])],
    ['<b>Free Home Service Visit</b>', bd('Service promo', 'blue'), 'Services', '15 Aug – 15 Sep 2026', 'Free inspection', '1,240 listings', '842', '18,420 bookings', tk(24800000), tk(840000) + ' / ' + tk(1500000), st('Running'), A([['View campaign', 'eye'], ['Provider list', 'store'], ['Edit', 'edit']])],
    ['<b>Grocery Weekly Deals</b>', bd('Category sale', 'blue'), 'Products', 'Every Friday', '5–30%', '2,480', '482', '48,620', tk(18400000), tk(420000) + ' / ' + tk(800000), st('Running'), A([['View campaign', 'eye'], ['Recurring settings', 'refresh'], ['Edit', 'edit']])],
    ['<b>11.11 Mega Sale</b>', bd('Festival', 'red'), 'Products + Services', '11 Nov 2026', 'TBD', '0', '0', '0', tk(0), tk(0) + ' / ' + tk(15000000), st('Draft'), A([['Edit campaign', 'edit'], ['Invite vendors', 'mail'], ['Build landing page', 'paint'], ['Delete', 'trash', 1]])],
    ['<b>Pohela Boishakh 1433</b>', bd('Festival', 'gray'), 'Products + Services', '10–16 Apr 2026', '10–50%', '12,480', '3,842', '1,24,000', tk(124000000), tk(6200000) + ' / ' + tk(6500000), st('Ended'), A([['Performance report', 'chart'], ['Duplicate for 1434', 'copy'], ['Archive', 'box']])]
  ], total: 8,
  after: row3(card('Campaign performance', `<div class="p-4">${lineChart([12, 18, 22, 28, 42, 68, 92, 124, 148, 168, 184, 176, 162, 148], ['20 Aug', '23 Aug', '26 Aug', '29 Aug'])}
${kv([['Peak hour GMV', tk(18400000) + ' (9–10 PM)'], ['Conversion uplift', '+186%'], ['New customers acquired', '84,620'], ['App share of orders', '68%'], ['Return rate during sale', '4.8%']])}</div>`),
    card('Vendor participation requests', table([['Vendor'], ['Products'], ['Discount'], ['', 'text-right']], [
      ['<b>Rahim Electric</b>', '48', 'Up to 40%', A([['Approve', 'check'], ['Review', 'eye']])],
      ['<b>Gadget World BD</b>', '124', 'Up to 55%', A([['Approve', 'check'], ['Review', 'eye']])],
      ['<b>Style Hub</b>', '242', 'Up to 70%', A([['Approve', 'check'], ['Review', 'eye']])],
      ['<b>Fresh Mart</b>', '86', 'Up to 25%', A([['Approve', 'check'], ['Review', 'eye']])],
      ['<b>Mobile Zone</b>', '18', 'Up to 15%', A([['Reject — low discount', 'x'], ['Review', 'eye']])]
    ]), btn('Approve all valid', 'check', 'outline')),
    card('Campaign rules', `<div class="p-4">${gridForm([fld('Min. discount to join', inp('10%')), fld('Max. discount allowed', inp('80%')), fld('Price increase check', sel(['Block if raised in 30 days', 'Warn only', 'Off'])), fld('Stock requirement', inp('Min. 10 units'))], 1)}
${frows([['Auto-approve trusted vendors', 'Vendors above 4.5 ★ join instantly.', true], ['Platform co-funding', 'Platform funds 4% of the discount.', true], ['Lock prices during campaign', 'Vendors cannot edit price mid-campaign.', true], ['Priority ranking for campaign items', 'Boost campaign products in search.', true]])}</div>`))
    + modal('m-camp', 'Create campaign', gridForm([
      fld('Campaign name *', inp('e.g. 11.11 Mega Sale')),
      fld('Campaign type *', sel(['Festival campaign', 'Flash sale', 'Category sale', 'Clearance', 'Free delivery', 'Cashback', 'Bundle offer', 'Service promo'])),
      fld('Scope', sel(['Products only', 'Services only', 'Products + Services'])),
      fld('Categories included', inp('Search categories…')),
      fld('Start date & time *', inp('11 Nov 2026 00:00')), fld('End date & time *', inp('11 Nov 2026 23:59')),
      fld('Min. discount', inp('10%')), fld('Max. discount', inp('80%')),
      fld('Platform co-funding', inp('4%')), fld('Total budget', inp(tk(15000000))),
      fld('Vendor joining', sel(['Open — vendors apply', 'Invite only', 'Auto-include all eligible'])),
      fld('Landing page slug', inp('/offers.html?c=1111')),
      fld('Banner set', sel(['Create new', 'Use existing set'])), fld('Push notification', sel(['Schedule 1 hr before', 'On start', 'None'])),
      fld('Coupon stacking', sel(['Allowed', 'Not allowed', 'Only platform coupons'])),
      fld('Free delivery threshold', inp(tk(999))),
      fld('Campaign description', ta('Shown on the landing page'), 'sm:col-span-2'),
      fld('Terms & conditions', ta('Campaign T&C shown to customers and vendors'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Show countdown timer', true)}${chk('Create landing page', true)}${chk('Notify all vendors', true)}${chk('Feature on app home', true)}${chk('Enable flash stock limits', true)}</div>`
    ]) + modalFoot('Create campaign', 'Campaign created'))
});
