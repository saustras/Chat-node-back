const express = require('express');
const { registerUser, userDetails, updateUserDetails } = require('../controller/userController');
const userDto = require('../dtos/userDto');
const userLoginDto = require('../dtos/userLoginDto');
const validateDto = require('../middleware/validateDto');
const { login, logout } = require('../controller/loginController');
const { verifyToken } = require('../middleware/jwtMiddleware');
const updateUserDto = require('../dtos/updateUserDto');

const router = express.Router();

router.post('/register', userDto, validateDto, registerUser);
router.post('/login', userLoginDto, validateDto, login);
router.get('/user-details', verifyToken, userDetails);
router.put('/update-user',updateUserDto, validateDto, verifyToken, updateUserDetails);
router.get('/logout', logout);

module.exports = router;