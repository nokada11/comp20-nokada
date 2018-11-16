var express = require('express');
var bodyParser = require('body-parser'); // Required if we need to use HTTP post parameters
var validator = require('validator'); // See documentation at https://github.com/chriso/validator.js
var app = express();
var cors = require('cors');
var url = require('url');

// See https://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
app.use(bodyParser.json());
// See https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(bodyParser.urlencoded({ extended: true })); // Required if we need to use HTTP post parameters
// Enable CORS
app.use(cors());

// Mongo initialization and connect to database
// process.env.MONGODB_URI is the default environment variable on Heroku for the MongoLab add-on
// If environment variables not found, fall back to mongodb://localhost/nodemongoexample
// nodemongoexample is the name of the local database
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/nodemongoexample';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

app.post('/submit', function(request, response) {
	var time = new Date();

	var toInsert = {
		"username": request.body.username,
		"score": parseInt(request.body.score),
		"grid": request.body.grid,
		"created_at": time
	};

	if (toInsert.username!= "" && !isNaN(toInsert.score) && toInsert.grid!= "") {
		db.collection('scores', function(error, coll) {
			coll.insert(toInsert, function(error, saved) {
				if (error) {
					response.send(500);
				} else {
					db.collection('scores', function(er, collection) {
						collection.find().sort( { score: -1 } ).limit(10).toArray(function(err, results) {
							if (!err) {
								response.send(results);
							} else {
								response.send([]);
							}
						});
					});
				}
		    });
		});
	} else {
		response.send('Invalid input');
	}
});

app.get('/scores.json', function(request, response) {
	response.set('Content-Type', 'text/html');
	var indexPage = '';
	var queryData = url.parse(request.url, true).query;
	var user = queryData.username;

	db.collection('scores', function(er, collection) {
		collection.find( {username: user}).sort( { score: -1 } ).limit(10).toArray(function(err, results) {
			if (!err) {
				response.send(results);
			} else {
				response.send([]);
			}
		});
	});
});

app.get('/', function(request, response) {
	response.set('Content-Type', 'text/html');
	var indexPage = '';

	db.collection('scores', function(er, collection) {
		collection.find().sort( { score: -1 } ).toArray(function(err, results) {
			if (!err) {
				indexPage += "<!DOCTYPE HTML><html><head><title>2048 Game Center</title><link rel='shortcut icon' href='#' /></head><body><h1>2048 Game Center</h1>";

				indexPage += "</h4>User";
				for (var i = 0; i < 3; i++) {
					indexPage += "\xa0\xa0\xa0\xa0\xa0";
				}
				indexPage += "Scores";
				for (var i = 0; i < 3; i++) {
					indexPage += "\xa0\xa0\xa0\xa0\xa0";
				}
				indexPage += "Timestamp</h4>";

				
				for (var count = 0; count < results.length; count++) {
					indexPage += "<p>" + results[count].username + "\xa0\xa0" + results[count].score + "\xa0\xa0" + results[count].created_at + "</p>";
				}
				indexPage += "</body></html>"
				response.send(indexPage);
			} else {
				response.send('<!DOCTYPE HTML><html><head><title>2048 Game Center</title></head><body><h1>Whoops, something went terribly wrong!</h1></body></html>');
			}
		});
	});
});

app.listen(process.env.PORT || 3000);