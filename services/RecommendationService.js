const { User, Product, Order, OrderItem, Review, Recommendation } = require('../models');
const { Op } = require('sequelize');

class RecommendationService {
  static async getRecommendations(userId, limit = 10) {
    let recommendations = await Recommendation.findAll({
      where: {
        userId,
        expiresAt: { [Op.gt]: new Date() }
      },
      include: [{ model: Product }],
      order: [['score', 'DESC']],
      limit
    });

    if (recommendations.length < limit) {
      await this.generateRecommendations(userId);
      recommendations = await Recommendation.findAll({
        where: { userId },
        include: [{ model: Product }],
        order: [['score', 'DESC']],
        limit
      });
    }

    return recommendations.map(rec => rec.Product);
  }

  static async generateRecommendations(userId) {
    const user = await User.findByPk(userId, {
      include: [
        { model: Order, include: [{ model: Product }] },
        { model: Review, include: [{ model: Product }] }
      ]
    });

    const userCategories = new Set();
    const userProducts = new Set();

    // Collect user's interaction data
    user.Orders.forEach(order => {
      order.Products.forEach(product => {
        userCategories.add(product.categoryId);
        userProducts.add(product.id);
      });
    });

    user.Reviews.forEach(review => {
      userCategories.add(review.Product.categoryId);
      userProducts.add(review.Product.id);
    });

    // Find similar products
    const similarProducts = await Product.findAll({
      where: {
        categoryId: { [Op.in]: Array.from(userCategories) },
        id: { [Op.notIn]: Array.from(userProducts) }
      },
      include: [{ model: Review }]
    });

    // Calculate recommendation scores
    const recommendations = similarProducts.map(product => {
      let score = 0;
      if (userCategories.has(product.categoryId)) score += 0.5;
      score += Math.min(product.Reviews.length / 10, 0.5); // Max 0.5 points for reviews

      return {
        userId,
        productId: product.id,
        score,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
      };
    });

    // Save recommendations
    await Recommendation.bulkCreate(recommendations);
  }
}

module.exports = RecommendationService;