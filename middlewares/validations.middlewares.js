const { body, validationResult } = require('express-validator');

// VALIDATIONS

const createUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('role').notEmpty().withMessage('Role cannot be empty'),
];

const createRepairValidations = [
  body('date')
    .notEmpty()
    .withMessage('Date cannot be empty')
    .isDate()
    .withMessage('Must be a valid date'),
  body('computerNumber')
    .isEmpty()
    .withMessage('Computer number cannot be empty'),
  body('comments').isEmpty().withMessage('Comments cannot be empty'),
];

// CHECK VALIDATIONS

const checkCreateUserValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);
    //En la anterior linea de desestructura msg de error y permite hacer un return implicito

    const errorMsg = messages.join('. ');
    //En la anterior variable convertimos el array de mensaes en un solo string, separados por un punto y un espacio.

    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }

  next();
};

const checkCreateRepairValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);
    //En la anterior linea de desestructura msg de error y permite hacer un return implicito

    const errorMsg = messages.join('. ');
    //En la anterior variable convertimos el array de mensaes en un solo string, separados por un punto y un espacio.

    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }

  next();
};

module.exports = {
  createUserValidations,
  checkCreateUserValidation,
  createRepairValidations,
  checkCreateRepairValidation,
};
