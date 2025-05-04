// Effets avancés pour la section Details
document.addEventListener('DOMContentLoaded', function() {
  // Animation 3D au survol des cartes
  add3DCardEffect();
  
  // Animation des particules
  addParticleEffect();
  
  // Animation des cartes au défilement
  animateOnScroll();
  
  // Effet de parallaxe
  addParallaxEffect();
  
  // Ajouter l'effet de retournement des cartes
  addCardFlipEffect();
  
  // Améliorer l'expérience mobile
  enhanceMobileCardExperience();
  
  // Optimiser les performances des cartes
  optimizeCardPerformance();
  
  // Corriger le défilement mobile à la fin du chargement
  setTimeout(() => {
    const mobileContainer = document.querySelector('.mobile-scroll-container');
    if (mobileContainer) {
      // Forcer une mise à jour du conteneur
      mobileContainer.style.display = 'flex';
      mobileContainer.style.width = 'calc(100% + 30px)';
    }
  }, 500);
  
  // Optimiser le retournement sur mobile
  optimizeMobileCardFlip();
  
  // Ajouter l'indicateur de défilement amélioré
  enhanceMobileScrollIndicator();
  
  // Optimiser le défilement des cartes
  optimizeCardScrolling();
});

// Effet 3D au survol des cartes
function add3DCardEffect() {
  const cards = document.querySelectorAll('.features-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Calcul de l'angle de rotation
      const angle = 10; // L'angle maximum en degrés
      
      // Application de la transformation 3D
      card.style.transform = `
        perspective(1000px)
        rotateY(${x * angle}deg)
        rotateX(${-y * angle}deg)
        translateZ(10px)
      `;
      
      // Effet dynamique d'ombre portée
      card.style.boxShadow = `
        ${-x * 30}px ${-y * 30}px 30px rgba(0, 0, 0, 0.2),
        0 15px 35px rgba(0, 0, 0, 0.3),
        0 0 15px rgba(58, 123, 213, ${0.3 + Math.abs(x * y) * 0.5})
      `;
      
      // Effet de brillance sur l'image
      const image = card.querySelector('img');
      if (image) {
        image.style.transform = `scale(1.05) translateX(${x * 10}px) translateY(${y * 10}px)`;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      // Animation de retour à l'état initial
      card.style.transition = 'all 0.5s ease';
      card.style.transform = '';
      card.style.boxShadow = '';
      
      const image = card.querySelector('img');
      if (image) {
        image.style.transition = 'all 0.5s ease';
        image.style.transform = '';
      }
      
      // Suppression des transitions après l'animation
      setTimeout(() => {
        card.style.transition = '';
        if (image) image.style.transition = '';
      }, 500);
    });
  });
}

// Ajout d'effets de particules
function addParticleEffect() {
  const detailsSection = document.querySelector('.details');
  if (!detailsSection) return;
  
  // Création du conteneur de particules
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  particlesContainer.style.position = 'absolute';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.overflow = 'hidden';
  particlesContainer.style.zIndex = '1';
  particlesContainer.style.pointerEvents = 'none';
  
  detailsSection.prepend(particlesContainer);
  
  // Création des particules
  const particleCount = Math.min(window.innerWidth / 15, 40);
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

// Création d'une particule individuelle
function createParticle(container) {
  const particle = document.createElement('div');
  
  // Style de base de la particule
  Object.assign(particle.style, {
    position: 'absolute',
    width: Math.random() * 4 + 1 + 'px',
    height: Math.random() * 4 + 1 + 'px',
    backgroundColor: 'rgba(58, 123, 213, ' + (Math.random() * 0.3 + 0.1) + ')',
    borderRadius: '50%',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    filter: 'blur(' + Math.random() * 2 + 'px)',
    boxShadow: '0 0 ' + Math.random() * 10 + 'px rgba(58, 123, 213, 0.3)'
  });
  
  container.appendChild(particle);
  
  // Animation de la particule
  animateParticle(particle);
}

// Animation d'une particule
function animateParticle(particle) {
  const speed = Math.random() * 15 + 10;
  const direction = Math.random() * 360;
  let posX = parseFloat(particle.style.left);
  let posY = parseFloat(particle.style.top);
  const dx = Math.cos(direction * Math.PI / 180) * 0.1;
  const dy = Math.sin(direction * Math.PI / 180) * 0.1;
  
  function moveParticle() {
    posX += dx;
    posY += dy;
    
    // Rebondir sur les bords
    if (posX < 0 || posX > 100) {
      posX = Math.max(0, Math.min(100, posX));
      dx *= -1;
    }
    
    if (posY < 0 || posY > 100) {
      posY = Math.max(0, Math.min(100, posY));
      dy *= -1;
    }
    
    particle.style.left = posX + '%';
    particle.style.top = posY + '%';
    
    // Faire varier légèrement l'opacité
    const opacity = 0.1 + Math.random() * 0.2;
    particle.style.opacity = opacity.toString();
    
    requestAnimationFrame(moveParticle);
  }
  
  moveParticle();
}

// Animation des cartes au défilement
function animateOnScroll() {
  const cards = document.querySelectorAll('.features-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  cards.forEach(card => {
    observer.observe(card);
  });
}

