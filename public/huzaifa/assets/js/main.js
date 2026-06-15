(function(){
  const root = document.documentElement;
  const body = document.body;
  const langButtons = document.querySelectorAll('[data-lang-btn]');
  const translatable = document.querySelectorAll('[data-ar], [data-en]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  const year = document.querySelector('[data-year]');
  const header = document.querySelector('.site-header');
  const portrait = document.querySelector('.portrait-card');
  if(year) year.textContent = new Date().getFullYear();

  function applyLang(lang){
    const isEn = lang === 'en';
    root.lang = isEn ? 'en' : 'ar';
    root.dir = isEn ? 'ltr' : 'rtl';
    body.dir = isEn ? 'ltr' : 'rtl';
    body.classList.toggle('is-en', isEn);
    localStorage.setItem('huzaifa-lang', lang);
    translatable.forEach(el => {
      const value = el.dataset[lang];
      if(value !== undefined) el.innerHTML = value;
    });
    langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.langBtn === lang));
  }

  langButtons.forEach(btn => btn.addEventListener('click', () => applyLang(btn.dataset.langBtn)));
  applyLang(localStorage.getItem('huzaifa-lang') || 'ar');

  if(menuToggle && navLinks){
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      body.classList.toggle('no-scroll', navLinks.classList.contains('open'));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      body.classList.remove('no-scroll');
    }));
  }

  const staggerGroups = document.querySelectorAll('.projects-grid, .skills-grid, .certs-grid, .contact-grid, .case-grid, .process, .timeline, .ach-stats');
  staggerGroups.forEach(group => {
    group.classList.add('stagger-parent');
    Array.from(group.children).forEach((child, index) => {
      child.classList.add('stagger-item');
      child.style.setProperty('--reveal-delay', `${Math.min(index * 70, 420)}ms`);
    });
  });

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.08,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal, .stagger-parent').forEach(el => observer.observe(el));

  function updateHeader(){
    if(header) header.classList.toggle('scrolled', window.scrollY > 18);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, {passive:true});

  if(portrait && window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion:reduce)').matches){
    portrait.addEventListener('pointermove', event => {
      const rect = portrait.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      portrait.style.setProperty('--portrait-rotate-y', `${x * 5}deg`);
      portrait.style.setProperty('--portrait-rotate-x', `${y * -5}deg`);
    });
    portrait.addEventListener('pointerleave', () => {
      portrait.style.setProperty('--portrait-rotate-y', '0deg');
      portrait.style.setProperty('--portrait-rotate-x', '0deg');
    });
  }
})();
