---
pagination:
  data: articles.script
  size: 1
  alias: article
permalink: 'shows/{{ article.slug or article.title | slug }}/script/'
eleventyComputed:
  title: '{{ article.title }}'
  summary: '{{ article.summary }}'
  script: '{{ article.slug or article.title | slug }}'
---

{% set fromMD = collections.all | find(['data.print', article.slug]) %}

{% if fromMD %}
([print »]({{ fromMD.url }}))

{{ fromMD.templateContent | md | safe }}
{% else %}
{{ article.body | typogr | safe }}
{% endif %}
