const yaml = require('js-yaml');
const util = require('util')
const _ = require('lodash');
const typogr = require('typogr');

const md = require('markdown-it')({
  html: true,
  breaks: false,
  linkify: true,
  typographer: true,
}).disable('code');

const time = require('./filters/time');
const page = require('./filters/page');
const forms = require('./filters/forms');
const img = require('./filters/sanity-image');

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('md', content => md.render(content));
  eleventyConfig.addFilter('mdi', content => md.renderInline(content));

  eleventyConfig.addFilter('getPage', page.getPage);
  eleventyConfig.addFilter('fromCms', page.fromCms);

  eleventyConfig.addFilter('find', _.find);
  eleventyConfig.addFilter('filter', _.filter);
  eleventyConfig.addFilter('merge', _.merge);
  eleventyConfig.addFilter('groupBy', _.groupBy);
  eleventyConfig.addFilter('sortBy', _.sortBy);

  eleventyConfig.addFilter('typogr', typogr.typogrify);

  eleventyConfig.addFilter("date", time.date);
  eleventyConfig.addFilter('htmlDate', time.htmlDate);

  eleventyConfig.addFilter("debug", function(value) {
    return util.inspect(value, {compact: false})
   });

  eleventyConfig.addFilter('getOptions', forms.getOptions);
  eleventyConfig.addFilter('showTickets', forms.showTickets);

  eleventyConfig.addFilter('img', img.img);

  eleventyConfig.addFilter('find', _.find);
  eleventyConfig.addFilter('filter', _.filter);
  eleventyConfig.addFilter('merge', _.merge);
  eleventyConfig.addFilter('groupBy', _.groupBy);
  eleventyConfig.addFilter('sortBy', _.sortBy);

  eleventyConfig.addFilter('typogr', typogr.typogrify);

  eleventyConfig.addFilter("date", time.date);
  eleventyConfig.addFilter('htmlDate', time.htmlDate);

  eleventyConfig.addFilter('jsonify', (obj) => JSON.stringify(obj));
  eleventyConfig.addFilter('lowercase', content => content.toLowerCase());

  eleventyConfig.addFilter("debug", function(value) {
    return util.inspect(value, {compact: false})
  });

  // shortcodes
  eleventyConfig.addNunjucksShortcode('img', img.img);
  eleventyConfig.addPairedShortcode('md', content => md.render(content));
  eleventyConfig.addPairedShortcode('mdi', content => md.renderInline(content));

  // collections
  eleventyConfig.addCollection('features', (collection) => {
    return collection
      .getFilteredByTag('show')
      .filter((item) => item.data.feature)
      .sort((a, b) => a.date - b.date);
  });

  // config
  eleventyConfig.addWatchTarget('./content/sass/');
  eleventyConfig.addPassthroughCopy('./content/css');
  eleventyConfig.addPassthroughCopy('./content/fonts');
  eleventyConfig.addPassthroughCopy('./content/favicon.svg');

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
