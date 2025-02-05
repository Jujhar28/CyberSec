const Parser = require('rss-parser');

module.exports = async (req, res) => {
    try {
        const parser = new Parser();
        const rssFeedUrl = 'https://feeds.feedburner.com/TheHackersNews'; // Replace with your desired RSS feed
        const feed = await parser.parseURL(rssFeedUrl);

        // Format the news data
        const newsData = feed.items.map(item => ({
            title: item.title,
            description: item.contentSnippet || item.content,
            link: item.link,
            category: "all" // Add a default category or extract it from the feed
        }));

        // Return the news data as the API response
        res.status(200).json(newsData);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news data' });
    }
};
