'use strict';

/* eslint-env node */

// configs
const paths = require('./config/paths');

// utilites
const gulp = require('gulp');
const bs = require('browser-sync');

// tasks
require('./tasks/styles')(gulp, bs);
require('./tasks/scripts')(gulp, bs);
require('./tasks/images')(gulp, bs);
require('./tasks/markup')(gulp, bs);
require('./tasks/sync')(gulp, bs);

gulp.task('build', ['styles', 'scripts', 'images', 'markup']);

gulp.task('serve', ['styles', 'scripts', 'images', 'markup', 'sync'], function() {
    gulp.watch(paths.dev.css, ['styles']);
    gulp.watch(paths.dev.scripts, ['scripts']);
    gulp.watch(paths.dev.images, ['images']);
    gulp.watch(paths.dev.views, ['markup']);
});

gulp.task('default', ['serve']);
