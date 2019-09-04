'use strict';

/* eslint-env node */

const paths = require('../config/paths');

const changed = require('gulp-changed');
const rename = require('gulp-rename');

module.exports = function(gulp, bs) {
  return gulp.task('media', function() {
    return gulp.src(paths.dev.media)
        .pipe(changed(paths.dist.media))
        .pipe(gulp.dest(paths.dist.media))
        .pipe(bs.stream());
  });
};
