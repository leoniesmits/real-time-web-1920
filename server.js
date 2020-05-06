// var dotenv = require('dotenv').config();

// third party modules
const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const path = require('path');
const cookieParser = require('cookie-parser');
const gameRouter = require('./routes/game');
const indexRouter = require('./routes/index');


// Creates express app
const app = express();
const PORT = 1400;

const http = require('http').Server(app);
const io = require('socket.io')(http);


// Redirect everything correctly from views to public
app.use(express.static('public'))
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/game', gameRouter);

// Link templating engine to my express app
app.set('view engine', 'ejs');

// Create routes
// app.use('/', indexRouter);
// app.use('/game', gameRouter);

app.get('/', function (req, res) {
    res.render('home');

});



// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({
        username,
        room
    }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // Welcome current user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit(
                'message',
                formatMessage(botName, `${user.username} has joined the chat`)
            );

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit(
                'message',
                formatMessage(botName, `${user.username} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });
});


// Starts server
app.listen(process.env.PORT || PORT, function () {
    console.log('Bot is listening on port ' + PORT);
}).on('error', console.log);

module.exports = app;