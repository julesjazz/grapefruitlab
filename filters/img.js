const _ = require('lodash');
const sanityImg = require('@sanity/image-url');
const sanityClient = require('../utils/sanityClient');

const defaultSizes = {
  'default': '100vw',
  'media': '(min-width: 80em) 15vw, (min-width: 40em) 30vw, 100vw',
  'card': '(min-width: 95em) 30vw, (min-width: 56em) 45vw, 100vw',
  'gallery': '(min-width: 95em) 30vw, 50vw',
};

const urlFor = (source) => sanityImg(sanityClient).image(source);

const imageUrl = (image, width = "400") => urlFor(image)
  .width(width)
  .auto('format');

const croppedUrl = (image, width, height) => urlFor(image)
  .width(width)
  .height(height)
  .auto('format');

const responsiveImage = (image, alt, attrs, sizes, srcs="480,960,1200") => {
  const sizeArray = srcs.split(',');
  const firstSize = sizeArray[0];
  const lastSize = sizeArray[sizeArray.length - 1];
  const srcSetContent = sizeArray.map((size) => {
      const url = urlFor(image)
          .width(size)
          .auto('format')
          .url()

      return `${url} ${size}w`
  }).join(',')

  const imgSizes = sizes && defaultSizes[sizes]
    ? defaultSizes[sizes]
    : sizes || defaultSizes.default;

  const imageAttrs = _.merge(
    {
      src: urlFor(image).width(firstSize),
      srcset: srcSetContent,
      alt: alt || '',
      sizes: imgSizes,
      loading: 'lazy',
      decoding: 'async',
      width: lastSize.trim(),
    },
    attrs || {},
  );

  const attrsHtml = Object.keys(imageAttrs).reduce((all, key) => {
    const value = imageAttrs[key];
    const html = value ? `${key}="${value}"` : null;
    return all && html ? `${all} ${html}` : all || html;
  })

  return `<img ${attrsHtml}>`;
}

module.exports = {
  urlFor,
  imageUrl,
  croppedUrl,
  responsiveImage,
};
