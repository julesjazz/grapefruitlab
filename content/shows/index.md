---
title: Our Shows
image:
  src: shows/between/doorway.jpg
  alt: |
    julie in an apron,
    standing in the door of a cabin at night
eleventyNavigation:
  key: shows
---

{% for show in collections.show %}
- [{{ show.data.title }}]({{ show.url }})
{% endfor %}
