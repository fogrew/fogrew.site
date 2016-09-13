'use strict';

/* eslint-env node */

const config = require('../config');
const paths = require('../config/paths');
const env = require('../config/env');

module.exports = function(gulp, bs) {
  return gulp.task('sync', function() {
    bs.init({
        port: config.devPort,
        ui: env.debug ? {
          port: config.uiPort
        } : false,
        ghostMode: false,
        logPrefix: 'fogrew.site',
        logLevel: env.debug ? 'debug' : 'info',
        logConnections: env.debug,
        logSnippet: false,
        reloadOnRestart: true,
        notify: false,
        open: env.open ? 'external' : false,
        baseDir: paths.distDir,
        server: ['.', paths.distDir]
    });
  });
};
