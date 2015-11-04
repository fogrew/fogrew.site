'use strict';

// configs
var paths = require('./config/paths');

// utilites
var gulp = require('gulp');
// var sourcemaps = require('gulp-sourcemaps');
var bs = require('browser-sync').create();

// tasks
gulp.task('css', function() {
    return gulp.src(paths.dev.styles)
        //.pipe(sourcemaps.init())
        .pipe(require('gulp-concat')('style.css'))
        .pipe(require('gulp-postcss')([
            require('precss')(),
            require('autoprefixer')({
                browsers: ['last 1 version'],
                cascade: false
            }),
            require('postcss-flexboxfixer')(),
            require('css-mqpacker')(),
            require('cssnano')({
                convertValues: {
                    length: false
                }
            }),
            require('csswring')(),
            require('postcss-reporter')({
                clearMessages: true,
            })
        ]))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(bs.stream());
});

gulp.task('build', ['css']);

gulp.task('default', ['css'], function() {
    bs.use(require('bs-snippet-injector'), {
        file: './blocks/layout/layout.ejs'
    });
    bs.init({
        notify: false,
        logSnippet: false
    });

    gulp.watch(paths.dev.styles, ['css']);
});