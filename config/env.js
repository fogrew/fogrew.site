'use strict';

/* eslint-env node */

/**
 * ENV
 * @desc An object containing the user environment
 *
 * @const
 * @type {Object}
 *
 * @example env.debug
 * @example env.lint
 * @example env.open
 * @example env.min
 * @example env.dev
 */

const extendOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
};

var env = require('minimist')(process.argv.slice(2), extendOptions);

const defaultOptions = {
  dev: process.env.NODE_ENV === 'development',
  debug: env.debug || false // FIXME
};

env = Object.assign(env, defaultOptions);

module.exports = env;
