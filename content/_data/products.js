require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

const environment = process.env.CONTEXT;
const api_key = environment !== "production"
  ? process.env.STRIPE_TEST_KEY
  : process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(api_key);

module.exports = async function() {
  const list = await stripe.products.list({
    active: true,
  });

  return list.data;
};
