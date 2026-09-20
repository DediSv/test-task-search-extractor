# Google Search Extractor

Technical assignment: a simple web application that retrieves organic Google search results and allows them to be exported as JSON.

## Live Demo

https://test-task-search-extractor.onrender.com/

> The application is hosted on a free Render instance, so the first request after inactivity may take longer.

## Tech Stack

- Node.js
- Express
- JavaScript
- HTML / CSS
- SerpApi
- Vitest
- Supertest
- Render

## How it works

The frontend sends a search query to the Express backend through:

```text
GET /api/search?q=...
```

The backend calls SerpApi, uses only `organic_results`, transforms the response into a simplified format and returns it to the browser.

The SerpApi key is stored only on the server as an environment variable.

## Tests

Run:

```bash
npm test
```

The project includes:

- unit tests for search result transformation
- API tests for the Express search endpoint
- mocked external API responses

## Local run

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

A `SERPAPI_KEY` environment variable is required for local search requests.