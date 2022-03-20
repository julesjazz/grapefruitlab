module.exports = {
  eleventyComputed: {
    tags: data => data.article.tags,
    title: data => data.article.title,
    summary: data => data.article.summary,
    date: data => data.article.date,
    image: data => data.article.hero,
  }
};
