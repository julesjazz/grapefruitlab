---
partial: about
---

{{ cms.body }}

## Who we are

{%- import "utility.macros.njk" as utility -%}

{% for person in members %}
- **{{ utility.link_if(person.name, person.url) }}** » {{ person.bio | md | safe }}
{% endfor %}
