const groq = require('groq');
const client = require('../../utils/sanityClient');
const { hero, heroAlt } = require('../../utils/imageGroq');
const toMarkdown = require('@sanity/block-content-to-markdown');
const _ = require('lodash');

module.exports = async function() {
  return await client.fetch(groq`
    *[_type == "article"
      && !(_id in path("drafts.**"))
    ]{
      title,
      subtitle,
      summary,
      body,
      "slug": slug.current,
      "tags": tags[]->title,
      "date": _createdAt,
      "category": category->title,
      ${hero},
    }
  `).then(data => {
    data.map(page => {
      page.body = page.body ? toMarkdown(page.body) : '';
      page.hero = heroAlt(page.hero);
      return page;
    });

    return _.groupBy(data, item => item.category);
  });
};
