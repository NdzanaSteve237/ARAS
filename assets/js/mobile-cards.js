document.addEventListener('DOMContentLoaded', function() {
  // Sélection des éléments
  const mobileScrollContainer = document.querySelector('.mobile-scroll-container');
  const mobileCards = document.querySelectorAll('.mobile-card');
  
  // Vérifier si les éléments existent sur la page
  if (!mobileScrollContainer || !mobileCards.length) {
    console.log('Éléments de cartes mobiles non trouvés');
    return;
  }
  
  console.log('Initialisation des cartes mobiles');
  
  // 1. Ajouter des boutons de navigation latéraux
  const navButtons = document.createElement('div');
  navButtons.className = 'mobile-card-nav';
  navButtons.innerHTML = `
    <button class="mobile-prev-btn"><i class="bi bi-chevron-left"></i></button>
    <button class="mobile-next-btn"><i class="bi bi-chevron-right"></i></button>
  `;
  
  // Ajouter les boutons au parent de mobileScrollContainer
  const mobileScrollWrapper = document.querySelector('.mobile-scroll-wrapper');
  if (mobileScrollWrapper) {
    mobileScrollWrapper.appendChild(navButtons);
  }
  
  // Supprimer la pagination en bas (on n'utilise plus les indicateurs)
  // Au lieu de cela, on se concentre uniquement sur les boutons latéraux
  
  // Implémenter la logique de défilement
  let currentCardIndex = 0;
  
  // Mettre à jour l'affichage
  function updateCardDisplay() {
    // Faire défiler jusqu'à la carte actuelle
    const cardWidth = mobileCards[0].offsetWidth + 20; // largeur + marge
    mobileScrollContainer.scrollTo({
      left: currentCardIndex * cardWidth,
      behavior: 'smooth'
    });
    
    // Marquer la carte actuelle comme active
    mobileCards.forEach((card, index) => {
      card.classList.toggle('active-card', index === currentCardIndex);
    });
    
    // Mettre à jour l'état des boutons (désactiver si premier/dernier)
    const prevBtn = document.querySelector('.mobile-prev-btn');
    const nextBtn = document.querySelector('.mobile-next-btn');
    
    if (prevBtn) {
      prevBtn.disabled = currentCardIndex === 0;
      prevBtn.style.opacity = currentCardIndex === 0 ? "0.5" : "1";
    }
    
    if (nextBtn) {
      nextBtn.disabled = currentCardIndex === mobileCards.length - 1;
      nextBtn.style.opacity = currentCardIndex === mobileCards.length - 1 ? "0.5" : "1";
    }
  }
  
  // Gérer les clics sur les boutons prev/next
  document.querySelector('.mobile-prev-btn')?.addEventListener('click', function() {
    if (currentCardIndex > 0) {
      currentCardIndex--;
      updateCardDisplay();
    }
  });
  
  document.querySelector('.mobile-next-btn')?.addEventListener('click', function() {
    if (currentCardIndex < mobileCards.length - 1) {
      currentCardIndex++;
      updateCardDisplay();
    }
  });
  
  // 4. Gérer le retournement des cartes
  document.querySelectorAll('.btn-flip').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.features-card');
      if (card) {
        // Basculer la classe flipped
        card.classList.add('flipped');
        
        // Forcer un affichage complet du verso
        const cardBack = card.querySelector('.card-back');
        const cardBackContent = card.querySelector('.card-back-content');
        
        if (cardBack && cardBackContent) {
          // S'assurer que le contenu est visible
          cardBack.style.display = 'block';
          cardBack.style.position = 'static';
          cardBack.style.transform = 'none';
          
          // Rendre le bouton de retour toujours visible
          const backBtn = cardBack.querySelector('.btn-flip-back');
          if (backBtn) {
            backBtn.style.position = 'relative';
            backBtn.style.zIndex = '5';
            backBtn.style.opacity = '1';
            
            // Ajouter un effet pulse pour mettre en évidence le bouton
            backBtn.classList.add('pulse-attention');
          }
          
          // Adapter la hauteur de la carte pour montrer tout le contenu
          card.style.height = 'auto';
          cardBack.style.height = 'auto';
          
          // Calculer la hauteur nécessaire (au moins 500px)
          setTimeout(() => {
            const minHeight = 500; // Hauteur minimale en pixels
            const contentHeight = cardBackContent.offsetHeight + 50; // +50px pour les marges
            const targetHeight = Math.max(minHeight, contentHeight);
            card.style.height = `${targetHeight}px`;
            
            // Faire défiler pour s'assurer que le bouton est visible
            const footer = cardBack.querySelector('.card-back-footer');
            if (footer) {
              footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
          }, 50);
        }
      }
    });
  });
  
  document.querySelectorAll('.btn-flip-back').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.features-card');
      if (card) {
        card.classList.remove('flipped');
        // Réinitialiser la hauteur
        setTimeout(() => {
          card.style.height = '';
        }, 300);
      }
    });
  });
  
  // 5. Détecter le swipe sur mobile avec une meilleure réactivité
  let touchStartX = 0;
  let touchEndX = 0;
  let isSwiping = false;
  
  // Gestionnaire d'événements tactiles amélioré
  mobileScrollContainer.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    isSwiping = true;
  }, { passive: true });
  
  mobileScrollContainer.addEventListener('touchmove', function(e) {
    if (!isSwiping) return;
    
    // Animation visuelle pendant le swipe
    const currentTouch = e.changedTouches[0].screenX;
    const diff = currentTouch - touchStartX;
    
    // Limiter le déplacement visuel (effet de résistance)
    const maxMove = 50;
    const moveX = Math.max(Math.min(diff, maxMove), -maxMove);
    
    // Animer seulement la carte active
    const activeCard = mobileCards[currentCardIndex];
    if (activeCard) {
      activeCard.style.transform = `translateX(${moveX}px)`;
    }
    
  }, { passive: true });
  
  mobileScrollContainer.addEventListener('touchend', function(e) {
    if (!isSwiping) return;
    
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    
    // Réinitialiser la position après le swipe
    mobileCards.forEach(card => {
      card.style.transform = '';
    });
    
    isSwiping = false;
  }, { passive: true });
  
  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    const swipeThreshold = 80; // Augmenter le seuil pour un swipe plus intentionnel
    
    // Ajouter un feedback visuel pour le swipe
    function addSwipeFeedback(direction) {
      const activeCard = mobileCards[currentCardIndex];
      if (!activeCard) return;
      
      activeCard.classList.add(`swipe-${direction}`);
      setTimeout(() => {
        activeCard.classList.remove(`swipe-${direction}`);
      }, 300);
    }
    
    if (swipeDistance < -swipeThreshold) {
      // Swipe gauche -> carte suivante
      if (currentCardIndex < mobileCards.length - 1) {
        addSwipeFeedback('left');
        currentCardIndex++;
        updateCardDisplay();
      } else {
        // Effet de rebond si c'est la dernière carte
        addSwipeFeedback('bounce-right');
      }
    } else if (swipeDistance > swipeThreshold) {
      // Swipe droit -> carte précédente
      if (currentCardIndex > 0) {
        addSwipeFeedback('right');
        currentCardIndex--;
        updateCardDisplay();
      } else {
        // Effet de rebond si c'est la première carte
        addSwipeFeedback('bounce-left');
      }
    }
  }
  
  // Initialiser l'affichage
  updateCardDisplay();
  
  // Adapter la fonction updateCardDisplay pour mettre à jour les indicateurs visuels
  function updateCardDisplay() {
    // Code existant...
    
    // Ajouter une animation de transition
    mobileCards.forEach(card => {
      card.classList.remove('card-entering', 'card-leaving');
    });
    
    if (mobileCards[currentCardIndex]) {
      mobileCards[currentCardIndex].classList.add('card-entering');
    }
    
    // Actualiser l'état des boutons de navigation
    updateNavigationButtons();
  }
  
  // Fonction séparée pour gérer l'état des boutons de navigation
  function updateNavigationButtons() {
    const prevBtn = document.querySelector('.mobile-prev-btn');
    const nextBtn = document.querySelector('.mobile-next-btn');
    
    if (prevBtn) {
      const isFirst = currentCardIndex === 0;
      prevBtn.disabled = isFirst;
      prevBtn.style.opacity = isFirst ? "0.5" : "1";
      prevBtn.style.transform = isFirst ? "scale(0.95)" : "scale(1)";
    }
    
    if (nextBtn) {
      const isLast = currentCardIndex === mobileCards.length - 1;
      nextBtn.disabled = isLast;
      nextBtn.style.opacity = isLast ? "0.5" : "1";
      nextBtn.style.transform = isLast ? "scale(0.95)" : "scale(1)";
    }
  }
  
  // Ajoutons des animations CSS pour les transitions
  const style = document.createElement('style');
  style.textContent = `
    .swipe-left {
      animation: swipeLeftAnim 0.3s ease-out;
    }
    
    .swipe-right {
      animation: swipeRightAnim 0.3s ease-out;
    }
    
    .swipe-bounce-left {
      animation: bounceBorderLeft 0.5s ease-out;
    }
    
    .swipe-bounce-right {
      animation: bounceBorderRight 0.5s ease-out;
    }
    
    .card-entering {
      animation: cardEnter 0.4s ease-out;
    }
    
    @keyframes swipeLeftAnim {
      0% { transform: translateX(0); }
      100% { transform: translateX(-80px); opacity: 0.7; }
    }
    
    @keyframes swipeRightAnim {
      0% { transform: translateX(0); }
      100% { transform: translateX(80px); opacity: 0.7; }
    }
    
    @keyframes bounceBorderLeft {
      0% { transform: translateX(0); }
      40% { transform: translateX(-30px); }
      70% { transform: translateX(15px); }
      100% { transform: translateX(0); }
    }
    
    @keyframes bounceBorderRight {
      0% { transform: translateX(0); }
      40% { transform: translateX(30px); }
      70% { transform: translateX(-15px); }
      100% { transform: translateX(0); }
    }
    
    @keyframes cardEnter {
      0% { transform: scale(0.95); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  // Style pour l'animation pulse du bouton
  const pulseStyle = document.createElement('style');
  pulseStyle.textContent = `
    .pulse-attention {
      animation: pulseAttention 2s infinite;
    }
    
    @keyframes pulseAttention {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(58, 123, 213, 0.5); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(pulseStyle);
  
  // Ajouter après l'initialisation
  function normalizeCardHeights() {
    // Trouver la hauteur maximale parmi les cartes
    let maxHeight = 0;
    mobileCards.forEach(card => {
      const frontCard = card.querySelector('.card-front');
      if (frontCard) {
        const cardHeight = frontCard.offsetHeight;
        maxHeight = Math.max(maxHeight, cardHeight);
      }
    });
    
    // Appliquer cette hauteur à toutes les cartes (avec un minimum de 500px)
    maxHeight = Math.max(maxHeight, 500);
    mobileCards.forEach(card => {
      const featureCard = card.querySelector('.features-card');
      if (featureCard) {
        featureCard.style.minHeight = `${maxHeight}px`;
      }
    });
    
    console.log('Hauteurs de cartes normalisées à:', maxHeight, 'px');
  }
  
  // Appeler après le chargement complet de la page
  window.addEventListener('load', normalizeCardHeights);
  // Et aussi lors des redimensionnements
  window.addEventListener('resize', normalizeCardHeights);
}); 