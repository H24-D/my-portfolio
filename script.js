/* ============================================================
   script.js — Harsha D Portfolio
   Handles: typed text, scroll effects, mobile nav,
            active link highlighting, reveal animations
============================================================ */

/* ── 1. TYPED ROLE TEXT EFFECT ──────────────────────────────
   Loops through an array of roles, typing and erasing each.
============================================================ */
(function initTypedText() {
  // Roles to cycle through
  const roles = [
    'Full-Stack Developer',
    'MERN Stack Engineer',
    'React.js Enthusiast',
    'Problem Solver',
  ];

  const el      = document.getElementById('typed-role');
  if (!el) return;

  let roleIndex = 0;   // Which role we're currently displaying
  let charIndex = 0;   // How many characters have been typed
  let isDeleting = false;
  let pause = false;

  function type() {
    if (pause) {
      setTimeout(type, 1600); // Wait a moment before deleting
      pause = false;
      return;
    }

    const current = roles[roleIndex];

    if (!isDeleting) {
      // --- TYPING: add one character at a time ---
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        // Finished typing — pause, then start deleting
        isDeleting = true;
        pause = true;
        setTimeout(type, 10);
        return;
      }
      setTimeout(type, 70); // Typing speed (ms per character)
    } else {
      // --- DELETING: remove one character at a time ---
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        // Finished deleting — move to next role
        isDeleting = false;
        roleIndex  = (roleIndex + 1) % roles.length;
        setTimeout(type, 300); // Brief pause before typing next
        return;
      }
      setTimeout(type, 40); // Deleting speed (faster than typing)
    }
  }

  // Start after a short initial delay
  setTimeout(type, 1200);
})();


/* ── 2. NAVBAR: scroll-shadow & active link ─────────────────
   Adds .scrolled class to navbar for background blur,
   and highlights the current section's nav link.
============================================================ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');

  function onScroll() {
    // Show navbar background once user scrolls past 60px
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Determine which section is in the viewport
    let currentSection = '';
    sections.forEach(section => {
      const top    = section.offsetTop - 100;
      const height = section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    // Apply .active class to matching nav link
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Throttle scroll handler for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  onScroll(); // Run once on load
})();


/* ── 3. MOBILE HAMBURGER MENU ──────────────────────────────
   Toggles the mobile nav drawer open/closed.
============================================================ */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const allLinks  = navLinks.querySelectorAll('.nav-link');

  // Toggle menu on button click
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  allLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
})();


/* ── 4. SCROLL-REVEAL ANIMATION ────────────────────────────
   Uses IntersectionObserver to add .visible to .reveal
   elements when they enter the viewport.
============================================================ */
(function initReveal() {
  // Get all elements that should animate in
  const revealEls = document.querySelectorAll('.reveal');

  // Create an observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop watching after it's revealed (one-time animation)
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,    // Trigger when 12% of the element is visible
      rootMargin: '0px 0px -40px 0px',  // Slight bottom offset
    }
  );

  // Observe every reveal element
  revealEls.forEach(el => observer.observe(el));
})();


/* ── 5. FOOTER YEAR ─────────────────────────────────────────
   Keeps the footer copyright year always up-to-date.
============================================================ */
(function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();


/* ── 6. SMOOTH SCROLL for older browsers (fallback) ─────────
   html { scroll-behavior: smooth } handles modern browsers.
   This covers edge cases.
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});