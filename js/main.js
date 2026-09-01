/* ==========================================================================
   HaatBazar — Front-end interaction layer (vanilla JS, no dependencies)
   Purely for design demonstration: dropdowns, tabs, modals, drawers,
   carousels, galleries, quantity steppers, filters, toasts, countdowns…
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ----------------------------- Toasts --------------------------------- */
  function toast(msg, icon) {
    var stack = $('.toast-stack');
    if (!stack) { stack = document.createElement('div'); stack.className = 'toast-stack'; document.body.appendChild(stack); }
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
      (icon === 'info' ? '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/>' : '<path d="M20 6 9 17l-5-5"/>') +
      '</svg><span>' + msg + '</span>';
    stack.appendChild(el);
    setTimeout(function () { el.style.opacity = '0'; el.style.transform = 'translateY(6px)'; el.style.transition = '.25s'; }, 2400);
    setTimeout(function () { el.remove(); }, 2750);
  }
  window.hbToast = toast;

  /* --------------------------- Dropdown menus --------------------------- */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-dropdown-toggle]');
    $$('[data-dropdown-menu].is-open').forEach(function (m) {
      if (!trigger || m !== trigger.parentElement.querySelector('[data-dropdown-menu]')) m.classList.remove('is-open');
    });
    if (trigger) {
      e.preventDefault();
      var menu = trigger.parentElement.querySelector('[data-dropdown-menu]');
      if (menu) menu.classList.toggle('is-open');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      $$('[data-dropdown-menu].is-open').forEach(function (m) { m.classList.remove('is-open'); });
      $$('.modal.is-open').forEach(function (m) { m.classList.remove('is-open'); document.body.style.overflow = ''; });
      $$('.drawer.is-open').forEach(function (m) { m.classList.remove('is-open'); document.body.style.overflow = ''; });
    }
  });

  /* ------------------------------- Modals ------------------------------- */
  function openModal(id) {
    var m = document.getElementById(id);
    if (!m) return;
    m.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(m) { m.classList.remove('is-open'); document.body.style.overflow = ''; }
  window.hbOpenModal = openModal;

  document.addEventListener('click', function (e) {
    var open = e.target.closest('[data-modal-open]');
    if (open) { e.preventDefault(); openModal(open.getAttribute('data-modal-open')); return; }
    var close = e.target.closest('[data-modal-close]');
    if (close) { var m = close.closest('.modal'); if (m) closeModal(m); return; }
    if (e.target.classList && e.target.classList.contains('modal-backdrop')) closeModal(e.target.closest('.modal'));
  });

  /* ------------------------------ Drawers ------------------------------- */
  document.addEventListener('click', function (e) {
    var open = e.target.closest('[data-drawer-open]');
    if (open) {
      e.preventDefault();
      var d = document.getElementById(open.getAttribute('data-drawer-open'));
      if (d) { d.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
      return;
    }
    var close = e.target.closest('[data-drawer-close]');
    if (close) { var dd = close.closest('.drawer'); if (dd) { dd.classList.remove('is-open'); document.body.style.overflow = ''; } return; }
    if (e.target.classList && e.target.classList.contains('drawer-backdrop')) {
      e.target.closest('.drawer').classList.remove('is-open'); document.body.style.overflow = '';
    }
  });

  /* -------------------------------- Tabs -------------------------------- */
  $$('[data-tabs]').forEach(function (wrap) {
    var tabs = $$('[data-tab]', wrap);
    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        var target = t.getAttribute('data-tab');
        tabs.forEach(function (x) { x.classList.remove('is-active'); });
        t.classList.add('is-active');
        var scope = wrap.getAttribute('data-tabs-scope');
        var container = scope ? document.querySelector(scope) : wrap.parentElement;
        $$('[data-tab-panel]', container).forEach(function (p) {
          p.hidden = p.getAttribute('data-tab-panel') !== target;
        });
      });
    });
  });

  /* ------------------------------ Accordion ----------------------------- */
  $$('[data-acc]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = btn.nextElementSibling;
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      if (btn.hasAttribute('data-acc-single')) {
        var group = btn.closest('[data-acc-group]');
        if (group) $$('[data-acc]', group).forEach(function (b) {
          if (b !== btn) { b.setAttribute('aria-expanded', 'false'); if (b.nextElementSibling) b.nextElementSibling.style.display = 'none'; }
        });
      }
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      if (panel) panel.style.display = isOpen ? 'none' : 'block';
    });
  });

  /* ------------------------- Horizontal carousels ----------------------- */
  $$('[data-rail]').forEach(function (rail) {
    var wrap = rail.closest('[data-rail-wrap]') || rail.parentElement;
    var prev = $('[data-rail-prev]', wrap), next = $('[data-rail-next]', wrap);
    var step = function () { return Math.max(rail.clientWidth * 0.8, 240); };
    if (prev) prev.addEventListener('click', function () { rail.scrollBy({ left: -step(), behavior: 'smooth' }); });
    if (next) next.addEventListener('click', function () { rail.scrollBy({ left: step(), behavior: 'smooth' }); });
  });

  /* ----------------------------- Hero slider ---------------------------- */
  $$('[data-slider]').forEach(function (slider) {
    var slides = $$('[data-slide]', slider);
    var dots = $$('[data-slide-dot]', slider);
    var i = 0, timer;
    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, x) {
        s.style.opacity = x === i ? '1' : '0';
        s.style.pointerEvents = x === i ? 'auto' : 'none';
        s.style.transform = x === i ? 'scale(1)' : 'scale(1.02)';
      });
      dots.forEach(function (d, x) { d.classList.toggle('is-active', x === i); d.style.width = x === i ? '22px' : '8px'; d.style.opacity = x === i ? '1' : '.45'; });
    }
    function play() { timer = setInterval(function () { go(i + 1); }, 5200); }
    function stop() { clearInterval(timer); }
    slides.forEach(function (s) { s.style.transition = 'opacity .5s ease, transform .6s ease'; });
    dots.forEach(function (d, x) { d.addEventListener('click', function () { stop(); go(x); play(); }); });
    var p = $('[data-slide-prev]', slider), n = $('[data-slide-next]', slider);
    if (p) p.addEventListener('click', function () { stop(); go(i - 1); play(); });
    if (n) n.addEventListener('click', function () { stop(); go(i + 1); play(); });
    slider.addEventListener('mouseenter', stop); slider.addEventListener('mouseleave', play);
    if (slides.length) { go(0); play(); }
  });

  /* --------------------------- Product gallery -------------------------- */
  $$('[data-gallery]').forEach(function (g) {
    var stage = $('[data-gallery-stage]', g);
    var thumbs = $$('[data-gallery-thumb]', g);
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        thumbs.forEach(function (x) { x.classList.remove('ring-2', 'ring-brand-500'); x.style.borderColor = ''; });
        t.classList.add('ring-2', 'ring-brand-500');
        t.style.borderColor = '#ff2525';
        if (stage) {
          var clone = t.querySelector('.ph');
          if (clone) { stage.className = stage.className.replace(/ph-[a-j]/g, '') + ' ' + (clone.className.match(/ph-[a-j]/) || ['ph-c'])[0]; }
          stage.setAttribute('data-active', t.getAttribute('data-gallery-thumb'));
        }
      });
    });
    if (thumbs[0]) thumbs[0].click();
  });

  /* --------------------------- Quantity stepper ------------------------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-qty]');
    if (!b) return;
    e.preventDefault();
    var box = b.closest('[data-qty-box]');
    var input = box ? $('input', box) : null;
    if (!input) return;
    var v = parseInt(input.value || '1', 10);
    var min = parseInt(input.getAttribute('min') || '1', 10);
    var max = parseInt(input.getAttribute('max') || '999', 10);
    v = b.getAttribute('data-qty') === 'up' ? Math.min(max, v + 1) : Math.max(min, v - 1);
    input.value = v;
  });

  /* ------------------------------ Wishlist ------------------------------ */
  document.addEventListener('click', function (e) {
    var w = e.target.closest('[data-wish]');
    if (!w) return;
    e.preventDefault(); e.stopPropagation();
    w.classList.toggle('is-on');
    toast(w.classList.contains('is-on') ? 'Added to your wishlist' : 'Removed from wishlist');
  });

  /* --------------------------- Add to cart / lead ----------------------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-cart-add]');
    if (a) {
      e.preventDefault();
      var badge = $('[data-cart-count]');
      if (badge) badge.textContent = String(parseInt(badge.textContent || '0', 10) + 1);
      toast('Item added to cart');
    }
    var s = e.target.closest('[data-toast]');
    if (s) { toast(s.getAttribute('data-toast')); }
  });

  /* ---------------------------- Chips / filters ------------------------- */
  $$('[data-chip-group]').forEach(function (group) {
    $$('.chip', group).forEach(function (chip) {
      chip.addEventListener('click', function () {
        if (group.hasAttribute('data-multi')) { chip.classList.toggle('is-active'); return; }
        $$('.chip', group).forEach(function (c) { c.classList.remove('is-active'); });
        chip.classList.add('is-active');
      });
    });
  });

  /* --------------------------- Grid / list toggle ----------------------- */
  $$('[data-view-toggle]').forEach(function (wrap) {
    var target = document.querySelector(wrap.getAttribute('data-view-target'));
    $$('button', wrap).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('button', wrap).forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
        if (!target) return;
        if (b.getAttribute('data-view') === 'list') { target.setAttribute('data-mode', 'list'); }
        else { target.setAttribute('data-mode', 'grid'); }
      });
    });
  });

  /* ----------------------------- Price range ---------------------------- */
  $$('[data-range]').forEach(function (box) {
    var lo = $('[data-range-min]', box), hi = $('[data-range-max]', box);
    var loOut = $('[data-range-min-out]', box), hiOut = $('[data-range-max-out]', box);
    var fill = $('[data-range-fill]', box);
    function draw() {
      if (!lo || !hi) return;
      var a = Math.min(+lo.value, +hi.value), b = Math.max(+lo.value, +hi.value);
      var max = +lo.max || 100;
      if (fill) { fill.style.left = (a / max * 100) + '%'; fill.style.right = (100 - b / max * 100) + '%'; }
      if (loOut) loOut.value = a;
      if (hiOut) hiOut.value = b;
    }
    [lo, hi].forEach(function (el) { if (el) el.addEventListener('input', draw); });
    draw();
  });

  /* ------------------------------ Countdown ----------------------------- */
  $$('[data-countdown]').forEach(function (box) {
    var end = Date.now() + (parseInt(box.getAttribute('data-countdown'), 10) || 3600) * 1000;
    var out = $$('[data-cd]', box);
    function tick() {
      var s = Math.max(0, Math.floor((end - Date.now()) / 1000));
      var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
      out.forEach(function (el) {
        var k = el.getAttribute('data-cd');
        el.textContent = String(k === 'h' ? h : k === 'm' ? m : sec).padStart(2, '0');
      });
    }
    tick(); setInterval(tick, 1000);
  });

  /* --------------------------- Password reveal -------------------------- */
  $$('[data-pass-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var input = document.getElementById(b.getAttribute('data-pass-toggle'));
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
      b.setAttribute('aria-pressed', input.type === 'text');
      b.style.color = input.type === 'text' ? '#ff2525' : '';
    });
  });

  /* ------------------------------ OTP inputs ---------------------------- */
  $$('[data-otp]').forEach(function (box) {
    var cells = $$('input', box);
    cells.forEach(function (c, i) {
      c.addEventListener('input', function () {
        c.value = c.value.replace(/\D/g, '').slice(0, 1);
        if (c.value && cells[i + 1]) cells[i + 1].focus();
      });
      c.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !c.value && cells[i - 1]) cells[i - 1].focus();
      });
    });
  });

  /* --------------------------- Star rating input ------------------------ */
  $$('[data-rate]').forEach(function (box) {
    var stars = $$('[data-rate-star]', box);
    var out = $('[data-rate-out]', box);
    function paint(n) { stars.forEach(function (s, i) { s.style.color = i < n ? '#ffb020' : '#d8dce4'; }); }
    stars.forEach(function (s, i) {
      s.addEventListener('mouseenter', function () { paint(i + 1); });
      s.addEventListener('click', function () { box.setAttribute('data-value', i + 1); paint(i + 1); if (out) out.textContent = (i + 1) + '.0'; });
    });
    box.addEventListener('mouseleave', function () { paint(+box.getAttribute('data-value') || 0); });
    paint(+box.getAttribute('data-value') || 0);
  });

  /* ------------------------- Sticky header shadow ----------------------- */
  var stickyHead = $('[data-sticky-head]');
  if (stickyHead) {
    var onScroll = function () {
      if (window.scrollY > 8) stickyHead.classList.add('shadow-soft', 'is-stuck');
      else stickyHead.classList.remove('shadow-soft', 'is-stuck');
    };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* --------------------------- Search suggestions ----------------------- */
  $$('[data-search-box]').forEach(function (box) {
    var input = $('input', box);
    var panel = $('[data-search-panel]', box);
    if (!input || !panel) return;
    input.addEventListener('focus', function () { panel.classList.add('is-open'); });
    document.addEventListener('click', function (e) { if (!box.contains(e.target)) panel.classList.remove('is-open'); });
  });

  /* ------------------------------ Copy text ----------------------------- */
  document.addEventListener('click', function (e) {
    var c = e.target.closest('[data-copy]');
    if (!c) return;
    var text = c.getAttribute('data-copy');
    if (navigator.clipboard) navigator.clipboard.writeText(text);
    toast('Copied: ' + text);
  });

  /* ----------------------------- Back to top ---------------------------- */
  var top = $('[data-to-top]');
  if (top) {
    window.addEventListener('scroll', function () {
      top.style.opacity = window.scrollY > 500 ? '1' : '0';
      top.style.pointerEvents = window.scrollY > 500 ? 'auto' : 'none';
    }, { passive: true });
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* --------------------------- Reveal on scroll ------------------------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.style.opacity = '1'; en.target.style.transform = 'none'; io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('[data-reveal]').forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .5s ease ' + (i % 6) * 40 + 'ms, transform .5s cubic-bezier(.21,1,.21,1) ' + (i % 6) * 40 + 'ms';
      io.observe(el);
    });
  }

  /* --------------------------- Variant selector ------------------------- */
  $$('[data-variant-group]').forEach(function (g) {
    $$('[data-variant]', g).forEach(function (b) {
      b.addEventListener('click', function () {
        $$('[data-variant]', g).forEach(function (x) {
          x.classList.remove('border-brand-500', 'text-brand-600', 'bg-brand-50');
          x.style.borderColor = ''; x.style.color = ''; x.style.background = '';
        });
        b.style.borderColor = '#ff2525'; b.style.color = '#cf0505'; b.style.background = '#fff1f1';
        var out = $('[data-variant-out]', g.closest('[data-variant-scope]') || document);
        if (out) out.textContent = b.getAttribute('data-variant');
      });
    });
    var first = $('[data-variant]', g); if (first) first.click();
  });

  /* --------------------------- Select all (tables) ---------------------- */
  $$('[data-check-all]').forEach(function (master) {
    var scope = master.closest('table') || document;
    master.addEventListener('change', function () {
      $$('[data-check-row]', scope).forEach(function (c) { c.checked = master.checked; });
      var bar = document.querySelector(master.getAttribute('data-bulkbar') || '.bulkbar');
      if (bar) bar.classList.toggle('is-on', master.checked);
    });
  });

  /* ----------------------------- Show more ------------------------------ */
  $$('[data-show-more]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = document.querySelector(b.getAttribute('data-show-more'));
      if (!t) return;
      t.hidden = !t.hidden;
      b.querySelector('[data-show-more-label]') && (b.querySelector('[data-show-more-label]').textContent = t.hidden ? 'Show more' : 'Show less');
    });
  });

  /* ---- Dashboard tabs with no panels: filter the list they sit above ---- */
  $$('[data-tabs]').forEach(function (wrap) {
    var scope = wrap.getAttribute('data-tabs-scope');
    var host = scope ? document.querySelector(scope) : wrap.parentElement;
    if (!host || $('[data-tab-panel]', host)) return;      /* real panels win */

    /* 1st choice: a table body. 2nd choice: any repeated card/row list. */
    var body = null, rows = [];
    var table = null, n = wrap;
    while (n && !table) { table = $('table', n.parentElement); n = n.parentElement; }
    if (table) { body = $('tbody', table); rows = body ? $$(':scope > tr', body) : []; }

    if (!rows.length) {
      var el = wrap;
      while (el && !rows.length) {
        el = el.nextElementSibling || (el.parentElement && el.parentElement.nextElementSibling);
        if (!el) break;
        var pool = $$(':scope > *', el).filter(function (c) { return /^(DIV|ARTICLE|LI|TR)$/.test(c.tagName); });
        if (pool.length >= 3) { body = el; rows = pool; }
        else {
          var inner = $('.divide-y, .space-y-3, [data-list]', el);
          if (inner) {
            var pool2 = $$(':scope > *', inner);
            if (pool2.length >= 3) { body = inner; rows = pool2; }
          }
        }
      }
    }
    function labelOf(t) {
      return (t.textContent || '').replace(/\(.*?\)/g, '').replace(/\d+/g, '').trim().toLowerCase();
    }

    /* 3rd choice (settings-style pages): jump to the card with that heading */
    if (!rows.length || !body) {
      var cards = $$('.card').filter(function (c) { return $('.card-head h3', c); });
      if (cards.length < 2) return;
      var tabsList = $$('[data-tab]', wrap), matched = 0;

      tabsList.forEach(function (t) {
        var key = labelOf(t);
        var card = cards.filter(function (c) {
          var htxt = $('.card-head h3', c).textContent.toLowerCase();
          return htxt.indexOf(key) > -1 || key.indexOf(htxt) > -1;
        })[0];
        if (card) matched++;
        t.addEventListener('click', function () {
          if (!card) return;
          var y = card.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top: y, behavior: 'smooth' });
          card.style.transition = 'box-shadow .35s ease';
          card.style.boxShadow = '0 0 0 2px #ff2525';
          setTimeout(function () { card.style.boxShadow = ''; }, 900);
        });
      });
      return;
    }
    var isTable = body.tagName === 'TBODY';
    var empty = null;

    $$('[data-tab]', wrap).forEach(function (t) {
      t.addEventListener('click', function () {
        var key = labelOf(t), shown = 0;
        rows.forEach(function (r) {
          var hit = !key || key.indexOf('all') === 0 || r.textContent.toLowerCase().indexOf(key) > -1;
          r.hidden = !hit; if (hit) shown++;
        });
        /* graceful empty state */
        if (!empty) {
          empty = document.createElement(isTable ? 'tr' : 'div');
          empty.innerHTML = isTable
            ? '<td colspan="99" class="!py-10 text-center text-[12.5px] text-ink-400">No records match this filter.</td>'
            : '<p class="py-10 text-center text-[12.5px] text-ink-400">No records match this filter.</p>';
          body.appendChild(empty);
        }
        empty.hidden = shown > 0;
        var counter = $('[data-row-count]');
        if (counter) counter.textContent = shown;
      });
    });
  });

  /* ------------------------ Mobile bottom nav active -------------------- */
  var path = location.pathname.split('/').pop();
  $$('[data-bottom-nav] a').forEach(function (a) {
    if (a.getAttribute('href') === path) { a.style.color = '#ff2525'; }
  });
})();
