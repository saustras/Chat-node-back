const { body } = require('express-validator');

const updateUserDto = [
  body('name').isString().withMessage('name Deberia ser un string.'),
  body('profile_pic').optional({ nullable: true }).isString().withMessage('profile_pic Deberia ser un string.'),
];

module.exports = updateUserDto;
