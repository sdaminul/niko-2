const fs = require('fs');
const { svg, ph, stars, dashPage, stats, card, lineChart, donut, hbars, filterbar, tabs, table, tfoot, bulkbar, st, empty, prow, actionsCell } = require('./dash');
const W = (f, o) => fs.writeFileSync('vendor/' + f, dashPage(Object.assign({ role: 'vendor' }, o)));

/* ------------------------------- INVENTORY ------------------------------- */
W('inventory.html', {
  title: 'Inventory &amp; Stock', sub: 'Track stock levels across warehouses, set alerts and log adjustments.', active: 'inventory.html', crumbs: ['Product Business', 'Inventory'],
  actions: `<button class="btn btn-sm btn-outline">${svg('dl')}Export stock sheet</button><button class="btn btn-sm btn-outline">${svg('up')}Import update</button><button class="btn btn-sm btn-primary" data-modal-open="adjust">${svg('plus')}Stock adjustment</button>`,
  body: `${stats([['Total stock value', '৳42,18,600', '', 'money', 'brand'], ['Units in stock', '4,286', '', 'layers', 'service'], ['Low stock items', '6', '', 'warn', 'gold'], ['Out of stock', '9', '', 'x', 'brand']])}
${tabs([['All stock', '248'], ['Low stock', '6'], ['Out of stock', '9'], ['Overstocked', '12'], ['Adjustment log', '']])}
${filterbar(['search', ['All warehouses', 'Mirpur 10 Warehouse', 'Shop counter — Mirpur 1', 'Chattogram Branch'], ['All categories', 'Mobiles', 'Computers', 'Audio', 'Accessories'], ['Sort: Stock low–high', 'Stock high–low', 'Value high–low', 'Fastest moving']])}
${bulkbar(['Set stock', 'Add stock', 'Set low-stock alert', 'Transfer warehouse', 'Export selected'])}
${card('', table([['', 'w-8'], ['Product / SKU'], ['Warehouse'], ['In stock'], ['Reserved'], ['Available'], ['Alert at'], ['Sold / 30d'], ['Days left'], ['Stock value', 'num'], ['Actions']],
    [['Realme C100X — Green 6/128GB', 'RLM-C100X-GRN-128', 'Mirpur 10', 48, 6, 42, 10, 184, '7 days', '৳5,41,920', 'phoneDev'],
    ['24 inch LED Monitor FHD', 'MON-24-LED', 'Mirpur 10', 12, 2, 10, 10, 76, '4 days', '৳1,18,800', 'monitor'],
    ['Bluetooth Speaker Portable', 'SPK-BT-01', 'Shop counter', 6, 1, 5, 10, 118, '2 days', '৳11,100', 'bolt'],
    ['Power Bank 50,000mAh', 'PWB-50K', 'Mirpur 10', 124, 8, 116, 25, 142, '26 days', '৳1,36,400', 'bolt'],
    ['Smart Watch Fitness Pro', 'WCH-FIT-PRO', 'Mirpur 10', 0, 0, 0, 10, 64, 'Out', '৳0', 'watch'],
    ['USB-C Fast Charger 45W', 'CHG-45W-C', 'Chattogram', 210, 12, 198, 30, 168, '37 days', '৳1,99,500', 'bolt'],
    ['Smart LED Bulb 9W RGB', 'BLB-RGB-9W', 'Shop counter', 4, 0, 4, 10, 74, '2 days', '৳3,000', 'sun'],
    ['Tempered Glass Protector', 'TGP-UNI', 'Mirpur 10', 480, 24, 456, 50, 620, '23 days', '৳96,000', 'pkg']].map(r => [
      `<input type="checkbox" data-row-check class="w-4 h-4" style="accent-color:#ff2525">`,
      prow(0, r[0], `SKU: ${r[1]}`, r[10]), r[2],
      `<input class="input input-sm !w-[74px]" value="${r[3]}">`, r[4],
      `<b class="${r[5] === 0 ? 'text-brand-600' : r[5] < 10 ? 'text-gold-600' : ''}">${r[5]}</b>`,
      `<input class="input input-sm !w-[64px]" value="${r[6]}">`, r[7],
      `<span class="badge ${r[8] === 'Out' ? 'badge-red' : parseInt(r[8]) < 5 ? 'badge-amber' : 'badge-green'}">${r[8]}</span>`,
      `<b>${r[9]}</b>`,
      `<div class="flex gap-1.5"><button class="btn btn-xs btn-primary" data-toast="Stock updated">Save</button>${actionsCell([['Add stock', 'plus'], ['Stock history', 'clock'], ['Transfer warehouse', 'truck'], ['Set alert', 'bell'], ['Edit product', 'edit', false, 'add-product.html']])}</div>`
    ])) + tfoot(1, 8, 248))}
<div class="grid lg:grid-cols-2 gap-4 mt-4">
${card('Recent stock adjustments', table([['Date'], ['Product'], ['Type'], ['Change'], ['Reason'], ['By']],
    [['17 Aug, 11:20', 'Realme C100X — Green', '<span class="badge badge-green">Stock in</span>', '<b class="text-service-600">+50</b>', 'New purchase — Invoice PO-2291', 'Rahim'],
    ['16 Aug, 06:02', 'Bluetooth Speaker', '<span class="badge badge-red">Damaged</span>', '<b class="text-brand-600">−3</b>', 'Water damage in transit', 'Store staff'],
    ['15 Aug, 04:44', 'Smart Watch Fitness Pro', '<span class="badge badge-amber">Correction</span>', '<b class="text-brand-600">−6</b>', 'Physical count mismatch', 'Rahim'],
    ['14 Aug, 12:10', 'USB-C Charger 45W', '<span class="badge badge-green">Stock in</span>', '<b class="text-service-600">+200</b>', 'Bulk import from supplier', 'Rahim'],
    ['13 Aug, 09:35', 'Tempered Glass', '<span class="badge badge-blue">Transfer</span>', '<b>±100</b>', 'Chattogram → Mirpur 10', 'Logistics']], { compact: true }))}
${card('Fast &amp; slow movers', `<div class="p-4"><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Fast moving (restock soon)</p>
${hbars([['Tempered Glass Protector', 100, '#12a594'], ['Realme C100X', 78, '#12a594'], ['USB-C Charger 45W', 72, '#12a594'], ['Power Bank 50K', 61, '#12a594']])}
<p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mt-4 mb-2">Slow moving (consider discount)</p>
${hbars([['Laptop Cooling Pad', 24, '#ffb020'], ['Mini Table Fan', 18, '#ffb020'], ['CCTV Camera 3MP', 12, '#ff2525']])}</div>`)}
</div>
<div class="modal" id="adjust"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">
<div class="card-head"><h3>New stock adjustment</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5 grid sm:grid-cols-2 gap-3.5">
<div class="sm:col-span-2"><label class="label">Product / SKU <span class="req">*</span></label><input class="input" placeholder="Search product by name or SKU"></div>
<div><label class="label">Warehouse</label><select class="select"><option>Mirpur 10 Warehouse</option><option>Shop counter — Mirpur 1</option><option>Chattogram Branch</option></select></div>
<div><label class="label">Adjustment type</label><select class="select"><option>Stock in (purchase)</option><option>Stock out (manual sale)</option><option>Damaged / lost</option><option>Returned to supplier</option><option>Count correction</option><option>Warehouse transfer</option></select></div>
<div><label class="label">Quantity <span class="req">*</span></label><input class="input" placeholder="0"></div>
<div><label class="label">Unit cost (৳)</label><input class="input" placeholder="Optional"></div>
<div class="sm:col-span-2"><label class="label">Reason / reference</label><textarea class="textarea !min-h-[70px]" placeholder="e.g. Purchase invoice PO-2291 from Star Distributors"></textarea></div>
<div class="sm:col-span-2"><label class="label">Attach document</label><div class="upload-box !py-3">${svg('up', 'w-4 h-4')}<span class="text-[12px]">Invoice / challan (PDF, JPG)</span></div></div>
<div class="sm:col-span-2 flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Stock adjustment saved">Save adjustment</button></div></div></div></div>`
});

