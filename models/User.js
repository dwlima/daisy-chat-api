const db = require('../config/db');

class User {
    // static async getAllUsers() {
    //     const [rows] = await db.query('SELECT * FROM users');
    //     return rows;
    // }

    // static async getUserById(id) {
    //     const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    //     return rows[0];
    // }

    // static async updateUser(id, data) {
    //     const [result] = await db.query('UPDATE users SET ? WHERE id = ?', [data, id]);
    //     return result.affectedRows > 0;
    // }
}

module.exports = User;
