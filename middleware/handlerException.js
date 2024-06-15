class CustomError extends Error {
  constructor(statusCode, message, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    this.message= message;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleAsync = (asyncFn) => (req, res, next) =>
  Promise.resolve(asyncFn(req, res, next)).catch((error) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({
        message: error.message,
        error: true,
      });
    }
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message || 'Ocurrió un error inesperado.',
        error: true,
      });
    }
    
    next(error);
  });

module.exports = {
  CustomError,
  handleAsync,
};