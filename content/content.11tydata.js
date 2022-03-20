const page = require('../filters/page');
const _ = require('lodash');

module.exports = {
  eleventyComputed: {
    cms: data => data.partial ? page.fromCms(data.articles.partial, data.partial) : null,
    tags: data => _.merge(data.tags, data.cms ? data.cms.tags : []),
    title: data => data.cms ? data.cms.title : data.title,
    summary: data => data.cms ? data.cms.summary : data.summary,
    date: data => data.cms ? data.cms.date : data.page.date,
    image: data => data.cms ? data.cms.hero : data.image,
  }
};
