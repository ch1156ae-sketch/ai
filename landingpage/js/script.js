  const GOOGLE_FORM_URL = 'https://forms.gle/gWe2cqMN7JX4AcdP9';

  // nav scroll effect
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  // reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // hero initial reveal
  document.querySelectorAll('.hero-left > *').forEach((el, i) => {
    el.classList.add('reveal');
    setTimeout(() => el.classList.add('visible'), 200 + i * 120);
  });
  setTimeout(() => {
    document.querySelector('.hero-visual')?.classList.add('reveal', 'visible');
  }, 400);

  // modal
  const formModal = document.getElementById('formModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const googleFormFrame = document.getElementById('googleFormFrame');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  function openModal() {
    formModal.classList.add('active');
    formModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    googleFormFrame.src = GOOGLE_FORM_URL;
  }

  function closeModal() {
    formModal.classList.remove('active');
    formModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    googleFormFrame.src = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  closeModalBtn.addEventListener('click', closeModal);

  formModal.addEventListener('click', (e) => {
    if (e.target === formModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formModal.classList.contains('active')) {
      closeModal();
    }
  });