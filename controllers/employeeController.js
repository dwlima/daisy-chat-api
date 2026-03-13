const db = require('../config/db');

class EmployeeController {

  async get(req, res) {
    const { id } = req.params;

    console.log('inside EmployeeController::get');
    console.log("id: " + id);

    try {
      const query = `
         select * 
         from tab_funcionario 
         where int_funcionario_id_pk = ?
      `;

      const [rows] = await db.query(query, [id]);
      res.json(rows);
    } catch (error) {
        console.error('Erro ao listar histórico de pedidos:', error);
        res.status(500).json({ message: 'Erro ao listar histórico de pedidos.' });
    }
  }

}

module.exports = new EmployeeController();
