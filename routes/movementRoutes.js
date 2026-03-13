const express = require('express');
const movementController = require('../controllers/movementController');

const router = express.Router();

// router.get('/', movementController.listOrders);
router.get('/day/', movementController.listDayMovements);

module.exports = router;
