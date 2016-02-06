'use strict';
const paths = require('../config/paths');
const sourcemaps = require('gulp-sourcemaps');

// TODO: add criticalCSS, gulp-uncss
// TODO: add html-lint: w3c, yaspeller

module.exports = function(gulp, bs) {
  return gulp.task('styles', () => {
    return gulp.src(paths.dev.styles)
      .pipe(sourcemaps.init({loadMaps: true, debug: true}))
      .pipe(require('gulp-postcss')([
          // require('postcss-devtools'),
          require('postcss-import')({
            path: paths.viewsDir
          }),
          require('stylelint'),
          require('postcss-advanced-variables'),
          require('postcss-color-function'),
          require('postcss-nested'),
          require('postcss-short-spacing'),
          require('postcss-position'),
          require('postcss-clearfix'),
          require('postcss-calc'),
          require('postcss-inline-svg'),
          require('postcss-svgo')({
            plugins: [{
              cleanupNumericValues: {
                floatPrecision: 0
              }
            }]
          }),
          require('autoprefixer')({
            browsers: ['last 1 version'],
            cascade: false
          }),
          require('postcss-flexboxfixer')(),
          require('css-mqpacker')(),
          require('doiuse')({
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
          }),
          require('immutable-css'),
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
