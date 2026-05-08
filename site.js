// ═══════════════════════════════════════════
// BluEdge · interactions
// ═══════════════════════════════════════════

(() => {
  // Nav show on scroll
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');
  if (hero && nav) {
    const obs = new IntersectionObserver(([e]) => {
      nav.classList.toggle('visible', !e.isIntersecting);
    }, { threshold: 0, rootMargin: '-80px 0px 0px 0px' });
    obs.observe(hero);
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll('[data-reveal]');
  const ro = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const el = e.target;
        // stagger siblings inside card grids
        const parent = el.parentElement;
        if (parent && parent.children.length > 1 &&
            (parent.classList.contains('audience-cards') ||
             parent.classList.contains('use-cases') ||
             parent.classList.contains('stats-grid'))) {
          const idx = Array.from(parent.children).indexOf(el);
          el.style.transitionDelay = `${Math.min(idx, 5) * 80}ms`;
        }
        el.classList.add('in');
        ro.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => ro.observe(el));

  // Animated counters
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const co = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const decimals = (el.dataset.count.split('.')[1] || '').length;
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = (target * eased).toFixed(decimals);
        el.textContent = prefix + val + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = prefix + target.toFixed(decimals) + suffix;
      };
      requestAnimationFrame(tick);
      co.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => co.observe(el));

  // Hero network SVG — subtle nodes and lines
  const net = document.querySelector('.hero-net');
  if (net) {
    const W = 1600, H = 900;
    const rand = (a, b) => a + Math.random() * (b - a);
    const nodes = [];
    const NCOUNT = 28;
    for (let i = 0; i < NCOUNT; i++) {
      nodes.push({
        x: rand(60, W - 60),
        y: rand(60, H - 60),
        r: rand(1.2, 2.6),
        phase: Math.random() * Math.PI * 2,
      });
    }
    let svg = '';
    // lines between near neighbors
    const MAX_D = 260;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d = Math.hypot(dx, dy);
        if (d < MAX_D) {
          const op = (1 - d / MAX_D) * 0.35;
          svg += `<line x1="${nodes[i].x}" y1="${nodes[i].y}" x2="${nodes[j].x}" y2="${nodes[j].y}" stroke="#4DA3E0" stroke-width="0.6" stroke-opacity="${op.toFixed(3)}" />`;
        }
      }
    }
    // nodes
    nodes.forEach((n, i) => {
      const fill = i % 7 === 0 ? '#00B4A0' : '#8FC2EA';
      svg += `<circle cx="${n.x}" cy="${n.y}" r="${n.r}" fill="${fill}" fill-opacity="0.85"><animate attributeName="fill-opacity" values="0.4;0.95;0.4" dur="${(3 + (i % 5)).toFixed(1)}s" repeatCount="indefinite" begin="${(i * 0.15).toFixed(2)}s"/></circle>`;
    });
    net.innerHTML = svg;
  }

  // Testimonial carousel
  const slides = document.querySelectorAll('.quote-slide');
  const navs = document.querySelectorAll('.quote-nav .qn');
  let qi = 0;
  let qTimer = null;
  const goTo = (i) => {
    qi = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('active', k === qi));
    navs.forEach((n, k) => n.classList.toggle('active', k === qi));
  };
  navs.forEach(b => b.addEventListener('click', () => {
    goTo(parseInt(b.dataset.i, 10));
    restart();
  }));
  const restart = () => {
    if (qTimer) clearInterval(qTimer);
    qTimer = setInterval(() => goTo(qi + 1), 14000);
  };
  if (slides.length) restart();

  // Scroll indicator fades out on scroll
  const si = document.querySelector('.scroll-indicator');
  if (si) {
    window.addEventListener('scroll', () => {
      const p = Math.min(1, window.scrollY / 300);
      si.style.opacity = 1 - p;
    }, { passive: true });
  }

  // Nav link active marker based on scroll
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = ['who', 'results', 'operator'].map(id => document.getElementById(id)).filter(Boolean);
  const nobs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + e.target.id
            ? 'var(--navy)' : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => nobs.observe(s));
})();
