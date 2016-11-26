'use strict';

/* eslint-env node */

const paths = require('../config/paths');

const fs = require('fs');
const path = require('path');
const svgSprite = require('gulp-svg-sprite');

module.exports = function(gulp, bs) {
  return gulp.task('svg-symbols', function() {
    fs.readdir(paths.dev.svg, function(err, files){
      for (var i in files) {
        var dirName = files[i],
          dirPath = path.join(paths.dev.svg, dirName),
          stats = fs.lstatSync(dirPath);

        var svgSpriteConfig = {
          shape: {
            spacing: {
              padding: 1
            },
          },
          mode: {
            symbol: {
              dest: '.',
              sprite: path.join(paths.dist.svg, dirName + '.symbol.svg'),
              dimensions: false,
              bust: false
            }
          }
        };

        if (stats.isDirectory()) {
          gulp.src(dirPath + '/*.svg')
            .pipe(svgSprite(svgSpriteConfig))
            .pipe(gulp.dest('.'))
            .pipe(bs.stream());
        }
      }
    });
  });
};
