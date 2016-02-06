'use strict';
const paths = require('../config/paths');
const sourcemaps = require('gulp-sourcemaps');

// TODO: add criticalCSS, gulp-uncss
// TODO: add lint: immutable-css, jscs, cssstats, yaspeller, postcss-flexbugs-fixes

module.exports = function(gulp, bs) {
  return gulp.task('styles', () => {
    return gulp.src(paths.dev.styles)
      .pipe(sourcemaps.init({loadMaps: true, debug: true}))
      .pipe(require('gulp-postcss')([
          // require('postcss-devtools'),
          require('postcss-import')({
            path: paths.viewsDir
          }),
          require('postcss-advanced-variables'),
          require('postcss-color-function'),
          require('postcss-nested'),
          require('postcss-short-spacing'),
          require('postcss-position'),
          require('postcss-clearfix'),
          require('postcss-calc'),
          require('postcss-inline-svg'),
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
      .pipe(require('gulp-rename')('style.css'))
      .pipe(gulp.dest(paths.dist.styles))
      .pipe(bs.stream());
  });
};
