const { Repair } = require('../models/repair.model');

const repairActive = async (req, res, next) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id } });

    if (!repair || repair.status !== 'pending') {
      return res.status(404).json({
        status: 'error',
        messaje: 'Item not found given that id',
      });
    }

    req.repair = repair;

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { repairActive };
