const express = require('express');
const request = require('request');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const axios = require('axios');
const router = express.Router();
const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));
/**
 * Route for index page before user logs in
 */
router.get('/', function (req, res) {
  res.render('home', { name: false });
});

router.post('/start', function (req, res) {
    console.log(req.body)
    const state = {
        name: "name"
    }

    res.render('start', state);
})



module.exports = router;

