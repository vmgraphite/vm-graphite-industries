/**
 * Master Animation & Micro-Interactions Engine for VM Graphite Industries
 * High-performance 60fps GPU-accelerated effects:
 * 1. Scroll-Driven Intersection Reveal Engine
 * 2. Dynamic Mouse Spotlight Glow & Border Illumination
 * 3. 3D Perspective Card Tilt with Specular Glare
 * 4. Animated Metric & Stat Counters
 * 5. Interactive Graphite Ember Particle Canvas
 * 6. Magnetic Button Pull Micro-Interactions
 */

export function initAnimations() {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Reveal all elements immediately
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('is-revealed');
    });
    return;
  }

  initScrollReveals();
  initMouseSpotlight();
  init3DCardTilt();
  initStatCounters();
  initEmberCanvas();
  initMagneticButtons();
}

/**
 * 1. Scroll-Driven Intersection Reveal Engine
 */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const delay = target.getAttribute('data-reveal-delay') || '0';
          setTimeout(() => {
            target.classList.add('is-revealed');
          }, parseInt(delay, 10));

          // If element has counter, trigger it
          if (target.hasAttribute('data-counter')) {
            animateCounter(target);
          }

          // Unobserve once revealed for max performance
          observer.unobserve(target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * 2. Dynamic Mouse Spotlight Glow
 */
function initMouseSpotlight() {
  // Track cursor position globally for cards with .glow-card or .spotlight-card
  const cards = document.querySelectorAll<HTMLElement>('.glow-card, .spotlight-card, [data-spotlight]');

  if (!cards.length) return;

  let ticking = false;

  const handlePointerMove = (e: PointerEvent) => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        });
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('pointermove', handlePointerMove, { passive: true });
}

/**
 * 3. 3D Perspective Card Tilt with Smooth Spring-Back
 */
function init3DCardTilt() {
  const tiltCards = document.querySelectorAll<HTMLElement>('[data-tilt]');
  if (!tiltCards.length) return;

  tiltCards.forEach((card) => {
    let bounds: DOMRect;

    const onMouseEnter = () => {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.1s ease-out, box-shadow 0.3s ease';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = mouseX / bounds.width - 0.5;
      const yPct = mouseY / bounds.height - 0.5;

      const maxTilt = parseFloat(card.getAttribute('data-tilt-max') || '7');
      const rotateX = -yPct * maxTilt;
      const rotateY = xPct * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const onMouseLeave = () => {
      card.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    card.addEventListener('mouseenter', onMouseEnter, { passive: true });
    card.addEventListener('mousemove', onMouseMove, { passive: true });
    card.addEventListener('mouseleave', onMouseLeave, { passive: true });
  });
}

/**
 * 4. Animated Metric & Stat Counters
 */
function initStatCounters() {
  const counterElements = document.querySelectorAll<HTMLElement>('[data-counter]:not([data-reveal])');
  if (!counterElements.length) return;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target as HTMLElement);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  counterElements.forEach((el) => counterObserver.observe(el));
}

function animateCounter(el: HTMLElement) {
  const rawTarget = el.getAttribute('data-counter') || el.innerText;
  const match = rawTarget.match(/([0-9.,]+)/);
  if (!match) return;

  const numStr = match[1].replace(/,/g, '');
  const targetVal = parseFloat(numStr);
  const prefix = rawTarget.slice(0, match.index);
  const suffix = rawTarget.slice((match.index || 0) + match[1].length);
  const isDecimal = numStr.includes('.');
  const decimals = isDecimal ? numStr.split('.')[1].length : 0;

  const duration = parseInt(el.getAttribute('data-counter-duration') || '1600', 10);
  const startTime = performance.now();

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = targetVal * easeProgress;

    const formattedNum = isDecimal ? currentVal.toFixed(decimals) : Math.floor(currentVal).toLocaleString();
    el.innerText = `${prefix}${formattedNum}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.innerText = rawTarget;
    }
  }

  requestAnimationFrame(update);
}

/**
 * 5. Interactive Graphite Ember Particle Canvas
 */
function initEmberCanvas() {
  const canvas = document.querySelector<HTMLCanvasElement>('#hero-ember-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  const particles: Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    fadeSpeed: number;
    hue: number;
  }> = [];

  const particleCount = Math.min(Math.floor(width / 22), 60);

  function createParticle() {
    return {
      x: Math.random() * width,
      y: height + Math.random() * 20,
      size: Math.random() * 2.2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.7 + 0.3),
      opacity: Math.random() * 0.7 + 0.2,
      fadeSpeed: Math.random() * 0.004 + 0.002,
      hue: Math.random() > 0.3 ? 18 : 36, // Coral / Ember warm tones
    };
  }

  for (let i = 0; i < particleCount; i++) {
    const p = createParticle();
    p.y = Math.random() * height; // Spread initially
    particles.push(p);
  }

  let mouseX = width / 2;
  let mouseY = height / 2;
  let mouseActive = false;

  window.addEventListener(
    'mousemove',
    (e) => {
      const rect = canvas.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        mouseActive = true;
      } else {
        mouseActive = false;
      }
    },
    { passive: true }
  );

  let animationFrameId: number;

  function render() {
    ctx?.clearRect(0, 0, width, height);

    particles.forEach((p, idx) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity -= p.fadeSpeed;

      // Mouse gentle repulsion
      if (mouseActive) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }
      }

      if (p.opacity <= 0 || p.y < -10 || p.x < -10 || p.x > width + 10) {
        particles[idx] = createParticle();
      }

      if (ctx) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 60%, ${Math.max(0, p.opacity)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 65%, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    animationFrameId = requestAnimationFrame(render);
  }

  render();

  // Resize handler
  let resizeTimeout: any;
  window.addEventListener(
    'resize',
    () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }, 200);
    },
    { passive: true }
  );
}

/**
 * 6. Magnetic Button Pull Micro-Interactions
 */
function initMagneticButtons() {
  const buttons = document.querySelectorAll<HTMLElement>('[data-magnetic], .forge-btn-primary, .forge-btn-secondary');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    let bounds: DOMRect;

    const onMouseEnter = () => {
      bounds = btn.getBoundingClientRect();
      btn.style.transition = 'transform 0.15s ease-out';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!bounds) bounds = btn.getBoundingClientRect();
      const x = e.clientX - bounds.left - bounds.width / 2;
      const y = e.clientY - bounds.top - bounds.height / 2;

      // Magnetic pull factor (5px max)
      const pullX = (x / bounds.width) * 8;
      const pullY = (y / bounds.height) * 8;

      btn.style.transform = `translate3d(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px, 0)`;
    };

    const onMouseLeave = () => {
      btn.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
      btn.style.transform = 'translate3d(0, 0, 0)';
    };

    btn.addEventListener('mouseenter', onMouseEnter, { passive: true });
    btn.addEventListener('mousemove', onMouseMove, { passive: true });
    btn.addEventListener('mouseleave', onMouseLeave, { passive: true });
  });
}

// Auto-run on DOM ready and Astro page-load lifecycle
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  // Astro page transitions support
  document.addEventListener('astro:page-load', initAnimations);
}
