/* Admin content: pages, blog, media, faq, email-templates */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, modal, modalFoot } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('pages.html', {
  title: 'Static Pages', sub: 'All policy, informational and landing pages on the storefront.', crumb: 'Static pages',
  actions: [['Page templates', 'copy'], ['Menu builder', 'list'], ['New page', 'plus', 'primary', 'data-modal-open="m-pg"']],
  stats: [['Published pages', '48', '+4', 'file', 'brand', '12 in footer menu'],
    ['Draft pages', '6', '', 'edit', 'service', '2 awaiting review'],
    ['Page views (30d)', '18,42,000', '+8%', 'eye', 'gold', 'Help centre most visited'],
    ['Last updated', '2 hrs ago', '', 'clock', 'ink', 'Return policy by Nafisa K.']],
  tabs: [['All pages', '48'], ['Published', '42'], ['Draft', '6'], ['Policy pages', '8'], ['Landing pages', '12'], ['Menus', '4'], ['Revisions', '842']],
  filters: ['search', ['Type: All', 'Policy', 'Informational', 'Landing', 'Legal', 'Careers'], ['Location: All', 'Footer', 'Header', 'Help centre', 'Not linked'], ['Status: All', 'Published', 'Draft', 'Scheduled']],
  bulk: ['Publish', 'Unpublish', 'Add to menu', 'Delete'],
  head: ['Page title', 'URL slug', 'Type', 'Menu location', 'Views (30d)', 'Last edited by', 'Updated', 'SEO', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>About Us</b>', '/about.html', bd('Informational', 'blue'), 'Footer › Company', '48,620', 'Aminul Islam', '12 Aug 2026', bd('Optimised', 'green'), st('Published'), A([['Edit page', 'edit'], ['View live', 'globe'], ['Revisions (8)', 'db'], ['Duplicate', 'copy'], ['SEO settings', 'search'], ['Unpublish', 'ban', 1]])],
    ['<b>Terms & Conditions</b>', '/terms.html', bd('Legal', 'amber'), 'Footer › Legal', '18,400', 'Legal team', '04 Jul 2026', bd('Noindex', 'gray'), st('Published'), A([['Edit page', 'edit'], ['View live', 'globe'], ['Revisions (12)', 'db'], ['Require re-acceptance', 'bell']])],
    ['<b>Privacy Policy</b>', '/privacy-policy.html', bd('Legal', 'amber'), 'Footer › Legal', '12,480', 'Legal team', '04 Jul 2026', bd('Noindex', 'gray'), st('Published'), A([['Edit page', 'edit'], ['View live', 'globe'], ['Revisions (9)', 'db']])],
    ['<b>Return & Refund Policy</b>', '/return-policy.html', bd('Policy', 'blue'), 'Footer › Help', '86,420', 'Nafisa Karim', '2 hrs ago', bd('Optimised', 'green'), st('Published'), A([['Edit page', 'edit'], ['View live', 'globe'], ['Compare revisions', 'db']])],
    ['<b>Shipping & Delivery</b>', '/shipping-policy.html', bd('Policy', 'blue'), 'Footer › Help', '42,800', 'Rashed Kabir', '18 Aug 2026', bd('Optimised', 'green'), st('Published'), A([['Edit page', 'edit'], ['View live', 'globe']])],
    ['<b>Become a Seller</b>', '/become-seller.html', bd('Landing', 'green'), 'Header + Footer', '1,24,000', 'Marketing', '15 Aug 2026', bd('Optimised', 'green'), st('Published'), A([['Edit page', 'edit'], ['View live', 'globe'], ['Conversion report', 'chart']])],
    ['<b>Become a Service Provider</b>', '/become-provider.html', bd('Landing', 'green'), 'Header + Footer', '86,000', 'Marketing', '15 Aug 2026', bd('Optimised', 'green'), st('Published'), A([['Edit page', 'edit'], ['View live', 'globe'], ['Conversion report', 'chart']])],
    ['<b>Careers</b>', '/careers.html', bd('Informational', 'blue'), 'Footer › Company', '8,420', 'HR', '01 Aug 2026', bd('Optimised', 'green'), st('Published'), A([['Edit page', 'edit'], ['Manage openings', 'list']])],
    ['<b>Seller Fee Schedule 2027</b>', '/seller-fees.html', bd('Policy', 'gray'), 'Not linked', '0', 'Tania Rahman', '20 Aug 2026', bd('Draft', 'gray'), st('Draft'), A([['Edit page', 'edit'], ['Preview', 'eye'], ['Publish', 'check'], ['Delete', 'trash', 1]])]
  ], total: 48,
  after: row2(card('Menu builder — Footer', table([['Menu group'], ['Links'], ['Visible'], ['', 'text-right']], [
    ['<b>Company</b>', 'About, Careers, Blog, Contact, Press', chk('', true), A([['Edit links', 'edit'], ['Reorder', 'move']])],
    ['<b>Help & Support</b>', 'Help centre, FAQ, Track order, Returns, Shipping', chk('', true), A([['Edit links', 'edit'], ['Reorder', 'move']])],
    ['<b>Legal</b>', 'Terms, Privacy, Refund policy, Cookie policy', chk('', true), A([['Edit links', 'edit']])],
    ['<b>Sell on Niko</b>', 'Become a seller, Become a provider, Seller academy, Fees', chk('', true), A([['Edit links', 'edit']])],
    ['<b>Top categories</b>', '12 category links', chk('', true), A([['Edit links', 'edit']])],
    ['<b>Header top bar</b>', 'Download app, Become a seller, Help, Track order', chk('', true), A([['Edit links', 'edit']])]
  ]), btn('Add menu group', 'plus', 'outline')),
    card('Page editor', `<div class="p-4">${gridForm([fld('Page title *', inp('Return & Refund Policy')), fld('URL slug *', inp('/return-policy.html')),
      fld('Page template', sel(['Default content page', 'Full width', 'Landing page', 'Two column with sidebar', 'FAQ layout'])),
      fld('Parent page', sel(['None', 'Help centre', 'Policies'])),
      fld('Content (rich text)', ta('Use the WYSIWYG editor: headings, lists, tables, images, accordions, buttons, embedded video…'), 'sm:col-span-2'),
      fld('Meta title', inp('Return & Refund Policy — Niko BD')), fld('Meta description', inp('Learn how returns and refunds work on Niko…')),
      fld('Publish status', sel(['Published', 'Draft', 'Scheduled', 'Private'])), fld('Publish date', inp('23 Aug 2026'))])}
<div class="flex flex-wrap gap-2 mt-3">${btn('Save & publish', 'check', 'primary', 'data-toast="Page published"')}${btn('Save draft', 'save')}${btn('Preview', 'eye')}${btn('Revision history', 'db')}</div></div>`))
    + modal('m-pg', 'Create page', gridForm([
      fld('Page title *', inp('e.g. Cookie Policy')), fld('URL slug *', inp('/cookie-policy.html')),
      fld('Page type', sel(['Informational', 'Policy', 'Legal', 'Landing page', 'Careers', 'Press'])),
      fld('Template', sel(['Default content page', 'Full width', 'Landing page', 'Two column', 'FAQ layout'])),
      fld('Menu placement', sel(['Not linked', 'Footer › Company', 'Footer › Legal', 'Footer › Help', 'Header top bar', 'Help centre'])),
      fld('Language', sel(['English', 'Bengali', 'Both'])),
      fld('Content', ta('Page body content'), 'sm:col-span-2'),
      fld('Meta title', inp('SEO title')), fld('Meta description', inp('SEO description')),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Publish immediately', true)}${chk('Include in sitemap', true)}${chk('Show last updated date', true)}${chk('Require login to view', false)}</div>`
    ]) + modalFoot('Create page', 'Page created'))
});

