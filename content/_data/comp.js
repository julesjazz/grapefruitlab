const groq = require('groq');
const client = require('../../utils/sanityClient');
const toMarkdown = require('@sanity/block-content-to-markdown')

module.exports =  async function() {
  return await client.fetch(groq`
    *[_type == "company"
      && slug.current == "grapefruit-lab"
      && !(_id in path("drafts.**"))
    ][0]{
      title, body, image,
    }
  `)
};
