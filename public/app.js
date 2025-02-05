document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('aside');
    const newsContainer = document.getElementById('news-container');
    const categoryButtons = document.querySelectorAll('aside button');
    const searchInput = document.getElementById('search');

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Sidebar toggle for mobile
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Fetch and display news
    async function fetchNews(category = 'all', searchQuery = '') {
        const response = await fetch('/data/news.json'); // Fetch from the backend
        const data = await response.json();

        newsContainer.innerHTML = '';
        data.forEach(article => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.link}" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(card);
        });
    }

    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            fetchNews(category);
        });
    });

    // Search functionality
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        fetchNews('all', query);
    });

    // Initial fetch
    fetchNews();
});