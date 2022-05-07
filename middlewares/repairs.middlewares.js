const { Repair } = require('../models/repair.model');

// Utils

const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const repairActive = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({ where: { id } });

  if (!repair || repair.status !== 'pending') {
    return next(new AppError('User does not exist with given Id', 404));
  }

  req.repair = repair;

  next();
});

module.exports = { repairActive };
