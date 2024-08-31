const { Wishlist, Product } = require('../models');
const AppError = require('../utils/errorHandler');

class WishlistService {
  static async getWishlist(userId) {
    let wishlist = await Wishlist.findOne({ 
      where: { UserId: userId }, 
      include: [{ model: Product }] 
    });
    if (!wishlist) {
      wishlist = await Wishlist.create({ UserId: userId });
    }
    return wishlist;
  }

  static async addToWishlist(userId, productId) {
    const wishlist = await this.getWishlist(userId);
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    await wishlist.addProduct(product);
    return this.getWishlist(userId);
  }

  static async removeFromWishlist(userId, productId) {
    const wishlist = await this.getWishlist(userId);
    await wishlist.removeProduct(productId);
  }
}

module.exports = WishlistService;