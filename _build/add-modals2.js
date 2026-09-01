/* Build + inject the actual modal markup per page */
const H = require('./add-modals');
const { row, box, grid2, tl, modal, modalFoot, svg, fs } = H;
const K = H.K;
const { fld, inp, sel, ta, st, tk } = K;

const F = (l, c) => fld(l, c);
const two = (a, b) => grid2(a + b);

/* ---- reusable modal bodies ---- */
const orderDetail = modal('m-order', 'Order #HB-884213 — full detail', `
${box([row('Placed on', '18 Aug 2026, 2:42 PM'), row('Customer', 'Nusrat Jahan · +8801711-223344'), row('Vendor', 'Rahim Electric (Verified Pro)'), row('Payment', 'bKash · TRX 8842JHK21 · ' + st('Paid')), row('Delivery', 'Express · Pathao · TRK-99284412'), row('Ship to', 'House 42, Road 7, Dhanmondi, Dhaka 1209'), row('Items', '3 items · 2 vendors'), row('Subtotal', tk(24680)), row('Shipping', tk(60)), row('Voucher (NEW200)', '− ' + tk(200)), row('Platform commission (8%)', tk(1974)), row('Grand total', '<span class="text-brand-600">' + tk(24540) + '</span>')])}
<div class="px-5"><p class="text-[12.5px] font-extrabold mb-2">Order timeline</p></div>
${tl([['Order placed', '18 Aug, 2:42 PM · by customer'], ['Payment confirmed', '18 Aug, 2:43 PM · bKash gateway'], ['Vendor accepted', '18 Aug, 3:10 PM · Rahim Electric'], ['Packed &amp; ready', '19 Aug, 10:05 AM'], ['Picked by courier', '19 Aug, 4:20 PM · Pathao'], ['Out for delivery', '20 Aug, 9:15 AM']])}
<div class="px-5 pb-3 flex flex-wrap gap-2"><button class="btn btn-sm btn-outline">${svg('printer')}Print invoice</button><button class="btn btn-sm btn-outline">${svg('truck')}Track shipment</button><button class="btn btn-sm btn-outline">${svg('msg')}Message customer</button><button class="btn btn-sm btn-outline is-danger">${svg('x')}Cancel order</button></div>
${modalFoot('Update status', 'Order updated')}`, 'modal-lg');

const vendorDetail = modal('m-vendor', 'Vendor profile — Rahim Electric', `
${box([row('Shop ID', '#VND-1042'), row('Owner', 'Rahim Uddin · +8801711-889900'), row('Type', 'Product seller + Service provider'), row('Joined', '12 Mar 2024'), row('KYC', st('Verified') + ' · NID + TIN + Trade licence'), row('Rating', '4.8 ★ (1,284 reviews)'), row('Live listings', '248 products · 18 services'), row('Lifetime GMV', tk(4820000)), row('Commission plan', 'Electronics — 8% (custom)'), row('Payout method', 'bKash merchant · ****4412'), row('Pending payout', tk(184320)), row('Policy strikes', '1 (late dispatch, Jun 2026)')])}
${two(F('Change commission plan', sel(['Electronics — 8%', 'Standard — 10%', 'Fashion — 12%', 'Custom…'])), F('Account status', sel(['Active', 'On hold', 'Suspended', 'Blocked'])))}
<div class="px-5">${F('Internal note', ta('Reason for the change…', 2))}</div>
${modalFoot('Save vendor', 'Vendor updated')}`, 'modal-lg');

const customerDetail = modal('m-customer', 'Customer — Nusrat Jahan', `
${box([row('Customer ID', '#CUS-88421'), row('Phone / email', '+8801711-223344 · nusrat@example.com'), row('Joined', '04 Jan 2025 · via mobile app'), row('Tier', 'Gold member · 4,820 points'), row('Orders', '38 total · 34 delivered · 2 returned'), row('Lifetime value', tk(268400)), row('Avg order value', tk(7063)), row('Wallet balance', tk(2480)), row('Default address', 'Dhanmondi, Dhaka 1209'), row('Last login', '22 Aug 2026, 11:04 AM · Android'), row('Risk score', '<span class="badge badge-green">Low (12)</span>')])}
${two(F('Account status', sel(['Active', 'Restricted', 'Suspended'])), F('Adjust wallet (৳)', inp('0.00', 'number')))}
<div class="px-5">${F('Reason / note', ta('Visible to admins only…', 2))}</div>
<div class="px-5 pb-3 flex flex-wrap gap-2"><button class="btn btn-sm btn-outline">${svg('bag')}View orders</button><button class="btn btn-sm btn-outline">${svg('ticket')}Issue voucher</button><button class="btn btn-sm btn-outline">${svg('key')}Reset password</button><button class="btn btn-sm btn-outline">${svg('lock')}Force logout</button></div>
${modalFoot('Save customer', 'Customer updated')}`, 'modal-lg');

