'use strict';

/* eslint-env node */

const paths = require('../config/paths');

const changed = require('gulp-changed');
const rename = require('gulp-rename');

module.exports = function(gulp, bs) {
  return gulp.task('images', function() {
    return gulp.src(paths.dev.images)
        .pipe(changed(paths.dist.images))
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(paths.dist.images))
        .pipe(bs.stream());
  });
};
