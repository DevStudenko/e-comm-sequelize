'use strict';
const {
  Model
} = require('sequelize');
const crypto = require('crypto');
const util = require('util');

const scrypt = util.promisify(crypto.scrypt);

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Cart, { foreignKey: 'user_id' })
    }
    static hashPassword = async (password) => {
      const salt = crypto.randomBytes(8).toString('hex');
      const buf = await scrypt(password, salt, 64);
      return `${buf.toString('hex')}.${salt}`;
    }
    static async comparePasswords(saved, supplied) {
      //saved --> password saved in the database. 'hashed.salt'
      //supplied --> password given by the user trying to sign in
      const [hashed, salt] = saved.split('.');
      const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

      return hashed === hashedSuppliedBuf.toString('hex');
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        len: [8, 50],
        notEmpty: true
      }

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};