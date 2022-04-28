const express = require('express');

const router = express.Router();

//Middlewares

const { repairActive } = require('../middlewares/repairs.middlewares');

//Controller

const {
  getRepairs,
  addRepair,
  getRepairById,
  updateRepairStatus,
  deleteRepairOrder,
} = require('../controllers/repair.controller');

//HTTP request

router.route('/').get(getRepairs).post(addRepair);
router
  .route('/:id')
  .get(repairActive, getRepairById)
  .patch(repairActive, updateRepairStatus)
  .delete(repairActive, deleteRepairOrder);

module.exports = { repairsRouter: router };
