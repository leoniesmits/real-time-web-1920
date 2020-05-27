// const express = require('express');
// const router = express.Router();
const consumer = require('../lib/consumer');

//

const async = require('async');
const axios = require('axios');
const utf8 = require('utf8')
const fs = require('fs');
let jsonData = require('../lib/data/zero.json')
var querystring = require('query-string');
require('dotenv').config();


const api_key = process.env.MUSIX_API_KEY;
console.log('5f6eabe9cb91ff48968b2c582d8c88cc')
const title = 'Bambi';
const artist = 'Prince';
const url = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?' +
    querystring.stringify({
        format: 'json',
        q_track: utf8.encode(title),
        q_artist: utf8.encode(artist),
        apikey: utf8.encode(api_key)
    });
console.log(url);
axios.get(url).then(res => {
    console.log(res.data.message);
    if (res.data.message.body.lyrics != undefined) console.log(res.data.message.body.lyrics);
    else {
        console.log("nope");
    }
}).catch(err => {
    console.log(err);
});

console.log('This is after the read call');

// module.exports = async (request, response) => {
//     namespace.on('connection', (socket) => {

//     })
//     response.render("home");
// }


// const getTrackLyrics = async function () {
//     const title = 'Bambi';
//     const artist = 'Prince';
//     const url = 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?' +
//         querystring.stringify({
//             format: 'json',
//             q_track: utf8.encode(title),
//             q_artist: utf8.encode(artist),
//             apikey: api_key
//         });
//     return await axios.get(url);
// };

