// Effets avancés pour la section Hero
document.addEventListener('DOMContentLoaded', function() {
  // Ajouter des particules
  createHeroParticles();
  
  // Ajouter un effet de parallaxe sur la souris
  addHeroParallax();
  
  // Animation de la lueur en fonction de la position de la souris
  addGlowEffect();
});

// Création des particules
function createHeroParticles() {
  const particleContainer = document.querySelector('.hero-particle-container');
  if (!particleContainer) return;
  
  // Nombre de particules à créer
  const particleCount = Math.min(window.innerWidth / 15, 80);
  
  // Création des particules
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    
    // Taille aléatoire
    const size = Math.random() * 3 + 1;
    
    // Style de base pour la particule
    Object.assign(particle.style, {
      position: 'absolute',
      width: size + 'px',
      height: size + 'px',
      backgroundColor: 'rgba(255, 255, 255, ' + (Math.random() * 0.3 + 0.1) + ')',
      borderRadius: '50%',
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      boxShadow: '0 0 ' + (size * 3) + 'px rgba(58, 123, 213, 0.8)',
      filter: 'blur(' + (Math.random() * 1) + 'px)',
      opacity: Math.random() * 0.8 + 0.2,
      zIndex: '4',
      pointerEvents: 'none'
    });
    
    // Ajouter la particule au conteneur
    particleContainer.appendChild(particle);
    
    // Animer la particule
    animateParticle(particle);
  }
}

// Animation d'une particule
function animateParticle(particle) {
  // Paramètres d'animation aléatoires
  const speed = Math.random() * 1.5 + 0.5;
  const angle = Math.random() * Math.PI * 2;
  const amplitude = Math.random() * 20 + 10;
  
  let startX = parseFloat(particle.style.left);
  let startY = parseFloat(particle.style.top);
  let time = Math.random() * 100; // Point de départ aléatoire
  
  function move() {
    time += speed * 0.01;
    
    // Mouvement ondulant
    const newX = startX + Math.cos(angle) * Math.sin(time) * amplitude * 0.1;
    const newY = startY + Math.sin(angle) * Math.cos(time) * amplitude * 0.05;
    
    // Appliquer la nouvelle position
    particle.style.left = newX + '%';
    particle.style.top = newY + '%';
    
    // Faire varier légèrement l'opacité
    const opacityChange = Math.sin(time * 2) * 0.2;
    const baseOpacity = parseFloat(particle.style.opacity) || 0.5;
    particle.style.opacity = Math.max(0.1, Math.min(1, baseOpacity + opacityChange * 0.1));
    
    // Continuer l'animation
    requestAnimationFrame(move);
  }
  
  move();
}

// Effet de parallaxe
function addHeroParallax() {
  const hero = document.querySelector('.hero');
  const img = document.querySelector('.hero-img');
  const content = document.querySelector('.hero-content');
  const grid = document.querySelector('.hero-grid');
  
  if (!hero || !img || !content) return;
  
  hero.addEventListener('mousemove', e => {
    // Calculer la position relative de la souris
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Appliquer le déplacement avec un facteur d'amplitude
    if (img) {
      img.style.transform = `translateX(${x * -20}px) translateY(${y * -20}px)`;
    }
    
    if (content) {
      content.style.transform = `translateX(${x * 15}px) translateY(${y * 15}px)`;
    }
    
    if (grid) {
      grid.style.transform = `translateX(${x * 5}px) translateY(${y * 5}px)`;
    }
  });
  
  // Réinitialiser la position au départ de la souris
  hero.addEventListener('mouseleave', () => {
    if (img) {
      img.style.transform = '';
    }
    
    if (content) {
      content.style.transform = '';
    }
    
    if (grid) {
      grid.style.transform = '';
    }
  });
}

// Effet de lueur qui suit la souris
function addGlowEffect() {
  const hero = document.querySelector('.hero');
  const glow = document.querySelector('.hero-glow');
  
  if (!hero || !glow) return;
  
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Déplacer légèrement la lueur vers la position de la souris
    glow.style.left = (50 + (x - 0.5) * 20) + '%';
    glow.style.top = (50 + (y - 0.5) * 20) + '%';
  });
  
  // Réinitialiser la position au départ de la souris
  hero.addEventListener('mouseleave', () => {
    glow.style.left = '50%';
    glow.style.top = '50%';
  });
} 