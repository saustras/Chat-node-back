const { body } = require('express-validator');

const userLoginDto = [
  body('username').notEmpty().withMessage('Ingrese el usuario.').isString().withMessage('username deberia ser un string.'),
  body('password').notEmpty().withMessage('Ingrese la contraseña.').isString().withMessage('password deberia ser un string.')
]
module.exports = userLoginDto;
