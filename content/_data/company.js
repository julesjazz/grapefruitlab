const groq = require('groq');
const client = require('../../utils/sanityClient');
const { hero, heroAlt } = require('../../utils/imageGroq');
const toMarkdown = require('@sanity/block-content-to-markdown');

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
      ${hero},
    }
  `).then(data => {
    data.body = data.body ? toMarkdown(data.body) : '';
    data.hero = heroAlt(data.hero);
    return data;
  });
};
