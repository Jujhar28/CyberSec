const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    try {
        const rssFeedUrl = 'https://feeds.feedburner.com/TheHackersNews';
        const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`);
        const newsData = response.data.items;

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
