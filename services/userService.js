const { findUserByUsername, createUser, UpdateUserById, findUserById, findAllUser } = require('../repositories/userRepository');
const { encriptPassword } = require('../utils/bcrypt');
const { CustomError } = require('../middleware/handlerException');
const { sendResponse } = require("../utils/sendResponse");
const { getUserDetailsFromToken, hasTokenExpired } = require("../utils/jsonwebtoken");

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

const getAllUsersService = async (search) => {
  try {
    const users = await findAllUser(search);
    return sendResponse(200, 'Lista de usuarios', users);
  } catch (error) {
    throw new CustomError(400, 'No se pudo obtener los usuarios.');
  }
};

const getUserDetailsService = async (token) => {
  if(!token){
    return sendResponse(401, 'Detalles del usuario', logout= true);
  }
  const isExpired = hasTokenExpired(token)
  if(isExpired){
    return sendResponse(401, 'Token ha expirado', logout= true);
  }
  const user = await getUserDetailsFromToken(token); 
  if (!user) {
    return sendResponse(404, 'Usuario no encontrado',logout= true);
  }
  return sendResponse(200, 'Detalles del usuario', user);
};

const updateUserDetailsService = async (token, name, profile_pic) => {
  const user = await getUserDetailsFromToken(token);
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
    updateUserDetailsService,
    getAllUsersService
  };