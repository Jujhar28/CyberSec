const axios = require('axios');
const fs = require('fs');

module.exports = async (req, res) => {
    const rssFeedUrl = 'https://feeds.feedburner.com/TheHackersNews';
    const response = await axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`);
    const newsData = response.data.items;

    // Save news data to a JSON file
    fs.writeFileSync('./data/news.json', JSON.stringify(newsData, null, 2));

    res.status(200).json({ message: 'News data updated successfully!' });
};