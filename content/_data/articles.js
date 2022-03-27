const groq = require('groq');
const client = require('../../utils/sanityClient');
const toMarkdown = require('@sanity/block-content-to-markdown');
const { responsiveImage } = require('../../filters/sanity-image');
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
      "category": *[
        _type == "category" &&
        _id == ^.category._ref
      ][0].title,
      "image": {
        "details": image,
        "alt": imageAlt,
        "origin": *[
          _type == "sanity.imageAsset" &&
          _id == ^.image.asset._ref
        ][0]{ alt, tags }
      }
    }
  `).then(data => {
    data.map(page => {
      page.body = page.body ? toMarkdown(page.body) : '';
      page.hero = page.image.details ? { 'sanity': responsiveImage(page.image) } : null;
      return page;
    });

    return _.groupBy(data, item => item.category);
  });
};
