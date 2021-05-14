const moment = require('moment-timezone');
const Sector = require('../Models/SectorSchema');
const { validate } = require('../Utils/validate');

const sectorGet = async (req, res) => {
  const sectors = await Sector.find();

  return res.status(200).json(sectors);
};

const sectorId = async (req, res) => {
  const { id } = req.params;

  try {
    const sector = await Sector.findOne({ _id: id });
    return res.status(200).json(sector);
  } catch {
    return res.status(400).json({ err: 'Invalid ID' });
  }
};

const sectorCreate = async (req, res) => {
  const { name, description } = req.body;

  const validFields = validate(name, description);

  if (validFields.length) {
    return res.status(400).json({ status: validFields });
  }

  try {
    const newSector = await Sector.create({
      name,
      description,
      createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    });
    return res.status(200).json(newSector);
  } catch (error) {
    return res.status(400).json({ error: error.code });
  }
};

const sectorUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const validFields = validate(name, description);

  if (validFields.length) {
    return res.status(400).json({ status: validFields });
  }
  try {
    const updateStatus = await Sector.findOneAndUpdate({ _id: id }, {
      name,
      description,
      updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    }, { new: true }, (user) => user);
    return res.json(updateStatus);
  } catch {
    return res.status(400).json({ err: 'invalid id' });
  }
};

const sectorDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await Sector.deleteOne({ _id: id });

    return res.json({ message: 'success' });
  } catch (error) {
    return res.status(400).json({ message: 'failure' });
  }
};

module.exports = {
  sectorGet, sectorId, sectorCreate, sectorUpdate, sectorDelete,
};
