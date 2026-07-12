const projects = [
    {
        id: 1,
        title: "Advanced Inventory System",
        description: "Custom DataStore-backed inventory with drag and drop capabilities.",
        thumbnail: "thumbnail1.jpg",
        category: "scripting",
        technologies: ["Luau", "DataStoreService"]
    },
    {
        id: 2,
        title: "Modern HUD UI",
        description: "Responsive interface featuring animated transitions.",
        thumbnail: "thumbnail2.jpg",
        category: "ui",
        technologies: ["TweenService", "CanvasGroup"]
    }
];

const container = document.getElementById('project-container');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-modal');

function renderProjects(filter = 'all') {
    container.innerHTML = '';
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    
    filtered.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.category}</p>
        `;
        card.onclick = () => openModal(project);
        container.appendChild(card);
    });
}

function openModal(project) {
    modalBody.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <p>Tech: ${project.technologies.join(', ')}</p>
    `;
    modal.style.display = 'block';
}

closeBtn.onclick = () => modal.style.display = 'none';

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderProjects(e.target.getAttribute('data-category'));
    };
});

renderProjects();
