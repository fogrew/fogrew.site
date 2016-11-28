Raven.config('https://9a43f64e01e54748996958de73cca7ff@sentry.io/117995').install();

let Searcher = require('./homepage/search');

var s = new Searcher();

let app = {};
