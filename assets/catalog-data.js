(() => {
  const products = [
    {
      image: 'assets/canivete-personalizado.webp',
      alt: 'Canivete com cabo de madeira e gravação personalizada',
      category: 'Personalização em madeira',
      title: 'Canivete com gravação',
      description: 'Exemplo de gravação de nome em cabo de madeira.'
    },
    {
      image: 'assets/brindes-evento-atual.webp',
      alt: 'Brinde personalizado em uma decoração de evento',
      category: 'Eventos e brindes',
      title: 'Gravação a laser em eventos',
      description: 'Personalização ao vivo em copos e brindes para eventos.'
    },
    {
      image: 'assets/presentes-professores-atual.webp',
      alt: 'Kit de presentes coloridos personalizados para o Dia dos Professores',
      category: 'Papelaria e presentes',
      title: 'Presentes para professores',
      description: 'Kits, cadernos, canecas e lembranças personalizadas.'
    },
    {
      image: 'assets/lembrancinhas-potes-atual.webp',
      alt: 'Potes de lembrancinha com biscoitos, laços e tags personalizadas',
      category: 'Lembrancinhas personalizadas',
      title: 'Potes com laços e tags',
      description: 'Lembranças embaladas com carinho e identidade personalizada.'
    },
    {
      image: 'assets/xicaras-personalizadas-atual.webp',
      alt: 'Xícara e pires personalizados para evento comemorativo',
      category: 'Canecas e utilidades',
      title: 'Xícaras personalizadas',
      description: 'Peças personalizadas para encontros, eventos e ocasiões especiais.'
    },
    {
      image: 'assets/kit-dia-dos-pais-atual.webp',
      alt: 'Kit personalizado para o Dia dos Pais com tábua, caneca e conjunto de facas',
      category: 'Kits para presentear',
      title: 'Kit especial para o Dia dos Pais',
      description: 'Conjunto para presentear com itens personalizados.'
    },
    {
      image: 'assets/broche-magnetico-atual.webp',
      alt: 'Broches magnéticos personalizados em acabamento dourado e prateado',
      category: 'Identificação personalizada',
      title: 'Broche magnético',
      description: 'Broches personalizados com acabamento metálico.'
    },
    {
      image: 'assets/bolsa-pvc-personalizada-atual.webp',
      alt: 'Bolsa transparente de PVC com alças e fecho de botão',
      category: 'Bolsas e lembranças',
      title: 'Bolsa de PVC transparente',
      description: 'Bolsa leve com fecho de botão e opção de personalização.'
    },
    {
      image: 'assets/gravacao-laser-madeira.jpeg',
      alt: 'Retrato e mensagem gravados a laser em uma placa de madeira',
      category: 'Gravação a laser',
      title: 'Gravação em madeira',
      description: 'Retratos e mensagens marcantes gravados em madeira.'
    },
    {
      image: 'assets/papel-sulfite-a4.webp',
      alt: 'Caixas e resmas de papel sulfite A4 em uma mesa de escritório',
      category: 'Papelaria',
      title: 'Papel sulfite A4',
      description: 'Papel A4 para impressões e uso no dia a dia.'
    }
  ];

  window.ATF_PRODUCTS = products;

  document.querySelectorAll('[data-product-list]').forEach(list => {
    products.forEach(product => {
      const card = document.createElement('article');
      card.className = 'product-card';
      const image = document.createElement('img');
      image.className = 'product-photo';
      image.src = product.image;
      image.alt = product.alt;
      image.loading = list.dataset.productList === 'home-carousel' && list.children.length < 2 ? 'eager' : 'lazy';
      image.decoding = 'async';
      card.append(image);

      if (product.gallery?.length) {
        const gallery = document.createElement('div');
        gallery.className = 'product-gallery';
        gallery.setAttribute('aria-label', `Mais fotos: ${product.title}`);
        [ { image: product.image, alt: product.alt }, ...product.gallery ].forEach((photo, index) => {
          const thumb = document.createElement('button');
          thumb.type = 'button';
          thumb.className = 'product-thumb';
          thumb.setAttribute('aria-label', `Ver foto ${index + 1} de ${product.title}`);
          thumb.setAttribute('aria-pressed', String(index === 0));
          const preview = document.createElement('img');
          preview.src = photo.image;
          preview.alt = '';
          preview.loading = 'lazy';
          thumb.append(preview);
          thumb.addEventListener('click', () => {
            image.src = photo.image;
            image.alt = photo.alt;
            gallery.querySelectorAll('.product-thumb').forEach(button => button.setAttribute('aria-pressed', String(button === thumb)));
          });
          gallery.append(thumb);
        });
        card.append(gallery);
      }

      const info = document.createElement('div');
      info.className = 'product-info';
      const category = document.createElement('span');
      category.className = 'product-type';
      category.textContent = product.category;
      const title = document.createElement(list.dataset.productList === 'products' ? 'h2' : 'h3');
      title.textContent = product.title;
      const description = document.createElement('p');
      description.textContent = product.description;
      info.append(category, title, description);
      card.append(info);
      list.append(card);
    });
  });

  const stage = document.querySelector('#showcase-stage');
  const dots = document.querySelector('#showcase-dots');
  if (!stage || !dots || !products.length) return;

  const roles = ['left', 'active', 'right'];
  const cards = roles.map(role => {
    const card = document.createElement('div');
    card.className = `showcase-card showcase-card--${role}`;
    const image = document.createElement('img');
    image.alt = '';
    card.append(image);
    stage.append(card);
    return card;
  });
  let activeIndex = 0;
  const dotButtons = products.map((product, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'showcase-dot';
    button.setAttribute('aria-label', `Mostrar ${product.title}`);
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      activeIndex = index;
      renderShowcase();
      stopShowcase();
      startShowcase();
    });
    dots.append(button);
    return button;
  });
  const categoryLabel = document.querySelector('#showcase-category');
  const titleLabel = document.querySelector('#showcase-title');
  const carousel = stage.closest('.hero-showcase');

  function renderShowcase(animate = true) {
    cards.forEach((card, slot) => {
      const offset = slot - 1;
      const index = (activeIndex + offset + products.length) % products.length;
      const image = card.querySelector('img');
      const nextImage = products[index].image;
      const nextAlt = slot === 1 ? products[index].alt : '';
      image.loading = slot === 1 ? 'eager' : 'lazy';
      image.decoding = 'async';
      image.fetchPriority = slot === 1 ? 'high' : 'low';
      window.clearTimeout(card.imageTimer);
      if (animate && image.getAttribute('src') && image.getAttribute('src') !== nextImage) {
        image.classList.add('is-changing');
        card.imageTimer = window.setTimeout(() => {
          image.src = nextImage;
          image.alt = nextAlt;
          window.requestAnimationFrame(() => image.classList.remove('is-changing'));
        }, 260);
      } else {
        image.src = nextImage;
        image.alt = nextAlt;
        image.classList.remove('is-changing');
      }
      card.setAttribute('aria-hidden', slot === 1 ? 'false' : 'true');
      card.className = `showcase-card showcase-card--${roles[slot]}`;
    });
    categoryLabel.textContent = products[activeIndex].category;
    titleLabel.textContent = products[activeIndex].title;
    dotButtons.forEach((button, index) => button.setAttribute('aria-pressed', String(index === activeIndex)));
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer;
  function stopShowcase() {
    window.clearInterval(timer);
    timer = undefined;
  }
  function startShowcase() {
    stopShowcase();
    if (reducedMotion || document.hidden || carousel.matches(':hover') || carousel.matches(':focus-within')) return;
    timer = window.setInterval(() => {
      activeIndex = (activeIndex + 1) % products.length;
      renderShowcase();
    }, 5200);
  }

  renderShowcase(false);
  carousel.addEventListener('pointerenter', stopShowcase);
  carousel.addEventListener('pointerleave', startShowcase);
  carousel.addEventListener('focusin', stopShowcase);
  carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) startShowcase(); });
  document.addEventListener('visibilitychange', () => document.hidden ? stopShowcase() : startShowcase());
  startShowcase();
})();