// Effet de parallaxe
function addParallaxEffect() {
  const detailsBg = document.querySelector('.details-bg');
  const grid = document.querySelector('.details-grid');
  
  if (!detailsBg || !grid) return;
  
  window.addEventListener('mousemove', e => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Déplacer légèrement la grille en fonction de la position de la souris
    grid.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    
    // Autres effets parallaxes possibles
    const cards = document.querySelectorAll('.features-card');
    cards.forEach((card, index) => {
      const depth = 0.05 + (index % 3) * 0.01;
      const moveX = mouseX * depth * 100;
      const moveY = mouseY * depth * 100;
      
      card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
}

// Ajouter la fonction de retournement des cartes
function addCardFlipEffect() {
  // Sélectionner tous les boutons de retournement sur le recto
  const flipButtons = document.querySelectorAll('.btn-flip');
  
  // Sélectionner tous les boutons de retournement sur le verso
  const flipBackButtons = document.querySelectorAll('.btn-flip-back');
  
  // Ajouter l'écouteur d'événement pour les boutons du recto
  flipButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Trouver la carte parente
      const card = this.closest('.features-card');
      
      // Ajouter la classe pour retourner la carte
      card.classList.add('flipped');
      
      // Ajouter un effet de lévitation après le retournement
      setTimeout(() => {
        card.style.transform = 'rotateY(180deg) translateZ(20px)';
      }, 800);
    });
  });
  
  // Ajouter l'écouteur d'événement pour les boutons du verso
  flipBackButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Trouver la carte parente
      const card = this.closest('.features-card');
      
      // Retirer la classe pour retourner la carte
      card.classList.remove('flipped');
      card.style.transform = '';
    });
  });
  
  // Ajouter un effet de particules brillantes sur le verso des cartes
  const cardBacks = document.querySelectorAll('.card-back');
  
  cardBacks.forEach(back => {
    // Créer des particules pour chaque verso
    for (let i = 0; i < 10; i++) {
      createBackParticle(back);
    }
  });
}

// Fonction pour créer une particule brillante sur le verso
function createBackParticle(container) {
  const particle = document.createElement('div');
  
  // Styles pour les particules
  Object.assign(particle.style, {
    position: 'absolute',
    width: Math.random() * 6 + 2 + 'px',
    height: Math.random() * 6 + 2 + 'px',
    backgroundColor: 'rgba(163, 198, 255, ' + (Math.random() * 0.2 + 0.1) + ')',
    borderRadius: '50%',
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    filter: 'blur(' + Math.random() * 2 + 'px)',
    boxShadow: '0 0 ' + Math.random() * 10 + 'px rgba(163, 198, 255, 0.5)',
    zIndex: '1',
    pointerEvents: 'none'
  });
  
  container.appendChild(particle);
  
  // Animation des particules
  animateBackParticle(particle);
}

