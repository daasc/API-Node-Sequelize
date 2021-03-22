"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      this.hasOne(models.User, { foreignKey: "account_id", as: "accounts" });
    }
  }
  Account.init(
    {
      id: {
        type: DataTypes.UUIDV4,
        autoIncrement: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV1,
      },
      name: DataTypes.STRING,
      planLevel: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return Account;
};
