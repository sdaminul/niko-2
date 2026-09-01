/* Admin: staff, roles */
const K = require('./kit'), R = require('./gen-rest');
const { card, table, st, tk, prow, kv, note, fld, inp, sel, ta, chk, gridForm, frows, modal, modalFoot } = K;
const { AD, btn, A, row2 } = R;
const bd = (t, c) => `<span class="badge badge-${c}">${t}</span>`;

AD('staff.html', {
  title: 'Staff & Admins', sub: 'Platform team members, their roles, departments and access activity.', crumb: 'Staff & admins',
  actions: [['Login history', 'db'], ['Export', 'dl'], ['Invite staff', 'plus', 'primary', 'data-modal-open="m-staff"']],
  stats: [['Total staff', '148', '+6', 'users', 'brand', '12 departments'],
    ['Online now', '42', '', 'bolt', 'service', 'Across 4 shifts'],
    ['Pending invites', '8', '', 'mail', 'gold', 'Awaiting acceptance'],
    ['2FA enabled', '96%', '+4%', 'shield', 'ink', '6 accounts pending']],
  tabs: [['All staff', '148'], ['Super admins', '4'], ['Operations', '48'], ['Support', '42'], ['Catalog / QC', '24'], ['Finance', '12'], ['Marketing', '14'], ['Invited', '8'], ['Disabled', '18']],
  filters: ['search', ['Role: All', 'Super admin', 'Admin', 'Operations manager', 'Support agent', 'Catalog moderator', 'Finance officer', 'Marketing manager'], ['Department: All', 'Operations', 'Support', 'Catalog', 'Finance', 'Marketing', 'Tech'], ['Status: All', 'Active', 'Invited', 'Disabled'], ['2FA: All', 'Enabled', 'Not enabled']],
  bulk: ['Change role', 'Reset password', 'Force 2FA', 'Disable', 'Export'],
  head: ['Staff member', 'Employee ID', 'Role', 'Department', 'Assigned scope', 'Last login', 'IP / device', '2FA', 'Actions today', 'Status', ['Actions', 'text-right']],
  rows: [
    [prow(0, 'Aminul Islam', 'aminul@niko.com.bd · Founder'), 'EMP-0001', bd('Super admin', 'red'), 'Management', 'Full platform access', '12 min ago', '103.108.x.x · Chrome / Win', bd('Enabled', 'green'), '86', st('Active'), A([['View profile', 'eye'], ['Permissions', 'lock'], ['Activity log', 'db'], ['Reset password', 'key']])],
    [prow(1, 'Nafisa Karim', 'nafisa@niko.com.bd'), 'EMP-0042', bd('Catalog moderator', 'blue'), 'Catalog / QC', 'Product & service approvals', '5 min ago', '103.108.x.x · Chrome / Mac', bd('Enabled', 'green'), '248 approvals', st('Active'), A([['View profile', 'eye'], ['Permissions', 'lock'], ['Approval stats', 'chart'], ['Disable account', 'ban', 1]])],
    [prow(2, 'Sabbir Ahmed', 'sabbir@niko.com.bd'), 'EMP-0088', bd('Support agent', 'blue'), 'Support', 'Tickets, chats, disputes', '2 min ago', '10.0.x.x · App / Android', bd('Enabled', 'green'), '64 tickets', st('Active'), A([['View profile', 'eye'], ['Ticket stats', 'chart'], ['Change role', 'key']])],
    [prow(3, 'Tania Rahman', 'tania@niko.com.bd'), 'EMP-0102', bd('Finance officer', 'amber'), 'Finance', 'Payouts, refunds, invoices', '1 hr ago', '103.108.x.x · Edge / Win', bd('Enabled', 'green'), '18 payouts approved', st('Active'), A([['View profile', 'eye'], ['Approval limits', 'money'], ['Permissions', 'lock']])],
    [prow(4, 'Rashed Kabir', 'rashed@niko.com.bd'), 'EMP-0118', bd('Operations manager', 'blue'), 'Operations', 'Orders, shipping, vendors (Dhaka)', '3 hrs ago', '103.108.x.x · Chrome / Win', bd('Enabled', 'green'), '42', st('Active'), A([['View profile', 'eye'], ['Region scope', 'pin'], ['Permissions', 'lock']])],
    [prow(5, 'Imtiaz Hossain', 'imtiaz@niko.com.bd · Invited 20 Aug'), '—', bd('Support agent', 'blue'), 'Support', 'Tickets only', 'Never', '—', bd('Pending', 'amber'), '0', st('Invited'), A([['Resend invite', 'mail'], ['Copy invite link', 'copy'], ['Cancel invite', 'x', 1]])],
    [prow(6, 'Former Employee', 'exemp@niko.com.bd · Left 30 Jun 2026'), 'EMP-0064', bd('Support agent', 'gray'), 'Support', 'Revoked', '30 Jun 2026', '—', '—', '0', st('Disabled'), A([['View profile', 'eye'], ['Activity log', 'db'], ['Delete account', 'trash', 1]])]
  ], total: 148,
  after: row2(card('Access & security policy', `<div class="p-4">${frows([['Mandatory 2FA for all staff', 'Require an authenticator app or SMS OTP at login.', true],
    ['IP allow-list for admin panel', 'Only office and VPN IP ranges may sign in.', true],
    ['Session timeout after 30 minutes', 'Automatically sign out idle sessions.', true],
    ['Maker–checker on payouts', 'A second officer must approve payouts above ' + tk(100000) + '.', true],
    ['Mask customer phone numbers', 'Support agents see only the last 3 digits.', true],
    ['Log every admin action', 'Write to the immutable audit trail.', true],
    ['Disable download of full customer list', 'Prevents bulk data exfiltration.', true]])}
<div class="p-4 pt-0 flex flex-wrap gap-2">${btn('Audit log', 'db')}${btn('Active sessions (42)', 'monitor')}${btn('Force logout all', 'power', 'outline')}</div></div>`),
    card('Team workload today', table([['Member'], ['Queue'], ['Handled'], ['Pending'], ['Avg. time'], ['', 'text-right']], [
      ['<b>Nafisa Karim</b>', 'Product approvals', '248', '42', '3.2 min', A([['Reassign', 'refresh']])],
      ['<b>Sabbir Ahmed</b>', 'Support tickets', '64', '12', '18 min', A([['Reassign', 'refresh']])],
      ['<b>Tania Rahman</b>', 'Payouts', '18', '6', '9 min', A([['Reassign', 'refresh']])],
      ['<b>Rashed Kabir</b>', 'Orders & shipping', '42', '18', '6 min', A([['Reassign', 'refresh']])],
      ['<b>Mehedi Hasan</b>', 'Disputes', '24', '8', '32 min', A([['Reassign', 'refresh']])]
    ]), btn('Workload settings', 'sliders', 'ghost'))
    + modal('m-staff', 'Invite staff member', gridForm([
      fld('Full name *', inp('e.g. Imtiaz Hossain')), fld('Work email *', inp('name@niko.com.bd')),
      fld('Mobile number', inp('01XXXXXXXXX')), fld('Employee ID', inp('EMP-0000')),
      fld('Role *', sel(['Super admin', 'Admin', 'Operations manager', 'Support agent', 'Catalog moderator', 'Finance officer', 'Marketing manager', 'Content editor', 'Read-only analyst'])),
      fld('Department', sel(['Operations', 'Support', 'Catalog / QC', 'Finance', 'Marketing', 'Tech', 'Management'])),
      fld('Region scope', sel(['All Bangladesh', 'Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Custom'])),
      fld('Category scope', sel(['All categories', 'Electronics', 'Fashion', 'Services only', 'Custom'])),
      fld('Approval limit', inp(tk(50000))), fld('Shift', sel(['General (9–6)', 'Morning', 'Evening', 'Night'])),
      fld('Reporting manager', sel(['Aminul Islam', 'Rashed Kabir', 'Tania Rahman'])),
      fld('Access expires on', inp('No expiry')),
      fld('Internal note', ta('Onboarding note, contract type…'), 'sm:col-span-2'),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Require 2FA setup at first login', true)}${chk('Send welcome email', true)}${chk('Restrict to office IP range', true)}${chk('Allow data export', false)}</div>`
    ]) + modalFoot('Send invite', 'Invitation sent')))
});