const productReview = modal('m-product', 'Listing review — Realme C100X 6/128GB', `
<div class="p-5 flex gap-3.5"><span class="ph ph-a w-[92px] h-[92px] rounded-xl shrink-0"></span>
<div class="min-w-0"><p class="text-[14px] font-extrabold">Realme C100X 6/128GB 8000mAh 45W</p>
<p class="text-[12px] text-ink-400 mb-1.5">Mobile › Smartphones · Realme · SKU RC100X-BLK</p>
<p class="text-[15px] font-extrabold text-brand-600">${tk(11290)} <span class="text-[12px] text-ink-400 line-through font-semibold">${tk(13990)}</span></p></div></div>
${box([row('Submitted by', 'Rahim Electric · 12 Aug 2026'), row('Images / video', '8 images · 1 video'), row('Variants', '2 (Black, Blue)'), row('Stock', '124 units · Dhaka warehouse'), row('Warranty', '1 year official'), row('Auto-checks', '<span class="badge badge-green">Title OK</span> <span class="badge badge-green">Images OK</span> <span class="badge badge-amber">Price outlier</span>'), row('Duplicate match', 'None found'), row('Restricted keywords', 'None')])}
${two(F('Decision', sel(['Approve &amp; publish', 'Approve with edits', 'Request changes', 'Reject'])), F('Assign reviewer', sel(['Me (Arif H.)', 'Nafisa K.', 'Sabbir A.'])))}
<div class="px-5">${F('Message to vendor', ta('Explain what needs fixing…', 3))}</div>
${modalFoot('Submit decision', 'Decision saved')}`, 'modal-lg');

const kycReview = modal('m-kyc', 'KYC verification — Gadget World BD', `
${box([row('Application', '#KYC-4412 · submitted 16 Aug 2026'), row('Business type', 'Private limited company'), row('Trade licence', 'TRAD/DNCC/882144 · exp 31 Dec 2027'), row('TIN / BIN', '482991002144 / 0031882144'), row('NID (owner)', '1990XXXXXXXXX · matched'), row('Bank account', 'City Bank · ****8842 · name matched'), row('Address proof', 'Utility bill (Jul 2026)'), row('Auto OCR match', '<span class="badge badge-green">Name 98%</span> <span class="badge badge-green">Address 92%</span>')])}
<div class="px-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pb-2">${['Trade licence', 'NID front', 'NID back', 'Bank statement'].map((d, i) => `<div class="text-center"><span class="ph ph-${'abcd'[i]} w-full h-[86px] rounded-lg mb-1.5 block"></span><p class="text-[11px] font-bold">${d}</p><button class="text-[11px] text-brand-600 font-bold">View full</button></div>`).join('')}</div>
${two(F('Decision', sel(['Approve — full verification', 'Approve — limited (₹ cap)', 'Request more documents', 'Reject'])), F('Verified badge', sel(['Verified Pro', 'Verified', 'None'])))}
<div class="px-5">${F('Reviewer note', ta('Internal note…', 2))}</div>
${modalFoot('Submit decision', 'KYC decision saved')}`, 'modal-lg');

const reviewMod = modal('m-review', 'Moderate review', `
<div class="p-5"><div class="flex items-center gap-2.5 mb-2"><span class="avatar avatar-sm bg-ink-700">K</span>
<div><p class="text-[13px] font-bold">Kamal Uddin <span class="badge badge-green ml-1">Verified purchase</span></p><p class="text-[11.5px] text-ink-400">on Realme C100X · 20 Aug 2026</p></div>
<span class="ml-auto text-[13px] font-extrabold">2.0 ★</span></div>
<p class="text-[13px] text-ink-600 leading-relaxed">"Battery is good but the seller sent a different colour. Also the box was open. Call me on 01711-XXXXXX to sort this out."</p>
<div class="flex gap-1.5 mt-2.5">${['ph-a', 'ph-b'].map(c => `<span class="ph ${c} w-16 h-16 rounded-lg"></span>`).join('')}</div></div>
${box([row('Auto-flags', '<span class="badge badge-red">Phone number</span> <span class="badge badge-amber">Possible dispute</span>'), row('Reported by', '1 vendor · reason: off-platform contact'), row('Helpful votes', '8 up · 1 down'), row('Reviewer history', '12 reviews · 0 removed')])}
${two(F('Action', sel(['Publish as-is', 'Publish with masked contact', 'Hold for edit', 'Reject &amp; notify', 'Delete permanently'])), F('Notify', sel(['Customer only', 'Vendor only', 'Both', 'Nobody'])))}
<div class="px-5">${F('Moderator note', ta('Why this decision…', 2))}</div>
${modalFoot('Apply decision', 'Review moderated')}`, 'modal-lg');

