const pool = require('../config/database');

const getAllTasks = async (req, res) => {
    try {
        const [tasks] = await pool.query(
            'SELECT * FROM tasks WHERE user_id = ?',
            [req.user.id]
        );
        
        res.json({
            success: true,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener tareas'
        });
    }
};

const createTask = async (req, res) => {
    try {
        const { titulo, descripcion, estado = 'pendiente' } = req.body;
        const userId = req.user.id;

        const [result] = await pool.query(
            'INSERT INTO tasks (titulo, descripcion, estado, user_id, fecha_creacion, fecha_actualizacion) VALUES (?, ?, ?, ?, NOW(), NOW())',
            [titulo, descripcion, estado, userId]
        );

        const [newTask] = await pool.query(
            'SELECT * FROM tasks WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            data: newTask[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la tarea'
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, estado } = req.body;
        const userId = req.user.id;

        // Verificar si la tarea existe y pertenece al usuario
        const [existingTask] = await pool.query(
            'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (existingTask.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Tarea no encontrada'
            });
        }

        await pool.query(
            'UPDATE tasks SET titulo = ?, descripcion = ?, estado = ?, fecha_actualizacion = NOW() WHERE id = ? AND user_id = ?',
            [titulo, descripcion, estado, id, userId]
        );

        const [updatedTask] = await pool.query(
            'SELECT * FROM tasks WHERE id = ?',
            [id]
        );

        res.json({
            success: true,
            data: updatedTask[0]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar la tarea'
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Verificar si la tarea existe y pertenece al usuario
        const [existingTask] = await pool.query(
            'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        if (existingTask.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Tarea no encontrada'
            });
        }

        await pool.query(
            'DELETE FROM tasks WHERE id = ? AND user_id = ?',
            [id, userId]
        );

        res.json({
            success: true,
            message: 'Tarea eliminada exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar la tarea'
        });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};