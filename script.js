
// ========================================
// 1. MOBILE NAVIGATION
// ========================================

const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}


// ========================================
// 2. HERO SLIDER
// ========================================

const slides = [...document.querySelectorAll('.slide')];
const progress = document.querySelector('#slider-progress');
const currentLabel = document.querySelector('#current-slide');

const duration = 6500;
let current = Math.max(
  0,
  slides.findIndex((slide) => slide.classList.contains('active'))
);

let autoTimer;

function showSlide(index) {
  if (!slides.length) return;

  slides[current]?.classList.remove('active');

  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');

  if (currentLabel) {
    currentLabel.textContent = String(current + 1).padStart(2, '0');
  }

  if (progress) {
    progress.style.transition = 'none';
    progress.style.width = '0';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        progress.style.transition = `width ${duration}ms linear`;
        progress.style.width = '100%';
      });
    });
  }
}

function nextSlide() {
  showSlide(current + 1);
}

function previousSlide() {
  showSlide(current - 1);
}

function restartSlider() {
  clearInterval(autoTimer);

  if (slides.length > 1) {
    autoTimer = setInterval(nextSlide, duration);
  }
}

document.querySelector('#next-slide')?.addEventListener('click', () => {
  nextSlide();
  restartSlider();
});

document.querySelector('#prev-slide')?.addEventListener('click', () => {
  previousSlide();
  restartSlider();
});

if (slides.length) {
  showSlide(current);
  restartSlider();
}


// ========================================
// 3. WHATSAPP SETTINGS
// ========================================

// Format nomor: kode negara + nomor telepon
// Tanpa tanda +, spasi, atau tanda hubung.

const WHATSAPP_NUMBER = '6285750098738';

const whatsappOrder = document.querySelector('#whatsapp-order');
const floatingWhatsApp = document.querySelector('#floating-whatsapp');

function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Tombol pesan utama
if (whatsappOrder) {
  whatsappOrder.href = whatsappLink(
    'Halo, saya ingin memesan makanan.'
  );
}

// Tombol WhatsApp mengambang
if (floatingWhatsApp) {
  floatingWhatsApp.href = whatsappLink(
    'Halo, saya ingin bertanya tentang menu hari ini.'
  );
}

// Tombol pesan setiap menu
document.querySelectorAll('[data-order]').forEach((link) => {
  link.addEventListener('click', () => {
    const menuName = link.dataset.order;

    if (whatsappOrder) {
      whatsappOrder.href = whatsappLink(
        `Halo, saya ingin memesan ${menuName}. Apakah masih tersedia?`
      );
    }
  });
});


// ========================================
// 4. FOOTER YEAR
// ========================================

const yearElement = document.querySelector('#year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ========================================
// 5. SCROLL-LINKED MENU ANIMATION
// ========================================

(() => {
  const section = document.querySelector('#menu');
  const cards = [
    ...document.querySelectorAll('.menu-grid .menu-card')
  ];

  if (!section || !cards.length) return;

  // Hormati pengaturan pengurangan animasi perangkat
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cards.forEach((card) => {
      card.style.setProperty('--fall-progress', '1');
    });

    return;
  }

  const clamp = (value, min, max) => {
    return Math.min(max, Math.max(min, value));
  };

  let scheduled = false;

  function updateMenuAnimation() {
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const start = viewportHeight * 0.92;
    const finish = viewportHeight * 0.28;

    const progressValue = clamp(
      (start - rect.top) / (start - finish),
      0,
      1
    );

    cards.forEach((card, index) => {
      const stagger = index * 0.12;

      const localProgress = clamp(
        (progressValue - stagger) / (1 - stagger),
        0,
        1
      );

      card.style.setProperty(
        '--fall-progress',
        localProgress.toFixed(3)
      );

      card.classList.toggle(
        'is-settled',
        localProgress > 0.98
      );
    });

    scheduled = false;
  }

  function requestUpdate() {
    if (!scheduled) {
      requestAnimationFrame(updateMenuAnimation);
      scheduled = true;
    }
  }

  window.addEventListener('scroll', requestUpdate, {
    passive: true
  });

  window.addEventListener('resize', requestUpdate);

  updateMenuAnimation();
})();
