const moment = require('moment-timezone');
const Sector = require('../Models/SectorSchema');
const { validate } = require('../Utils/validate');

const sectorGet = async (req, res) => {
  const sectors = await Sector.find();

  return res.status(200).json(sectors);
};

const sectorId = async (req, res) => {
  const { id } = req.params;

  const sector = await Sector.find({ _id: id });

  if(sector.length == 0){
    return res.status(400).json(sector);
  }

  return res.json(sector);
};

const sectorCreate = async (req, res) => {
  const { name, description } = req.body;

  const validFields = validate(name, description);

  if (validFields.length) {
    return res.status(500).json({ status: validFields });
  }

  const newSector = await Sector.create({
    name,
    description,
    createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
  });

  return res.status(200).json(newSector);
};

module.exports = { sectorGet, sectorId, sectorCreate };
