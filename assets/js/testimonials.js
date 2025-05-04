// Script pour les animations et fonctionnalités des témoignages
document.addEventListener('DOMContentLoaded', function() {
  // Initialiser le slider Swiper avec des options avancées
  const testimonialSwiper = new Swiper('.testimonials-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 800,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    on: {
      slideChange: function() {
        // Ajouter une petite animation à la carte active
        setTimeout(() => {
          const activeSlide = document.querySelector('.swiper-slide-active .testimonial-card');
          if (activeSlide) {
            activeSlide.style.transform = 'translateY(-10px)';
            setTimeout(() => {
              activeSlide.style.transform = '';
            }, 300);
          }
        }, 50);
      }
    }
  });
  
  // Effet de parallaxe pour la grille de fond
  window.addEventListener('mousemove', function(e) {
    const grid = document.querySelector('.testimonials-grid');
    if (!grid) return;
    
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Déplacer légèrement la grille en fonction de la position de la souris
    grid.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
  });
  
  // Animation des cartes au survol
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      const glow = this.querySelector('.author-glow');
      if (glow) glow.style.opacity = '1';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      const glow = this.querySelector('.author-glow');
      if (glow) glow.style.opacity = '0';
    });
  });
  
  // Créer un effet de lueur aléatoire sur l'une des cartes
  function randomGlow() {
    const cards = document.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomCard = cards[randomIndex];
    
    // Ajouter une brève animation de lueur
    randomCard.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(58, 123, 213, 0.5)';
    
    setTimeout(() => {
      randomCard.style.boxShadow = '';
    }, 1000);
    
    // Répéter à un intervalle aléatoire
    setTimeout(randomGlow, Math.random() * 5000 + 3000);
  }
  
  // Démarrer l'effet de lueur après un délai
  setTimeout(randomGlow, 3000);
});

// Fonction pour s'assurer que les images sont correctement chargées
function fixTestimonialImages() {
  const images = document.querySelectorAll('.author-image img');
  
  images.forEach(img => {
    // Vérifier si l'image a une dimension
    if (img.naturalWidth === 0) {
      // L'image n'est pas chargée correctement
      console.log('Image non chargée:', img.src);
      
      // Définir une image de remplacement
      img.onerror = function() {
        this.onerror = null;
        this.src = 'assets/img/default-avatar.jpg'; // Image par défaut
        this.style.opacity = '1';
      };
      
      // Réessayer de charger l'image
      const originalSrc = img.src;
      img.src = '';
      setTimeout(() => {
        img.src = originalSrc;
      }, 100);
    }
  });
}

// Exécuter après le chargement complet
window.addEventListener('load', fixTestimonialImages);
// Exécuter également après l'initialisation du Swiper
setTimeout(fixTestimonialImages, 1000); 