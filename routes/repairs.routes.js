const express = require('express');

const router = express.Router();

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
  .get(getRepairById)
  .patch(updateRepairStatus)
  .delete(deleteRepairOrder);

module.exports = { repairsRouter: router };
