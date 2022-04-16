'use strict';

const { date } = require("./time");
const _ = require('lodash');

const getOptions = (collection, key, value) => {
  return _.reduce(collection, (options, option) => {
    const optKey = _.get(option, key);
    const optVal = value ? _.get(option, value) : optKey;
    if (optKey) {
      options[optKey] = optVal;
    }
    return options;
  }, {});
};

const showTickets = (run, products) => {
  if (!run || !run.length) { return null; }

  return run.map((perf) => {
    const ticket = _.find(products, ['metadata.sanity_id', perf.id]);
    let seats = perf.seats - perf.sold;
    seats = seats > 0 ? seats : null;

    return {
      ticket,
      seats,
      event: perf.id,
      value: ticket ? `${ticket.id}@event@${perf.id}` : null,
      display: `${date(perf.date, 'show')}`,
    };
  }).filter((perf) => perf.seats && perf.ticket);
}

module.exports = {
  getOptions,
  showTickets,
};
