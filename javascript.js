/* ==========================================================
   ANGE_DEV – PORTFOLIO
   javascript.js  — Navigation SPA + toutes les fonctionnalités
   ========================================================== */

// ============================================================
// 1. NAVIGATION SPA — affichage par pages
// ============================================================
const pages = ['accueil', 'apropos', 'competences', 'services', 'portfolio', 'parcours', 'contact'];

function showPage(pageId) {
  // Cacher toutes les pages
  pages.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.style.display = 'none';
  });

  // Afficher la page demandée
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.style.display = 'block';
    // Re-déclencher l'animation
    target.style.animation = 'none';
    target.offsetHeight; // reflow
    target.style.animation = '';
  }

  // Mettre à jour les liens actifs
  document.querySelectorAll('.nav__link').forEach(link => {
    link.classList.remove('nav__link--active');
  });
  document.querySelectorAll('.nav__link').forEach(link => {
    const onclick = link.getAttribute('onclick') || '';
    if (onclick.includes("'" + pageId + "'")) {
      link.classList.add('nav__link--active');
    }
  });

  // Scroll vers le haut
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Fermer le menu mobile si ouvert
  const navList = document.getElementById('navList');
  const toggle = document.getElementById('navToggle');
  if (navList) navList.classList.remove('nav__list--open');
  if (toggle) toggle.classList.remove('nav__toggle--open');

  // Ré-animer les skill bars si page compétences
  if (pageId === 'competences') {
    setTimeout(animateSkillBars, 200);
  }
}

// Afficher la page d'accueil au chargement
document.addEventListener('DOMContentLoaded', () => {
  showPage('accueil');
});

// ============================================================
// 2. HEADER SCROLL EFFECT
// ============================================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('header--scrolled', window.scrollY > 60);
  }
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    backBtn.classList.toggle('back-to-top--visible', window.scrollY > 400);
  }
});

// ============================================================
// 3. MENU MOBILE TOGGLE
// ============================================================
const toggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');

if (toggle && navList) {
  toggle.addEventListener('click', () => {
    navList.classList.toggle('nav__list--open');
    toggle.classList.toggle('nav__toggle--open');
  });
}

// ============================================================
// 4. SKILL BARS ANIMATION
// ============================================================
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar__fill');
  bars.forEach(bar => {
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = bar.style.getPropertyValue('--w') || getComputedStyle(bar).getPropertyValue('--w');
    }, 100);
  });
}

// ============================================================
// 5. TYPED ROLE TEXT
// ============================================================
const roles = ['Développeur Web en Formation', 'Intégrateur HTML/CSS', "Créateur d'interfaces modernes"];
let ri = 0, ci = 0, isDeleting = false;
const typed = document.getElementById('typedRole');

function typeEffect() {
  if (!typed) return;
  const current = roles[ri];
  if (isDeleting) {
    typed.textContent = current.substring(0, ci--);
  } else {
    typed.textContent = current.substring(0, ci++);
  }
  let delay = isDeleting ? 50 : 100;
  if (!isDeleting && ci === current.length + 1) {
    delay = 1800; isDeleting = true;
  } else if (isDeleting && ci === 0) {
    isDeleting = false; ri = (ri + 1) % roles.length; delay = 300;
  }
  setTimeout(typeEffect, delay);
}
typeEffect();

// ============================================================
// 6. CONTACT FORM (Formspree)
// ============================================================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Envoi en cours...'; }
    if (formSuccess) formSuccess.style.display = 'none';
    if (formError) formError.style.display = 'none';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        if (formSuccess) formSuccess.style.display = 'block';
        contactForm.reset();
      } else {
        if (formError) formError.style.display = 'block';
      }
    } catch {
      if (formError) formError.style.display = 'block';
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Envoyer le message';
    }
    setTimeout(() => {
      if (formSuccess) formSuccess.style.display = 'none';
      if (formError) formError.style.display = 'none';
    }, 6000);
  });
}

// ============================================================
// 7. BOUTON RETOUR EN HAUT
// ============================================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// 8. FADE-IN ON SCROLL (cards)
// ============================================================
const fadeEls = document.querySelectorAll('.service-card, .project-card, .goal-card, .testimonial-card, .stat-card');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
fadeEls.forEach(el => fadeObserver.observe(el));

// ============================================================
// 9. YOUTHCONNECT MODAL
// ============================================================
(function () {
  const overlay = document.getElementById('yc-detail-modal');
  if (!overlay) return;

  window.ycOpen = function (e) {
    if (e) e.preventDefault();
    overlay.classList.add('yc-open');
    document.body.style.overflow = 'hidden';
  };

  window.ycClose = function () {
    overlay.classList.remove('yc-open');
    document.body.style.overflow = '';
  };

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) window.ycClose();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('yc-open')) {
      window.ycClose();
    }
  });
})();