// Animation des particules du verso
function animateBackParticle(particle) {
  const duration = Math.random() * 15 + 5;
  let opacity = parseFloat(particle.style.opacity) || 0.2;
  
  // Animation de clignotement
  setInterval(() => {
    opacity = Math.random() * 0.3 + 0.1;
    particle.style.opacity = opacity;
    
    // Petite variation de position
    const currentTop = parseFloat(particle.style.top);
    const currentLeft = parseFloat(particle.style.left);
    
    particle.style.top = (currentTop + (Math.random() * 2 - 1)) + '%';
    particle.style.left = (currentLeft + (Math.random() * 2 - 1)) + '%';
  }, duration * 1000);
}

// Fonction complètement révisée pour l'expérience mobile
function enhanceMobileCardExperience() {
  console.log('Initialisation de l\'expérience mobile');
  
  // Ne s'exécute que sur mobile
  if (window.innerWidth > 768) return;
  
  // S'assurer que le conteneur mobile existe
  const detailsSection = document.querySelector('#details');
  if (!detailsSection) return;
  
  const container = detailsSection.querySelector('.container');
  if (!container) return;
  
  // Vérifier si nous avons déjà des cartes mobiles
  let mobileContainer = detailsSection.querySelector('.mobile-scroll-container');
  let mobileView = detailsSection.querySelector('.d-block.d-md-none');
  
  // Si nous n'avons pas de vue mobile ou elle est vide, créer une nouvelle
  if (!mobileView || !mobileContainer || mobileContainer.children.length === 0) {
    console.log('Création d\'une nouvelle vue mobile');
    
    // Trouver les cartes desktop
    const desktopView = detailsSection.querySelector('.d-none.d-md-block');
    if (!desktopView) return;
    
    const desktopCards = desktopView.querySelectorAll('.features-card');
    if (desktopCards.length === 0) return;
    
    // Si une vue mobile existe déjà mais est vide, la supprimer
    if (mobileView) {
      mobileView.remove();
    }
    
    // Créer une nouvelle vue mobile
    mobileView = document.createElement('div');
    mobileView.className = 'd-block d-md-none';
    mobileView.innerHTML = `
      <div class="scroll-indicator-wrapper">
        <div class="scroll-indicator-mobile">
          <i class="bi bi-chevron-right"></i><span>Faire défiler</span>
        </div>
      </div>
      <div class="mobile-scroll-wrapper">
        <div class="mobile-scroll-container"></div>
      </div>
      <div class="mobile-pagination"></div>
    `;
    
    // Ajouter la vue mobile au conteneur
    container.appendChild(mobileView);
    
    // Obtenir le nouveau conteneur
    mobileContainer = mobileView.querySelector('.mobile-scroll-container');
    const pagination = mobileView.querySelector('.mobile-pagination');
    
    // Cloner chaque carte desktop et l'ajouter à la vue mobile
    desktopCards.forEach((card, index) => {
      const mobileCard = document.createElement('div');
      mobileCard.className = 'mobile-card';
      if (index === 0) {
        mobileCard.classList.add('active');
      }
      
      // Cloner la carte
      const cardClone = card.cloneNode(true);
      mobileCard.appendChild(cardClone);
      mobileContainer.appendChild(mobileCard);
      
      // Ajouter un point de pagination
      const dot = document.createElement('span');
      dot.className = index === 0 ? 'dot active' : 'dot';
      pagination.appendChild(dot);
    });
  }
  
  // Obtenir les cartes mobiles
  const mobileCards = mobileContainer.querySelectorAll('.mobile-card');
  if (mobileCards.length === 0) return;
  
  console.log(`Trouvé ${mobileCards.length} cartes mobiles`);
  
  // Réinitialiser les écouteurs d'événements
  setupMobileCardEvents(mobileCards, mobileContainer);
  
  // Créer des flèches de navigation si elles n'existent pas déjà
  if (!detailsSection.querySelector('.mobile-navigation-arrows')) {
    const navArrows = document.createElement('div');
    navArrows.className = 'mobile-navigation-arrows';
    navArrows.innerHTML = `
      <button class="mobile-nav-prev"><i class="bi bi-chevron-left"></i></button>
      <button class="mobile-nav-next"><i class="bi bi-chevron-right"></i></button>
    `;
    detailsSection.appendChild(navArrows);
    
    // Configurer les flèches
    setupArrowNavigation(mobileCards, mobileContainer);
  }
  
  // Appliquer des hauteurs adaptées
  adjustCardHeights(mobileCards);
  
  // Forcer le rafraîchissement de l'affichage du conteneur
  setTimeout(() => {
    mobileContainer.style.display = 'flex';
    mobileContainer.scrollLeft = 0; // Revenir au début
    
    // Activer la première carte
    if (mobileCards[0]) {
      mobileCards.forEach(card => card.classList.remove('active'));
      mobileCards[0].classList.add('active');
      
      // Mettre à jour les dots
      const dots = document.querySelectorAll('.mobile-pagination .dot');
      dots.forEach((dot, i) => {
        dot.className = i === 0 ? 'dot active' : 'dot';
      });
    }
  }, 100);
}

