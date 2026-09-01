/* Give every orphan modal a real trigger by matching modal titles to on-page controls */
const fs = require('fs');

const STOP = new Set(['the', 'a', 'an', 'and', 'or', 'to', 'of', 'for', 'in', 'on', 'with', 'new', 'my', 'your', 'this', 'from', 'by', 'edit', 'view', 'all']);
const words = s => s.toLowerCase().replace(/&amp;|&[a-z]+;/g, ' ').replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 2 && !STOP.has(w));

/* explicit hints where titles and labels differ */
const HINT = {
  quickViewModal: ['quick view'], callModal: ['call now', 'show number', 'call'], quoteModal: ['get quote', 'request quote', 'send enquiry', 'get best quote'],
  locationModal: ['change location', 'select location', 'location', 'deliver to'], couponModal: ['apply coupon', 'coupon', 'voucher'],
  addrModal: ['add address', 'new address', 'change address'], reviewModal: ['write a review', 'write review'], srevModal: ['write a review', 'write review'],
  'addr-modal': ['add address', 'new address'], 'book-modal': ['view booking', 'booking detail'], 'srv-review': ['rate service', 'write review'],
  'review-modal': ['write review', 'rate product'], 'cancel-modal': ['cancel order', 'cancel'], del: ['delete account', 'close account'],
  'return-modal': ['request return', 'new return'], ticket: ['new ticket', 'create ticket', 'raise ticket'], redeem: ['redeem', 'redeem code'],
  topup: ['top up', 'add money'], withdraw: ['withdraw'], addpay: ['add payment method', 'add card'],
  'm-ad': ['create campaign', 'new campaign', 'create ad', 'new ad'], 'm-book': ['view booking', 'booking detail'], 'm-bcast': ['broadcast', 'send broadcast', 'bulk message'],
  'm-doc': ['upload document', 'upload'], adjust: ['adjust stock', 'adjust', 'update stock'], 'm-inv': ['view invoice', 'invoice detail'],
  'm-lead': ['view lead', 'lead detail'], ship: ['ship order', 'arrange shipment', 'book courier', 'ship now'], 'm-wd': ['withdraw', 'request payout'],
  import: ['import', 'bulk import', 'import products'], 'm-promo': ['create promotion', 'new promotion', 'new voucher', 'create voucher'],
  ret: ['review return', 'process return'], 'm-reply': ['reply', 'reply to review'], 'm-req': ['request removal', 'report review'],
  'm-rate': ['add rate', 'shipping rate', 'add zone'], 'm-staff': ['add staff', 'invite staff', 'new staff', 'invite'],
  'm-attr': ['add attribute', 'new attribute'], 'm-post': ['new post', 'write post', 'add post'], 'm-brand': ['add brand', 'new brand'],
  'm-camp': ['create campaign', 'new campaign'], 'm-cat': ['add category', 'new category'], 'm-ban': ['add banner', 'new banner', 'add slide'],
  'm-comm': ['add plan', 'new plan', 'commission plan'], 'm-res': ['resolve', 'resolve dispute'], 'm-tpl': ['edit template', 'new template'],
  'm-faq': ['add faq', 'new faq'], 'm-gc': ['issue gift card', 'create gift card', 'new gift card'], 'm-api': ['add key', 'generate key', 'new api key'],
  'm-loc': ['add location', 'new zone', 'add zone'], 'm-up': ['upload', 'upload media'], 'm-push': ['new notification', 'send notification', 'create broadcast', 'send broadcast'],
  'm-pg': ['add page', 'new page'], 'm-pm': ['add method', 'add gateway', 'new method'], 'm-run': ['new payout run', 'create run', 'run payout'],
  'm-rej': ['reject', 'reject listing'], 'm-stock': ['stock', 'adjust stock'], 'm-cpn': ['create coupon', 'new coupon'],
  'm-ans': ['answer', 'reply'], 'm-rep': ['new report', 'build report', 'schedule report', 'create report'], 'm-role': ['add role', 'new role'],
  'm-seo': ['edit meta', 'edit seo'], 'm-scat': ['add category', 'new category'], 'm-setting': ['save changes', 'save'],
  'm-cour': ['add courier', 'new courier'], 'm-inc': ['create incident', 'new incident', 'report incident'], 'm-tax': ['add tax rule', 'new tax', 'add rule'],
  'm-tkt': ['reply', 'open ticket', 'view ticket'], 'm-kyc': ['review documents', 'view documents', 'verify'], 'm-order': ['view order'],
  'm-vendor': ['view profile'], 'm-customer': ['view profile'], 'm-product': ['review listing'], 'm-review': ['moderate'],
  'm-abuse': ['view report'], 'm-service': ['review listing'], 'm-payout': ['view payout', 'process payout'], 'm-txn': ['view detail'],
  'm-invoice': ['view invoice'], 'm-cart': ['view cart'], 'm-log': ['view trace'], 'm-chat': ['view session'], 'm-booking': ['view booking']
};

let pages = 0, added = 0, still = [];
['', 'user', 'vendor', 'admin'].forEach(d => {
  fs.readdirSync(d || '.').filter(f => f.endsWith('.html')).forEach(f => {
    const p = (d ? d + '/' : '') + f;
    let h = fs.readFileSync(p, 'utf8'); const before = h;

    const modals = [...h.matchAll(/class="modal" id="([^"]+)"><div class="modal-backdrop"[^>]*><\/div><div class="modal-panel[^"]*">\s*<div class="card-head"><h3>([\s\S]*?)<\/h3>/g)]
      .map(m => ({ id: m[1], title: m[2].replace(/<[^>]+>/g, '') }));
    if (!modals.length) return;
    const have = new Set([...h.matchAll(/data-modal-open="([^"]+)"/g)].map(m => m[1]));
    const orphans = modals.filter(m => !have.has(m.id));
    if (!orphans.length) return;

    orphans.forEach(o => {
      const keys = (HINT[o.id] || []).concat(words(o.title));
      let done = false;
      // pass 1: exact-ish label match on buttons / links without an existing behaviour
      h = h.replace(/<(button|a)((?:(?!>)[\s\S])*?)>((?:(?!<\/(?:button|a)>)[\s\S])*?)<\/\1>/g, (m, tag, attrs, inner) => {
        if (done) return m;
        if (/data-modal-open|data-modal-close|data-toast|data-drawer|data-dropdown|href="(?!#)/.test(attrs)) return m;
        if (!/class="[^"]*\bbtn\b|class="[^"]*dd-item/.test(attrs)) return m;
        const txt = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim().toLowerCase();
        if (!txt) return m;
        if (!keys.some(k => txt === k || txt.startsWith(k + ' ') || txt.includes(k))) return m;
        done = true; added++;
        return `<${tag}${attrs} data-modal-open="${o.id}">${inner}</${tag}>`;
      });
      if (!done) still.push(p + ' → ' + o.id + ' ("' + o.title + '")');
    });

    if (h !== before) { fs.writeFileSync(p, h); pages++; }
  });
});
console.log('pages:', pages, '| triggers added:', added);
console.log('still orphan (' + still.length + ')' + (still.length ? ':\n  ' + still.join('\n  ') : ''));
