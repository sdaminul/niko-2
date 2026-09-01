/* Rewrite legacy/alias hrefs across every emitted HTML page */
const fs = require('fs'), path = require('path');
const root = 'f:/niko-design';
const MAP = {
  'sell-with-us.html': 'become-seller.html',
  'list-business.html': 'become-provider.html',
  'returns-policy.html': 'return-policy.html',
  'seller-policy.html': 'terms.html',
  'vendor-register.html': 'seller-register.html',
  'advertise.html': 'become-seller.html',
  'affiliate.html': 'become-seller.html',
  'gift-cards.html': 'offers.html'
};
const DASH = {
  'user/inquiries.html': 'user/messages.html'
};
let changed = 0;
['', 'user', 'vendor', 'admin'].forEach(dir => {
  const p = path.join(root, dir);
  fs.readdirSync(p).filter(f => f.endsWith('.html')).forEach(f => {
    const full = path.join(p, f);
    let h = fs.readFileSync(full, 'utf8'), before = h;
    // root-level aliases (also with ../ prefix)
    Object.keys(MAP).forEach(k => {
      if (dir === 'admin' && k === 'gift-cards.html') return; // admin has its own gift-cards page
      h = h.split('href="' + k + '"').join('href="' + MAP[k] + '"');
      h = h.split('href="../' + k + '"').join('href="../' + MAP[k] + '"');
    });
    Object.keys(DASH).forEach(k => {
      h = h.split('href="' + k + '"').join('href="' + DASH[k] + '"');
      h = h.split('href="../' + k + '"').join('href="../' + DASH[k] + '"');
    });
    // in-dashboard aliases
    if (dir === 'admin') {
      h = h.split('href="messages.html"').join('href="chats.html"');
      h = h.split('href="users.html"').join('href="customers.html"');
      h = h.split('href="login.html"').join('href="../login.html"').split('href="../../login.html"').join('href="../login.html"');
    }
    if (dir === 'vendor') {
      h = h.split('href="profile.html"').join('href="settings.html"');
      h = h.split('href="login.html"').join('href="../login.html"').split('href="../../login.html"').join('href="../login.html"');
    }
    if (dir === 'user') {
      h = h.split('href="login.html"').join('href="../login.html"').split('href="../../login.html"').join('href="../login.html"');
    }
    if (h !== before) { fs.writeFileSync(full, h); changed++; }
  });
});
console.log('patched files:', changed);
