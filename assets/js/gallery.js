// Script pour la galerie futuriste
document.addEventListener('DOMContentLoaded', function() {
  // Données des images de la galerie
  const galleryData = [
    {
      id: 1,
      src: 'assets/img/gallery/gallery-1.jpg',
      alt: 'Cérémonie traditionnelle',
      title: 'Cérémonie traditionnelle',
      category: 'Événements',
      delay: 100
    },
    {
      id: 2,
      src: 'assets/img/gallery/gallery-2.jpg',
      alt: 'Atelier de danse',
      title: 'Atelier de danse',
      category: 'Ateliers',
      delay: 200
    },
    {
      id: 3,
      src: 'assets/img/gallery/gallery-3.jpg',
      alt: 'Conférence culturelle',
      title: 'Conférence culturelle',
      category: 'Conférences',
      delay: 300
    },
    {
      id: 4,
      src: 'assets/img/gallery/gallery-4.jpg',
      alt: 'Exposition d\'art africain',
      title: 'Exposition d\'art africain',
      category: 'Expositions',
      delay: 400
    },
    {
      id: 5,
      src: 'assets/img/gallery/gallery-5.jpg',
      alt: 'Festival multiculturel',
      title: 'Festival multiculturel',
      category: 'Festivals',
      delay: 500
    },
    {
      id: 6,
      src: 'assets/img/gallery/gallery-6.jpg',
      alt: 'Atelier linguistique',
      title: 'Atelier linguistique',
      category: 'Ateliers',
      delay: 600
    },
    {
      id: 7,
      src: 'assets/img/gallery/gallery-7.jpg',
      alt: 'Sortie culturelle',
      title: 'Sortie culturelle',
      category: 'Excursions',
      delay: 700
    },
    {
      id: 8,
      src: 'assets/img/gallery/gallery-8.jpg',
      alt: 'Soirée de gala',
      title: 'Soirée de gala',
      category: 'Événements',
      delay: 800
    }
  ];
  
  // Récupérer la grille de la galerie
  const galleryGrid = document.querySelector('.gallery-grid');
  
  // Si la grille existe, y ajouter les images
  if (galleryGrid) {
    galleryData.forEach(item => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.setAttribute('data-id', item.id);
      galleryItem.setAttribute('data-aos', 'fade-up');
      galleryItem.setAttribute('data-aos-delay', item.delay);
      
      galleryItem.innerHTML = `
        <img src="${item.src}" alt="${item.alt}" class="gallery-img">
        <div class="gallery-info">
          <h3 class="gallery-title">${item.title}</h3>
          <span class="gallery-category">${item.category}</span>
        </div>
      `;
      
      galleryGrid.appendChild(galleryItem);
    });
  }
  
  // Variables pour l'overlay
  const overlay = document.querySelector('.gallery-overlay');
  const overlayImg = document.querySelector('.overlay-img');
  const overlayCaption = document.querySelector('.overlay-caption');
  const closeBtn = document.querySelector('.overlay-close');
  const prevBtn = document.querySelector('.overlay-prev');
  const nextBtn = document.querySelector('.overlay-next');
  
  let currentIndex = 0;
  
  // Fonction pour ouvrir l'overlay
  function openOverlay(index) {
    currentIndex = index;
    const item = galleryData[index];
    
    overlayImg.src = item.src;
    overlayImg.alt = item.alt;
    overlayCaption.textContent = item.title + ' - ' + item.category;
    
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêcher le défilement
  }
  
  // Fonction pour fermer l'overlay
  function closeOverlay() {
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Réactiver le défilement
  }
  
  // Fonction pour naviguer vers l'image précédente
  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    const item = galleryData[currentIndex];
    
    // Animation simple
    overlayImg.style.opacity = 0;
    
    setTimeout(() => {
      overlayImg.src = item.src;
      overlayImg.alt = item.alt;
      overlayCaption.textContent = item.title + ' - ' + item.category;
      overlayImg.style.opacity = 1;
    }, 300);
  }
  
  // Fonction pour naviguer vers l'image suivante
  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    const item = galleryData[currentIndex];
    
    // Animation simple
    overlayImg.style.opacity = 0;
    
    setTimeout(() => {
      overlayImg.src = item.src;
      overlayImg.alt = item.alt;
      overlayCaption.textContent = item.title + ' - ' + item.category;
      overlayImg.style.opacity = 1;
    }, 300);
  }
  
  // Ajouter les écouteurs d'événements
  document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', () => openOverlay(index));
  });
  
  if (closeBtn) closeBtn.addEventListener('click', closeOverlay);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  
  // Fermer l'overlay avec la touche Echap
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeOverlay();
    } else if (e.key === 'ArrowLeft' && overlay.classList.contains('active')) {
      prevImage();
    } else if (e.key === 'ArrowRight' && overlay.classList.contains('active')) {
      nextImage();
    }
  });
  
  // Fermer l'overlay en cliquant en dehors de l'image
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      closeOverlay();
    }
  });
  
  // Effet de parallaxe pour les images au survol
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  galleryItems.forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      item.style.transform = `translateY(-10px) rotateX(${y * 10}deg) rotateY(${-x * 10}deg)`;
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
  
  // Animation aléatoire d'une image toutes les X secondes
  function randomImageAnimation() {
    if (galleryItems.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * galleryItems.length);
    const randomItem = galleryItems[randomIndex];
    
    randomItem.style.transform = 'translateY(-15px) scale(1.05)';
    
    setTimeout(() => {
      randomItem.style.transform = '';
    }, 1000);
    
    setTimeout(randomImageAnimation, Math.random() * 5000 + 3000);
  }
  
  setTimeout(randomImageAnimation, 3000);
}); 