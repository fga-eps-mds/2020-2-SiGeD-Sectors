const express = require('express');

const routes = express.Router();
const SectorController = require('./Controllers/SectorController');

routes.get('/sector', SectorController.sectorGet);
routes.get('/sector/:id', SectorController.sectorId);
routes.post('/sector/create', SectorController.sectorCreate);

module.exports = routes;
