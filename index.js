// File: index.js (create this in your project root)
require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./config/db');
const { logger } = require('./utils/logger');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    logger.info('Database connection has been established successfully.');
    
    await sequelize.sync();
    logger.info('Database synced successfully');

    app.listen(PORT, () => {
      logger.info(`Server running at http://localhost:${PORT}`);
      logger.info(`API documentation available at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error('Unable to start the server:', error);
    process.exit(1);
  }
}

startServer();
