---
pagination:
  data: articles.article
  size: 1
  alias: article
permalink: 'article/{{ article.slug or article.title | slug }}/'
eleventyComputed:
  title: '{{ article.title }}'
  summary: '{{ article.summary }}'
---

{{ article.body | typogr | safe }}
