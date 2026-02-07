'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsTo(models.User,{
        foreignKey: 'userId',
        as: 'user'
      })
    }
  }
  Customer.init({
      cus_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cus_address: DataTypes.STRING,
      cus_contactnumber: {
        type: DataTypes.STRING,
        unique: true
      },
      image_url: DataTypes.STRING,
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
      }
    }, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers',
    timestamps: true
  });
  return Customer;
};