const disputeModal = modal('m-dispute', 'Dispute #DSP-2044 — resolution centre', `
${box([row('Order', '#HB-883104 · ' + tk(68900) + ' · Gree AC 1.5 Ton'), row('Raised by', 'Customer — Sadia Rahman · 19 Aug 2026'), row('Reason', 'Item damaged on arrival'), row('Evidence', '4 photos + unboxing video'), row('Vendor response', 'Offered partial refund ' + tk(6000) + ' · 20 Aug'), row('Courier report', 'No external damage noted'), row('SLA', '<span class="badge badge-red">6 hours left</span>'), row('Escrow held', tk(68900))])}
${two(F('Resolution', sel(['Full refund to customer', 'Partial refund', 'Replacement shipment', 'Reject claim', 'Split liability'])), F('Refund amount (৳)', inp('68900', 'number')))}
${two(F('Liability', sel(['Vendor', 'Courier', 'Customer', 'Platform (goodwill)'])), F('Refund to', sel(['Original payment method', 'HaatBazar wallet', 'Bank transfer'])))}
<div class="px-5">${F('Decision summary (sent to both parties)', ta('Explain the outcome…', 3))}</div>
${modalFoot('Resolve dispute', 'Dispute resolved')}`, 'modal-lg');

const payoutModal = modal('m-payout', 'Payout request #PAY-88421', `
${box([row('Vendor', 'Rahim Electric · #VND-1042'), row('Requested', '21 Aug 2026, 6:10 PM'), row('Gross sales (cycle)', tk(214600)), row('Commission (8%)', '− ' + tk(17168)), row('Refunds &amp; returns', '− ' + tk(8420)), row('Ads spend', '− ' + tk(4200)), row('Adjustments', '− ' + tk(490)), row('Net payable', '<span class="text-brand-600">' + tk(184322) + '</span>'), row('Method', 'bKash merchant ****4412'), row('KYC / bank match', st('Verified'))])}
${two(F('Decision', sel(['Approve &amp; disburse', 'Approve — hold 7 days', 'Partially approve', 'Reject'])), F('Approved amount (৳)', inp('184322', 'number')))}
<div class="px-5">${F('Note / reference', ta('Bank reference or reason…', 2))}</div>
${modalFoot('Process payout', 'Payout processed')}`, 'modal-lg');

const serviceApprove = modal('m-service', 'Service listing review — AC Repair &amp; Servicing', `
${box([row('Provider', 'CoolCare Services · #VND-2210'), row('Category', 'Home services › AC repair'), row('Coverage', 'Dhaka — Dhanmondi, Mohammadpur, Mirpur (+4)'), row('Pricing', 'Starting ' + tk(700) + ' · visit charge ' + tk(300)), row('Team size', '8 technicians'), row('Licence / trade doc', 'Uploaded · verified'), row('Photos', '12 (workshop + team)'), row('Auto-checks', '<span class="badge badge-green">Phone verified</span> <span class="badge badge-green">Address geocoded</span> <span class="badge badge-amber">Duplicate name</span>')])}
${two(F('Decision', sel(['Approve &amp; publish', 'Approve — needs photos', 'Request changes', 'Reject'])), F('Listing tier', sel(['Free', 'Verified', 'Sponsored (paid)'])))}
<div class="px-5">${F('Message to provider', ta('Explain what needs fixing…', 3))}</div>
${modalFoot('Submit decision', 'Listing decision saved')}`, 'modal-lg');

