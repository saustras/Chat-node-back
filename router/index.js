const express = require('express');
const { registerUser, userDetails, updateUserDetails, getAllUsers } = require('../controller/userController');
const userDto = require('../dtos/userDto');
const userLoginDto = require('../dtos/userLoginDto');
const validateDto = require('../middleware/validateDto');
const { login, logout } = require('../controller/loginController');
const updateUserDto = require('../dtos/updateUserDto');

const router = express.Router();

router.post('/register', userDto, validateDto, registerUser);
router.post('/login', userLoginDto, validateDto, login);
router.get('/user-details', userDetails);
router.put('/update-user',updateUserDto, validateDto, updateUserDetails);
router.get('/logout', logout);
router.post('/users', getAllUsers);

module.exports = router;