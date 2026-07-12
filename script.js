const projects = [
  {
    title: "Protocol 1963",
    description: "Soviet horror surveillance experience. Full gameplay core structural architecture, functional security camera network matrix, data-saving terminals, and highly atmospheric operational UI elements matching historical reference assets.",
    thumbnail: "IMG_4192.png",
    images: ["IMG_4192.png", "IMG_4193.png", "IMG_4195.png"],
    video: "",
    technologies: ["Luau", "Full Stack Scripting", "Data Management", "Custom Sound Matrix"],
    category: "scripting"
  },
  {
    title: "Soviet Subterranean Corridor",
    description: "Detailed containment corridor infrastructure build emphasizing realistic material layering patterns, specialized environmental geometry configuration, and highly immersive volumetric field configurations.",
    thumbnail: "IMG_4195.png",
    images: ["IMG_4195.png", "IMG_4193.png"],
    video: "",
    technologies: ["Environment Design", "Atmospheric Lighting", "LOD Optimization"],
    category: "building"
  },
  {
    title: "Operational Base Command UI",
    description: "Pixel-perfect modern operational terminal displaying real-time data parameters from server engines. Responsive build mapped cleanly across standard configurations to minimize interface obstruction scaling bugs.",
    thumbnail: "IMG_4193.png",
    images: ["IMG_4193.png", "IMG_4192.png"],
    video: "",
    technologies: ["Tween Engine", "Responsive Design", "Data Sync Framework"],
    category: "ui"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initBgAnimation();
  renderPortfolio(projects);
  initPortfolioFilters();
  initNavbarScroll();
  initMobileMenu();
  initScrollReveal();
  initModalClose();
});

function initBgAnimation() {
  const container = document.getElementById("bg-animation");
  const numCircles = 3;
  for (let i = 0; i < numCircles; i++) {
    const circle = document.createElement("div");
    circle.classList.add("bg-circle");
    const size = Math.random() * 300 + 200;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${Math.random() * 80}%`;
    circle.style.top = `${Math.random() * 80}%`;
    circle.style.animationDelay = `${i * 3}s`;
    container.appendChild(circle);
  }
}

function renderPortfolio(projectItems) {
  const grid = document.getElementById("portfolio-grid");
  grid.innerHTML = "";
  
  projectItems.forEach((proj, index) => {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.setAttribute("data-category", proj.category);
    
    let tagMarkup = proj.technologies.slice(0, 2).map(t => `<span class="project-tag">${t}</span>`).join("");
    
    card.innerHTML = `
      <div class="project-thumb-container">
        <img src="${proj.thumbnail}" alt="${proj.title}" class="project-thumb" loading="lazy">
        <div class="project-overlay-icon">↗</div>
      </div>
      <div class="project-body">
        <div class="project-tags">${tagMarkup}</div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
      </div>
    `;
    
    card.addEventListener("click", () => openProjectModal(proj));
    grid.appendChild(card);
  });
}

function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filterValue = btn.getAttribute("data-filter");
      const filtered = filterValue === "all" ? projects : projects.filter(p => p.category === filterValue);
      renderPortfolio(filtered);
    });
  });
}

function openProjectModal(project) {
  const modal = document.getElementById("project-modal");
  document.getElementById("modal-project-title").textContent = project.title;
  document.getElementById("modal-project-category").textContent = project.category;
  document.getElementById("modal-project-desc").textContent = project.description;
  
  const techWrapper = document.getElementById("modal-project-tech");
  techWrapper.innerHTML = project.technologies.map(t => `<span class="project-tag">${t}</span>`).join("");
  
  const mainMedia = document.getElementById("modal-main-media");
  const thumbTrack = document.getElementById("modal-thumbnails");
  mainMedia.innerHTML = "";
  thumbTrack.innerHTML = "";
  
  let mediaElements = [];
  
  if (project.video) {
    if (project.video.includes("youtube.com") || project.video.includes("youtu.be")) {
      mediaElements.push({ type: "youtube", src: project.video });
    } else {
      mediaElements.push({ type: "mp4", src: project.video });
    }
  }
  
  if (project.images && project.images.length > 0) {
    project.images.forEach(img => {
      mediaElements.push({ type: "image", src: img });
    });
  } else {
    mediaElements.push({ type: "image", src: project.thumbnail });
  }
  
  function setMainMedia(item) {
    mainMedia.innerHTML = "";
    if (item.type === "youtube") {
      let videoId = item.src.split("v=")[1] || item.src.split("/").pop();
      if(videoId.includes("&")) videoId = videoId.split("&")[0];
      mainMedia.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`;
    } else if (item.type === "mp4") {
      mainMedia.innerHTML = `<video src="${item.src}" controls autoplay muted loops></video>`;
    } else {
      mainMedia.innerHTML = `<img src="${item.src}" alt="Showcase asset">`;
    }
  }
  
  setMainMedia(mediaElements[0]);
  
  if (mediaElements.length > 1) {
    mediaElements.forEach((media, i) => {
      const thumb = document.createElement("img");
      thumb.src = media.type === "image" ? media.src : project.thumbnail;
      thumb.classList.add("media-thumb");
      if (i === 0) thumb.classList.add("active");
      
      thumb.addEventListener("click", () => {
        document.querySelectorAll(".media-thumb").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
        setMainMedia(media);
      });
      thumbTrack.appendChild(thumb);
    });
  }
  
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function initModalClose() {
  const modal = document.getElementById("project-modal");
  const closeBtn = document.getElementById("modal-close-btn");
  const backdrop = modal.querySelector(".modal-backdrop");
  
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    document.getElementById("modal-main-media").innerHTML = "";
  };
  
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
}

function initNavbarScroll() {
  const sections = document.querySelectorAll("section, header");
  const navLinks = document.querySelectorAll(".nav-link");
  
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 120) {
        current = section.getAttribute("id");
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });
}

function initMobileMenu() {
  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-link");
  
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
  
  links.forEach(l => {
    l.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  
  const revealOnScroll = () => {
    reveals.forEach(r => {
      const windowHeight = window.innerHeight;
      const elementTop = r.getBoundingClientRect().top;
      const elementVisible = 100;
      
      if (elementTop < windowHeight - elementVisible) {
        r.classList.add("active");
      }
    });
  };
  
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
}
