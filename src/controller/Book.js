const model = require("../models");
class Book {
  async store(DAO, url) {
    try {
      const book = await model.sequelize.models.Book.create({
        name: DAO.name,
        author: DAO.author,
        year: DAO.year,
        genre: DAO.genre,
        synopsis: DAO.synopsis,
        url_image: url
      });
      return book;
    } catch (error) {
      throw new Error(error);
    }
  }

  async show() {
    try {
      const books = await model.sequelize.models.Book.findAll();
      return books;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Book;