// Configurer les événements pour les cartes mobiles
function setupMobileCardEvents(cards, container) {
  // Écouteur d'événement pour le défilement
  container.addEventListener('scroll', () => {
    // Obtenir les informations de défilement
    const containerWidth = container.clientWidth;
    const scrollLeft = container.scrollLeft;
    
    // Mettre à jour les cartes actives
    cards.forEach((card, index) => {
      const cardOffsetLeft = card.offsetLeft - container.offsetLeft;
      const cardCenter = cardOffsetLeft + card.offsetWidth / 2;
      const containerCenter = scrollLeft + containerWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      
      // Activer la carte la plus proche du centre
      if (distance < card.offsetWidth / 2) {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        
        // Mettre à jour les dots
        const dots = document.querySelectorAll('.mobile-pagination .dot');
        dots.forEach((dot, i) => {
          dot.className = i === index ? 'dot active' : 'dot';
        });
      }
    });
  });
  
  // Gérer les clics sur la pagination
  const dots = document.querySelectorAll('.mobile-pagination .dot');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      // S'assurer que la carte existe
      if (cards[index]) {
        scrollToCard(cards[index], container);
      }
    });
  });
  
  // Configurer le retournement des cartes
  cards.forEach(card => {
    const featureCard = card.querySelector('.features-card');
    if (!featureCard) return;
    
    const flipButton = featureCard.querySelector('.btn-flip');
    const backButton = featureCard.querySelector('.btn-flip-back');
    
    // Front to back
    if (flipButton) {
      flipButton.addEventListener('click', (e) => {
        e.preventDefault();
        featureCard.classList.add('flipped');
      });
    }
    
    // Back to front
    if (backButton) {
      backButton.addEventListener('click', (e) => {
        e.preventDefault();
        featureCard.classList.remove('flipped');
      });
    }
  });
}

// Configurer les flèches de navigation
function setupArrowNavigation(cards, container) {
  const prevButton = document.querySelector('.mobile-nav-prev');
  const nextButton = document.querySelector('.mobile-nav-next');
  
  if (!prevButton || !nextButton) return;
  
  prevButton.addEventListener('click', () => {
    // Trouver la carte active
    const activeIndex = Array.from(cards).findIndex(card => card.classList.contains('active'));
    const prevIndex = Math.max(0, activeIndex - 1);
    
    // Défiler vers la carte précédente
    if (cards[prevIndex]) {
      scrollToCard(cards[prevIndex], container);
    }
  });
  
  nextButton.addEventListener('click', () => {
    // Trouver la carte active
    const activeIndex = Array.from(cards).findIndex(card => card.classList.contains('active'));
    const nextIndex = Math.min(cards.length - 1, activeIndex + 1);
    
    // Défiler vers la carte suivante
    if (cards[nextIndex]) {
      scrollToCard(cards[nextIndex], container);
    }
  });
}

// Fonction pour défiler vers une carte
function scrollToCard(card, container) {
  if (!card || !container) return;
  
  // Calculer la position
  const cardOffsetLeft = card.offsetLeft - container.offsetLeft;
  const cardCenter = cardOffsetLeft + card.offsetWidth / 2;
  const containerWidth = container.clientWidth;
  const scrollTo = cardCenter - containerWidth / 2;
  
  // Effectuer le défilement
  container.scrollTo({
    left: scrollTo,
    behavior: 'smooth'
  });
}

