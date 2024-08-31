const { Review, User, Product } = require('../models');
const AppError = require('../utils/errorHandler');

class ReviewService {
  static async createReview(userId, reviewData) {
    const { productId, rating, comment } = reviewData;
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return Review.create({ UserId: userId, ProductId: productId, rating, comment });
  }

  static async getProductReviews(productId) {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return Review.findAll({
      where: { ProductId: productId },
      include: [{ model: User, attributes: ['id', 'username'] }]
    });
  }
}

module.exports = ReviewService;