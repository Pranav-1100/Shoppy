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
}

module.exports = ProductService;
