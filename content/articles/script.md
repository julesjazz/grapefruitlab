---
layout: script
pagination:
    data: articles.script
    size: 1
    alias: article
permalink: 'script/{{ article.slug or article.title | slug }}/'
eleventyComputed:
  title: '{{ article.title }}'
  summary: '{{ article.summary }}'
---

{{ article.body }}
