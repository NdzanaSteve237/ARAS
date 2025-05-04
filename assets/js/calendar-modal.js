document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner les éléments du DOM
  const calendarEl = document.getElementById('calendar');
  const calendarModal = document.getElementById('calendar-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalTitle = document.getElementById('modal-event-title');
  const modalDate = document.getElementById('modal-date');
  const modalCategory = document.getElementById('modal-category');
  const modalImage = document.getElementById('modal-image');
  const modalImageContainer = document.getElementById('modal-image-container');
  const modalDescription = document.getElementById('modal-description');
  const modalLocation = document.getElementById('modal-location');
  const modalTime = document.getElementById('modal-time');
  const modalRegisterBtn = document.getElementById('modal-register-btn');
  
  // Vérifier que les éléments essentiels existent
  if(!calendarEl || !calendarModal || !closeModalBtn) {
    console.error('Éléments essentiels du modal non trouvés');
    return;
  }
  
  console.log('Modal du calendrier initialisé');
  
  // Événements spéciaux (exemples)
  const specialEvents = [
    {
      date: new Date(2024, 4, 10), // 10 mai 2024
      title: "Atelier de danse traditionnelle",
      category: "CULTUREL",
      color: "#B80000",
      description: "Venez découvrir les danses traditionnelles africaines dans une ambiance chaleureuse et conviviale. Cet atelier est ouvert à tous les niveaux et permettra d'apprendre les bases des mouvements et rythmes africains.",
      location: "Centre culturel de Toulouse",
      time: "14:00 - 16:30",
      image: "assets/img/ARAS/Musique.jpg"
    },
    {
      date: new Date(2024, 4, 15), // 15 mai 2024
      title: "Conférence sur l'histoire africaine",
      category: "DÉBAT",
      color: "#2196F3",
      description: "Une conférence passionnante sur l'histoire et les traditions africaines, présentée par le professeur Jean Makeba. Venez nombreux pour découvrir les richesses culturelles de ce continent.",
      location: "Amphithéâtre Paul Sabatier",
      time: "18:30 - 20:00",
      image: "assets/img/ARAS/Rencontre.jpg"
    },
    {
      date: new Date(2024, 4, 20), // 20 mai 2024
      title: "Rencontre mensuelle",
      category: "ASSOCIATION",
      color: "#9C27B0",
      description: "Notre rencontre mensuelle pour discuter des projets de l'association et partager un moment convivial entre membres. Nous aborderons les prochains événements et les initiatives en cours.",
      location: "Siège de l'association",
      time: "19:00 - 21:00",
      image: "assets/img/ARAS/Randonne.jpg"
    },
    {
      date: new Date(2024, 4, 25), // 25 mai 2024
      title: "Match de football amical",
      category: "SPORT",
      color: "#4CAF50",
      description: "Match amical contre l'association Les Amis de l'Afrique. Venez nombreux pour soutenir notre équipe! Rafraîchissements offerts après le match.",
      location: "Terrain municipal de Toulouse",
      time: "15:00 - 17:00",
      image: "assets/img/ARAS/Foot2.jpg"
    }
  ];
  
  // Fonction pour formater la date en français
  function formatDate(date) {
    if (!date || !(date instanceof Date) || isNaN(date)) {
      return 'Date non valide';
    }
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  }
  
  // Fonction pour vérifier si une date a un événement spécial
  function getEventForDate(date) {
    if (!date) return null;
    
    return specialEvents.find(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() && 
      event.date.getFullYear() === date.getFullYear()
    );
  }
  
  // Ajoutez cette fonction pour optimiser l'affichage sur mobile
  function optimizeForMobile() {
    // Détecter si nous sommes sur mobile
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Optimiser la hauteur du modal
      const viewportHeight = window.innerHeight;
      const modalContent = document.querySelector('.modal-content');
      const modalBody = document.querySelector('.modal-body');
      
      if (modalContent && modalBody) {
        modalContent.style.maxHeight = `${viewportHeight * 0.9}px`;
        modalBody.style.maxHeight = `${viewportHeight * 0.6}px`;
      }
      
      // Adapter l'image pour qu'elle soit plus petite sur mobile
      const modalImage = document.getElementById('modal-image-container');
      if (modalImage) {
        modalImage.style.height = '150px';
      }
    }
  }
  
  // Fonction pour ouvrir le modal
  function openModal(date) {
    console.log('Ouverture du modal avec la date:', date);
    
    // Vérifier si c'est un jour avec événement spécial
    const event = getEventForDate(date);
    
    if (event) {
      // C'est un jour avec événement spécial
      modalTitle.textContent = event.title;
      modalDate.textContent = formatDate(event.date);
      
      if (modalCategory) {
        modalCategory.querySelector('span').textContent = event.category;
        modalCategory.querySelector('span').style.backgroundColor = `${event.color}40`; // 40 = 25% opacité
        modalCategory.querySelector('span').style.color = event.color;
        modalCategory.classList.remove('hidden');
      }
      
      if (modalDescription) {
        modalDescription.textContent = event.description;
        modalDescription.classList.remove('hidden');
      }
      
      if (modalLocation) {
        modalLocation.textContent = event.location;
        modalLocation.parentElement.classList.remove('hidden');
      }
      
      if (modalTime) {
        modalTime.textContent = event.time;
        modalTime.parentElement.classList.remove('hidden');
      }
      
      if (modalImage && modalImageContainer) {
        modalImage.src = event.image;
        modalImageContainer.classList.remove('hidden');
      }
      
      if (modalRegisterBtn) {
        modalRegisterBtn.classList.remove('hidden');
      }
      
    } else {
      // Jour sans événement
      modalTitle.textContent = "Aucun événement";
      modalDate.textContent = formatDate(date);
      
      // Cacher les éléments non pertinents
      if (modalCategory) modalCategory.classList.add('hidden');
      if (modalImageContainer) modalImageContainer.classList.add('hidden');
      if (modalDescription) {
        modalDescription.textContent = "Il n'y a pas d'événement prévu pour cette date.";
        modalDescription.classList.remove('hidden');
      }
      if (modalLocation) modalLocation.parentElement.classList.add('hidden');
      if (modalTime) modalTime.parentElement.classList.add('hidden');
      if (modalRegisterBtn) modalRegisterBtn.classList.add('hidden');
    }
    
    // Afficher le modal
    calendarModal.classList.add('show');
    
    // Optimiser pour mobile
    optimizeForMobile();
    
    // Faire défiler au début du modal
    if (modalBody) {
      modalBody.scrollTop = 0;
    }
  }
  
  // Fonction pour fermer le modal
  function closeModal() {
    console.log('Fermeture du modal');
    calendarModal.classList.remove('show');
  }
  
  // Ajouter les écouteurs d'événements
  
  // 1. Pour fermer le modal avec le bouton de fermeture
  closeModalBtn.addEventListener('click', closeModal);
  
  // 2. Pour fermer le modal en cliquant en dehors
  calendarModal.addEventListener('click', function(event) {
    if (event.target === calendarModal) {
      closeModal();
    }
  });
  
  // 3. Attacher des écouteurs aux jours du calendrier
  document.addEventListener('click', function(event) {
    // Trouver la cellule de jour la plus proche (ou l'élément lui-même s'il est une cellule)
    const dayCell = event.target.closest('.calendar-day');
    
    // Vérifier si nous avons cliqué sur un jour du calendrier
    if (dayCell) {
      console.log('Jour du calendrier cliqué', dayCell);
      
      // Récupérer la date à partir de l'attribut data ou générer une date basée sur le texte
      const dayNumber = dayCell.querySelector('.day-number');
      if (dayNumber) {
        // Utiliser le mois et l'année actuels pour créer la date complète
        const today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        
        // Si on peut récupérer le mois et l'année du calendrier, c'est encore mieux
        const monthYearText = document.getElementById('current-month-year');
        if (monthYearText) {
          const monthYearParts = monthYearText.textContent.split(' ');
          if (monthYearParts.length === 2) {
            const frenchMonths = [
              'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
              'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
            ];
            month = frenchMonths.indexOf(monthYearParts[0].toLowerCase());
            year = parseInt(monthYearParts[1]);
          }
        }
        
        const clickedDate = new Date(year, month, parseInt(dayNumber.textContent));
        openModal(clickedDate);
      }
    }
  });

  // 4. Gestion du bouton d'inscription s'il existe
  if (modalRegisterBtn) {
    modalRegisterBtn.addEventListener('click', function() {
      alert("Inscription confirmée ! Vous recevrez un email de confirmation.");
    });
  }

  console.log('Écouteurs d\'événements du calendrier ajoutés');

  // Ajouter un écouteur pour le redimensionnement de la fenêtre
  window.addEventListener('resize', function() {
    if (calendarModal.classList.contains('show')) {
      optimizeForMobile();
    }
  });

  // Ajouter cette fonction pour marquer les jours avec événements
  function markDaysWithEvents() {
    // Récupérer tous les jours du calendrier
    const calendarDays = document.querySelectorAll('.calendar-day');
    if (!calendarDays.length) return;
    
    // Parcourir les jours
    calendarDays.forEach(day => {
      const dayNumber = day.querySelector('.day-number');
      if (!dayNumber) return;
      
      const dayText = dayNumber.textContent.trim();
      if (!dayText) return;
      
      // Récupérer le mois et l'année du calendrier
      const monthYearText = document.getElementById('current-month-year');
      if (!monthYearText) return;
      
      const monthYearParts = monthYearText.textContent.split(' ');
      if (monthYearParts.length !== 2) return;
      
      const frenchMonths = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
      ];
      
      const month = frenchMonths.indexOf(monthYearParts[0].toLowerCase());
      const year = parseInt(monthYearParts[1]);
      
      if (month === -1 || isNaN(year)) return;
      
      // Créer la date pour ce jour
      const date = new Date(year, month, parseInt(dayText));
      
      // Vérifier si ce jour a un événement
      const event = getEventForDate(date);
      if (event) {
        // Marquer ce jour comme ayant un événement
        day.setAttribute('data-has-event', 'true');
        
        // Ajouter un indicateur d'événement s'il n'en a pas déjà un
        if (!day.querySelector('.day-event')) {
          const eventIndicator = document.createElement('div');
          eventIndicator.className = 'day-event';
          eventIndicator.textContent = event.title;
          eventIndicator.style.background = `linear-gradient(135deg, ${event.color}, ${adjustColorBrightness(event.color, -20)})`;
          eventIndicator.style.color = '#ffffff';
          day.appendChild(eventIndicator);
        }
      }
    });
  }

  // Fonction utilitaire pour ajuster la luminosité d'une couleur
  function adjustColorBrightness(hex, percent) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  // Observer les changements dans le calendrier
  const calendarObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList' && mutation.target.id === 'calendar') {
        // Le contenu du calendrier a changé, marquer les jours avec événements
        setTimeout(markDaysWithEvents, 100);
      }
    });
  });
  
  // Observer le conteneur du calendrier
  if (calendarEl) {
    calendarObserver.observe(calendarEl, { childList: true });
    
    // Marquer les jours initialement
    setTimeout(markDaysWithEvents, 100);
  }
}); 