// Basic interactivity: mobile menu, smooth scroll, simple contact handler
document.addEventListener('DOMContentLoaded', function(){
  // year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

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
});
