const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const results = document.getElementById('results');

const searchButton = document.getElementById('searchButton');
const downloadButton = document.getElementById('downloadButton');

let lastSearchData = null;

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const query = input.value.trim();

    if (query === '') {
        input.focus();
        return;
    }

    downloadButton.style.display = 'none';
    lastSearchData = null;

    searchButton.disabled = true;
    searchButton.textContent = 'Searching...';

    try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Search failed');
        }

        if (data.results.length === 0) {
            results.classList.add('status-message');
            results.textContent = 'No results found.';
            return;
        }

        lastSearchData = data;
        downloadButton.style.display = 'block';

        results.classList.remove('status-message');
        results.innerHTML = '';

        data.results.forEach(function (result) {
            results.innerHTML += `
                <div>
                    <h2>${result.title}</h2>
                    <a href = "${result.url}"> ${result.url} </a>
                    <p>${result.description || ''}</p>
                </div>
            `;
        });
    } catch (err) {
        results.textContent = `Error: ${err.message}`;
        results.classList.add('status-message');
    } finally {
        searchButton.disabled = false;
        searchButton.textContent = 'Search';
    }
});

downloadButton.addEventListener('click', function () {
    const json = JSON.stringify(lastSearchData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    const fileName = lastSearchData.query
        .toLowerCase()
        .replace(/[^a-z0-9]+/gi, '-')
        .replace(/^-|-$/g, '');

    link.download = `${fileName || 'search-results'}.json`;
    link.click();

    URL.revokeObjectURL(url);

    downloadButton.textContent = 'Downloading...';

    setTimeout(function () {
        downloadButton.textContent = 'Download JSON';
    }, 1200);
});