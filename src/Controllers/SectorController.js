const moment = require('moment-timezone');
const Sector = require('../Models/SectorSchema');
const validation = require('../Utils/validate');

const sectorCreate = async (req, res) => {
    const { name, description } = req.body;

    const validFields = validation.validate(name, description);

    if (validFields.length) {
        return res.status(500).json({ status: validFields });
    }

    const newSector = await Sector.create({
        name,
        description,
        createdAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
        updatedAt: moment.utc(moment.tz('America/Sao_Paulo').format('YYYY-MM-DDTHH:mm:ss')).toDate(),
    });

    return res.json(newSector);
}

module.exports = { sectorCreate };