const express = require('express');

const routes = express.Router();

const SectorController = require('./Controllers/SectorController');

const {verifyJWT} = require('./Utils/functionsJWT');

// routes.post('/sector/login', SectorController.login);
routes.post('/sector/create', verifyJWT, SectorController.sectorCreate);

module.exports = routes;