var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var path = require('path');
var petRoute = require('./routes/pets.js');

app.use(bodyParser.urlencoded({extended: true}));

app.use('/pets', petRoute);

app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
});

// Start listening for requests on a specific port
app.listen(port, function(){
  console.log('listening on port', port);
});
