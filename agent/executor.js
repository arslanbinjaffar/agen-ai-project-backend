const db = require("../db/fakeDB");

const executor = {
  getUserOrders: async ({ userId }) => {
    return db.getOrders(userId);
  }
};

module.exports = executor;