// Ajuster les hauteurs des cartes
function adjustCardHeights(cards) {
  cards.forEach(card => {
    const featureCard = card.querySelector('.features-card');
    if (!featureCard) return;
    
    const front = featureCard.querySelector('.card-front');
    const back = featureCard.querySelector('.card-back');
    
    if (front && back) {
      // S'assurer que les deux faces sont visibles pour mesurer leur hauteur
      const frontDisplay = window.getComputedStyle(front).display;
      const backDisplay = window.getComputedStyle(back).display;
      
      // Montrer temporairement les deux faces
      front.style.display = 'flex';
      back.style.display = 'flex';
      back.style.opacity = '0';
      back.style.position = 'absolute';
      
      // Mesurer les hauteurs
      const frontHeight = front.scrollHeight;
      const backHeight = back.scrollHeight;
      const maxHeight = Math.max(frontHeight, backHeight, 570); // 570px minimum
      
      // Appliquer la hauteur maximale
      featureCard.style.minHeight = maxHeight + 'px';
      featureCard.style.height = maxHeight + 'px';
      back.style.minHeight = maxHeight + 'px';
      back.style.height = maxHeight + 'px';
      
      // Restaurer l'affichage
      front.style.display = frontDisplay;
      back.style.display = backDisplay;
      back.style.opacity = featureCard.classList.contains('flipped') ? '1' : '0';
      
      console.log(`Carte ajustée à ${maxHeight}px`);
    }
  });
}

// Optimiser les performances des cartes
function optimizeCardPerformance() {
  // Détecter si le navigateur prend en charge les transitions GPU
  const supportsGPU = 'filter' in document.documentElement.style || 
                     'webkitFilter' in document.documentElement.style;
  
  const cards = document.querySelectorAll('.features-card');
  
  if (supportsGPU) {
    // Utiliser des propriétés qui profitent de l'accélération GPU
    cards.forEach(card => {
      card.style.willChange = 'transform';
      
      // Préparer les cartes pour une meilleure performance
      const front = card.querySelector('.card-front');
      const back = card.querySelector('.card-back');
      
      if (front && back) {
        front.style.willChange = 'transform, opacity';
        back.style.willChange = 'transform, opacity';
        
        // Précharger les images pour éviter les flash
        const images = card.querySelectorAll('img');
        images.forEach(img => {
          img.loading = 'eager';
        });
      }
    });
  } else {
    // Fallback pour les navigateurs plus anciens
    cards.forEach(card => {
      // Simplifier l'animation sur les appareils moins performants
      card.style.transition = 'all 0.5s ease';
    });
  }
}

// Optimisation du retournement sur mobile
function optimizeMobileCardFlip() {
  // Ne s'exécute que sur mobile
  if (window.innerWidth > 768) return;
  
  const mobileCards = document.querySelectorAll('.mobile-card .features-card');
  
  mobileCards.forEach(card => {
    const flipButton = card.querySelector('.btn-flip');
    const backButton = card.querySelector('.btn-flip-back');
    const front = card.querySelector('.card-front');
    const back = card.querySelector('.card-back');
    
    // Optimiser l'effet de retournement pour mobile
    if (flipButton && front && back) {
      // Supprimer les écouteurs d'événements existants
      const newFlipButton = flipButton.cloneNode(true);
      flipButton.parentNode.replaceChild(newFlipButton, flipButton);
      
      newFlipButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Animation plus légère pour mobile
        front.style.transition = 'opacity 0.3s ease';
        back.style.transition = 'opacity 0.3s ease';
        
        // Animation simple sans 3D complexe
        front.style.opacity = '0';
        setTimeout(() => {
          front.style.display = 'none';
          back.style.display = 'block';
          
          setTimeout(() => {
            back.style.opacity = '1';
          }, 50);
        }, 300);
      });
    }
    
    // Bouton retour
    if (backButton && front && back) {
      const newBackButton = backButton.cloneNode(true);
      backButton.parentNode.replaceChild(newBackButton, backButton);
      
      newBackButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        back.style.opacity = '0';
        setTimeout(() => {
          back.style.display = 'none';
          front.style.display = 'block';
          
          setTimeout(() => {
            front.style.opacity = '1';
          }, 50);
        }, 300);
      });
    }
  });
}

