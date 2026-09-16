const express = require('express');

const app = express();
const PORT = 12345;

app.use(express.static(__dirname));

app.get('/api/search', function (req, res) {
    const query = req.query.q;

    res.json({
        query: query,
        results: [
            {
                title: 'First result',
                url: 'https://example.com/first',
                description: 'First test'
            },
            {
                title: 'Second result',
                url: 'https://example.com/second',
                description: 'Second test'
            }
        ]
    });
});

app.listen(PORT, function () {
    console.log(`Server is running on http://localhost:${PORT}`);
});