const db = require('../config/db');

class FamilyGroup {
    static async getAll() {
      const query = `
          SELECT int_grupo_familia_id_pk, str_grupo_familia_descricao 
          FROM tab_grupo_familia 
          WHERE bl_grupo_familia_ativa IS TRUE
          ORDER BY int_grupo_familia_id_pk
        `;
        const [rows] = await db.query(query);
        return rows;
    }

//     static async getOrderById(id) {
//         const [rows] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
//         return rows[0];
//     }

//     static async updateOrderStatus(id, status) {
//         const [result] = await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
//         return result.affectedRows > 0;
//     }
// }

module.exports = FamilyGroup;
