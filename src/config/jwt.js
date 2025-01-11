const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta';

const generateToken = (userId) => {
    return jwt.sign({id: userId}, JWT_SECRET, {expiresIn: '24h'});
}

module.exports = {
    JWT_SECRET,
    generateToken
}