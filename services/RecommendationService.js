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
}