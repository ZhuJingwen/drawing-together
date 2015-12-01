
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs'); // Using the filesystem module

app.use(express.static('public'));

http.listen(8080, function(){
  console.log('listening on *:8080');
});


// WebSocket Portion


io.sockets.on('connection', 
	// We are given a websocket object in our function
	function (socket) {
	
		console.log("We have a new client: " + socket.id);
		
		// When this user emits, client side: socket.emit('otherevent',some data);
		socket.on('new pixel', function(data) {
			// Data comes in as whatever was sent, including objects
			console.log("Received: 'new pixel' " + data.x + " " + data.y+" "+data.h);
			
			// Send it to all of the clients
			socket.broadcast.emit('new pixel', data);
		});
		
		
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);
		