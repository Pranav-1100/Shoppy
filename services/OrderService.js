const { Order, OrderItem, Product } = require('../models');

class OrderService {
  static async getUserOrders(userId) {
    return Order.findAll({ 
      where: { UserId: userId },
      include: [{ model: Product, through: OrderItem }]
    });
  }

  static async getOrderById(id, userId) {
    return Order.findOne({ 
      where: { id, UserId: userId },
      include: [{ model: Product, through: OrderItem }]
    });
  }

  static async createOrder(userId, orderData) {
    const { products, ...orderDetails } = orderData;
    const order = await Order.create({ ...orderDetails, UserId: userId });

    for (let product of products) {
      await OrderItem.create({
        OrderId: order.id,
        ProductId: product.id,
        quantity: product.quantity,
        price: product.price
      });
    }

    return this.getOrderById(order.id, userId);
  }

  static async updateOrderStatus(id, status) {
    const order = await Order.findByPk(id);
    if (order) {
      return order.update({ status });
    }
    return null;
  }
}

module.exports = OrderService;
