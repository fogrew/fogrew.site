var express = require('express');
var engine = require('ejs-locals');

var app = express();
app.engine('ejs', engine);
app.set('views', './blocks');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res, next) {
    var locals = {};
    locals.title = 'gurylev.com';
    res.render('layout/layout', locals);
});

app.listen(3000);
