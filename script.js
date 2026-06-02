document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('[data-animate="reveal"]');

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all
    reveals.forEach(el => el.classList.add('show'));
    return;
  }

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        if (delay > 0) {
          setTimeout(() => el.classList.add('show'), delay);
        } else {
          el.classList.add('show');
        }
        observer.unobserve(el);
      }
    });
  }, { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

  reveals.forEach(el => io.observe(el));
});
