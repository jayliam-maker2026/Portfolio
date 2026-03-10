/**
 * Jay E. Pahilanga — Construction & Engineering Virtual Assistant
 * Website Script — script.js
 * ─────────────────────────────────────────────────────────────────
 */

'use strict';

// ─────────────────────────────────────────────────────────────────
// 1. SCROLL ANIMATIONS (Fade-up on reveal)
// ─────────────────────────────────────────────────────────────────

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// Trigger hero + stats bar immediately on load
document.querySelectorAll('#hero .fade-up, .stats-bar .fade-up').forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), 100 + i * 120);
});


// ─────────────────────────────────────────────────────────────────
// 2. STICKY NAV — shrink + active link highlight on scroll
// ─────────────────────────────────────────────────────────────────

const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Shrink nav after scrolling 80px
  if (window.scrollY > 80) {
    nav.style.height = '52px';
    nav.style.boxShadow = '0 2px 24px rgba(0,0,0,0.4)';
  } else {
    nav.style.height = '64px';
    nav.style.boxShadow = 'none';
  }

  // Highlight active nav link
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('nav-active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('nav-active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });


// ─────────────────────────────────────────────────────────────────
// 3. SMOOTH SCROLL for anchor links
// ─────────────────────────────────────────────────────────────────

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ─────────────────────────────────────────────────────────────────
// 4. ANIMATED STAT COUNTERS
// ─────────────────────────────────────────────────────────────────

function animateCounter(el, target, suffix, duration = 1400) {
  const isDecimal = target < 10;
  let start = 0;
  const step = 16;
  const increment = target / (duration / step);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = isDecimal
      ? start.toFixed(1) + suffix
      : Math.floor(start) + suffix;
  }, step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const target = parseFloat(raw);
      if (!isNaN(target)) animateCounter(el, target, suffix);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

// Attach data attributes to stat numbers for counter animation
const statConfig = [
  { selector: '.stats-inner .stat-item:nth-child(1) .stat-num', count: 12, suffix: '+' },
  { selector: '.stats-inner .stat-item:nth-child(2) .stat-num', count: 100, suffix: '%' },
  { selector: '.stats-inner .stat-item:nth-child(3) .stat-num', count: 3, suffix: '+' },
  { selector: '.stats-inner .stat-item:nth-child(4) .stat-num', count: 40, suffix: '%' },
];

statConfig.forEach(({ selector, count, suffix }) => {
  const el = document.querySelector(selector);
  if (el) {
    el.dataset.count = count;
    el.dataset.suffix = suffix;
    el.textContent = '0' + suffix;
    statObserver.observe(el);
  }
});


// ─────────────────────────────────────────────────────────────────
// 5. MOBILE NAV TOGGLE
// ─────────────────────────────────────────────────────────────────

// Inject hamburger button if on mobile
const navLinksEl = document.querySelector('.nav-links');
const hamburger = document.createElement('button');
hamburger.innerHTML = '☰';
hamburger.setAttribute('aria-label', 'Toggle navigation');
hamburger.style.cssText = `
  display: none;
  background: none;
  border: 1px solid rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.8);
  font-size: 1.2rem;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
`;

nav.appendChild(hamburger);

// Show hamburger on small screens
const mq = window.matchMedia('(max-width: 900px)');
function handleMQ(e) {
  hamburger.style.display = e.matches ? 'block' : 'none';
  if (!e.matches) navLinksEl.style.display = '';
}
mq.addEventListener('change', handleMQ);
handleMQ(mq);

hamburger.addEventListener('click', () => {
  const isOpen = navLinksEl.style.display === 'flex';
  navLinksEl.style.cssText = isOpen
    ? ''
    : 'display:flex; flex-direction:column; position:absolute; top:64px; left:0; right:0; background:rgba(14,21,32,0.98); padding:1.5rem 2rem; gap:1.2rem; border-bottom:1px solid rgba(255,255,255,0.07);';
  hamburger.innerHTML = isOpen ? '☰' : '✕';
});

// Close menu on link click
navLinksEl.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksEl.style.display = '';
    hamburger.innerHTML = '☰';
  });
});


// ─────────────────────────────────────────────────────────────────
// 6. BACK TO TOP BUTTON
// ─────────────────────────────────────────────────────────────────

const backToTop = document.createElement('button');
backToTop.innerHTML = '↑';
backToTop.setAttribute('aria-label', 'Back to top');
backToTop.style.cssText = `
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 44px;
  height: 44px;
  background: #F57C00;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(245,124,0,0.4);
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.3s, transform 0.3s;
  z-index: 200;
`;
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.style.opacity = '1';
    backToTop.style.transform = 'translateY(0)';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.transform = 'translateY(12px)';
  }
}, { passive: true });


// ─────────────────────────────────────────────────────────────────
// 7. SERVICE CARD HOVER — subtle tilt effect
// ─────────────────────────────────────────────────────────────────

document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -3;
    const rotY = ((x - cx) / cx) * 3;
    card.style.transform = `translateY(-4px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease, box-shadow 0.3s, border-color 0.3s';
    setTimeout(() => card.style.transition = '', 400);
  });
});


// ─────────────────────────────────────────────────────────────────
// 8. NAV ACTIVE STYLE INJECTION
// ─────────────────────────────────────────────────────────────────

const activeStyle = document.createElement('style');
activeStyle.textContent = `
  .nav-links a.nav-active {
    color: #F57C00 !important;
  }
`;
document.head.appendChild(activeStyle);


// ─────────────────────────────────────────────────────────────────
// 9. CURRENT YEAR in footer
// ─────────────────────────────────────────────────────────────────

const footerYear = document.querySelector('footer span');
if (footerYear) {
  const copyrightText = document.querySelector('footer');
  if (copyrightText) {
    copyrightText.innerHTML = copyrightText.innerHTML.replace(
      /©\s*\d{4}/,
      `© ${new Date().getFullYear()}`
    );
  }
}


// ─────────────────────────────────────────────────────────────────
// 10. CONSOLE GREETING
// ─────────────────────────────────────────────────────────────────

console.log('%c Jay E. Pahilanga ', 'background:#F57C00; color:#fff; font-size:14px; font-weight:bold; padding:4px 8px; border-radius:3px;');
console.log('%c Construction & Engineering Virtual Assistant', 'color:#00BCD4; font-size:12px;');
console.log('%c 📧 jayepahilanga@gmail.com  |  📱 +63 950 326 9056', 'color:#6C757D; font-size:11px;');
