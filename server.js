// var dotenv = require('dotenv').config();

// third party modules
const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");
const path = require('path');

// Creates express app
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Redirect everything correctly from views to public
app.use(express.static('public'))

// use view engine and connect to my app
// app.set('view engine', 'ejs');

// create route for home on first load
// app.get('/', function (req, res) {
//     res.render('home');
// })

// Link templating engine to my express app
app.set('view engine', 'ejs');

// Create a route for home
app.get('/', function (req, res) {

    var tagline = "deze ding"
    res.render('home', {
        tagline: tagline
    });
})

// Run when client connects
io.on('connection', socket => {
    // socket.on('joinRoom', ({ username, room }) => {
    //   const user = userJoin(socket.id, username, room);
  
    //   socket.join(user.room);
  
    //   // Welcome current user
    //   socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
  
    //   // Broadcast when a user connects
    //   socket.broadcast
    //     .to(user.room)
    //     .emit(
    //       'message',
    //       formatMessage(botName, `${user.username} has joined the chat`)
    //     );
  
    //   // Send users and room info
    //   io.to(user.room).emit('roomUsers', {
    //     room: user.room,
    //     users: getRoomUsers(user.room)
    //   });
    // });
  
    // // Listen for chatMessage
    // socket.on('chatMessage', msg => {
    //   const user = getCurrentUser(socket.id);
  
    //   io.to(user.room).emit('message', formatMessage(user.username, msg));
    // });
  
    // // Runs when client disconnects
    // socket.on('disconnect', () => {
    //   const user = userLeave(socket.id);
  
    //   if (user) {
    //     io.to(user.room).emit(
    //       'message',
    //       formatMessage(botName, `${user.username} has left the chat`)
    //     );
  
    //     // Send users and room info
    //     io.to(user.room).emit('roomUsers', {
    //       room: user.room,
    //       users: getRoomUsers(user.room)
    //     });
    //   }
    // });
  });

// The port used for Express server
const PORT = 1400;
// Starts server
http.listen(process.env.PORT || PORT, function () {
    console.log('Bot is listening on port ' + PORT);
}).on('error', console.log);