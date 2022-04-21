const page = require('../../filters/page');
const _ = require('lodash');

module.exports = {
  layout: 'script',
  eleventyComputed: {
    cms: data => data.script ? page.fromCms(data.articles.script, data.script) : null,
    title: data => data.cms ? data.cms.title : data.title,
    subtitle: data => data.cms ? data.cms.subtitle : data.subtitle,
    summary: data => data.cms ? data.cms.summary : data.summary,
    date: data => data.cms ? data.cms.date : data.page.date,
    image: data => data.cms ? data.cms.hero : data.image,
  }
};
