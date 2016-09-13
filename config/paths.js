'use strict';

var views = 'views/';
/* eslint-env node */

var dist = 'public/';

module.exports = {
  viewsDir: views,
  distDir: dist,
  dev: {
    css:  views+'/**/*.scss',
    styles: [
      views+'layout/style.scss',
      views+'homepage/homepage.scss',
    ],
    scripts: views+'*/js/*.js',
    images: views+'**/*.{jpg,png,svg}'
  },
  dist: {
      pages: dist,
      styles: dist+'css',
      scripts: dist+'js',
      images: dist+'i'
  }
};
