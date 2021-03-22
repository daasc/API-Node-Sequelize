const model = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class User {
  async store(DAO) {
    try {
      const user = await model.sequelize.models.User.create({
        firstName: DAO.firstName,
        lastName: DAO.lastName,
        email: DAO.email,
        password: DAO.password,
        account_id: DAO.account_id,
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async show() {
    try {
      const users = await model.sequelize.models.User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email', 'account_id'],
        include: {
          attributes: ['id', 'name'],
          association: "accounts",
        },
      });
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
  async authenticate(DAO) {
    try {
      const user = await model.sequelize.models.User.findOne({
        where: { email: DAO.email },
      });
      if (!user || !bcrypt.compareSync(DAO.password, user.password)) {
        throw new Error("Username ou senha estão incorretas!");
      }
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          account_id: user.account_id,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        }
      );

      return {
        token,
        data: {
          email: user.email,
          account_id: user.account_id,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = User;
