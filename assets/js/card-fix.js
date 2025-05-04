// Correctif simple pour les problèmes de cartes
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    console.log("Correctif pour les cartes chargé");

    // 1. Masquer les indicateurs de défilement (boutons en bas à gauche)
    const style = document.createElement('style');
    style.textContent = `
      .scroll-indicator-wrapper {
        display: none !important;
      }
      
      /* Maintenir la hauteur des cartes pendant les transitions */
      .features-card {
        transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      
      .features-card.flipped {
        transform: rotateY(180deg);
      }
      
      /* Styles pour le verso */
      .card-back {
        transform: rotateY(180deg);
        backface-visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
      
      /* Styles pour le recto */
      .card-front {
        backface-visibility: hidden;
        position: relative;
      }
    `;
    document.head.appendChild(style);

    // 2. Corriger le problème de hauteur
    const fixCardHeight = function() {
      // Fonction qui s'exécute lorsqu'on clique sur "Retour"
      document.querySelectorAll('.btn-flip-back').forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          const card = this.closest('.features-card');
          if (!card) return;

          // Stocker la hauteur actuelle
          const currentHeight = card.offsetHeight;
          
          // Appliquer la hauteur comme style inline pour la maintenir
          card.style.height = currentHeight + 'px';
          
          // Retirer la classe flipped
          card.classList.remove('flipped');
          
          // Après la transition, réinitialiser la hauteur
          setTimeout(() => {
            card.style.height = '';
          }, 800); // Durée de la transition
        });
      });
    };
    
    // Appliquer la correction
    fixCardHeight();
    
    // Réappliquer après un délai au cas où d'autres scripts modifient le DOM
    setTimeout(fixCardHeight, 1000);
  });
})(); 