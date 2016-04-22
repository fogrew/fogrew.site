'use strict';

var views = 'views/';
var dist = 'public/';

module.exports = {
  viewsDir: views,
  distDir: dist,
  dev: {
    css:  views+'/**/*.pcss',
    styles: [
      views+'layout/style.pcss',
      views+'homepage/homepage.pcss',
    ],
    scripts: [
      views+'layout/layout.js'
    ],
    images: views+'**/*.{jpg,png,svg}'
  },
  dist: {
      pages: dist,
      styles: dist+'css',
      scripts: dist+'js',
      images: dist+'i'
  }
};
