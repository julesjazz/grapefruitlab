---
title: Our Shows
image:
  src: shows/between/doorway.jpg
  alt: |
    julie in an apron,
    standing in the door of a cabin at night
---

{% import "list.macros.njk" as list %}
{{ list.shows(collections.show) }}
