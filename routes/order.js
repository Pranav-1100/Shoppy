const express = require('express');
const OrderService = require('../services/OrderService');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const orders = await OrderService.getUserOrders(req.user.id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const order = await OrderService.getOrderById(req.params.id, req.user.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const order = await OrderService.createOrder(req.user.id, req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/status', authMiddleware, async (req, res, next) => {
  try {
    const order = await OrderService.updateOrderStatus(req.params.id, req.body.status);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
