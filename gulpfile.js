'use strict';

// configs
const paths = require('./config/paths');

// utilites
const gulp = require('gulp');
const bs = require('browser-sync');

// tasks
require('./tasks/styles')(gulp, bs);
require('./tasks/scripts')(gulp, bs);
require('./tasks/images')(gulp, bs);
require('./tasks/sync')(gulp, bs);

gulp.task('build', ['styles', 'scripts', 'images']);

gulp.task('serve', ['styles', 'scripts', 'images', 'sync'], function() {
    gulp.watch(paths.dev.css, ['styles']);
    gulp.watch(paths.dev.scripts, ['scripts']);
    gulp.watch(paths.dev.images, ['images']);
});
