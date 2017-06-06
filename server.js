var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');

var menuData = require('./menuData');
// var queueData = require('./queueData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res, next) {

  var templateArgs = {
    menu: menuData,
  }
  res.render('menuPage', templateArgs);

});
// app.get('/order', function (req, res, next) {

  // var templateArgs = {
    // twits: twitData,
  // }
  // res.render('twitPage', templateArgs);

// });

// app.get('/order/:menuItem', function (req, res, next) {
  // var index = req.params.twitNum;
  // var twits = twitData[index];
  // if (twits) {
    // var templateArgs = {
      // twits: { twit: twitData[index]}
    // }
	// console.log("text:",twits.text,"| author:",twits.author);
    // res.render('twitPage', templateArgs);
  // } else {
    // next();
  // }
// });

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.render('404Page');
});

// Start the server listening on the specified port.
app.listen(port, function () {
  console.log("== Server listening on port", port);
});