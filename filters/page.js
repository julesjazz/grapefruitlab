'use strict';

const _ = require('lodash');

const getPage = (collection, url, keys, test) => {
  const page = _.find(collection, { url });
  const data = keys ? _.get(page, keys) : page;
  return test ? _.filter(data, test) : data;
};

const fromCms = (data, slug) => {
  return (Object.keys(data[0]).length !== 0)
    ? _.find(data, { slug })
    : null;
}

const getAll = (collection, path) => {
  return collection.map(item => _.get(item, path));
}

const getAssets = (assets, tag) => {
  return assets.filter((asset) => asset.tags.includes(tag));
}

const sum = (array) => array.reduce((total, item) => total + (item || 0), 0);

module.exports = {
  getPage,
  fromCms,
  getAll,
  getAssets,
  sum,
};
