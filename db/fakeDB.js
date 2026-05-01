// db/fakeDB.js

const orders = [
  { userId: "123", item: "Laptop" },
  { userId: "123", item: "Phone" }
];

function getOrders(userId) {
  return orders.filter(o => o.userId === userId);
}

module.exports = { getOrders };