// ============================================================
//  main.js — front-end behavior for the Vegas Auto Gallery homepage.
//  Vanilla JS, no dependencies. Runs with `defer`.
// ============================================================

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sticky header: condense after scroll ---------- */
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Hero set rotator (staggered reveal) ---------- */
  const rotator = document.querySelector('[data-hero-rotator]');
  if (rotator) {
    const sets = Array.from(rotator.querySelectorAll('.hero__set'));
    // Each time a set is shown (display:none -> flex) its children replay the
    // staircase animation automatically, so we only swap the .is-active class.
    if (sets.length > 1 && !reduceMotion) {
      let i = 0;
      setInterval(() => {
        sets[i].classList.remove('is-active');
        i = (i + 1) % sets.length;
        sets[i].classList.add('is-active');
      }, 6500);
    }
  }

  /* ---------- Mobile navigation toggle ---------- */
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  const closeNav = () => {
    if (!nav) return;
    nav.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.removeProperty('overflow');
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  /* ---------- Inventory mega menu ---------- */
  const megaToggle = document.querySelector('[data-mega-toggle]');
  const mega = document.querySelector('[data-mega]');

  if (megaToggle && mega) {
    megaToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const open = mega.classList.toggle('is-open');
      megaToggle.setAttribute('aria-expanded', String(open));
    });

    // Close on outside click (desktop)
    document.addEventListener('click', (e) => {
      if (!mega.classList.contains('is-open')) return;
      if (mega.contains(e.target) || megaToggle.contains(e.target)) return;
      mega.classList.remove('is-open');
      megaToggle.setAttribute('aria-expanded', 'false');
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        mega.classList.remove('is-open');
        megaToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Close menus when a link is tapped ---------- */
  nav?.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link || link.hasAttribute('data-mega-toggle')) return;
    closeNav();
  });

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // No motion: show everything immediately
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------- Reduced motion: drop the autoplay hero video ---------- */
  const heroVideo = document.querySelector('[data-hero-video]');
  if (reduceMotion && heroVideo) {
    heroVideo.removeAttribute('autoplay');
    heroVideo.pause?.();
  }

  /* ---------- Lotus model carousel ---------- */
  const lotus = document.querySelector('[data-lotus]');
  if (lotus) {
    const track = lotus.querySelector('[data-lotus-track]');
    const panels = Array.from(lotus.querySelectorAll('.lotus-panel'));
    const tabs = Array.from(lotus.querySelectorAll('[data-lotus-tab]'));
    const prevBtn = lotus.querySelector('[data-lotus-prev]');
    const nextBtn = lotus.querySelector('[data-lotus-next]');
    const counter = lotus.querySelector('[data-lotus-current]');
    const count = panels.length;
    let index = 0;
    let revealed = false; // becomes true once the section is on screen

    const pad = (n) => String(n).padStart(2, '0');

    /* --- count-up numbers --- */
    // Parse a spec string into prefix / number / decimals / suffix
    // e.g. "905" · "2.8s" · "<3.0s" · "373"
    const parseSpec = (txt) => {
      const m = String(txt).trim().match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
      if (!m) return null;
      const decimals = m[2].includes('.') ? m[2].split('.')[1].length : 0;
      return { prefix: m[1], end: parseFloat(m[2]), decimals, suffix: m[3] };
    };

    // Cache each value's target text; zero it out (unless reduced motion)
    lotus.querySelectorAll('.spec__value').forEach((el) => {
      el.dataset.countTarget = el.textContent.trim();
      if (!reduceMotion) {
        const p = parseSpec(el.dataset.countTarget);
        if (p) el.textContent = p.prefix + (0).toFixed(p.decimals) + p.suffix;
      }
    });

    const animateValue = (el, duration = 1100) => {
      const p = parseSpec(el.dataset.countTarget);
      if (!p) return;
      const start = performance.now();
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);
      const tick = (now) => {
        const k = Math.min((now - start) / duration, 1);
        el.textContent = p.prefix + (p.end * easeOut(k)).toFixed(p.decimals) + p.suffix;
        if (k < 1) requestAnimationFrame(tick);
        else el.textContent = el.dataset.countTarget; // snap to exact target
      };
      requestAnimationFrame(tick);
    };

    const countSlide = (i) => {
      if (reduceMotion) return;
      panels[i].querySelectorAll('.spec__value').forEach((el) => animateValue(el));
    };

    const go = (next) => {
      index = (next + count) % count; // wrap around
      track.style.transform = `translateX(-${index * 100}%)`;

      tabs.forEach((t, i) => {
        const active = i === index;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      panels.forEach((p, i) => p.classList.toggle('is-current', i === index));
      if (counter) counter.textContent = pad(index + 1);
      if (revealed) countSlide(index); // re-count when navigating
    };

    tabs.forEach((tab, i) => tab.addEventListener('click', () => go(i)));
    prevBtn?.addEventListener('click', () => go(index - 1));
    nextBtn?.addEventListener('click', () => go(index + 1));

    // Keyboard arrows when the carousel is in focus
    lotus.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
    });

    // Basic touch swipe
    let startX = null;
    lotus.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    lotus.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });

    go(0); // initial state — does not animate yet (revealed === false)

    // Start the count-up the first time the section enters the viewport
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealed = true;
    } else {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealed = true;
            countSlide(index);
            obs.disconnect();
          }
        });
      }, { threshold: 0.3 });
      io.observe(lotus);
    }
  }

  /* ---------- Auto-update footer year ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Featured inventory: auto-scroll marquee + mouse drag ---------- */
  const inv = document.querySelector('[data-inv]');
  if (inv) {
    const track = inv.querySelector('[data-inv-track]');
    if (track) {
      // Duplicate the card set once so the loop is seamless in both directions.
      const originals = Array.from(track.children);
      originals.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.querySelectorAll('a').forEach((a) => a.setAttribute('tabindex', '-1'));
        track.appendChild(clone);
      });

      // Take over from the CSS marquee — we drive the transform in JS so a
      // mouse drag can interrupt (and resume) the auto-scroll seamlessly.
      track.style.animation = 'none';

      let half = track.scrollWidth / 2; // width of one (original) card set
      let offset = 0;                   // current translateX in px (<= 0)
      const speed = 0.4;                // auto-scroll px per frame

      let hovering = false;
      let dragging = false;
      let moved = false;                // true once a drag passes the threshold
      let pointerStartX = 0;
      let offsetStart = 0;

      // Keep offset inside (-half, 0] so the loop is seamless either direction.
      const wrap = (x) => {
        if (half <= 0) return x;
        while (x <= -half) x += half;
        while (x > 0) x -= half;
        return x;
      };
      const apply = () => { track.style.transform = `translateX(${offset}px)`; };

      window.addEventListener('resize', () => { half = track.scrollWidth / 2; }, { passive: true });

      // Continuous auto-scroll, paused while hovering, dragging, or reduced motion.
      const tick = () => {
        if (!dragging && !hovering && !reduceMotion) {
          offset = wrap(offset - speed);
          apply();
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);

      inv.addEventListener('pointerenter', () => { hovering = true; });
      inv.addEventListener('pointerleave', () => { hovering = false; });

      // --- Mouse / touch drag to scroll ---
      inv.style.cursor = 'grab';
      inv.addEventListener('dragstart', (e) => e.preventDefault()); // no image ghost-drag

      inv.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        dragging = true;
        moved = false;
        pointerStartX = e.clientX;
        offsetStart = offset;
        inv.style.cursor = 'grabbing';
        inv.setPointerCapture?.(e.pointerId);
      });

      inv.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const dx = e.clientX - pointerStartX;
        if (Math.abs(dx) > 4) moved = true;
        offset = wrap(offsetStart + dx);
        apply();
      });

      const endDrag = (e) => {
        if (!dragging) return;
        dragging = false;
        inv.style.cursor = 'grab';
        inv.releasePointerCapture?.(e.pointerId);
      };
      inv.addEventListener('pointerup', endDrag);
      inv.addEventListener('pointercancel', endDrag);

      // Suppress the click that follows a real drag so cards don't navigate.
      inv.addEventListener('click', (e) => {
        if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
      }, true);
    }
  }

  /* ---------- We Buy Cars lead form (stub) ---------- */
  const buyForm = document.querySelector('[data-buy-form]');
  if (buyForm) {
    buyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(buyForm));
      // Placeholder: POST this to the acquisition endpoint when ready.
      console.log('We Buy Cars lead:', data);
      buyForm.innerHTML = '<p class="form-success">Thank you — our acquisition team will be in touch shortly.</p>';
    });
  }

  /* ---------- Inventory search (stub) ---------- */
  const search = document.querySelector('[data-search]');
  if (search) {
    search.addEventListener('submit', (e) => {
      e.preventDefault();
      const params = new URLSearchParams();
      for (const [key, value] of new FormData(search)) {
        if (value) params.set(key, value);
      }
      // Placeholder: wire to the real inventory endpoint when ready.
      console.log('Inventory search:', params.toString());
      // window.location.href = `/inventory?${params.toString()}`;
    });
  }
})();
