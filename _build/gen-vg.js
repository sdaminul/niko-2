/* Vendor: invoices, reports, staff, documents, subscription, promotions, ads, academy, notifications, settings */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, svg, ph, stars, tk, prow, hbars, lineChart, barChart, donut, mini, tiles, kv, note, fld, inp, sel, ta, sw, chk, gridForm, frows, formCard, people, timeline, bars, modal, modalFoot, tfoot, empty } = K;
const { V, btn, A, row2, row3, side } = R;

/* --------------------------- INVOICES --------------------------------- */
V('invoices.html', {
  title: 'Invoices & Tax', sub: 'Order invoices, service bills, VAT records and tax documents.', crumb: 'Invoices',
  actions: [['Tax settings', 'cog'], ['Bulk download', 'dl'], ['Create invoice', 'plus', 'primary', 'data-modal-open="m-inv"']],
  stats: [['Invoices issued', '1,842', '+9%', 'receipt', 'brand', 'Aug 2026'],
    ['Total invoiced', tk(524800), '+14%', 'money', 'service', 'Incl. VAT'],
    ['VAT collected', tk(26240), '+12%', 'scale', 'gold', '5% standard rate'],
    ['Unpaid invoices', tk(18400), '', 'clock', 'ink', '6 invoices pending']],
  tabs: [['All invoices', '1,842'], ['Paid', '1,798'], ['Unpaid', '6'], ['Partially paid', '4'], ['Credit notes', '28'], ['Service bills', '164'], ['Cancelled', '6']],
  filters: ['search', ['All types', 'Product invoice', 'Service bill', 'Credit note', 'Proforma'], ['All statuses', 'Paid', 'Unpaid', 'Overdue'], 'date', ['Sort: Newest', 'Highest amount']],
  fbtns: btn('Print selected', 'print', 'outline', 'data-print') + btn('Export ZIP', 'dl'),
  bulk: ['Download PDF', 'Send to customer', 'Mark as paid', 'Create credit note', 'Export'],
  head: ['Invoice no.', 'Customer', 'Order / booking', 'Issue date', 'Due date', 'Subtotal', 'VAT (5%)', 'Total', 'Status', ['Actions', 'text-right']],
  rows: [
    ['<b>INV-2026-18421</b><p class="text-[11px] text-ink-400">Product invoice</p>', prow(0, 'Kamal Uddin', 'Banani, Dhaka', 'user'), '<a href="order-details.html" class="link">HB-884213</a>', '17 Aug 2026', '17 Aug 2026', tk(10752), tk(538), `<b>${tk(11290)}</b>`, st('Paid'), A([['View invoice', 'eye'], ['Download PDF', 'dl'], ['Print', 'print'], ['Email to customer', 'mail'], ['Create credit note', 'return']])],
    ['<b>INV-2026-18420</b><p class="text-[11px] text-ink-400">Service bill</p>', prow(1, 'Sadia Rahman', 'Dhanmondi, Dhaka', 'user'), 'BK-40218 · AC servicing', '16 Aug 2026', '16 Aug 2026', tk(3048), tk(152), `<b>${tk(3200)}</b>`, st('Paid'), A([['View invoice', 'eye'], ['Download PDF', 'dl'], ['Email', 'mail']])],
    ['<b>INV-2026-18418</b>', prow(2, 'Tanvir Alam', 'Mirpur 10, Dhaka', 'user'), '<a href="order-details.html" class="link">HB-884198</a>', '15 Aug 2026', '22 Aug 2026', tk(17524), tk(876), `<b>${tk(18400)}</b>`, st('Pending'), A([['View invoice', 'eye'], ['Send reminder', 'bell'], ['Mark as paid', 'check'], ['Cancel invoice', 'x', 1]])],
    ['<b>CN-2026-00284</b><p class="text-[11px] text-ink-400">Credit note</p>', prow(3, 'Nusrat Jahan', 'Gulshan 2, Dhaka', 'user'), 'RT-88402 · Return refund', '14 Aug 2026', '—', '– ' + tk(8000), '– ' + tk(400), `<b class="text-brand-600">– ${tk(8400)}</b>`, st('Refunded'), A([['View note', 'eye'], ['Download PDF', 'dl']])],
    ['<b>INV-2026-18402</b>', prow(4, 'Imran Hossain', 'Uttara 7, Dhaka', 'user'), '<a href="order-details.html" class="link">HB-884102</a>', '12 Aug 2026', '19 Aug 2026', tk(4571), tk(229), `<b>${tk(4800)}</b>`, st('Cancelled'), A([['View invoice', 'eye'], ['Reissue', 'refresh']])]
  ], total: 1842,
  after: row2(card('Tax & VAT settings', `<div class="p-5">${gridForm([
    fld('Business legal name', inp('', 'Rahim Electric & Home Services')), fld('BIN / VAT registration no.', inp('', '004821904-0201')),
    fld('TIN', inp('', '482910334821')), fld('Default VAT rate', sel(['5% (standard)', '7.5%', '15%', 'Exempt'])),
    fld('Tax address', ta('', 'House 42, Road 11, Banani, Dhaka 1213'), 'sm:col-span-2'),
    fld('Invoice prefix', inp('', 'INV-2026-')), fld('Next invoice number', inp('', '18422')),
    fld('Invoice footer note', ta('', 'Thank you for your business. Goods once sold are returnable within 7 days as per HaatBazar policy.'), 'sm:col-span-2')
  ])}<div class="flex flex-wrap gap-4 mt-3.5">${chk('Show VAT breakdown on invoice', true)}${chk('Auto-email invoice on order confirm', true)}${chk('Include company logo', true)}${chk('Digital signature', true)}</div>
<div class="flex gap-2 mt-3.5">${btn('Save tax settings', 'check', 'primary', 'data-toast="Tax settings saved"')}${btn('Preview invoice', 'eye')}</div></div>`),
    card('Tax documents & filings', `<div class="p-4 space-y-2.5">
${[['VAT return — July 2026', 'Filed 15 Aug 2026', 'Filed', 'green'], ['VAT return — August 2026', 'Due 15 Sep 2026', 'Due soon', 'amber'], ['Annual tax certificate 2025–26', 'Available for download', 'Ready', 'green'], ['Withholding tax statement', 'Q2 2026 · ৳26,240', 'Ready', 'green'], ['Mushak 6.3 (sales register)', 'Auto-generated monthly', 'Ready', 'green']].map((d, i) => `<div class="flex items-center gap-3 p-3 rounded-xl border border-[#e7e9ef]">
${svg('file', 'w-8 h-8 text-ink-300 shrink-0')}<div class="min-w-0 flex-1"><p class="text-[12.5px] font-bold clamp-1">${d[0]}</p><p class="text-[11.5px] text-ink-400">${d[1]}</p></div>
<span class="badge badge-${d[3]} shrink-0">${d[2]}</span><button class="icon-btn icon-btn-sm">${svg('dl', 'w-3.5 h-3.5')}</button></div>`).join('')}
${note('HaatBazar withholds 5% VAT at source on all marketplace sales and deposits it with NBR on your BIN.', 'brand', 'info')}</div>`))
    + modal('m-inv', 'Create manual invoice', gridForm([
      fld('Invoice type', sel(['Product invoice', 'Service bill', 'Proforma invoice', 'Credit note'])), fld('Customer', inp('Search customer or type name')),
      fld('Reference order / booking', inp('e.g. HB-884213 (optional)')), fld('Issue date', inp('', '', 'date')),
      fld('Due date', inp('', '', 'date')), fld('Payment terms', sel(['Due immediately', 'Net 7', 'Net 15', 'Net 30'])),
      fld('Line items', `<div class="space-y-2" id="inv-rows"><div class="grid sm:grid-cols-[2fr_.7fr_1fr_1fr_auto] gap-2" data-repeat-row>
<input class="input input-sm" placeholder="Item description"><input class="input input-sm" placeholder="Qty" value="1"><input class="input input-sm" placeholder="Unit price"><input class="input input-sm" placeholder="Total" readonly><button class="icon-btn icon-btn-sm text-brand-600" data-repeat-remove>${svg('trash')}</button></div></div>
<button class="btn btn-xs btn-outline mt-2" data-repeat-add="#inv-rows">${svg('plus')}Add line item</button>`, 'sm:col-span-2'),
      fld('Discount', inp('0')), fld('VAT rate', sel(['5%', '7.5%', '15%', 'Exempt'])),
      fld('Notes to customer', ta('Optional note printed on the invoice'), 'sm:col-span-2')
    ]) + modalFoot('Create & send invoice', 'Invoice created'))
});

