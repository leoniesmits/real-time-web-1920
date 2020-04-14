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

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
    });
});

// The port used for Express server
const PORT = 1400;
// Starts server
http.listen(process.env.PORT || PORT, function () {
    console.log('Bot is listening on port ' + PORT);
}).on('error', console.log);