/**
 * Master Animation & Micro-Interactions Suite for VM Graphite Industries
 * High-performance 60fps GPU-accelerated effects:
 * 1. Global Smooth Ambient Cursor Torch Aura (Inertia Follower)
 * 2. Scroll Progress Laser Indicator
 * 3. Scroll-Driven Intersection Reveal Engine
 * 4. Dynamic Delegated Mouse Spotlight Glow & Border Illumination
 * 5. Dynamic Delegated 3D Perspective Card Tilt with Specular Glare
 * 6. Animated Metric & Stat Counters
 * 7. Interactive Graphite Ember Particle Canvas
 * 8. Magnetic Button Micro-Interactions
 * 9. Parallax Ambient Glow Lighting
 */

export function initAnimations() {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.classList.add('is-revealed');
    });
    return;
  }

  initCursorAura();
  initScrollProgress();
  initScrollReveals();
  initMouseSpotlight();
  init3DCardTilt();
  initStatCounters();
  initEmberCanvas();
  initMagneticButtons();
  initParallaxGlows();
}

/**
 * 1. Global Ambient Cursor Torch Aura (Inertia Follower)
 */
function initCursorAura() {
  let aura = document.getElementById('cursor-glow-aura');
  if (!aura) {
    aura = document.createElement('div');
    aura.id = 'cursor-glow-aura';
    aura.className = 'pointer-events-none fixed z-30 rounded-full mix-blend-screen opacity-0 transition-opacity duration-700 blur-[90px]';
    aura.style.width = '420px';
    aura.style.height = '420px';
    aura.style.background = 'radial-gradient(circle, rgba(255, 102, 54, 0.12) 0%, rgba(255, 102, 54, 0.03) 50%, transparent 75%)';
    aura.style.transform = 'translate(-50%, -50%) translate3d(-9999px, -9999px, 0)';
    document.body.appendChild(aura);
  }

  let mouseX = -9999;
  let mouseY = -9999;
  let auraX = -9999;
  let auraY = -9999;
  let isMoving = false;

  window.addEventListener(
    'pointermove',
    (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving && aura) {
        aura.style.opacity = '1';
        isMoving = true;
      }
    },
    { passive: true }
  );

  document.addEventListener('mouseleave', () => {
    if (aura) aura.style.opacity = '0';
  });

  function renderAura() {
    if (mouseX !== -9999 && aura) {
      auraX += (mouseX - auraX) * 0.15;
      auraY += (mouseY - auraY) * 0.15;
      aura.style.transform = `translate(-50%, -50%) translate3d(${auraX.toFixed(1)}px, ${auraY.toFixed(1)}px, 0)`;
    }
    requestAnimationFrame(renderAura);
  }

  renderAura();
}

/**
 * 2. Scroll Progress Laser Indicator
 */
function initScrollProgress() {
  let bar = document.getElementById('scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scroll-progress-bar';
    bar.className = 'fixed top-0 left-0 h-[2.5px] z-50 bg-gradient-to-r from-[var(--primary)] via-[#ffbeaa] to-[var(--primary-hover)] shadow-[0_0_12px_var(--primary-glow)] pointer-events-none transition-all duration-75';
    bar.style.width = '0%';
    document.body.appendChild(bar);
  }

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (bar) bar.style.width = `${Math.min(scrollPercent, 100)}%`;
  };

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/**
 * 3. Scroll-Driven Intersection Reveal Engine
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

          if (target.hasAttribute('data-counter')) {
            animateCounter(target);
          }
          target.querySelectorAll<HTMLElement>('[data-counter]').forEach((c) => {
            animateCounter(c);
          });

          observer.unobserve(target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * 4. Dynamic Delegated Mouse Spotlight Glow & Border Illumination
 */
