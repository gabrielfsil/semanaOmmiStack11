const knex = require('knex')
const configurantion = require('../../knexfile')

const conection = knex(configurantion.development);

module.exports = conection;