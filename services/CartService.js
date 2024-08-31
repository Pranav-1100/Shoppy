const { Cart, CartItem, Product } = require('../models');
const AppError = require('../utils/errorHandler');

class CartService {
  static async getCart(userId) {
    let cart = await Cart.findOne({ where: { UserId: userId }, include: [{ model: Product, through: CartItem }] });
    if (!cart) {
      cart = await Cart.create({ UserId: userId });
    }
    return cart;
  }

  static async addToCart(userId, { productId, quantity }) {
    const cart = await this.getCart(userId);
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    const [cartItem, created] = await CartItem.findOrCreate({
      where: { CartId: cart.id, ProductId: productId },
      defaults: { quantity }
    });
    if (!created) {
      cartItem.quantity += quantity;
      await cartItem.save();
    }
    return this.getCart(userId);
  }

  static async updateCartItem(userId, { productId, quantity }) {
    const cart = await this.getCart(userId);
    const cartItem = await CartItem.findOne({
      where: { CartId: cart.id, ProductId: productId }
    });
    if (!cartItem) {
      throw new AppError('Item not found in cart', 404);
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    return this.getCart(userId);
  }

  static async removeFromCart(userId, productId) {
    const cart = await this.getCart(userId);
    const cartItem = await CartItem.findOne({
      where: { CartId: cart.id, ProductId: productId }
    });
    if (!cartItem) {
      throw new AppError('Item not found in cart', 404);
    }
    await cartItem.destroy();
  }
}

module.exports = CartService;