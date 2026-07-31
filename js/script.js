/* =========================================================================
   Shena Cabalhin — Portfolio Interactions
   Vanilla JS only. No dependencies.
   Sections:
   1. Mobile Navigation
   2. Smooth Scrolling (nav links)
   3. Active Navigation Highlighting (scrollspy)
   4. Sticky Header Shadow on Scroll
   5. Scroll Reveal Animations
   6. Back to Top Button
   7. Dark Mode Toggle
   8. Contact Form Handling
   9. Footer Year
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------------------
     1. Mobile Navigation
  ----------------------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Open menu');
    iconMenu.classList.remove('hidden');
    iconClose.classList.add('hidden');
  }

  function openMobileMenu() {
    mobileMenu.classList.remove('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenuBtn.setAttribute('aria-label', 'Close menu');
    iconMenu.classList.add('hidden');
    iconClose.classList.remove('hidden');
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }

  /* -----------------------------------------------------------------------
     2. Smooth Scrolling + close mobile menu on nav click
     (CSS `scroll-smooth` handles the actual scroll; this ensures the
     mobile menu closes and accounts for the fixed header offset.)
  ----------------------------------------------------------------------- */
  const navLinks = document.querySelectorAll('a[data-nav]');
  const header = document.getElementById('site-header');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight + 1;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
      // Always close mobile menu after a nav click
      closeMobileMenu();
    });
  });

  /* -----------------------------------------------------------------------
     3. Active Navigation Highlighting (Scrollspy)
  ----------------------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const allNavAnchors = document.querySelectorAll('a[data-nav]');

  function setActiveNav(id) {
    allNavAnchors.forEach((a) => {
      const isMatch = a.getAttribute('href') === `#${id}`;
      a.classList.toggle('active', isMatch);
      if (isMatch) {
        a.setAttribute('aria-current', 'true');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  const scrollSpyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    },
    {
      // Section is considered "active" once it crosses the upper third of the viewport
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => scrollSpyObserver.observe(section));

  /* -----------------------------------------------------------------------
     4. Sticky Header Shadow on Scroll
  ----------------------------------------------------------------------- */
  function handleHeaderShadow() {
    if (!header) return;
    if (window.scrollY > 12) {
      header.classList.add('shadow-lg', 'shadow-slate-900/5', 'border-slate-100', 'dark:border-slate-800');
    } else {
      header.classList.remove('shadow-lg', 'shadow-slate-900/5', 'border-slate-100', 'dark:border-slate-800');
    }
  }
  handleHeaderShadow();

  /* -----------------------------------------------------------------------
     5. Scroll Reveal Animations
  ----------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // slight stagger for a polished, sequential feel
          setTimeout(() => {
            entry.target.classList.add('in-view');
          }, index * 40);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  /* -----------------------------------------------------------------------
     6. Back to Top Button
  ----------------------------------------------------------------------- */
  const backToTopBtn = document.getElementById('back-to-top');
  const backToTopFooter = document.getElementById('back-to-top-footer');

  function handleBackToTopVisibility() {
    if (!backToTopBtn) return;
    if (window.scrollY > 480) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    }
  }
  handleBackToTopVisibility();

  // Single rAF-throttled scroll listener drives both the header shadow and
  // the back-to-top button, avoiding redundant listeners / layout thrashing.
  let scrollTicking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          handleHeaderShadow();
          handleBackToTopVisibility();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    },
    { passive: true }
  );

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (backToTopBtn) backToTopBtn.addEventListener('click', scrollToTop);
  if (backToTopFooter) backToTopFooter.addEventListener('click', scrollToTop);

  /* -----------------------------------------------------------------------
     7. Dark Mode Toggle
  ----------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');
  const htmlEl = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
      iconSun.classList.remove('hidden');
      iconMoon.classList.add('hidden');
    } else {
      htmlEl.classList.remove('dark');
      iconSun.classList.add('hidden');
      iconMoon.classList.remove('hidden');
    }
  }

  // Initialize: saved preference > OS preference > light default
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = htmlEl.classList.contains('dark');
      const nextTheme = isDark ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('portfolio-theme', nextTheme);
    });
  }

  /* -----------------------------------------------------------------------
     8. Contact Form Handling
     This is a static template form (no backend). It validates required
     fields with native HTML5 validation, then shows a confirmation message.
     Replace this handler with a real submission (e.g. fetch() to your
     form backend or email service) when you deploy.
  ----------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      // TODO: Replace with a real submission call, e.g.:
      // fetch('https://your-form-endpoint.com', { method: 'POST', body: new FormData(contactForm) });

      if (formStatus) {
        formStatus.classList.remove('hidden');
      }
      contactForm.reset();
    });
  }

  /* -----------------------------------------------------------------------
     9. Footer Year
  ----------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
