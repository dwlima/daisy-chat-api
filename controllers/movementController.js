const db = require('../config/db');

class MovementController {

  async listDayMovements(req, res) {
    const { date, delivery_type } = req.body;

    console.log('inside MovementController::listDayMovements');
    console.log("date: " + date);
    console.log("delivery_type: " + delivery_type);

    try {

      let cond;
      if (delivery_type > 0) {
        cond = `int_hora_entrega_tipo = ${delivery_type}`;
      } else {
        cond = `tm_hora_entrega = '${date}'`;
      }
      
      const query = `
        SELECT CONCAT(int_pedido_id_pk,'|', f.str_funcionario_nome,'|', int_pedido_tipo_id_fk, '|', int_hora_entrega_tipo, '|', int_pedido_separa_status, '|', int_pedido_versao,'|',
        (
          SELECT GROUP_CONCAT(DISTINCT(int_grupo_familia_id_pk)) 
          FROM tab_itempedido 
          INNER JOIN tab_produto ON int_produto_id_pk = int_item_produto_id_fk
          INNER JOIN tab_familia ON int_familia_id_pk = int_produto_familia_id_fk
          INNER JOIN tab_grupo_familia ON int_grupo_familia_id_pk = int_familia_grupo_id_fk
          WHERE int_item_pedido_id_fk = int_pedido_id_pk)
        ) as pedidos_grupo
        FROM tab_pedidos 
        INNER JOIN tab_funcionario AS f ON int_pedido_funcionario_id_fk = int_funcionario_id_pk
        WHERE 
          int_pedido_tipo_id_fk IN (2,3) AND 
          DATE(dt_pedido_saida) = '${date}' AND
          ${cond}
        ORDER BY int_pedido_tipo_id_fk DESC, int_hora_entrega_tipo, tm_hora_entrega, tm_hora_entrega_ate;
      `;
      console.log(query);
      const [rows] = await db.query(query);
      res.json(rows);
    } catch (error) {
        console.error('Erro ao listar histórico de pedidos:', error);
        res.status(500).json({ message: 'Erro ao listar histórico de pedidos.' });
    }
  }

}

module.exports = new MovementController();
