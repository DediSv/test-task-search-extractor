function transformSearchResults(organicResults) {
    const results = organicResults || [];

    const transformedResults = results.map(function (result) {
        const transformed = {
            position: result.position,
            title: result.title,
            url: result.link,
            description: result.snippet
        };
        return transformed;
    });
    return transformedResults;
}

module.exports = {
    transformSearchResults
}
