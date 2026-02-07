'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate(models) {
      RefreshToken.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      })
    }
  }
  RefreshToken.init({
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
    sequelize,
    modelName: 'RefreshToken',
    tableName: 'refresh_tokens',
    timestamps: true
  });
  return RefreshToken;
};