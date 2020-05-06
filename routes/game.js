const express = require('express');
const request = require('request');
const axios = require('axios');
const router = express.Router();


/**
 * Route for client-side, to fetch data
 */
router.get('/data', function (req, res) {
    if (req.session.game) {
        res.send(req.session.game);
    } else {
        res.send(false);
    }
});

router.get('/game', function (req, res) {
    const data = require('../data/playlists');
    const state = {
        category: req.body.category
    };

    res.render('/game', state)
})

/**
 * Route for end of game, client-side posts the game score
 */
router.post('/score', function (req, res) {
    const score = req.body.score;
    req.session.score = score;
    res.end();
})

module.exports = router;