/* --------------------------------- ORDERS -------------------------------- */
const O = [
  ['HB-884213', 'Nusrat Jahan', 'Banani, Dhaka', 2, '৳11,290', 'bKash', 'Paid', 'Shipped', '17 Aug 2026', 'Steadfast · SF77219'],
  ['HB-884198', 'Karim Sheikh', 'Mirpur, Dhaka', 1, '৳9,900', 'COD', 'Pending', 'Processing', '17 Aug 2026', 'Not assigned'],
  ['HB-884176', 'Sadia Rahman', 'Uttara, Dhaka', 3, '৳4,150', 'Card', 'Paid', 'Pending', '16 Aug 2026', 'Not assigned'],
  ['HB-884140', 'Tanvir Ahmed', 'Gazipur', 1, '৳1,100', 'Nagad', 'Paid', 'Delivered', '16 Aug 2026', 'Pathao · PT88123'],
  ['HB-884122', 'Mehedi Hasan', 'Chattogram', 2, '৳3,700', 'Card', 'Failed', 'Cancelled', '16 Aug 2026', '—'],
  ['HB-884101', 'Farhana Akter', 'Dhanmondi, Dhaka', 1, '৳2,450', 'bKash', 'Paid', 'Delivered', '15 Aug 2026', 'Steadfast · SF77190'],
  ['HB-884089', 'Rasel Mahmud', 'Sylhet', 4, '৳6,820', 'COD', 'Pending', 'Ready to ship', '15 Aug 2026', 'Sundarban · SB4412'],
  ['HB-884066', 'Shirin Sultana', 'Khulna', 1, '৳750', 'bKash', 'Paid', 'Returned', '14 Aug 2026', 'RedX · RX2201']
];
W('orders.html', {
  title: 'Orders', sub: '32 orders need action · ship on time to protect your seller score', active: 'orders.html', crumbs: ['Product Business', 'Orders'],
  actions: `<button class="btn btn-sm btn-outline">${svg('print')}Print invoices</button><button class="btn btn-sm btn-outline">${svg('dl')}Export</button><button class="btn btn-sm btn-primary" data-modal-open="ship">${svg('truck')}Bulk ship</button>`,
  body: `${stats([['Orders today', '18', '+12%', 'bag', 'brand'], ['To process', '32', '', 'clock', 'gold'], ['Ready to ship', '11', '', 'pkg', 'brand'], ['Delivered (30d)', '842', '+18%', 'check', 'service']])}
${tabs([['All', '1,284'], ['Pending', '9'], ['Processing', '12'], ['Ready to ship', '11'], ['Shipped', '48'], ['Delivered', '842'], ['Cancelled', '36'], ['Returns', '18'], ['Failed delivery', '6']])}
${filterbar(['search', ['Payment: All', 'bKash', 'Nagad', 'Card', 'COD', 'Wallet'], ['Payment status: All', 'Paid', 'Pending', 'Failed', 'Refunded'], ['Courier: All', 'Steadfast', 'Pathao', 'RedX', 'Sundarban', 'Own delivery'], ['Sort: Newest', 'Oldest', 'Value high–low']], `<input type="date" class="input input-sm !w-auto">`)}
${bulkbar(['Confirm orders', 'Print invoice', 'Print label', 'Assign courier', 'Mark ready to ship', 'Mark shipped', 'Cancel'])}
${card('', table([['', 'w-8'], ['Order ID'], ['Date'], ['Customer'], ['Items'], ['Total'], ['Payment'], ['Fulfilment'], ['Courier / tracking'], ['Actions']],
    O.map(o => [`<input type="checkbox" data-row-check class="w-4 h-4" style="accent-color:#ff2525">`,
    `<a href="order-details.html" class="font-extrabold text-brand-600">${o[0]}</a>`,
    `${o[8]}<p class="text-[11.5px] text-ink-400">10:24 AM</p>`,
    `<b>${o[1]}</b><p class="text-[11.5px] text-ink-400">${o[2]}</p>`,
      o[3], `<b>${o[4]}</b>`,
    `${st(o[6])}<p class="text-[11.5px] text-ink-400 mt-0.5">${o[5]}</p>`,
      st(o[7]), `<span class="text-[12px]">${o[9]}</span>`,
    `<div class="flex gap-1.5"><a href="order-details.html" class="btn btn-xs btn-outline">${svg('eye')}</a>
${o[7] === 'Pending' ? `<button class="btn btn-xs btn-primary" data-toast="Order confirmed">Confirm</button>` : o[7] === 'Processing' || o[7] === 'Ready to ship' ? `<button class="btn btn-xs btn-primary" data-modal-open="ship">Ship</button>` : ''}
${actionsCell([['Print invoice', 'print'], ['Print shipping label', 'file'], ['Packing slip', 'pkg'], ['Message customer', 'msg', false, 'messages.html'], ['Add internal note', 'edit'], ['Request pickup', 'truck'], ['Cancel order', 'x', true]])}</div>`
    ])) + tfoot(1, 8, 1284))}
<div class="modal" id="ship"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel">
<div class="card-head"><h3>Arrange shipment — HB-884198</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5 space-y-3.5">
<div class="grid sm:grid-cols-2 gap-3.5">
<div><label class="label">Courier partner <span class="req">*</span></label><select class="select"><option>Steadfast Courier</option><option>Pathao Courier</option><option>RedX</option><option>Sundarban Courier</option><option>eCourier</option><option>My own delivery man</option></select></div>
<div><label class="label">Service type</label><select class="select"><option>Standard (2–3 days)</option><option>Express (next day)</option><option>Same day (Dhaka only)</option></select></div>
<div><label class="label">Number of parcels</label><input class="input" value="1"></div>
<div><label class="label">Total weight (kg)</label><input class="input" value="0.45"></div>
<div><label class="label">Pickup date</label><input type="date" class="input"></div>
<div><label class="label">Pickup time slot</label><select class="select"><option>10:00 AM – 01:00 PM</option><option>01:00 PM – 04:00 PM</option><option>04:00 PM – 07:00 PM</option></select></div>
<div class="sm:col-span-2"><label class="label">Tracking number (if already generated)</label><input class="input" placeholder="Leave empty to auto-generate"></div>
<div class="sm:col-span-2"><label class="label">Note for the courier</label><textarea class="textarea !min-h-[64px]" placeholder="e.g. Fragile — handle with care. Call before delivery."></textarea></div></div>
<label class="check"><input type="checkbox" checked>Send SMS &amp; email tracking update to the customer</label>
<label class="check"><input type="checkbox" checked>Print invoice and shipping label after saving</label>
<div class="flex gap-2"><button class="btn btn-outline flex-1" data-modal-close>Cancel</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Shipment arranged — label ready">${svg('truck')}Confirm shipment</button></div></div></div></div>`
});

