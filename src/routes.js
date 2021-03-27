const express = require('express');

const routes = express.Router();

const SectorController = require('./Controllers/SectorController');

routes.post('/sector/create', SectorController.sectorCreate);

module.exports = routes;