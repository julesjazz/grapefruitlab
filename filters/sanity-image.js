const _ = require('lodash');
const sanityImg = require('@sanity/image-url');
const sanityClient = require('../utils/sanityClient');

const defaultSizes = {
  'default': '100vw',
  'page': '(min-width: 95em) 50vw, (min-width: 60em) 75vw, 100vw',
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
  const imageDetails = image.details;
  const sizeArray = srcs.split(',');
  const firstSize = sizeArray[0];
  const src = urlFor(imageDetails).width(firstSize).auto('format').url();
  const lastSize = sizeArray[sizeArray.length - 1];
  const srcSetContent = sizeArray.map((size) => {
      const url = urlFor(imageDetails)
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
      src,
      srcset: srcSetContent,
      alt: alt || image.alt || image.origin.alt || '',
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
  }, '');

  return `<img ${attrsHtml}>`;
}

module.exports = {
  urlFor,
  imageUrl,
  croppedUrl,
  responsiveImage,
};
