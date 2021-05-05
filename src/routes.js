const express = require('express');

const routes = express.Router();
const SectorController = require('./Controllers/SectorController');
const { verifyJWT } = require('./Utils/validateJWT');

routes.get('/sector', verifyJWT, SectorController.sectorGet);
routes.get('/sector/newest-four', verifyJWT, SectorController.newestFourSectorsGet);
routes.get('/sector/:id', verifyJWT, SectorController.sectorId);
routes.post('/sector/create', verifyJWT, SectorController.sectorCreate);
routes.put('/sector/update/:id', verifyJWT, SectorController.sectorUpdate);
routes.delete('/sector/delete/:id', verifyJWT, SectorController.sectorDelete);

module.exports = routes;
