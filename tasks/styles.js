'use strict';
const paths = require('../config/paths');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

// TODO: add criticalCSS, gulp-uncss
// TODO: add lint: immutable-css, jscs, cssstats, yaspeller, postcss-flexbugs-fixes

module.exports = function(gulp, bs) {
  return gulp.task('styles', () => {
    return gulp.src(paths.dev.styles)
      .pipe(sourcemaps.init({loadMaps: true, debug: true}))
      .pipe(concat('style.css'))
      .pipe(require('gulp-postcss')([
          require('postcss-inline-comment'),
          require('postcss-import'),
          require('postcss-advanced-variables'),
          require('postcss-color-function'),
          require('postcss-nested'),
          require('postcss-short-spacing'),
          require('postcss-position'),
          require('postcss-clearfix'),
          require('postcss-calc'),
          require('autoprefixer')({
            browsers: ['last 1 version'],
            cascade: false
          }),
          require('postcss-flexboxfixer')(),
          require('css-mqpacker')(),
          require('cssnano')({
              convertValues: { length: false },
              discardComments: { removeAll: true }
          }),
          require('csswring')(),
          require('postcss-reporter')({
              clearMessages: true
          })
      ]))
      .pipe(sourcemaps.write({sourceRoot: './'}))
      .pipe(gulp.dest(paths.dist.styles))
      .pipe(bs.stream());
  });
};
