const { User } = require('../models');

class AuthService {
  static async register({ username, email, password }) {
    const user = await User.create({ username, email, password });
    const token = user.generateAuthToken();
    return { user: { id: user.id, username: user.username, email: user.email }, token };
  }

  static async login({ email, password }) {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }
    const token = user.generateAuthToken();
    return { user: { id: user.id, username: user.username, email: user.email }, token };
  }
}

module.exports = AuthService;
