const groq = require('groq');
const client = require('../../utils/sanityClient');
const { hero, heroAlt } = require('../../utils/imageGroq');
const toMarkdown = require('@sanity/block-content-to-markdown');

module.exports = async function() {
  return await client.fetch(groq`
    *[_type == "show"
      && !(_id in path("drafts.**"))
    ]{
      title,
      subtitle,
      summary,
      body,
      featured,
      "slug": slug.current,
      "tags": tags[]->title,
      "date": premierDate,
      "run": performance[]->{
        date, title, notes, seats,
        "id": _id,
        venue->{ title, address, mapurl },
        "tickets": *[_type == "ticket"
          && !(_id in path("drafts.**"))
          && references(^._id)
        ]{ "sold": numberOfTickets }[].sold
      },
      ${hero},
    } | order(date desc)
  `).then(data => {
    return data.map(show => {
      show.body = show.body ? toMarkdown(show.body) : '';
      show.hero = heroAlt(show.hero);
      if (show.run) {
        show.run = show.run.map((perf) => {
          // hard-coded for now
          perf.seats = perf.seats || 25;
          perf.sold = perf.tickets.reduce((sold, tix) => sold + tix, 0);
          return perf;
        });
      }

      return show;
    });
  });
};
