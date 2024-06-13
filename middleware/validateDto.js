const { validationResult } = require('express-validator');

const validateDto = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ 
            message: 'Error de validacion.', 
            errors: errors.array() 
        });
    }
    next();
};

module.exports = validateDto;

