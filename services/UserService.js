const { User } = require('../models');

class UserService {
  static async getUserProfile(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  static async updateUserProfile(userId, userData) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = await user.update(userData);
    const { password, ...userWithoutPassword } = updatedUser.toJSON();
    return userWithoutPassword;
  }
}

module.exports = UserService;
