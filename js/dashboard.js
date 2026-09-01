/* ==========================================================================
   HaatBazar — Dashboard shell behaviour (Customer / Vendor / Admin)
   Sidebar collapse + mobile drawer, submenu accordion, table helpers,
   demo charts drawn with inline SVG, date-range presets, row actions.
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var dash = $('.dash');

  /* --------------------------- Sidebar collapse ------------------------- */
  $$('[data-sb-collapse]').forEach(function (b) {
    b.addEventListener('click', function () {
      if (!dash) return;
      if (window.innerWidth < 1024) { dash.classList.toggle('sb-open'); }
      else { dash.classList.toggle('is-collapsed'); }
    });
  });
  $$('[data-sb-toggle]').forEach(function (b) {
    b.addEventListener('click', function () { if (dash) dash.classList.toggle('sb-open'); });
  });
  var backdrop = $('.sb-backdrop');
  if (backdrop) backdrop.addEventListener('click', function () { dash.classList.remove('sb-open'); });

  /* ---------------------------- Submenu groups -------------------------- */
  $$('[data-sb-group]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var sub = btn.nextElementSibling;
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      if (sub) sub.classList.toggle('is-open', !open);
    });
  });

  /* ------------------------- Row checkbox + bulk bar -------------------- */
  $$('[data-table]').forEach(function (table) {
    var master = $('[data-check-all]', table);
    var rows = $$('[data-check-row]', table);
    var bar = document.querySelector(table.getAttribute('data-bulkbar') || '');
    function sync() {
      var n = rows.filter(function (r) { return r.checked; }).length;
      if (bar) {
        bar.classList.toggle('is-on', n > 0);
        var out = $('[data-bulk-count]', bar);
        if (out) out.textContent = n;
      }
      if (master) master.indeterminate = n > 0 && n < rows.length;
    }
    rows.forEach(function (r) { r.addEventListener('change', sync); });
    if (master) master.addEventListener('change', function () {
      rows.forEach(function (r) { r.checked = master.checked; });
      sync();
    });
  });

  /* --------------------------- Sparkline charts ------------------------- */
  function spark(el) {
    var data = (el.getAttribute('data-spark') || '').split(',').map(Number);
    if (!data.length) return;
    var w = 220, h = 46, max = Math.max.apply(null, data), min = Math.min.apply(null, data);
    var span = (max - min) || 1;
    var pts = data.map(function (v, i) {
      return [(i / (data.length - 1)) * w, h - ((v - min) / span) * (h - 6) - 3];
    });
    var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
    var area = d + ' L' + w + ' ' + h + ' L0 ' + h + ' Z';
    var color = el.getAttribute('data-spark-color') || '#ff2525';
    var id = 'sg' + Math.random().toString(36).slice(2, 8);
    el.innerHTML = '<svg viewBox="0 0 ' + w + ' ' + h + '" preserveAspectRatio="none" style="width:100%;height:100%">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="' + color + '" stop-opacity=".28"/>' +
      '<stop offset="100%" stop-color="' + color + '" stop-opacity="0"/></linearGradient></defs>' +
      '<path d="' + area + '" fill="url(#' + id + ')"/>' +
      '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
  }
  $$('[data-spark]').forEach(spark);

  /* ---------------------------- Line/area chart ------------------------- */
  function lineChart(el) {
    var series = JSON.parse(el.getAttribute('data-line') || '[]');
    var labels = (el.getAttribute('data-labels') || '').split(',');
    if (!series.length) return;
    var w = 760, h = 260, pad = { t: 14, r: 12, b: 26, l: 38 };
    var all = series.reduce(function (a, s) { return a.concat(s.data); }, []);
    var max = Math.max.apply(null, all) * 1.12 || 10, min = 0;
    var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
    var svg = ['<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;height:auto" preserveAspectRatio="none">'];
    for (var g = 0; g <= 4; g++) {
      var y = pad.t + (ih / 4) * g;
      svg.push('<line x1="' + pad.l + '" y1="' + y + '" x2="' + (w - pad.r) + '" y2="' + y + '" stroke="#eceef2" stroke-width="1"/>');
      svg.push('<text x="' + (pad.l - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="10" fill="#8792a6">' +
        Math.round(max - (max / 4) * g).toLocaleString() + '</text>');
    }
    labels.forEach(function (lb, i) {
      var x = pad.l + (iw / Math.max(labels.length - 1, 1)) * i;
      svg.push('<text x="' + x + '" y="' + (h - 6) + '" text-anchor="middle" font-size="10" fill="#8792a6">' + lb + '</text>');
    });
    series.forEach(function (s, si) {
      var pts = s.data.map(function (v, i) {
        return [pad.l + (iw / Math.max(s.data.length - 1, 1)) * i, pad.t + ih - ((v - min) / (max - min)) * ih];
      });
      var d = pts.map(function (p, i) { return (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' ');
      var id = 'lg' + si + Math.random().toString(36).slice(2, 6);
      if (s.fill !== false) {
        svg.push('<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="' + s.color + '" stop-opacity=".24"/>' +
          '<stop offset="100%" stop-color="' + s.color + '" stop-opacity="0"/></linearGradient></defs>');
        svg.push('<path d="' + d + ' L' + pts[pts.length - 1][0] + ' ' + (pad.t + ih) + ' L' + pts[0][0] + ' ' + (pad.t + ih) + ' Z" fill="url(#' + id + ')"/>');
      }
      svg.push('<path d="' + d + '" fill="none" stroke="' + s.color + '" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"' +
        (s.dashed ? ' stroke-dasharray="5 5"' : '') + '/>');
      pts.forEach(function (p) {
        svg.push('<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="3" fill="#fff" stroke="' + s.color + '" stroke-width="2"/>');
      });
    });
    svg.push('</svg>');
    el.innerHTML = svg.join('');
  }
  $$('[data-line]').forEach(lineChart);

  /* ------------------------------ Bar chart ----------------------------- */
  function barChart(el) {
    var data = JSON.parse(el.getAttribute('data-bars') || '[]');
    var labels = (el.getAttribute('data-labels') || '').split(',');
    var color = el.getAttribute('data-bar-color') || '#ff2525';
    if (!data.length) return;
    var w = 760, h = 240, pad = { t: 12, r: 10, b: 26, l: 38 };
    var max = Math.max.apply(null, data) * 1.15 || 10;
    var iw = w - pad.l - pad.r, ih = h - pad.t - pad.b;
    var bw = (iw / data.length) * 0.56;
    var svg = ['<svg viewBox="0 0 ' + w + ' ' + h + '" style="width:100%;height:auto">'];
    for (var g = 0; g <= 4; g++) {
      var y = pad.t + (ih / 4) * g;
      svg.push('<line x1="' + pad.l + '" y1="' + y + '" x2="' + (w - pad.r) + '" y2="' + y + '" stroke="#eceef2"/>');
      svg.push('<text x="' + (pad.l - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="10" fill="#8792a6">' +
        Math.round(max - (max / 4) * g).toLocaleString() + '</text>');
    }
    data.forEach(function (v, i) {
      var x = pad.l + (iw / data.length) * i + (iw / data.length - bw) / 2;
      var bh = (v / max) * ih;
      svg.push('<rect x="' + x.toFixed(1) + '" y="' + (pad.t + ih - bh).toFixed(1) + '" width="' + bw.toFixed(1) +
        '" height="' + bh.toFixed(1) + '" rx="5" fill="' + color + '" opacity="' + (0.55 + (v / max) * 0.45).toFixed(2) + '"/>');
      svg.push('<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (h - 7) + '" text-anchor="middle" font-size="10" fill="#8792a6">' + (labels[i] || '') + '</text>');
    });
    svg.push('</svg>');
    el.innerHTML = svg.join('');
  }
  $$('[data-bars]').forEach(barChart);

  /* ------------------------------- Donut -------------------------------- */
  function donut(el) {
    var data = JSON.parse(el.getAttribute('data-donut') || '[]');
    if (!data.length) return;
    var total = data.reduce(function (a, d) { return a + d.value; }, 0) || 1;
    var r = 54, c = 2 * Math.PI * r, off = 0;
    var svg = ['<svg viewBox="0 0 140 140" style="width:100%;max-width:190px;height:auto;margin:0 auto"><g transform="rotate(-90 70 70)">'];
    svg.push('<circle cx="70" cy="70" r="' + r + '" fill="none" stroke="#f1f2f6" stroke-width="17"/>');
    data.forEach(function (d) {
      var len = (d.value / total) * c;
      svg.push('<circle cx="70" cy="70" r="' + r + '" fill="none" stroke="' + d.color + '" stroke-width="17" stroke-linecap="round" ' +
        'stroke-dasharray="' + (len - 3).toFixed(2) + ' ' + (c - len + 3).toFixed(2) + '" stroke-dashoffset="' + (-off).toFixed(2) + '"/>');
      off += len;
    });
    svg.push('</g>');
    var center = el.getAttribute('data-donut-center') || total.toLocaleString();
    var sub = el.getAttribute('data-donut-sub') || 'Total';
    svg.push('<text x="70" y="68" text-anchor="middle" font-size="19" font-weight="800" fill="#151b2b">' + center + '</text>');
    svg.push('<text x="70" y="85" text-anchor="middle" font-size="9.5" fill="#8792a6">' + sub + '</text></svg>');
    el.innerHTML = svg.join('');
  }
  $$('[data-donut]').forEach(donut);

  /* ---------------------------- Progress ring --------------------------- */
  $$('[data-ring]').forEach(function (el) {
    var v = parseFloat(el.getAttribute('data-ring')) || 0;
    var color = el.getAttribute('data-ring-color') || '#ff2525';
    var r = 30, c = 2 * Math.PI * r;
    el.innerHTML = '<svg viewBox="0 0 76 76" style="width:100%;height:100%">' +
      '<circle cx="38" cy="38" r="' + r + '" fill="none" stroke="#f1f2f6" stroke-width="8"/>' +
      '<circle cx="38" cy="38" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="8" stroke-linecap="round" ' +
      'stroke-dasharray="' + (c * v / 100).toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 38 38)"/>' +
      '<text x="38" y="42" text-anchor="middle" font-size="15" font-weight="800" fill="#151b2b">' + v + '%</text></svg>';
  });

  /* ------------------------- Date range presets ------------------------- */
  $$('[data-daterange]').forEach(function (wrap) {
    $$('button', wrap).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('button', wrap).forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
        var out = document.querySelector(wrap.getAttribute('data-daterange-out') || '');
        if (out) out.textContent = b.getAttribute('data-range-label') || b.textContent.trim();
      });
    });
  });

  /* ------------------------- Inline row expanding ----------------------- */
  $$('[data-row-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var row = document.querySelector(b.getAttribute('data-row-toggle'));
      if (row) row.hidden = !row.hidden;
      b.style.transform = row && !row.hidden ? 'rotate(180deg)' : '';
    });
  });

  /* --------------------------- Repeater rows ---------------------------- */
  $$('[data-repeat-add]').forEach(function (b) {
    b.addEventListener('click', function () {
      var list = document.querySelector(b.getAttribute('data-repeat-add'));
      if (!list || !list.lastElementChild) return;
      var clone = list.lastElementChild.cloneNode(true);
      $$('input,select,textarea', clone).forEach(function (i) { if (i.type !== 'checkbox') i.value = ''; });
      list.appendChild(clone);
    });
  });
  document.addEventListener('click', function (e) {
    var r = e.target.closest('[data-repeat-remove]');
    if (!r) return;
    var row = r.closest('[data-repeat-row]');
    if (row && row.parentElement.children.length > 1) row.remove();
  });

  /* ------------------------- Sidebar auto-highlight --------------------- */
  var file = location.pathname.split('/').pop() || 'dashboard.html';
  $$('.sb-item[href], .sb-sub a[href]').forEach(function (a) {
    if (a.getAttribute('href') === file) {
      a.classList.add('is-active');
      var sub = a.closest('.sb-sub');
      if (sub) { sub.classList.add('is-open'); var t = sub.previousElementSibling; if (t) t.setAttribute('aria-expanded', 'true'); }
    }
  });

  /* ------------------------------- Print -------------------------------- */
  $$('[data-print]').forEach(function (b) { b.addEventListener('click', function () { window.print(); }); });
})();
