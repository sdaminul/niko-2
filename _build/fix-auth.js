/* Add a slim legal strip to auth screens that lack one */
const fs = require('fs');
const pages = ['forgot-password.html', 'otp-verify.html', 'reset-password.html'];

const strip = `
<div class="max-w-[420px] mx-auto px-4 pb-10">
<div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11.5px] text-ink-400">
<a href="terms.html" class="hover:text-brand-600">Terms of Service</a><span class="text-ink-200">·</span>
<a href="privacy-policy.html" class="hover:text-brand-600">Privacy Policy</a><span class="text-ink-200">·</span>
<a href="help-center.html" class="hover:text-brand-600">Help Centre</a><span class="text-ink-200">·</span>
<a href="contact.html" class="hover:text-brand-600">Contact us</a></div>
<p class="text-center text-[11.5px] text-ink-400 mt-2">© 2026 HaatBazar Ltd. Protected by reCAPTCHA — never share your OTP with anyone.</p></div>
`;

let n = 0;
pages.forEach(p => {
  let h = fs.readFileSync(p, 'utf8');
  if (/terms\.html/.test(h)) return;
  const i = h.lastIndexOf('<script src="js/main.js">');
  if (i === -1) return;
  h = h.slice(0, i) + strip + h.slice(i);
  fs.writeFileSync(p, h);
  n++;
});
console.log('auth pages given legal strip: ' + n);
