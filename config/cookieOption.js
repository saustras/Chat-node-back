require('dotenv').config();

const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
}

module.exports = cookieOption