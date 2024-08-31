const { Product, Category } = require('../models');

class ProductService {
  static async getAllProducts() {
    return Product.findAll({ include: Category });
  }

  static async getProductById(id) {
    return Product.findByPk(id, { include: Category });
  }

  static async createProduct(productData) {
    return Product.create(productData);
  }

  static async updateProduct(id, productData) {
    const product = await Product.findByPk(id);
    if (product) {
      return product.update(productData);
    }
    return null;
  }

  static async deleteProduct(id) {
    const product = await Product.findByPk(id);
    if (product) {
      await product.destroy();
      return true;
    }
    return false;
  }

  static async getProductRecommendations(userId, limit = 5) {
    // This is a simple recommendation system based on the user's order history
    // In a real-world scenario, you'd want to use more sophisticated algorithms
    const userOrders = await Order.findAll({
      where: { UserId: userId },
      include: [{ model: Product }]
    });
  
    const productIds = userOrders.flatMap(order => order.Products.map(product => product.id));
    const productCounts = productIds.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});
  
    const sortedProductIds = Object.entries(productCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([id]) => id);
  
    return Product.findAll({
      where: { id: sortedProductIds },
      limit
    });
  }
}

module.exports = ProductService;
