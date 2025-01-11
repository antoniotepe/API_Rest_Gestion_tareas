const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth");
const { taskValidation } = require("../middleware/validation");
const taskController = require("../controllers/taskController");

router.use(authenticateToken);

router.get('/', taskController.getAllTasks);
router.post('/', taskValidation, taskController.createTask);
router.put('/:id', taskValidation, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;