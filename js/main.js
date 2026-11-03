(() => {
  const config = window.SITE_CONFIG || {};
  document.querySelectorAll('[data-person="name"]').forEach(el => { el.textContent = config.name || 'Your Name'; });
  document.querySelectorAll('[data-email]').forEach(link => { const email = config.email || ''; link.href = email.includes('@') ? 'mailto:' + email : '#contact'; });
  document.querySelectorAll('[data-phone]').forEach(link => {
    const displayPhone = String(config.phone || '').trim();
    const phone = displayPhone.replace(/[^\d+]/g, '');
    link.href = phone ? `tel:${phone}` : '#contact';
    link.textContent = displayPhone || 'Phone not configured';
  });
  document.querySelectorAll('[data-social]').forEach(link => {
    const platform = link.dataset.social;
    const url = config.profiles && config.profiles[platform];
    if (url && /^https:\/\//i.test(url)) { link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    else { link.href = '#contact'; link.setAttribute('aria-label', `${platform === 'x' ? 'X' : 'LinkedIn'} profile URL not configured`); }
  });
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-nav');
  if (menuButton && navigation) {
    const menuLabel = menuButton.querySelector('.sr-only');
    const setMenuOpen = open => {
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      if (menuLabel) menuLabel.textContent = open ? 'Close navigation' : 'Open navigation';
      navigation.classList.toggle('open', open);
    };
    menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
    navigation.addEventListener('click', event => { if (event.target.closest('a')) setMenuOpen(false); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation.classList.contains('open')) { setMenuOpen(false); menuButton.focus(); } });
  }
  document.querySelectorAll('.service-select').forEach(button => button.addEventListener('click', () => { const service = document.querySelector('[name="service"]'); if (service) service.value = button.dataset.service; document.querySelector('#contact')?.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); setTimeout(() => service?.focus({preventScroll:true}), 400); }));
  document.querySelectorAll('[data-prefill]').forEach(link => link.addEventListener('click', () => { const field = document.querySelector('[name="service"]'); if (field) field.value = link.dataset.prefill; }));
  const year = document.querySelector('#year'); if (year) year.textContent = new Date().getFullYear();
  const faqItems = [...document.querySelectorAll('.faq-list details')];
  faqItems.forEach(item => item.addEventListener('toggle', () => { if (item.open) faqItems.forEach(other => { if (other !== item) other.open = false; }); }));

  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealItems = document.querySelectorAll('main > section .container');
    document.body.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => { item.classList.add('scroll-reveal'); revealObserver.observe(item); });
  }
})();
