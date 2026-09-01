/* Attach data-modal triggers to row actions / buttons so injected modals are reachable */
const fs = require('fs');

/* page -> [ [modalId, [label keywords…] ], … ] ; first entry is the page default */
const MAP = {
  'admin/orders.html': [['m-order', ['view order', 'view detail', 'order detail', 'view']], ['m-invoice', ['invoice']]],
  'admin/vendors.html': [['m-vendor', ['view profile', 'view shop', 'edit vendor', 'view']], ['m-payout', ['payout']]],
  'admin/customers.html': [['m-customer', ['view profile', 'view customer', 'view']]],
  'admin/products.html': [['m-product', ['review listing', 'edit listing', 'view on site', 'view']], ['m-stock', ['stock']]],
  'admin/vendor-approvals.html': [['m-vendor', ['view application', 'view profile', 'view']], ['m-kyc', ['document', 'kyc']]],
  'admin/kyc.html': [['m-kyc', ['review', 'view document', 'view']]],
  'admin/reviews.html': [['m-review', ['moderate', 'view review', 'view']]],
  'admin/moderation.html': [['m-abuse', ['view report', 'investigate', 'view']]],
  'admin/service-approvals.html': [['m-service', ['review listing', 'review', 'view']]],
  'admin/services.html': [['m-service', ['view listing', 'edit listing', 'view']]],
  'admin/leads.html': [['m-lead', ['view lead', 'view detail', 'view']]],
  'admin/bookings.html': [['m-booking', ['view booking', 'view detail', 'view']]],
  'admin/transactions.html': [['m-txn', ['view transaction', 'view detail', 'view']]],
  'admin/invoices.html': [['m-invoice', ['view invoice', 'view', 'download']]],
  'admin/inventory.html': [['m-stock', ['adjust', 'update stock', 'view']]],
  'admin/abandoned-carts.html': [['m-cart', ['view cart', 'send reminder', 'view']]],
  'admin/settings.html': [['m-setting', ['save changes', 'save']]],
  'admin/logs.html': [['m-log', ['view trace', 'view detail', 'view']]],
  'admin/activity.html': [['m-log', ['view detail', 'view']]],
  'admin/chats.html': [['m-chat', ['view session', 'open chat', 'monitor', 'view']]],
  'admin/dashboard.html': [['m-order', ['view order', 'view all orders']]],
  'vendor/order-details.html': [['m-invoice', ['invoice']]],
  'vendor/transactions.html': [['m-txn', ['view detail', 'view']]]
};

let pages = 0, hooks = 0;
Object.keys(MAP).forEach(p => {
  const defs = MAP[p];
  let h = fs.readFileSync(p, 'utf8'); const before = h;
  if (!h.includes('class="modal"')) return;

  /* 1) dropdown row actions */
  h = h.replace(/<a class="dd-item([^"]*)"((?:(?!>)[\s\S])*)>([\s\S]*?)<\/a>/g, (m, extra, attrs, inner) => {
    if (attrs.includes('data-modal') || attrs.includes('href=')) return m;
    const txt = inner.replace(/<[^>]+>/g, '').trim().toLowerCase();
    for (const [id, keys] of defs) {
      if (keys.some(k => txt.startsWith(k) || txt === k)) { hooks++; return `<a class="dd-item${extra}"${attrs} data-modal="${id}">${inner}</a>`; }
    }
    return m;
  });

  /* 2) plain buttons in cards / page head */
  h = h.replace(/<button class="btn ([^"]*)"((?:(?!>)[\s\S])*)>([\s\S]*?)<\/button>/g, (m, cls, attrs, inner) => {
    if (attrs.includes('data-modal') || attrs.includes('data-toast')) return m;
    const txt = inner.replace(/<[^>]+>/g, '').trim().toLowerCase();
    for (const [id, keys] of defs) {
      if (keys.some(k => txt === k)) { hooks++; return `<button class="btn ${cls}"${attrs} data-modal="${id}">${inner}</button>`; }
    }
    return m;
  });

  if (h !== before) { fs.writeFileSync(p, h); pages++; }
});
console.log('pages wired:', pages, '| triggers added:', hooks);
