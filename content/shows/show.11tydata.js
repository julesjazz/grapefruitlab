module.exports = {
  eleventyComputed: {
    title: data => data.show.title,
    subtitle: data => data.show.subtitle,
    summary: data => data.show.summary,
    feature: data => data.show.featured,
    date: data => data.show.date,
    hero: data => data.show.hero,
  }
};