const leadModal = modal('m-lead', 'Lead #LD-77412 — full detail', `
${box([row('Customer', 'Tanvir Ahmed · +8801811-445566'), row('Requested service', 'AC installation — 2 units (split)'), row('Location', 'Bashundhara R/A, Block C, Dhaka'), row('Preferred time', '24 Aug 2026, morning'), row('Budget', tk(4000) + ' – ' + tk(6000)), row('Source', 'Service detail page — "Get quote"'), row('Sent to', '5 providers · 3 responded'), row('Status', st('Contacted')), row('Lead value / charge', tk(45) + ' per provider')])}
<div class="px-5"><p class="text-[12.5px] font-extrabold mb-2">Provider responses</p></div>
${tl([['CoolCare Services — quoted ৳5,200', 'Responded in 4 min · call connected 2:12'], ['Dhaka AC Experts — quoted ৳4,800', 'Responded in 11 min · SMS sent'], ['Rahim Electric — quoted ৳5,500', 'Responded in 38 min']])}
${two(F('Lead status', sel(['New', 'Contacted', 'Quoted', 'Won', 'Lost', 'Spam'])), F('Quality', sel(['Genuine', 'Duplicate', 'Invalid number', 'Spam'])))}
<div class="px-5">${F('Admin note', ta('Note…', 2))}</div>
${modalFoot('Save lead', 'Lead updated')}`, 'modal-lg');

const txnModal = modal('m-txn', 'Transaction #TRX-8842JHK21', `
${box([row('Type', 'Order payment (capture)'), row('Gateway', 'bKash · merchant HaatBazar'), row('Gateway ref', 'BKH-8842JHK21-2026'), row('Amount', tk(24540)), row('Gateway fee (1.85%)', '− ' + tk(454)), row('Net settled', tk(24086)), row('Order', '#HB-884213'), row('Customer', 'Nusrat Jahan'), row('Status', st('Paid')), row('Settled on', '19 Aug 2026, 11:00 PM'), row('Reconciliation', '<span class="badge badge-green">Matched</span>')])}
<div class="px-5 pb-3 flex flex-wrap gap-2"><button class="btn btn-sm btn-outline">${svg('dl')}Gateway receipt</button><button class="btn btn-sm btn-outline">${svg('refresh')}Re-check status</button><button class="btn btn-sm btn-outline is-danger">${svg('return')}Initiate refund</button></div>
${modalFoot('Close', 'Done')}`);

const invoiceModal = modal('m-invoice', 'Invoice INV-2026-08-8842', `
${box([row('Issued to', 'Nusrat Jahan · Dhanmondi, Dhaka'), row('Order', '#HB-884213 · 18 Aug 2026'), row('Seller', 'Rahim Electric (BIN 0031882144)'), row('Taxable amount', tk(21330)), row('VAT (15%)', tk(3200)), row('Shipping', tk(60)), row('Discount', '− ' + tk(200)), row('Invoice total', '<b class="text-brand-600">' + tk(24540) + '</b>'), row('Mushak challan', '6.3 · generated'), row('Status', st('Paid'))])}
<div class="px-5 pb-3 flex flex-wrap gap-2"><button class="btn btn-sm btn-primary">${svg('dl')}Download PDF</button><button class="btn btn-sm btn-outline">${svg('printer')}Print</button><button class="btn btn-sm btn-outline">${svg('mail')}Email to customer</button><button class="btn btn-sm btn-outline">${svg('file')}Mushak 6.3</button></div>
${modalFoot('Close', 'Done')}`);

const stockModal = modal('m-stock', 'Adjust stock — Realme C100X 6/128GB', `
${box([row('Current on hand', '124 units'), row('Reserved (unshipped)', '18 units'), row('Available to sell', '106 units'), row('Warehouse', 'Dhaka — Tejgaon (primary)'), row('Reorder level', '25 units'), row('Last count', '18 Aug 2026 by Sabbir A.')])}
${two(F('Adjustment type', sel(['Add stock (received)', 'Remove (damaged)', 'Remove (lost)', 'Set absolute count', 'Transfer warehouse'])), F('Quantity', inp('0', 'number')))}
${two(F('Warehouse', sel(['Dhaka — Tejgaon', 'Chattogram — Agrabad', 'Sylhet hub'])), F('Reference', inp('GRN / invoice no.')))}
<div class="px-5">${F('Reason / note', ta('Why this adjustment…', 2))}</div>
${modalFoot('Apply adjustment', 'Stock updated')}`);

