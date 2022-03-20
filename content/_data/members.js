const groq = require('groq');
const client = require('../../utils/sanityClient');
const toMarkdown = require('@sanity/block-content-to-markdown');
const { responsiveImage } = require('../../filters/sanity-image');
const _ = require('lodash');

module.exports = async function() {
  return await client.fetch(groq`
    *[_type == "member"
      && !(_id in path("drafts.**"))
      && active
    ]{
      bio, name, nickname, pronouns, summary,
      "slug": slug.current,
      "social": {
        url, email, facebook, instagram, twitter
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
    return data.map(member => {
      member.bio = member.bio ? toMarkdown(member.bio) : '';
      member.hero = member.image.details ? { 'sanity': responsiveImage(member.image) } : null;
      return member;
    });
  });
};
