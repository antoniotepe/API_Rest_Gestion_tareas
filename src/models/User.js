const pool = require('../config/database');

class User {
    static async create(email, hashedPassword, nombre) {
        try {
            const [result] = await pool.query(
                'INSERT INTO users (email, password, nombre) VALUES (?, ?, ?)',
                [email, hashedPassword, nombre]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error en User.create:', error);
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const [rows] = await pool.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            );
            return rows[0];
        } catch (error) {
            console.error('Error en User.findByEmail:', error);
            throw error;
        }
    }
}

module.exports = User;