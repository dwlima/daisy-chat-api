const db = require('../config/db');
const bcrypt = require('bcrypt');

class UserController {
    async listUsers(req, res) {
        const [users] = await db.query('SELECT * FROM users');
        res.json(users);
    }

    async getUser(req, res) {
        const { id } = req.params;
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

        if (user.length > 0) {
            res.json(user[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }

    async updateUser(req, res) {
        const { id } = req.params;
        const { email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);

        await db.query('UPDATE users SET email = ?, password = ? WHERE id = ?', [email, hashedPassword, id]);
        res.json({ message: 'User updated' });
    }
}

module.exports = new UserController();
