'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Cart, {
        through: models.CartItem,
        foreignKey: 'product_id',
        otherKey: 'cart_id'
      })
    }
  }
  Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: true,
        min: 0
      }
    }

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};