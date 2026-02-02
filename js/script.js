// Basic interactivity: mobile menu, smooth scroll, simple contact handler, role carousel, skills tabs
document.addEventListener('DOMContentLoaded', function(){
  // year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

  // theme toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
  
  themeToggle.addEventListener('click', function(){
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
  });

  // header hide on scroll
  let lastScrollTop = 0;
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', function(){
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if(currentScroll > lastScrollTop && currentScroll > 100){
      header.classList.add('hide-header');
    } else {
      header.classList.remove('hide-header');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
    });
  }

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length>1){
        const el = document.querySelector(href);
        if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
      }
    });
  });

  // role carousel - cycle through roles with smooth sliding
  const roles = document.querySelectorAll('.role-item');
  let roleIndex = 0;
  setInterval(()=>{
    if(roles.length>1){
      roles[roleIndex].classList.remove('active');
      roles[roleIndex].classList.add('exit');
      roleIndex = (roleIndex+1)%roles.length;
      setTimeout(()=>{
        roles.forEach(r=>r.classList.remove('exit'));
        roles[roleIndex].classList.add('active');
      }, 800);
    }
  }, 4000);

  // skills tabs - switch categories
  const skillTabs = document.querySelectorAll('.skill-tab');
  skillTabs.forEach(tab=>{
    tab.addEventListener('click', function(){
      const category = this.getAttribute('data-category');
      skillTabs.forEach(t=>t.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.skill-category').forEach(cat=>cat.classList.remove('active'));
      const activeCategory = document.getElementById(category);
      if(activeCategory) activeCategory.classList.add('active');
    });
  });

  // contact form: demo-only — shows a success message and clears
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      // Basic validation (browser already does most)
      if(!data.get('email') || !data.get('message')){
        alert('Please fill in required fields.');
        return;
      }
      // In a real site submit to your API. Here we show a thank-you.
      alert('Thanks — message received (demo).');
      form.reset();
    });
  }

    // hero photo entrance using IntersectionObserver
    const heroPhoto = document.querySelector('.hero-photo');
    if(heroPhoto){
      const io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
          if(e.isIntersecting){
            heroPhoto.classList.add('in-view');
            io.unobserve(heroPhoto);
          }
        });
      }, {threshold: 0.35});
      io.observe(heroPhoto);
    }
});

// Lightbox for achievement images
(function(){
  const lightbox = document.getElementById('lightbox');
  if(!lightbox) return;
  const lbImg = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

  function openLightbox(src, alt){
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
    document.body.style.overflow = '';
  }

  // Open when clicking achievement images
  document.querySelectorAll('.achievement-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', e => {
      openLightbox(img.src, img.alt);
    });
  });

  // Close handlers
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => {
    if(e.target === lightbox || e.target === closeBtn) closeLightbox();
  });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });
})();
