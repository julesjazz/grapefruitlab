const groq = require('groq');
const client = require('../../utils/sanityClient');
const toMarkdown = require('@sanity/block-content-to-markdown');
const { responsiveImage } = require('../../filters/sanity-image');

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
      } | order(date asc),
      "image": {
        "details": image,
        "alt": imageAlt,
        "origin": *[
          _type == "sanity.imageAsset" &&
          _id == ^.image.asset._ref
        ][0]{ alt, tags }
      }
    } | order(premierDate asc)
  `).then(data => {
    return data.map(show => {
      show.body = show.body ? toMarkdown(show.body) : '';
      show.hero = show.image.details
        ? { 'sanity': responsiveImage(show.image) }
        : null;
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
