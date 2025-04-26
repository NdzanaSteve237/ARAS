/**
* Template Name: Bootslander
* Template URL: https://bootstrapmade.com/bootslander-free-bootstrap-landing-page-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Correction de l'erreur PureCounter
   */
  function fixPureCounterError() {
    // Vérifier si PureCounter est défini
    if (typeof PureCounter === 'undefined') {
      console.log("PureCounter n'est pas défini, création d'un polyfill");
      
      // Créer un polyfill simple pour PureCounter
      window.PureCounter = function(options) {
        this.options = options || {};
        
        this.registerEventListeners = function() {
          console.log("PureCounter polyfill: registerEventListeners appelé");
          return this;
        };
        
        this.intersectionListenerCallback = function() {
          console.log("PureCounter polyfill: intersectionListenerCallback appelé");
          return this;
        };
        
        this.startCounter = function() {
          console.log("PureCounter polyfill: startCounter appelé");
          
          // Sélectionner tous les éléments avec la classe .purecounter
          document.querySelectorAll('.purecounter').forEach(function(counterElement) {
            // Obtenir la valeur finale du compteur
            const finalValue = parseInt(counterElement.dataset.purecounterEnd || 0);
            
            // Définir directement la valeur finale
            counterElement.textContent = finalValue;
          });
          
          return this;
        };
        
        // Initialiser automatiquement
        this.startCounter();
        
        return this;
      };
    }
  }

  // Appeler cette fonction immédiatement
  fixPureCounterError();

  /**
   * Initialisation sécurisée de PureCounter
   */
  function initPureCounter() {
    try {
      // Vérifier si PureCounter est défini
      if (typeof PureCounter !== 'undefined') {
        new PureCounter();
      } else {
        console.warn("PureCounter n'est toujours pas défini après le polyfill");
        fixPureCounterError(); // Réessayer de créer le polyfill
        new PureCounter(); // Tenter d'initialiser avec le polyfill
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation de PureCounter:", error);
    }
  }

  // Initialiser PureCounter après le chargement du DOM
  document.addEventListener('DOMContentLoaded', function() {
    fixPureCounterError();
    setTimeout(initPureCounter, 100);
  });

  // Réinitialiser PureCounter après le chargement complet de la page
  window.addEventListener('load', function() {
    fixPureCounterError();
    setTimeout(initPureCounter, 100);
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  var shadow = '0 20px 50px rgba(0,34,45,0.5)';

function styles(item_id, x, y, z , opacity, shadow){
	$(item_id).css({
		transform: 'translate3d('+ x +'px, ' + y + 'px, ' + z +'px) ',
		opacity: opacity,
		'box-shadow': shadow
	});
}

/**
 * Réinitialisation complète des swipers
 */
function reinitializeAllSwipers() {
  console.log("Réinitialisation complète des swipers");
  
  // Détruire tous les swipers existants
  document.querySelectorAll(".swiper").forEach(function(swiperElement) {
    if (swiperElement.swiper) {
      swiperElement.swiper.destroy(true, true);
    }
  });
  
  // Réinitialiser tous les swipers
  document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
    try {
      // Supprimer la classe swiper-initialized si elle existe
      swiperElement.classList.remove('swiper-initialized');
      
      // Récupérer la configuration
      const configElement = swiperElement.querySelector(".swiper-config");
      if (configElement) {
        const config = JSON.parse(configElement.innerHTML.trim());
        
        // Créer un nouveau Swiper
        new Swiper(swiperElement, config);
      }
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du swiper:", error);
    }
  });
  
  // Réinitialiser AOS
  if (typeof AOS !== 'undefined') {
    AOS.refreshHard();
  }
}

/**
 * Correction spécifique pour le défilement horizontal
 */
function fixHorizontalScroll() {
  // Sélectionner le conteneur de défilement
  const scrollContainer = document.querySelector('.details .details-scroll-container');
  if (!scrollContainer) return;
  
  // Ajouter un style inline pour forcer le gap
  scrollContainer.style.gap = '20px';
  
  // Forcer le défilement horizontal
  const cards = scrollContainer.querySelectorAll('.card-wrapper');
  if (cards.length === 0) return;
  
  // Définir une largeur fixe pour chaque carte
  cards.forEach(card => {
    card.style.flex = '0 0 300px';
    card.style.minWidth = '300px';
  });
  
  // Corriger les boutons de navigation
  const prevBtn = document.querySelector('.details .prev-btn');
  const nextBtn = document.querySelector('.details .next-btn');
  
  if (prevBtn && nextBtn) {
    // Supprimer tous les écouteurs d'événements existants
    const newPrevBtn = prevBtn.cloneNode(true);
    const newNextBtn = nextBtn.cloneNode(true);
    
    prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);
    nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
    
    // Ajouter de nouveaux écouteurs d'événements simples
    newPrevBtn.addEventListener('click', function() {
      scrollContainer.scrollBy({
        left: -320,
        behavior: 'smooth'
      });
    });
    
    newNextBtn.addEventListener('click', function() {
      scrollContainer.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    });
  }
}

