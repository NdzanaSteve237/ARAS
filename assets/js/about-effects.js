// Effets avancés pour la section About
document.addEventListener('DOMContentLoaded', function() {
  // Initialiser le Swiper avec des options avancées
  initAboutSwiper();
  
  // Ajouter des particules en arrière-plan
  addAboutParticles();
  
  // Ajouter un effet d'éclairage dynamique
  addLightingEffect();
  
  // Animer les éléments au scroll
  animateOnScroll();
});

// Initialisation du Swiper pour la section About
function initAboutSwiper() {
  // Attendre un court délai pour s'assurer que le DOM est pleinement chargé
  setTimeout(() => {
    try {
      // Trouver l'élément Swiper
      const swiperElement = document.querySelector('.about-swiper');
      if (!swiperElement) return;
      
      // Récupérer la configuration JSON
      const swiperConfigElement = swiperElement.querySelector('.swiper-config');
      if (!swiperConfigElement) return;
      
      // Parser la configuration
      const config = JSON.parse(swiperConfigElement.textContent);
      
      // Options supplémentaires pour le swiper
      config.on = {
        slideChangeTransitionStart: function() {
          const activeSlide = this.slides[this.activeIndex];
          if (activeSlide) {
            animateSlideContent(activeSlide);
          }
        }
      };
      
      // Initialiser le swiper directement
      const aboutSwiper = new Swiper(swiperElement, config);
      
      // Animer le premier slide manuellement
      const activeSlide = swiperElement.querySelector('.swiper-slide-active');
      if (activeSlide) {
        animateSlideContent(activeSlide);
      }
      
      // Sélectionner les boutons de navigation et ajouter des gestionnaires d'événements manuels
      const prevButton = document.querySelector('.about-swiper .swiper-button-prev');
      const nextButton = document.querySelector('.about-swiper .swiper-button-next');
      
      if (prevButton) {
        prevButton.addEventListener('click', function() {
          aboutSwiper.slidePrev();
        });
      }
      
      if (nextButton) {
        nextButton.addEventListener('click', function() {
          aboutSwiper.slideNext();
        });
      }
      
      // Ajouter une classe pour indiquer que le swiper est prêt
      swiperElement.classList.add('swiper-initialized');
      
      // Console log pour confirmer l'initialisation
      console.log('About Swiper initialized successfully');
      
    } catch (e) {
      console.error('Erreur lors de l\'initialisation du Swiper:', e);
    }
  }, 500); // Attendre 500ms
}

// Animation des éléments du slide actif
function animateSlideContent(slide) {
  if (!slide) return;
  
  const header = slide.querySelector('.slide-header');
  const title = slide.querySelector('h2');
  const paragraph = slide.querySelector('p');
  const button = slide.querySelector('.read-more');
  const shape = slide.querySelector('.slide-shape');
  
  // Réinitialiser les animations
  [header, title, paragraph, button, shape].forEach(el => {
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'none';
    }
  });
  
  // Forcer un reflow pour que l'animation se déclenche
  void slide.offsetWidth;
  
  // Animer avec un délai progressif
  setTimeout(() => {
    if (header) {
      header.style.transition = 'all 0.6s ease-out';
      header.style.opacity = '1';
      header.style.transform = 'translateY(0)';
    }
  }, 100);
  
  setTimeout(() => {
    if (title) {
      title.style.transition = 'all 0.6s ease-out';
      title.style.opacity = '1';
      title.style.transform = 'translateY(0)';
    }
  }, 300);
  
  setTimeout(() => {
    if (paragraph) {
      paragraph.style.transition = 'all 0.6s ease-out';
      paragraph.style.opacity = '1';
      paragraph.style.transform = 'translateY(0)';
    }
  }, 500);
  
  setTimeout(() => {
    if (button) {
      button.style.transition = 'all 0.6s ease-out';
      button.style.opacity = '1';
      button.style.transform = 'translateY(0)';
    }
  }, 700);
  
  setTimeout(() => {
    if (shape) {
      shape.style.transition = 'all 1s ease-out';
      shape.style.opacity = '0.7';
      shape.style.transform = 'scale(1)';
    }
  }, 800);
}

