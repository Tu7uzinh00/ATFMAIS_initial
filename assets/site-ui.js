(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.hero-copy, .hero-showcase, .section-head, .value-item, .step, .kit-panel, .faq-list details, .contact-copy, .form-card, .catalog-grid .product-card, .products .product-card'
  );
  if (!targets.length) return;

  document.body.classList.add('reveal-enabled');
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });

  targets.forEach((target, index) => {
    target.classList.add('reveal-item');
    target.style.setProperty('--reveal-delay', `${(index % 4) * 55}ms`);
    observer.observe(target);
  });
})();