// Modifier la fonction enhanceDetailsCards pour appeler fixHorizontalScroll
function enhanceDetailsCards() {
  console.log("Amélioration des cartes de la section Details");
  
  // Sélectionner la section details
  const detailsSection = document.querySelector('.details');
  if (!detailsSection) {
    console.log("Section details non trouvée");
    return;
  }
  
  // Sélectionner le conteneur des cartes
  const cardsContainer = detailsSection.querySelector('.row');
  if (!cardsContainer) {
    console.log("Conteneur de cartes non trouvé");
    return;
  }
  
  // Vérifier si la transformation a déjà été faite
  if (detailsSection.querySelector('.details-scroll-container')) {
    console.log("Les cartes ont déjà été transformées");
    return;
  }
  
  // Sauvegarder le contenu original pour pouvoir le restaurer si nécessaire
  const originalContent = cardsContainer.innerHTML;
  detailsSection.setAttribute('data-original-content', originalContent);
  
  // Créer un conteneur de défilement horizontal
  const scrollContainer = document.createElement('div');
  scrollContainer.className = 'details-scroll-container';
  
  // Déplacer les cartes existantes dans le conteneur de défilement
  const cards = detailsSection.querySelectorAll('.features-card, .col-lg-4');
  if (cards.length === 0) {
    console.log("Aucune carte trouvée dans la section details");
    return;
  }
  
  // Transformer chaque carte en carte retournable
  cards.forEach(card => {
    // Créer un wrapper pour la carte
    const cardWrapper = document.createElement('div');
    cardWrapper.className = 'card-wrapper';
    
    // Créer l'élément inner pour la rotation
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    
    // Créer la face avant (en utilisant la carte existante)
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    
    // Si c'est une colonne, prendre son contenu
    if (card.classList.contains('col-lg-4')) {
      const featureCard = card.querySelector('.features-card');
      if (featureCard) {
        cardFront.appendChild(featureCard.cloneNode(true));
      } else {
        cardFront.appendChild(card.cloneNode(true));
      }
    } else {
      cardFront.appendChild(card.cloneNode(true));
    }
    
    // Ajouter un bouton pour retourner la carte
    const flipBtn = document.createElement('button');
    flipBtn.className = 'flip-btn';
    flipBtn.innerHTML = '<i class="bi bi-arrow-repeat"></i>';
    cardFront.appendChild(flipBtn);
    
    // Créer la face arrière
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    
    // Récupérer le titre de la carte
    const cardTitle = cardFront.querySelector('h3')?.textContent || 'Activité';
    
    // Contenu de la face arrière
    cardBack.innerHTML = `
      <div class="card-back-content">
        <h3>${cardTitle}</h3>
        <p>Découvrez plus d'informations sur cette activité et comment y participer. Rejoignez-nous pour vivre une expérience enrichissante!</p>
        <a href="#contact" class="btn-contact">Nous contacter</a>
        <button class="flip-back-btn"><i class="bi bi-arrow-left"></i> Retourner</button>
      </div>
    `;
    
    // Assembler la carte
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardWrapper.appendChild(cardInner);
    
    // Ajouter la carte au conteneur de défilement
    scrollContainer.appendChild(cardWrapper);
    
    // Ajouter l'événement de retournement
    flipBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      cardWrapper.classList.toggle('flipped');
    });
    
    // Ajouter l'événement pour le bouton de retour
    const flipBackBtn = cardBack.querySelector('.flip-back-btn');
    if (flipBackBtn) {
      flipBackBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        cardWrapper.classList.remove('flipped');
      });
    }
  });
  
  // Créer les indicateurs de pagination
  const paginationDots = document.createElement('div');
  paginationDots.className = 'pagination-dots';
  
  for (let i = 0; i < cards.length; i++) {
    const dot = document.createElement('div');
    dot.className = 'pagination-dot';
    if (i === 0) dot.classList.add('active');
    
    // Ajouter un événement de clic pour naviguer vers la carte correspondante
    dot.addEventListener('click', function() {
      const cardWidth = scrollContainer.querySelector('.card-wrapper').offsetWidth;
      scrollContainer.scrollTo({
        left: cardWidth * i + (i * 20), // 20px est la valeur de gap
        behavior: 'smooth'
      });
    });
    
    paginationDots.appendChild(dot);
  }
  
  // Créer l'indicateur de défilement
  const scrollIndicator = document.createElement('div');
  scrollIndicator.className = 'scroll-indicator';
  scrollIndicator.innerHTML = '<i class="bi bi-arrow-left-right"></i> Faites défiler pour voir plus';
  
  // Remplacer le contenu de la rangée par le nouveau conteneur
  cardsContainer.innerHTML = '';
  cardsContainer.appendChild(scrollContainer);
  cardsContainer.appendChild(paginationDots);
  cardsContainer.appendChild(scrollIndicator);
  
  // Mettre à jour les points de pagination lors du défilement
  scrollContainer.addEventListener('scroll', function() {
    const scrollPosition = this.scrollLeft;
    const cardWidth = this.querySelector('.card-wrapper').offsetWidth;
    const totalWidth = cardWidth + 20; // 20px est la valeur de gap
    const activeIndex = Math.round(scrollPosition / totalWidth);
    
    paginationDots.querySelectorAll('.pagination-dot').forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  });
  
  // Ajouter des boutons de navigation pour mobile
  const navButtons = document.createElement('div');
  navButtons.className = 'details-nav-buttons';
  
  const prevButton = document.createElement('button');
  prevButton.className = 'details-nav-btn prev-btn';
  prevButton.innerHTML = '<i class="bi bi-chevron-left"></i>';
  
  const nextButton = document.createElement('button');
  nextButton.className = 'details-nav-btn next-btn';
  nextButton.innerHTML = '<i class="bi bi-chevron-right"></i>';
  
  navButtons.appendChild(prevButton);
  navButtons.appendChild(nextButton);
  
  cardsContainer.appendChild(navButtons);
  
  // Ajouter les événements pour les boutons de navigation
  prevButton.addEventListener('click', function() {
    const cardWidth = scrollContainer.querySelector('.card-wrapper').offsetWidth;
    const totalWidth = cardWidth + 20; // 20px est la valeur de gap
    const scrollPosition = scrollContainer.scrollLeft;
    const activeIndex = Math.round(scrollPosition / totalWidth);
    
    if (activeIndex > 0) {
      scrollContainer.scrollTo({
        left: totalWidth * (activeIndex - 1),
        behavior: 'smooth'
      });
    }
  });
  
  nextButton.addEventListener('click', function() {
    const cardWidth = scrollContainer.querySelector('.card-wrapper').offsetWidth;
    const totalWidth = cardWidth + 20; // 20px est la valeur de gap
    const scrollPosition = scrollContainer.scrollLeft;
    const activeIndex = Math.round(scrollPosition / totalWidth);
    
    if (activeIndex < cards.length - 1) {
      scrollContainer.scrollTo({
        left: totalWidth * (activeIndex + 1),
        behavior: 'smooth'
      });
    }
  });
  
  console.log("Amélioration des cartes terminée avec succès");
  
  // Appliquer la correction spécifique pour le défilement horizontal
  setTimeout(fixHorizontalScroll, 100);
  
  // Réinitialiser tous les swipers
  setTimeout(reinitializeAllSwipers, 200);
}

