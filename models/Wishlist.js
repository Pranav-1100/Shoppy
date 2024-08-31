const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Wishlist = sequelize.define('Wishlist', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }
  });

  return Wishlist;
};