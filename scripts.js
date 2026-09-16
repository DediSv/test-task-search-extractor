const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const results = document.getElementById('results');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const query = input.value.trim();

    if (query === '') {
        results.textContent = 'Please enter a query.';
        return;
    }

    const response = await fetch (`/api/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    results.innerHTML = '';

    data.results.forEach(function (result) {
        results.innerHTML += `
            <div>
                <h2>${result.title}</h2>
                <a href = "${result.url}"> ${result.url} </a>
                <p>${result.description}</p>
            </div>
        `;
    });
});