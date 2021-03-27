const express = require('express');

const routes = express.Router();
const SectorController = require('./Controllers/SectorController');

routes.get('/sector', SectorController.sectorGet);
routes.get('/sector/:id', SectorController.sectorId);
routes.post('/sector/create', SectorController.sectorCreate);
routes.put('/sector/update/:id', SectorController.sectorUpdate);

module.exports = routes;