// Ajouter des particules en arrière-plan
function addAboutParticles() {
  const particlesContainer = document.querySelector('.about-particles');
  if (!particlesContainer) return;
  
  // Nombre de particules à créer
  const particleCount = 40;
  
  // Créer et ajouter les particules
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    
    // Styles des particules
    Object.assign(particle.style, {
      position: 'absolute',
      width: Math.random() * 4 + 1 + 'px',
      height: Math.random() * 4 + 1 + 'px',
      backgroundColor: 'rgba(58, 123, 213, ' + (Math.random() * 0.4 + 0.1) + ')',
      borderRadius: '50%',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      filter: 'blur(' + Math.random() * 2 + 'px)',
      boxShadow: '0 0 ' + Math.random() * 10 + 'px rgba(58, 123, 213, 0.6)',
      opacity: Math.random() * 0.7 + 0.3
    });
    
    particlesContainer.appendChild(particle);
    
    // Animer la particule
    animateParticle(particle);
  }
}

// Animation des particules
function animateParticle(particle) {
  const duration = Math.random() * 60 + 30;
  const startX = parseFloat(particle.style.left);
  const startY = parseFloat(particle.style.top);
  const amplitude = Math.random() * 10 + 5;
  
  let time = 0;
  
  function move() {
    time += 0.01;
    
    // Mouvement sinusoïdal
    const x = startX + Math.sin(time) * amplitude;
    const y = startY + Math.cos(time) * amplitude;
    
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    
    // Faire varier légèrement l'opacité
    const baseOpacity = parseFloat(particle.style.opacity) || 0.5;
    const opacityVariation = Math.sin(time * 2) * 0.2;
    particle.style.opacity = Math.max(0.2, Math.min(0.9, baseOpacity + opacityVariation));
    
    requestAnimationFrame(move);
  }
  
  move();
}

// Effet d'éclairage dynamique
function addLightingEffect() {
  const aboutSection = document.querySelector('.about');
  if (!aboutSection) return;
  
  aboutSection.addEventListener('mousemove', e => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = aboutSection.getBoundingClientRect();
    
    // Calculer la position relative à la section
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    
    // Déplacer la lueur en fonction de la position de la souris
    const glow = document.querySelector('.about-glow');
    if (glow) {
      glow.style.left = x * 100 + '%';
      glow.style.top = y * 100 + '%';
      glow.style.transform = 'translate(-50%, -50%)';
    }
  });
}

// Animation au scroll
function animateOnScroll() {
  const aboutSection = document.querySelector('.about');
  if (!aboutSection) return;
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animer le titre
        const title = aboutSection.querySelector('.section-title');
        if (title) {
          title.style.opacity = '1';
          title.style.transform = 'translateY(0)';
        }
        
        // Animer le contenu du Swiper
        const swiperContainer = aboutSection.querySelector('.about-swiper');
        if (swiperContainer) {
          swiperContainer.style.opacity = '1';
          swiperContainer.style.transform = 'translateY(0)';
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(aboutSection);
  
  // Initialiser les styles d'animation
  const title = aboutSection.querySelector('.section-title');
  if (title) {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'all 0.8s ease-out';
  }
  
  const swiperContainer = aboutSection.querySelector('.about-swiper');
  if (swiperContainer) {
    swiperContainer.style.opacity = '0';
    swiperContainer.style.transform = 'translateY(30px)';
    swiperContainer.style.transition = 'all 0.8s ease-out 0.2s';
  }
}

// Ajouter un événement pour réinitialiser le swiper lors du redimensionnement
window.addEventListener('resize', function() {
  // Utiliser un debounce pour éviter les appels multiples
  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(function() {
    // Réinitialiser le swiper
    initAboutSwiper();
  }, 250);
}); 