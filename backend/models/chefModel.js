// models/chefModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const User = require('./userModel');

const Chef = sequelize.define(
  'Chef',
  {
    chef_id: {
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
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false,
    },
    profile_image: {
      type: DataTypes.STRING,
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
  },
  {
    timestamps: false,
  }
);

User.hasOne(Chef, { foreignKey: 'chef_id' });
Chef.belongsTo(User, { foreignKey: 'chef_id' });

module.exports = Chef;
