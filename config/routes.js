'use strict';

/* eslint-env node */

const home = require('./home');

module.exports = {
  '/': {
    title: 'Fogrew @ Andrey Gurylev',
    keywords: '', // max 70 characters
    image: '', // max 1mb
    description: 'thoughtful, attentive, neat, careful, heedful, mindful, solicitous, regardful frontend developer', // max 200 characters
    layout: 'layout/layout',
    content: '../about/about'
  },
  '/home': {
    title: 'Homepage',
    keywords: '',
    image: '',
    description: 'homepage for my browser',
    layout: 'homepage/homepage',
    content: '../grid/grid',
    list: home
  }
};
