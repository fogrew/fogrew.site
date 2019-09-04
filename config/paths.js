'use strict';

/* eslint-env node */

var dev = 'dev/';
var dist = 'public/';

module.exports = {
  viewsDir: dev + 'views/',
  distDir: dist,
  dev: {
    scss:  dev+'styles/**/*.scss',
    styles: dev+'styles/pages/*.scss',
    svg: dev+'images/sprites/vector',
    views: dev+'views/**/*.njk',
    pages: dev+'views/pages/*/*.njk',
    scripts: dev+'scripts/pages/**/*.js',
    jsModules: dev+'scripts/pages/*.js',
    images: dev+'images/static/**/*.{jpg,png,svg}',
    media: dev+'media/**/*'
  },
  dist: {
      pages: dist,
      styles: dist+'css',
      scripts: dist+'js',
      images: dist+'i',
      media: dist+'media',
      svg: dist+'i/svg'
  }
};
