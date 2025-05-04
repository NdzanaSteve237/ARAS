// Effets avancés pour la galerie futuriste
document.addEventListener('DOMContentLoaded', function() {
  // Créer les particules en arrière-plan
  createParticles();
  
  // Animation échelonnée des items
  animateGalleryItems();
  
  // Effet de distorsion 3D avancé
  addAdvanced3DEffect();
  
  // Reflets holographiques
  addHolographicEffects();
});

// Création des particules en arrière-plan
function createParticles() {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;
  
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  
  // Style pour le conteneur de particules
  particlesContainer.style.position = 'absolute';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.overflow = 'hidden';
  particlesContainer.style.zIndex = '1';
  particlesContainer.style.pointerEvents = 'none';
  
  gallery.appendChild(particlesContainer);
  
  // Créer les particules
  const particleCount = Math.min(window.innerWidth / 10, 50);
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    
    // Style pour chaque particule
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = Math.random() * 3 + 1 + 'px';
    particle.style.background = 'rgba(58, 123, 213, ' + (Math.random() * 0.5 + 0.1) + ')';
    particle.style.borderRadius = '50%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.filter = 'blur(' + Math.random() + 'px)';
    
    particlesContainer.appendChild(particle);
    
    // Animation de la particule
    animateParticle(particle);
  }
}

// Animation d'une particule
function animateParticle(particle) {
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 5;
  
  particle.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
  
  // Définir l'animation CSS
  const styleSheet = document.styleSheets[0];
  const keyframes = `
    @keyframes floatParticle {
      0% {
        transform: translate(0, 0);
        opacity: ${Math.random() * 0.5 + 0.1};
      }
      25% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
      }
      50% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        opacity: ${Math.random() * 0.8 + 0.2};
      }
      75% {
        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
      }
      100% {
        transform: translate(0, 0);
        opacity: ${Math.random() * 0.5 + 0.1};
      }
    }
  `;
  
  try {
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  } catch (e) {
    console.log('Animation fallback');
    // Fallback pour les navigateurs qui ne supportent pas insertRule
    const styleElement = document.createElement('style');
    styleElement.textContent = keyframes;
    document.head.appendChild(styleElement);
  }
}

// Animation échelonnée des items
function animateGalleryItems() {
  const items = document.querySelectorAll('.gallery-item');
  if (items.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Ajouter un délai progressif pour chaque item
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, index * 100);
        
        // Arrêter d'observer une fois animé
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  items.forEach(item => {
    observer.observe(item);
  });
}

// Effet de distorsion 3D avancé
function addAdvanced3DEffect() {
  const items = document.querySelectorAll('.gallery-item');
  
  items.forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Calcul d'angle avancé pour un effet plus naturel
      const angleX = y * 20; // Angle d'inclinaison en X
      const angleY = -x * 20; // Angle d'inclinaison en Y
      
      // Translation 3D pour un effet de profondeur
      const translateZ = Math.abs(x * y) * 30;
      
      // Effet de distorsion de perspective
      item.style.transform = `
        perspective(1000px)
        translateY(-10px)
        translateZ(${translateZ}px)
        rotateX(${angleX}deg)
        rotateY(${angleY}deg)
        scale3d(1.05, 1.05, 1.05)
      `;
      
      // Effet de lueur dynamique basé sur la position du curseur
      const img = item.querySelector('.gallery-img');
      if (img) {
        img.style.filter = `
          brightness(1.05)
          contrast(1.05)
          hue-rotate(${x * 5}deg)
        `;
      }
      
      // Effet d'ombre portée dynamique
      item.style.boxShadow = `
        ${-x * 20}px ${-y * 20}px 20px rgba(0, 0, 0, 0.2),
        0 15px 35px rgba(0, 0, 0, 0.3),
        0 0 15px rgba(58, 123, 213, ${0.3 + Math.abs(x * y) * 0.7})
      `;
    });
    
    item.addEventListener('mouseleave', () => {
      // Réinitialisation avec animation fluide
      item.style.transition = 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)';
      item.style.transform = '';
      item.style.boxShadow = '';
      
      const img = item.querySelector('.gallery-img');
      if (img) {
        img.style.filter = '';
      }
      
      // Supprimer la transition après l'animation pour ne pas interférer avec mousemove
      setTimeout(() => {
        item.style.transition = '';
      }, 800);
    });
  });
}

// Effets holographiques
function addHolographicEffects() {
  // Ajouter un effet holographique aux cartes
  const items = document.querySelectorAll('.gallery-item');
  
  items.forEach(item => {
    // Créer l'élément d'effet holographique
    const holoEffect = document.createElement('div');
    holoEffect.className = 'holographic-effect';
    
    // Style de l'effet holographique
    holoEffect.style.position = 'absolute';
    holoEffect.style.top = '0';
    holoEffect.style.left = '0';
    holoEffect.style.width = '100%';
    holoEffect.style.height = '100%';
    holoEffect.style.background = 'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(58,123,213,0.1) 50%, rgba(255,255,255,0) 100%)';
    holoEffect.style.opacity = '0';
    holoEffect.style.transition = 'opacity 0.3s ease';
    holoEffect.style.pointerEvents = 'none';
    holoEffect.style.zIndex = '3';
    holoEffect.style.borderRadius = '15px';
    
    item.appendChild(holoEffect);
    
    // Animation de l'effet holographique
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      holoEffect.style.opacity = '1';
      holoEffect.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(58, 123, 213, 0.2) 0%,
          rgba(58, 123, 213, 0.1) 20%,
          rgba(255, 255, 255, 0) 50%
        )
      `;
    });
    
    item.addEventListener('mouseleave', () => {
      holoEffect.style.opacity = '0';
    });
  });
  
  // Effet holographique pour l'overlay
  const overlay = document.querySelector('.gallery-overlay');
  if (overlay) {
    overlay.addEventListener('mousemove', e => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      overlay.style.background = `
        radial-gradient(
          circle at ${x * 100}% ${y * 100}%,
          rgba(15, 30, 60, 0.97) 0%,
          rgba(10, 20, 40, 0.98) 50%,
          rgba(5, 10, 20, 0.99) 100%
        )
      `;
    });
  }
} 