---
title: Deform+Perform
sub: A performance laboratory
---

> “Grapefruit is a hybrid of lemon and orange. Snow is hybrid of wish and lament.”
>
> _---Yoko Ono_

------

## Our Shows

<ul>
{% for show in collections.show | reverse %}
- **[{{ show.data.title }}]({{ show.url }})** » {{ show.data.sub | mdi | safe }}
{% endfor %}
</ul>
