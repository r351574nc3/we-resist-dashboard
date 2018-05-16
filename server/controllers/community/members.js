`use strict`

const { db_url, sc2_secret } = require('../../config')
const Sequelize = require('sequelize')
const models = require('../../models')
const Promise = require('bluebird')
const pg = require('pg');
pg.defaults.ssl = true;
const sequelize = new Sequelize(db_url, { ssl: true })

members = {
    list: list_members
}

function list_members(req, res) {
    return models.Preferences.findAll({
        attributes: [ 'username',  'createdAt', 'updatedAt' ],
        logging: (query) => {}
    })
    .then((resisters) => {
        res.send(resisters)
    })
}
module.exports = members