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

const protectedAccessToRepairs = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role === 'admin' || sessionUser.role === 'employee') {
    next();
  } else {
    return next(new AppError('Unauthorized access', 403));
  }
});

module.exports = { repairActive, protectedAccessToRepairs };
