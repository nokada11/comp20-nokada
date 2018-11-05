// Use Express
var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.json());

app.post("/submit", function(request, response){
	response.send([]);
});

app.get("/scores.json", function(request, response){
	var username = request.query.username;
	response.send({"result":"You typed in " + username});
});

app.get("/", function(request, response){
	response.send("Go away!!!");
});

app.listen(process.env.PORT || 8888);