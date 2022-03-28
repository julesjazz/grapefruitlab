---
partial: about
---

{{ cms.body | typogr | safe }}

## Who we are

{%- import "utility.macros.njk" as utility -%}

{% for person in members %}
<article class='h-card'>
{{ person.image | img | safe }}
<h3>{{ utility.link_if(person.name, person.social.url) }} [{{ person.pronouns }}]</h3>
{{ person.bio | md | safe }}
</article>
{% if not loop.last %}<hr />{% endif %}
{% endfor %}
