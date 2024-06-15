const jwt = require('jsonwebtoken');
const { CustomError } = require('./handlerException');

const secretKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new CustomError(401, 'Acceso no autorizado');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      throw new CustomError(401, 'Token inválido o expirado');
    }
    req.user = decoded; 
    next();
  });
};

module.exports = {
  verifyToken
};