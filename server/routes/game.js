// const consumer = require('./lib/consumer');

// module.exports = async (request, response) => {


// }

// const usernames = {};
// const pairCount = 0,
// 	id, 
// 	clientsno, 
// 	pgmstart = 0,
// 	varCounter;
// const scores = {};

// io.sockets.on('connection', function (socket) {
// 	console.log("New Client Arrived!");

// 	socket.on('addClient', function (username) {
// 		socket.username = username;
// 		usernames[username] = username;
// 		scores[socket.username] = 0;
// 		varCounter = 0
// 		// var id = Math.round((Math.random() * 1000000));
// 		pairCount++;
// 		if (pairCount === 1 || pairCount >= 3) {
// 			id = Math.round((Math.random() * 1000000));
// 			socket.room = id;
// 			pairCount = 1;
// 			console.log(pairCount + " " + id);
// 			socket.join(id);
// 			pgmstart = 1;
// 		} else if (pairCount === 2) {
// 			console.log(pairCount + " " + id);
// 			socket.join(id);
// 			pgmstart = 2;
// 		}

// 		console.log(username + " joined to " + id);

// 		socket.emit('updatechat', 'SERVER', 'You are connected! Waiting for other player to connect...', id);

// 		socket.broadcast.to(id).emit('updatechat', 'SERVER', username + ' has joined to this game !', id);


// 		if (pgmstart == 2) {
// 			fs.readFile(__dirname + "/lib/questions.json", "Utf-8", function (err, data) {
// 				jsoncontent = JSON.parse(data);
// 				io.sockets.in(id).emit('sendQuestions', jsoncontent);

// 			});
// 			console.log("Player2");
// 		} else {
// 			console.log("Player1");

// 		}





// 	});


// 	socket.on('result', function (usr, rst) {

// 		io.sockets.in(rst).emit('viewresult', usr);


// 	});




// 	socket.on('disconnect', function () {

// 		delete usernames[socket.username];
// 		io.sockets.emit('updateusers', usernames);
// 		//io.sockets.in(id).emit('updatechat', 'SERVER', socket.username + ' has disconnected',id);
// 		socket.leave(socket.room);
// 	});
// });