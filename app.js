// Current year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling with Lenis
const lenis = new Lenis({ smoothWheel: true });
function raf(time){ lenis.raf(time); requestAnimationFrame(raf) }
requestAnimationFrame(raf);

// AOS animations
AOS.init({ duration: 700, once: true, offset: 80 });

// Tilt cards
document.querySelectorAll('[data-tilt]').forEach(el => {
  VanillaTilt.init(el, { max: 8, glare: true, 'max-glare': .2, speed: 500 });
});

// Hero Swiper (fade)
const heroSwiper = new Swiper('.hero-swiper', {
  slidesPerView: 1,
  effect: 'fade',
  autoplay: { delay: 2800 },
  loop: true,
  pagination: { el: '.hero-swiper .swiper-pagination', clickable: true }
});

// Showreel Swiper (coverflow)
const reelSwiper = new Swiper('.showreel-swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  coverflowEffect: { rotate: 0, stretch: 0, depth: 120, modifier: 2, slideShadows: false },
  pagination: { el: '.showreel-swiper .swiper-pagination', clickable: true },
  breakpoints: { 0:{slidesPerView:1}, 760:{slidesPerView:2}, 1024:{slidesPerView:3} }
});

// Stats count-up when visible
const counters = document.querySelectorAll('[data-countup]');
const observer = new IntersectionObserver((entries, obs)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      const target = +el.dataset.countup;
      const start = 0;
      const dur = 1200;
      const t0 = performance.now();
      function tick(t){
        const p = Math.min((t - t0)/dur, 1);
        el.textContent = Math.floor(start + p*(target - start));
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      obs.unobserve(el);
    }
  });
},{threshold: 0.6});
counters.forEach(c=>observer.observe(c));

// Theme toggle with localStorage
const root = document.documentElement;
const toggle = document.getElementById('toggleTheme');
const THEME_KEY = 'tda-theme';
function setTheme(mode){
  const dark = mode === 'dark';
  root.style.setProperty('--bg', dark ? '#0b0e13' : '#f6f7fb');
  root.style.setProperty('--bg-2', dark ? '#0f1117' : '#ffffff');
  root.style.setProperty('--card', dark ? '#121723' : '#ffffff');
  root.style.setProperty('--text', dark ? '#e7ebf3' : '#11131a');
  root.style.setProperty('--muted', dark ? '#9aa4b2' : '#596274');
  document.body.style.background = dark
    ? 'radial-gradient(1200px 800px at 80% -10%,rgba(124,92,255,.25),rgba(255,92,168,.1) 40%,transparent 60%),var(--bg)'
    : 'radial-gradient(1200px 800px at 80% -10%,rgba(124,92,255,.12),rgba(255,92,168,.08) 40%,transparent 60%),var(--bg)';
  localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  toggle.setAttribute('aria-label', dark ? 'Enable light theme' : 'Enable dark theme');
}
setTheme(localStorage.getItem(THEME_KEY) || 'dark');
toggle.addEventListener('click', ()=>{
  const next = (localStorage.getItem(THEME_KEY) || 'dark') === 'dark' ? 'light' : 'dark';
  setTheme(next);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger?.addEventListener('click', ()=>{
  const open = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.setAttribute('aria-expanded', String(!open));
  mobileMenu.style.display = open ? 'none' : 'grid';
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  const icon = item.querySelector('.indicator');
  q.addEventListener('click',()=>{
    const open = a.style.display === 'block';
    document.querySelectorAll('.faq-a').forEach(el=>el.style.display='none');
    document.querySelectorAll('.faq-q .indicator').forEach(el=>el.textContent='+');
    if(!open){ a.style.display='block'; if(icon) icon.textContent='–'; }
  });
});

// CTA: pricing buttons -> mailto
const contactEmail = 'hello@thedatingagency.example';
document.querySelectorAll('.choose').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const plan = btn.dataset.plan || 'General Enquiry';
    const subject = encodeURIComponent(`Enquiry about ${plan}`);
    const body = encodeURIComponent(`Hi,\n\nI\'m interested in the ${plan} programme. Please share next steps.\n\nThanks!`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  });
});

// Toast helper
function showToast(text){
  const el = document.getElementById('toast');
  el.textContent = text;
  el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'), 2200);
}

// Scroll progress
const progress = document.getElementById('progress');
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const scrolled = (h.scrollTop)/(h.scrollHeight - h.clientHeight);
  progress.style.width = (scrolled * 100) + '%';
});

// Parallax orbs on mouse move
const orbs = document.querySelectorAll('.orb');
window.addEventListener('mousemove', (e)=>{
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  orbs.forEach((o,i)=> o.style.transform = `translate(${x*(i? -1:1)}px, ${y*(i? 1:-1)}px)`);
});

// Button ripple
document.querySelectorAll('[data-ripple]').forEach(btn => {
  btn.addEventListener('click', function(e){
    const rect = this.getBoundingClientRect();
    const r = Math.max(rect.width, rect.height);
    const circle = document.createElement('span');
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.pointerEvents = 'none';
    circle.style.width = circle.style.height = r + 'px';
    circle.style.left = (e.clientX - rect.left - r/2) + 'px';
    circle.style.top = (e.clientY - rect.top - r/2) + 'px';
    circle.style.background = 'rgba(255,255,255,.2)';
    circle.style.transform = 'scale(0)';
    circle.style.transition = 'transform .5s, opacity .6s';
    this.appendChild(circle);
    requestAnimationFrame(()=>circle.style.transform = 'scale(1)');
    setTimeout(()=>{circle.style.opacity='0'; setTimeout(()=>circle.remove(), 300)}, 250);
  });
});

// Contact helpers (copy email)
document.getElementById('copyEmail')?.addEventListener('click', async () => {
  try{
    await navigator.clipboard.writeText(contactEmail);
    showToast('Email copied');
  }catch(e){ showToast('Copy failed'); }
});
