const express = require('express');
const RecommendationService = require('../services/RecommendationService');
const authMiddleware = require('../middleware/auth');
const { asyncHandler } = require('../utils/asyncHandler');

const router = express.Router();

router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const recommendations = await RecommendationService.getRecommendations(req.user.id, limit);
  
  res.json({
    recommendations: recommendations.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.Category ? product.Category.name : null,
      rating: product.rating
    }))
  });
}));

module.exports = router;
