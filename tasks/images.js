'use strict';
const paths = require('../config/paths');
const sourcemaps = require('gulp-sourcemaps');

module.exports = function(gulp, bs) {
  return gulp.task('images', function() {
    return gulp.src(paths.dev.images)
        .pipe(require('gulp-changed')(paths.dist.images))
        .pipe(require('gulp-flatten')())
        .pipe(gulp.dest(paths.dist.images))
        .pipe(bs.stream());
  });
};
