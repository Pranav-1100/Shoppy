require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./config/db');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger.requestLogger);

// Initialize database
initDatabase()
  .then(() => console.log('Database initialized successfully'))
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });

// Routes
app.use('/api/auth', routes.authRoutes);
app.use('/api/users', routes.userRoutes);
app.use('/api/products', routes.productRoutes);
app.use('/api/categories', routes.categoryRoutes);
app.use('/api/orders', routes.orderRoutes);
app.use('/api/reviews', routes.reviewRoutes);
app.use('/api/cart', routes.cartRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
