const { Repair } = require('../models/repair.model');

const getRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll();
    res.status(200).json({
      repairs,
    });
  } catch (error) {
    console.log(error);
  }
};

const addRepair = async (req, res) => {
  try {
    const { date, status, userId } = req.body;

    const newRepair = await Repair.create({ date, status, userId });

    res.status(201).json({ newRepair });
  } catch (error) {
    console.log(error);
  }
};

const getRepairById = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id } });

    if (!repair || repair.status !== 'pending') {
      return res.status(404).json({
        status: 'error',
        messaje: 'Item not found given that id',
      });
    }

    res.status(200).json({ repair });
  } catch (error) {
    console.log(error);
  }
};

const updateRepairStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const repair = await Repair.findOne({ where: { id } });

    if (!repair || repair.status !== 'pending') {
      return res.status(404).json({
        status: 'error',
        messaje: 'Item not found given that id',
      });
    }

    repair.update({ status: 'completed' });

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteRepairOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({ where: { id } });

    if (!repair || repair.status !== 'pending') {
      return res.status(404).json({
        status: 'error',
        messaje: 'Item not found given that id',
      });
    }

    repair.update({ status: 'cancelled' });

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRepairs,
  addRepair,
  getRepairById,
  updateRepairStatus,
  deleteRepairOrder,
};
