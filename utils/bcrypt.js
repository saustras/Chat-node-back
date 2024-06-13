const bcryptjs = require("bcryptjs");
const { CustomError, handleAsync } = require("../middleware/handlerException");


const encriptPassword = async (password) => {
    if (!password) {
      throw new CustomError(400, "No se pudo encriptar la contraseña: No se proporcionó la contraseña");
    }
    
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password, salt);
  };
  
  const verifyPassword = async (password, userPassword) => {
    if (!password || !userPassword) {
      throw new CustomError(400, "No se pudo verificar la contraseña: No se proporcionaron ambas contraseñas");
    }
    
    return bcryptjs.compare(password, userPassword);
  };
  
  module.exports = {
    encriptPassword: handleAsync(encriptPassword),
    verifyPassword: handleAsync(verifyPassword)
  };