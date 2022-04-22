const groq = require('groq');
const client = require('../utils/sanityClient');

exports.handler = async (event, context) => {
  try {
    const showID = event.queryStringParameters.show;

    const show = await client.fetch(groq`
      *[_id == "${showID}"][0]{
        "run": performance[]->{
          seats,
          "id": _id,
          "tickets": *[_type == "ticket"
            && !(_id in path("drafts.**"))
            && references(^._id)
          ]{ "sold": numberOfTickets }[].sold
        },
      }
    `);

    const data = show.run.map((perf) => {
      const seats = perf.seats || 25;
      const sold = perf.tickets.reduce((sold, tix) => sold + tix, 0);
      const onSale = Math.max(seats - sold, 0);
      return {
        event: perf.id,
        seats, sold, onSale,
      };
    });
    return { statusCode: 200, body: JSON.stringify({ data }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