// Exécuter après le chargement complet de la page
window.addEventListener('load', function() {
  // Fixer l'erreur PureCounter
  fixPureCounterError();
  
  // Initialiser PureCounter si nécessaire
  if (document.querySelector('.purecounter')) {
    try {
      new PureCounter();
    } catch (error) {
      console.error("Erreur lors de l'initialisation de PureCounter:", error);
    }
  }
  
  // Ensuite, continuer avec les autres initialisations
  setTimeout(function() {
    enhanceDetailsCards();
    setTimeout(reinitializeAllSwipers, 500);
  }, 100);
});

})();


// script.js
let currentDate = new Date();
let events = {
  '2024-07-01': {
    title: 'Proverbes Africains',
    description: 'Discussions autour des proverbes',
    color: '#FF9800',
    image: '../img/logo.png'
  },
  '2024-07-02': {
    title: 'Découverte culturelle',
    description: 'Présentation des rites et traditions',
    color: '#E91E63'
  },
  '2024-07-03': {
    title: 'Apprentissage langues',
    description: 'Session de langue Douala',
    color: '#9C27B0'
  },
  '2024-07-04': {
    title: 'Grand Débat',
    description: 'Renaissance culturelle africaine',
    color: '#2196F3'
  },
  '2024-07-05': {
    title: 'Astuces santé',
    description: 'Médecine traditionnelle',
    color: '#4CAF50'
  }
};


