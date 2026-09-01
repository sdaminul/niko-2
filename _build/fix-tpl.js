/* Escape the HTML sample inside the email-body textarea so it renders as text */
const fs = require('fs');
const p = 'admin/email-templates.html';
let h = fs.readFileSync(p, 'utf8');

const start = '<textarea class="textarea !min-h-[90px]" placeholder="<h2>Thank you';
const i = h.indexOf(start);
if (i === -1) { console.log('anchor not found'); process.exit(0); }
const end = h.indexOf('</textarea>', i);
const block = h.slice(i, end + '</textarea>'.length);

const sample = [
  '<h2>Thank you, {name}!</h2>',
  '<p>Your order {order_id} has been confirmed. Estimated delivery {eta}.</p>',
  '{items_table}',
  '<p>Total paid: {total}</p>',
  '<a href="{track_link}">Track your order</a>'
].join('\n').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const fixed = '<textarea class="textarea !min-h-[150px] !font-mono !text-[11.5px] !leading-[1.7]" spellcheck="false">' + sample + '</textarea>';
h = h.replace(block, fixed);
fs.writeFileSync(p, h);
console.log('textarea fixed · placeholder attr removed · sample escaped');
