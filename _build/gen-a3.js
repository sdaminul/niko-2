/* Admin catalog rest + services: categories, brands, attributes, inventory, services, service-approvals, service-categories, bookings, leads */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, svg, ph, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, tiles, mini, timeline, hbars, donut, modal, modalFoot, calendar, kanban } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;
const trow = (n, s) => prow(n % 8, n, s);

/* --------------------------- CATEGORIES ------------------------------- */
const catRow = (name, lvl, slug, kids, items, comm, feat, status) => [
  `<span style="padding-left:${lvl * 18}px" class="inline-flex items-center gap-2">${lvl ? svg('chevR', 'w-3 h-3 text-ink-300') : svg('layers', 'w-4 h-4 text-brand-500')}<b class="text-[12.5px]">${name}</b></span>`,
  `<code class="text-[11px]">${slug}</code>`, kids, items, comm, feat ? bd('Featured', 'green') : bd('Normal', 'gray'), st(status),
  A([['Edit', 'edit'], ['Add subcategory', 'plus'], ['Manage attributes', 'sliders'], ['Set commission', 'percent'], ['Feature on home', 'award'], ['Reorder', 'move'], ['Merge into…', 'copy'], ['Disable', 'ban', 1], ['Delete', 'trash', 1]])];

AD('categories.html', {
  title: 'Categories', sub: 'Product category tree, commission rates and homepage placement.', crumb: 'Categories',
  actions: [['Import tree', 'up'], ['Reorder mode', 'move'], ['Add category', 'plus', 'primary', 'data-modal-open="m-cat"']],
  stats: [['Total categories', '482', '', 'layers', 'brand', '12 root · 96 level-2 · 374 level-3'],
    ['Products mapped', '3,90,000', '', 'box', 'service', '99.4% correctly mapped'],
    ['Empty categories', '18', '', 'warn', 'gold', 'No live listings'],
    ['Featured on home', '12', '', 'award', 'ink', 'Homepage category grid']],
  filters: ['search', ['All levels', 'Root only', 'Level 2', 'Level 3'], ['All statuses', 'Active', 'Disabled', 'Empty'], ['Sort: Tree order', 'Most products', 'Highest GMV']],
  fbtns: btn('Expand all', 'chevD') + btn('Export tree', 'dl'),
  head: ['Category', 'Slug', 'Subcategories', 'Live products', 'Commission', 'Placement', 'Status', ['Actions', 'text-right']],
  rows: [
    catRow('Electronics & Gadgets', 0, 'electronics', '14', '86,240', '6%', 1, 'Active'),
    catRow('Smartphones', 1, 'electronics/smartphones', '4', '18,420', '8%', 1, 'Active'),
    catRow('Android phones', 2, '…/android-phones', '—', '12,840', '8%', 0, 'Active'),
    catRow('Air conditioners', 1, 'electronics/air-conditioners', '3', '4,860', '6%', 0, 'Active'),
    catRow('Fashion & Lifestyle', 0, 'fashion', '22', '1,12,480', '12%', 1, 'Active'),
    catRow('Sarees', 1, 'fashion/sarees', '6', '18,640', '12%', 1, 'Active'),
    catRow('Home & Kitchen', 0, 'home-kitchen', '18', '68,420', '10%', 1, 'Active'),
    catRow('Grocery & Daily needs', 0, 'grocery', '16', '32,640', '15%', 0, 'Active'),
    catRow('Vintage Collectibles', 0, 'vintage', '2', '0', '10%', 0, 'Disabled')
  ], total: 482,
  after: row3(card('Commission by category', `<div class="p-4">${hbars([['Grocery', 96, '15%'], ['Fashion', 78, '12%', '#00b894'], ['Home & Kitchen', 64, '10%', '#ffb020'], ['Mobile', 52, '8%', '#8b5cf6'], ['Electronics', 40, '6%', '#6c7a91'], ['Large appliances', 32, '5%', '#b42318']])}
<div class="mt-2">${btn('Commission plans', 'percent')}</div></div>`),
    card('Homepage category grid', `<div class="p-4"><p class="text-[12px] text-ink-500 mb-2.5">Drag to reorder the 12 categories shown on the homepage.</p>
${['Electronics', 'Fashion', 'Home & Kitchen', 'Mobile & Gadgets', 'Grocery', 'Health & Beauty', 'Home Services', 'Baby & Toys'].map((c, i) => `<div class="flex items-center gap-2.5 p-2.5 rounded-xl border border-[#e7e9ef] mb-1.5">
${svg('move', 'w-4 h-4 text-ink-300 shrink-0 cursor-move')}<span class="w-7 h-7 rounded-lg bg-ink-50 grid place-items-center text-[11px] font-bold shrink-0">${i + 1}</span>
<span class="text-[12.5px] font-semibold flex-1">${c}</span><button class="icon-btn icon-btn-sm">${svg('image', 'w-3.5 h-3.5')}</button><button class="icon-btn icon-btn-sm">${svg('x', 'w-3.5 h-3.5')}</button></div>`).join('')}
<div class="flex gap-2 mt-2">${btn('Save order', 'check', 'primary', 'data-toast="Order saved"')}${btn('Add slot', 'plus')}</div></div>`),
    card('Category health', `<div class="p-4">${kv([['Categories with 0 products', '18'], ['Mis-categorised (AI detected)', '2,340'], ['Missing category image', '24'], ['Missing SEO description', '86'], ['Duplicate names', '6'], ['Deepest level', '4'], ['Avg. products per category', '809']])}
<div class="flex gap-2 mt-3">${btn('Run audit', 'refresh')}${btn('Fix suggestions', 'bolt')}</div></div>`))
    + modal('m-cat', 'Add / edit category', gridForm([
      fld('Category name (English) *', inp('e.g. Smartphones')), fld('Category name (বাংলা)', inp('e.g. স্মার্টফোন')),
      fld('Parent category', sel(['None (root category)', 'Electronics & Gadgets', 'Fashion & Lifestyle', 'Home & Kitchen', 'Grocery', 'Health & Beauty'])),
      fld('URL slug *', inp('e.g. electronics/smartphones')),
      fld('Default commission %', inp('e.g. 8')), fld('VAT rate', sel(['5%', '7.5%', '15%', 'Exempt'])),
      fld('Category icon', `<button class="dz w-full !py-3">${svg('image', 'w-4 h-4 mx-auto mb-1')}Upload icon (SVG/PNG 64×64)</button>`),
      fld('Banner image', `<button class="dz w-full !py-3">${svg('image', 'w-4 h-4 mx-auto mb-1')}Upload banner (1600×400)</button>`),
      fld('Short description', ta('Shown on the category landing page'), 'sm:col-span-2'),
      fld('SEO title', inp('Max 60 characters')), fld('SEO keywords', inp('comma separated')),
      fld('SEO meta description', ta('Max 160 characters'), 'sm:col-span-2'),
      fld('Applicable attributes', inp('Search attributes e.g. RAM, Storage, Colour'), 'sm:col-span-2'),
      fld('Sort order', inp('e.g. 1')), fld('Status', sel(['Active', 'Draft', 'Disabled'])),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Show on homepage grid', true)}${chk('Show in mega menu', true)}${chk('Requires approval for new listings', true)}${chk('Allow COD', true)}${chk('Restricted category (docs required)', false)}</div>`
    ]) + modalFoot('Save category', 'Category saved'))
});

