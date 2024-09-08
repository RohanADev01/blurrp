// models/customerModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./userModel');

const Customer = sequelize.define(
  'Customer',
  {
    customer_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

User.hasOne(Customer, { foreignKey: 'customer_id' });
Customer.belongsTo(User, { foreignKey: 'customer_id' });

module.exports = Customer;
