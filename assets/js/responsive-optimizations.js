// Optimisations responsive pour le site
document.addEventListener('DOMContentLoaded', function() {
  // Réduire le nombre de particules sur mobile
  optimizeParticles();
  
  // Optimiser les animations sur appareils mobiles
  detectTouchDevice();
  
  // Améliorer la navigation tactile 
  enhanceTouchNavigation();
  
  // Optimiser le comportement des cartes sur mobile
  optimizeCards();
  
  // Gestion du menu mobile
  handleMobileMenu();
  
  // Améliorer le swiper de la section About
  enhanceAboutSwiper();
});

// Réduire le nombre de particules sur mobile pour de meilleures performances
function optimizeParticles() {
  if (window.innerWidth <= 768) {
    // Trouver tous les conteneurs de particules
    const particleContainers = [
      '.hero-particle-container',
      '.about-particles',
      '.gallery-particles'
    ];
    
    particleContainers.forEach(containerSelector => {
      const container = document.querySelector(containerSelector);
      if (container) {
        // Réduire le nombre de particules pour les appareils mobiles
        const particles = container.querySelectorAll('div');
        if (particles.length > 20) {
          // Ne conserver qu'un tiers des particules sur mobile
          for (let i = 0; i < particles.length; i++) {
            if (i % 3 !== 0) {
              particles[i].style.display = 'none';
            }
          }
        }
      }
    });
  }
}

// Détecter les appareils tactiles et adapter le comportement
function detectTouchDevice() {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
    document.body.classList.add('touch-device');
    
    // Convertir les effets hover en effets de tap pour appareils tactiles
    const hoverElements = document.querySelectorAll('.btn-discover, .read-more, .card-icon, .stat-card');
    
    hoverElements.forEach(element => {
      element.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      });
      
      element.addEventListener('touchend', function() {
        // Petit délai avant de retirer la classe pour que l'animation soit visible
        setTimeout(() => {
          this.classList.remove('touch-active');
        }, 300);
      });
    });
  }
}

// Améliorer la navigation tactile
function enhanceTouchNavigation() {
  // Rendre les boutons de navigation plus grands sur mobile
  if (window.innerWidth <= 768) {
    const navButtons = document.querySelectorAll('.swiper-button-prev, .swiper-button-next, .overlay-nav button');
    
    navButtons.forEach(button => {
      button.style.width = '44px';  // Taille minimum recommandée pour les cibles tactiles
      button.style.height = '44px';
    });
  }
  
  // Ajouter un feedback tactile pour les boutons de navigation
  const clickableElements = document.querySelectorAll('button, .btn-discover, .btn-flip, .read-more');
  
  clickableElements.forEach(element => {
    element.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.97)';
    });
    
    element.addEventListener('touchend', function() {
      this.style.transform = '';
    });
  });
}

// Optimiser le comportement des cartes sur mobile
function optimizeCards() {
  if (window.innerWidth <= 768) {
    // Simplifier l'effet 3D pour de meilleures performances
    const cards = document.querySelectorAll('.features-card');
    
    cards.forEach(card => {
      // Remplacer l'effet 3D complexe par un effet plus simple sur mobile
      const originalMouseMove = card.onmousemove;
      card.onmousemove = null;
      
      card.addEventListener('touchstart', function() {
        this.style.transform = 'translateY(-10px)';
      });
      
      card.addEventListener('touchend', function() {
        this.style.transform = '';
      });
    });
    
    // Adapter les cartes flippables pour tactile
    const flipButtons = document.querySelectorAll('.btn-flip');
    flipButtons.forEach(button => {
      button.textContent = 'Voir plus de détails ▶'; // Texte plus explicite pour les interfaces tactiles
    });
  }
}

// Gestion du menu mobile
function handleMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navmenu ul');
  
  if (!mobileToggle || !navMenu) return;
  
  // S'assurer que le menu se ferme quand on clique sur un lien
  const menuLinks = navMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 991) {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('bi-x');
        mobileToggle.classList.add('bi-list');
      }
    });
  });
  
  // Ajouter un swipe pour fermer le menu sur mobile
  let touchStartX = 0;
  navMenu.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  navMenu.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    // Si le swipe est suffisamment large vers la gauche, fermer le menu
    if (diff > 50 && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('bi-x');
      mobileToggle.classList.add('bi-list');
    }
  });
}

// Améliorer le swipe sur la section About
function enhanceAboutSwiper() {
  const aboutSwiper = document.querySelector('.about-swiper');
  if (!aboutSwiper) return;
  
  // Attendre que les composants Swiper soient complètement initialisés
  setTimeout(() => {
    // Forcer la réinitialisation du swiper si nécessaire
    const swiperInstance = aboutSwiper.swiper;
    if (swiperInstance) {
      swiperInstance.update();
    } else {
      // Réinitialiser manuellement si l'instance n'existe pas
      initAboutSwiper();
    }
    
    // Ajouter un indicateur visuel pour le swipe sur mobile
    const touchIndicator = document.createElement('div');
    touchIndicator.className = 'swipe-indicator';
    aboutSwiper.appendChild(touchIndicator);
    
    // Ajouter un événement tactile explicite pour les téléphones mobiles
    aboutSwiper.addEventListener('touchstart', function(e) {
      // Marquer le début du toucher
      this.dataset.touchStartX = e.touches[0].clientX;
    });
    
    aboutSwiper.addEventListener('touchend', function(e) {
      const touchStartX = parseInt(this.dataset.touchStartX);
      const touchEndX = e.changedTouches[0].clientX;
      const swipeDistance = touchEndX - touchStartX;
      
      // Si l'instance Swiper existe, utiliser ses méthodes
      if (this.swiper) {
        if (swipeDistance < -50) {
          this.swiper.slideNext();
        } else if (swipeDistance > 50) {
          this.swiper.slidePrev();
        }
      }
    });
  }, 1000);
} 