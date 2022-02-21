---
title: About Us
image:
  src: shows/between/mia-erin-path.jpg
  alt: |
    two figures --
    one in a gray dress, the other in a black suit
    trailing a long pink scarf
    as they walk along a dirt canyon path
eleventyNavigation:
  key: about
  order: 3
---

## A performance laboratory

The name is new, but the friendships and collaborations go back for years.
Julie, Kenny, and Miriam have been working together since 2007,
under a range of different names and companies --
most notably Vicious Trap, a scapegoat and catch-all moniker
for our various interests.

**Grapefruit Lab** is the new combined vision
and multimedia intersection of our work.
Grapefruit Lab’s name,
derived from Yoko Ono’s quip that
_a grapefruit is the hybrid of a lemon and an orange_,
encapsulates our goal of combining highly-aesthetic,
compelling artistic work with work
created with and alongside communities in ways that matter.

We want to make art without assumptions --
art that humanizes and entertains and challenges
and brings you into conversation.

## Why grapefruit lab?

This hybridization, this blurring of boundaries, this queering of edges.

- Grapefruit Lab aspires to create highly-aesthetic, experimental, bold artistic work that is created with and in community.
- Grapefruit Lab intends to mix media and blend various forms, defying discipline and genre.
- Grapefruit Lab likes to play with others and resists territorialism, believing there is room at the table for all of us.
- Grapefruit Lab, like Vicious Trap before, is a catch-all and scapegoat for the projects of the co-founders Mia, Kenny, and Julie.
- Grapefruit Lab wishes to both challenge and invite you and laments that we don't yet know each other as well as we could.

## Who we are

{%- import "utility.macros.njk" as utility -%}

{% for person in members %}
- **{{ utility.link_if(person.name, person.url) }}** » {{ person.bio | md | safe }}
{% endfor %}
