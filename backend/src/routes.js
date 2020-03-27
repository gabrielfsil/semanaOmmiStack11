const express = require('express');
const routes = express.Router()

const OngController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentsController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

routes.post('/session',SessionController.store)

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.store)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentsController.index)
routes.post('/incidents',IncidentsController.store)
routes.delete('/incidents/:id', IncidentsController.delete)

module.exports = routes