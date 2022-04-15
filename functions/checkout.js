const environment = process.env.CONTEXT;

const api_key = environment !== "production"
  ? process.env.STRIPE_TEST_KEY
  : process.env.STRIPE_SECRET_KEY;

const stripe = require("stripe")(api_key);
const groq = require('groq');
const client = require('../utils/sanityClient');

exports.handler = async function (event, context) {
  const referer = event.headers.referer;
  // JSON.parse doesn't work here
  const params = new URLSearchParams(event.body);
  const product = params.get("product").split('@event@');
  const name = params.get("name");
  const note = params.get("note");
  const price = parseFloat(params.get("price"), 10);
  const count = parseInt(params.get("count"), 10);
  const max = parseInt(params.get("max"), 10);

  const productID = product[0];
  const eventID = product[1];

  const eventData = await client.fetch(groq`
    *[_id == "${eventID}"][0]{
      seats,
      "tickets": *[_type == "ticket"
        && !(_id in path("drafts.**"))
        && references(^._id)
      ]{ "sold": numberOfTickets }[].sold
    }
  `)

  const seats = eventData.seats || 25;
  const sold = eventData.tickets.reduce((sold, tix) => sold + tix, 0);
  const productMax = seats - sold;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product: productID,
          unit_amount: price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: productMax || max,
        },
        quantity: count,
      },
    ],
    mode: "payment",
    metadata: { name, note },
    success_url: "https://grapefruitlab.com/thanks",
    // go back to page that they were on
    cancel_url: referer,
  });

  return {
    statusCode: 303,
    headers: {
      Location: session.url,
    },
  };
};
