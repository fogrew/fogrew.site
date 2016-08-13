'use strict';

const paths = require('../config/paths');
const env = require('../config/env');

const sourcemaps = require('gulp-sourcemaps');
const filesize = require('gulp-filesize');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const gulpif = require('gulp-if');

// TODO: add plato, buddy.js

module.exports = function(gulp, bs) {
  return gulp.task('scripts', () => {
    return gulp.src(paths.dev.scripts)
        .pipe(gulpif(!env.min, sourcemaps.init()))
        .pipe(concat('app.js'))
        .pipe(gulpif(env.lint, eslint()))
        .pipe(gulpif(env.lint, eslint.format()))
        .pipe(gulpif(env.min, uglify()))
        .pipe(gulpif(!env.min, sourcemaps.write()))
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(gulpif(env.debug, filesize()))
        .pipe(bs.stream());
  });
};
