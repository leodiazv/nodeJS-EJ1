const express = require('express');

const router = express.Router();

//Middlewares

const {
  repairActive,
  protectedAccessToRepairs,
} = require('../middlewares/repairs.middlewares');
const { protectToken } = require('../middlewares/users.middlewares');
const {
  createRepairValidations,
  checkValidations,
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

// Apply protectToken middleware
router.use(protectToken);

router
  .route('/')
  .get(protectedAccessToRepairs, getRepairs)
  .post(createRepairValidations, checkValidations, addRepair);
router
  .use('/:id', protectedAccessToRepairs, repairActive)
  .route('/:id')
  .get(getRepairById)
  .patch(updateRepairStatus)
  .delete(deleteRepairOrder);

module.exports = { repairsRouter: router };
