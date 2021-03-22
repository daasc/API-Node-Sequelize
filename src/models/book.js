'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    static associate(models) {}
  };
  book.init({
    id: {
      type: DataTypes.UUIDV4,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV1,
    },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    year: DataTypes.STRING,
    genre: DataTypes.STRING,
    url_image: DataTypes.STRING,
    synopsis: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
  });
  return book;
};