const groq = require('groq');
const client = require('../../utils/sanityClient');
const toMarkdown = require('@sanity/block-content-to-markdown');
const { responsiveImage } = require('../../filters/sanity-image');

module.exports = async function() {
  return await client.fetch(groq`
    *[_type == "company"
      && slug.current == "grapefruit-lab"
      && !(_id in path("drafts.**"))
    ][0]{
      title,
      body,
      url,
      summary,
      "social": {
        email, facebook, instagram, twitter
      },
      "image": {
        "details": image,
        "alt": imageAlt,
        "origin": *[
          _type == "sanity.imageAsset" &&
          _id == ^.image.asset._ref
        ][0]{
          alt, tags
        }
      }
    }
  `).then(data => {
    data.body = toMarkdown(data.body);
    data.hero = { 'sanity': responsiveImage(data.image) };
    return data;
  });
};
