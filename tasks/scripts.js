'use strict';
const paths = require('../config/paths');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

// TODO: add criticalCSS, gulp-uncss
// TODO: add lint: immutable-css, jscs, cssstats, yaspeller, postcss-flexbugs-fixes

module.exports = function(gulp, bs) {
  return gulp.task('scripts', () => {
    return gulp.src(paths.dev.scripts)
        .pipe(sourcemaps.init({loadMaps: true, debug: true}))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write({sourceRoot: '.'}))
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(bs.stream());
  });
};
