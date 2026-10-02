/**
 * Project Viajes Chile - Interactive App Script
 * Author: Jose Manuel Perdomo
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Toast Notification Helper
  let toastTimer = null;
  const showToast = (message, icon = '✓') => {
    let toast = document.getElementById('toastMsg');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastMsg';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span style="color: #38bdf8; font-size: 1.15rem;">${icon}</span> <span>${message}</span>`;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  // 2. Sticky Header Effect on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Hero Carousel Slider (carousel1, carousel2, carousel3)
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-nav-dot');
  let currentSlide = 0;
  let slideInterval = null;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    });
  });

  if (slides.length > 0) {
    slideInterval = setInterval(nextSlide, 5000);
  }

  // 5. Destination Modal Details
  const destModal = document.getElementById('destModal');
  const destModalImg = document.getElementById('destModalImg');
  const destModalTitle = document.getElementById('destModalTitle');
  const destModalDesc = document.getElementById('destModalDesc');
  const destModalClose = document.getElementById('destModalClose');

  const destButtons = document.querySelectorAll('.dest-link-btn');
  destButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.dest-card');
      const img = card?.querySelector('.dest-img')?.src;
      const title = card?.querySelector('.dest-title')?.textContent;
      const desc = card?.querySelector('.dest-desc')?.textContent;

      if (destModal && destModalImg && destModalTitle && destModalDesc) {
        destModalImg.src = img || '';
        destModalImg.alt = title || '';
        destModalTitle.textContent = title || '';
        destModalDesc.textContent = `${desc} Este paquete de expedición incluye traslados exclusivos, alojamiento sustentable, guía certificado por Sernatur y equipamiento técnico para la ruta.`;
        destModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (destModal) {
      destModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  destModalClose?.addEventListener('click', closeModal);
  destModal?.addEventListener('click', (e) => {
    if (e.target === destModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && destModal?.classList.contains('active')) {
      closeModal();
    }
  });

  // 6. Travel Planner Booking Form Handling
  const plannerForm = document.getElementById('plannerForm');
  if (plannerForm) {
    plannerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const destination = document.getElementById('selectDest')?.value || 'Chile';
      showToast(`¡Solicitud recibida para ${destination}! Un asesor de expedición te contactará hoy.`, '🏔️');
      plannerForm.reset();
    });
  }
});
