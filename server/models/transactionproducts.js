"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionProducts extends Model {
    static associate(models) {
      TransactionProducts.belongsTo(models.Transaction);
      TransactionProducts.belongsTo(models.Product);
    }
  }
  TransactionProducts.init(
    {
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TransactionProducts",
    }
  );
  return TransactionProducts;
};