/* ---------------------------- REPORTS --------------------------------- */
V('reports.html', {
  title: 'Reports & Statements', sub: 'Download detailed business reports, statements and performance exports.', crumb: 'Reports',
  actions: [['Schedule report', 'clock'], ['Custom report', 'sliders'], ['Download all', 'dl', 'primary']],
  stats: [['Reports generated', '284', '', 'file', 'brand', 'Last 12 months'],
    ['Scheduled reports', '6', '', 'clock', 'service', 'Auto-emailed monthly'],
    ['Data range available', '36 months', '', 'db', 'gold', 'Since Mar 2023'],
    ['Last export', '2 hours ago', '', 'dl', 'ink', 'Sales summary Aug']],
  top: row2(card('Generate a report', `<div class="p-5">${gridForm([
    fld('Report type *', sel(['Sales summary', 'Order detail report', 'Product performance', 'Service & booking report', 'Lead report', 'Inventory & stock movement', 'Returns & refunds', 'Customer report', 'Payout statement', 'Commission & fee report', 'Tax / VAT report', 'Ad performance', 'Review summary', 'Traffic & conversion'])),
    fld('Date range', sel(['Today', 'Last 7 days', 'Last 30 days', 'This month', 'Last month', 'This quarter', 'This year', 'Custom range'])),
    fld('From', inp('', '', 'date')), fld('To', inp('', '', 'date')),
    fld('Group by', sel(['Day', 'Week', 'Month', 'Product', 'Category', 'Location', 'Payment method'])),
    fld('Format', sel(['Excel (.xlsx)', 'CSV', 'PDF', 'Google Sheets'])),
    fld('Include', `<div class="flex flex-wrap gap-3.5">${chk('Charts & graphs', true)}${chk('Detailed line items', true)}${chk('Tax breakdown', true)}${chk('Comparison vs previous period', true)}</div>`, 'sm:col-span-2'),
    fld('Delivery', sel(['Download now', 'Email to me', 'Email to accountant'])), fld('Email address', inp('accounts@rahimelectric.com.bd'))
  ])}<div class="flex gap-2 mt-4">${btn('Generate report', 'file', 'primary', 'data-toast="Report is being generated"')}${btn('Save as template', 'save')}${btn('Schedule monthly', 'clock')}</div></div>`),
    card('Quick reports', `<div class="p-4">${tiles([
      ['money', 'Sales summary', 'Revenue, orders, AOV by period', '#', 'brand'],
      ['box', 'Product performance', 'Best & worst sellers, views, conversion', '#', 'service'],
      ['wrench', 'Service & bookings', 'Jobs, leads, conversion, ratings', '#', 'gold'],
      ['return', 'Returns & refunds', 'Return rate, reasons, refund value', '#', 'ink'],
      ['bank', 'Payout statement', 'Settlements, deductions, net paid', '#', 'brand'],
      ['scale', 'VAT & tax report', 'Mushak-ready sales and VAT register', '#', 'service']
    ], 'grid-cols-1 sm:grid-cols-2')}</div>`)),
  head: ['Report', 'Type', 'Period', 'Format', 'Size', 'Generated', 'Generated by', 'Status', ['Actions', 'text-right']],
  tableTitle: 'Report history',
  rows: [
    ['<b>Sales summary — August 2026</b>', '<span class="badge badge-blue">Sales</span>', '01–17 Aug 2026', 'Excel', '284 KB', '17 Aug, 02:10 PM', 'Rahim Electric', st('Completed'), A([['Download', 'dl'], ['Email', 'mail'], ['Regenerate', 'refresh'], ['Delete', 'trash', 1]])],
    ['<b>Payout statement — Jul 2026</b>', '<span class="badge badge-purple">Finance</span>', '01–31 Jul 2026', 'PDF', '196 KB', '01 Aug, 09:00 AM', 'System (scheduled)', st('Completed'), A([['Download', 'dl'], ['Email', 'mail']])],
    ['<b>Product performance Q2</b>', '<span class="badge badge-green">Catalog</span>', 'Apr–Jun 2026', 'Excel', '1.2 MB', '05 Jul, 11:24 AM', 'Rahim Electric', st('Completed'), A([['Download', 'dl'], ['Regenerate', 'refresh']])],
    ['<b>VAT register — July 2026</b>', '<span class="badge badge-amber">Tax</span>', '01–31 Jul 2026', 'PDF', '142 KB', '01 Aug, 09:05 AM', 'System (scheduled)', st('Completed'), A([['Download', 'dl'], ['Send to NBR portal', 'send']])],
    ['<b>Lead report — August</b>', '<span class="badge badge-blue">Services</span>', '01–17 Aug 2026', 'CSV', '—', 'In progress', 'Rahim Electric', st('Processing'), A([['Cancel', 'x', 1]])]
  ], total: 284,
  after: row2(card('Scheduled reports', table([['Report'], ['Frequency'], ['Recipients'], ['Next run'], ['', 'text-right']], [
    ['Sales summary', 'Monthly · 1st, 9:00 AM', 'me@rahimelectric.com.bd', '01 Sep 2026', A([['Edit schedule', 'edit'], ['Pause', 'pause'], ['Delete', 'trash', 1]])],
    ['Payout statement', 'Twice monthly · 1st & 15th', 'accounts@rahimelectric.com.bd', '01 Sep 2026', A([['Edit schedule', 'edit'], ['Pause', 'pause']])],
    ['VAT register', 'Monthly · 1st', 'accounts@ + auditor@', '01 Sep 2026', A([['Edit schedule', 'edit'], ['Pause', 'pause']])],
    ['Inventory low-stock alert', 'Weekly · Saturday', 'me@rahimelectric.com.bd', '22 Aug 2026', A([['Edit schedule', 'edit'], ['Delete', 'trash', 1]])]
  ]), btn('Add schedule', 'plus', 'outline')),
    card('Business snapshot (Aug 2026)', `<div class="p-4">${kv([['Gross sales', tk(524800)], ['Orders delivered', '1,684'], ['Service jobs completed', '164'], ['Average order value', tk(2480)], ['Return rate', '2.4%'], ['Cancellation rate', '1.8%'], ['Repeat customer rate', '30.3%'], ['Average rating', '4.9 / 5'], ['Response rate', '96%'], ['Net earnings', tk(412320)]])}
<div class="flex gap-2 mt-3">${btn('Download snapshot', 'dl')}${btn('Compare periods', 'chart')}</div></div>`))
});
