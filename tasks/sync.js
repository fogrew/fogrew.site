'use strict';

// TODO: add parameters of browser-sync

module.exports = function(gulp, bs) {
  return gulp.task('sync', function() {
    bs.init({
        logSnippet: false
    });
  });
};
