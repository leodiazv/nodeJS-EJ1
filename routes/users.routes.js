const express = require('express');

const router = express.Router();

//Middlewares

const { userExists } = require('../middlewares/users.middlewares');
const {
  createUserValidations,
  checkCreateUserValidation,
} = require('../middlewares/validations.middlewares');

//Controller

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

// Las siguientes lineas mejoran el codigo de las rutas comentadas

router
  .route('/')
  .get(getAllUsers)
  .post(createUserValidations, checkCreateUserValidation, createUser);
router
  .route('/:id')
  .get(userExists, getUserById)
  .patch(userExists, updateUser)
  .delete(userExists, deleteUser);

module.exports = { usersRouter: router };
