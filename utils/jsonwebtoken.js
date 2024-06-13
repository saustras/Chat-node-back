const jwt = require('jsonwebtoken');
const { findUserById } = require('../repositories/userRepository');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '48h' }); 

};

const getUserDetailsFormToken = async (token) => {

    if(!token) {
        return {
            message: "session out",
            logout: true
        }
    }

    const decode = await jwt.verify(token,secretKey);

    const user = await findUserById(decode.id)

    return user
}


  module.exports = {
    generateToken,
    getUserDetailsFormToken
  }