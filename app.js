var express = require('express');
var engine = require('ejs-locals');

var app = express();

app.engine('ejs', engine);

app.set('root', __dirname);

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', function(req, res, next) {
    var locals = {};
    locals.title = 'Andrew Gurylev';
    res.render('layout/layout', locals);
});

app.listen(6969);
