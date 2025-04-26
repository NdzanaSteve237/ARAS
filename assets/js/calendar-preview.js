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