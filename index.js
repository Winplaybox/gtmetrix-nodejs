var express     = require("express");
var app         = express();
var port        = process.env.PORT || 3100;
var morgan      = require('morgan'); 		// log requests to the console (express4)
var bodyParser  = require('body-parser'); 	// pull information from HTML POST (express4)

// configuration ===============================================================
app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// routes ======================================================================
require('./app/routes.js')(app);


// app.get("/", function(req, res){
//     res.send("pwa demo app started");
// });

app.listen(port);
console.log("App listening on port " + port);
