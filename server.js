const express = require('express');
const { transformSearchResults } = require('./searchUtils');

const app = express();
const PORT = process.env.PORT || 12345;

app.use(express.static('public'));

app.get('/api/search', async function (req, res) {
    const query = req.query.q?.trim();

    if (!query) {
        return res.status(400).json({
            error: 'Search query required'
        })
    }

    try {
        const params = new URLSearchParams({
            engine: 'google',
            q: query,
            api_key: process.env.SERPAPI_KEY,
            location: 'Prague',
            google_domain: 'google.cz',
            gl: 'cz',
            hl: 'cs',
            device: 'desktop',
            num: '10',
            start: '0'
        });
        const response = await fetch(`https://serpapi.com/search.json?${params}`,
            {
                signal: AbortSignal.timeout(20000)
                }
        );
        const data = await response.json();

        if (!response.ok || data.error) {
            return res.status(502).json({
                error: data.error || 'Search service error'
            });
        }

        const searchResults = transformSearchResults(data.organic_results);

        res.json({
            query: query,
            results: searchResults,
        });
    } catch (err) {
        console.error(err);

        if (err.name === 'TimeoutError') {
            return res.status(504).json({
                error: 'Service time out. Try again later.'
            });
        }
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
});

if (require.main === module) {
    app.listen(PORT, function () {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;