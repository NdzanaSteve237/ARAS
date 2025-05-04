// Animation et interaction pour le footer
document.addEventListener('DOMContentLoaded', function() {
  // Formulaire de newsletter
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]');
      const successMessage = this.querySelector('.success-message');
      
      // Validation simple de l'email
      if (email.value.trim() === '' || !email.value.includes('@')) {
        email.style.borderColor = '#e74c3c';
        return;
      }
      
      // Reset de la bordure
      email.style.borderColor = '';
      
      // Simuler l'envoi (remplacer par l'envoi réel)
      setTimeout(() => {
        // Vider le champ email
        email.value = '';
        
        // Afficher le message de succès
        successMessage.style.display = 'block';
        
        // Cacher le message après quelques secondes
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 4000);
      }, 1000);
    });
  }
  
  // Effet de parallaxe pour la grille de fond
  window.addEventListener('mousemove', function(e) {
    const gridLines = document.querySelector('.footer-grid-lines');
    if (!gridLines) return;
    
    const moveX = (e.clientX / window.innerWidth) * 5;
    const moveY = (e.clientY / window.innerHeight) * 5;
    
    gridLines.style.backgroundPosition = `${moveX}px ${moveY}px`;
  });
  
  // Animation des liens au survol
  const footerLinks = document.querySelectorAll('.footer-links ul li a');
  footerLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'rotate(90deg)';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = '';
      }
    });
  });
}); 