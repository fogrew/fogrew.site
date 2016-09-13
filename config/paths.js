'use strict';

/* eslint-env node */

var views = 'dev/views/';
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
    views: views+'**/*.njk',
    pages: views+'pages/*/*.njk',
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
