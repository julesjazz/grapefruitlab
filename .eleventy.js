const yaml = require('js-yaml');
const { DateTime } = require("luxon");
const util = require('util')

const md = require('markdown-it')({
  html: true,
  breaks: false,
  linkify: true,
  typographer: true,
}).disable('code');

const page = require('./filters/page');
const image = require('./filters/image');
const img = require('./filters/img');

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('lowercase', content => content.toLowerCase());
  eleventyConfig.addFilter('md', content => md.render(content));
  eleventyConfig.addFilter('mdi', content => md.renderInline(content));
  eleventyConfig.addFilter('getPage', page.getPage);
  eleventyConfig.addFilter('img', img.responsiveImage);

  eleventyConfig.addFilter("debug", function(value) {
    return util.inspect(value, {compact: false})
   });

   eleventyConfig.addFilter("readableDate", dateObj => {
    return new Date(dateObj).toDateString()
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addWatchTarget('./content/sass/');
  eleventyConfig.addPassthroughCopy('./content/css');
  eleventyConfig.addPassthroughCopy('./content/fonts');
  eleventyConfig.addPassthroughCopy('./content/favicon.svg');

  // shortcodes
  eleventyConfig.addNunjucksShortcode('image', image.image);
  eleventyConfig.addPairedShortcode('md', content => md.render(content));
  eleventyConfig.addPairedShortcode('mdi', content => md.renderInline(content));

  // collections
  eleventyConfig.addCollection('features', (collection) =>
    collection
      .getFilteredByTag('show')
      .filter((item) => item.data.feature)
      .sort((a, b) => a.date - b.date),
  );

  // config
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addDataExtension('yaml', yaml.load);
  eleventyConfig.setQuietMode(true);
  eleventyConfig.setDataDeepMerge(true);

  // settings
  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'content',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};
