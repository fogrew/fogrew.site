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
      views+'portfolio/portfolio.pcss',
      views+'portfolio/css/cubeportfolio.css'
    ],
    scripts: [
      views+'layout/layout.js',
      views+'portfolio/portfolio.js',
      views+'portfolio/js/jquery.cubeportfolio.js'
    ],
    images: images+'**/*.{jpg,png,svg}'
  },
  dist: {
      styles: dist+'css',
      scripts: dist+'js',
      images: dist+'i'
  }
};
