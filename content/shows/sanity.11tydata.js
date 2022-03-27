module.exports = {
  eleventyComputed: {
    title: data => data.show.title,
    subtitle: data => data.show.subtitle,
    summary: data => data.show.summary,
    date: data => data.show.date,
    image: data => data.show.hero,
  }
};
