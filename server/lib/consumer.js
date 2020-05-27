const socket = require('socket.io');

class consumer {
	constructor() {
		this.io = null;
	}

	create(server) {
		this.io = socket(server);
	}
}

// module.exports = {
//     start: function(io) {
//         io.on('connection', function(socket) {
//             socket.on('message', function(message) {
//                 logger.log('info',message.value);
//                 socket.emit('ditConsumer',message.value);
//                 console.log('from console',message.value);
//             });
//         });
//     }
// }

module.exports = new consumer;