// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling
const lenis = new Lenis({ smoothWheel: true });
function raf(t){ lenis.raf(t); requestAnimationFrame(raf) }
requestAnimationFrame(raf);

// AOS
AOS.init({ duration: 700, once: true, offset: 80 });

// Tilt cards
document.querySelectorAll('[data-tilt]').forEach(el =>
  VanillaTilt.init(el, { max: 8, glare: true, 'max-glare': .2, speed: 500 })
);

// Hero slider
new Swiper('.hero-swiper', {
  slidesPerView: 1,
  effect: 'fade',
  autoplay: { delay: 2800 },
  loop: true,
  pagination: { el: '.hero-swiper .swiper-pagination', clickable: true }
});

// Showreel slider
new Swiper('.showreel-swiper', {
  effect: 'coverflow',
  centeredSlides: true,
  slidesPerView: 1,
  loop: true,
  grabCursor: true,
  coverflowEffect: { rotate: 0, stretch: 0, depth: 120, modifier: 2, slideShadows: false },
  pagination: { el: '.showreel-swiper .swiper-pagination', clickable: true },
  breakpoints: { 760:{slidesPerView:2}, 1024:{slidesPerView:3} }
});

// Count-up stats
const counters = document.querySelectorAll('[data-countup]');
const obs = new IntersectionObserver((entries,o)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const el = entry.target, target = +el.dataset.countup, dur = 1200, t0 = performance.now();
    (function tick(t){ const p = Math.min((t - t0)/dur,1); el.textContent = Math.floor(p*target); if(p<1) requestAnimationFrame(tick); })(t0);
    o.unobserve(el);
  });
},{threshold:.6});
counters.forEach(c=>obs.observe(c));

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
  const q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a'), icon = item.querySelector('.indicator');
  q.addEventListener('click', ()=>{
    const open = a.style.display === 'block';
    document.querySelectorAll('.faq-a').forEach(el=>el.style.display='none');
    document.querySelectorAll('.faq-q .indicator').forEach(el=>el.textContent='+');
    if(!open){ a.style.display='block'; if(icon) icon.textContent='–'; }
  });
});

// Pricing buttons → mailto
const contactEmail = 'hello@thedatingagency.example';
document.querySelectorAll('.choose').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const plan = btn.dataset.plan || 'General Enquiry';
    const subject = encodeURIComponent(`Enquiry about ${plan}`);
    const body = encodeURIComponent(`Hi,\n\nI'm interested in the ${plan} programme. Please share next steps.\n\nThanks!`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  });
});

// Toast + copy email
function showToast(text){
  const el = document.getElementById('toast');
  el.textContent = text;
  el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'), 2200);
}
document.getElementById('copyEmail')?.addEventListener('click', async ()=>{
  try{ await navigator.clipboard.writeText(contactEmail); showToast('Email copied'); }
  catch{ showToast('Copy failed'); }
});

// Scroll progress
const progress = document.getElementById('progress');
addEventListener('scroll', ()=>{
  const h = document.documentElement;
  progress.style.width = (h.scrollTop/(h.scrollHeight - h.clientHeight))*100 + '%';
});

// Parallax orbs
const orbs = document.querySelectorAll('.orb');
addEventListener('mousemove', e=>{
  const x = (e.clientX / innerWidth - .5) * 10;
  const y = (e.clientY / innerHeight - .5) * 10;
  orbs.forEach((o,i)=> o.style.transform = `translate(${x*(i? -1:1)}px, ${y*(i? 1:-1)}px)`);
});

// Button ripple
document.querySelectorAll('[data-ripple]').forEach(btn=>{
  btn.addEventListener('click', function(e){
    const r = Math.max(this.clientWidth, this.clientHeight);
    const circle = document.createElement('span');
    const rect = this.getBoundingClientRect();
    Object.assign(circle.style, {
      position:'absolute', width:r+'px', height:r+'px', left:(e.clientX-rect.left-r/2)+'px',
      top:(e.clientY-rect.top-r/2)+'px', background:'rgba(255,255,255,.2)', borderRadius:'50%',
      transform:'scale(0)', transition:'transform .5s, opacity .6s', pointerEvents:'none'
    });
    this.appendChild(circle);
    requestAnimationFrame(()=>circle.style.transform='scale(1)');
    setTimeout(()=>{circle.style.opacity='0'; setTimeout(()=>circle.remove(), 300)}, 250);
  });
});

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();
