const express = require("express");
const router = express.Router();
const { registerValidation } = require("../middleware/validation");
const authController = require("../controllers/authController");

router.post('/register', registerValidation, authController.register);
router.post('/login', authController.login);

module.exports = router;