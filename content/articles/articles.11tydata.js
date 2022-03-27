module.exports = {
  eleventyComputed: {
    tags: data => data.article.tags,
    title: data => data.article.title,
    subtitle: data => data.article.subtitle,
    summary: data => data.article.summary,
    date: data => data.article.date,
    image: data => data.article.hero,
  }
};
