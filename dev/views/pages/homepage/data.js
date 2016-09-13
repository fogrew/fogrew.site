'use strict';
const home = require(process.cwd()+'/config/home');

module.exports = {
  title: 'Homepage',
  keywords: '',
  image: '',
  description: 'homepage for my browser',
  layout: 'homepage/homepage',
  content: '../grid/grid',
  list: home
};