//image: '../img/proverbes/proverbe-13.jpg',
const blogPosts = [
  {
    id: 1,
    category: 'proverbs',
    title: 'Proverbe du jour',
    excerpt: 'Chaque arbre se développe à partir de ses propres racines',
    image: '../img/proverbes/proverbe-11.jpg',
    date: '2024-01-24',
    author: 'Admin'
  },
  {
    id: 2,
    category: 'reports',
    title: 'Compte rendu réunion',
    excerpt: 'Résumé de la réunion mensuelle',
    pdfUrl: '../pdf/calendrier-2024-paysage-4-pages.pdf',
    date: '2024-01-24',
    author: 'Admin'
  }
];

function createImageThumbnail(originalSrc) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Taille cible pour le thumbnail
      const maxWidth = 800;
      const maxHeight = 600;
      
      let width = img.width;
      let height = img.height;
      
      if (width > height) {
        if (width > maxWidth) {
          height = height * (maxWidth / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = width * (maxHeight / height);
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Appliquer un léger flou pour réduire les artefacts JPEG
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    
    img.src = originalSrc;
  });
}

async function renderBlogPosts(filter = 'all') {
  const grid = document.getElementById('blogGrid');
  const filteredPosts = filter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === filter);
  
  grid.innerHTML = '';
  
  for (const post of filteredPosts) {
    const article = document.createElement('article');
    article.className = 'blog-card';
    
    if (post.category === 'proverbs') {
      const thumbnailUrl = await createImageThumbnail(post.image);
      article.innerHTML = `
        <div class="blog-image-container">
          <img src="${thumbnailUrl}" alt="${post.title}" class="blog-image">
        </div>
        <div class="blog-content">
          <span class="blog-tag tag-proverbs">Proverbe</span>
          <h3 class="blog-title">${post.title}</h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <div class="blog-meta">
            <span>${post.date}</span>
            <span>${post.author}</span>
          </div>
        </div>
      `;
    } else {
      article.innerHTML = `
        <div class="blog-content">
          <span class="blog-tag tag-reports">Compte rendu</span>
          <h3 class="blog-title">${post.title}</h3>
          <p class="blog-excerpt">${post.excerpt}</p>
          <div class="blog-meta">
            <span>${post.date}</span>
            <span>${post.author}</span>
          </div>
        </div>
      `;
      
      article.addEventListener('click', () => openPdfViewer(post));
    }
    
    grid.appendChild(article);
  }
}

function openPdfViewer(post) {
  const modal = document.getElementById('pdfModal');
  const title = document.getElementById('pdfTitle');
  const viewer = document.getElementById('pdfViewer');
  const downloadBtn = document.getElementById('downloadPdf');
  
  title.textContent = post.title;
  viewer.innerHTML = `<iframe src="${post.pdfUrl}" width="100%" height="100%" frameborder="0"></iframe>`;
  downloadBtn.onclick = () => downloadPdf(post.pdfUrl, post.title);
  
  modal.style.display = 'block';
  
  const closeModal = () => {
    modal.style.display = 'none';
    viewer.innerHTML = '';
  };
  
  document.querySelector('.close-btn').onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
}

