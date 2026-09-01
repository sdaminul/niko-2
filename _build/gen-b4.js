/* Admin: notifications (push & broadcast), seo */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, hbars, donut, lineChart, modal, modalFoot } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('notifications.html', {
  title: 'Push & Broadcast', sub: 'Send push, SMS, email and in-app messages to customers, vendors and staff.', crumb: 'Push & broadcast',
  actions: [['Templates', 'copy'], ['Delivery report', 'chart'], ['New broadcast', 'plus', 'primary', 'data-modal-open="m-push"']],
  stats: [['Sent (30d)', '4.86 Cr', '+16%', 'bell', 'brand', 'Push + SMS + email'],
    ['Open rate', '18.6%', '+2.4%', 'eye', 'service', 'Push 24% · Email 12%'],
    ['SMS cost (30d)', tk(842000), '', 'money', 'gold', '4.2L messages'],
    ['Revenue attributed', tk(18400000), '+22%', 'chart', 'ink', 'Within 24 hrs of send']],
  tabs: [['Sent', '1,842'], ['Scheduled', '24'], ['Draft', '18'], ['Automated flows', '42'], ['Templates', '86'], ['Failed', '86'], ['Opt-outs', '18,420']],
  filters: ['search', ['Channel: All', 'Push (app)', 'Web push', 'SMS', 'Email', 'In-app inbox', 'WhatsApp'], ['Audience: All', 'All customers', 'Segment', 'Vendors', 'Staff', 'Single user'], ['Status: All', 'Sent', 'Scheduled', 'Draft', 'Failed'], 'date'],
  bulk: ['Duplicate', 'Cancel schedule', 'Delete'],
  head: ['Campaign / message', 'Channel', 'Audience', 'Recipients', 'Delivered', 'Opened', 'Clicked', 'Conversions', 'Revenue', 'Cost', 'Sent at', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>Eid Sale is live! 🎉</b><p class="text-[11px] text-ink-400">Up to 70% off — shop now</p>', bd('Push + In-app', 'blue'), 'All app users', '18,42,000', '17,86,420', '4,28,000 (24%)', '86,420', '12,480', '<b>' + tk(18400000) + '</b>', tk(0), '20 Aug, 10:00 AM', st('Sent'), A([['View report', 'chart'], ['Duplicate', 'copy'], ['Audience breakdown', 'users'], ['Export clicks', 'dl']])],
    ['<b>Flash sale starts in 1 hour</b>', bd('Push', 'blue'), 'Electronics shoppers', '4,86,000', '4,72,000', '1,24,000 (26%)', '28,400', '4,862', tk(8420000), tk(0), 'Tonight, 11:00 PM', st('Scheduled'), A([['Edit message', 'edit'], ['Preview', 'eye'], ['Send now', 'bolt'], ['Cancel', 'x', 1]])],
    ['<b>Your order has been delivered</b><p class="text-[11px] text-ink-400">Transactional flow</p>', bd('SMS + Push', 'green'), 'Order events', '4,12,000/mo', '4,08,420', '—', '86,000', '18,420 reviews', tk(0), tk(122400), 'Automated', st('Active'), A([['Edit flow', 'edit'], ['View template', 'file'], ['Delivery log', 'db']])],
    ['<b>Complete your KYC to receive payouts</b>', bd('Email + SMS', 'amber'), 'Vendors — unverified', '842', '840', '486 (58%)', '284', '184 completed', tk(0), tk(1680), '18 Aug, 09:00 AM', st('Sent'), A([['View report', 'chart'], ['Resend to non-openers', 'refresh']])],
    ['<b>We miss you — ' + tk(200) + ' off</b>', bd('Email', 'blue'), 'Inactive 90 days', '3,86,400', '3,72,000', '48,200 (13%)', '8,420', '1,842', tk(2840000), tk(18600), '15 Aug, 11:00 AM', st('Sent'), A([['View report', 'chart'], ['Duplicate', 'copy']])],
    ['<b>Price drop on your wishlist item</b>', bd('Push', 'blue'), 'Wishlist watchers', 'Dynamic', '—', '32%', '—', '—', tk(4820000), tk(0), 'Automated', st('Active'), A([['Edit flow', 'edit'], ['Performance', 'chart'], ['Pause', 'pause']])],
    ['<b>Winter sale teaser</b>', bd('Push', 'gray'), 'All customers', '—', '—', '—', '—', '—', '—', '—', 'Not sent', st('Draft'), A([['Edit', 'edit'], ['Schedule', 'cal'], ['Delete', 'trash', 1]])]
  ], total: 1842,
  after: row3(card('Automated flows', table([['Flow'], ['Trigger'], ['Channel'], ['Active'], ['', 'text-right']], [
    ['<b>Welcome series</b>', 'Signup', 'Email + Push', chk('', true), A([['Edit', 'edit']])],
    ['<b>Abandoned cart (3 steps)</b>', '1 hr / 24 hr / 3 days', 'Push + Email + SMS', chk('', true), A([['Edit', 'edit']])],
    ['<b>Order lifecycle updates</b>', 'Status change', 'SMS + Push', chk('', true), A([['Edit', 'edit']])],
    ['<b>Delivery review request</b>', '2 days after delivery', 'Push + Email', chk('', true), A([['Edit', 'edit']])],
    ['<b>Lead follow-up reminder</b>', 'Lead unanswered 2 hrs', 'Push to vendor', chk('', true), A([['Edit', 'edit']])],
    ['<b>Booking reminder</b>', '2 hrs before slot', 'SMS + Push', chk('', true), A([['Edit', 'edit']])],
    ['<b>Price drop alert</b>', 'Wishlist price change', 'Push', chk('', true), A([['Edit', 'edit']])],
    ['<b>Back in stock alert</b>', 'Stock refill', 'Push + Email', chk('', true), A([['Edit', 'edit']])],
    ['<b>Win-back (90 days idle)</b>', 'Inactivity', 'Email + SMS', chk('', true), A([['Edit', 'edit']])],
    ['<b>Vendor low-stock alert</b>', 'Stock below threshold', 'Push to vendor', chk('', true), A([['Edit', 'edit']])],
    ['<b>Payout processed</b>', 'Payout paid', 'Email + SMS', chk('', true), A([['Edit', 'edit']])],
    ['<b>Subscription renewal reminder</b>', '7 days before expiry', 'Email + In-app', chk('', true), A([['Edit', 'edit']])]
  ]), btn('Create flow', 'plus', 'outline')),
    card('Channel performance', `<div class="p-4 flex items-center gap-4">${donut([['Push', 62, '#ff2525'], ['Email', 22, '#2563eb'], ['SMS', 12, '#00b894'], ['In-app', 4, '#ffb020']], ['62%', 'Push'])}
<div class="flex-1">${kv([['Push open rate', '24%'], ['Email open rate', '12%'], ['SMS delivery rate', '98.6%'], ['Web push subscribers', '4,86,000'], ['Opt-out rate', '1.4%']])}</div></div>`),
    card('Sending policy', `<div class="p-4">${gridForm([fld('Max promo push per user / week', inp('4')), fld('Quiet hours', inp('11:00 PM – 8:00 AM')), fld('SMS sender ID', inp('NIKOBD')), fld('Email from name', inp('Niko Bangladesh'))], 1)}
${frows([['Respect quiet hours', 'No promotional messages at night.', true], ['Frequency capping', 'Limit promotional messages per user.', true], ['Allow unsubscribe link', 'Required in all promotional email.', true], ['A/B test subject lines', 'Split test with 10% of audience first.', true], ['Require approval before send', 'Broadcasts above 1L recipients need approval.', true]])}</div>`))
    + modal('m-push', 'New broadcast', gridForm([
      fld('Campaign name *', inp('e.g. Eid Sale launch push')),
      fld('Channels *', sel(['Push (app)', 'Push + In-app inbox', 'SMS', 'Email', 'Email + Push', 'All channels', 'WhatsApp'])),
      fld('Audience *', sel(['All customers', 'All app users', 'Segment: VIP', 'Segment: Inactive 90 days', 'Segment: Cart abandoners', 'Service-only users', 'All vendors', 'Vendors — unverified KYC', 'Staff', 'Upload CSV', 'Single user'])),
      fld('City / region filter', sel(['All Bangladesh', 'Dhaka', 'Chittagong', 'Sylhet'])),
      fld('Title / subject *', inp('Eid Sale is live! 🎉')),
      fld('Message *', ta('Up to 70% off on 18,000+ products. Free delivery above ' + tk(999) + '. Shop now!'), 'sm:col-span-2'),
      fld('Image / banner', inp('Upload (1024×512)')), fld('Deep link / URL', inp('/offers.html?c=eid')),
      fld('Send time', sel(['Send now', 'Schedule', 'Best time per user (AI)'])),
      fld('Schedule date & time', inp('23 Aug 2026 10:00 AM')),
      fld('Expiry (in-app)', inp('7 days')), fld('Priority', sel(['Normal', 'High', 'Transactional'])),
      fld('UTM campaign tag', inp('eid-sale-push')),
      fld('A/B variant B title', inp('Optional second headline to test'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Respect quiet hours', true)}${chk('Skip users messaged in last 24 hrs', true)}${chk('Track conversions', true)}${chk('Send test to me first', true)}${chk('Save as template', false)}</div>`
    ]) + modalFoot('Send broadcast', 'Broadcast queued'))
});

AD('seo.html', {
  title: 'SEO Manager', sub: 'Meta tags, URL slugs, sitemaps, redirects, schema markup and search performance.', crumb: 'SEO manager',
  actions: [['Regenerate sitemap', 'refresh'], ['Crawl audit', 'bolt'], ['Add redirect', 'plus', 'primary', 'data-modal-open="m-seo"']],
  stats: [['Organic sessions (30d)', '48,62,000', '+18%', 'globe', 'brand', '62% of total traffic'],
    ['Indexed pages', '18,42,000', '+4%', 'file', 'service', '842 excluded'],
    ['Avg. position', '8.4', '+1.2', 'chart', 'gold', '4,862 keywords in top 10'],
    ['SEO issues', '184', '-42', 'warn', 'ink', '18 critical']],
  tabs: [['Page SEO', '2,486'], ['Category SEO', '482'], ['Product SEO', '1,84,000'], ['Service SEO', '38,420'], ['Redirects', '842'], ['Sitemaps', '12'], ['Schema markup', '18'], ['Issues', '184'], ['Keywords', '48,620']],
  filters: ['search', ['Type: All', 'Static page', 'Category', 'Product', 'Service', 'Vendor shop', 'Blog'], ['Issue: All', 'Missing meta title', 'Duplicate title', 'Missing description', 'Thin content', 'Broken link', 'Missing alt text', 'Slow page'], ['Index: All', 'Indexed', 'Not indexed', 'Noindex']],
  bulk: ['Auto-generate meta', 'Set noindex', 'Rebuild sitemap', 'Export'],
  head: ['Page / URL', 'Type', 'Meta title', 'Meta description', 'Canonical', 'Index', 'Schema', 'Issues', 'Impressions', 'Clicks', 'Avg. position', ['Actions', 'text-right']],
  rows: [
    ['<b>/</b><p class="text-[11px] text-ink-400">Homepage</p>', bd('Static', 'blue'), 'Niko — Online Shopping & Local Services in Bangladesh <span class="text-ink-400">(62)</span>', 'Shop products and find trusted local services… <span class="text-ink-400">(148)</span>', 'Self', bd('Indexed', 'green'), 'Organization, WebSite, SearchAction', bd('None', 'green'), '84,20,000', '18,42,000', '1.2', A([['Edit SEO', 'edit'], ['Preview snippet', 'eye'], ['Schema editor', 'code'], ['Search console', 'globe']])],
    ['<b>/products.html?cat=smartphones</b>', bd('Category', 'blue'), 'Smartphones — Best Price in Bangladesh 2026 <span class="text-ink-400">(52)</span>', 'Buy smartphones online at the best price… <span class="text-ink-400">(156)</span>', 'Self', bd('Indexed', 'green'), 'BreadcrumbList, ItemList', bd('None', 'green'), '24,80,000', '4,86,000', '3.4', A([['Edit SEO', 'edit'], ['Preview snippet', 'eye'], ['Keyword report', 'chart']])],
    ['<b>/services.html?cat=ac-repair</b>', bd('Category', 'amber'), 'AC Repair Service in Dhaka — Niko <span class="text-ink-400">(42)</span>', 'Find verified AC repair technicians in Dhaka… <span class="text-ink-400">(142)</span>', 'Self', bd('Indexed', 'green'), 'LocalBusiness, FAQPage', bd('None', 'green'), '12,40,000', '2,84,000', '2.8', A([['Edit SEO', 'edit'], ['Local SEO', 'pin'], ['FAQ schema', 'code']])],
    ['<b>/product-details.html?id=8842</b>', bd('Product', 'gray'), 'Realme C100X 6/128GB… <span class="text-brand-600">(88 — too long)</span>', '<span class="text-brand-600">Missing</span>', 'Self', bd('Indexed', 'green'), 'Product, Offer, AggregateRating', bd('2 issues', 'amber'), '4,86,000', '86,000', '6.2', A([['Fix issues', 'warn'], ['Auto-generate meta', 'bolt'], ['Edit SEO', 'edit']])],
    ['<b>/shop-profile.html?v=1042</b>', bd('Vendor shop', 'gray'), 'Rahim Electric & Electronics — Niko Shop', 'Official shop of Rahim Electric on Niko…', 'Self', bd('Indexed', 'green'), 'Store, AggregateRating', bd('None', 'green'), '2,48,000', '48,600', '4.8', A([['Edit SEO', 'edit'], ['Preview snippet', 'eye']])],
    ['<b>/old-mobile-page.html</b>', bd('Redirect', 'gray'), '—', '—', '→ /products.html?cat=smartphones', bd('301', 'blue'), '—', bd('None', 'green'), '18,400', '0', '—', A([['Edit redirect', 'edit'], ['Delete', 'trash', 1]])],
    ['<b>/blog-details.html?id=42</b>', bd('Blog', 'gray'), 'How to Choose an AC for Bangladesh Weather', 'A practical buying guide for air conditioners…', 'Self', bd('Indexed', 'green'), 'Article, Author, FAQPage', bd('Thin content', 'amber'), '1,24,000', '28,400', '5.4', A([['Edit SEO', 'edit'], ['Improve content', 'edit']])]
  ], total: 2486,
  after: row3(card('SEO health & issues', `<div class="p-4">${table([['Issue'], ['Pages'], ['Severity'], ['', 'text-right']], [
    ['Missing meta description', '842', bd('High', 'red'), A([['Auto-fix', 'bolt'], ['View', 'eye']])],
    ['Duplicate meta titles', '486', bd('High', 'red'), A([['View', 'eye']])],
    ['Title too long (&gt;60 chars)', '1,842', bd('Medium', 'amber'), A([['Auto-fix', 'bolt']])],
    ['Missing image alt text', '4,862', bd('Medium', 'amber'), A([['Auto-fix', 'bolt']])],
    ['Broken internal links', '124', bd('High', 'red'), A([['View', 'eye']])],
    ['Thin content (&lt;300 words)', '2,480', bd('Low', 'gray'), A([['View', 'eye']])],
    ['Slow pages (LCP &gt; 2.5s)', '186', bd('High', 'red'), A([['Speed report', 'bolt']])],
    ['Orphan pages', '842', bd('Low', 'gray'), A([['View', 'eye']])]
  ])}</div>`),
    card('Search performance', `<div class="p-4">${lineChart([28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 45, 47, 48, 49], ['Mar', 'May', 'Jul', 'Aug'])}
${kv([['Top keyword', '"smartphone price in bd" — pos. 2'], ['Keywords in top 3', '1,842'], ['Keywords in top 10', '4,862'], ['Backlinks', '48,620'], ['Domain authority', '48']])}
<div class="flex gap-2 mt-3">${btn('Keyword tracker', 'chart')}${btn('Backlink report', 'globe')}</div></div>`),
    card('Technical SEO', `<div class="p-4">${gridForm([fld('Default title pattern', inp('{name} — {category} | Niko BD')), fld('Default description pattern', inp('Buy {name} at best price in Bangladesh…')), fld('robots.txt', ta('User-agent: *\nDisallow: /cart.html\nDisallow: /checkout.html\nSitemap: https://niko.com.bd/sitemap.xml')), fld('Sitemap frequency', sel(['Hourly', 'Daily', 'Weekly']))], 1)}
${frows([['Auto-generate meta for new items', 'Use patterns when vendors leave meta empty.', true], ['Canonical for filtered URLs', 'Point filter combinations to the base category.', true], ['Noindex thin vendor pages', 'Vendors with fewer than 3 products.', true], ['Enable hreflang (bn / en)', 'Bengali and English versions.', true], ['Structured data validation', 'Validate schema before publishing.', true]])}
<div class="p-4 pt-0 flex flex-wrap gap-2">${btn('View sitemap.xml', 'file')}${btn('robots.txt', 'file')}${btn('Run audit', 'bolt', 'primary')}</div></div>`))
    + modal('m-seo', 'Add redirect / edit SEO', gridForm([
      fld('Source URL *', inp('/old-mobile-page.html')), fld('Destination URL *', inp('/products.html?cat=smartphones')),
      fld('Redirect type', sel(['301 — permanent', '302 — temporary', '410 — gone', 'Canonical only'])),
      fld('Match type', sel(['Exact', 'Prefix', 'Regex pattern'])),
      fld('Meta title', inp('Smartphones — Best Price in Bangladesh 2026')),
      fld('Meta description', ta('Up to 155 characters'), 'sm:col-span-2'),
      fld('Focus keyword', inp('smartphone price in bangladesh')), fld('Secondary keywords', inp('mobile phone, android phone')),
      fld('Canonical URL', inp('Self')), fld('Index directive', sel(['index, follow', 'noindex, follow', 'index, nofollow', 'noindex, nofollow'])),
      fld('OG title', inp('Smartphones at best price — Niko')), fld('OG image', inp('Upload (1200×630)')),
      fld('Schema type', sel(['Auto (based on page type)', 'Product', 'ItemList', 'LocalBusiness', 'FAQPage', 'Article', 'BreadcrumbList'])),
      fld('Custom schema JSON-LD', ta('{ "@context": "https://schema.org", ... }'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Include in sitemap', true)}${chk('Ping search engines', true)}${chk('Track in keyword report', true)}</div>`
    ]) + modalFoot('Save', 'SEO settings saved'))
});
