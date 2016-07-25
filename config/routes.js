'use strict';
const home = require('./home');

module.exports = {
  '/': {
    title: 'Fogrew @ Andrew Gurylev',
    keywords: '',
    description: 'thoughtful, attentive, neat, careful, heedful, mindful, solicitous, regardful frontend developer',
    layout: 'layout/layout',
    content: '../about/about'
  },
  '/home': {
    title: 'Homepage',
    keywords: '',
    description: 'homepage for my browser',
    layout: 'homepage/homepage',
    content: '../grid/grid',
    list: home
  }
};
