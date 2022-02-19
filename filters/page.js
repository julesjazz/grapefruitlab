'use strict';

const _ = require('lodash');

const getPage = (collection, url, keys, test) => {
  const page = _.find(collection, { url });
  const data = keys ? _.get(page, keys) : page;
  return test ? _.filter(data, test) : data;
};

module.exports = {
  getPage,
};