function downloadPdf(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', () => {
  renderBlogPosts();
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');
      renderBlogPosts(btn.dataset.filter);
    });
  });
});






// De la section about
document.addEventListener("DOMContentLoaded", function() {
  new Swiper(".events-swiper", {
    loop: true,
    autoplay: { delay: 4000 },
    speed: 500,
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    }
  });
});






document.querySelectorAll('.col-lg-3').forEach((element) => {
  element.addEventListener('click', () => {
      // Ajouter une classe temporaire pour une animation
      element.classList.add('clicked');
      
      // Retirer la classe après 300ms
      setTimeout(() => {
          element.classList.remove('clicked');
      }, 300);
      
      // Exemple : changer le texte au clic
      const statsText = element.querySelector('p');
      statsText.textContent = 'Merci !';
  });
});

/**
 * Amélioration de la section Stats
 */
function enhanceStatsSection() {
  console.log("Amélioration de la section Stats");
  
  // Sélectionner la section stats
  const statsSection = document.querySelector('.stats');
  if (!statsSection) {
    console.log("Section stats non trouvée");
    return;
  }
  
  // Ajouter des icônes plus descriptives
  const statsItems = statsSection.querySelectorAll('.col-lg-3');
  
  // Définir les icônes et descriptions pour chaque statistique
  const statsConfig = [
    { icon: 'bi-people-fill', title: 'Membres actifs', description: 'Personnes engagées dans notre association' },
    { icon: 'bi-calendar-check-fill', title: 'Projets réalisés', description: 'Initiatives menées avec succès' },
    { icon: 'bi-clock-history', title: 'Heures de bénévolat', description: 'Temps consacré à nos activités' },
    { icon: 'bi-award-fill', title: 'Récompenses', description: 'Reconnaissances de notre travail' }
  ];
  
  // Mettre à jour chaque élément de statistique
  statsItems.forEach((item, index) => {
    if (index < statsConfig.length) {
      const config = statsConfig[index];
      
      // Récupérer ou créer l'icône
      let iconElement = item.querySelector('i');
      if (!iconElement) {
        iconElement = document.createElement('i');
        item.prepend(iconElement);
      }
      
      // Mettre à jour la classe de l'icône
      iconElement.className = `bi ${config.icon}`;
      
      // Mettre à jour le texte
      const statsItem = item.querySelector('.stats-item');
      if (statsItem) {
        const counter = statsItem.querySelector('.purecounter');
        const paragraph = statsItem.querySelector('p');
        
        if (paragraph) {
          // Sauvegarder le texte original pour le restaurer après le clic
          paragraph.dataset.originalText = paragraph.textContent;
          paragraph.textContent = config.title;
        }
        
        // Ajouter une description qui apparaît au survol
        const description = document.createElement('div');
        description.className = 'stats-description';
        description.textContent = config.description;
        description.style.opacity = '0';
        description.style.transition = 'opacity 0.3s ease';
        description.style.fontSize = '14px';
        description.style.marginTop = '10px';
        description.style.color = '#666';
        statsItem.appendChild(description);
        
        // Ajouter l'événement de survol
        item.addEventListener('mouseenter', () => {
          description.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', () => {
          description.style.opacity = '0';
        });
        
        // Modifier l'événement de clic
        item.addEventListener('click', () => {
          // Ajouter une classe temporaire pour une animation
          item.classList.add('clicked');
          
          // Retirer la classe après 300ms
          setTimeout(() => {
            item.classList.remove('clicked');
          }, 300);
          
          // Animation du compteur
          if (counter) {
            const value = parseInt(counter.getAttribute('data-purecounter-end'));
            let currentValue = 0;
            const duration = 1500; // ms
            const interval = 30; // ms
            const increment = value / (duration / interval);
            
            const updateCounter = () => {
              currentValue += increment;
              if (currentValue >= value) {
                currentValue = value;
                clearInterval(timer);
                
                // Afficher un message de remerciement après l'animation
                setTimeout(() => {
                  if (paragraph) {
                    paragraph.textContent = 'Merci !';
                    
                    // Restaurer le texte original après 2 secondes
                    setTimeout(() => {
                      paragraph.textContent = paragraph.dataset.originalText;
                    }, 2000);
                  }
                }, 300);
              }
              counter.textContent = Math.floor(currentValue);
            };
            
            const timer = setInterval(updateCounter, interval);
          }
        });
      }
    }
  });
  
  console.log("Amélioration de la section Stats terminée avec succès");
}

