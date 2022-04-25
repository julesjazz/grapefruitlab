const groq = require('groq');
const client = require('../../utils/sanityClient');

module.exports = async function() {
  const data = await client.fetch(groq`
    *[_type == "sanity.imageAsset"
      && !(_id in path("drafts.**"))
      && (count(tags) > 0)
    ]
  `);

  return data;
};
