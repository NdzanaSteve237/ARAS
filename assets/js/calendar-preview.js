class ResponsiveEventCalendar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Conteneur avec l'ID ${containerId} non trouvé`);
      return;
    }
    
    // Dates spéciales avec événements
    this.specialDates = [
      {
        date: '2024-07-05',
        title: 'Journée culturelle',
        description: 'Découverte des traditions et coutumes africaines à travers des ateliers interactifs.',
        category: 'CULTUREL',
        color: '#B80000',
        location: 'Centre culturel ARAS',
        image: '/api/placeholder/400/300'
      },
      {
        date: '2024-07-12',
        title: 'Atelier linguistique',
        description: 'Initiation à la langue Douala avec exercices pratiques et conversations guidées.',
        category: 'LINGUISTIQUE',
        color: '#9C27B0',
        location: 'Salle d\'étude ARAS',
        image: '/api/placeholder/400/300'
      },
      {
        date: '2024-07-15',
        title: 'Grand Débat',
        description: 'Discussion ouverte sur la renaissance culturelle africaine et ses enjeux contemporains.',
        category: 'DÉBAT',
        color: '#2196F3',
        location: 'Amphithéâtre municipal',
        image: '/api/placeholder/400/300'
      },
      {
        date: '2024-07-20',
        title: 'Soirée contes',
        description: 'Soirée dédiée aux contes et légendes africains racontés par des conteurs traditionnels.',
        category: 'CULTUREL',
        color: '#B80000',
        location: 'Jardin communautaire',
        image: '/api/placeholder/400/300'
      },
      {
        date: '2024-07-25',
        title: 'Formation entrepreneuriat',
        description: 'Atelier pratique sur l\'entrepreneuriat et le développement de projets en Afrique.',
        category: 'FORMATION',
        color: '#4CAF50',
        location: 'Espace coworking',
        image: '/api/placeholder/400/300'
      }
    ];
    
    // Initialiser le calendrier
    this.currentDate = new Date();
    this.selectedDate = null;
    
    this.render();
    this.attachEventListeners();
  }
  
  render() {
    // Créer la structure du calendrier
    this.container.innerHTML = `
      <div class="calendar-container">
        <div class="calendar-header">
          <button id="prevMonth" class="calendar-nav-btn">&lt;</button>
          <h2 id="monthDisplay" class="current-month"></h2>
          <button id="nextMonth" class="calendar-nav-btn">&gt;</button>
        </div>
        <div class="weekdays">
          <div>Dim</div>
          <div>Lun</div>
          <div>Mar</div>
          <div>Mer</div>
          <div>Jeu</div>
          <div>Ven</div>
          <div>Sam</div>
        </div>
        <div id="calendar" class="days"></div>
        
        <div class="calendar-footer">
          <div class="calendar-legend">
            <div class="legend-item">
              <div class="legend-color" style="background-color: #B80000;"></div>
              <div class="legend-text">Culturel</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #9C27B0;"></div>
              <div class="legend-text">Linguistique</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #2196F3;"></div>
              <div class="legend-text">Débat</div>
            </div>
            <div class="legend-item">
              <div class="legend-color" style="background-color: #4CAF50;"></div>
              <div class="legend-text">Formation</div>
            </div>
          </div>
        </div>
      </div>
      
      <div id="eventAlert" class="event-alert">
        <div class="alert-content">
          <div class="alert-header">
            <h3 id="alertTitle"></h3>
            <button class="close-alert">✕</button>
          </div>
          <div class="alert-meta">
            <div class="alert-date"><i class="bi bi-calendar"></i> <span id="alertDate"></span></div>
            <div class="alert-location"><i class="bi bi-geo-alt"></i> <span id="alertLocation"></span></div>
            <div class="alert-category"><i class="bi bi-tag"></i> <span id="alertCategory"></span></div>
          </div>
          <div class="alert-image">
            <img id="alertImage" src="" alt="Événement">
          </div>
          <p id="alertDescription"></p>
        </div>
      </div>
    `;
    
    this.updateCalendar();
  }
  
  updateCalendar() {
    // Mettre à jour le mois et l'année affichés
    const monthYearStr = this.currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    document.getElementById('monthDisplay').textContent = monthYearStr.charAt(0).toUpperCase() + monthYearStr.slice(1);
    
    // Obtenir le premier jour du mois
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    
    // Obtenir le dernier jour du mois
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    
    // Obtenir le jour de la semaine du premier jour (0 = dimanche, 1 = lundi, etc.)
    const firstDayIndex = firstDay.getDay();
    
    // Nombre total de jours dans le mois
    const daysInMonth = lastDay.getDate();
    
    // Conteneur pour les jours
    const daysContainer = document.getElementById('calendar');
    daysContainer.innerHTML = '';
    
    // Ajouter les jours vides avant le premier jour du mois
    for (let i = 0; i < firstDayIndex; i++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'day empty';
      daysContainer.appendChild(dayElement);
    }
    
    // Ajouter les jours du mois
    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'day';
      
      // Vérifier si c'est aujourd'hui
      const currentDateStr = `${this.currentDate.getFullYear()}-${String(this.currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const today = new Date();
      
      if (i === today.getDate() && 
          this.currentDate.getMonth() === today.getMonth() && 
          this.currentDate.getFullYear() === today.getFullYear()) {
        dayElement.classList.add('today');
      }
      
      // Vérifier si c'est une date spéciale
      const specialDate = this.specialDates.find(event => event.date === currentDateStr);
      if (specialDate) {
        dayElement.classList.add('special-date');
        dayElement.style.setProperty('--event-color', specialDate.color);
        
        // Ajouter un indicateur d'événement
        const eventIndicator = document.createElement('div');
        eventIndicator.className = 'event-indicator';
        eventIndicator.style.backgroundColor = specialDate.color;
        dayElement.appendChild(eventIndicator);
        
        // Ajouter un titre d'événement pour les écrans plus grands
        const eventTitle = document.createElement('div');
        eventTitle.className = 'event-title-small';
        eventTitle.textContent = specialDate.title;
        dayElement.appendChild(eventTitle);
        
        // Ajouter l'événement de clic pour afficher les détails
        dayElement.addEventListener('click', () => this.showEventDetails(specialDate));
      }
      
      // Ajouter le numéro du jour
      const dayNumber = document.createElement('div');
      dayNumber.className = 'day-number';
      dayNumber.textContent = i;
      dayElement.appendChild(dayNumber);
      
      daysContainer.appendChild(dayElement);
    }
  }
  
  showEventDetails(event) {
    // Mettre à jour le contenu de l'alerte
    const alert = document.getElementById('eventAlert');
    const title = document.getElementById('alertTitle');
    const date = document.getElementById('alertDate');
    const location = document.getElementById('alertLocation');
    const category = document.getElementById('alertCategory');
    const description = document.getElementById('alertDescription');
    const image = document.getElementById('alertImage');
    
    // Formater la date
    const eventDate = new Date(event.date);
    const formattedDate = eventDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    
    // Remplir l'alerte avec les détails de l'événement
    title.textContent = event.title;
    date.textContent = formattedDate;
    location.textContent = event.location;
    category.textContent = event.category;
    description.textContent = event.description;
    
    // Ajouter l'image
    image.src = event.image;
    
    // Ajouter la couleur de la catégorie
    category.style.color = event.color;
    
    // Afficher l'alerte
    alert.classList.add('show');
  }
  
  attachEventListeners() {
    // Navigation entre les mois
    document.getElementById('prevMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() - 1);
      this.updateCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.updateCalendar();
    });
    
    // Fermeture de l'alerte
    const closeAlert = document.querySelector('.close-alert');
    if (closeAlert) {
      closeAlert.addEventListener('click', () => {
        document.getElementById('eventAlert').classList.remove('show');
      });
    }
    
    // Fermeture de l'alerte en cliquant en dehors
    document.getElementById('eventAlert').addEventListener('click', (e) => {
      if (e.target === document.getElementById('eventAlert')) {
        document.getElementById('eventAlert').classList.remove('show');
      }
    });
  }
}

// Initialiser le calendrier lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  const pricingSection = document.getElementById('pricing');
  if (pricingSection) {
    // Utiliser le conteneur de calendrier existant ou en créer un nouveau
    let calendarContainer = pricingSection.querySelector('#calendar');
    if (!calendarContainer) {
      calendarContainer = document.createElement('div');
      calendarContainer.id = 'calendar';
      pricingSection.appendChild(calendarContainer);
    }
    
    // Initialiser le calendrier
    new ResponsiveEventCalendar('calendar');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Éléments du DOM
  const calendarEl = document.getElementById('calendar');
  const currentMonthYearEl = document.getElementById('current-month-year');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  const filterEventsBtn = document.getElementById('filter-events-btn');
  const calendarModal = document.getElementById('calendar-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const modalDateText = document.getElementById('modal-date');
  
  // État du filtre
  let isFiltered = false;
  
  // Date actuelle
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  
  // Événements pour notre calendrier (avec données d'exemple)
  const events = [
    { date: new Date(currentYear, currentMonth, 5), title: 'Réunion ARAS', color: '#3a7bd5' },
    { date: new Date(currentYear, currentMonth, 15), title: 'Match de football', color: '#2ecc71' },
    { date: new Date(currentYear, currentMonth, 22), title: 'Randonnée', color: '#e74c3c' },
    { date: new Date(currentYear, currentMonth + 1, 3), title: 'Atelier culturel', color: '#f39c12' },
    { date: new Date(currentYear, currentMonth - 1, 28), title: 'Conférence', color: '#9b59b6' }
  ];
  
  // Fonction pour basculer le filtre des événements
  function toggleEventFilter() {
    isFiltered = !isFiltered;
    
    if (isFiltered) {
      filterEventsBtn.classList.add('active');
      filterEventsBtn.innerHTML = '<i class="bi bi-funnel-fill"></i> Afficher tout';
      
      // Appliquer le filtre
      const dayCells = document.querySelectorAll('.calendar-day');
      dayCells.forEach(cell => {
        cell.classList.add('filtered');
        if (cell.querySelector('.day-event')) {
          cell.classList.add('has-event');
        }
      });
    } else {
      filterEventsBtn.classList.remove('active');
      filterEventsBtn.innerHTML = '<i class="bi bi-funnel"></i> Afficher les événements';
      
      // Retirer le filtre
      const dayCells = document.querySelectorAll('.calendar-day');
      dayCells.forEach(cell => {
        cell.classList.remove('filtered', 'has-event');
      });
    }
  }
  
  // Fonction pour animer le changement de mois
  function animateMonthChange(direction) {
    // Ajouter une classe pour l'animation de sortie
    calendarEl.classList.add('calendar-fade-exit');
    
    // Après une courte période, changer le mois et ajouter l'animation d'entrée
    setTimeout(() => {
      if (direction === 'prev') {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
      } else {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
      }
      
      // Générer le nouveau calendrier
      generateCalendar(currentMonth, currentYear);
      
      // Retirer l'animation de sortie et ajouter l'animation d'entrée
      calendarEl.classList.remove('calendar-fade-exit');
      calendarEl.classList.add('calendar-fade-enter');
      
      // Retirer l'animation d'entrée après la fin
      setTimeout(() => {
        calendarEl.classList.remove('calendar-fade-enter');
      }, 300);
      
      // Réappliquer le filtre si actif
      if (isFiltered) {
        setTimeout(() => {
          toggleEventFilter();
          toggleEventFilter(); // Double appel pour réinitialiser et réappliquer
        }, 350);
      }
      
    }, 300);
  }
  
  // Fonction pour générer le calendrier
  function generateCalendar(month, year) {
    // Effacer le calendrier existant
    calendarEl.innerHTML = '';
    
    // Définir le titre du mois et de l'année
    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 
                        'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    currentMonthYearEl.textContent = `${monthNames[month]} ${year}`;
    
    // Premier jour du mois (0 = Dimanche, 1 = Lundi, etc.)
    const firstDay = new Date(year, month, 1).getDay();
    
    // Nombre de jours dans le mois
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Jours du mois précédent
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    // Calculer le nombre total de cellules nécessaires
    const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;
    
    // Journée actuelle
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    
    // Créer les cellules du calendrier
    for (let i = 0; i < totalCells; i++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('calendar-day');
      
      // Ajouter une animation de délai basée sur l'index
      dayCell.style.animationDelay = `${i * 0.03}s`;
      dayCell.style.opacity = '0';
      dayCell.style.transform = 'scale(0.9)';
      
      // Animation d'apparition avec délai
      setTimeout(() => {
        dayCell.style.transition = 'all 0.3s ease';
        dayCell.style.opacity = '1';
        dayCell.style.transform = 'scale(1)';
      }, i * 30);
      
      const dayNumber = document.createElement('div');
      dayNumber.classList.add('day-number');
      
      // Déterminer la date à afficher
      let currentDate = null;
      
      if (i < firstDay) {
        // Jours du mois précédent
        const prevMonthDate = prevMonthDays - (firstDay - 1 - i);
        dayNumber.textContent = prevMonthDate;
        dayCell.classList.add('other-month');
        currentDate = new Date(year, month - 1, prevMonthDate);
      } else if (i < (daysInMonth + firstDay)) {
        // Jours du mois actuel
        const date = i - firstDay + 1;
        dayNumber.textContent = date;
        currentDate = new Date(year, month, date);
        
        // Marquer la journée actuelle
        if (isCurrentMonth && date === today.getDate()) {
          dayCell.classList.add('today');
        }
      } else {
        // Jours du mois suivant
        const nextMonthDate = i - (daysInMonth + firstDay) + 1;
        dayNumber.textContent = nextMonthDate;
        dayCell.classList.add('other-month');
        currentDate = new Date(year, month + 1, nextMonthDate);
      }
      
      dayCell.appendChild(dayNumber);
      
      // Vérifier s'il y a des événements pour ce jour
      if (currentDate) {
        const dayEvents = events.filter(event => 
          event.date.getDate() === currentDate.getDate() && 
          event.date.getMonth() === currentDate.getMonth() && 
          event.date.getFullYear() === currentDate.getFullYear()
        );
        
        // Ajouter les événements à la cellule
        dayEvents.forEach(event => {
          const eventElement = document.createElement('div');
          eventElement.classList.add('day-event');
          eventElement.textContent = event.title;
          eventElement.style.background = `linear-gradient(135deg, ${event.color}, ${adjustColor(event.color, -20)})`;
          dayCell.appendChild(eventElement);
          
          // Ajouter une classe pour indiquer que cette cellule a un événement (pour le filtre)
          dayCell.dataset.hasEvent = "true";
        });
      }
      
      // Ajouter un effet de survol interactif
      dayCell.addEventListener('mouseover', createRippleEffect);
      
      // Ajouter l'événement au clic pour ouvrir le modal
      dayCell.addEventListener('click', function() {
        openModal(currentDate);
      });
      
      calendarEl.appendChild(dayCell);
    }
    
    // Réappliquer le filtre si nécessaire
    if (isFiltered) {
      setTimeout(() => {
        const dayCells = document.querySelectorAll('.calendar-day');
        dayCells.forEach(cell => {
          cell.classList.add('filtered');
          if (cell.querySelector('.day-event')) {
            cell.classList.add('has-event');
          }
        });
      }, 300);
    }
  }
  
  // Fonction pour créer un effet d'ondulation au survol
  function createRippleEffect(e) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  // Fonction utilitaire pour ajuster une couleur (plus claire ou plus foncée)
  function adjustColor(hex, percent) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    r = Math.max(0, Math.min(255, r + percent));
    g = Math.max(0, Math.min(255, g + percent));
    b = Math.max(0, Math.min(255, b + percent));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }
  
  // Fonction pour formater la date
  function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  }
  
  // Fonction pour ouvrir le modal
  function openModal(date) {
    if (modalDateText) {
      modalDateText.textContent = formatDate(date);
    }
    if (calendarModal) {
      calendarModal.classList.add('show');
    }
  }
  
  // Fonction pour fermer le modal
  function closeModal() {
    if (calendarModal) {
      calendarModal.classList.remove('show');
    }
  }
  
  // Ajouter un gestionnaire d'événements pour fermer le modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  // Fermer le modal si on clique en dehors du contenu
  window.addEventListener('click', function(event) {
    if (event.target === calendarModal) {
      closeModal();
    }
  });
  
  // Navigation entre les mois avec animation
  prevMonthBtn.addEventListener('click', function() {
    animateMonthChange('prev');
  });
  
  nextMonthBtn.addEventListener('click', function() {
    animateMonthChange('next');
  });
  
  // Événement pour le bouton de filtre
  filterEventsBtn.addEventListener('click', toggleEventFilter);
  
  // Générer le calendrier initial
  generateCalendar(currentMonth, currentYear);
});