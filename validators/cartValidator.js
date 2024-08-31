const { body } = require('express-validator');

const cartValidationRules = () => {
  return [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
  ];
};

module.exports = { cartValidationRules };