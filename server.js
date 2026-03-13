const express = require('express');
const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const userRoutes = require('./routes/userRoutes');
const routes = require('./routes/indexRoutes');

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: '*',
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// app.use('/api/v2/auth', authRoutes);
// app.use('/api/v2/orders', orderRoutes);
// app.use('/api/v2/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
