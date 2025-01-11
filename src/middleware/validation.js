
const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();
};

// Validaciones para registro de usuario
const registerValidation = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Ingrese un email válido'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/\d/)
        .withMessage('La contraseña debe contener al menos un número')
        .matches(/[A-Z]/)
        .withMessage('La contraseña debe contener al menos una mayúscula'),
    body('nombre')
        .trim()
        .isLength({ min: 2 })
        .withMessage('El nombre debe tener al menos 2 caracteres'),
    validateRequest
];

// Validaciones para tareas
const taskValidation = [
    body('titulo')
        .trim()
        .notEmpty()
        .withMessage('El título es requerido')
        .isLength({ min: 3, max: 100 })
        .withMessage('El título debe tener entre 3 y 100 caracteres'),
    body('descripcion')
        .trim()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder los 500 caracteres'),
    body('estado')
        .isIn(['pendiente', 'en_progreso', 'completada'])
        .withMessage('Estado no válido'),
    validateRequest
];

module.exports = {
    registerValidation,
    taskValidation
};