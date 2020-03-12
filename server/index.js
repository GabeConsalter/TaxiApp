const
	express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	port = 3000
;

io.on('connection', socket => {
	console.log('A user connected');

	socket.on('newMessage', message => {
		console.log(`New message: ${message}`);

		setTimeout(() => io.emit('newMessage', {
			text: `I received your message: ${message.text}`,
			date: new Date(),
			sended: false
		}) ,2000);
	});
});

server.listen(port, () => console.log(`Server running on port ${port}`));