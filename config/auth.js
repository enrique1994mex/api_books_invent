const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const signToken = (user) => {
    return jwt.sign({Nombre: user.Name, Email: user.Email},
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        });
}

module.exports = signToken; 