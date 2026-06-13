/* =====================================================================
   ASHISH KUMAR PORTFOLIO — script.js
   ===================================================================== */

/* ─── Navbar: scroll shadow + active link highlighting ─────────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('#nav-links a:not(.nav-cta)');
const sections = document.querySelectorAll('main section[id]');

function onScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 80;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ─── Mobile nav toggle ────────────────────────────────────────────── */
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open', !expanded);
});

navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('open');
  });
});

/* ─── Scroll-in animations ─────────────────────────────────────────── */
const fadeTargets = [
  '.section-intro',
  '.about-grid',
  '.programme-card',
  '.feature-card',
  '.timeline-item',
  '.style-item',
  '.table-wrap',
  '.exp-item',
  '.edu-item',
  '.skills-grid',
  '.contact-wrap',
];

function initFade() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  fadeTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = (i * 60) + 'ms';
    });
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function observeFade() {
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

initFade();
observeFade();

/* ─── Contact form ─────────────────────────────────────────────────── */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name  = form.name.value.trim();
  const email = form.email.value.trim();
  const goal  = form.goal.value;

  if (!name || !email || !goal) {
    status.textContent = 'Please fill in your name, email, and curriculum/goal.';
    status.className = 'form-note error';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.textContent = 'Please enter a valid email address.';
    status.className = 'form-note error';
    return;
  }

  /* Build a mailto link as a simple no-backend fallback */
  const subject = encodeURIComponent(`Tutoring enquiry — ${goal} (${name})`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${form.phone.value.trim() || 'Not provided'}\nCurriculum/Goal: ${goal}\n\nMessage:\n${form.message.value.trim() || 'No message provided.'}`
  );
  window.location.href = `mailto:ashisharman786@gmail.com?subject=${subject}&body=${body}`;

  status.textContent = 'Opening your email client… Thank you for getting in touch!';
  status.className = 'form-note success';
});
