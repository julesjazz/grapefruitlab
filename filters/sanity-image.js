const _ = require('lodash');
const sanityImg = require('@sanity/image-url');
const sanityClient = require('../utils/sanityClient');
const { min } = require('lodash');

const defaultSizes = {
  'hero': '100vw',
  'default': '(min-width: 95em) 50vw, (min-width: 60em) 75vw, 100vw',
};

const defaultSet = [480, 960, 1200];

const heroOpts = {
  set: defaultSet,
  sizes: 'hero',
  ratio: 9/16,
  blur: 20,
  attrs: { class: 'hero-img' },
};

const defaultOpts = {
  og: {
    set: [1200],
    ratio: 630/1200,
    url: true,
  },
  default: {
    set: defaultSet,
    sizes: 'default',
  },
  hero: heroOpts,
  list: {
    ...heroOpts,
    sizes: 'default',
  },
}

const urlFor = (source) => sanityImg(sanityClient).image(source);

const img = (image, opts, attrs) => {
  if (!image) {
    console.error(`No image provided: ${opts}`);
    return '';
  }

  // get the image options
  const fallbackOpts = opts ? opts : defaultOpts.default;
  let imgOpts = defaultOpts[opts] || fallbackOpts;
  if (imgOpts.extends) {
    imgOpts = _.merge(defaultOpts[imgOpts.extends] || {}, imgOpts);
  }

  // build each URL
  const srcSetUrls = imgOpts.set.map((size) => {
    let src = urlFor(image).width(size).auto('format');

    // cropped images
    if (imgOpts.ratio) {
      src = src
        .height(Math.floor(size * imgOpts.ratio))
        .fit(imgOpts.fit || 'crop');
    }

    // blurred images
    src = imgOpts.blur ? src.blur(imgOpts.blur) : src;

    // return the built url
    return src.url();
  });

  // add srcSet details
  const srcSet = (imgOpts.set.length > 1)
    ? srcSetUrls.map((url, i) => `${url} ${imgOpts.set[i]}w`).join(',')
    : null;
  // get sizes
  const sizes = defaultSizes[imgOpts.sizes] || imgOpts.sizes;
  // get size attributes
  const width = imgOpts.set[-1];
  const height = Math.floor(imgOpts.set[-1] * (imgOpts.ratio || image.ratio));

  // combine all the attributes
  const imageAttrs = _.merge(
    {
      src: srcSetUrls[0],
      alt: image.alt,
      srcSet,
      sizes,
      width,
      height,
      loading: 'lazy',
      decoding: 'async',
    },
    imgOpts.attrs || {},
    attrs || {},
  );

  if (imgOpts.url) {
    return imageAttrs.src;
  }

  // build a string of html attributes
  const attrsHtml = Object.keys(imageAttrs).reduce((all, key) => {
    const value = imageAttrs[key];
    const html = value ? `${key}="${value}"` : null;
    return all && html ? `${all} ${html}` : all || html;
  }, '');

  return `<img ${attrsHtml}/>`;
}

module.exports = {
  urlFor,
  img,
};
