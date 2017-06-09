var path = require('path');
var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var menuData = require('./menuData');
var app = express();
var port = process.env.PORT || 3000;

if(!fs.existsSync('queueData.json')) fs.writeFileSync('queueData.json','[]');
var queueData = require('./queueData');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());

var queue = queueData;
var queueNumber = 0;

app.get('/', function (req, res, next) {

  var templateArgs = {
    menu: menuData,
  }
  res.render('menuPage', templateArgs);

});

app.get('/queue', function(req,res,next){
	var templateArgs = {
		queue: queueData
	}
	res.render('queuePage', templateArgs);
});

app.post('/queue/placeOrder', function(req, res){
	if(req.body.length!=0){
		queueNumber++;
		var order = {
			number: queueNumber,
			orderContent: req.body
		}
		queue.push(order);
		writeQToFile();
		res.status(200).send();
	} else res.status(400).send();
});
app.post('/queue/clearOrder', function(req, res){
	if(req.body.number){
		for(var i=0; i<queue.length; i++){
			if(queue[i].number == req.body.number)
				queue.splice(i,1);
		}
		writeQToFile();
		res.status(200).send();
	} else {
		res.status(400).send();
	}
});

function writeQToFile(){
	fs.writeFile('queueData.json', JSON.stringify(queue));
}
function getQueueNum(){
	if(queue.length>0){
		queueNumber = queue[queue.length-1].number;
	}
	console.log("Starting Queue at", queueNumber);
}

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res) {
  res.render('404Page');
});

// Start the server listening on the specified port.
app.listen(port, function () {
  console.log("== Server listening on port", port);
  getQueueNum();
});