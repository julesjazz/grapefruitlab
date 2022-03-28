const groq = require('groq');
const client = require('../../utils/sanityClient');
const { hero, heroAlt } = require('../../utils/imageGroq');
const toMarkdown = require('@sanity/block-content-to-markdown');

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
      ${hero},
    }
  `).then(data => {
    return data.map(member => {
      member.bio = member.bio ? toMarkdown(member.bio) : '';
      member.hero = heroAlt(member.hero);
      return member;
    });
  });
};