const cartModal = modal('m-cart', 'Abandoned cart #CRT-44821', `
${box([row('Customer', 'Sadia Rahman · +8801911-334455'), row('Cart value', tk(18420)), row('Items', '3 (Redmi Note 13, case, charger)'), row('Created', '21 Aug 2026, 9:12 PM'), row('Last activity', '21 Aug 2026, 9:26 PM'), row('Stage reached', 'Checkout — payment step'), row('Device', 'Android app v4.2'), row('Recovery emails sent', '1 of 3'), row('Recovery status', st('Pending'))])}
${two(F('Send recovery', sel(['Email + SMS', 'Email only', 'SMS only', 'Push notification'])), F('Attach voucher', sel(['None', '৳200 off (CART200)', '5% off', 'Free shipping'])))}
<div class="px-5">${F('Message', ta('Hi Sadia, your cart is waiting…', 3))}</div>
${modalFoot('Send recovery', 'Recovery sent')}`);

const abuseModal = modal('m-abuse', 'Report #RPT-9042 — counterfeit claim', `
${box([row('Reported item', 'Fake "Samsung" Charger 25W · #PRD-882104'), row('Vendor', 'Mobile Zone · #VND-3311'), row('Reported by', '3 users + 1 brand owner'), row('Category', 'Counterfeit / IP infringement'), row('Evidence', 'Brand authorisation letter, 6 photos'), row('Item status', st('Blocked')), row('Vendor strikes', '2 previous'), row('Exposure', '42 orders · ' + tk(37380) + ' GMV')])}
${two(F('Action on listing', sel(['Keep blocked', 'Delete permanently', 'Unblock (claim invalid)', 'Require documents'])), F('Action on vendor', sel(['Warning (strike 3)', 'Suspend 30 days', 'Suspend indefinitely', 'Terminate account', 'No action'])))}
${two(F('Refund affected orders', sel(['Yes — all 42 orders', 'Yes — last 30 days only', 'No'])), F('Notify brand owner', sel(['Yes, with outcome', 'No'])))}
<div class="px-5">${F('Case note', ta('Decision rationale…', 3))}</div>
${modalFoot('Apply decision', 'Report resolved')}`, 'modal-lg');

const bookingModal = modal('m-booking', 'Booking #BK-55210 — AC Servicing', `
${box([row('Customer', 'Imran Hossain · +8801611-778899'), row('Provider', 'CoolCare Services'), row('Service', 'AC servicing — 2 units'), row('Scheduled', '23 Aug 2026, 10:00 AM – 12:00 PM'), row('Address', 'Uttara Sector 7, Dhaka'), row('Amount', tk(1400) + ' (advance ' + tk(300) + ' paid)'), row('Technician', 'Assigned — Jashim (ID 8842)'), row('Status', st('Confirmed')), row('Payment', 'Partial · balance on completion')])}
${two(F('Update status', sel(['Confirmed', 'Technician assigned', 'In progress', 'Completed', 'No-show', 'Cancelled'])), F('Reschedule to', inp('', 'datetime-local')))}
<div class="px-5">${F('Note to both parties', ta('Note…', 2))}</div>
${modalFoot('Save booking', 'Booking updated')}`);

const settingModal = modal('m-setting', 'Confirm platform setting change', `
${box([row('Setting', 'Default commission — Electronics'), row('Current value', '8%'), row('New value', '9%'), row('Affects', '1,284 live listings · 212 vendors'), row('Effective from', 'Next billing cycle (01 Sep 2026)'), row('Vendor notice', '7 days (auto email + dashboard banner)')])}
<div class="px-5">${K.note('warn', 'This change alters vendor earnings. All affected vendors will be notified automatically and the change is logged in the audit trail.')}</div>
<div class="px-5">${F('Reason (audit log)', ta('Why this change…', 2))}
${F('', '<label class="chk"><input type="checkbox"><span></span>I understand this affects vendor payouts</label>')}</div>
${modalFoot('Confirm change', 'Setting updated')}`);

