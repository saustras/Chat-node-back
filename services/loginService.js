const { verifyPassword } = require('../utils/bcrypt');
const { CustomError } = require('../middleware/handlerException');
const { generateToken } = require('../utils/jsonwebtoken');
const { sendResponseCookie } = require('../utils/sendResponse');
const { findUserByUsername } = require('../repositories/userRepository');
const cookieOption = require('../config/cookieOption');


const loginUserService = async (username, password, res) => {
    const user = await userValidation(username, password);
    const token = generateToken({ id: user._id, username: user.username });
    return sendResponseCookie(res, ['token', token, cookieOption], 200, 'Login exitoso', token);
};

const logoutUserService = async (res) => {
    return sendResponseCookie(res, ['token', '', cookieOption], 200, 'Logout exitoso');
};

const userValidation = async (username, password) => {
    if (!username || !password) {
        throw new CustomError(400, 'Faltan credenciales');
    }
    const user = await findUserByUsername(username);
    if (!user) {
        throw new CustomError(401, 'Credenciales inválidas');
    }
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
        throw new CustomError(401, 'Credenciales inválidas');
    }
    return user;
};



module.exports = {
    logoutUserService,
    loginUserService,
};