const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

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

        // Ensure the `data` directory exists
        const dataDir = path.join(__dirname, '../data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir);
        }

        // Save news data to a JSON file
        fs.writeFileSync(path.join(dataDir, 'news.json'), JSON.stringify(newsData, null, 2));

        res.status(200).json({ message: 'News data updated successfully!' });
    } catch (error) {
        console.error('Error fetching or saving news:', error);
        res.status(500).json({ error: 'Failed to update news data' });
    }
};
