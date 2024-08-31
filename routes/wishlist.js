const express = require('express');
const WishlistService = require('../services/WishlistService');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const wishlist = await WishlistService.getWishlist(req.user.id);
    res.json(wishlist);
  } catch (error) {
    next(error);
  }
});

router.post('/add/:productId', authMiddleware, async (req, res, next) => {
  try {
    const wishlist = await WishlistService.addToWishlist(req.user.id, req.params.productId);
    res.status(201).json(wishlist);
  } catch (error) {
    next(error);
  }
});

router.delete('/remove/:productId', authMiddleware, async (req, res, next) => {
  try {
    await WishlistService.removeFromWishlist(req.user.id, req.params.productId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
