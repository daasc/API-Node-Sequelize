const model = require("../models");
class Account {
  async store(DAO) {
    try {
      const account = await model.sequelize.models.Account.create({
        name: DAO.name,
        planLevel: DAO.planLevel,
      });
      return account;
    } catch (error) {
      throw new Error(error);
    }
  }

  async show() {
    try {
      const accounts = await model.sequelize.models.Account.findAll();
      return accounts;
    } catch (error) {
        throw new Error(error);
    }
  }
}

module.exports = Account;
