const db = require('../config/db');

class FamilyGroupController {
  async list(req, res) {
    const query = `
        SELECT int_grupo_familia_id_pk, str_grupo_familia_descricao 
        FROM tab_grupo_familia 
        WHERE bl_grupo_familia_ativa IS TRUE
        ORDER BY int_grupo_familia_id_pk
      `;
      const [rows] = await db.query(query);
    res.json(rows);
  }
}


module.exports = new FamilyGroupController();
