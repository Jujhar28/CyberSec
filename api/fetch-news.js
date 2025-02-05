const Parser = require('rss-parser');
const fs = require('fs');

// Initialize RSS Parser
const parser = new Parser();

module.exports = async (req, res) => {
    try {
        // Fetch news from The Hacker News RSS feed
        const rssFeedUrl = 'https://feeds.feedburner.com/TheHackersNews';
        const feed = await parser.parseURL(rssFeedUrl);

        // Format the news data
        const newsData = feed.items.map(item => ({
            title: item.title,
            description: item.contentSnippet || item.content,
            link: item.link,
            category: 'all' // Default category (you can customize this based on the feed)
        }));

        // Save news data to a JSON file
        fs.writeFileSync('./data/news.json', JSON.stringify(newsData, null, 2));

        // Respond with success message
        res.status(200).json({ message: 'News data updated successfully!', count: newsData.length });
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news data' });
    }
};
