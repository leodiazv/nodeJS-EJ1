const express = require('express');

const router = express.Router();

//Middlewares

const { repairActive } = require('../middlewares/repairs.middlewares');
const {
  createRepairValidations,
  checkCreateRepairValidation,
} = require('../middlewares/validations.middlewares');

//Controller

const {
  getRepairs,
  addRepair,
  getRepairById,
  updateRepairStatus,
  deleteRepairOrder,
} = require('../controllers/repair.controller');

//HTTP request

router
  .route('/')
  .get(getRepairs)
  .post(createRepairValidations, checkCreateRepairValidation, addRepair);
router
  .use('/:id', repairActive)
  .route('/:id')
  .get(getRepairById)
  .patch(updateRepairStatus)
  .delete(deleteRepairOrder);

module.exports = { repairsRouter: router };
