"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.belongsTo(models.Account, { foreignKey: "account_id", as: "accounts" });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user, options) => {
          return bcrypt
            .hash(user.password, 10)
            .then((hash) => {
              user.password = hash;
            })
            .catch((err) => {
              throw new Error(err);
            });
        },
      },
    }
  );
  return User;
};
