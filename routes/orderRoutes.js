const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', orderController.listOrders);
router.get('/history/', orderController.listOrdersHistory);
router.get('/delivery/', orderController.listOrdersDeliveries);
router.get('/delivery2/', orderController.listOrdersDeliveries2);
router.get('/check-control/', orderController.checkControl);


router.get('/:id', orderController.getOrder);
router.put('/status/:id/', orderController.updateOrderStatus);

module.exports = router;
