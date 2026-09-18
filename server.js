const express = require('express');

const app = express();
const PORT = 12345;

app.use(express.static(__dirname));

app.get('/api/search', async function (req, res) {
    const query = req.query.q;

    const params = new URLSearchParams({
        engine: 'google',
        q: query,
        api_key: process.env.SERPAPI_KEY,
        location: 'Prague',
        gl: 'cz',
        hl: 'cs',
        num: '10',
        start: '0'
    });
    const response = await fetch (`https://serpapi.com/search.json?${params}`);
    const data = await response.json();

    const searchResults = (data.organic_results || []).map(function (result) {
        return {
            position: result.position,
            title: result.title,
            url: result.link,
            description: result.snippet,
        };
    });

    res.json({
        query: query,
        results: searchResults,
    });
});

app.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});