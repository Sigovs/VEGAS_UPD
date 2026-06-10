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

  /* ---------- Lotus model showcase (tab deck) ---------- */
  const lotusDeck = document.querySelector('[data-lotus-deck]');
  if (lotusDeck) {
    const MODELS = {
      emeya:  { img: 'assets/images/models/emeya.png',  name: 'Emeya',  stats: [['905', 'Horsepower'], ['2.8', '0–60 mph'], ['295', 'Range (mi)']] },
      eletre: { img: 'assets/images/models/eletre.png', name: 'Eletre', stats: [['905', 'Horsepower'], ['2.9', '0–60 mph'], ['373', 'Range (mi)']] },
      emira:  { img: 'assets/images/models/emira.png',  name: 'Emira',  stats: [['400', 'Horsepower'], ['4.2', '0–60 mph'], ['180', 'Top Speed (mph)']] },
      evija:  { img: 'assets/images/models/evija.png',  name: 'Evija',  stats: [['2011', 'Horsepower'], ['2.9', '0–60 mph'], ['217', 'Top Speed (mph)']] },
    };
    const tabs = Array.from(lotusDeck.querySelectorAll('.lotus-tab'));
    const stage = lotusDeck.querySelector('.lotus-deck__stage');
    let currentImg = lotusDeck.querySelector('[data-lotus-img]');
    const specsEl = lotusDeck.querySelector('[data-lotus-specs]');
    const cta = lotusDeck.querySelector('[data-lotus-cta]');

    /* count-up for the spec numbers */
    const parseSpec = (txt) => {
      const m = String(txt).trim().match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
      if (!m) return null;
      const decimals = m[2].includes('.') ? m[2].split('.')[1].length : 0;
      return { prefix: m[1], end: parseFloat(m[2]), decimals, suffix: m[3] };
    };
    const animateValue = (el, duration = 1100) => {
      const target = el.textContent.trim();
      const p = parseSpec(target);
      if (!p || reduceMotion) return;
      const start = performance.now();
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);
      el.textContent = p.prefix + (0).toFixed(p.decimals) + p.suffix;
      const tick = (now) => {
        const k = Math.min((now - start) / duration, 1);
        el.textContent = p.prefix + (p.end * easeOut(k)).toFixed(p.decimals) + p.suffix;
        if (k < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
    };
    const countAll = () => specsEl.querySelectorAll('.lotus-stat__value').forEach((el) => animateValue(el));

    const writeSpecs = (m) => {
      specsEl.innerHTML = m.stats.map(([v, l]) =>
        `<div class="lotus-stat"><span class="lotus-stat__value">${v}</span><span class="lotus-stat__label">${l}</span></div>`
      ).join('');
      countAll();
    };

    const render = (key) => {
      const m = MODELS[key];
      if (!m) return;
      cta.textContent = `Explore ${m.name}`;

      if (reduceMotion) {
        currentImg.onerror = () => { currentImg.onerror = null; currentImg.src = `assets/images/lotus-${key}.jpg`; };
        currentImg.src = m.img;
        currentImg.alt = `Lotus ${m.name}`;
        writeSpecs(m);
        return;
      }

      // gently fade the spec block out, rewrite, fade back in
      specsEl.style.transition = 'opacity 0.4s ease';
      specsEl.style.opacity = '0';
      setTimeout(() => { writeSpecs(m); specsEl.style.opacity = '1'; }, 260);

      // crossfade the car: preload first, then layer the new image over the old
      const next = new Image();
      next.className = 'lotus-deck__img';
      next.alt = `Lotus ${m.name}`;
      next.decoding = 'async';
      const place = () => {
        next.style.opacity = '0';
        next.style.transform = 'scale(1.04)';
        stage.appendChild(next);
        void next.offsetWidth;                 // force reflow so the 0→1 transition runs
        next.style.opacity = '1';
        next.style.transform = 'scale(1)';
        const old = currentImg;
        currentImg = next;
        if (old) {
          old.style.opacity = '0';
          old.style.transform = 'scale(0.99)';
          setTimeout(() => { if (old.parentNode) old.remove(); }, 900);
        }
      };
      next.onload = place;
      next.onerror = () => { next.onerror = null; next.src = `assets/images/lotus-${key}.jpg`; };
      next.src = m.img;
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        if (tab.classList.contains('is-active')) return;
        tabs.forEach((t) => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        render(tab.dataset.model);
      });
    });

    // initial count-up when the section first scrolls into view
    if (reduceMotion || !('IntersectionObserver' in window)) {
      countAll();
    } else {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { countAll(); obs.disconnect(); }
        });
      }, { threshold: 0.3 });
      io.observe(lotusDeck);
    }
  }

  /* ---------- Lotus background — subtle flow-noise shader ---------- */
  const shaderCanvas = document.querySelector('[data-lotus-shader]');
  if (shaderCanvas && !reduceMotion) {
    const gl = shaderCanvas.getContext('webgl', { antialias: false, alpha: true })
            || shaderCanvas.getContext('experimental-webgl');
    if (gl) {
      const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';
      const FRAG = [
        'precision highp float;',
        'uniform vec2 u_res;uniform float u_time;',
        'float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
        'float noise(vec2 p){vec2 i=floor(p),f=fract(p);float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));vec2 u=f*f*(3.-2.*f);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}',
        'float fbm(vec2 p){float v=0.,a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.0;a*=0.5;}return v;}',
        'void main(){',
        ' vec2 uv=gl_FragCoord.xy/u_res.xy;',
        ' vec2 q=uv;q.x*=u_res.x/u_res.y;',
        ' float t=u_time*0.025;',
        ' float n=fbm(q*2.1+vec2(t,t*0.6)+fbm(q*1.4-t*0.5)*0.6);',
        ' vec3 bg=vec3(0.043,0.059,0.078);',
        ' vec3 slate=vec3(0.090,0.140,0.190);',
        ' vec3 col=mix(bg,slate,smoothstep(0.40,0.74,n));',
        ' float cy=abs(uv.y-0.5);',
        ' float band=smoothstep(0.30,0.04,cy);',   // concentrated central band, clean top & bottom
        ' col=mix(bg,col,band);',
        ' gl_FragColor=vec4(col,1.0);',
        '}'
      ].join('\n');
      const compile = (type, src) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src); gl.compileShader(s);
        return s;
      };
      const prog = gl.createProgram();
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        gl.useProgram(prog);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, 'p');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
        const uRes = gl.getUniformLocation(prog, 'u_res');
        const uTime = gl.getUniformLocation(prog, 'u_time');
        let running = false, start = null, raf = 0;
        const resize = () => {
          const r = shaderCanvas.getBoundingClientRect();
          const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
          shaderCanvas.width = Math.max(1, Math.round(r.width * dpr));
          shaderCanvas.height = Math.max(1, Math.round(r.height * dpr));
          gl.viewport(0, 0, shaderCanvas.width, shaderCanvas.height);
        };
        const frame = (now) => {
          if (!running) return;
          if (start === null) start = now;
          gl.uniform2f(uRes, shaderCanvas.width, shaderCanvas.height);
          gl.uniform1f(uTime, (now - start) / 1000);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
          raf = requestAnimationFrame(frame);
        };
        resize();
        window.addEventListener('resize', resize, { passive: true });
        // run only while the section is on screen
        const io = new IntersectionObserver((entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting && !running) { running = true; raf = requestAnimationFrame(frame); }
            else if (!en.isIntersecting && running) { running = false; if (raf) cancelAnimationFrame(raf); }
          });
        }, { threshold: 0 });
        io.observe(shaderCanvas);
      }
    }
  }

  /* ---------- Parallax background layers ---------- */
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
  if (parallaxEls.length && !reduceMotion) {
    const SPEED = 0.26;
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return; // off-screen
        // distance of element centre from viewport centre → translate
        const offset = (rect.top + rect.height / 2 - vh / 2) * SPEED;
        el.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
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

  /* ---------- Get An Offer slide-in panel ---------- */
  const offer = document.querySelector('[data-offer]');
  if (offer) {
    const openers = document.querySelectorAll('[data-offer-open]');
    const closers = offer.querySelectorAll('[data-offer-close]');

    const openOffer = (e) => {
      if (e) e.preventDefault();
      offer.hidden = false;
      // next frame so the transition runs from the hidden state
      requestAnimationFrame(() => offer.classList.add('is-open'));
      document.body.style.overflow = 'hidden';
    };
    const closeOffer = () => {
      offer.classList.remove('is-open');
      document.body.style.removeProperty('overflow');
      setTimeout(() => { offer.hidden = true; }, 760);
    };

    openers.forEach((el) => el.addEventListener('click', openOffer));
    closers.forEach((el) => el.addEventListener('click', closeOffer));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && offer.classList.contains('is-open')) closeOffer();
    });
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

  /* ---------- Events photos: light 3D tilt on hover ---------- */
  const tiltCards = document.querySelectorAll('.ev-redesign .ev-feature__media');
  if (tiltCards.length && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    const MAX = 6; // max degrees of tilt
    tiltCards.forEach((card) => {
      card.style.willChange = 'transform';
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;   // -0.5 … 0.5
        const py = (e.clientY - r.top) / r.height - 0.5;
        const ry = px * MAX * 2;     // rotateY follows the cursor horizontally
        const rx = -py * MAX * 2;    // rotateX follows it vertically
        card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      };
      card.addEventListener('pointerenter', () => { card.style.transition = 'transform 0.12s linear'; });
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
      });
    });
  }

  /* ---------- Explore Inventory — background parallax ---------- */
  const parallaxSection = document.querySelector('.v2 .inv-entry');
  if (parallaxSection && !reduceMotion) {
    let ticking = false;
    const updateParallax = () => {
      const r = parallaxSection.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.bottom > 0 && r.top < vh) {
        const offset = (r.top + r.height / 2) - vh / 2;   // section centre vs viewport centre
        parallaxSection.style.setProperty('--py', (offset * -0.3).toFixed(1) + 'px');
      }
      ticking = false;
    };
    const onParallaxScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(updateParallax); }
    };
    window.addEventListener('scroll', onParallaxScroll, { passive: true });
    window.addEventListener('resize', onParallaxScroll, { passive: true });
    updateParallax();
  }

  /* ---------- Save (favourite) heart toggle — delegated for cloned cards ---------- */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.inv--redesign .inv-card__save');
    if (!btn) return;
    e.preventDefault();
    btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
  });

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
