const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json());
app.use(logger.requestLogger);

// API documentation
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', routes.authRoutes);
app.use('/api/users', routes.userRoutes);
app.use('/api/products', routes.productRoutes);
app.use('/api/categories', routes.categoryRoutes);
app.use('/api/orders', routes.orderRoutes);
app.use('/api/reviews', routes.reviewRoutes);
app.use('/api/cart', routes.cartRoutes);
app.use('/api/wishlist', routes.wishlistRoutes);
app.use('/api/search', routes.searchRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
