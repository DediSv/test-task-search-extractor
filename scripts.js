const form = document.getElementById('searchForm');
const input = document.getElementById('searchInput');
const results = document.getElementById('results');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const query = input.value.trim();

    if (query === '') {
        results.textContent = 'Please enter a query.';
        return;
    }
//    results.textContent = `You searched for: ${query}`;
    const searchRes = [
        {
            title: 'First result',
            url: 'https://',
            description: 'This is the description of the first search result.'
        },
        {
            title: 'Second result',
            url: 'https://',
            description: 'This is the description of the second search result.'
        }
    ];
    results.innerHTML = '';

    searchRes.forEach(function (result) {
        results.innerHTML += `
            <div>
                <h2>${result.title}</h2>
                <a href = "${result.url}"> ${result.url} </a>
                <p>${result.description}</p>
            </div>
        `;
    });
});