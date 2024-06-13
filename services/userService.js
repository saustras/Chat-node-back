const { findUserByUsername, createUser, UpdateUserById, findUserById } = require('../repositories/userRepository');
const { encriptPassword } = require('../utils/bcrypt');
const { CustomError } = require('../middleware/handlerException');
const { sendResponse } = require("../utils/sendResponse");
const { getUserDetailsFormToken } = require("../utils/jsonwebtoken");

const registerUserService = async (userDto) => {
    const { name, username, password, profile_pic } = userDto;
  
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      throw new CustomError(409, 'El usuario ya existe.');
    }
    const hashedPassword = await encriptPassword(password);
  
    const newUser = {
      name,
      username,
      password: hashedPassword,
      profile_pic,
    };
    const savedUser = await createUser(newUser);
    return  sendResponse(201, 'Usuario creado con éxito', savedUser);
};

const getUserDetailsService = async (token) => {
  const user = await getUserDetailsFormToken(token); 
  if (!user) {
    throw new CustomError(404, 'Usuario no encontrado');
  }
  return sendResponse(200, 'Detalles del usuario', user);
};

const updateUserDetailsService = async (token, name, profile_pic) => {
  const user = await getUserDetailsFormToken(token);
  if (!user) {
    throw new CustomError(404, 'Usuario no encontrado');
  }
  await UpdateUserById(user._id, name, profile_pic);
  const userInformation = await findUserById(user._id);
  return sendResponse(200, 'Usuario actualizado correctamente.', userInformation);
};

  module.exports = {
    registerUserService,
    getUserDetailsService,
    updateUserDetailsService
  };