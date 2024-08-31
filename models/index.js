const { sequelize } = require('../config/db');
const UserModel = require('./User');
const ProductModel = require('./Product');
const CategoryModel = require('./Category');
const OrderModel = require('./Order');
const OrderItemModel = require('./OrderItem');

const User = UserModel(sequelize);
const Product = ProductModel(sequelize);
const Category = CategoryModel(sequelize);
const Order = OrderModel(sequelize);
const OrderItem = OrderItemModel(sequelize);

// Define associations
User.hasMany(Order);
Order.belongsTo(User);

Category.hasMany(Product);
Product.belongsTo(Category);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

module.exports = {
  User,
  Product,
  Category,
  Order,
  OrderItem
};
