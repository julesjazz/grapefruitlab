const groq = require('groq');
const client = require('../../utils/sanityClient');

const _ = require('lodash');

module.exports = async function() {
  const shows = await client.fetch(groq`
    *[_type == "show"
      && !(_id in path("drafts.**"))
    ]{
      title,
      onsale,
      "slug": slug.current,
      "id": _id,
      "date": premierDate,
      "run": performance[]->{
        date, notes, seats,
        "id": _id,
        "show": ^.slug.current,
        "tickets": *[_type == "ticket"
          && !(_id in path("drafts.**"))
          && references(^._id)
        ]{ name, email, numberOfTickets, checkedIn, price, notes }
      },
    }
  `);

  const perfs = shows.reduce((all, show) => {
    if (show.run) {
      show.run = show.run.map((perf) => {
        perf.seats = perf.seats || 25;
        perf.sold = perf.tickets.reduce((sold, tix) => sold + tix.numberOfTickets, 0);
        perf.onSale = Math.max(perf.seats - perf.sold, 0);

        perf.income = perf.tickets.reduce((all, item) => all + (item.price || 0), 0);
        return perf;
      });

      return all.concat(show.run);
    }

    return all;
  }, []);

  return {
    admin: { shows, perfs },
  };
};
