/* Vendor: promotions, ads, academy, notifications, settings */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, svg, ph, stars, tk, prow, hbars, lineChart, barChart, donut, mini, tiles, kv, note, fld, inp, sel, ta, sw, chk, gridForm, frows, formCard, people, timeline, bars, modal, modalFoot, tfoot, empty } = K;
const { V, btn, A, row2, row3, side } = R;

/* --------------------------- PROMOTIONS -------------------------------- */
V('promotions.html', {
  title: 'Promotions & Vouchers', sub: 'Create discounts, seller vouchers, bundles and flash deals for your shop.', crumb: 'Promotions',
  actions: [['Join campaigns', 'rocket'], ['Promotion guide', 'book'], ['Create promotion', 'plus', 'primary', 'data-modal-open="m-promo"']],
  stats: [['Active promotions', '9', '+3', 'ticket', 'brand', '2 ending this week'],
    ['Promo revenue', tk(184600), '+28%', 'money', 'service', '35% of total sales'],
    ['Vouchers claimed', '1,842', '+42%', 'gift', 'gold', '62% redemption rate'],
    ['Avg. order uplift', '+18%', '', 'up', 'ink', 'On promo orders']],
  top: `<div class="grid lg:grid-cols-4 gap-4 mb-4">${[
    ['ticket', 'Discount voucher', 'Fixed or % off with a code', 'brand'],
    ['percent', 'Product discount', 'Direct price cut on products', 'service'],
    ['layers', 'Bundle deal', 'Buy 2 get 1, combo packs', 'gold'],
    ['bolt', 'Flash sale', 'Time-limited deep discount', 'ink']
  ].map(t => `<button class="card p-4 text-left hover:border-brand-300 transition" data-modal-open="m-promo">
<span class="w-10 h-10 rounded-xl bg-${t[3]}-50 text-${t[3]}-600 grid place-items-center mb-2.5">${svg(t[0], 'w-5 h-5')}</span>
<p class="text-[13px] font-extrabold">${t[1]}</p><p class="text-[11.5px] text-ink-400 mt-0.5">${t[2]}</p>
<span class="text-[11.5px] font-bold text-brand-600 mt-2 inline-flex items-center gap-1">Create ${svg('chevR', 'w-3 h-3')}</span></button>`).join('')}</div>`,
  tabs: [['All', '32'], ['Active', '9'], ['Scheduled', '4'], ['Expired', '17'], ['Paused', '2'], ['Platform campaigns', '5']],
  filters: ['search', ['All types', 'Voucher', 'Product discount', 'Bundle', 'Flash sale', 'Free shipping'], ['All statuses', 'Active', 'Scheduled', 'Expired', 'Paused'], 'date', ['Sort: Newest', 'Best performing']],
  fbtns: btn('Export', 'dl'),
  bulk: ['Activate', 'Pause', 'Duplicate', 'Delete', 'Export'],
  head: ['Promotion', 'Type', 'Discount', 'Code', 'Applies to', 'Period', 'Used / limit', 'Revenue', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>Eid Mega Sale</b><p class="text-[11px] text-ink-400">Min. spend ৳1,000</p>', '<span class="badge badge-red">Voucher</span>', '15% up to ৳500', '<code class="text-[11.5px] font-bold">EID15</code>', 'All products', '10–25 Aug 2026', '<b>642</b> / 1,000<div class="pbar mt-1"><i style="width:64%"></i></div>', tk(84200), st('Active'), A([['View performance', 'chart'], ['Edit', 'edit'], ['Copy code', 'copy'], ['Duplicate', 'copy'], ['Pause', 'pause'], ['End now', 'x', 1]])],
    ['<b>Flash Friday — AC clearance</b>', '<span class="badge badge-amber">Flash sale</span>', 'Up to 32% off', '—', '12 products (Air conditioners)', '21 Aug, 12–6 PM', '<b>84</b> / 120 units', tk(42800), st('Scheduled'), A([['Edit', 'edit'], ['Preview', 'eye'], ['Start now', 'bolt'], ['Cancel', 'x', 1]])],
    ['<b>Free delivery Dhaka</b>', '<span class="badge badge-green">Free shipping</span>', 'Free above ৳2,000', '<code class="text-[11.5px] font-bold">FREEDHK</code>', 'Dhaka city only', '01 Aug – 30 Sep', '<b>418</b> / unlimited', tk(31600), st('Active'), A([['Edit', 'edit'], ['Performance', 'chart'], ['Pause', 'pause']])],
    ['<b>Buy 2 get 1 — LED bulbs</b>', '<span class="badge badge-blue">Bundle</span>', '3rd item free', '—', '6 products', '05 Aug – 05 Sep', '<b>212</b> bundles', tk(18400), st('Active'), A([['Edit', 'edit'], ['Performance', 'chart'], ['Pause', 'pause']])],
    ['<b>New customer 10%</b>', '<span class="badge badge-red">Voucher</span>', '10% up to ৳200', '<code class="text-[11.5px] font-bold">WELCOME10</code>', 'First order only', 'Always on', '<b>386</b> / unlimited', tk(7600), st('Active'), A([['Edit', 'edit'], ['Performance', 'chart']])],
    ['<b>Service combo — AC service + gas</b>', '<span class="badge badge-blue">Bundle</span>', 'Save ৳600', '—', '2 services', '01–31 Aug', '<b>48</b> bookings', tk(16800), st('Active'), A([['Edit', 'edit'], ['Performance', 'chart']])],
    ['<b>Boishakhi Offer 2026</b>', '<span class="badge badge-gray">Voucher</span>', '12% up to ৳400', '<code class="text-[11.5px] font-bold">BOISHAKH12</code>', 'All products', '10–20 Apr 2026', '<b>1,204</b> / 1,200', tk(146200), st('Expired'), A([['View report', 'chart'], ['Duplicate', 'copy'], ['Delete', 'trash', 1]])],
    ['<b>Monsoon 5% cashback</b>', '<span class="badge badge-gray">Voucher</span>', '5% cashback', '<code class="text-[11.5px] font-bold">RAIN5</code>', 'Selected 42 products', '01–15 Jul 2026', '<b>96</b> / 500', tk(9800), st('Paused'), A([['Resume', 'play'], ['Edit', 'edit'], ['Delete', 'trash', 1]])]
  ], total: 32,
  after: row2(card('Platform campaigns you can join', `<div class="p-4 space-y-2.5">
${[['11.11 Mega Sale', 'Registration closes 25 Oct · Min 20% discount required', 'Open', 'green'], ['Independence Day Sale', 'Runs 20–28 Mar · Homepage placement for top sellers', 'Upcoming', 'amber'], ['Electronics Week', 'Runs 05–12 Sep · Category banner + push notification', 'Open', 'green'], ['Free Delivery Fest', 'Platform shares 50% of shipping cost', 'Joined', 'blue'], ['Service Month — Home Care', 'Featured service provider slots', 'Open', 'green']].map(c => `<div class="flex items-center gap-3 p-3 rounded-xl border border-[#e7e9ef]">
${svg('rocket', 'w-8 h-8 text-brand-400 shrink-0')}<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold clamp-1">${c[0]}</p><p class="text-[11.5px] text-ink-400 clamp-1">${c[1]}</p></div>
<span class="badge badge-${c[3]} shrink-0">${c[2]}</span><button class="btn btn-xs ${c[2] === 'Joined' ? 'btn-outline' : 'btn-primary'} shrink-0">${c[2] === 'Joined' ? 'Manage' : 'Join'}</button></div>`).join('')}</div>`),
    card('Promotion performance', `<div class="p-4">${hbars([['Eid Mega Sale', 92, tk(84200)], ['Flash Friday', 58, tk(42800), '#ffb020'], ['Free delivery Dhaka', 42, tk(31600), '#00b894'], ['Buy 2 get 1', 26, tk(18400), '#6c7a91'], ['Service combo', 22, tk(16800), '#8b5cf6'], ['New customer 10%', 12, tk(7600), '#b42318']])}
${mini([[tk(184600), 'Promo revenue'], ['1,842', 'Vouchers used'], ['+18%', 'AOV uplift']])}</div>`))
    + modal('m-promo', 'Create promotion', gridForm([
      fld('Promotion type *', sel(['Discount voucher (code)', 'Direct product discount', 'Bundle / combo deal', 'Flash sale', 'Free shipping', 'Buy X get Y', 'Cashback'])),
      fld('Promotion name *', inp('e.g. Eid Mega Sale')),
      fld('Voucher code', `<div class="flex gap-2">${inp('e.g. EID15')}<button class="btn btn-sm btn-outline shrink-0">${svg('refresh')}Generate</button></div>`),
      fld('Discount type', sel(['Percentage (%)', 'Fixed amount (৳)', 'Free shipping', 'Free gift'])),
      fld('Discount value *', inp('e.g. 15')), fld('Maximum discount cap', inp('e.g. 500')),
      fld('Minimum order value', inp('e.g. 1000')), fld('Usage limit (total)', inp('e.g. 1000')),
      fld('Usage limit per customer', sel(['1 time', '2 times', '3 times', 'Unlimited'])), fld('Customer eligibility', sel(['All customers', 'New customers only', 'Returning customers', 'Gold members', 'Specific customers'])),
      fld('Applies to', sel(['All products', 'Selected products', 'Selected categories', 'Selected brands', 'Services only', 'Products above a price'])),
      fld('Select products / categories', inp('Search and select…')),
      fld('Start date & time', inp('', '', 'datetime-local')), fld('End date & time', inp('', '', 'datetime-local')),
      fld('Delivery zones', sel(['All Bangladesh', 'Dhaka city only', 'Inside Dhaka + Chattogram', 'Custom zones'])),
      fld('Stackable with other promos', sel(['No — cannot combine', 'Yes — can combine'])),
      fld('Display banner text', inp('Shown on product page, e.g. "15% OFF with code EID15"'), 'sm:col-span-2'),
      fld('Terms & conditions', ta('Optional T&C shown to customers'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Show on my shop page', true)}${chk('Push notification to followers', true)}${chk('Auto-apply at checkout when eligible', false)}${chk('Exclude already-discounted items', true)}</div>`
    ]) + modalFoot('Create promotion', 'Promotion created'))
});

/* ------------------------------- ADS ---------------------------------- */
V('ads.html', {
  title: 'Ads & Boost', sub: 'Promote your products and services with sponsored placements.', crumb: 'Ads & boost',
  actions: [['Ads guide', 'book'], ['Top-up balance', 'wallet'], ['Create campaign', 'plus', 'primary', 'data-modal-open="m-ad"']],
  stats: [['Ad balance', tk(3500), '', 'wallet', 'brand', 'Top up to keep ads running'],
    ['Spend (Aug)', tk(6500), '+22%', 'money', 'gold', 'Across 4 campaigns'],
    ['Ad revenue', tk(42800), '+34%', 'up', 'service', 'ROAS 6.6×'],
    ['Impressions', '184.2K', '+18%', 'eye', 'ink', 'CTR 3.8% · 6,984 clicks']],
  top: row3(card('Spend vs revenue', `<div class="p-4">${barChart([[18, 62], [22, 74], [16, 58], [28, 92], [24, 78], [20, 68], [26, 88]], ['#ff2525', '#00b894'], 150)}
<div class="flex gap-3 text-[11.5px] text-ink-500 mt-2 justify-center"><span class="flex items-center gap-1.5"><i class="legend-dot" style="background:#ff2525"></i>Spend</span><span class="flex items-center gap-1.5"><i class="legend-dot" style="background:#00b894"></i>Revenue</span></div></div>`),
    card('Ad type performance', `<div class="p-4">${hbars([['Search ads', 86, 'ROAS 7.4×'], ['Product boost', 68, 'ROAS 6.2×', '#00b894'], ['Category banner', 44, 'ROAS 4.8×', '#ffb020'], ['Service featured', 38, 'ROAS 5.6×', '#8b5cf6'], ['Shop follow ads', 22, 'ROAS 3.2×', '#6c7a91']])}</div>`),
    card('Ad balance & auto top-up', `<div class="p-4">
<div class="p-3.5 rounded-xl bg-brand-50 mb-3"><p class="text-[11.5px] font-bold text-brand-600 uppercase tracking-wide">Available ad credit</p>
<p class="text-[24px] font-extrabold text-brand-700 leading-tight">${tk(3500)}</p><p class="text-[11.5px] text-ink-500">Enough for ~4 days at current spend</p></div>
${gridForm([fld('Top-up amount', sel(['৳1,000', '৳2,500', '৳5,000', '৳10,000', 'Custom'])), fld('Pay with', sel(['Seller balance', 'bKash', 'Card', 'Nagad']))], 1)}
<div class="mt-3">${frows([['Auto top-up', 'Add ৳2,000 when balance drops below ৳500.', true], ['Daily spend cap', 'Never exceed ৳1,000 per day.', true]])}</div>
<button class="btn btn-sm btn-primary btn-block mt-3" data-toast="Ad balance topped up">${svg('wallet')}Top up now</button></div>`)),
  tabs: [['All campaigns', '18'], ['Active', '4'], ['Scheduled', '2'], ['Paused', '3'], ['Ended', '9'], ['Rejected', '0']],
  filters: ['search', ['All types', 'Search ads', 'Product boost', 'Category banner', 'Service featured', 'Shop ads'], ['All statuses', 'Active', 'Paused', 'Ended'], 'date', ['Sort: Best ROAS', 'Highest spend', 'Newest']],
  fbtns: btn('Export', 'dl'),
  bulk: ['Pause', 'Resume', 'Duplicate', 'Adjust budget', 'End campaign'],
  head: ['Campaign', 'Type', 'Target', 'Budget', 'Spent', 'Impr.', 'Clicks', 'CTR', 'Orders', 'Revenue', 'ROAS', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>Realme C100X — search</b><p class="text-[11px] text-ink-400">CMP-2841 · 10–25 Aug</p>', '<span class="badge badge-red">Search ads</span>', 'Keyword: smartphone, realme', tk(3000), tk(2140), '68.4K', '2,842', '4.2%', '184', tk(18600), '<b class="text-service-600">8.7×</b>', st('Active'), A([['View report', 'chart'], ['Edit budget', 'edit'], ['Add keywords', 'plus'], ['Pause', 'pause'], ['Duplicate', 'copy'], ['End', 'x', 1]])],
    ['<b>AC clearance boost</b><p class="text-[11px] text-ink-400">CMP-2838 · 05–31 Aug</p>', '<span class="badge badge-green">Product boost</span>', '12 products · Dhaka + Ctg', tk(2500), tk(1860), '42.8K', '1,684', '3.9%', '96', tk(12400), '<b class="text-service-600">6.7×</b>', st('Active'), A([['View report', 'chart'], ['Edit budget', 'edit'], ['Pause', 'pause']])],
    ['<b>Home services — featured</b><p class="text-[11px] text-ink-400">CMP-2836 · 01–31 Aug</p>', '<span class="badge badge-purple">Service featured</span>', 'Category: AC repair · Dhaka', tk(1800), tk(1420), '28.4K', '1,242', '4.4%', '68 leads', tk(8400), '<b class="text-service-600">5.9×</b>', st('Active'), A([['View report', 'chart'], ['Edit', 'edit'], ['Pause', 'pause']])],
    ['<b>Electronics banner — category</b><p class="text-[11px] text-ink-400">CMP-2842 · 25 Aug–05 Sep</p>', '<span class="badge badge-amber">Category banner</span>', 'Electronics landing page', tk(4000), tk(0), '—', '—', '—', '—', '—', '—', st('Scheduled'), A([['Preview creative', 'eye'], ['Edit', 'edit'], ['Start now', 'bolt'], ['Cancel', 'x', 1]])],
    ['<b>Shop follower ads</b><p class="text-[11px] text-ink-400">CMP-2820 · Ended 31 Jul</p>', '<span class="badge badge-gray">Shop ads</span>', 'Lookalike audience', tk(1500), tk(1500), '32.6K', '984', '3.0%', '42', tk(4800), '3.2×', st('Completed'), A([['View report', 'chart'], ['Duplicate', 'copy']])],
    ['<b>Monsoon boost</b><p class="text-[11px] text-ink-400">CMP-2814 · Paused 18 Jul</p>', '<span class="badge badge-green">Product boost</span>', '8 products · All BD', tk(2000), tk(680), '12.4K', '286', '2.3%', '12', tk(1600), '2.4×', st('Paused'), A([['Resume', 'play'], ['Edit budget', 'edit'], ['End', 'x', 1]])]
  ], total: 18,
  after: row2(card('Keyword performance', table([['Keyword'], ['Match'], ['Impr.'], ['Clicks'], ['CPC'], ['Orders'], ['Status'], ['', 'text-right']], [
    ['<b>smartphone under 15000</b>', 'Broad', '24.8K', '1,284', tk(3.2), '84', st('Active'), A([['Increase bid', 'up'], ['Pause', 'pause']])],
    ['<b>realme c100x</b>', 'Exact', '18.4K', '942', tk(2.8), '62', st('Active'), A([['Increase bid', 'up'], ['Pause', 'pause']])],
    ['<b>ac servicing dhaka</b>', 'Phrase', '12.6K', '486', tk(4.1), '28', st('Active'), A([['Increase bid', 'up'], ['Pause', 'pause']])],
    ['<b>cheap mobile</b>', 'Broad', '8.2K', '124', tk(5.6), '2', st('Paused'), A([['Resume', 'play'], ['Remove', 'trash', 1]])]
  ]), btn('Add keyword', 'plus', 'outline')),
    card('Suggested for you', `<div class="p-4 space-y-2.5">
${[['Boost "Gree 1.5 Ton AC"', 'High views but low sales — boost to convert', 'Est. +18 orders', 'bolt'], ['Add keyword "inverter ac price"', '2,400 searches/month in your city', 'Low competition', 'search'], ['Increase Eid campaign budget', 'Budget exhausted by 3 PM daily', '+৳1,000 suggested', 'up'], ['Feature your top service', 'AC servicing ranks #4 — featured slot available', 'Est. +24 leads', 'award'], ['Retarget shop visitors', '1,842 visitors did not buy in last 7 days', 'ROAS est. 4.2×', 'users']].map(s => `<div class="flex items-start gap-3 p-3 rounded-xl border border-[#e7e9ef]">
${svg(s[3], 'w-4 h-4 text-brand-500 shrink-0 mt-1')}<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold">${s[0]}</p><p class="text-[11.5px] text-ink-400">${s[1]}</p>
<span class="badge badge-green mt-1.5">${s[2]}</span></div><button class="btn btn-xs btn-outline shrink-0">Apply</button></div>`).join('')}</div>`))
    + modal('m-ad', 'Create ad campaign', gridForm([
      fld('Campaign objective *', sel(['More product sales', 'More service leads', 'More shop visits', 'Grow followers', 'Promote a flash sale'])),
      fld('Ad type *', sel(['Search ads (keyword based)', 'Product boost', 'Category banner', 'Service featured slot', 'Shop ads / retargeting'])),
      fld('Campaign name *', inp('e.g. Eid smartphone push')),
      fld('Promote', sel(['Selected products', 'Selected services', 'Whole shop', 'A collection'])),
      fld('Select items', inp('Search products or services…'), 'sm:col-span-2'),
      fld('Keywords (search ads)', ta('One keyword per line, e.g.\nsmartphone under 15000\nrealme c100x'), 'sm:col-span-2'),
      fld('Bidding', sel(['Automatic (recommended)', 'Manual CPC'])), fld('Max CPC bid', inp('e.g. 4.00')),
      fld('Daily budget *', inp('e.g. 500')), fld('Total budget', inp('e.g. 3000')),
      fld('Start date', inp('', '', 'date')), fld('End date', inp('', '', 'date')),
      fld('Target locations', sel(['All Bangladesh', 'Dhaka only', 'Dhaka + Chattogram', 'Custom districts'])),
      fld('Target audience', sel(['Everyone', 'New visitors', 'Past shop visitors', 'Past buyers', 'Lookalike of buyers'])),
      fld('Device', sel(['All devices', 'Mobile app only', 'Mobile web', 'Desktop'])), fld('Ad schedule', sel(['All day', 'Peak hours (6–11 PM)', 'Business hours', 'Custom'])),
      fld('Banner creative (for banner ads)', `<button class="dz w-full">${svg('image', 'w-5 h-5 mx-auto mb-1')}Upload 1200×300 banner (JPG/PNG, max 2 MB)</button>`, 'sm:col-span-2'),
      fld('Ad headline', inp('Max 60 characters')), fld('Ad description', inp('Max 120 characters')),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Auto-pause if ROAS drops below 2×', true)}${chk('Email daily performance summary', true)}${chk('Allow platform to optimise placement', true)}</div>`
    ]) + modalFoot('Launch campaign', 'Campaign submitted for review'))
});
