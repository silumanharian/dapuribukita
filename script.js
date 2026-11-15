const menuBtn=document.querySelector('.menu-toggle');const nav=document.querySelector('.desktop-nav');menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}));
const slides=[...document.querySelectorAll('.slide')];let current=0;let autoTimer;const progress=document.querySelector('#slider-progress');const currentLabel=document.querySelector('#current-slide');const duration=6500;let started=Date.now();
function showSlide(index){slides[current].classList.remove('active');current=(index+slides.length)%slides.length;slides[current].classList.add('active');currentLabel.textContent=String(current+1).padStart(2,'0');started=Date.now();progress.style.transition='none';progress.style.width='0';requestAnimationFrame(()=>requestAnimationFrame(()=>{progress.style.transition=`width ${duration}ms linear`;progress.style.width='100%'}));}
function next(){showSlide(current+1)}function previous(){showSlide(current-1)}document.querySelector('#next-slide').addEventListener('click',()=>{next();restart()});document.querySelector('#prev-slide').addEventListener('click',()=>{previous();restart()});
function restart(){clearInterval(autoTimer);autoTimer=setInterval(next,duration)}restart();
document.querySelectorAll('[data-order]').forEach(link=>link.addEventListener('click',()=>{const item=encodeURIComponent(link.dataset.order);document.querySelector('#whatsapp-order').href=`https://wa.me/6281234567890?text=${encodeURIComponent('Halo, saya ingin memesan '+link.dataset.order+'. Apakah masih tersedia?')}`}));document.querySelector('#year').textContent=new Date().getFullYear();
// Ganti nomor di bawah ini dengan nomor WhatsApp bisnis, format internasional tanpa tanda + atau spasi.
const WHATSAPP_NUMBER='6281234567890'; // GANTI dengan nomor WhatsApp tokomudocument.querySelector('#whatsapp-order').href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo, saya ingin memesan makanan.')}`;
const floatingWhatsApp=document.querySelector('#floating-whatsapp');
if(floatingWhatsApp) floatingWhatsApp.href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo, saya ingin bertanya tentang menu hari ini.')}`;
document.querySelectorAll('[data-order]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#whatsapp-order').href=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo, saya ingin memesan '+link.dataset.order+'. Apakah masih tersedia?')}`}));


// Scroll-linked catalogue motion. The animation reverses naturally when scrolling up.
(() => {
  const section = document.querySelector('#menu');
  const cards = [...document.querySelectorAll('.menu-grid .menu-card')];
  if (!section || !cards.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cards.forEach(card => card.style.setProperty('--fall-progress', '1'));
    return;
  }
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  let scheduled = false;
  function update() {
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    const start = vh * .92;
    const finish = vh * .28;
    const progress = clamp((start - rect.top) / (start - finish), 0, 1);
    cards.forEach((card, i) => {
      const stagger = i * .12;
      const local = clamp((progress - stagger) / (1 - stagger), 0, 1);
      card.style.setProperty('--fall-progress', local.toFixed(3));
      card.classList.toggle('is-settled', local > .98);
    });
    scheduled = false;
  }
  function onScroll() {
    if (!scheduled) { requestAnimationFrame(update); scheduled = true; }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
