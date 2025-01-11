const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateToken } = require('../config/jwt');

const register = async (req, res) => {
    try {
        const { email, password, nombre } = req.body;
        
        // Verificar si el usuario ya existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'El email ya está registrado'
            });
        }

        // Hash de la contraseña
        const hashedPassword = await hashPassword(password);
        
        // Crear el usuario
        const userId = await User.create(email, hashedPassword, nombre);
        
        // Generar token
        const token = generateToken(userId);
        
        res.status(201).json({
            success: true,
            token,
            message: 'Usuario registrado exitosamente'
        });

    } catch (error) {
        console.error('Error completo:', error);
        res.status(500).json({
            success: false,
            message: 'Error al registrar usuario',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        const token = generateToken(user.id);
        
        res.json({
            success: true,
            token
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión'
        });
    }
};

module.exports = {
    register,
    login
};