/* ----------------------------- ORDER DETAILS ----------------------------- */
W('order-details.html', {
  title: 'Order HB-884213', sub: 'Placed 17 Aug 2026, 10:24 AM · Nusrat Jahan · Paid with bKash', active: 'orders.html', crumbs: ['Orders', 'HB-884213'],
  actions: `<button class="btn btn-sm btn-outline">${svg('print')}Invoice</button><button class="btn btn-sm btn-outline">${svg('file')}Shipping label</button><button class="btn btn-sm btn-outline">${svg('msg')}Message buyer</button><button class="btn btn-sm btn-primary">${svg('truck')}Update fulfilment</button>`,
  body: `<div class="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-4">
<div class="space-y-4">
${card('Fulfilment progress', `<div class="p-5"><div class="steps mb-5 flex-wrap gap-y-3">
<div class="step is-done"><span class="num">${svg('check', 'w-3 h-3')}</span>Confirmed</div><span class="step-line"></span>
<div class="step is-done"><span class="num">${svg('check', 'w-3 h-3')}</span>Packed</div><span class="step-line"></span>
<div class="step is-current"><span class="num">3</span>Shipped</div><span class="step-line"></span>
<div class="step"><span class="num">4</span>Out for delivery</div><span class="step-line"></span>
<div class="step"><span class="num">5</span>Delivered</div></div>
<div class="grid sm:grid-cols-3 gap-3 text-[12.5px]">
<div class="p-3 rounded-xl bg-ink-50"><p class="text-ink-500">Courier</p><b>Steadfast Courier</b></div>
<div class="p-3 rounded-xl bg-ink-50"><p class="text-ink-500">Tracking number</p><b class="mono">SF77219845</b></div>
<div class="p-3 rounded-xl bg-ink-50"><p class="text-ink-500">Expected delivery</p><b>19 Aug 2026</b></div></div></div>`,
    `<span class="badge badge-blue">${svg('truck')}Shipped</span>`)}
${card('Items in this order (2)', `<div class="divide-y divide-[#f0f1f5]">${[['Realme C100X 6/128GB — Green', 'RLM-C100X-GRN-128', 1, '৳11,290', 'phoneDev'], ['Tempered Glass Protector', 'TGP-UNI', 2, '৳400', 'pkg']].map((it, i) => `<div class="p-4 flex gap-3.5">${ph(i, it[4], 'w-16 h-16 rounded-xl shrink-0')}
<div class="min-w-0 flex-1"><p class="text-[13.5px] font-bold">${it[0]}</p><p class="text-[12px] text-ink-400 mono">SKU: ${it[1]}</p>
<div class="flex flex-wrap gap-1.5 mt-1.5"><span class="badge badge-gray">Qty ${it[2]}</span><span class="badge badge-green">In stock</span><span class="badge badge-blue">7-day return</span></div></div>
<div class="text-right"><p class="font-extrabold">${it[3]}</p><p class="text-[11.5px] text-ink-400">Commission ৳${i ? '32' : '903'}</p></div></div>`).join('')}</div>
<div class="p-4 bg-ink-50 grid sm:grid-cols-2 gap-x-8 gap-y-1.5 text-[13px]">
${[['Items subtotal', '৳11,690'], ['Shipping charged to buyer', '৳0'], ['Voucher discount (seller funded)', '−৳400'], ['Order total paid', '৳11,290'], ['HaatBazar commission (8%)', '−৳903'], ['Payment gateway fee', '−৳203']].map(r => `<div class="flex justify-between"><span class="text-ink-500">${r[0]}</span><b>${r[1]}</b></div>`).join('')}
<div class="flex justify-between sm:col-span-2 pt-2 mt-1 border-t border-ink-200"><span class="font-extrabold">Your net earning</span><b class="text-[16px] text-service-600">৳10,184</b></div></div>`)}
${card('Order timeline &amp; activity', `<div class="p-5"><div class="timeline">${[['Order placed by customer', '17 Aug, 10:24 AM', 'done'], ['Payment confirmed — bKash TRX 8H2LP9', '17 Aug, 10:25 AM', 'done'], ['Seller confirmed the order', '17 Aug, 11:02 AM', 'done'], ['Parcel packed &amp; invoice printed', '17 Aug, 02:15 PM', 'done'], ['Handed over to Steadfast Courier', '17 Aug, 05:40 PM', 'active'], ['Out for delivery', 'Expected 19 Aug', ''], ['Delivered', 'Expected 19 Aug', '']].map(t => `<div class="tl-item ${t[2] ? 'is-' + t[2] : ''}"><p class="text-[13px] font-bold">${t[0]}</p><p class="text-[11.5px] text-ink-400">${t[1]}</p></div>`).join('')}</div>
<div class="dotted-sep pt-4 mt-2"><label class="label">Add internal note (not visible to customer)</label>
<textarea class="textarea !min-h-[70px]" placeholder="e.g. Customer requested delivery after 5 PM"></textarea>
<button class="btn btn-sm btn-outline mt-2">${svg('plus')}Save note</button></div></div>`)}
</div>
<aside class="space-y-4">
${card('Customer', `<div class="p-4"><div class="flex items-center gap-3 mb-3"><span class="avatar avatar-md bg-brand-500">N</span>
<div><p class="text-[13.5px] font-extrabold">Nusrat Jahan</p><p class="text-[12px] text-ink-400">14 orders · Member since 2023</p></div></div>
<div class="space-y-1.5 text-[12.5px] text-ink-600">${[['phone', '+880 17XX-XXX-482 (masked)'], ['mail', 'n****@gmail.com'], ['star', 'Leaves reviews often — 4.9 avg']].map(r => `<p class="flex items-center gap-2">${svg(r[0], 'w-3.5 h-3.5 text-ink-400')}${r[1]}</p>`).join('')}</div>
<div class="flex gap-2 mt-3"><button class="btn btn-sm btn-outline flex-1">${svg('msg')}Message</button><button class="btn btn-sm btn-outline flex-1">${svg('phone')}Call</button></div></div>`)}
${card('Shipping address', `<div class="p-4 text-[13px] leading-relaxed"><p class="font-extrabold">Nusrat Jahan</p>
<p class="text-ink-600">House 42, Road 11, Block C<br>Banani, Dhaka 1213<br>Dhaka Division, Bangladesh</p>
<p class="text-ink-600 mt-1">+880 17XX-XXX-482</p>
<span class="badge badge-teal mt-2">${svg('home')}Home address</span>
<div class="p-3 rounded-xl bg-ink-50 text-[12px] text-ink-600 mt-3"><b>Delivery note:</b> Please call before arriving, gate is locked after 8 PM.</div>
<button class="btn btn-sm btn-outline btn-block mt-3">${svg('copy')}Copy address</button></div>`)}
${card('Payment', `<div class="p-4 space-y-2 text-[12.5px]">${[['Method', 'bKash (mobile wallet)'], ['Transaction ID', '8H2LP9QR41'], ['Paid at', '17 Aug, 10:25 AM'], ['Status', '<span class="badge badge-green">Paid &amp; verified</span>'], ['Payout status', '<span class="badge badge-amber">Pending clearance</span>'], ['Expected payout', '20 Aug 2026']].map(r => `<div class="flex justify-between gap-3"><span class="text-ink-500">${r[0]}</span><b class="text-right">${r[1]}</b></div>`).join('')}</div>`)}
${card('Quick actions', `<div class="p-4 space-y-2">${[['print', 'Print invoice'], ['file', 'Print shipping label'], ['pkg', 'Print packing slip'], ['truck', 'Change courier'], ['refresh', 'Reschedule delivery'], ['flag', 'Report an issue'], ['x', 'Cancel order']].map(a => `<button class="btn btn-sm btn-outline btn-block !justify-start">${svg(a[0])}${a[1]}</button>`).join('')}</div>`)}
</aside></div>`
});

