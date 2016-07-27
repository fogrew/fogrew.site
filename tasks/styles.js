'use strict';
const paths = require('../config/paths');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

// TODO: add criticalCSS, gulp-uncss
// TODO: add html-lint: w3c, yaspeller

module.exports = function(gulp, bs) {
  return gulp.task('styles', () => {
    return gulp.src(paths.dev.styles)
      .pipe(sourcemaps.init({loadMaps: true, debug: true}))
      .pipe(sass({
          outputStyle: 'expanded',
          indentWidth: 4
      }).on('error', sass.logError))
      .pipe(require('gulp-postcss')([
          // require('postcss-devtools'),
          require('stylelint'),
          require('postcss-inline-svg')({
            path: 'views'
          }),
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
          require('postcss-csso'),
          require('postcss-reporter')({
              clearMessages: true
          })
      ], { syntax: require('postcss-scss') }))
      .pipe(sourcemaps.write({sourceRoot: './'}))
      .pipe(gulp.dest(paths.dist.styles))
      .pipe(bs.stream());
  });
};
