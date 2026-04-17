/* ============================================================
   HAWK EYE DETAILING — MAIN JS
   ============================================================ */

// ---------- Intersection Observer: fade-in animations ----------
const animatedEls = document.querySelectorAll(
  '.service-card, .pricing-card, .review-card, .why-item, .why-big-stat'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const siblings = [...entry.target.parentElement.children];
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  animatedEls.forEach((el) => observer.observe(el));
} else {
  // Fallback: just show everything
  animatedEls.forEach((el) => el.classList.add('visible'));
}

// ---------- Header: add scrolled style ----------
const header = document.getElementById('site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  if (y > 60) {
    header.style.background = 'rgba(2, 6, 23, 0.97)';
  } else {
    header.style.background = 'rgba(2, 6, 23, 0.85)';
  }

  lastScroll = y;
}, { passive: true });

// ---------- Mobile CTA bar: hide/show on scroll direction ----------
const mobileCta = document.getElementById('mobile-cta-bar');
let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentY = window.scrollY;
      // Always show at bottom of page
      const nearBottom = (window.innerHeight + currentY) >= document.body.offsetHeight - 100;
      if (nearBottom || currentY < 200) {
        mobileCta.style.transform = 'translateY(0)';
      } else if (currentY > lastScrollY + 10) {
        // Scrolling down — hide
        mobileCta.style.transform = 'translateY(120%)';
      } else if (currentY < lastScrollY - 5) {
        // Scrolling up — show
        mobileCta.style.transform = 'translateY(0)';
      }
      lastScrollY = currentY;
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Smooth transition for mobile bar
if (mobileCta) {
  mobileCta.style.transition = 'transform 0.3s ease';
}

// ---------- Active nav link highlighting ----------
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.header-nav a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach((s) => navObserver.observe(s));

// Add active style dynamically
const styleEl = document.createElement('style');
styleEl.textContent = '.header-nav a.active { color: #f1f5f9; background: rgba(255,255,255,0.06); }';
document.head.appendChild(styleEl);

// ---------- Gallery items: add hover shimmer ----------
document.querySelectorAll('.gallery-placeholder').forEach((el) => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => {
    // Scroll to contact
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
});

// ---------- Phone number formatting helper ----------
// All tel: links already in HTML — nothing needed

// ---------- Prefers color scheme (already dark) ----------
// Site is dark-only, no toggle needed

console.log('%c🦅 Hawk Eye Detailing', 'font-size:20px; font-weight:bold; color:#3b82f6;');
console.log('%c(403) 401-9050 | Calgary, AB | Open 7 days', 'color:#94a3b8;');
