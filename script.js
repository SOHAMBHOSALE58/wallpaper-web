// Wallpaper Database
const wallpapers = [
    {
        id: 1,
        title: "Mountain Sunset",
        category: "nature",
        filename: "wallpaper1.jpg",
        thumbnail: "thumbnails/wallpaper1-thumb.jpg",
        width: 1920,
        height: 1080,
        size: "2.4 MB"
    },
    {
        id: 2,
        title: "New York Skyline",
        category: "cities",
        filename: "wallpaper2.jpg",
        thumbnail: "thumbnails/wallpaper2-thumb.jpg",
        width: 1920,
        height: 1080,
        size: "3.1 MB"
    },
    // Add more wallpapers as needed
];

// DOM Elements
const wallpaperContainer = document.getElementById('wallpaperContainer');
const categoryButtons = document.querySelectorAll('.categories button');
const searchInput = document.getElementById('searchInput');

// Display Wallpapers
function displayWallpapers(wallpapersToShow) {
    wallpaperContainer.innerHTML = '';
    
    wallpapersToShow.forEach(wallpaper => {
        const card = document.createElement('div');
        card.className = 'wallpaper-card';
        card.innerHTML = `
            <img src="${wallpaper.thumbnail}" alt="${wallpaper.title}" class="wallpaper-img" loading="lazy">
            <div class="wallpaper-info">
                <h3>${wallpaper.title}</h3>
                <p>${wallpaper.width}x${wallpaper.height} • ${wallpaper.size}</p>
                <a href="images/${wallpaper.filename}" download="${wallpaper.title}.jpg" class="download-btn">Download HD</a>
            </div>
        `;
        wallpaperContainer.appendChild(card);
    });
}

// Filter by Category
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter wallpapers
        const category = button.dataset.category;
        if (category === 'all') {
            displayWallpapers(wallpapers);
        } else {
            const filtered = wallpapers.filter(wp => wp.category === category);
            displayWallpapers(filtered);
        }
    });
});

// Search Functionality
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    if (term === '') {
        displayWallpapers(wallpapers);
        return;
    }
    
    const results = wallpapers.filter(wp => 
        wp.title.toLowerCase().includes(term) || 
        wp.category.toLowerCase().includes(term)
    );
    
    displayWallpapers(results);
});

// Initial Load
displayWallpapers(wallpapers);