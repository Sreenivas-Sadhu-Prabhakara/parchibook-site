/* ParchiBook explainer — tiny interactions, no dependencies.
   1. Sticky-nav shadow on scroll
   2. Smooth scroll for same-page anchors (respects reduced motion)
   3. Signature widget: parse the WhatsApp order -> print an itemized bill,
      total it up with a small count-up, and post to the khata. */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. sticky nav ---------- */
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- 2. smooth scroll ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    });
  });

  /* ---------- 3. chat -> bill demo ---------- */
  // The pasted order and how ParchiBook prices each line from the saved catalog.
  var BILL = [
    { name: 'Aata (wheat flour)', note: '2 kg × Rs 48', amt: 96 },
    { name: 'Doodh (Amul, 1 L)',  note: '1 × Rs 66',    amt: 66 },
    { name: 'Maggi 70g',          note: '4 pkt × Rs 14', amt: 56 },
    { name: 'Chai patti',         note: '250 g × Rs 62', amt: 155 },
    { name: 'Sabun (Lifebuoy)',   note: '2 × Rs 33',     amt: 66 }
  ];
  var PRIOR_KHATA = 439; // Sunita's balance before tonight's order

  var btn   = document.getElementById('demoBtn');
  var rows  = document.getElementById('receiptRows');
  var totEl = document.getElementById('receiptTotal');
  var balEl = document.getElementById('receiptBal');
  var hint  = document.getElementById('demoHint');
  var done  = false;

  function rupee(n) {
    return 'Rs ' + Math.round(n).toLocaleString('en-IN');
  }

  function countUp(el, to, prefixFrom) {
    if (reduceMotion) { el.textContent = rupee(to); return; }
    var from = prefixFrom || 0, start = null, dur = 650;
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = rupee(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function runDemo() {
    if (!rows) return;
    rows.innerHTML = '';
    var total = 0;

    BILL.forEach(function (item, i) {
      total += item.amt;
      var row = document.createElement('div');
      row.className = 'rrow';
      row.innerHTML =
        '<span class="rrow__name">' + item.name +
        ' <small>' + item.note + '</small></span>' +
        '<span class="rrow__amt">' + rupee(item.amt) + '</span>';
      rows.appendChild(row);
      var delay = reduceMotion ? 0 : 90 * i;
      window.setTimeout(function () { row.classList.add('show'); }, delay);
    });

    var afterRows = reduceMotion ? 0 : 90 * BILL.length + 120;
    window.setTimeout(function () {
      countUp(totEl, total);
      countUp(balEl, PRIOR_KHATA + total, PRIOR_KHATA);
    }, afterRows);

    if (btn) {
      btn.classList.add('is-done');
      btn.querySelector('.demo__btn-txt').textContent = 'Bill sent · khata updated';
    }
    if (hint) hint.textContent = 'Delivery list built · tap again to replay';
    done = true;
  }

  function reset() {
    if (rows) rows.innerHTML = '';
    if (totEl) totEl.textContent = 'Rs 0';
    if (balEl) balEl.textContent = 'Rs 0';
    if (btn) {
      btn.classList.remove('is-done');
      btn.querySelector('.demo__btn-txt').textContent = 'Turn this chat into a bill';
    }
    if (hint) hint.textContent = 'Tap to parse & price the order';
    done = false;
  }

  if (btn) {
    btn.addEventListener('click', function () {
      if (done) { reset(); window.setTimeout(runDemo, 120); }
      else { runDemo(); }
    });
  }
})();
