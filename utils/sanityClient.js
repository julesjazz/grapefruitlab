const environment = process.env.CONTEXT;

const sanityClient = require("@sanity/client");

const { sanity } = require('../client-config')

module.exports = sanityClient({
  ...sanity,
  useCdn: false,
  token: process.env.SANITY_EDIT_TOKEN
});
