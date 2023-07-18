const { DateTime } = require('luxon');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addWatchTarget("./src/css/");
    eleventyConfig.addPassthroughCopy("./src/images/");
    eleventyConfig.addWatchTarget("./src/images/");
    eleventyConfig.addPassthroughCopy("./src/pdfs/");
    eleventyConfig.addWatchTarget("./src/pdfs/");
    eleventyConfig.addPassthroughCopy("./src/js/");
    eleventyConfig.addWatchTarget("./src/js/");

    eleventyConfig.addPassthroughCopy("./src/favicons/");

    eleventyConfig.addFilter('readableDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
          'DDD'
        );
    });

    return {
        dir: {
            input: "src",
            output: "docs"
        }
    };
};