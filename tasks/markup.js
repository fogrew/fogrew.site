'use strict';

/* eslint-env node */

const paths = require('../config/paths');
const env = require('../config/env');

const nunjucks = require('gulp-nunjucks-render');
const beautifier = require('gulp-jsbeautifier');
const filesize = require('gulp-filesize');
const changed = require('gulp-changed');
const rename = require('gulp-rename');
const through2 = require('through2');
const w3cjs = require('gulp-w3cjs');
const data = require('gulp-data');
const gulpif = require('gulp-if');
const path = require('path');

// add posthtml for typographics

var getDataForFile = function(file) {
  const variablesFile = path.join(process.cwd(), paths.viewsDir, 'pages', path.dirname(file.relative), 'data.js');
  return require(variablesFile);
};

module.exports = function(gulp, bs) {
  return gulp.task('markup', function() {
    return gulp.src(paths.dev.pages)
        .pipe(changed(paths.dist.pages))
        .pipe(data(getDataForFile))
        .pipe(nunjucks({
          path: paths.viewsDir
        }))
        .pipe(beautifier({
            config: '.jsbeautifyrc',
            mode: 'VERIFY_AND_WRITE'
        }))
        .pipe(w3cjs())
        .pipe(through2.obj(function(file, enc, cb) {
            if (!file.w3cjs.success) { /* eslint-disable no-console */
              console.error('HTML validation error(s) found');
            }
            return cb(null, file);
        }))
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(paths.dist.pages))
        .pipe(gulpif(env.debug, filesize()))
        .pipe(bs.stream());
  });
};
