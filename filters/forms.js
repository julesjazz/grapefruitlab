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

  let hasSelected = false;

  return run
    .sort((a, b) => a.date - b.date )
    .map((perf) => {
    const ticket = _.find(products, ['metadata.sanity_id', perf.id]);
    const onSale = perf.seats - perf.sold;
    let selected = null;

    if (ticket && onSale > 0 && !hasSelected) {
      hasSelected = true;
      selected = true;
    }

    const perfDate = `${date(perf.date, 'show')}`;
    const display = {
      value: onSale > 0 ? perfDate : `${perfDate} (SOLD OUT)`,
      attrs: {
        selected,
        disabled: onSale > 0 ? null : 'disabled',
      }
    };

    return {
      ticket: ticket ? ticket.id : null,
      event: perf.id,
      seats: perf.seats,
      sold: perf.sold,
      onSale: onSale > 0 ? onSale : null,
      value: ticket ? `${ticket.id}@event@${perf.id}` : null,
      display: display,
    };
  }).filter((perf) => perf.ticket);
}

module.exports = {
  getOptions,
  showTickets,
};
