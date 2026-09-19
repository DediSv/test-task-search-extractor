const request = require('supertest');
const originalFetch = global.fetch;
const app = require('./server');

describe('GET /api/search', function () {
    afterEach(function () {
        global.fetch = originalFetch;
    });

    it('returns 400 when query is missing', async function () {
        const response = await request(app)
            .get('/api/search');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Search query required'
        });
    });

    it('returns transformed search results', async function () {
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async function () {
                return {
                    organic_results: [
                        {
                            position: 1,
                            title: 'Example result',
                            link: 'https://example.com',
                            snippet: 'Example description'
                        }
                    ]
                };
            }
        });

        const response = await request(app)
            .get('/api/search?q=test');

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            query: 'test',
            results: [
                {
                    position: 1,
                    title: 'Example result',
                    url: 'https://example.com',
                    description: 'Example description'
                }
            ]
        });
    });

    it('returns 502 when search service returns an error', async function () {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            json: async function () {
                return {
                    error: 'Search service unavailable'
                };
            }
        });

        const response = await request(app)
            .get('/api/search?q=test');

        expect(response.status).toBe(502);

        expect(response.body).toEqual({
            error: 'Search service unavailable'
        });
    });
});