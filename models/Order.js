const db = require('../config/db');

class Order {
    // static async getAllOrders() {
    //     const [rows] = await db.query('SELECT * FROM orders');
    //     return rows;
    // }

    // static async getOrderById(id) {
    //     const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
    //     return rows[0];
    // }

    // static async updateOrderStatus(id, status) {
    //     const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    //     return result.affectedRows > 0;
    // }
}

module.exports = Order;