// Ajout d'un indicateur de défilement plus visible
function enhanceMobileScrollIndicator() {
  // Ne s'exécute que sur mobile
  if (window.innerWidth > 768) return;
  
  const scrollContainer = document.querySelector('.mobile-scroll-container');
  if (!scrollContainer) return;
  
  // Ajouter un indicateur de swipe horizontal
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'mobile-swipe-indicator';
  scrollIndicator.innerHTML = `
    <div class="swipe-icon">
      <i class="bi bi-arrow-left"></i>
      <span>Faire défiler</span>
      <i class="bi bi-arrow-right"></i>
    </div>
  `;
  
  // Ajouter au conteneur parent
  const scrollWrapper = scrollContainer.closest('.mobile-scroll-wrapper');
  if (scrollWrapper) {
    if (!scrollWrapper.querySelector('.mobile-swipe-indicator')) {
      scrollWrapper.appendChild(scrollIndicator);
    }
  }
  
  // Faire disparaître l'indicateur après le premier défilement
  let hasScrolled = false;
  scrollContainer.addEventListener('scroll', () => {
    if (!hasScrolled) {
      hasScrolled = true;
      scrollIndicator.classList.add('fade-out');
      
      // Supprimer l'élément après l'animation
      setTimeout(() => {
        if (scrollIndicator.parentNode) {
          scrollIndicator.parentNode.removeChild(scrollIndicator);
        }
      }, 1500);
    }
  });
}

// Amélioration de la fonction pour optimiser le défilement
function optimizeCardScrolling() {
  // Ne s'exécute que sur mobile
  if (window.innerWidth > 768) return;
  
  const cards = document.querySelectorAll('.mobile-card .features-card');
  console.log(`Optimisation du défilement pour ${cards.length} cartes`);
  
  cards.forEach(card => {
    // Containers avec potentiellement du scrolling
    const scrollContainers = [
      card.querySelector('.card-content p'),
      card.querySelector('.card-back-description p')
    ];
    
    scrollContainers.forEach(container => {
      if (!container) return;
      
      // Forcer overflow visible pour mesurer la hauteur réelle
      const originalOverflow = container.style.overflow;
      container.style.overflow = 'visible';
      const contentHeight = container.scrollHeight;
      container.style.overflow = originalOverflow;
      
      // Si le contenu est plus grand que 150px, activer le défilement
      if (contentHeight > 150) {
        container.style.maxHeight = '150px';
        container.style.overflowY = 'auto';
        container.style.paddingRight = '5px';
        console.log('Défilement vertical activé pour un conteneur');
        
        // Empêcher la propagation pour éviter le conflit avec le swipe
        container.addEventListener('touchstart', (e) => {
          e.stopPropagation();
        });
        
        container.addEventListener('touchmove', (e) => {
          e.stopPropagation();
        });
      }
    });
  });
  
  // Optimiser le conteneur de défilement
  const scrollContainer = document.querySelector('.mobile-scroll-container');
  if (scrollContainer) {
    // Observer les changements dans le conteneur
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        // Recalculer les centres pour le défilement snap
        const containerWidth = scrollContainer.clientWidth;
        const cards = scrollContainer.querySelectorAll('.mobile-card');
        
        cards.forEach(card => {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          card.dataset.center = cardCenter;
        });
      });
      
      resizeObserver.observe(scrollContainer);
    }
    
    // Améliorer le snap au défilement
    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;
    
    scrollContainer.addEventListener('touchstart', (e) => {
      isScrolling = true;
      startX = e.touches[0].pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    });
    
    scrollContainer.addEventListener('touchend', () => {
      isScrolling = false;
      
      // Snap à la carte la plus proche
      const containerWidth = scrollContainer.clientWidth;
      const scrollPosition = scrollContainer.scrollLeft + containerWidth / 2;
      
      let closestCard = null;
      let minDistance = Infinity;
      
      const cards = scrollContainer.querySelectorAll('.mobile-card');
      cards.forEach(card => {
        const cardLeft = card.offsetLeft - scrollContainer.offsetLeft;
        const cardCenter = cardLeft + card.offsetWidth / 2;
        const distance = Math.abs(scrollPosition - cardCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestCard = card;
        }
      });
      
      if (closestCard) {
        scrollToCard(closestCard, scrollContainer);
      }
    });
  }
} 