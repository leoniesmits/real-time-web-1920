// const express = require('express');
// const fs = require('fs');
// const http = require('http')
// const gameRouter = require('./routes/game.js');

const express = require('express');
const app = express();
const http = require('http');
// const server = require('http').createServer(app);
// const io = require('socket.io').listen(server);
const fs = require('fs');
// const consumer = require('./lib/consumer');

var server = require('http').createServer(app);
var io = require('socket.io')(server);

// load consumer.js and pass it the socket.io object
// var consumer = require('./consumer.js');

// const gameRouter = require('./routes/game');
const indexRouter = require('./routes/index');

// // Creates express app
// const app = express();
// const server = http.createServer(app);
// const PORT = 4444;
// const io = require('socket.io')(http);

// const consumer = require('./lib/consumer');

// consumer.create(server);
// const http = require('http').Server(app);

// const app = express();
// const server = http.createServer(app);
const PORT = 4444

// const app = express();
// const server = http.createServer(app);
// consumer.create(server);



// server.listen(PORT);
// console.log("Listening to 4444")
// console.log("Connection Established !")

// Redirect everything correctly from views to public
app.use(express.static('public'))

// Link templating engine to my express app
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('home');
});

// app.use('/', indexRouter);
// app.use('/game', gameRouter);


let usernames = {};
let pairCount = 0,
	id,
	clientsno,
	pgmstart = 0,
	varCounter;
const scores = {};

io.sockets.on('connection', function (socket) {
	console.log("New Client Arrived!");

	socket.on('addClient', function (username) {
		socket.username = username;
		usernames[username] = username;
		scores[socket.username] = 0;
		varCounter = 0
		// var id = Math.round((Math.random() * 1000000));
		pairCount++;
		if (pairCount === 1 || pairCount >= 3) {
			id = Math.round((Math.random() * 1000000));
			socket.room = id;
			pairCount = 1;
			console.log(pairCount + " " + id);
			socket.join(id);
			pgmstart = 1;
		} else if (pairCount === 2) {
			console.log(pairCount + " " + id);
			socket.join(id);
			pgmstart = 2;
		}

		console.log(username + " joined to " + id);

		socket.emit('updatechat', 'SERVER', 'You are connected! Waiting for other player to connect...', id);

		socket.broadcast.to(id).emit('updatechat', 'SERVER', username + ' has joined to this game !', id);


		if (pgmstart == 2) {
			fs.readFile(__dirname + "/lib/questions.json", "Utf-8", function (err, data) {
				jsoncontent = JSON.parse(data);
				io.sockets.in(id).emit('sendQuestions', jsoncontent);

			});
			console.log("Player2");
		} else {
			console.log("Player1");

		}


	});


	socket.on('result', function (usr, rst) {

		io.sockets.in(rst).emit('viewresult', usr);


	});




	socket.on('disconnect', function () {

		delete usernames[socket.username];
		io.sockets.emit('updateusers', usernames);
		//io.sockets.in(id).emit('updatechat', 'SERVER', socket.username + ' has disconnected',id);
		socket.leave(socket.room);
	});
});


//



// Starts server
// server.listen(process.env.PORT || PORT, function () {
//     console.log('Listening on port ' + PORT);
// }).on('error', console.log);

// server.listen(PORT, () => {
// 	console.log(`Listening on http://localhost:${PORT}`)
//   });

server.listen(PORT, () => {
	console.log(`Running on http://localhost:${PORT}`)
});