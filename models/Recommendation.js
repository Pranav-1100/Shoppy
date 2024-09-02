const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Recommendation = sequelize.define('Recommendation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Recommendation.associate = (models) => {
    Recommendation.belongsTo(models.User);
    Recommendation.belongsTo(models.Product);
  };

  return Recommendation;
};
