'use strict';

var views = 'views/';
var dist = 'public/';
var images = 'images/';

module.exports = {
  dev: {
    styles: [
      views+'layout/layout.pcss',
      views+'header/header.pcss',
      views+'about/about.pcss',
    ],
    scripts: [
      views+'layout/header.js',
      views+'layout/layout.js'
    ],
    images: images+'**/*.{jpg,png,svg}'
  },
  dist: {
      styles: dist+'css',
      scripts: dist+'js',
      images: dist+'i'
  }
};
