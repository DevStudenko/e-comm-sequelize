'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, { foreignKey: 'user_id' });
      Cart.belongsToMany(models.Product, {
        through: models.CartItem,
        foreignKey: 'cart_id',
        otherKey: 'product_id'
      });
    }
  }
  Cart.init({
    user_id: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};