const express = require('express');
const familyGroupController = require('../controllers/familyGroupController');

const routes = express.Router();

routes.get('/', async (request, response) =>
  familyGroupController.list(request, response)
);

// router.get('/', familyGroupController.list);
// router.get('/:id', familyGroupController.getOrder);
// router.put('/:id/status', familyGroupController.updateOrderStatus);

module.exports = routes;

