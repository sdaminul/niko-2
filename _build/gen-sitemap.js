/* Rebuild sitemap.html from the actual file system so every page is listed */
const fs = require('fs');
const { svg } = require('./ui');
const L = require('./layout');
const B = require('./blocks');

const T = (f) => {
  const n = f.replace('.html', '');
  const o = {
    'index': 'Home', 'faq': 'FAQ', 'cms': 'Banners & Home Layout', 'kyc': 'KYC Verification', 'seo': 'SEO & Sitemaps',
    '404': '404 Page', 'otp-verify': 'Verify OTP', 'order-success': 'Order Confirmed', 'privacy-policy': 'Privacy Policy',
    'terms': 'Terms of Service', 'faq-admin': 'FAQ', 'system-health': 'System Health', 'activity': 'Audit Log',
    'logs': 'System Logs', 'roles': 'Roles & Permissions', 'staff': 'Staff & Admins', 'taxes': 'Tax & VAT',
    'commissions': 'Commission Plans', 'gift-cards': 'Gift Cards & Wallets', 'abandoned-carts': 'Abandoned Carts',
    'kyc-admin': 'KYC', 'payment-methods': 'Payment Methods', 'integrations': 'Integrations & API',
    'email-templates': 'Email & SMS Templates', 'service-categories': 'Service Categories', 'attributes': 'Attributes & Specs',
    'product-approvals': 'Product Approvals', 'service-approvals': 'Service Approvals', 'vendor-approvals': 'Vendor Approvals',
    'moderation': 'Reports & Abuse', 'chats': 'Live Chat', 'media': 'Media Library', 'locations': 'Locations & Zones',
    'ads': 'Ads & Sponsored', 'academy': 'Seller Academy', 'documents': 'Documents & KYC', 'subscription': 'Subscription & Plan'
  };
  return o[n] || n.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};
const list = (dir) => fs.readdirSync(dir || '.').filter(f => f.endsWith('.html')).sort();
const pick = (arr, names) => names.filter(n => arr.includes(n));

const root = list('');
const G = [
  ['Marketplace &amp; discovery', pick(root, ['index.html', 'categories.html', 'products.html', 'product-details.html', 'services.html', 'service-details.html', 'shops.html', 'shop-profile.html', 'brands.html', 'offers.html', 'search.html', 'compare.html'])],
  ['Shopping &amp; checkout', pick(root, ['cart.html', 'checkout.html', 'order-success.html', 'track-order.html'])],
  ['Account &amp; onboarding', pick(root, ['login.html', 'register.html', 'otp-verify.html', 'forgot-password.html', 'reset-password.html', 'become-seller.html', 'seller-register.html', 'become-provider.html', 'provider-register.html'])],
  ['Company, help &amp; policies', pick(root, ['about.html', 'contact.html', 'careers.html', 'blog.html', 'blog-details.html', 'help-center.html', 'faq.html', 'terms.html', 'privacy-policy.html', 'return-policy.html', 'shipping-policy.html', 'sitemap.html', '404.html'])],
  ['Customer dashboard', list('user').map(f => 'user/' + f)],
  ['Seller centre — products', pick(list('vendor'), ['dashboard.html', 'products.html', 'add-product.html', 'inventory.html', 'orders.html', 'order-details.html', 'returns.html', 'shipping.html', 'questions.html', 'reviews.html', 'shop-profile.html']).map(f => 'vendor/' + f)],
  ['Seller centre — services &amp; growth', pick(list('vendor'), ['services.html', 'add-service.html', 'leads.html', 'bookings.html', 'business-profile.html', 'promotions.html', 'ads.html', 'analytics.html', 'reports.html', 'academy.html', 'subscription.html']).map(f => 'vendor/' + f)],
  ['Seller centre — finance &amp; account', pick(list('vendor'), ['payouts.html', 'transactions.html', 'invoices.html', 'customers.html', 'messages.html', 'notifications.html', 'staff.html', 'documents.html', 'settings.html']).map(f => 'vendor/' + f)],
  ['Admin — overview &amp; catalog', pick(list('admin'), ['dashboard.html', 'analytics.html', 'reports.html', 'products.html', 'product-approvals.html', 'categories.html', 'brands.html', 'attributes.html', 'inventory.html', 'services.html', 'service-approvals.html', 'service-categories.html', 'leads.html']).map(f => 'admin/' + f)],
  ['Admin — sales &amp; finance', pick(list('admin'), ['orders.html', 'bookings.html', 'shipping.html', 'disputes.html', 'abandoned-carts.html', 'invoices.html', 'transactions.html', 'payouts.html', 'commissions.html', 'gift-cards.html', 'taxes.html']).map(f => 'admin/' + f)],
  ['Admin — people &amp; moderation', pick(list('admin'), ['customers.html', 'vendors.html', 'vendor-approvals.html', 'kyc.html', 'staff.html', 'roles.html', 'reviews.html', 'questions.html', 'moderation.html', 'tickets.html', 'chats.html']).map(f => 'admin/' + f)],
  ['Admin — marketing, content &amp; system', pick(list('admin'), ['campaigns.html', 'promotions.html', 'ads.html', 'notifications.html', 'email-templates.html', 'seo.html', 'cms.html', 'pages.html', 'blog.html', 'faq.html', 'media.html', 'settings.html', 'locations.html', 'payment-methods.html', 'integrations.html', 'activity.html', 'logs.html', 'system-health.html']).map(f => 'admin/' + f)]
];
const total = G.reduce((a, g) => a + g[1].length, 0);

