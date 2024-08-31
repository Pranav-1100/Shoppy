const { sequelize } = require('../config/db');
const UserModel = require('./User');
const ProductModel = require('./Product');
const CategoryModel = require('./Category');
const OrderModel = require('./Order');
const OrderItemModel = require('./OrderItem');
const ReviewModel = require('./Review');
const CartModel = require('./Cart');
const CartItemModel = require('./CartItem');
const WishlistModel = require('./Wishlist');

const User = UserModel(sequelize);
const Product = ProductModel(sequelize);
const Category = CategoryModel(sequelize);
const Order = OrderModel(sequelize);
const OrderItem = OrderItemModel(sequelize);
const Review = ReviewModel(sequelize);
const Cart = CartModel(sequelize);
const CartItem = CartItemModel(sequelize);
const Wishlist = WishlistModel(sequelize);

// Define associations
User.hasMany(Order);
User.hasMany(Review);
User.hasOne(Cart);

Product.belongsTo(Category);
Product.hasMany(Review);
Product.belongsToMany(Order, { through: OrderItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });

Category.hasMany(Product);

Review.belongsTo(User);
Review.belongsTo(Product);

Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });

User.hasOne(Wishlist);
Wishlist.belongsTo(User);
Wishlist.belongsToMany(Product, { through: 'WishlistItem' });
Product.belongsToMany(Wishlist, { through: 'WishlistItem' });

module.exports = {
  User,
  Product,
  Category,
  Order,
  OrderItem,
  Review,
  Cart,
  CartItem
};