/* ----------------------------- RETURNS (vendor) --------------------------- */
W('returns.html', {
  title: 'Returns &amp; Refunds', sub: 'Approve or reject return requests within 48 hours to avoid auto-approval.', active: 'returns.html', crumbs: ['Product Business', 'Returns'],
  actions: `<button class="btn btn-sm btn-outline">${svg('dl')}Export</button><a href="settings.html" class="btn btn-sm btn-outline">${svg('cog')}Return settings</a>`,
  body: `${stats([['Open requests', '4', '', 'return', 'brand'], ['Return rate', '1.4%', '−0.3pp', 'chart', 'service'], ['Refunded (30d)', '৳18,420', '', 'money', 'gold'], ['Auto-approved', '2', '', 'warn', 'brand']])}
${tabs([['All', '18'], ['Pending your action', '4'], ['Approved', '8'], ['In transit back', '2'], ['Received', '3'], ['Refunded', '9'], ['Rejected', '2'], ['Disputed', '1']])}
${filterbar(['search', ['Reason: All', 'Damaged / defective', 'Wrong item sent', 'Not as described', 'Changed mind', 'Missing parts', 'Late delivery'], ['Type: All', 'Refund only', 'Replacement', 'Exchange'], ['Sort: Newest', 'Deadline soonest', 'Value high–low']])}
${card('', table([['Request'], ['Order'], ['Product'], ['Customer'], ['Reason'], ['Requested'], ['Deadline'], ['Amount'], ['Status'], ['Actions']],
    [['RET-5541', 'HB-884066', 'Smart LED Bulb 9W RGB', 'Shirin Sultana', 'Damaged / defective', '16 Aug', '<b class="text-brand-600">In 11 hours</b>', '৳750', 'Pending', 'sun'],
    ['RET-5538', 'HB-883902', 'Bluetooth Speaker', 'Rasel Mahmud', 'Not as described', '15 Aug', 'In 1 day', '৳1,850', 'Pending', 'bolt'],
    ['RET-5530', 'HB-883841', 'USB-C Charger 45W', 'Farhana Akter', 'Wrong item sent', '15 Aug', 'In 2 days', '৳950', 'Pending', 'bolt'],
    ['RET-5522', 'HB-883790', 'Power Bank 50,000mAh', 'Tanvir Ahmed', 'Changed mind', '14 Aug', '—', '৳1,100', 'Approved', 'bolt'],
    ['RET-5510', 'HB-883702', '24 inch LED Monitor', 'Mehedi Hasan', 'Damaged / defective', '12 Aug', '—', '৳9,900', 'Received', 'monitor'],
    ['RET-5498', 'HB-883640', 'Tempered Glass', 'Karim Sheikh', 'Missing parts', '10 Aug', '—', '৳200', 'Refunded', 'pkg'],
    ['RET-5486', 'HB-883588', 'Smart Watch Fitness Pro', 'Nusrat Jahan', 'Changed mind', '08 Aug', '—', '৳2,300', 'Rejected', 'watch']].map(r => [
      `<b>${r[0]}</b>`, `<a href="order-details.html" class="link">${r[1]}</a>`, prow(0, r[2], 'Qty 1', r[9]), r[3],
      `<span class="badge badge-gray">${r[4]}</span>`, r[5], r[6], `<b>${r[7]}</b>`, st(r[8]),
      `<div class="flex gap-1.5">${r[8] === 'Pending' ? `<button class="btn btn-xs btn-primary" data-modal-open="ret">Review</button>` : `<button class="btn btn-xs btn-outline">${svg('eye')}</button>`}
${actionsCell([['Approve return', 'check'], ['Reject with reason', 'x'], ['Offer replacement', 'refresh'], ['Offer partial refund', 'money'], ['Chat with customer', 'msg'], ['Escalate to HaatBazar', 'flag']])}</div>`
    ])) + tfoot(1, 7, 18))}
<div class="modal" id="ret"><div class="modal-backdrop" data-modal-close></div><div class="modal-panel is-wide">
<div class="card-head"><h3>Return request RET-5541</h3><button data-modal-close class="icon-btn">${svg('x')}</button></div>
<div class="p-5 grid md:grid-cols-2 gap-5">
<div><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Customer's claim</p>
<div class="p-3.5 rounded-xl bg-ink-50 text-[13px] mb-3"><p class="font-bold mb-1">Reason: Damaged / defective</p>
<p class="text-ink-600">"The bulb stopped working after 2 days. The RGB mode does not respond to the app at all. I would like a replacement or a full refund."</p>
<p class="text-[11.5px] text-ink-400 mt-2">Submitted 16 Aug 2026, 09:12 PM</p></div>
<p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Evidence uploaded (3)</p>
<div class="grid grid-cols-3 gap-2 mb-3">${[0, 1, 2].map(i => ph(i, 'camera', 'aspect-square rounded-xl')).join('')}</div>
<div class="space-y-1.5 text-[12.5px]">${[['Order', 'HB-884066 · 14 Aug 2026'], ['Product', 'Smart LED Bulb 9W RGB × 1'], ['Paid', '৳750 via bKash'], ['Delivered on', '15 Aug 2026'], ['Buyer history', '9 orders · 1 previous return']].map(r => `<div class="flex justify-between"><span class="text-ink-500">${r[0]}</span><b>${r[1]}</b></div>`).join('')}</div></div>
<div><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400 mb-2">Your decision</p>
<div class="space-y-2 mb-3.5">${[['Approve — refund in full (৳750)', true], ['Approve — send replacement unit', false], ['Approve — partial refund', false], ['Reject the request', false]].map(o => `<label class="check p-3 rounded-xl border border-[#e7e9ef] w-full"><input type="radio" name="dec" ${o[1] ? 'checked' : ''}>${o[0]}</label>`).join('')}</div>
<div class="mb-3"><label class="label">Partial refund amount (৳)</label><input class="input" placeholder="0.00"></div>
<div class="mb-3"><label class="label">Who pays return shipping?</label><select class="select"><option>Seller (me) — recommended for defects</option><option>Customer</option><option>Split 50/50</option></select></div>
<div class="mb-3"><label class="label">Message to customer <span class="req">*</span></label><textarea class="textarea !min-h-[90px]">Sorry for the trouble. We have approved your return — our courier will collect the bulb tomorrow and your refund will be processed within 3 working days.</textarea></div>
<label class="check mb-3"><input type="checkbox" checked>Arrange pickup automatically through the courier</label>
<div class="flex gap-2"><button class="btn btn-danger flex-1" data-modal-close>Reject</button><button class="btn btn-primary flex-1" data-modal-close data-toast="Return approved — pickup arranged">Approve return</button></div></div></div></div></div>`
});

