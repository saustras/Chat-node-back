const { body } = require('express-validator');

const userDto = [
  body('name').notEmpty().withMessage('Ingrese el nombre.').isString().withMessage('name deberia ser un string.'),
  body('username').notEmpty().withMessage('Ingrese el usuario.').isString().withMessage('username deberia ser un string.'),
  body('password').notEmpty().withMessage('Ingrese la contraseña.').isString().withMessage('password deberia ser un string.'),
  body('profile_pic').optional({ nullable: true }).isString().withMessage('profile_pic Deberia ser un string.')
];

module.exports = userDto;
