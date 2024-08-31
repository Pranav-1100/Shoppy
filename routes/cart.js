const express = require('express');
const CartService = require('../services/CartService');
const authMiddleware = require('../middleware/auth');
const { cartValidationRules } = require('../validators/cartValidator');
const validate = require('../middleware/validate');

const router = express.Router();

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const cart = await CartService.getCart(req.user.id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.post('/add', authMiddleware, cartValidationRules(), validate, async (req, res, next) => {
  try {
    const cart = await CartService.addToCart(req.user.id, req.body);
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
});

router.put('/update', authMiddleware, cartValidationRules(), validate, async (req, res, next) => {
  try {
    const cart = await CartService.updateCartItem(req.user.id, req.body);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.delete('/remove/:productId', authMiddleware, async (req, res, next) => {
  try {
    await CartService.removeFromCart(req.user.id, req.params.productId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;