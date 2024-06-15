
const { handleAsync, CustomError } = require('../middleware/handlerException');
const { updateUserDetailsService, getUserDetailsService, registerUserService, getAllUsersService } = require('../services/userService');


const registerUser = handleAsync(async (req, res) => {
  const user = req.body;
  if (!user) {
    throw new CustomError(400, 'No se proporcionó un usuario para registrar');
  }
  const result = await registerUserService(user);
  return res.status(result.status).json(result);
});

const userDetails = handleAsync(async (req, res) => {
    const token = req.cookies.token || "";
    const result = await getUserDetailsService(token);
    return res.status(result.status).json(result);
});
const getAllUsers  = handleAsync(async (req, res) => {
  const {search} = req.body;
  const result = await getAllUsersService(search);
  return res.status(result.status).json(result);
});

const updateUserDetails = handleAsync(async (req, res) => {
  const { name, profile_pic } = req.body;
  const token = req.cookies.token || "";
  const result = await updateUserDetailsService(token, name, profile_pic);
  return res.status(result.status).json(result);
});
  


module.exports = {
  registerUser: handleAsync(registerUser),
  userDetails,
  updateUserDetails: handleAsync(updateUserDetails),
  getAllUsers: handleAsync(getAllUsers)
}