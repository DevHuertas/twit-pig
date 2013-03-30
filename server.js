var Stream = require('user-stream');

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
io.set('transports', [
		      'flashsocket', 
		      'htmlfile', 
		      'xhr-polling', 
		      'jsonp-polling']);


app.listen(process.env.PORT || 1337);

function handler (req, res) 
{
    fs.readFile(__dirname + '/index.html',
		function (err, data) {
		    if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		    }
		    res.writeHead(200);
		    res.end(data);
		});
}


io.sockets.on('connection', function (socket) {
	var stream = new Stream({
		consumer_key: 'rjpgSqcQlT0weA8vbZ4Pw',
		consumer_secret: 'vvdL6v44F2WM29sPj5xkuPJy2RMiTjOGLx1ioqFRX8',
		access_token_key: '1317035634-B13JWlxa6dDa9RgLXFqvSf2Tn5ecOLNq5NT0rA5',
		access_token_secret: 'SGHk71sXiBtZ5HKJ0sgCjqR7MqbtyQchR8SPQmL1rg'
	    });
	
	//create stream
	stream.stream();

	//listen stream data
	stream.on('data', function(json) {
		console.log(json);
		parsed = parseTwitterJson(json);
		if (parsed.message){
		    socket.emit('twitter_update', parsed);
		}
	    });

	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	    });
    });

function parseTwitterJson(json) {
    var dict = {};
    if (json.user){
	dict['screen_name'] = json.user.screen_name;
	dict['name'] = json.user.name;
	dict['message'] = json.text;
	dict['created'] = json.created_at;
    }
    
    return dict;
}

