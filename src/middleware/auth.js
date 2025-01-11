const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: 'Acceso denegado' 
        });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token inválido'
        })
    }

};

module.exports = authenticateToken;