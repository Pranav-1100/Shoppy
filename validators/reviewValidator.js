const { body } = require('express-validator');

const reviewValidationRules = () => {
  return [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').optional().isString().withMessage('Comment must be a string')
  ];
};

module.exports = { reviewValidationRules };