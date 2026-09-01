/* Admin content: media, faq (help centre), email-templates */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, tk, kv, note, fld, inp, sel, ta, chk, gridForm, frows, modal, modalFoot, svg } = K;
const { AD, btn, A, row2, row3 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

const tile = (n, m, s) => `<label class="relative rounded-xl border border-[#e7e9ef] overflow-hidden group cursor-pointer">
<input type="checkbox" class="absolute top-2 left-2 z-10 w-4 h-4 accent-brand-600">
<div class="ph aspect-square"></div>
<div class="p-2"><p class="text-[11.5px] font-semibold truncate">${n}</p><p class="text-[10.5px] text-ink-400">${m} · ${s}</p></div>
<div class="absolute inset-0 bg-ink-900/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1">
<button class="btn btn-xs btn-primary">${svg('eye')}</button><button class="btn btn-xs btn-outline bg-white">${svg('copy')}</button><button class="btn btn-xs btn-outline bg-white">${svg('trash')}</button></div></label>`;

AD('media.html', {
  title: 'Media Library', sub: 'All images, videos and documents uploaded by staff and vendors.', crumb: 'Media library',
  actions: [['Storage settings', 'cog'], ['Optimise all', 'bolt'], ['Upload files', 'up', 'primary', 'data-modal-open="m-up"']],
  stats: [['Total files', '4,86,200', '+8,420', 'image', 'brand', '18,420 this month'],
    ['Storage used', '842 GB', '', 'db', 'service', 'of 2 TB (42%)'],
    ['CDN bandwidth (30d)', '18.4 TB', '+12%', 'cloud', 'gold', tk(48200) + ' cost'],
    ['Unoptimised images', '4,862', '', 'warn', 'ink', 'Can save 128 GB']],
  tabs: [['All files', '4,86,200'], ['Images', '4,62,000'], ['Videos', '8,420'], ['Documents', '15,780'], ['Banners', '842'], ['Vendor uploads', '3,86,000'], ['Unused', '18,420'], ['Trash', '2,480']],
  filters: ['search', ['Type: All', 'JPG / JPEG', 'PNG', 'WebP', 'SVG', 'MP4', 'PDF'], ['Uploaded by: All', 'Staff', 'Vendors', 'System'], ['Folder: All', 'Banners', 'Products', 'Services', 'Blog', 'Brand logos', 'KYC documents'], ['Size: All', 'Above 2 MB', '500 KB–2 MB', 'Below 500 KB'], 'date'],
  bulk: ['Move to folder', 'Optimise', 'Add alt text', 'Download', 'Delete'],
  top: card('Files', `<div class="p-4">
<div class="flex flex-wrap items-center gap-2 mb-4">${btn('All folders', 'folder', 'primary')}${btn('Banners (842)', 'folder')}${btn('Products (3,86,000)', 'folder')}${btn('Services (48,200)', 'folder')}${btn('Blog (4,862)', 'folder')}${btn('Brand logos (486)', 'folder')}${btn('KYC documents (18,420)', 'folder')}${btn('New folder', 'plus', 'ghost')}</div>
<div class="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-3">
${[['eid-hero-banner.webp', 'WebP', '186 KB'], ['smartphone-realme-c100x-1.jpg', 'JPG', '248 KB'], ['ac-repair-service.jpg', 'JPG', '312 KB'], ['brand-samsung-logo.svg', 'SVG', '8 KB'], ['blog-ac-guide-cover.webp', 'WebP', '142 KB'], ['product-video-demo.mp4', 'MP4', '4.2 MB'], ['saree-collection-01.jpg', 'JPG', '486 KB'], ['grocery-banner-mobile.webp', 'WebP', '96 KB'], ['trade-licence-vnd1442.pdf', 'PDF', '1.2 MB'], ['category-icon-electronics.svg', 'SVG', '4 KB'], ['flash-sale-strip.png', 'PNG', '842 KB'], ['provider-profile-cover.jpg', 'JPG', '386 KB']].map(f => tile(f[0], f[1], f[2])).join('')}
</div>
<div class="flex items-center justify-between mt-4 pt-4 border-t border-[#eef0f4]"><p class="text-[12px] text-ink-500">Showing 12 of 4,86,200 files</p><div class="flex gap-2">${btn('Load more', 'down')}${btn('Select all on page', 'check', 'ghost')}</div></div></div>`),
  after: row3(card('File details', `<div class="p-4"><div class="ph aspect-video rounded-xl mb-3"></div>
${kv([['File name', 'eid-hero-banner.webp'], ['Dimensions', '1920 × 640 px'], ['File size', '186 KB (was 842 KB)'], ['Format', 'WebP · optimised'], ['Uploaded by', 'Marketing team'], ['Uploaded on', '18 Aug 2026, 11:24 AM'], ['Folder', 'Banners'], ['Used in', '3 places'], ['CDN URL', 'cdn.niko.com.bd/b/eid-hero.webp']])}
${gridForm([fld('Alt text', inp('Eid Mega Sale — up to 70% off')), fld('Caption', inp('Optional caption')), fld('Tags', inp('eid, sale, banner'))], 1)}
<div class="flex flex-wrap gap-2 mt-3">${btn('Copy URL', 'copy')}${btn('Replace file', 'refresh')}${btn('Download', 'dl')}${btn('Delete', 'trash', 'outline')}</div></div>`),
    card('Storage breakdown', `<div class="p-4">${table([['Folder'], ['Files'], ['Size'], ['', 'text-right']], [
      ['<b>Products</b>', '3,86,000', '486 GB', A([['Open', 'folder']])],
      ['<b>Services</b>', '48,200', '142 GB', A([['Open', 'folder']])],
      ['<b>KYC documents</b>', '18,420', '86 GB', A([['Open', 'folder']])],
      ['<b>Blog</b>', '4,862', '48 GB', A([['Open', 'folder']])],
      ['<b>Banners</b>', '842', '18 GB', A([['Open', 'folder']])],
      ['<b>Videos</b>', '8,420', '62 GB', A([['Open', 'folder']])]
    ])}
<div class="p-3">${note('18,420 files are not used anywhere. Cleaning them up would free 128 GB.', 'gold', 'warn')}
<div class="flex gap-2 mt-2">${btn('Find unused files', 'search')}${btn('Empty trash', 'trash', 'outline')}</div></div></div>`),
    card('Upload rules', `<div class="p-4">${gridForm([fld('Max image size', inp('5 MB')), fld('Max video size', inp('50 MB')),
      fld('Allowed image types', inp('JPG, PNG, WebP, SVG')), fld('Allowed doc types', inp('PDF, JPG, PNG')),
      fld('Min product image size', inp('800 × 800 px')), fld('Auto-convert to', sel(['WebP', 'AVIF', 'Keep original']))], 1)}
${frows([['Auto-optimise on upload', 'Compress and convert images automatically.', true],
  ['Generate thumbnails', 'Create 5 responsive sizes for every image.', true],
  ['Strip EXIF data', 'Remove camera and location metadata.', true],
  ['Watermark vendor images', 'Add a subtle Niko watermark.', false],
  ['Scan for inappropriate content', 'AI moderation of uploaded images.', true],
  ['Serve via CDN', 'Deliver all media through the CDN.', true]])}</div>`))
    + modal('m-up', 'Upload files', `<div class="rounded-xl border-2 border-dashed border-[#d7dae2] p-8 text-center">
<div class="w-12 h-12 rounded-full bg-brand-50 text-brand-600 grid place-items-center mx-auto mb-3">${svg('up')}</div>
<p class="text-[13.5px] font-bold">Drag & drop files here</p><p class="text-[12px] text-ink-500 mt-1">JPG, PNG, WebP, SVG, MP4, PDF — up to 50 MB each</p>
<div class="mt-3">${btn('Browse files', 'folder', 'primary')}</div></div>
${gridForm([fld('Destination folder', sel(['Banners', 'Products', 'Services', 'Blog', 'Brand logos', 'Documents'])), fld('Alt text (applies to all)', inp('Optional')), fld('Tags', inp('Comma separated')), fld('Optimisation', sel(['Auto (recommended)', 'Lossless', 'None']))])}
${modalFoot('Upload', 'Files uploaded')}`)
});

AD('faq.html', {
  title: 'Help Centre', sub: 'FAQ articles, categories, ordering and helpfulness feedback.', crumb: 'Help centre',
  actions: [['Categories', 'layers'], ['Search analytics', 'chart'], ['Add article', 'plus', 'primary', 'data-modal-open="m-faq"']],
  stats: [['Published articles', '286', '+12', 'question', 'brand', '18 categories'],
    ['Help centre visits (30d)', '4,86,000', '+14%', 'eye', 'service', '68% self-served'],
    ['Helpful rating', '86%', '+3%', 'thumb', 'gold', '48,620 votes'],
    ['Failed searches', '842', '', 'warn', 'ink', 'No result found']],
  tabs: [['All articles', '286'], ['Buying & orders', '62'], ['Payments', '48'], ['Shipping', '42'], ['Returns & refunds', '38'], ['Services & bookings', '44'], ['Selling on Niko', '36'], ['Account & security', '16'], ['Draft', '18']],
  filters: ['search', ['Audience: All', 'Customers', 'Vendors — sellers', 'Vendors — providers', 'Everyone'], ['Category: All', 'Buying & orders', 'Payments', 'Shipping', 'Returns', 'Services', 'Selling', 'Account'], ['Status: All', 'Published', 'Draft', 'Needs update']],
  bulk: ['Publish', 'Change category', 'Reorder', 'Delete'],
  head: ['Article', 'Category', 'Audience', 'Views (30d)', 'Helpful', 'Not helpful', 'Related tickets', 'Updated', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>How do I track my order?</b>', 'Buying & orders', bd('Customers', 'blue'), '<b>86,420</b>', '92%', '8%', '184', '12 Aug 2026', st('Published'), A([['Edit article', 'edit'], ['View live', 'globe'], ['Feedback (4,862)', 'msg'], ['Reorder', 'move'], ['Unpublish', 'ban', 1]])],
    ['<b>What payment methods are accepted?</b>', 'Payments', bd('Customers', 'blue'), '62,480', '88%', '12%', '242', '04 Aug 2026', st('Published'), A([['Edit article', 'edit'], ['View live', 'globe'], ['Feedback', 'msg']])],
    ['<b>How do I return a product?</b>', 'Returns & refunds', bd('Customers', 'blue'), '48,200', '84%', '16%', '486', '18 Aug 2026', st('Published'), A([['Edit article', 'edit'], ['View live', 'globe'], ['Feedback', 'msg']])],
    ['<b>How does a service booking work?</b>', 'Services & bookings', bd('Customers', 'blue'), '38,400', '90%', '10%', '124', '10 Aug 2026', st('Published'), A([['Edit article', 'edit'], ['View live', 'globe']])],
    ['<b>How do I become a seller?</b>', 'Selling on Niko', bd('Sellers', 'amber'), '24,800', '94%', '6%', '86', '15 Aug 2026', st('Published'), A([['Edit article', 'edit'], ['View live', 'globe']])],
    ['<b>When will I receive my payout?</b>', 'Selling on Niko', bd('Vendors', 'amber'), '18,420', '78%', '<b class="text-brand-600">22%</b>', '842', '01 Aug 2026', st('Needs update'), A([['Edit article', 'edit'], ['Improve content', 'bolt'], ['Related tickets', 'question']])],
    ['<b>How do I enable two-factor authentication?</b>', 'Account & security', bd('Everyone', 'gray'), '8,420', '96%', '4%', '18', '20 Aug 2026', st('Published'), A([['Edit article', 'edit'], ['View live', 'globe']])],
    ['<b>Gift card terms explained</b>', 'Payments', bd('Customers', 'blue'), '0', '—', '—', '0', '22 Aug 2026', st('Draft'), A([['Edit article', 'edit'], ['Preview', 'eye'], ['Publish', 'check'], ['Delete', 'trash', 1]])]
  ], total: 286,
  after: row2(card('Search terms with no results', table([['Search term'], ['Searches'], ['Action needed'], ['', 'text-right']], [
    ['"cancel booking after payment"', '842', bd('Write article', 'red'), A([['Create article', 'plus']])],
    ['"emi facility"', '486', bd('Write article', 'red'), A([['Create article', 'plus']])],
    ['"warranty claim process"', '284', bd('Write article', 'red'), A([['Create article', 'plus']])],
    ['"change delivery address"', '186', bd('Improve existing', 'amber'), A([['Edit article', 'edit']])],
    ['"seller commission rate"', '142', bd('Improve existing', 'amber'), A([['Edit article', 'edit']])]
  ]), btn('Full search report', 'chart', 'ghost')),
    card('Help centre settings', `<div class="p-4">${gridForm([fld('Help centre URL', inp('/help-center.html')), fld('Default category order', sel(['Manual', 'Most viewed', 'Alphabetical'])),
      fld('Contact CTA', sel(['Show live chat', 'Show ticket form', 'Show phone number', 'Show all'])), fld('Support phone', inp('16xxx'))], 1)}
${frows([['Show helpful / not helpful voting', 'Collect feedback on every article.', true],
  ['Suggest articles in chat', 'Bot suggests articles before creating a ticket.', true],
  ['Show related articles', 'Display 4 related articles at the bottom.', true],
  ['Enable article search suggestions', 'Auto-complete while typing.', true],
  ['Show video tutorials', 'Embed YouTube tutorials where available.', true]])}</div>`))
    + modal('m-faq', 'Add help article', gridForm([
      fld('Question / title *', inp('e.g. How do I cancel a booking after payment?')),
      fld('Category *', sel(['Buying & orders', 'Payments', 'Shipping & delivery', 'Returns & refunds', 'Services & bookings', 'Selling on Niko', 'Account & security', 'Offers & coupons'])),
      fld('Audience', sel(['Customers', 'Vendors — sellers', 'Vendors — providers', 'Everyone'])),
      fld('Display order', inp('1')),
      fld('Short answer', ta('One-paragraph answer shown in search results'), 'sm:col-span-2'),
      fld('Full answer *', ta('Detailed answer with steps, screenshots, links and notes'), 'sm:col-span-2'),
      fld('Related articles', inp('Search articles…')), fld('Related pages', inp('e.g. /track-order.html')),
      fld('Video tutorial URL', inp('YouTube link (optional)')), fld('Keywords for search', inp('cancel, booking, refund')),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Publish immediately', true)}${chk('Show on contact page', false)}${chk('Feature in top questions', true)}${chk('Available in Bengali', true)}</div>`
    ]) + modalFoot('Save article', 'Article saved'))
});

AD('email-templates.html', {
  title: 'Email & SMS Templates', sub: 'Every transactional message sent by the platform, with variables and previews.', crumb: 'Email & SMS templates',
  actions: [['Sender settings', 'cog'], ['Test send', 'mail'], ['New template', 'plus', 'primary', 'data-modal-open="m-tpl"']],
  stats: [['Templates', '86', '+4', 'mail', 'brand', 'Email 48 · SMS 32 · Push 6'],
    ['Emails sent (30d)', '48,62,000', '+12%', 'up', 'service', 'Delivery 98.2%'],
    ['SMS sent (30d)', '4,20,000', '+8%', 'msg', 'gold', tk(842000) + ' cost'],
    ['Bounce rate', '1.2%', '-0.4%', 'warn', 'ink', '842 hard bounces']],
  tabs: [['All templates', '86'], ['Order & delivery', '24'], ['Booking & leads', '14'], ['Payments & refunds', '12'], ['Account & security', '10'], ['Vendor', '18'], ['Marketing', '8'], ['Disabled', '6']],
  filters: ['search', ['Channel: All', 'Email', 'SMS', 'Push', 'In-app'], ['Audience: All', 'Customer', 'Vendor', 'Staff'], ['Status: All', 'Active', 'Disabled', 'Draft'], ['Language: All', 'English', 'Bengali']],
  bulk: ['Enable', 'Disable', 'Duplicate', 'Export'],
  head: ['Template', 'Trigger event', 'Channel', 'Audience', 'Subject / first line', 'Variables', 'Sent (30d)', 'Open rate', 'Language', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>Order confirmation</b>', 'Order placed', bd('Email + SMS', 'blue'), 'Customer', 'Your Niko order #NK-84219 is confirmed', '{name} {order_id} {items} {total} {eta}', '4,12,000', '68%', 'EN + BN', st('Active'), A([['Edit template', 'edit'], ['Preview', 'eye'], ['Send test', 'mail'], ['Variables', 'code'], ['Delivery log', 'db'], ['Disable', 'ban', 1]])],
    ['<b>Order shipped</b>', 'Shipment created', bd('Email + SMS + Push', 'blue'), 'Customer', 'Your order is on the way — track it here', '{order_id} {courier} {tracking_no} {eta}', '3,86,000', '72%', 'EN + BN', st('Active'), A([['Edit template', 'edit'], ['Preview', 'eye'], ['Send test', 'mail']])],
    ['<b>Delivered + review request</b>', 'Order delivered', bd('Email + Push', 'blue'), 'Customer', 'Delivered! How was your experience?', '{order_id} {items} {review_link}', '3,42,000', '62%', 'EN + BN', st('Active'), A([['Edit template', 'edit'], ['Preview', 'eye']])],
    ['<b>Booking confirmed</b>', 'Service booking confirmed', bd('SMS + Push', 'amber'), 'Customer', 'Your AC service is confirmed for 24 Aug, 10 AM', '{service} {provider} {slot} {address} {price}', '48,620', '—', 'EN + BN', st('Active'), A([['Edit template', 'edit'], ['Preview', 'eye']])],
    ['<b>New lead notification</b>', 'Lead created', bd('SMS + Push', 'amber'), 'Vendor', 'New lead: AC repair in Mirpur — respond now', '{lead_id} {category} {area} {customer_name}', '1,86,000', '—', 'EN', st('Active'), A([['Edit template', 'edit'], ['Preview', 'eye']])],
    ['<b>Refund processed</b>', 'Refund completed', bd('Email + SMS', 'green'), 'Customer', 'Your refund of ' + tk(11290) + ' has been processed', '{amount} {order_id} {method} {days}', '18,420', '74%', 'EN + BN', st('Active'), A([['Edit template', 'edit'], ['Preview', 'eye']])],
    ['<b>Payout advice</b>', 'Payout paid', bd('Email', 'blue'), 'Vendor', 'Payout of ' + tk(2067200) + ' sent to your bank', '{vendor} {amount} {period} {statement}', '6,842', '86%', 'EN', st('Active'), A([['Edit template', 'edit'], ['Preview', 'eye'], ['Attach PDF', 'file']])],
    ['<b>OTP verification</b>', 'Login / signup OTP', bd('SMS', 'green'), 'Everyone', 'Your Niko OTP is {otp}. Valid for 3 minutes.', '{otp} {minutes}', '8,42,000', '—', 'EN', st('Active'), A([['Edit template', 'edit'], ['Preview', 'eye'], ['Rate limits', 'shield']])],
    ['<b>Password reset</b>', 'Reset requested', bd('Email', 'blue'), 'Everyone', 'Reset your Niko password', '{name} {reset_link} {expiry}', '48,620', '58%', 'EN + BN', st('Active'), A([['Edit template', 'edit'], ['Preview', 'eye']])],
    ['<b>Vendor suspended notice</b>', 'Vendor suspended', bd('Email', 'red'), 'Vendor', 'Important: your shop has been suspended', '{vendor} {reason} {appeal_link}', '86', '92%', 'EN', st('Active'), A([['Edit template', 'edit'], ['Preview', 'eye']])],
    ['<b>Abandoned cart reminder</b>', 'Cart idle 1 hour', bd('Email + Push', 'gray'), 'Customer', 'You left something behind…', '{name} {items} {cart_link} {coupon}', '4,86,000', '18%', 'EN + BN', st('Active'), A([['Edit template', 'edit'], ['Preview', 'eye'], ['A/B test', 'bolt']])],
    ['<b>Old newsletter template</b>', 'Manual', bd('Email', 'gray'), 'Customer', 'Weekly deals from Niko', '{deals}', '0', '—', 'EN', st('Disabled'), A([['Edit template', 'edit'], ['Enable', 'check'], ['Delete', 'trash', 1]])]
  ], total: 86,
  after: row2(card('Template editor — Order confirmation', `<div class="p-4">${gridForm([
    fld('Template name *', inp('Order confirmation')), fld('Trigger event', sel(['Order placed', 'Order shipped', 'Order delivered', 'Order cancelled', 'Custom'])),
    fld('Channels', sel(['Email + SMS', 'Email only', 'SMS only', 'Email + SMS + Push'])), fld('Language', sel(['English + Bengali', 'English', 'Bengali'])),
    fld('From name', inp('Niko Bangladesh')), fld('Reply-to', inp('support@niko.com.bd')),
    fld('Subject line *', inp('Your Niko order {order_id} is confirmed'), 'sm:col-span-2'),
    fld('Email body (HTML)', ta('<h2>Thank you, {name}!</h2>\n<p>Your order {order_id} has been confirmed. Estimated delivery {eta}.</p>\n{items_table}\n<p>Total paid: {total}</p>\n<a href="{track_link}">Track your order</a>'), 'sm:col-span-2'),
    fld('SMS text (max 160 chars)', ta('Niko: Order {order_id} confirmed. Total {total}. Track: {track_link}'), 'sm:col-span-2'),
    fld('Push title', inp('Order confirmed 🎉')), fld('Push body', inp('Order {order_id} is confirmed. Tap to track.'))
  ])}
<div class="flex flex-wrap gap-2 mt-3">${btn('Save template', 'check', 'primary', 'data-toast="Template saved"')}${btn('Send test email', 'mail')}${btn('Send test SMS', 'msg')}${btn('Preview', 'eye')}${btn('Revert to default', 'refresh', 'ghost')}</div></div>`),
    card('Sender configuration & variables', `<div class="p-4">${gridForm([
      fld('Email provider', sel(['Amazon SES', 'SendGrid', 'Mailgun', 'SMTP'])), fld('SMS gateway', sel(['SSL Wireless', 'Robi', 'Banglalink', 'Twilio'])),
      fld('SMS sender ID', inp('NIKOBD')), fld('Email from address', inp('no-reply@niko.com.bd')),
      fld('Bounce handling', sel(['Auto-suppress after 2 hard bounces', 'Manual review'])), fld('Daily send limit', inp('20,00,000'))
    ])}
${kv([['Available variables', '{name} {email} {phone} {order_id} {items} {total} {eta} {courier} {tracking_no} {amount} {vendor} {otp} {reset_link} {coupon}'], ['Fallback language', 'English'], ['Unsubscribe footer', 'Added automatically to marketing email'], ['DKIM / SPF', 'Verified for niko.com.bd']])}
<div class="flex flex-wrap gap-2 mt-3">${btn('Test deliverability', 'bolt')}${btn('Suppression list (842)', 'ban')}${btn('Delivery log', 'db')}</div></div>`))
    + modal('m-tpl', 'Create template', gridForm([
      fld('Template name *', inp('e.g. Warranty claim received')),
      fld('Trigger event *', sel(['Order placed', 'Order shipped', 'Order delivered', 'Order cancelled', 'Return requested', 'Refund processed', 'Booking confirmed', 'Booking reminder', 'Lead created', 'Quote sent', 'Payout paid', 'KYC approved', 'Vendor suspended', 'Password reset', 'OTP', 'Manual / campaign'])),
      fld('Channels *', sel(['Email', 'SMS', 'Push', 'Email + SMS', 'All channels'])),
      fld('Audience', sel(['Customer', 'Vendor — seller', 'Vendor — provider', 'Staff', 'Everyone'])),
      fld('Language', sel(['English', 'Bengali', 'Both'])), fld('Priority', sel(['Transactional', 'Marketing'])),
      fld('Subject line', inp('Subject with {variables}'), 'sm:col-span-2'),
      fld('Body', ta('Message content with {variables}'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Enable immediately', true)}${chk('Attach PDF (invoice / statement)', false)}${chk('Include unsubscribe link', false)}${chk('Log every send', true)}</div>`
    ]) + modalFoot('Create template', 'Template created'))
});
