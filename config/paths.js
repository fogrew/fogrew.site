'use strict';

/* eslint-env node */

var views = 'dev/views/';
var dist = 'public/';

module.exports = {
  viewsDir: views,
  distDir: dist,
  dev: {
    scss:  'dev/styles/**/*.scss',
    styles: 'dev/styles/pages/*.scss',
    svg: 'dev/images/sprites/vector',
    views: views+'**/*.njk',
    pages: views+'pages/*/*.njk',
    scripts: 'dev/scripts/pages/**/*.js',
    jsModules: 'dev/scripts/pages/*.js',
    images: views+'**/*.{jpg,png,svg}'
  },
  dist: {
      pages: dist,
      styles: dist+'css',
      scripts: dist+'js',
      images: dist+'i',
      svg: dist+'i/svg'
  }
};
