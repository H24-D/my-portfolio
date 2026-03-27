/* ============================================================
   script.js — Harsha D Portfolio
   Single-Page App navigation: clicking a nav button shows
   only that page, hides all others. No full-page scrolling.
============================================================ */

/* ── 1. SPA PAGE NAVIGATION ────────────────────────────────
   All elements with data-page="xxx" switch to that page.
   This includes: nav buttons, drawer buttons, hero CTAs.
============================================================ */
function navigateTo(pageId) {
  // Hide every page
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show the target page
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0; // Always start from top of page
  }

  // Update active state on desktop nav links
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });

  // Update active state on mobile drawer links
  document.querySelectorAll('.drawer-link').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });

  // Close mobile drawer when navigating
  closeMobileDrawer();

  // Restart typed animation when going back to home
  if (pageId === 'home') {
    restartTyped();
  }
}

// Wire up every element that has data-page attribute
document.querySelectorAll('[data-page]').forEach(el => {
  el.addEventListener('click', () => {
    navigateTo(el.dataset.page);
  });
});


/* ── 2. MOBILE DRAWER (hamburger menu) ─────────────────────
   Opens / closes the slide-down drawer.
============================================================ */
const hamburger    = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');

function openMobileDrawer() {
  hamburger.classList.add('open');
  mobileDrawer.classList.add('open');
  drawerOverlay.classList.add('visible');
}

function closeMobileDrawer() {
  hamburger.classList.remove('open');
  mobileDrawer.classList.remove('open');
  drawerOverlay.classList.remove('visible');
}

hamburger.addEventListener('click', () => {
  if (mobileDrawer.classList.contains('open')) {
    closeMobileDrawer();
  } else {
    openMobileDrawer();
  }
});

// Clicking the overlay also closes the drawer
drawerOverlay.addEventListener('click', closeMobileDrawer);


/* ── 3. TYPED TEXT EFFECT ───────────────────────────────────
   Cycles through role strings with type & erase animation.
============================================================ */
const roles = [
  'Full-Stack Developer',
  'MERN Stack Engineer',
  'React.js Enthusiast',
  'Problem Solver',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typedTimer = null;

function typeStep() {
  const el = document.getElementById('typed-role');
  if (!el) return;

  const current = roles[roleIndex];

  if (!isDeleting) {
    // Typing forward
    charIndex++;
    el.textContent = current.slice(0, charIndex);

    if (charIndex === current.length) {
      // Finished typing — wait, then delete
      isDeleting = true;
      typedTimer = setTimeout(typeStep, 1800);
      return;
    }
    typedTimer = setTimeout(typeStep, 70);
  } else {
    // Deleting backward
    charIndex--;
    el.textContent = current.slice(0, charIndex);

    if (charIndex === 0) {
      // Move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typedTimer = setTimeout(typeStep, 350);
      return;
    }
    typedTimer = setTimeout(typeStep, 38);
  }
}

function restartTyped() {
  // Reset and restart typed animation
  clearTimeout(typedTimer);
  roleIndex = 0;
  charIndex = 0;
  isDeleting = false;
  const el = document.getElementById('typed-role');
  if (el) el.textContent = '';
  setTimeout(typeStep, 800);
}

// Start on load
setTimeout(typeStep, 1000);


/* ── 4. FOOTER YEAR ─────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();