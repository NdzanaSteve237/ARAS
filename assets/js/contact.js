// Animations et validation du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner le formulaire
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;
  
  // Animation des infos de contact au survol
  const contactInfoItems = document.querySelectorAll('.contact-info-item');
  contactInfoItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      const icon = this.querySelector('.contact-icon');
      icon.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = '';
      const icon = this.querySelector('.contact-icon');
      icon.style.transform = '';
    });
  });
  
  // Validation du formulaire
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupérer les champs
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Vérifier que les champs ne sont pas vides
    let isValid = true;
    
    if (!name.value.trim()) {
      showError(name, 'Veuillez entrer votre nom');
      isValid = false;
    } else {
      removeError(name);
    }
    
    if (!email.value.trim()) {
      showError(email, 'Veuillez entrer votre email');
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, 'Veuillez entrer un email valide');
      isValid = false;
    } else {
      removeError(email);
    }
    
    if (!subject.value.trim()) {
      showError(subject, 'Veuillez entrer un sujet');
      isValid = false;
    } else {
      removeError(subject);
    }
    
    if (!message.value.trim()) {
      showError(message, 'Veuillez entrer votre message');
      isValid = false;
    } else {
      removeError(message);
    }
    
    // Si le formulaire est valide, simuler l'envoi
    if (isValid) {
      const submitBtn = document.querySelector('.btn-contact-submit');
      const originalText = submitBtn.innerHTML;
      
      // Changer le texte du bouton pour indiquer l'envoi
      submitBtn.innerHTML = '<span>Envoi en cours...</span> <i class="bi bi-arrow-repeat spin"></i>';
      submitBtn.disabled = true;
      
      // Simuler l'envoi (remplacer par l'envoi réel)
      setTimeout(function() {
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Afficher un message de succès
        showSuccess('Votre message a été envoyé avec succès !');
        
        // Restaurer le bouton
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }
  });
  
  // Fonctions utilitaires
  function showError(input, message) {
    const formControl = input.parentElement;
    formControl.classList.add('error');
    
    // Créer un message d'erreur s'il n'existe pas déjà
    let errorMessage = formControl.querySelector('.error-message');
    if (!errorMessage) {
      errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      formControl.appendChild(errorMessage);
    }
    
    errorMessage.textContent = message;
  }
  
  function removeError(input) {
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    
    // Supprimer le message d'erreur s'il existe
    const errorMessage = formControl.querySelector('.error-message');
    if (errorMessage) {
      formControl.removeChild(errorMessage);
    }
  }
  
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  function showSuccess(message) {
    // Créer un élément pour afficher le succès
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    
    // Ajouter au formulaire
    contactForm.appendChild(successElement);
    
    // Supprimer après quelques secondes
    setTimeout(() => {
      contactForm.removeChild(successElement);
    }, 5000);
  }
  
  // Styles pour les messages d'erreur et de succès
  const style = document.createElement('style');
  style.textContent = `
    .form-floating.error .form-control {
      border-color: #e74c3c;
    }
    
    .error-message {
      color: #e74c3c;
      font-size: 0.85rem;
      margin-top: -10px;
      margin-bottom: 10px;
    }
    
    .success-message {
      background: rgba(46, 204, 113, 0.2);
      color: #2ecc71;
      padding: 15px;
      border-radius: 10px;
      margin-top: 20px;
      text-align: center;
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .spin {
      animation: spin 1s infinite linear;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}); 