fs.writeFileSync('sitemap.html', L.page({
  title: 'Sitemap', body: `${L.crumb([{ t: 'Sitemap' }], false)}
<main class="shell py-8">
<div class="max-w-2xl mb-7"><h1 class="font-display text-[28px] font-extrabold tracking-tight mb-2">Sitemap</h1>
<p class="text-[14px] text-ink-500">Every page on HaatBazar in one place — <b>${total} pages</b> across the marketplace, customer dashboard, seller centre and admin panel.</p></div>
<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">${[['Storefront pages', 38, 'globe'], ['Customer dashboard', 15, 'user'], ['Seller centre', 31, 'store'], ['Admin panel', 53, 'shield']].map(s => `<div class="card p-5"><span class="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 grid place-items-center mb-2.5">${svg(s[2], 'w-5 h-5')}</span><p class="font-display text-[26px] font-extrabold">${s[1]}</p><p class="text-[12.5px] text-ink-500">${s[0]}</p></div>`).join('')}</div>
<div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">${G.map((g, i) => `<div class="card p-5">
<h2 class="text-[15px] font-extrabold mb-3 pb-3 border-b border-[#f0f1f5] flex items-center gap-2"><span class="w-7 h-7 rounded-lg bg-brand-50 text-brand-600 grid place-items-center text-[12px] font-extrabold">${i + 1}</span>${g[0]}<span class="badge badge-gray ml-auto">${g[1].length}</span></h2>
<div class="space-y-1">${g[1].map(p => `<a href="${p}" class="flex items-center gap-2 py-1.5 text-[13px] text-ink-600 hover:text-brand-600">${svg('chevR', 'w-3.5 h-3.5 text-ink-300')}${T(p.split('/').pop())}</a>`).join('')}</div></div>`).join('')}</div>
<div class="card p-6 mt-7 text-center"><p class="text-[15px] font-extrabold mb-1.5">Looking for something else?</p>
<p class="text-[13px] text-ink-500 mb-4">Search the whole marketplace or ask our support team.</p>
<div class="flex flex-wrap justify-center gap-2.5"><a href="search.html" class="btn btn-primary">${svg('search')}Search HaatBazar</a><a href="help-center.html" class="btn btn-outline">Help centre</a><a href="contact.html" class="btn btn-outline">Contact support</a></div></div>
</main>${B.modals(false)}`
}));
console.log('sitemap.html rebuilt —', total, 'links');
