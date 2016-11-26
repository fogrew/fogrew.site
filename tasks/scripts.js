'use strict';

/* eslint-env node */

const paths = require('../config/paths');
const env = require('../config/env');

const browserify = require('gulp-browserify');
const sourcemaps = require('gulp-sourcemaps');
const filesize = require('gulp-filesize');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const babel  = require("gulp-babel");
const gulpif = require('gulp-if');

// TODO: add plato, buddy.js

module.exports = function(gulp, bs) {
  return gulp.task('scripts', (cb) => {
    return gulp.src(paths.dev.jsModules)
        .pipe(gulpif(!env.min, sourcemaps.init()))
        .pipe(gulpif(env.lint, eslint()))
        .pipe(gulpif(env.lint, eslint.format()))
        .pipe(babel({
          presets: ['es2015']
        }))
        .pipe(browserify())
        // .pipe(gulpif(env.min, uglify({ compress: true })))
        .pipe(gulpif(!env.min, sourcemaps.write()))
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(gulpif(env.debug, filesize()))
        .pipe(bs.stream());
  });
};
