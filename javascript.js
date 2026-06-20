// ---- Header scroll effect ----
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('header--scrolled', window.scrollY > 60);
      document.getElementById('backToTop').classList.toggle('back-to-top--visible', window.scrollY > 400);
    });

    // ---- Menu mobile toggle ----
    const toggle = document.getElementById('navToggle');
    const navList = document.getElementById('navList');
    toggle.addEventListener('click', () => {
      navList.classList.toggle('nav__list--open');
      toggle.classList.toggle('nav__toggle--open');
    });
    // Fermer le menu au clic sur un lien
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('nav__list--open');
        toggle.classList.remove('nav__toggle--open');
      });
    });

    // ---- Active nav link on scroll ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
      });
      navLinks.forEach(l => {
        l.classList.remove('nav__link--active');
        if (l.getAttribute('href') === '#' + current) l.classList.add('nav__link--active');
      });
    });

    // ---- Skill bars animation ----
    const bars = document.querySelectorAll('.skill-bar__fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.style.getPropertyValue('--w');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => { b.style.width = '0'; observer.observe(b); });

    // ---- Typed role text ----
    const roles = ['Développeur Web en Formation', 'Intégrateur HTML/CSS', 'Créateur d\'interfaces modernes'];
    let ri = 0, ci = 0, isDeleting = false;
    const typed = document.getElementById('typedRole');
    function typeEffect() {
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

    // ---- Contact form (Formspree) ----
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';
      formSuccess.style.display = 'none';
      formError.style.display = 'none';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          formSuccess.style.display = 'block';
          contactForm.reset();
        } else {
          formError.style.display = 'block';
        }
      } catch {
        formError.style.display = 'block';
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Envoyer le message';
      setTimeout(() => {
        formSuccess.style.display = 'none';
        formError.style.display = 'none';
      }, 6000);
    });

    // ---- Back to top ----
    document.getElementById('backToTop').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- Smooth scroll for anchors ----
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });

    // ---- Fade-in on scroll ----
    const fadeEls = document.querySelectorAll('.service-card, .project-card, .goal-card, .testimonial-card, .stat-card');
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => { el.classList.add('fade-in'); fadeObserver.observe(el); });