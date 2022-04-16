---
layout: script
pagination:
    data: articles.script
    size: 1
    alias: article
permalink: '{{ article.slug or article.title | slug }}/'
eleventyComputed:
  title: '{{ article.title }}'
  summary: '{{ article.summary }}'
---

{{ article.body | typogr | safe }}
