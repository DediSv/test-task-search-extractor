const { transformSearchResults } = require('./searchUtils');

describe('transformSearchResults', function () {
    it('transforms SerpApi organic results into application format', function () {
        const input = [
            {
                position: 1,
                title: 'Example result',
                link: 'https://example.com',
                snippet: 'Example description'
            }
        ];

        const output = transformSearchResults(input);

        expect(output).toEqual([
            {
                position: 1,
                title: 'Example result',
                url: 'https://example.com',
                description: 'Example description'
            }
        ]);
    });

    it('preserves order of multiple results', function () {
        const input = [
            {
                position: 1,
                title: 'First',
                link: 'https://first.com',
                snippet: 'First description'
            },
            {
                position: 2,
                title: 'Second',
                link: 'https://second.com',
                snippet: 'Second description'
            }
        ];

        const output = transformSearchResults(input);

        expect(output[0].title).toBe('First');
        expect(output[1].title).toBe('Second');
        expect(output).toHaveLength(2);
    });

    it('returns an empty array when no results are provided', function () {
        const output = transformSearchResults(undefined);

        expect(output).toEqual([]);
    });
});