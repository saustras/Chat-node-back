const { handleAsync } = require("../middleware/handlerException");
const { loginUserService, logoutUserService } = require("../services/loginService");


const login = handleAsync(async (req, res) => {
  const { username, password } = req.body;
  const result = await loginUserService(username, password, res);
  return res.status(result.status).json(result);
});

const logout = handleAsync(async (req, res) => {
  const result = await logoutUserService(res);
  return res.status(result.status).json(result);
});


module.exports = {
  login: handleAsync(login),
  logout: handleAsync(logout),
};