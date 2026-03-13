const express = require('express');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

// router.get('/', employeeController.listOrders);
// router.get('/history/', employeeController.listOrdersHistory);
// router.get('/delivery/', employeeController.listOrdersDeliveries);
// router.get('/delivery2/', employeeController.listOrdersDeliveries2);

router.get('/:id', employeeController.get);
// router.put('/status/:id/', employeeController.updateOrderStatus);

module.exports = router;