function initMouseSpotlight() {
  window.addEventListener(
    'pointermove',
    (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const card = target?.closest?.('.glow-card, .spotlight-card, [data-spotlight]') as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${(e.clientX - rect.left).toFixed(1)}px`);
        card.style.setProperty('--mouse-y', `${(e.clientY - rect.top).toFixed(1)}px`);
      }
    },
    { passive: true }
  );
}

/**
 * 5. Dynamic Delegated 3D Perspective Card Tilt with Specular Glare
 */
function init3DCardTilt() {
  let activeTiltCard: HTMLElement | null = null;
  let bounds: DOMRect | null = null;

  document.addEventListener(
    'pointermove',
    (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const card = target?.closest?.('[data-tilt]') as HTMLElement | null;

      if (card) {
        if (activeTiltCard !== card) {
          if (activeTiltCard) {
            activeTiltCard.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease';
            activeTiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
          }
          activeTiltCard = card;
          bounds = card.getBoundingClientRect();
          card.style.transition = 'transform 0.08s ease-out, box-shadow 0.3s ease';
        }

        if (bounds) {
          const mouseX = e.clientX - bounds.left;
          const mouseY = e.clientY - bounds.top;
          const xPct = mouseX / bounds.width - 0.5;
          const yPct = mouseY / bounds.height - 0.5;
          const maxTilt = parseFloat(card.getAttribute('data-tilt-max') || '7');
          const rotateX = -yPct * maxTilt;
          const rotateY = xPct * maxTilt;
          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
        }
      } else if (activeTiltCard) {
        activeTiltCard.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease';
        activeTiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        activeTiltCard = null;
        bounds = null;
      }
    },
    { passive: true }
  );

  document.addEventListener('mouseleave', () => {
    if (activeTiltCard) {
      activeTiltCard.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease';
      activeTiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      activeTiltCard = null;
      bounds = null;
    }
  });
}

/**
 * 6. Animated Metric & Stat Counters
 */
function initStatCounters() {
  const counterElements = document.querySelectorAll<HTMLElement>('[data-counter]');
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
    { threshold: 0.15 }
  );

  counterElements.forEach((el) => counterObserver.observe(el));
}

function animateCounter(el: HTMLElement) {
  if (el.dataset.counterDone === 'true') return;
  el.dataset.counterDone = 'true';

  const rawTarget = el.getAttribute('data-counter') || el.innerText;
  const match = rawTarget.match(/([0-9.,]+)/);
  if (!match) return;

  const numStr = match[1].replace(/,/g, '');
  const targetVal = parseFloat(numStr);
  const prefix = rawTarget.slice(0, match.index);
  const suffix = rawTarget.slice((match.index || 0) + match[1].length);
  const isDecimal = numStr.includes('.');
  const decimals = isDecimal ? numStr.split('.')[1].length : 0;

  const duration = parseInt(el.getAttribute('data-counter-duration') || '1800', 10);
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
 * 7. Interactive Graphite Ember Particle Canvas
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

  const particleCount = Math.min(Math.floor(width / 20), 75);

  function createParticle() {
    return {
      x: Math.random() * width,
      y: height + Math.random() * 20,
      size: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -(Math.random() * 0.8 + 0.35),
      opacity: Math.random() * 0.75 + 0.25,
      fadeSpeed: Math.random() * 0.004 + 0.002,
      hue: Math.random() > 0.3 ? 18 : 36,
    };
  }

  for (let i = 0; i < particleCount; i++) {
    const p = createParticle();
    p.y = Math.random() * height;
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

  function render() {
    ctx?.clearRect(0, 0, width, height);

    particles.forEach((p, idx) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity -= p.fadeSpeed;

      if (mouseActive) {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          const force = (110 - dist) / 110;
          p.x -= (dx / dist) * force * 1.8;
          p.y -= (dy / dist) * force * 1.8;
        }
      }

      if (p.opacity <= 0 || p.y < -10 || p.x < -10 || p.x > width + 10) {
        particles[idx] = createParticle();
      }

      if (ctx) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 95%, 60%, ${Math.max(0, p.opacity)})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 65%, 0.9)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    requestAnimationFrame(render);
  }

  render();

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
 * 8. Magnetic Button Micro-Interactions
 */
function initMagneticButtons() {
  document.addEventListener(
    'pointermove',
    (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest?.('[data-magnetic], .forge-btn-primary, .forge-btn-secondary') as HTMLElement | null;
      if (btn) {
        const bounds = btn.getBoundingClientRect();
        const x = e.clientX - bounds.left - bounds.width / 2;
        const y = e.clientY - bounds.top - bounds.height / 2;
        const pullX = (x / bounds.width) * 9;
        const pullY = (y / bounds.height) * 9;
        btn.style.transition = 'transform 0.12s ease-out';
        btn.style.transform = `translate3d(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px, 0)`;
      }
    },
    { passive: true }
  );

  document.addEventListener(
    'pointerout',
    (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest?.('[data-magnetic], .forge-btn-primary, .forge-btn-secondary') as HTMLElement | null;
      if (btn) {
        btn.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
        btn.style.transform = 'translate3d(0, 0, 0)';
      }
    },
    { passive: true }
  );
}

/**
 * 9. Parallax Ambient Glow Lighting
 */
function initParallaxGlows() {
  const glows = document.querySelectorAll<HTMLElement>('[data-parallax-glow]');
  if (!glows.length) return;

  window.addEventListener(
    'mousemove',
    (e) => {
      const xNorm = (e.clientX / window.innerWidth - 0.5) * 30;
      const yNorm = (e.clientY / window.innerHeight - 0.5) * 30;

      glows.forEach((glow) => {
        glow.style.transform = `translate3d(${xNorm.toFixed(1)}px, ${yNorm.toFixed(1)}px, 0)`;
      });
    },
    { passive: true }
  );
}

// Auto-run on DOM ready and Astro page transitions
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

  document.addEventListener('astro:page-load', initAnimations);
}
