'use strict';

// configs
var paths = require('./config/paths');

// utilites
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var bs = require('browser-sync').create();
var concat = require('gulp-concat');

// tasks
gulp.task('css', function() {
    return gulp.src(paths.dev.styles)
        .pipe(sourcemaps.init({loadMaps: true, debug: true}))
        .pipe(concat('style.css'))
        .pipe(require('gulp-postcss')([
            require('precss')(),
            require('autoprefixer')({
                browsers: ['last 1 version'],
                cascade: false
            }),
            require('postcss-flexboxfixer')(),
            require('css-mqpacker')(),
            require('cssnano')({
                convertValues: { length: false },
                discardComments: { removeAll: true }
            }),
            require('csswring')(),
            require('postcss-reporter')({
                clearMessages: true
            })
        ]))
        .pipe(sourcemaps.write({sourceRoot: './'}))
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(bs.stream());
});

gulp.task('js', function() {
    return gulp.src(paths.dev.scripts)
        .pipe(sourcemaps.init({loadMaps: true, debug: true}))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write({sourceRoot: '.'}))
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(bs.stream());
});

gulp.task('img', function() {
    return gulp.src(paths.dev.images)
        .pipe(require('gulp-changed')(paths.dev.images))
        .pipe(gulp.dest(paths.dist.images))
        .pipe(bs.stream());
});

gulp.task('build', ['css', 'js', 'img']);

gulp.task('default', ['css', 'js', 'img'], function() {
    bs.use(require('bs-snippet-injector'), {
        file: 'views/layout/layout.ejs'
    });
    bs.init({
        notify: false,
        logSnippet: false
    });

    gulp.watch(paths.dev.styles, ['css']);
    gulp.watch(paths.dev.scripts, ['js']);
    gulp.watch(paths.dev.images, ['img']);
});
