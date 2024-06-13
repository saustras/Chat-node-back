const sendResponse = (statusCode, message, data = null) => {
  const response = {
    message,
    success: statusCode >= 200 && statusCode < 300,
  };
  if (data) response.data = data;
  return { status: statusCode, ...response };
};

const sendResponseCookie = (res, [name, val, options], status, message, data = null) => {
  const response = {
    message,
    success: status >= 200 && status < 300,
  };
  if (data) response.data = data;
  res.cookie(name, val, options);
  return { status, ...response };
};
  
  
  module.exports = {
    sendResponse,
    sendResponseCookie
  };