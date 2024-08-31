const express = require('express');
const ReviewService = require('../services/ReviewService');
const authMiddleware = require('../middleware/auth');
const { reviewValidationRules } = require('../validators/reviewValidator');
const validate = require('../middleware/validate');

const router = express.Router();

router.post('/', authMiddleware, reviewValidationRules(), validate, async (req, res, next) => {
  try {
    const review = await ReviewService.createReview(req.user.id, req.body);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

router.get('/product/:productId', async (req, res, next) => {
  try {
    const reviews = await ReviewService.getProductReviews(req.params.productId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

module.exports = router;