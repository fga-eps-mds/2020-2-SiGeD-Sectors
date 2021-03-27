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

const sectorUpdate = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const validFields = validate(name, description);

  if (validFields.length) {
    return res.json({ status: validFields });
  }

  const updateStatus = await Sector.findOneAndUpdate({ _id: id }, {
    name,
    description,
    updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
  }, { new: true }, (err, user) => {
    if (err) {
      return err;
    }
    return user;
  });

  return res.json(updateStatus);
};

const sectorDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteStatus = await Sector.deleteOne({ _id: id });

    if (deleteStatus.deletedCount !== 1) {
      return res.json({ message: 'failure' });
    }

    return res.json({ message: 'success' });
  } catch (error) {
    console.log(error);
    return res.json({ message: 'failure' });
  }
};

module.exports = {
  sectorGet, sectorId, sectorCreate, sectorUpdate, sectorDelete,
};
