const express = require('express');

const router = express.Router();

//Middlewares

const {
  userExists,
  protectToken,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');
const {
  createUserValidations,
  loginValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

//Controller

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
} = require('../controllers/user.controller');

//HTTP request

router.route('/').post(createUserValidations, checkValidations, createUser);
router.route('/login').post(loginValidations, checkValidations, login);

// Apply protectToken middleware

router.use(protectToken);

router.route('/').get(getAllUsers);
router
  .route('/:id')
  .get(userExists, getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
