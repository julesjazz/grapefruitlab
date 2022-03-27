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
  let some = false;
  if (!run || !run.length) { return { some }; }

  const all = run.map((perf) => {
    const ticket = _.find(products, ['metadata.sanity_id', perf.id]);
    let seats = perf.seats - perf.sold;
    seats = seats > 0 ? seats : null;
    some = (ticket && seats) ? true : some;

    return {
      ticket,
      seats,
      event: perf.id,
      display: `${date(perf.date, 'show')} (${seats} remaining)`,
    };
  });

  return {
    all, some,
  }
}

module.exports = {
  getOptions,
  showTickets,
};
