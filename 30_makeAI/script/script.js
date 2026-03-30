 // ── Cursor ──
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .product-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
 
  // ── Marquee ──
  const items = [
    'Vegan Certified', 'Natural Ingredients', 'Cruelty Free',
    'Dermatologist Tested', 'Sustainable Beauty', 'K-Beauty Innovation',
    'Clean Formula', 'Sensory Experience'
  ];
  const track = document.getElementById('marqueeTrack');
  const set = [...items, ...items]; // 두 번 반복으로 무한 루프
  set.forEach((text, i) => {
    const span = document.createElement('span');
    span.className = 'marquee-item';
    span.innerHTML = `<span class="marquee-dot"></span>${text}`;
    track.appendChild(span);
  });
  // 정확히 50% 지점에서 반복
  track.style.width = 'max-content';
 
  // ── Scroll Reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
 
  // ── Newsletter ──
  document.querySelector('.newsletter-btn').addEventListener('click', () => {
    const input = document.querySelector('.newsletter-input');
    if (input.value.includes('@')) {
      input.value = '구독해 주셔서 감사합니다 ✨';
      input.style.color = 'var(--rose)';
    } else {
      input.style.borderColor = 'var(--rose)';
      setTimeout(() => input.style.borderColor = '', 1200);
    }
  });
 
  // ── Parallax Hero ──
  window.addEventListener('scroll', () => {
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
      const scrolled = window.scrollY;
      heroImg.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
  });