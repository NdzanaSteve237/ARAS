// Effets avancés pour la section Stats
document.addEventListener('DOMContentLoaded', function() {
  // Animer les cartes de statistiques
  animateStatCards();
  
  // Ajouter un effet de particules flottantes
  addStatsParticles();
  
  // Animation des nombres au survol
  addHoverNumberEffect();
});

// Animation des cartes de statistiques
function animateStatCards() {
  const statCards = document.querySelectorAll('.stat-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Ajouter un délai progressif pour chaque carte
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 150 * index);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  statCards.forEach(card => {
    // Initialiser les cartes avec une opacité nulle et une translation
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
    
    observer.observe(card);
  });
}

// Ajouter des particules flottantes
function addStatsParticles() {
  const statsSection = document.querySelector('.stats');
  if (!statsSection) return;
  
  // Création d'un conteneur pour les particules
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'stats-particles';
  particlesContainer.style.position = 'absolute';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.overflow = 'hidden';
  particlesContainer.style.zIndex = '1';
  particlesContainer.style.pointerEvents = 'none';
  
  statsSection.prepend(particlesContainer);
  
  // Créer les particules
  const particleCount = Math.min(window.innerWidth / 20, 30);
  
  for (let i = 0; i < particleCount; i++) {
    createStatParticle(particlesContainer);
  }
}

// Créer une particule individuelle
function createStatParticle(container) {
  const particle = document.createElement('div');
  
  // Style pour chaque particule
  Object.assign(particle.style, {
    position: 'absolute',
    width: Math.random() * 4 + 1 + 'px',
    height: Math.random() * 4 + 1 + 'px',
    backgroundColor: 'rgba(58, 123, 213, ' + (Math.random() * 0.3 + 0.1) + ')',
    borderRadius: '50%',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    boxShadow: '0 0 ' + Math.random() * 10 + 'px rgba(58, 123, 213, 0.5)',
    filter: 'blur(' + Math.random() * 2 + 'px)',
    opacity: Math.random() * 0.5 + 0.3,
  });
  
  container.appendChild(particle);
  
  // Animation de la particule
  animateStatParticle(particle);
}

// Animation d'une particule
function animateStatParticle(particle) {
  const speed = Math.random() * 15 + 10;
  const xMovement = Math.random() * 10 - 5;
  const yMovement = Math.random() * 10 - 5;
  
  let posX = parseFloat(particle.style.left);
  let posY = parseFloat(particle.style.top);
  let angle = Math.random() * 360;
  
  function moveParticle() {
    angle += 0.1;
    
    // Mouvement sinusoïdal pour un effet plus fluide
    posX += Math.sin(angle) * 0.2 + xMovement * 0.01;
    posY += Math.cos(angle) * 0.1 + yMovement * 0.01;
    
    // Assurer que la particule reste dans le conteneur
    if (posX < 0 || posX > 100) {
      posX = Math.max(0, Math.min(100, posX));
      xMovement *= -1;
    }
    
    if (posY < 0 || posY > 100) {
      posY = Math.max(0, Math.min(100, posY));
      yMovement *= -1;
    }
    
    particle.style.left = posX + '%';
    particle.style.top = posY + '%';
    
    // Faire varier légèrement l'opacité
    const opacity = 0.3 + Math.sin(angle) * 0.2;
    particle.style.opacity = opacity.toString();
    
    requestAnimationFrame(moveParticle);
  }
  
  moveParticle();
}

// Effet de survol sur les nombres
function addHoverNumberEffect() {
  const statCards = document.querySelectorAll('.stat-card');
  
  statCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const counter = card.querySelector('.purecounter');
      
      // Effet de grossissement subtil
      counter.style.transition = 'all 0.3s ease';
      counter.style.transform = 'scale(1.1)';
      counter.style.textShadow = '0 0 15px rgba(58, 123, 213, 0.8)';
      
      // Animation de la ligne
      const line = card.querySelector('.stat-line');
      line.style.width = '70px';
      line.style.background = 'linear-gradient(90deg, transparent, #3a7bd5, transparent)';
    });
    
    card.addEventListener('mouseleave', () => {
      const counter = card.querySelector('.purecounter');
      
      // Retour à l'état normal
      counter.style.transform = 'scale(1)';
      counter.style.textShadow = '0 0 10px rgba(58, 123, 213, 0.5)';
      
      // Réinitialisation de la ligne
      const line = card.querySelector('.stat-line');
      line.style.width = '50px';
      line.style.background = 'linear-gradient(90deg, transparent, #3a7bd5, transparent)';
    });
  });
} 