/* ----------------------------- BRANDS --------------------------------- */
AD('brands.html', {
  title: 'Brands', sub: 'Brand directory, authorisation control and brand store pages.', crumb: 'Brands',
  actions: [['Import brands', 'up'], ['Brand requests', 'bell'], ['Add brand', 'plus', 'primary', 'data-modal-open="m-brand"']],
  stats: [['Total brands', '4,842', '+8%', 'award', 'brand', '186 official brand stores'],
    ['Protected brands', '42', '', 'shield', 'service', 'Authorisation required'],
    ['Pending requests', '18', '', 'clock', 'gold', 'New brand submissions'],
    ['Counterfeit reports', '24', '', 'ban', 'ink', 'Under investigation']],
  tabs: [['All brands', '4,842'], ['Official stores', '186'], ['Protected', '42'], ['Pending', '18'], ['Blocked', '12']],
  filters: ['search', ['All categories', 'Electronics', 'Fashion', 'Home', 'Beauty'], ['All types', 'Official store', 'Protected', 'Open', 'Blocked'], ['Sort: A–Z', 'Most products', 'Highest GMV']],
  bulk: ['Approve', 'Mark protected', 'Feature', 'Block', 'Export'],
  head: ['Brand', 'Slug', 'Category', 'Products', 'Vendors selling', 'GMV (30d)', 'Authorisation', 'Status', ['Actions', 'text-right']],
  rows: [
    [trow('Samsung', 'Official brand store · since 2023'), '<code class="text-[11px]">samsung</code>', 'Electronics, Mobile', '8,642', '184', tk(6840000), bd('Required', 'red'), st('Active'), A([['View brand store', 'globe'], ['Edit brand', 'edit'], ['Manage authorised vendors', 'users'], ['Upload logo', 'image'], ['Counterfeit reports', 'flag'], ['Block brand', 'ban', 1]])],
    [trow('Walton', 'Official brand store · Bangladesh'), '<code class="text-[11px]">walton</code>', 'Electronics, Home', '6,240', '142', tk(4820000), bd('Required', 'red'), st('Active'), A([['View brand store', 'globe'], ['Edit brand', 'edit'], ['Manage authorised vendors', 'users']])],
    [trow('Realme', 'Official brand store'), '<code class="text-[11px]">realme</code>', 'Mobile & Gadgets', '2,184', '96', tk(2640000), bd('Required', 'red'), st('Active'), A([['View brand store', 'globe'], ['Edit brand', 'edit']])],
    [trow('Aarong', 'Fashion & lifestyle'), '<code class="text-[11px]">aarong</code>', 'Fashion', '1,842', '12', tk(1860000), bd('Required', 'red'), st('Active'), A([['View brand store', 'globe'], ['Edit brand', 'edit']])],
    [trow('Generic / Unbranded', 'System brand'), '<code class="text-[11px]">generic</code>', 'All', '1,24,860', '6,842', tk(8420000), bd('Open', 'gray'), st('Active'), A([['Edit brand', 'edit']])],
    [trow('TechPro Max', 'Requested by Gadget World BD · 2 days ago'), '<code class="text-[11px]">techpro-max</code>', 'Mobile & Gadgets', '0', '1', '—', bd('Pending review', 'amber'), st('Pending'), A([['Review request', 'eye'], ['Approve', 'check'], ['Request trademark doc', 'msg'], ['Reject', 'x', 1]])],
    [trow('LuxuryBrandXY', 'Blocked — repeated counterfeit listings'), '<code class="text-[11px]">luxurybrandxy</code>', 'Fashion', '0', '0', '—', bd('Blocked', 'red'), st('Blocked'), A([['View case', 'flag'], ['Unblock', 'refresh'], ['Delete', 'trash', 1]])]
  ], total: 4842,
  after: row2(card('Top brands by GMV', `<div class="p-4">${hbars([['Samsung', 96, tk(6840000)], ['Walton', 72, tk(4820000), '#00b894'], ['Realme', 42, tk(2640000), '#ffb020'], ['Xiaomi', 38, tk(2280000), '#8b5cf6'], ['Aarong', 30, tk(1860000), '#6c7a91'], ['Gree', 24, tk(1420000), '#b42318']])}</div>`),
    card('Brand protection', `<div class="p-4">${frows([
      ['Require authorisation letter', 'Vendors must upload a dealer certificate for protected brands.', true],
      ['Auto-block unauthorised listings', 'Instantly hide protected-brand listings without documents.', true],
      ['Counterfeit reporting form', 'Allow brand owners to submit takedown requests.', true],
      ['Brand name in title check', 'Flag listings using brand names in the wrong category.', true],
      ['Official store badge', 'Show a verified badge on official brand stores.', true]
    ])}<div class="p-4 pt-0 flex gap-2">${btn('Protected brand list', 'shield')}${btn('Takedown requests', 'flag')}</div></div>`))
    + modal('m-brand', 'Add / edit brand', gridForm([
      fld('Brand name *', inp('e.g. Samsung')), fld('URL slug *', inp('e.g. samsung')),
      fld('Primary category', sel(['Electronics', 'Mobile & Gadgets', 'Fashion', 'Home & Kitchen', 'Health & Beauty', 'Grocery'])),
      fld('Brand type', sel(['Open — anyone can list', 'Protected — authorisation required', 'Official brand store'])),
      fld('Country of origin', sel(['Bangladesh', 'China', 'South Korea', 'India', 'USA', 'Japan', 'Other'])),
      fld('Trademark registration no.', inp('Optional')),
      fld('Brand logo', `<button class="dz w-full !py-3">${svg('image', 'w-4 h-4 mx-auto mb-1')}Upload logo (PNG 300×300)</button>`),
      fld('Brand banner', `<button class="dz w-full !py-3">${svg('image', 'w-4 h-4 mx-auto mb-1')}Upload banner (1600×400)</button>`),
      fld('About the brand', ta('Shown on the brand store page'), 'sm:col-span-2'),
      fld('Official website', inp('https://')), fld('Authorised vendors', inp('Search vendors…')),
      fld('SEO title', inp('')), fld('SEO description', inp('')),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Feature in brand carousel', true)}${chk('Show on brands page', true)}${chk('Verified badge', true)}</div>`
    ]) + modalFoot('Save brand', 'Brand saved'))
});