// Exécuter après le chargement complet de la page
window.addEventListener('load', enhanceStatsSection);

/**
 * Amélioration de la section Galerie
 */
function enhanceGallerySection() {
  console.log("Amélioration de la section Galerie");
  
  // Sélectionner la section galerie
  const gallerySection = document.querySelector('.gallery');
  if (!gallerySection) {
    console.log("Section galerie non trouvée");
    return;
  }
  
  // Définir les catégories d'images
  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'events', name: 'Événements' },
    { id: 'activities', name: 'Activités' },
    { id: 'members', name: 'Membres' }
  ];
  
  // Définir les images avec leurs métadonnées
  const galleryImages = [
    {
      src: 'assets/img/ARAS/creps1.jpg',
      thumb: 'assets/img/ARAS/creps1.jpg',
      title: 'Rencontre au CREPS',
      description: 'Rencontre culturelle organisée au CREPS',
      category: 'events',
      tags: ['rencontre', 'culture']
    },
    {
      src: 'assets/img/ARAS/WhatsApp Image 2024-11-10 à 13.48.10_b77ffa95.jpg',
      thumb: 'assets/img/ARAS/WhatsApp Image 2024-11-10 à 13.48.10_b77ffa95.jpg',
      title: 'Activité de groupe',
      description: 'Membres de l\'association lors d\'une activité de groupe',
      category: 'activities',
      tags: ['groupe', 'activité']
    },
    {
      src: 'assets/img/ARAS/WhatsApp Image 2024-11-10 à 13.48.12_af8314da.jpg',
      thumb: 'assets/img/ARAS/WhatsApp Image 2024-11-10 à 13.48.12_af8314da.jpg',
      title: 'Réunion des membres',
      description: 'Réunion des membres de l\'association',
      category: 'members',
      tags: ['réunion', 'membres']
    },
    {
      src: 'assets/img/ARAS/creps2.jpg',
      thumb: 'assets/img/ARAS/creps2.jpg',
      title: 'Événement au CREPS',
      description: 'Événement culturel au CREPS',
      category: 'events',
      tags: ['événement', 'culture']
    },
    {
      src: 'assets/img/proverbes/proverbe-5.jpg',
      thumb: 'assets/img/proverbes/proverbe-5.jpg',
      title: 'Proverbe africain',
      description: 'Illustration d\'un proverbe africain',
      category: 'activities',
      tags: ['proverbe', 'sagesse']
    },
    {
      src: 'assets/img/ARAS/WhatsApp Image 2024-11-10 à 13.58.25_f0f17ea8.jpg',
      thumb: 'assets/img/ARAS/WhatsApp Image 2024-11-10 à 13.58.25_f0f17ea8.jpg',
      title: 'Activité culturelle',
      description: 'Activité culturelle avec les membres',
      category: 'activities',
      tags: ['culture', 'activité']
    },
    {
      src: 'assets/img/ARAS/Randonne.jpg',
      thumb: 'assets/img/ARAS/Randonne.jpg',
      title: 'Randonnée',
      description: 'Randonnée organisée par l\'association',
      category: 'activities',
      tags: ['randonnée', 'nature']
    },
    {
      src: 'assets/img/ARAS/creps2.jpg',
      thumb: 'assets/img/ARAS/creps2.jpg',
      title: 'Rencontre des membres',
      description: 'Rencontre des membres au CREPS',
      category: 'members',
      tags: ['rencontre', 'membres']
    }
  ];
  
  // Créer la structure de la galerie
  const galleryContainer = gallerySection.querySelector('.container');
  if (!galleryContainer) return;
  
  // Sauvegarder le titre de section
  const sectionTitle = galleryContainer.querySelector('.section-title');
  
  // Créer un nouveau conteneur
  const newContainer = document.createElement('div');
  newContainer.className = 'container';
  
  // Ajouter le titre de section
  if (sectionTitle) {
    newContainer.appendChild(sectionTitle);
  }
  
  // Créer les filtres de catégories
  const filterContainer = document.createElement('div');
  filterContainer.className = 'gallery-filters';
  
  categories.forEach(category => {
    const filterBtn = document.createElement('button');
    filterBtn.className = 'gallery-filter-btn';
    filterBtn.dataset.filter = category.id;
    filterBtn.textContent = category.name;
    if (category.id === 'all') filterBtn.classList.add('active');
    
    filterBtn.addEventListener('click', function() {
      // Mettre à jour le bouton actif
      document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');
      
      // Filtrer les images
      filterGalleryItems(category.id);
    });
    
    filterContainer.appendChild(filterBtn);
  });
  
  newContainer.appendChild(filterContainer);
  
  // Créer le conteneur de la galerie
  const galleryGrid = document.createElement('div');
  galleryGrid.className = 'gallery-grid';
  
  // Fonction pour filtrer les éléments de la galerie
  function filterGalleryItems(category) {
    const items = galleryGrid.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }
  
  // Ajouter les images à la galerie
  galleryImages.forEach((image, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.category = image.category;
    galleryItem.style.animationDelay = `${index * 100}ms`;
    
    // Créer la structure de l'élément de galerie
    galleryItem.innerHTML = `
      <div class="gallery-item-inner">
        <div class="gallery-image-wrapper">
          <img src="${image.thumb}" data-src="${image.src}" alt="${image.title}" class="gallery-image" loading="lazy">
          <div class="gallery-overlay">
            <div class="gallery-info">
              <h4>${image.title}</h4>
              <p>${image.description}</p>
              <div class="gallery-tags">
                ${image.tags.map(tag => `<span class="gallery-tag">#${tag}</span>`).join('')}
              </div>
            </div>
            <div class="gallery-actions">
              <button class="gallery-action-btn view-btn" title="Voir en plein écran">
                <i class="bi bi-arrows-fullscreen"></i>
              </button>
              <button class="gallery-action-btn share-btn" title="Partager">
                <i class="bi bi-share"></i>
              </button>
              <a href="${image.src}" download class="gallery-action-btn download-btn" title="Télécharger">
                <i class="bi bi-download"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
    
    galleryGrid.appendChild(galleryItem);
    
    // Ajouter l'événement pour voir l'image en plein écran
    const viewBtn = galleryItem.querySelector('.view-btn');
    viewBtn.addEventListener('click', () => {
      openLightbox(index);
    });
    
    // Ajouter l'événement pour partager l'image
    const shareBtn = galleryItem.querySelector('.share-btn');
    shareBtn.addEventListener('click', () => {
      if (navigator.share) {
        navigator.share({
          title: image.title,
          text: image.description,
          url: window.location.href
        }).catch(console.error);
      } else {
        alert('Le partage n\'est pas pris en charge par votre navigateur');
      }
    });
  });
  
  newContainer.appendChild(galleryGrid);
  
  // Créer le lightbox
  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-container">
      <button class="lightbox-close"><i class="bi bi-x-lg"></i></button>
      <div class="lightbox-content">
        <div class="lightbox-image-container">
          <img src="" alt="" class="lightbox-image">
        </div>
        <div class="lightbox-caption">
          <h3 class="lightbox-title"></h3>
          <p class="lightbox-description"></p>
        </div>
      </div>
      <button class="lightbox-prev"><i class="bi bi-chevron-left"></i></button>
      <button class="lightbox-next"><i class="bi bi-chevron-right"></i></button>
      <div class="lightbox-controls">
        <button class="lightbox-play-pause" title="Lecture automatique">
          <i class="bi bi-play-fill"></i>
        </button>
        <button class="lightbox-download" title="Télécharger">
          <i class="bi bi-download"></i>
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(lightbox);
  
  // Variables pour le lightbox
  let currentIndex = 0;
  let slideInterval = null;
  let isPlaying = false;
  
  // Fonction pour ouvrir le lightbox
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Fonction pour fermer le lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    stopSlideshow();
  }
  
  // Fonction pour mettre à jour le contenu du lightbox
  function updateLightboxContent() {
    const image = galleryImages[currentIndex];
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDescription = lightbox.querySelector('.lightbox-description');
    const lightboxDownload = lightbox.querySelector('.lightbox-download');
    
    lightboxImage.src = image.src;
    lightboxImage.alt = image.title;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
    lightboxDownload.onclick = () => {
      const link = document.createElement('a');
      link.href = image.src;
      link.download = image.title;
      link.click();
    };
  }
  
  // Fonction pour naviguer vers l'image précédente
  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxContent();
  }
  
  // Fonction pour naviguer vers l'image suivante
  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightboxContent();
  }
  
  // Fonction pour démarrer le diaporama
  function startSlideshow() {
    if (slideInterval) return;
    isPlaying = true;
    lightbox.querySelector('.lightbox-play-pause i').className = 'bi bi-pause-fill';
    slideInterval = setInterval(nextImage, 3000);
  }
  
  // Fonction pour arrêter le diaporama
  function stopSlideshow() {
    if (!slideInterval) return;
    isPlaying = false;
    lightbox.querySelector('.lightbox-play-pause i').className = 'bi bi-play-fill';
    clearInterval(slideInterval);
    slideInterval = null;
  }
  
  // Ajouter les événements du lightbox
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', prevImage);
  lightbox.querySelector('.lightbox-next').addEventListener('click', nextImage);
  lightbox.querySelector('.lightbox-play-pause').addEventListener('click', () => {
    if (isPlaying) {
      stopSlideshow();
    } else {
      startSlideshow();
    }
  });
  
  // Fermer le lightbox en cliquant en dehors de l'image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Navigation avec les touches du clavier
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case ' ':
        if (isPlaying) {
          stopSlideshow();
        } else {
          startSlideshow();
        }
        e.preventDefault();
        break;
    }
  });
  
  // Ajouter les contrôles de pagination
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'gallery-pagination';
  
  // Ajouter le bouton "Charger plus"
  const loadMoreBtn = document.createElement('button');
  loadMoreBtn.className = 'load-more-btn';
  loadMoreBtn.innerHTML = 'Charger plus <i class="bi bi-arrow-down-circle"></i>';
  paginationContainer.appendChild(loadMoreBtn);
  
  newContainer.appendChild(paginationContainer);
  
  // Remplacer l'ancien conteneur par le nouveau
  galleryContainer.parentNode.replaceChild(newContainer, galleryContainer);
  
  // Initialiser le lazy loading
  const lazyImages = document.querySelectorAll('.gallery-image[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }
  
  console.log("Amélioration de la section Galerie terminée avec succès");
}

