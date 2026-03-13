const express = require('express');
const authController = require('../controllers/authController');

const authRoutes = express.Router();

// authRoutes.post('/login', authController.login);
authRoutes.post('/login', async (request, response) =>
  authController.login(request, response)
);


authRoutes.get('/test', async (request, response) =>
  authController.test(request, response)
);


module.exports = authRoutes;