/* --------------------------- ATTRIBUTES ------------------------------- */
AD('attributes.html', {
  title: 'Attributes & Specifications', sub: 'Variant options, filters and specification templates used by listings.', crumb: 'Attributes',
  actions: [['Spec templates', 'file'], ['Import', 'up'], ['Add attribute', 'plus', 'primary', 'data-modal-open="m-attr"']],
  stats: [['Attributes', '284', '', 'sliders', 'brand', 'Used across 482 categories'],
    ['Variant attributes', '48', '', 'layers', 'service', 'Colour, size, storage…'],
    ['Filterable', '96', '', 'filter', 'gold', 'Shown in listing sidebar'],
    ['Spec templates', '64', '', 'file', 'ink', 'Per category']],
  tabs: [['All attributes', '284'], ['Variant options', '48'], ['Filters', '96'], ['Specifications', '140'], ['Unused', '12']],
  filters: ['search', ['All categories', 'Electronics', 'Mobile', 'Fashion', 'Home'], ['All types', 'Dropdown', 'Multi-select', 'Colour swatch', 'Text', 'Number', 'Boolean'], ['Usage: All', 'Variant', 'Filter', 'Specification']],
  bulk: ['Make filterable', 'Make variant', 'Assign to category', 'Delete'],
  head: ['Attribute', 'Type', 'Values', 'Used in categories', 'Products using', 'Variant', 'Filterable', 'Required', ['Actions', 'text-right']],
  rows: [
    ['<b>Colour</b><p class="text-[11px] text-ink-400">colour</p>', 'Colour swatch', '<span class="badge badge-gray">42 values</span>', 'Fashion, Electronics, Mobile (+38)', '2,84,600', bd('Yes', 'green'), bd('Yes', 'green'), bd('Yes', 'green'), A([['Edit', 'edit'], ['Manage values', 'list'], ['Assign categories', 'layers'], ['Delete', 'trash', 1]])],
    ['<b>Size</b><p class="text-[11px] text-ink-400">size</p>', 'Dropdown', '<span class="badge badge-gray">18 values</span>', 'Fashion, Shoes, Kids (+12)', '1,42,800', bd('Yes', 'green'), bd('Yes', 'green'), bd('Yes', 'green'), A([['Edit', 'edit'], ['Manage values', 'list'], ['Size chart', 'file']])],
    ['<b>Storage capacity</b><p class="text-[11px] text-ink-400">storage</p>', 'Dropdown', '<span class="badge badge-gray">9 values</span>', 'Mobile, Laptop, Tablet', '18,420', bd('Yes', 'green'), bd('Yes', 'green'), bd('Yes', 'green'), A([['Edit', 'edit'], ['Manage values', 'list']])],
    ['<b>RAM</b><p class="text-[11px] text-ink-400">ram</p>', 'Dropdown', '<span class="badge badge-gray">8 values</span>', 'Mobile, Laptop', '16,240', bd('Yes', 'green'), bd('Yes', 'green'), bd('No', 'gray'), A([['Edit', 'edit'], ['Manage values', 'list']])],
    ['<b>Warranty period</b><p class="text-[11px] text-ink-400">warranty</p>', 'Dropdown', '<span class="badge badge-gray">7 values</span>', 'All electronics', '86,240', bd('No', 'gray'), bd('Yes', 'green'), bd('Yes', 'green'), A([['Edit', 'edit'], ['Manage values', 'list']])],
    ['<b>Energy rating</b><p class="text-[11px] text-ink-400">energy-rating</p>', 'Dropdown', '<span class="badge badge-gray">5 values</span>', 'AC, Refrigerator, Washing machine', '4,860', bd('No', 'gray'), bd('Yes', 'green'), bd('No', 'gray'), A([['Edit', 'edit'], ['Delete', 'trash', 1]])],
    ['<b>Fabric type</b><p class="text-[11px] text-ink-400">fabric</p>', 'Multi-select', '<span class="badge badge-gray">24 values</span>', 'Fashion (all)', '1,12,480', bd('No', 'gray'), bd('Yes', 'green'), bd('No', 'gray'), A([['Edit', 'edit'], ['Manage values', 'list']])]
  ], total: 284,
  after: row2(card('Specification templates', table([['Template'], ['Category'], ['Fields'], ['Required fields'], ['Products'], ['', 'text-right']], [
    ['<b>Smartphone spec sheet</b>', 'Mobile › Smartphones', '32', '12', '18,420', A([['Edit template', 'edit'], ['Preview', 'eye'], ['Duplicate', 'copy']])],
    ['<b>Air conditioner spec</b>', 'Home › Air conditioner', '24', '9', '4,860', A([['Edit template', 'edit'], ['Preview', 'eye']])],
    ['<b>Apparel spec</b>', 'Fashion › All', '18', '6', '1,12,480', A([['Edit template', 'edit'], ['Preview', 'eye']])],
    ['<b>Grocery & food spec</b>', 'Grocery › All', '14', '8', '32,640', A([['Edit template', 'edit'], ['Preview', 'eye']])]
  ]), btn('New template', 'plus', 'outline')),
    card('Attribute values — Colour', `<div class="p-4"><div class="flex flex-wrap gap-2 mb-3">
${[['Black', '#231f20'], ['White', '#ffffff'], ['Red', '#ff2525'], ['Blue', '#2563eb'], ['Green', '#00b894'], ['Gold', '#ffb020'], ['Silver', '#c0c4cc'], ['Navy', '#1e3a8a'], ['Maroon', '#7f1d1d'], ['Pink', '#ec4899']].map(c => `<span class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#e7e9ef] text-[12px] font-semibold">
<i class="w-3.5 h-3.5 rounded-full border border-black/10" style="background:${c[1]}"></i>${c[0]}<button class="text-ink-300 hover:text-brand-600">${svg('x', 'w-3 h-3')}</button></span>`).join('')}</div>
${gridForm([fld('Add value', inp('e.g. Sky blue')), fld('Colour hex', inp('#000000'))], 1)}
<div class="flex gap-2 mt-2.5">${btn('Add value', 'plus', 'primary')}${btn('Bulk import', 'up')}</div></div>`))
    + modal('m-attr', 'Add / edit attribute', gridForm([
      fld('Attribute name *', inp('e.g. Storage capacity')), fld('Code / slug *', inp('e.g. storage')),
      fld('Input type *', sel(['Dropdown (single select)', 'Multi-select', 'Colour swatch', 'Text', 'Number', 'Boolean (yes/no)', 'Date'])),
      fld('Unit', inp('e.g. GB, kg, inch')),
      fld('Values', ta('One value per line, e.g.\n64GB\n128GB\n256GB'), 'sm:col-span-2'),
      fld('Apply to categories', inp('Search categories…'), 'sm:col-span-2'),
      fld('Display order', inp('e.g. 3')), fld('Filter display', sel(['Checkbox list', 'Dropdown', 'Colour swatches', 'Range slider'])),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Use for product variants', true)}${chk('Show as filter on listing page', true)}${chk('Required when listing', true)}${chk('Show in comparison table', true)}${chk('Show in specification tab', true)}</div>`
    ]) + modalFoot('Save attribute', 'Attribute saved'))
});