AD('blog.html', {
  title: 'Blog & Guides', sub: 'Buying guides, service tips, news posts, categories and author management.', crumb: 'Blog & guides',
  actions: [['Categories', 'layers'], ['Authors', 'users'], ['New post', 'plus', 'primary', 'data-modal-open="m-post"']],
  stats: [['Published posts', '486', '+18', 'book', 'brand', '24 categories'],
    ['Blog traffic (30d)', '8,42,000', '+22%', 'eye', 'service', 'Organic 78%'],
    ['Avg. read time', '4:12', '', 'clock', 'gold', 'Bounce 42%'],
    ['Assisted revenue', tk(4820000), '+16%', 'money', 'ink', '1,842 orders']],
  tabs: [['Published', '486'], ['Draft', '42'], ['Scheduled', '18'], ['Pending review', '12'], ['Categories', '24'], ['Tags', '482'], ['Authors', '18'], ['Comments', '4,862']],
  filters: ['search', ['Category: All', 'Buying guides', 'Product reviews', 'Service tips', 'How-to', 'News', 'Seller stories', 'Offers'], ['Author: All', 'Editorial team', 'Guest authors'], ['Status: All', 'Published', 'Draft', 'Scheduled', 'Pending'], 'date'],
  bulk: ['Publish', 'Unpublish', 'Change category', 'Delete'],
  head: ['Post', 'Category', 'Author', 'Published', 'Views', 'Read time', 'Comments', 'Linked products', 'Assisted revenue', 'SEO', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<div class="flex items-center gap-2"><span class="ph w-12 h-8 rounded"></span><div><b>Best Air Conditioners in Bangladesh 2026</b><p class="text-[11px] text-ink-400">/blog-details.html?id=42</p></div></div>', bd('Buying guide', 'blue'), 'Editorial team', '18 Aug 2026', '<b>1,24,000</b>', '6:24', '182', '18 products', tk(1840000), bd('Optimised', 'green'), st('Published'), A([['Edit post', 'edit'], ['View live', 'globe'], ['SEO settings', 'search'], ['Comments (182)', 'msg'], ['Linked products', 'box'], ['Duplicate', 'copy'], ['Unpublish', 'ban', 1]])],
    ['<div class="flex items-center gap-2"><span class="ph w-12 h-8 rounded"></span><div><b>How to Hire a Trusted Electrician</b></div></div>', bd('Service tips', 'amber'), 'Nafisa Karim', '15 Aug 2026', '86,420', '4:10', '64', '6 listings', tk(842000), bd('Optimised', 'green'), st('Published'), A([['Edit post', 'edit'], ['View live', 'globe'], ['Comments (64)', 'msg']])],
    ['<div class="flex items-center gap-2"><span class="ph w-12 h-8 rounded"></span><div><b>Smartphone Buying Guide Under ' + tk(20000) + '</b></div></div>', bd('Buying guide', 'blue'), 'Editorial team', '10 Aug 2026', '2,48,000', '5:48', '286', '24 products', tk(2400000), bd('Optimised', 'green'), st('Published'), A([['Edit post', 'edit'], ['View live', 'globe'], ['Performance', 'chart']])],
    ['<div class="flex items-center gap-2"><span class="ph w-12 h-8 rounded"></span><div><b>Seller Story: How Rahim Electric Grew 5×</b></div></div>', bd('Seller story', 'green'), 'Marketing', '04 Aug 2026', '18,400', '3:20', '18', '—', tk(0), bd('Optimised', 'green'), st('Published'), A([['Edit post', 'edit'], ['View live', 'globe']])],
    ['<div class="flex items-center gap-2"><span class="ph w-12 h-8 rounded"></span><div><b>Winter Fashion Trends 2026</b></div></div>', bd('How-to', 'gray'), 'Guest: Farzana R.', 'Scheduled 01 Nov', '0', '—', '0', '12 products', tk(0), bd('Draft', 'gray'), st('Scheduled'), A([['Edit post', 'edit'], ['Preview', 'eye'], ['Publish now', 'check'], ['Delete', 'trash', 1]])],
    ['<div class="flex items-center gap-2"><span class="ph w-12 h-8 rounded"></span><div><b>Guest post: Best Tutors in Dhaka</b></div></div>', bd('Service tips', 'gray'), 'Guest: Sohel R.', '—', '0', '—', '0', '4 listings', tk(0), bd('Needs review', 'amber'), st('Pending'), A([['Review post', 'eye'], ['Edit', 'edit'], ['Approve & publish', 'check'], ['Reject', 'x', 1]])]
  ], total: 486,
  after: row3(card('Blog categories', table([['Category'], ['Posts'], ['Views'], ['', 'text-right']], [
    ['<b>Buying guides</b>', '142', '4,86,000', A([['Edit', 'edit']])],
    ['<b>Product reviews</b>', '86', '2,48,000', A([['Edit', 'edit']])],
    ['<b>Service tips</b>', '124', '1,84,000', A([['Edit', 'edit']])],
    ['<b>How-to & DIY</b>', '68', '86,000', A([['Edit', 'edit']])],
    ['<b>News & offers</b>', '42', '48,000', A([['Edit', 'edit']])],
    ['<b>Seller stories</b>', '24', '18,400', A([['Edit', 'edit']])]
  ]), btn('Add category', 'plus', 'outline')),
    card('Comment moderation', table([['Comment'], ['Post'], ['', 'text-right']], [
      ['<b>Rakib:</b> "Very helpful guide, thanks!"', 'Best ACs 2026', A([['Approve', 'check'], ['Reply', 'msg'], ['Delete', 'trash', 1]])],
      ['<b>Anon:</b> "Buy cheap phones at mysite.com"', 'Smartphone guide', A([['Mark spam', 'ban'], ['Delete', 'trash', 1]])],
      ['<b>Sadia:</b> "Which model is best for 1 ton?"', 'Best ACs 2026', A([['Approve', 'check'], ['Reply', 'msg']])],
      ['<b>Imran:</b> "Prices are outdated."', 'Smartphone guide', A([['Approve', 'check'], ['Reply', 'msg']])]
    ]), btn('Open moderation queue', 'ban', 'ghost')),
    card('Content settings', `<div class="p-4">${frows([['Allow comments', 'Readers can comment on blog posts.', true],
      ['Moderate comments before publishing', 'Hold new comments for review.', true],
      ['Allow guest authors', 'External writers can submit posts for review.', true],
      ['Show related products in posts', 'Auto-suggest products from the article content.', true],
      ['Show reading time', 'Display estimated reading time.', true],
      ['Newsletter CTA in posts', 'Insert a subscribe box after the second heading.', true]])}</div>`))
    + modal('m-post', 'Create blog post', gridForm([
      fld('Post title *', inp('e.g. Best Air Conditioners in Bangladesh 2026')),
      fld('URL slug', inp('best-air-conditioners-bangladesh-2026')),
      fld('Category *', sel(['Buying guides', 'Product reviews', 'Service tips', 'How-to & DIY', 'News & offers', 'Seller stories'])),
      fld('Author', sel(['Editorial team', 'Nafisa Karim', 'Marketing', 'Guest author'])),
      fld('Featured image (1200×630) *', inp('Upload / choose from media')),
      fld('Tags', inp('ac, cooling, summer, buying guide')),
      fld('Excerpt', ta('Short summary shown in listings (max 200 characters)'), 'sm:col-span-2'),
      fld('Content *', ta('Rich text editor — headings, images, tables, product cards, comparison tables, FAQ blocks, videos…'), 'sm:col-span-2'),
      fld('Linked products', inp('Search products to attach…')), fld('Linked services', inp('Search listings to attach…')),
      fld('Meta title', inp('SEO title')), fld('Meta description', inp('SEO description')),
      fld('Publish status', sel(['Publish now', 'Draft', 'Schedule', 'Pending review'])), fld('Publish date', inp('23 Aug 2026 10:00')),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Allow comments', true)}${chk('Feature on blog home', true)}${chk('Send to newsletter subscribers', false)}${chk('Add FAQ schema', true)}${chk('Show author bio', true)}</div>`
    ]) + modalFoot('Save post', 'Post saved'))
});
