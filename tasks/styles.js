'use strict';

/* eslint-env node */

const paths = require('../config/paths');
const env = require('../config/env');

const sourcemaps = require('gulp-sourcemaps');
const filesize = require('gulp-filesize');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const gulpif = require('gulp-if');
const stylelint = require('stylelint');
const postcssInlineSvg = require('postcss-inline-svg');
const svgo = require('postcss-svgo');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const doiuse = require('doiuse');
const immutableCss = require('immutable-css');
const csso = require('postcss-csso');
const reporter = require('postcss-reporter');
const postcssScss = require('postcss-scss');
const debug = require('postcss-devtools');
const colorguard = require('colorguard');

// TODO: add criticalCSS, gulp-uncss
// TODO: add html-lint: w3c, yaspeller
// TODO: add gulp-csslint, criticalCSS, gulp-uncss, usedcss

module.exports = function(gulp, bs) {
  return gulp.task('styles', () => {
    return gulp.src(paths.dev.styles)
      .pipe(gulpif(!env.min, sourcemaps.init()))
      .pipe(sass({
          outputStyle: 'expanded',
          indentWidth: 4
      }).on('error', sass.logError))
      .pipe(postcss([
          env.dev ? debug : () => {},
          env.lint ? stylelint : () => {},
          postcssInlineSvg({
            path: 'views'
          }),
          env.min ? svgo({
            plugins: [{
              cleanupNumericValues: {
                floatPrecision: 0
              }
            }]
          }) : () => {},
          autoprefixer({
            browsers: ['last 1 version'],
            cascade: false
          }),
          mqpacker,
          env.lint ? doiuse({
              browsers: [
                  'ie >= 10',
                  '> 5%'
              ],
              ignore: [
                  'calc', // @TODO: Create polyfill: UC Browser for Android (9.9)
                  'viewport-units', // @TODO: Create polyfill: IE (10,11)
                  'flexbox',
                  'transforms3d',
                  'text-size-adjust'
              ]
          }) : () => {},
          env.lint ? immutableCss : () => {},
          env.lint ? colorguard : () => {},
          env.min ? csso : () => {},
          env.dev ? reporter({
              clearMessages: true
          }) : () => {}
      ], { syntax: postcssScss }))
      .pipe(gulpif(!env.min, sourcemaps.write()))
      .pipe(gulp.dest(paths.dist.styles))
      .pipe(gulpif(env.debug, filesize()))
      .pipe(bs.stream());
  });
};
