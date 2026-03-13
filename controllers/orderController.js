const db = require('../config/db');

class OrderController {

  

  async listOrdersHistory(req, res) {
    const { date } = req.body;
    try {
      const query = `
          SELECT GROUP_CONCAT(int_pedido_id_pk, "=", int_pedido_separa_historicopedido_id_fk 
          ORDER BY int_pedido_id_pk) AS controleDia
          FROM tab_pedidos 
          WHERE int_pedido_tipo_id_fk IN (2, 3) 
            AND DATE(dt_pedido_saida) = DATE(?)
      `;

      console.log(query);
      console.log(date);

      const [rows] = await db.query(query, [date]);
      res.json(rows);
    } catch (error) {
        console.error('Erro ao listar histórico de pedidos:', error);
        res.status(500).json({ message: 'Erro ao listar histórico de pedidos.' });
    }
  }

  async checkControl(req, res) {
    const { date } = req.body;
    try {
      const query = `
          SELECT GROUP_CONCAT(int_pedido_id_pk, "=", 
            (
              SELECT MAX(int_historico_id_pk) 
              FROM tab_historicopedido 
              WHERE 
                int_historico_pedido_id_fk = int_pedido_id_pk) 
              ORDER BY 
                int_pedido_id_pk
            ) as controleDia
          FROM tab_pedidos 
					WHERE 
            int_pedido_tipo_id_fk IN (2,3) 
            AND DATE(dt_pedido_saida) = DATE(?)
          `;

      console.log(query);
      console.log(date);
      const [rows] = await db.query(query, [date]);
      res.json(rows);
    } catch (error) {
        console.error('Erro ao listar os controles do dia:', error);
        res.status(500).json({ message: 'Erro ao listar os controles do dia.' });
    }
  }

  async listOrdersDeliveries(req, res) {
    const { date } = req.body;
    try {
      const query = `
        SELECT 
          int_pedido_id_pk AS pedido_id, 
          int_pedido_versao AS pedido_versao, 
          int_hora_entrega_tipo, 
          COUNT(*) AS QTDE,
          tm_hora_entrega,
          ROUND(SUM(int_pedido_separa_status)/COUNT(*),2) AS completo_hora,
          ROUND(SUM(int_pedido_separa_status)/COUNT(*)) AS completo_hora2,
          tm_hora_entrega_ate, 
          dt_pedido_saida AS DATAHORA, 
          DATE(dt_pedido_saida) AS DATA, 
          DATE_FORMAT(tm_hora_entrega, '%H:%i') AS HORA, 
          DATE_FORMAT(tm_hora_entrega, '%H') AS HORA_HORA, 
          dt_pedido_saida AS dt_hora
        FROM tab_pedidos
        WHERE 
          int_pedido_tipo_id_fk IN (2,3) 
          AND int_hora_entrega_tipo <= 3
          AND (SELECT COUNT(*) FROM tab_itempedido WHERE int_item_pedido_id_fk = int_pedido_id_pk) > 0
          AND DATE(dt_pedido_saida) = DATE(?) 
        GROUP BY DATA, hora 
        ORDER BY DATE(dt_pedido_saida), tm_hora_entrega;
      `;

      const [rows] = await db.query(query, [date]);
      res.json(rows);
    } catch (error) {
        console.error('Erro ao listar entregas de pedidos:', error);
        res.status(500).json({ message: 'Erro ao listar entregas de pedidos.' });
    }
  }


 async listOrdersDeliveries2(req, res) {
    const { date } = req.body;
    try {
      const query = `
          SELECT 
            int_pedido_id_pk AS pedido_id, 
            int_pedido_versao AS pedido_versao, 
            int_hora_entrega_tipo, 
            COUNT(*) AS QTDE,
            tm_hora_entrega, 
            ROUND(SUM(int_pedido_separa_status)/COUNT(*),2) AS completo_hora,
            ROUND(SUM(int_pedido_separa_status)/COUNT(*)) AS completo_hora2,
            tm_hora_entrega_ate, 
            dt_pedido_saida AS DATAHORA, 
            DATE(dt_pedido_saida) AS DATA, 
            DATE_FORMAT(tm_hora_entrega, '%H:%i') AS HORA, 
            DATE_FORMAT(tm_hora_entrega, '%H') AS HORA_HORA, 
            dt_pedido_saida AS dt_hora
          FROM tab_pedidos 
          WHERE 
            int_pedido_tipo_id_fk IN (2,3) 
            AND int_hora_entrega_tipo > 3
            AND (SELECT COUNT(*) FROM tab_itempedido WHERE int_item_pedido_id_fk = int_pedido_id_pk) > 0
            AND DATE(dt_pedido_saida) = DATE(?) 
          GROUP BY int_hora_entrega_tipo 
          ORDER BY int_hora_entrega_tipo;
      `;

      const [rows] = await db.query(query, [date]);
      res.json(rows);
    } catch (error) {
        console.error('Erro ao listar entregas 2 de pedidos:', error);
        res.status(500).json({ message: 'Erro ao listar entregas 2 de pedidos.' });
    }
  }


 



  async listOrders(req, res) {
    console.log('inside listOrders');
    try {
      const [orders] = await db.query('SELECT * FROM orders');
      res.json(orders);
    } catch (error) {
      console.error('Erro ao listar os pedidos:', error);
      res.status(500).json({ message: 'Erro ao listar os pedidos.' });
    }
  }

  async getOrder(req, res) {
    const { id } = req.params;
    const [order] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);

    if (order.length > 0) {
      res.json(order[0]);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  }

  async updateOrderStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    await db.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Order status updated' });
  }
}

module.exports = new OrderController();
