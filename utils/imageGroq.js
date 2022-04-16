const hero = `
  "hero": {
    ...image,
    "alt": imageAlt,
    "altOrigin": image.asset->alt,
    "ratio": image.asset->metadata.dimensions.aspectRatio,
  }
`;

const heroAlt = (hero) => {
  if (hero) {
    hero.alt = hero.alt || hero.altOrigin;
    const { altOrigin, ...newHero } = hero;
    return newHero;
  }

  return hero;
};

module.exports = {
  hero,
  heroAlt,
};