// Exécuter après le chargement complet de la page
window.addEventListener('load', enhanceGallerySection);

/**
 * Correction des titres de section manquants
 */
function fixSectionTitles() {
  console.log("Correction des titres de section manquants");
  
  // Vérifier et corriger les titres de section
  const sections = ['gallery', 'testimonials', 'pricing'];
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Vérifier si le titre est visible
    const sectionTitle = section.querySelector('.section-title');
    if (sectionTitle) {
      // S'assurer que le titre est visible
      sectionTitle.style.display = 'block';
      sectionTitle.style.visibility = 'visible';
      sectionTitle.style.opacity = '1';
      
      // S'assurer que le h2 est visible
      const h2 = sectionTitle.querySelector('h2');
      if (h2) {
        h2.style.display = 'block';
        h2.style.visibility = 'visible';
        h2.style.opacity = '1';
      }
    } else {
      // Créer un titre s'il n'existe pas
      const newTitle = document.createElement('div');
      newTitle.className = 'container section-title';
      newTitle.setAttribute('data-aos', 'fade-up');
      
      // Définir le contenu du titre en fonction de la section
      let titleText = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
      let descriptionHTML = '';
      
      switch(sectionId) {
        case 'gallery':
          descriptionHTML = '<div><span>Nos</span> <span class="description-title">Photos</span></div>';
          break;
        case 'testimonials':
          descriptionHTML = '<div><span>Ce qu\'ils</span> <span class="description-title">Disent</span></div>';
          break;
        case 'pricing':
          descriptionHTML = '<div><span>Notre</span> <span class="description-title">Calendrier</span></div>';
          break;
      }
      
      newTitle.innerHTML = `<h2>${titleText}</h2>${descriptionHTML}`;
      
      // Insérer le titre au début de la section
      const firstChild = section.firstChild;
      section.insertBefore(newTitle, firstChild);
    }
  });
}


// Appeler ces fonctions après le chargement de la page
window.addEventListener('load', function() {
  // Corriger les titres de section
  fixSectionTitles();
  
});

