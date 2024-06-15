const jwt = require('jsonwebtoken');
const { findUserById } = require('../repositories/userRepository');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '48h' }); 

};

const getUserDetailsFromToken = async (token) => {

    if(!token) {
        return {
            message: "Sesion terminada",
            logout: true
        }
    }
    const decode = await jwt.verify(token,secretKey);

    const user = await findUserById(decode.id)

    return user
}

const hasTokenExpired = (token) => {
    try {
      const decoded = jwt.verify(token, secretKey);
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime > decoded.exp;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return true; 
      }
      throw error; 
    }
  };


  module.exports = {
    generateToken,
    getUserDetailsFromToken,
    hasTokenExpired
  }