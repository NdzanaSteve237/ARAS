document.addEventListener('DOMContentLoaded', function() {
  // Données des articles de blog (à remplacer par vos vraies données)
  const blogPosts = [
    {
      id: 1,
      title: "Proverbe ancestral sur la sagesse",
      excerpt: "Découvrez comment nos ancêtres transmettaient leur sagesse à travers des proverbes séculaires.",
      category: "proverbs",
      image: "assets/img/ARAS/Rencontre.jpg",
      date: "10 Juin 2024",
      pdfUrl: "assets/pdf/proverbe-sagesse.pdf"
    },
    {
      id: 2,
      title: "Compte rendu de la randonnée culturelle",
      excerpt: "Retour sur notre dernière randonnée à la découverte des sites culturels ancestraux.",
      category: "reports",
      image: "assets/img/ARAS/Randonne.jpg",
      date: "5 Mai 2024",
      pdfUrl: "assets/pdf/compte-rendu-randonnee.pdf"
    },
    {
      id: 3,
      title: "Proverbes sur l'unité et la communauté",
      excerpt: "Exploration des proverbes africains enseignant l'importance de l'unité dans la communauté.",
      category: "proverbs",
      image: "assets/img/ARAS/mvett2.jpg",
      date: "20 Avril 2024",
      pdfUrl: "assets/pdf/proverbes-unite.pdf"
    },
    {
      id: 4,
      title: "Rapport du tournoi de football interassociations",
      excerpt: "Tous les détails et moments forts de notre dernier tournoi de football.",
      category: "reports",
      image: "assets/img/ARAS/Foot2.jpg",
      date: "12 Mars 2024",
      pdfUrl: "assets/pdf/rapport-tournoi.pdf"
    },
    {
      id: 5,
      title: "Proverbes sur la transmission du savoir",
      excerpt: "Comment les proverbes africains abordent l'importance de transmettre le savoir aux générations futures.",
      category: "proverbs",
      image: "assets/img/ARAS/Musique.jpg",
      date: "25 Février 2024",
      pdfUrl: "assets/pdf/proverbes-savoir.pdf"
    },
    {
      id: 6,
      title: "Compte rendu de l'assemblée générale",
      excerpt: "Résumé des discussions et décisions prises lors de notre dernière assemblée générale.",
      category: "reports",
      image: "assets/img/ARAS/Rencontre.jpg",
      date: "15 Janvier 2024",
      pdfUrl: "assets/pdf/compte-rendu-ag.pdf"
    }
  ];

  const blogGrid = document.getElementById("blogGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const modal = document.getElementById("pdfModal");
  const pdfViewer = document.getElementById("pdfViewer");
  const pdfTitle = document.getElementById("pdfTitle");
  const closeBtn = document.querySelector(".close-btn");
  const downloadBtn = document.getElementById("downloadPdf");
  
  let currentPdfUrl = "";
  let activeFilter = "all";
  
  // Fonction pour créer les cartes de blog
  function renderBlogCards() {
    // Vider la grille
    blogGrid.innerHTML = '<div class="loader"></div>';
    
    // Simulation de chargement
    setTimeout(() => {
      blogGrid.innerHTML = "";
      
      // Filtrer les articles
      const filteredPosts = activeFilter === "all" 
        ? blogPosts 
        : blogPosts.filter(post => post.category === activeFilter);
      
      if (filteredPosts.length === 0) {
        blogGrid.innerHTML = '<div class="no-results">Aucun article trouvé dans cette catégorie</div>';
        return;
      }
      
      // Créer les cartes
      filteredPosts.forEach((post, index) => {
        const card = document.createElement("div");
        card.className = "blog-card";
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
          <div class="blog-image-container">
            <img src="${post.image}" alt="${post.title}" class="blog-image">
            <div class="blog-image-overlay"></div>
          </div>
          <div class="blog-content">
            <span class="blog-tag tag-${post.category}">
              ${post.category === "proverbs" ? "Proverbe" : "Compte rendu"}
            </span>
            <h3 class="blog-title">${post.title}</h3>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-meta">
              <div class="blog-date">
                <i class="bi bi-calendar3"></i>
                <span>${post.date}</span>
              </div>
              <div class="blog-more">
                <span>Lire</span>
                <i class="bi bi-arrow-right"></i>
              </div>
            </div>
          </div>
        `;
        
        // Ajouter l'événement pour ouvrir le PDF
        card.addEventListener("click", () => openPdf(post));
        
        // Ajouter l'effet 3D au survol
        card.addEventListener("mousemove", handleHover3D);
        card.addEventListener("mouseleave", resetHover3D);
        
        blogGrid.appendChild(card);
      });
    }, 800);
  }
  
  // Effet 3D au survol
  function handleHover3D(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    
    card.style.setProperty('--x', x);
    card.style.setProperty('--y', -y);
    card.classList.add('hover-3d');
  }
  
  function resetHover3D(e) {
    const card = e.currentTarget;
    card.style.setProperty('--x', 0);
    card.style.setProperty('--y', 0);
    card.classList.remove('hover-3d');
  }
  
  // Fonction pour ouvrir un PDF
  function openPdf(post) {
    pdfTitle.textContent = post.title;
    currentPdfUrl = post.pdfUrl;
    
    // Créer un iframe pour le pdf (ou utiliser un objet embed)
    pdfViewer.innerHTML = `<embed src="${post.pdfUrl}" type="application/pdf" width="100%" height="100%">`;
    
    // Configurer le bouton de téléchargement
    downloadBtn.onclick = () => {
      window.open(post.pdfUrl, '_blank');
    };
    
    // Afficher la modale avec animation
    modal.style.display = "block";
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
  }
  
  // Événements pour les filtres
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      
      // Mettre à jour l'état actif des boutons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      
      // Mettre à jour le filtre actif et réafficher les cartes
      activeFilter = filter;
      renderBlogCards();
    });
  });
  
  // Fermer la modale
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
      pdfViewer.innerHTML = "";
    }, 500);
  });
  
  // Fermer la modale en cliquant en dehors
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
        pdfViewer.innerHTML = "";
      }, 500);
    }
  });
  
  // Échap pour fermer la modale
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
        pdfViewer.innerHTML = "";
      }, 500);
    }
  });
  
  // Initialiser l'affichage des cartes
  renderBlogCards();
}); 