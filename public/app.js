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
        try {
            const response = await fetch('/data/news.json'); // Fetch from the backend
            if (!response.ok) throw new Error('Failed to fetch news data');
            const data = await response.json();

            // Clear the news container
            newsContainer.innerHTML = '';

            // Filter news based on category and search query
            const filteredNews = data.filter(article => {
                const matchesCategory = category === 'all' || article.category === category;
                const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                      article.description.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });

            // Display filtered news
            if (filteredNews.length === 0) {
                newsContainer.innerHTML = '<p>No news found.</p>';
            } else {
                filteredNews.forEach(article => {
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
        } catch (error) {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
        }
    }

    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            fetchNews(category);
        });
    });

    // Debounced search functionality
    let debounceTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const query = searchInput.value.trim();
            fetchNews('all', query);
        }, 300); // Adjust debounce time as needed
    });

    // Initial fetch
    fetchNews();
});
