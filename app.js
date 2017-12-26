const router = require("./router.js");

//Create a web server
var http = require('http');
http.createServer(function(request,response){
        router.home(request, response);
        router.user(request, response);
}).listen(8080);
console.log('Server running');

// var express = require('express');
// var app = express();

// app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));

// // views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   router.home(request, response);
// });

// app.get('/cool', function(request, response) {
//   response.send(cool());
// });

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });


