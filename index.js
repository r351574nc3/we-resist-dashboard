const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const Preferences = require('./server/controllers/preferences')
const moment = require('moment')
const Promise = require('bluebird')
const sc2 = Promise.promisifyAll(require ('sc2-sdk'))
const { db_url, sc2_secret } = require('./server/config')
const rp = require('request-promise');

var app = express();

app.use(express.static(path.join(__dirname,"./dist")));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/*", (req, res) => {
    res.sendFile('index.html', { root: './dist' })
})

app.listen(1234, function(){
    console.log("Started listening on port", 1234);
})