const logModal = modal('m-log', 'Log entry — ERR-88421', `
${box([row('Timestamp', '22 Aug 2026, 11:04:22 +06'), row('Level', '<span class="badge badge-red">Error</span>'), row('Service', 'payment-worker (pod 4)'), row('Event', 'bKash callback signature mismatch'), row('Order', '#HB-884190'), row('Request ID', 'req_8842jhk21x'), row('Occurrences', '4 in last hour')])}
<div class="px-5 pb-4"><pre class="bg-ink-950 text-ink-100 text-[11.5px] p-3.5 rounded-xl overflow-auto thin-scroll">PaymentGatewayException: signature mismatch
  at BkashClient.verifyCallback (bkash.js:214)
  at PaymentWorker.handle (worker.js:88)
  payload: { trxId: "8842JHK21", amount: 24540, sig: "a91f…" }</pre></div>
<div class="px-5 pb-3 flex flex-wrap gap-2"><button class="btn btn-sm btn-outline">${svg('refresh')}Retry job</button><button class="btn btn-sm btn-outline">${svg('flag')}Create incident</button><button class="btn btn-sm btn-outline">${svg('dl')}Download trace</button></div>
${modalFoot('Mark resolved', 'Marked resolved')}`, 'modal-lg');

const chatModal = modal('m-chat', 'Live chat — session #CH-2044', `
${box([row('Customer', 'Kamal Uddin · Gold member'), row('Agent', 'Nafisa K. (Support tier 1)'), row('Started', '22 Aug 2026, 10:52 AM'), row('Duration', '12 min 40 s'), row('Topic', 'Order delay — #HB-884101'), row('Sentiment', '<span class="badge badge-amber">Frustrated</span>'), row('First response', '18 seconds'), row('Rating', '3 ★')])}
<div class="px-5 pb-4 space-y-2 max-h-[220px] overflow-auto thin-scroll">
<div class="bg-ink-50 rounded-xl p-2.5 text-[12.5px]"><b>Kamal:</b> My order still shows processing after 3 days.</div>
<div class="bg-brand-50 rounded-xl p-2.5 text-[12.5px]"><b>Nafisa:</b> Sorry about that! Let me check with the seller right away.</div>
<div class="bg-ink-50 rounded-xl p-2.5 text-[12.5px]"><b>Kamal:</b> Please, I need it before Friday.</div>
<div class="bg-brand-50 rounded-xl p-2.5 text-[12.5px]"><b>Nafisa:</b> Seller confirmed dispatch today — I've added a ৳100 voucher for the delay.</div></div>
${two(F('Escalate to', sel(['No escalation', 'Tier 2 support', 'Vendor manager', 'Dispute team'])), F('Tag session', sel(['Delivery delay', 'Payment issue', 'Product query', 'Complaint'])))}
<div class="px-5">${F('Supervisor note', ta('Coaching note for the agent…', 2))}</div>
${modalFoot('Save &amp; close', 'Session saved')}`, 'modal-lg');

/* ---- page → modals map ---- */
const MAP = {
  'admin/orders.html': [orderDetail, invoiceModal],
  'admin/vendors.html': [vendorDetail, payoutModal],
  'admin/customers.html': [customerDetail],
  'admin/products.html': [productReview, stockModal],
  'admin/vendor-approvals.html': [vendorDetail, kycReview],
  'admin/kyc.html': [kycReview],
  'admin/reviews.html': [reviewMod],
  'admin/moderation.html': [abuseModal],
  'admin/service-approvals.html': [serviceApprove],
  'admin/services.html': [serviceApprove],
  'admin/leads.html': [leadModal],
  'admin/bookings.html': [bookingModal],
  'admin/transactions.html': [txnModal],
  'admin/invoices.html': [invoiceModal],
  'admin/inventory.html': [stockModal],
  'admin/abandoned-carts.html': [cartModal],
  'admin/settings.html': [settingModal],
  'admin/logs.html': [logModal],
  'admin/activity.html': [logModal],
  'admin/chats.html': [chatModal],
  'admin/analytics.html': [],
  'admin/dashboard.html': [orderDetail],
  'vendor/order-details.html': [invoiceModal],
  'vendor/questions.html': [],
  'vendor/transactions.html': [txnModal],
  'vendor/services.html': [],
  'vendor/messages.html': [],
  'vendor/notifications.html': []
};

let n = 0, count = 0;
Object.keys(MAP).forEach(p => {
  const mods = MAP[p];
  if (!mods.length) return;
  let h = fs.readFileSync(p, 'utf8');
  if (h.includes('class="modal" id="' + mods[0].match(/id="([^"]+)"/)[1] + '"')) return;
  const anchor = h.lastIndexOf('<footer class="px-5 py-4 border-t');
  if (anchor < 0) return;
  fs.writeFileSync(p, h.slice(0, anchor) + mods.join('\n') + '\n' + h.slice(anchor));
  n++; count += mods.length;
});
console.log('pages updated:', n, '| modals injected:', count);
