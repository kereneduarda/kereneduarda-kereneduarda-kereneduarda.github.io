document.addEventListener('DOMContentLoaded', () => {

  /* MENU MOBILE  */
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');

  if (menuIcon && navbar) {
    menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    };
  }

  /*  SCROLL + ANIMAÇÕES  */
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('header nav a');
  const header = document.querySelector('header');
  const rodape = document.querySelector('footer');

  window.addEventListener('scroll', () => {
    const top = window.scrollY;

    sections.forEach(sec => {
      const offset = sec.offsetTop - 300;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (top >= offset && top < offset + height) {
        navLinks.forEach(link => link.classList.remove('active'));

        const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
        if (activeLink) activeLink.classList.add('active');

        sec.classList.add('show-animate');
      } else {
        if (top < offset - 500 || top > offset + height + 500) {
          sec.classList.remove('show-animate');
        }
      }
    });

    if (header) header.classList.toggle('sticky', top > 100);

    if (menuIcon && navbar) {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    }

    if (rodape) {
      const rodapeOffset = rodape.offsetTop;
      if (top + window.innerHeight > rodapeOffset + 100) {
        rodape.classList.add('show-animate');
      } else {
        rodape.classList.remove('show-animate');
      }
    }
  });

  /*  ANIMAÇÃO INICIAL */
  window.addEventListener('load', () => {
    const top = window.scrollY;

    sections.forEach(sec => {
      const offset = sec.offsetTop - 300;
      const height = sec.offsetHeight;

      if (top >= offset && top < offset + height) {
        sec.classList.add('show-animate');
      }
    });

    const contato = document.querySelector('.contato');
    if (contato) contato.classList.add('show-animate');
  });

  /*  FORM + POPUP  */
  const form = document.getElementById('form-contato');
  const popup = document.getElementById('popup-sucesso');
  const fecharPopup = document.getElementById('fechar-popup');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      emailjs.sendForm(
        "service_im52q3o",
        "template_0qt0i8q",
        this,
        "a5EAC_9Kv0oYgUaJ3"
      )
      .then(() => {
        form.reset();
        if (popup) popup.classList.add('ativo');
      })
      .catch(error => {
        console.error("EmailJS error:", error);
        alert("Erro ao enviar. Tente novamente.");
      });
    });
  }

  if (fecharPopup && popup) {
    fecharPopup.addEventListener('click', () => {
      popup.classList.remove('ativo');
    });
  }

  /*  CARROSSEL  */
  initCarousel(); 

});


/*  FUNÇÃO CARROSSEL  */
function initCarousel() {

  const carousel = document.querySelector('.carousel');
  const btnPrev = document.querySelector('.carousel-btn.prev');
  const btnNext = document.querySelector('.carousel-btn.next');
  const indicators = document.querySelectorAll('.indicator');
  const cards = document.querySelectorAll('.tool-card');

  if (!carousel || !btnPrev || !btnNext || indicators.length === 0 || cards.length === 0) return;

  let cardWidth = cards[0].offsetWidth + 40; 
  let currentIndex = 0;
  let isScrolling = false;

  function updateIndicators() {
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentIndex);
    });
  }

  function scrollToIndex(index) {
    if (isScrolling) return;

    isScrolling = true;
    currentIndex = Math.max(0, Math.min(index, indicators.length - 1));

    carousel.scrollTo({
      left: currentIndex * cardWidth,
      behavior: 'smooth'
    });

    updateIndicators();

    setTimeout(() => {
      isScrolling = false;
    }, 500);
  }

  btnNext.addEventListener('click', () => {
    if (currentIndex < indicators.length - 1) {
      scrollToIndex(currentIndex + 1);
    } else {
      scrollToIndex(0);
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    } else {
      scrollToIndex(indicators.length - 1);
    }
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      scrollToIndex(index);
    });
  });

  carousel.addEventListener('scroll', () => {
    const scrollPosition = carousel.scrollLeft;
    const newIndex = Math.round(scrollPosition / cardWidth);

    if (newIndex !== currentIndex && !isScrolling) {
      currentIndex = newIndex;
      updateIndicators();
    }
  });

  // Swipe mobile
  let touchStartX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < indicators.length - 1) {
        scrollToIndex(currentIndex + 1);
      } else if (diff < 0 && currentIndex > 0) {
        scrollToIndex(currentIndex - 1);
      }
    }
  }, { passive: true });

  // Atualiza largura no resize
  window.addEventListener('resize', () => {
    cardWidth = cards[0].offsetWidth + 40; 
  });

  updateIndicators();
}

