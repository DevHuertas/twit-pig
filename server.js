var http = require('http');
var url = require('url');
var querystring = require('querystring');

var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html' });
	var urlParts = url.parse(req.url);
	var path = urlParts.pathname;

	var query = querystring.parse(urlParts.query);

	if (urlParts.query) {
	    res.end('<html><body><h1>Hello World from ' + path + urlParts.query + '</h1></body></html>');
	}
	else {
	    res.end('<html><body><h1>Hello World</h1></body></html>');
	}
    }).listen(port);