/* --------------------------- INVENTORY -------------------------------- */
AD('inventory.html', {
  title: 'Stock Overview', sub: 'Marketplace-wide stock levels, low-stock risks and price change monitoring.', crumb: 'Stock overview',
  actions: [['Low stock alerts', 'bell'], ['Price change log', 'db'], ['Export stock', 'dl', 'primary']],
  stats: [['Total stock units', '48.6L', '+6%', 'pkg', 'brand', 'Across 3.9L listings'],
    ['Stock value', tk(842000000), '+9%', 'money', 'service', 'At selling price'],
    ['Low stock listings', '18,420', '+12%', 'warn', 'gold', 'Below vendor threshold'],
    ['Out of stock', '32,420', '+4%', 'x', 'ink', '8.3% of catalog']],
  tabs: [['All', '3,90,000'], ['In stock', '3,42,180'], ['Low stock', '18,420'], ['Out of stock', '32,420'], ['Overstock', '4,860'], ['Price changes', '2,842']],
  filters: ['search', ['All categories', 'Electronics', 'Fashion', 'Grocery', 'Home'], ['All vendors', 'Top 100 vendors', 'New vendors'], ['Stock: All', 'Zero', '1–5 units', '6–20 units', '20+ units'], 'date', ['Sort: Lowest stock', 'Highest value', 'Fastest moving']],
  bulk: ['Notify vendor', 'Hide from search', 'Request restock', 'Export'],
  head: ['Product', 'Vendor', 'Category', 'Price', 'Stock', 'Reserved', 'Available', 'Sold (30d)', 'Days of cover', 'Status', ['Actions', 'text-right']],
  rows: [
    [prow(0, 'Gree 1.5 Ton Inverter AC', 'SKU GREE-18XPUV'), 'Rahim Electric', 'Home › AC', tk(68900), '<b class="text-brand-600">2</b>', '1', '1', '184', '<b class="text-brand-600">0.3 days</b>', st('Low stock'), A([['Notify vendor', 'bell'], ['View listing', 'eye'], ['Hide from search', 'ban'], ['Suggest restock qty', 'bolt']])],
    [prow(1, 'Realme C100X 6/128GB', 'SKU RC100X-BLK'), 'Rahim Electric', 'Mobile › Smartphones', tk(11290), '<b>124</b>', '8', '116', '842', '4.4 days', st('Low stock'), A([['Notify vendor', 'bell'], ['View listing', 'eye']])],
    [prow(2, 'Premium Jamdani Saree', 'SKU JAM-SR-042'), 'Style Hub', 'Fashion › Sarees', tk(8450), '<b>36</b>', '2', '34', '284', '3.8 days', st('In stock'), A([['View listing', 'eye']])],
    [prow(3, 'Anchor LED Bulb 9W (Pack of 4)', 'SKU LED-9W-4P'), 'Rahim Electric', 'Home › Lighting', tk(420), '<b>0</b>', '0', '0', '1,842', '<b class="text-brand-600">0 days</b>', st('Out of stock'), A([['Notify vendor', 'bell'], ['Auto-hide', 'ban'], ['Find alternatives', 'search']])],
    [prow(4, 'Winter Jacket — Unisex', 'SKU WJ-UNI-XL'), 'Style Hub', 'Fashion › Jackets', tk(2890), '<b>1,842</b>', '4', '1,838', '12', '<b>153 days</b>', st('Overstock'), A([['Suggest discount', 'percent'], ['Notify vendor', 'bell']])]
  ], total: 390000,
  after: row3(card('Stock health by category', `<div class="p-4">${hbars([['Grocery', 42, '12% OOS', '#b42318'], ['Fashion', 22, '6% OOS', '#ffb020'], ['Electronics', 18, '4% OOS', '#00b894'], ['Mobile', 14, '3% OOS', '#00b894'], ['Home & Kitchen', 26, '7% OOS', '#ffb020']])}
${note('Grocery has the highest out-of-stock rate. Consider enabling auto-reorder reminders for perishable vendors.', 'gold', 'warn')}</div>`),
    card('Recent price changes', table([['Product'], ['Old → New'], ['Change'], ['By'], ['', 'text-right']], [
      ['<b>Realme C100X</b>', tk(12490) + ' → ' + tk(11290), bd('-9.6%', 'green'), 'Vendor', A([['View log', 'db']])],
      ['<b>Gree 1.5 Ton AC</b>', tk(64900) + ' → ' + tk(68900), bd('+6.2%', 'amber'), 'Vendor', A([['View log', 'db'], ['Flag', 'flag']])],
      ['<b>Baby Formula 900g</b>', tk(2900) + ' → ' + tk(3200), bd('+10.3%', 'red'), 'Vendor', A([['Investigate', 'search'], ['Warn vendor', 'warn']])],
      ['<b>LED Bulb 9W</b>', tk(480) + ' → ' + tk(420), bd('-12.5%', 'green'), 'Campaign', A([['View log', 'db']])]
    ]), btn('Full price log', 'db', 'ghost')),
    card('Automation & alerts', `<div class="p-4">${frows([
      ['Auto-hide out-of-stock listings', 'Remove from search until restocked.', true],
      ['Low stock email to vendor', 'Sent when stock ≤ 5 units.', true],
      ['Price gouging detection', 'Flag increases above 20% within 7 days.', true],
      ['Overstock discount suggestion', 'Suggest promotions for slow-moving stock.', true],
      ['Daily stock digest to category managers', 'Summary of OOS and low-stock items.', true]
    ])}</div>`))
});
