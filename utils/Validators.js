const { body } = require('express-validator');

const productValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Product name is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('categoryId').notEmpty().withMessage('Category ID is required')
  ];
};

const categoryValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Category name is required')
  ];
};

const orderValidationRules = () => {
  return [
    body('products').isArray().withMessage('Products must be an array'),
    body('products.*.id').notEmpty().withMessage('Product ID is required'),
    body('products.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
  ];
};

module.exports = {
  productValidationRules,
  categoryValidationRules,
  orderValidationRules
};
