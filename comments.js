// Create web server
var express = require('express');
var app = express();
// Create server
var server = require('http').createServer(app);
// Create socket
var io = require('socket.io')(server);
// Listen to port 3000
server.listen(3000);

// Create static folder
app.use(express.static('./public'));

// Create array of comment
var comments = [];

// Listen to event 'connection'
io.on('connection', function(socket){
	// Listen to event 'send_comment'
	socket.on('send_comment', function(data){
		// Push comment to array
		comments.push(data);
		// Emit event 'send_comment' to all client
		io.sockets.emit('send_comment', data);
	});
	// Emit event 'load_comments' to current client
	socket.emit('load_comments', comments);
});