const P = (m, ...v) => [m, ...v];
AD('roles.html', {
  title: 'Roles & Permissions', sub: 'Granular access control for every admin module and action.', crumb: 'Roles & permissions',
  actions: [['Permission matrix', 'grid'], ['Change log', 'db'], ['Create role', 'plus', 'primary', 'data-modal-open="m-role"']],
  stats: [['Roles defined', '14', '', 'lock', 'brand', '4 system + 10 custom'],
    ['Permissions available', '286', '', 'key', 'service', 'Across 32 modules'],
    ['Staff assigned', '148', '', 'users', 'gold', 'All have a role'],
    ['Sensitive permissions', '24', '', 'shield', 'ink', 'Require dual approval']],
  tabs: [['All roles', '14'], ['System roles', '4'], ['Custom roles', '10'], ['Permission matrix', ''], ['Change history', '182']],
  filters: ['search', ['Type: All', 'System', 'Custom'], ['Scope: All', 'Global', 'Regional', 'Category-limited']],
  head: ['Role', 'Type', 'Description', 'Modules allowed', 'Sensitive access', 'Scope', 'Staff assigned', 'Updated', ['Actions', 'text-right']],
  rows: [
    ['<b>Super Admin</b>', bd('System', 'red'), 'Unrestricted access to all modules and settings', '32 / 32', bd('All', 'red'), 'Global', '4', '02 Jan 2026', A([['View permissions', 'eye'], ['Assigned staff', 'users'], ['Change log', 'db']])],
    ['<b>Admin</b>', bd('System', 'blue'), 'Full operations access, no billing or system settings', '28 / 32', bd('Limited', 'amber'), 'Global', '12', '18 Jun 2026', A([['Edit role', 'edit'], ['Duplicate', 'copy'], ['Assigned staff', 'users']])],
    ['<b>Operations Manager</b>', bd('Custom', 'gray'), 'Orders, shipping, vendors, disputes for assigned region', '14 / 32', bd('Refunds up to ' + tk(20000), 'amber'), 'Regional', '48', '04 Aug 2026', A([['Edit role', 'edit'], ['Region scope', 'pin'], ['Duplicate', 'copy'], ['Delete role', 'trash', 1]])],
    ['<b>Support Agent</b>', bd('Custom', 'gray'), 'Tickets, chats, order lookup, limited customer data', '8 / 32', bd('Masked PII', 'green'), 'Global', '42', '12 Jul 2026', A([['Edit role', 'edit'], ['Duplicate', 'copy']])],
    ['<b>Catalog Moderator</b>', bd('Custom', 'gray'), 'Product & service approvals, categories, attributes', '9 / 32', bd('None', 'green'), 'Category-limited', '24', '22 Jul 2026', A([['Edit role', 'edit'], ['Category scope', 'layers']])],
    ['<b>Finance Officer</b>', bd('Custom', 'gray'), 'Payouts, transactions, invoices, tax, refunds', '10 / 32', bd('Payout approval', 'red'), 'Global', '12', '30 Jul 2026', A([['Edit role', 'edit'], ['Approval limits', 'money']])],
    ['<b>Marketing Manager</b>', bd('Custom', 'gray'), 'Campaigns, banners, coupons, ads, notifications, SEO', '11 / 32', bd('Broadcast send', 'amber'), 'Global', '14', '08 Aug 2026', A([['Edit role', 'edit'], ['Duplicate', 'copy']])],
    ['<b>Read-only Analyst</b>', bd('Custom', 'gray'), 'View dashboards and reports only, no edits', '18 / 32 (view)', bd('None', 'green'), 'Global', '6', '14 Aug 2026', A([['Edit role', 'edit'], ['Duplicate', 'copy']])]
  ], total: 14,
  after: card('Permission matrix — Operations Manager', table([['Module'], ['View'], ['Create'], ['Edit'], ['Approve'], ['Delete'], ['Export'], ['Sensitive']], [
    P('<b>Dashboard & analytics</b>', chk('', true), '—', '—', '—', '—', chk('', true), '—'),
    P('<b>Products & catalog</b>', chk('', true), chk('', false), chk('', true), chk('', true), chk('', false), chk('', true), '—'),
    P('<b>Service listings</b>', chk('', true), chk('', false), chk('', true), chk('', true), chk('', false), chk('', true), '—'),
    P('<b>Orders</b>', chk('', true), chk('', true), chk('', true), chk('', true), chk('', false), chk('', true), 'Cancel / refund'),
    P('<b>Shipments & couriers</b>', chk('', true), chk('', true), chk('', true), chk('', true), chk('', false), chk('', true), '—'),
    P('<b>Returns & disputes</b>', chk('', true), chk('', true), chk('', true), chk('', true), chk('', false), chk('', true), 'Refund up to ' + tk(20000)),
    P('<b>Customers</b>', chk('', true), chk('', false), chk('', true), '—', chk('', false), chk('', false), 'Masked phone / email'),
    P('<b>Vendors</b>', chk('', true), chk('', false), chk('', true), chk('', true), chk('', false), chk('', true), 'Suspend vendor'),
    P('<b>KYC documents</b>', chk('', true), '—', '—', chk('', false), '—', chk('', false), 'View NID images'),
    P('<b>Payouts & finance</b>', chk('', true), '—', '—', chk('', false), '—', chk('', false), 'Approve payout'),
    P('<b>Commission & plans</b>', chk('', true), '—', '—', '—', '—', '—', 'Change rates'),
    P('<b>Coupons & campaigns</b>', chk('', true), chk('', false), chk('', false), '—', '—', '—', 'Create coupon'),
    P('<b>CMS & banners</b>', chk('', true), '—', '—', '—', '—', '—', '—'),
    P('<b>Reviews & Q&amp;A</b>', chk('', true), '—', chk('', true), chk('', true), chk('', true), '—', 'Delete review'),
    P('<b>Support tickets</b>', chk('', true), chk('', true), chk('', true), '—', '—', chk('', true), '—'),
    P('<b>Staff & roles</b>', chk('', false), '—', '—', '—', '—', '—', 'Manage access'),
    P('<b>Platform settings</b>', chk('', false), '—', '—', '—', '—', '—', 'System config'),
    P('<b>Audit & system logs</b>', chk('', true), '—', '—', '—', '—', chk('', false), 'Full log access')
  ]), btn('Save matrix', 'check', 'primary', 'data-toast="Permissions updated"') + btn('Reset to default', 'refresh', 'ghost'))
    + modal('m-role', 'Create role', gridForm([
      fld('Role name *', inp('e.g. Regional Ops Lead')),
      fld('Clone permissions from', sel(['Start empty', 'Admin', 'Operations Manager', 'Support Agent', 'Catalog Moderator', 'Finance Officer'])),
      fld('Description', ta('What this role can do'), 'sm:col-span-2'),
      fld('Scope type', sel(['Global', 'Regional', 'Category-limited', 'Vendor-group limited'])),
      fld('Scope value', inp('e.g. Dhaka division / Electronics')),
      fld('Refund approval limit', inp(tk(20000))), fld('Payout approval limit', inp(tk(0))),
      fld('Data visibility', sel(['Full customer data', 'Masked PII', 'Aggregated only'])),
      fld('Session policy', sel(['Standard (30 min)', 'Strict (15 min)', 'Extended (8 hrs)'])),
      `<div class="sm:col-span-2 flex flex-wrap gap-4">${chk('Require 2FA', true)}${chk('Allow data export', false)}${chk('Allow login-as-user', false)}${chk('Allow bulk delete', false)}${chk('Maker–checker required', true)}</div>`
    ]) + modalFoot('Create role', 'Role created'))
});
