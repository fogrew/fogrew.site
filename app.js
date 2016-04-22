var express = require('express');
var app = express();

app.set('root', __dirname);

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 6969);


app.use(express.static('./public'));

const pages = require('./config/routes.js');

Object.keys(pages).forEach(page => {
  app.get(page, function(req, res, next) {
    res.render(pages[page]['layout'], pages[page]);
  });
});

app.listen(app.get('port'), () => {
  console.log('Site https://fogrew.site/ launch on port ' + app.get('port'));
});
