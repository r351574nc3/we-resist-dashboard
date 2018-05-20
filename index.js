const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const Preferences = require('./server/controllers/preferences')
const Members = require('./server/controllers/community/members')
const moment = require('moment')
const Promise = require('bluebird')
const sc2 = Promise.promisifyAll(require ('sc2-sdk'))
const { db_url, sc2_secret } = require('./server/config')
const rp = require('request-promise');

var app = express();

app.use(express.static(path.join(__dirname,"./dist")));
app.use(bodyParser.json()); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/@:username/preferences', Preferences.get)

app.put('/@:user/preferences', Preferences.put)

app.post('/@:user/preferences', Preferences.post)

app.delete('/@:user/preferences', Preferences.delete)

app.get('/api/community/member_list', Members.list)

app.get("/*", (req, res) => {
    const path = req.path.substring(req.path.lastIndexOf("/") + 1)
    const filename = path.endsWith("/") || path.indexOf(".") < 0 ? "index.html" : path

    res.sendFile(filename, { root: './dist' })
})

app.listen(1234, function(){
    console.log("Started listening on port", process.env.PORT);
})