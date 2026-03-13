const express = require('express');
const authRoutes = require('./authRoutes');
const orderRoutes = require('./orderRoutes');
const employeeRoutes = require('./employeeRoutes');
const familyGroupRoutes = require('./familyGroupRoutes');
const movementRoutes = require('./movementRoutes');
const userRoutes = require('./userRoutes');
const authMiddleware = require('../middleware/authMiddleware');

const routes = express.Router();

routes.use('/api/v2/auth', authRoutes);
routes.use('/api/v2/employee', authMiddleware, employeeRoutes);
routes.use('/api/v2/family-group', authMiddleware, familyGroupRoutes);
routes.use('/api/v2/movement', authMiddleware, movementRoutes);
routes.use('/api/v2/order', authMiddleware, orderRoutes);
routes.use('/api/v2/user', authMiddleware, userRoutes);

module.exports = routes;
