(function(){
  const root = document.documentElement;
  const body = document.body;
  const langButtons = document.querySelectorAll('[data-lang-btn]');
  const translatable = document.querySelectorAll('[data-ar], [data-en]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');
  const year = document.querySelector('[data-year]');
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

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();
