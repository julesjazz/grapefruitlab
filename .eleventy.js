const nav = require('@11ty/eleventy-navigation');

const yaml = require('js-yaml');
const mdown = require('markdown-it')({
  html: true,
  breaks: false,
  linkify: true,
  typographer: true,
}).disable('code');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(nav);

  eleventyConfig.addFilter('md', mdown.render);
  eleventyConfig.addFilter('mdi', mdown.renderInline);

  eleventyConfig.addWatchTarget('./content/sass/');
  eleventyConfig.addPassthroughCopy('./content/css');
  eleventyConfig.addPassthroughCopy('./content/fonts');
  eleventyConfig.addPassthroughCopy('./content/favicon.svg');

  // shortcodes
  eleventyConfig.addPairedShortcode('md', mdown.render);
  eleventyConfig.addPairedShortcode('mdi', mdown.renderInline);

  // config
  eleventyConfig.setLibrary('md', mdown);
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
