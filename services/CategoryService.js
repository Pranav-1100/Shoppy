const { Category } = require('../models');

class CategoryService {
  static async getAllCategories() {
    return Category.findAll();
  }

  static async getCategoryById(id) {
    return Category.findByPk(id);
  }

  static async createCategory(categoryData) {
    return Category.create(categoryData);
  }

  static async updateCategory(id, categoryData) {
    const category = await Category.findByPk(id);
    if (category) {
      return category.update(categoryData);
    }
    return null;
  }

  static async deleteCategory(id) {
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      return true;
    }
    return false;
  }
}

module.exports = CategoryService;
