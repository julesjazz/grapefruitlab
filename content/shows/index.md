---
title: Grapefruit Lab Shows
eleventyNavigation:
  key: shows
---

{% for show in collections.show %}
- [{{ show.data.title }}]({{ show.url }})
{% endfor %}
