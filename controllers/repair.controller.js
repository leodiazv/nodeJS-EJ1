const { Repair } = require('../models/repair.model');
const { User } = require('../models/user.model');

// Utils

const { catchAsync } = require('../utils/catchAsync');

const getRepairs = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    include: [{ model: User }],
  });
  res.status(200).json({
    repairs,
  });
});

const addRepair = catchAsync(async (req, res, next) => {
  const { date, computerNumber, comments, status, userId } = req.body;

  const newRepair = await Repair.create({
    date,
    computerNumber,
    comments,
    status,
    userId,
  });

  res.status(201).json({ newRepair });
});

const getRepairById = catchAsync(async (req, res, next) => {
  const { repair } = req;

  res.status(200).json({ repair });
});

const updateRepairStatus = catchAsync(async (req, res, next) => {
  const { repair } = req;

  await repair.update({ status: 'completed', comments: repair.comments });

  res.status(200).json({
    status: 'success',
  });
});

const deleteRepairOrder = catchAsync(async (req, res, next) => {
  const { repair } = req;

  repair.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getRepairs,
  addRepair,
  getRepairById,
  updateRepairStatus,
  deleteRepairOrder,
};
