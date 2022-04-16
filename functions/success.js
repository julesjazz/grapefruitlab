const environment = process.env.CONTEXT;

const environmentKeys = {
  production: {
    STRIPE_KEY: process.env.STRIPE_SECRET_KEY,
    WEBHOOK_KEY: process.env.STRIPE_WEBHOOK_SECRET,
  },
  other: {
    STRIPE_KEY: process.env.STRIPE_TEST_KEY,
    WEBHOOK_KEY: process.env.STRIPE_WEBHOOK_SECRET_TEST,
  },
};

const apiKeys =
  environment !== "production"
    ? environmentKeys.other
    : environmentKeys.production;

const stripe = require("stripe")(apiKeys.STRIPE_KEY);
const client = require('../utils/sanityClient');

exports.handler = async function (event, context) {
  const { body, headers } = event;

  try {
    // 1. Check that the request is really from Stripe
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers["stripe-signature"],
      apiKeys.WEBHOOK_KEY
    );

    // 2. Handle successful payments
    if (stripeEvent.type === "checkout.session.completed") {
      const eventObject = stripeEvent.data.object;

      const session = await stripe.checkout.sessions.retrieve(eventObject.id);
      const items = await stripe.checkout.sessions.listLineItems(
        eventObject.id,
        { expand: ["data.price.product"] }
      );

      // The data to fulfill the order
      const order = items.data[0];
      const product = order.price.product;

      const doc = {
        _id: order.id,
        _type: 'ticket',
        name: session.metadata.name,
        email: session.customer_details.email,
        notes: session.metadata.note,
        performance: {
          _ref: product.metadata.sanity_id,
          _type: "reference",
        },
        checkedIn: false,
        numberOfTickets: order.quantity,
        price: order.price.unit_amount / 100,
      }

      const ticket = await client.createOrReplace(doc);

      return {
        statusCode: 200,
        body: JSON.stringify({ ticket }),
      };
    }

    return {
      statusCode: 400,
      body: 'Unknown Error',
    }

  } catch (err) {
    console.error(`Stripe webhook failed with ${err}.`);

    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    }
  }
};