/* ------------------------------ SHOP PROFILE ----------------------------- */
W('shop-profile.html', {
  title: 'Shop Profile', sub: 'This is your product storefront — banners, story, policies and social links.', active: 'shop-profile.html', crumbs: ['Product Business', 'Shop Profile'],
  actions: `<a href="../shop-profile.html" class="btn btn-sm btn-outline">${svg('eye')}View public page</a><button class="btn btn-sm btn-primary" data-toast="Shop profile saved">${svg('check')}Save changes</button>`,
  body: `<div class="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-4">
<div class="space-y-4">
${card('Store branding', `<div class="p-5">
<label class="label">Cover banner (1920 × 420 px)</label>
<div class="relative rounded-xl overflow-hidden mb-4">${ph(2, 'store', 'h-36 w-full')}
<button class="absolute bottom-3 right-3 btn btn-sm !bg-white/95">${svg('camera')}Change cover</button></div>
<div class="flex flex-wrap items-center gap-4 mb-4"><div class="relative">${ph(0, 'store', 'w-20 h-20 rounded-2xl')}
<button class="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border border-[#e7e9ef] grid place-items-center">${svg('camera', 'w-4 h-4')}</button></div>
<div><p class="text-[13px] font-bold">Store logo</p><p class="text-[12px] text-ink-400">Square PNG or JPG, at least 400 × 400 px</p></div></div>
<div class="grid sm:grid-cols-2 gap-3.5">
<div class="sm:col-span-2"><label class="label">Store name <span class="req">*</span></label><input class="input" value="Rahim Electronics &amp; Services"></div>
<div><label class="label">Store URL</label><div class="input-affix"><span class="affix">haatbazar.com.bd/shop/</span><input class="input" value="rahim-electronics"></div></div>
<div><label class="label">Main category</label><select class="select"><option>Electronics &amp; Gadgets</option><option>Home Appliances</option><option>Fashion</option></select></div>
<div class="sm:col-span-2"><label class="label">Tagline</label><input class="input" value="Genuine electronics with warranty — since 2016"></div>
<div class="sm:col-span-2"><label class="label">About the store</label><textarea class="textarea !min-h-[110px]">Rahim Electronics has been serving Dhaka since 2016 with 100% genuine, warranty-backed electronics. We also provide expert AC, fridge and CCTV services with certified technicians.</textarea></div></div></div>`)}
${card('Contact &amp; location', `<div class="p-5 grid sm:grid-cols-2 gap-3.5">
<div><label class="label">Support phone <span class="req">*</span></label><input class="input" value="+880 1711-223344"></div>
<div><label class="label">WhatsApp number</label><input class="input" value="+880 1711-223344"></div>
<div><label class="label">Support email</label><input class="input" value="support@rahimelectronics.com"></div>
<div><label class="label">Website</label><input class="input" placeholder="https://"></div>
<div class="sm:col-span-2"><label class="label">Shop address</label><input class="input" value="Shop 12, Mirpur 10 Circle Market, Dhaka 1216"></div>
<div><label class="label">Division</label><select class="select"><option>Dhaka</option><option>Chattogram</option><option>Sylhet</option></select></div>
<div><label class="label">District / City</label><select class="select"><option>Dhaka</option><option>Gazipur</option><option>Narayanganj</option></select></div>
<div><label class="label">Area / Thana</label><select class="select"><option>Mirpur</option><option>Pallabi</option><option>Kafrul</option></select></div>
<div><label class="label">Postcode</label><input class="input" value="1216"></div>
<div class="sm:col-span-2"><label class="label">Pin location on map</label><div class="relative rounded-xl overflow-hidden">${ph(5, 'pin', 'h-40 w-full')}
<button class="absolute bottom-3 left-1/2 -translate-x-1/2 btn btn-sm !bg-white/95">${svg('pin')}Adjust pin</button></div></div></div>`)}
${card('Business hours', `<div class="p-5 space-y-2">${['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((d, i) => `<div class="flex flex-wrap items-center gap-3">
<label class="switch shrink-0"><input type="checkbox" ${i === 6 ? '' : 'checked'}><span class="track"></span></label>
<span class="text-[13px] font-bold w-24">${d}</span>
<input type="time" class="input input-sm !w-[110px]" value="10:00"><span class="text-ink-400 text-[12px]">to</span>
<input type="time" class="input input-sm !w-[110px]" value="21:00">
${i === 6 ? '<span class="badge badge-red">Closed</span>' : '<span class="badge badge-green">Open</span>'}</div>`).join('')}
<div class="dotted-sep pt-3 mt-3"><label class="check"><input type="checkbox">Temporarily close my shop (holiday mode)</label>
<p class="hint">While in holiday mode your products stay visible but cannot be ordered.</p></div></div>`)}
${card('Store policies', `<div class="p-5 space-y-3.5">
<div><label class="label">Shipping policy</label><textarea class="textarea !min-h-[80px]">Orders inside Dhaka are dispatched the same day if placed before 4 PM. Outside Dhaka takes 2–3 working days.</textarea></div>
<div><label class="label">Return &amp; refund policy</label><textarea class="textarea !min-h-[80px]">7-day easy return for defective or wrong items. Product must be unused with original packaging and accessories.</textarea></div>
<div><label class="label">Warranty policy</label><textarea class="textarea !min-h-[80px]">All branded items carry official warranty. Service is provided by the brand's authorised centre; we assist with the claim.</textarea></div></div>`)}
${card('Social links', `<div class="p-5 grid sm:grid-cols-2 gap-3.5">${[['Facebook page', 'fb'], ['Instagram', 'ig'], ['YouTube channel', 'yt'], ['TikTok', 'tt']].map(s => `<div><label class="label">${s[0]}</label><input class="input" placeholder="https://"></div>`).join('')}</div>`)}
</div>
<aside class="space-y-4">
${card('Verification status', `<div class="p-4 space-y-2.5">${[['Phone verified', true], ['Email verified', true], ['NID verified', true], ['Trade licence uploaded', true], ['TIN certificate', true], ['Bank account verified', true], ['Physical shop verified', false]].map(v => `<p class="flex items-center gap-2 text-[12.5px] ${v[1] ? 'text-ink-700' : 'text-ink-400'}">${svg(v[1] ? 'check' : 'clock', `w-4 h-4 ${v[1] ? 'text-green-600' : 'text-gold-500'}`)}${v[0]}${!v[1] ? '<a class="link ml-auto text-[11.5px]">Book visit</a>' : ''}</p>`).join('')}
<a href="settings.html" class="btn btn-sm btn-outline btn-block mt-1">Manage documents</a></div>`)}
${card('Store badges earned', `<div class="p-4 flex flex-wrap gap-2">${[['shield', 'Verified vendor', 'badge-green'], ['award', 'Power Seller', 'badge-amber'], ['truck', 'Fast shipper', 'badge-blue'], ['star', 'Top rated 4.8', 'badge-teal'], ['refresh', 'Easy returns', 'badge-purple']].map(b => `<span class="badge ${b[2]}">${svg(b[0])}${b[1]}</span>`).join('')}
<p class="hint">Badges are awarded automatically based on your performance.</p></div>`)}
${card('Storefront preview', `<div class="p-4"><div class="rounded-xl border border-[#e7e9ef] overflow-hidden">${ph(1, 'store', 'h-20 w-full')}
<div class="p-3"><p class="text-[13px] font-extrabold">Rahim Electronics &amp; Services</p>
<div class="flex items-center gap-1 mt-0.5">${stars(5)}<span class="text-[11.5px] text-ink-400">4.8 (2,184)</span></div>
<p class="text-[11.5px] text-ink-500 mt-1">248 products · Mirpur, Dhaka</p></div></div>
<a href="../shop-profile.html" class="btn btn-sm btn-outline btn-block mt-3">${svg('eye')}Open public storefront</a></div>`)}
</aside></div>`
});

/* ------------------------------- SERVICES -------------------------------- */
W('services.html', {
  title: 'Service Listings', sub: '18 listings live in the local directory · appear in search when customers look for services near them', active: 'services.html', crumbs: ['Service Business', 'Services'],
  actions: `<button class="btn btn-sm btn-outline">${svg('dl')}Export</button><a href="add-service.html" class="btn btn-sm btn-service">${svg('plus')}Add new service</a>`,
  body: `${stats([['Live listings', '18', '', 'wrench', 'service'], ['Listing views (30d)', '12,480', '+22%', 'eye', 'brand'], ['Leads received', '142', '+31%', 'phone', 'gold'], ['Avg rating', '4.9', '', 'star', 'service']])}
${tabs([['All', '18'], ['Active', '15'], ['Paused', '2'], ['Pending review', '1'], ['Rejected', '0'], ['Expired', '0']])}
${filterbar(['search', ['All categories', 'Home appliance repair', 'Electrical', 'Security', 'Cleaning', 'Plumbing'], ['All areas', 'Mirpur', 'Uttara', 'Banani', 'Dhanmondi', 'Gulshan'], ['Sort: Most leads', 'Most views', 'Highest rated', 'Newest']])}
${bulkbar(['Activate', 'Pause', 'Update price', 'Update service areas', 'Delete'])}
${card('', table([['', 'w-8'], ['Service'], ['Category'], ['Areas covered'], ['Price'], ['Views'], ['Leads'], ['Booked'], ['Rating'], ['Status'], ['Actions']],
    [['AC servicing &amp; deep cleaning', 'Home appliance repair', 'Mirpur, Uttara, Banani +4', '৳1,200 / unit', '4,280', 86, 52, 4.9, 'Active', 'fan'],
    ['AC installation &amp; uninstallation', 'Home appliance repair', 'Dhaka city', '৳1,600 / unit', '2,140', 42, 24, 4.8, 'Active', 'wrench'],
    ['Fridge &amp; freezer repair', 'Home appliance repair', 'Mirpur, Pallabi, Kafrul', 'From ৳900', '1,820', 38, 18, 4.7, 'Active', 'home'],
    ['CCTV installation (4–8 cameras)', 'Security', 'Dhaka, Gazipur', 'From ৳4,000', '1,640', 26, 11, 4.9, 'Active', 'scan'],
    ['Washing machine servicing', 'Home appliance repair', 'Mirpur, Mohammadpur', 'From ৳1,200', '980', 18, 7, 4.6, 'Active', 'drop'],
    ['Electrical wiring &amp; repair', 'Electrical', 'Mirpur, Kafrul', 'From ৳700', '820', 14, 6, 4.8, 'Paused', 'bolt'],
    ['Microwave oven repair', 'Home appliance repair', 'Dhaka city', 'From ৳800', '460', 8, 3, 4.5, 'Active', 'home'],
    ['Smart home setup consultation', 'Electrical', 'Dhaka city', '৳2,500 / visit', '210', 4, 1, 0, 'Pending review', 'sun']].map(s => [
      `<input type="checkbox" data-row-check class="w-4 h-4" style="accent-color:#12a594">`,
      prow(0, s[0], 'Verified provider · same-day slots', s[9]),
      s[1],
      `<span class="text-[12px]">${s[2]}</span>`,
      `<b>${s[3]}</b>`,
      s[4],
      `<b class="text-gold-600">${s[5]}</b>`,
      s[6],
      s[7] ? `<span class="flex items-center gap-1">${stars(5)}<span class="text-[11.5px] text-ink-400">${s[7]}</span></span>` : '<span class="text-ink-400">—</span>',
      st(s[8]),
      `<div class="flex gap-1.5"><a href="add-service.html" class="btn btn-xs btn-outline">${svg('edit')}</a>
<a href="../service-details.html" class="btn btn-xs btn-outline">${svg('eye')}</a>
${actionsCell([['Duplicate listing', 'copy'], ['Boost listing', 'bolt', false, 'ads.html'], ['Manage areas', 'pin'], ['Pause listing', 'clock'], ['View leads', 'phone', false, 'leads.html'], ['Delete listing', 'trash', true]])}</div>`
    ])) + tfoot(1, 8, 18))}`
});

/* ------------------------------ ADD SERVICE ------------------------------ */
W('add-service.html', {
  title: 'Add New Service', sub: 'Service listings appear in the HaatBazar local directory and receive calls, chats and bookings.', active: 'add-service.html', crumbs: ['Service Business', 'Add Service'],
  actions: `<button class="btn btn-sm btn-outline">${svg('eye')}Preview</button><button class="btn btn-sm btn-outline" data-toast="Draft saved">Save draft</button><button class="btn btn-sm btn-service" data-toast="Listing submitted for review">${svg('check')}Submit listing</button>`,
  body: `<div class="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-4">
<div class="space-y-4">
${card('Service information', `<div class="p-5 space-y-3.5">
<div><label class="label">Service title <span class="req">*</span></label><input class="input" placeholder="e.g. AC Servicing &amp; Deep Cleaning — Split &amp; Window AC"><p class="hint">Say exactly what you do. Titles with the service + area get 40% more calls.</p></div>
<div class="grid sm:grid-cols-2 gap-3.5">
<div><label class="label">Category <span class="req">*</span></label><select class="select"><option>Home Services</option><option>Home Appliance Repair</option><option>Electrical &amp; Plumbing</option><option>Beauty &amp; Wellness</option><option>Health &amp; Medical</option><option>Education &amp; Tutors</option><option>Events &amp; Catering</option><option>Business Services</option></select></div>
<div><label class="label">Sub-category <span class="req">*</span></label><select class="select"><option>AC service &amp; repair</option><option>Fridge repair</option><option>Washing machine repair</option><option>CCTV installation</option></select></div>
<div><label class="label">Service type</label><select class="select"><option>At customer's place (on-site)</option><option>At my shop / centre</option><option>Both on-site and at shop</option><option>Online / remote</option></select></div>
<div><label class="label">Years of experience</label><select class="select"><option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>5–10 years</option><option>More than 10 years</option></select></div></div>
<div><label class="label">Short description <span class="req">*</span></label><textarea class="textarea !min-h-[70px]" placeholder="One or two lines shown in directory listings"></textarea></div>
<div><label class="label">Full description <span class="req">*</span></label><textarea class="textarea !min-h-[150px]" placeholder="Explain your process, what is included, what tools/brands you work with, guarantee offered…"></textarea>
<p class="hint">Do not include phone numbers or external links in the description — customers contact you through HaatBazar.</p></div></div>`)}
${card('What is included &amp; excluded', `<div class="p-5 grid sm:grid-cols-2 gap-5">
<div><label class="label">Included in this service</label><div class="space-y-2">${['Full indoor &amp; outdoor unit cleaning', 'Gas pressure check', 'Drain pipe cleaning'].map(v => `<div class="flex gap-2"><input class="input" value="${v}"><button class="btn btn-outline btn-icon">${svg('trash')}</button></div>`).join('')}</div>
<button class="btn btn-xs btn-outline mt-2">${svg('plus')}Add item</button></div>
<div><label class="label">Not included (extra charge)</label><div class="space-y-2">${['Gas refill (৳1,500+ per unit)', 'Spare parts replacement'].map(v => `<div class="flex gap-2"><input class="input" value="${v}"><button class="btn btn-outline btn-icon">${svg('trash')}</button></div>`).join('')}</div>
<button class="btn btn-xs btn-outline mt-2">${svg('plus')}Add item</button></div></div>`)}
${card('Pricing', `<div class="p-5 space-y-3.5">
<div><label class="label">Pricing model <span class="req">*</span></label>
<div class="grid sm:grid-cols-4 gap-2">${[['Fixed price', true], ['Starting from', false], ['Hourly rate', false], ['Quote on visit', false]].map(p => `<label class="check p-3 rounded-xl border ${p[1] ? 'border-service-300 bg-service-50' : 'border-[#e7e9ef]'}"><input type="radio" name="pm" ${p[1] ? 'checked' : ''} style="accent-color:#12a594">${p[0]}</label>`).join('')}</div></div>
<div class="grid sm:grid-cols-3 gap-3.5">
<div><label class="label">Price (৳) <span class="req">*</span></label><input class="input" placeholder="1200"></div>
<div><label class="label">Unit</label><select class="select"><option>per unit</option><option>per visit</option><option>per hour</option><option>per sq. ft</option><option>per person</option></select></div>
<div><label class="label">Visit / inspection fee (৳)</label><input class="input" placeholder="0 = free visit"></div></div>
${table([['Package'], ['What is included'], ['Price'], ['Duration'], ['']],
    [['<input class="input input-sm" value="Basic clean">', '<input class="input input-sm" value="Indoor unit only">', '<input class="input input-sm !w-[90px]" value="900">', '<input class="input input-sm !w-[100px]" value="45 min">', `<button class="btn btn-xs btn-outline btn-icon">${svg('trash')}</button>`],
    ['<input class="input input-sm" value="Standard service">', '<input class="input input-sm" value="Indoor + outdoor + gas check">', '<input class="input input-sm !w-[90px]" value="1200">', '<input class="input input-sm !w-[100px]" value="1.5 hours">', `<button class="btn btn-xs btn-outline btn-icon">${svg('trash')}</button>`],
    ['<input class="input input-sm" value="Premium + warranty">', '<input class="input input-sm" value="Full service + 3 month warranty">', '<input class="input input-sm !w-[90px]" value="1800">', '<input class="input input-sm !w-[100px]" value="2 hours">', `<button class="btn btn-xs btn-outline btn-icon">${svg('trash')}</button>`]], { compact: true })}
<div class="flex flex-wrap gap-2"><button class="btn btn-sm btn-outline">${svg('plus')}Add package</button></div>
<div class="space-y-2"><label class="check"><input type="checkbox" checked style="accent-color:#12a594">Free cancellation up to 4 hours before the appointment</label>
<label class="check"><input type="checkbox" checked style="accent-color:#12a594">Advance payment not required — pay after the job</label>
<label class="check"><input type="checkbox" style="accent-color:#12a594">Offer online payment discount (2%)</label></div></div>`)}
${card('Service areas &amp; availability', `<div class="p-5 space-y-3.5">
<div><label class="label">City / District <span class="req">*</span></label><select class="select"><option>Dhaka</option><option>Chattogram</option><option>Gazipur</option></select></div>
<div><label class="label">Areas you cover <span class="req">*</span></label><input class="input" placeholder="Type an area and press Enter">
<div class="flex flex-wrap gap-1.5 mt-2">${['Mirpur', 'Pallabi', 'Kafrul', 'Uttara', 'Banani', 'Gulshan', 'Mohammadpur'].map(a => `<span class="badge badge-teal">${a} ${svg('x', 'w-3 h-3')}</span>`).join('')}</div>
<p class="hint">You will only receive leads from the areas you select.</p></div>
<div class="grid sm:grid-cols-2 gap-3.5">
<div><label class="label">Travel radius</label><select class="select"><option>Up to 5 km</option><option>Up to 10 km</option><option>Up to 20 km</option><option>Whole city</option></select></div>
<div><label class="label">Travel charge outside area (৳)</label><input class="input" placeholder="e.g. 200"></div>
<div><label class="label">Response time promise</label><select class="select"><option>Within 30 minutes</option><option>Within 1 hour</option><option>Within 3 hours</option><option>Same day</option></select></div>
<div><label class="label">Earliest available slot</label><select class="select"><option>Today</option><option>Tomorrow</option><option>Within 2–3 days</option></select></div></div>
<div><label class="label">Working days &amp; hours</label>
<div class="grid sm:grid-cols-2 gap-2">${['Sat–Thu 09:00 – 21:00', 'Friday 15:00 – 21:00'].map(v => `<input class="input" value="${v}">`).join('')}</div></div>
<div class="space-y-2"><label class="check"><input type="checkbox" checked style="accent-color:#12a594">Available for emergency / same-day jobs</label>
<label class="check"><input type="checkbox" style="accent-color:#12a594">Available on public holidays (extra 20% charge)</label></div></div>`)}
${card('Photos, video &amp; certificates', `<div class="p-5">
<label class="label">Work photos (before/after, team, tools)</label>
<div class="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">${[0, 1, 2].map(i => `<div class="file-tile">${ph(i, 'camera', 'absolute inset-0')}<button class="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 grid place-items-center">${svg('x', 'w-3 h-3')}</button></div>`).join('')}
<label class="upload-box !aspect-square !p-2">${svg('plus', 'w-5 h-5')}<span class="text-[11px]">Add photo</span></label></div>
<div class="grid sm:grid-cols-2 gap-3.5">
<div><label class="label">Intro video (YouTube)</label><input class="input" placeholder="https://youtube.com/…"></div>
<div><label class="label">Certificates / licences</label><div class="upload-box !py-3">${svg('up', 'w-4 h-4')}<span class="text-[12px]">Upload PDF or image</span></div></div></div></div>`)}
${card('Team &amp; trust signals', `<div class="p-5 grid sm:grid-cols-2 gap-3.5">
<div><label class="label">Number of technicians</label><input class="input" value="6"></div>
<div><label class="label">Jobs completed (approx.)</label><input class="input" value="2,400"></div>
<div class="sm:col-span-2 space-y-2">${['All technicians are police-verified', 'Uniformed &amp; ID-carded staff', 'Genuine spare parts only', 'Written service warranty provided', 'Free re-visit if the issue returns within 15 days'].map(t => `<label class="check"><input type="checkbox" checked style="accent-color:#12a594">${t}</label>`).join('')}</div>
<div class="sm:col-span-2"><label class="label">Languages spoken</label><input class="input" value="Bangla, English, Hindi"></div>
<div class="sm:col-span-2"><label class="label">Payment methods accepted</label>
<div class="flex flex-wrap gap-2">${['Cash', 'bKash', 'Nagad', 'Rocket', 'Card', 'Bank transfer'].map(p => `<label class="check p-2.5 rounded-xl border border-[#e7e9ef]"><input type="checkbox" checked style="accent-color:#12a594">${p}</label>`).join('')}</div></div></div>`)}
</div>
<aside class="space-y-4">
${card('Publish', `<div class="p-4 space-y-3">
<div><label class="label">Status</label><select class="select"><option>Submit for review</option><option>Save as draft</option></select></div>
<div class="p-3 rounded-xl bg-service-50 text-[12px] text-service-700">Listings are verified within 24 hours. Verified listings get 3× more calls.</div>
<button class="btn btn-service btn-block" data-toast="Listing submitted">${svg('check')}Submit listing</button>
<button class="btn btn-outline btn-block">Save draft</button></div>`)}
${card('Listing preview', `<div class="p-4"><div class="rounded-xl border border-[#e7e9ef] p-3">
<div class="flex gap-3">${ph(1, 'fan', 'w-14 h-14 rounded-xl shrink-0')}
<div class="min-w-0"><p class="text-[13px] font-extrabold clamp-2">AC Servicing &amp; Deep Cleaning</p>
<div class="flex items-center gap-1 mt-1"><span class="rating-pill">${svg('star')}4.9</span><span class="text-[11px] text-ink-400">(203)</span></div></div></div>
<p class="text-[12px] text-ink-500 mt-2">Mirpur · 0.8 km away · Opens till 9 PM</p>
<p class="text-[13px] font-extrabold text-service-600 mt-1">৳1,200 / unit</p>
<div class="flex gap-1.5 mt-2"><span class="btn btn-xs btn-service flex-1">${svg('phone')}Call</span><span class="btn btn-xs btn-outline flex-1">Book</span></div></div></div>`)}
${card('Boost your visibility', `<div class="p-4 space-y-2"><p class="text-[12.5px] text-ink-600">Listings with a boost appear at the top of category and search results.</p>
${[['Top of category — 7 days', '৳1,200'], ['Featured on homepage — 7 days', '৳2,500'], ['Search keyword boost', 'From ৳8/click']].map(b => `<div class="flex items-center justify-between p-2.5 rounded-xl border border-[#e7e9ef] text-[12.5px]"><span class="font-semibold">${b[0]}</span><b class="text-brand-600">${b[1]}</b></div>`).join('')}
<a href="ads.html" class="btn btn-sm btn-primary btn-block">${svg('bolt')}Explore boosts</a></div>`)}
</aside></div>`
});
console.log('vendor part 2 done');
