module.exports = {
  eleventyComputed: {
    feature: data => (data.collections.features.length > 0) ? data.collections.features[0] : null,
  }
};
