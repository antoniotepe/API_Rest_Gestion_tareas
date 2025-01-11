const pool = require('../config/database');

class Task {
    static async create(titulo, descripcion, estado, userId) {
        try {
            const [result] = await pool.query(
                'INSERT INTO tasks (titulo, descripcion, estado, user_id) VALUES (?, ?, ?, ?)',
                [titulo, descripcion, estado, userId]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error en Task.create:', error);
            throw error;
        }
    }

    static async findByUserId(userId) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM tasks WHERE user_id = ?',
                [userId]
            );
            return rows;
        } catch (error) {
            console.error('Error en Task.findByUserId:', error);
            throw error;
        }
    }
}

module.exports = Task;