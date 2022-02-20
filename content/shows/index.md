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

{% for show in collections.show | reverse %}
- **[{{ show.data.title }}]({{ show.url }})** » {{ show.data.sub | mdi | safe }}
{% endfor %}
