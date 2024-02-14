const menu = require('./data');

// Data.
const orders = {};
const orderHistory = [];

// Get menu item.
const getMenuItem = (id) => menu.filter((e) => e.id);

// Get menu list
const getMenuAll = () =>
  menu
    .map((e) => `id:${e.id} - nombre:${e.nombre} - precio:${e.precio}`)
    .join('\n');

// Add order
const addOrder = (email, item) => {
  const newOrder = {
    email,
    item,
  };
  orders[email] = newOrder;
  orderHistory.push(newOrder);
};

module.exports = {
  getMenuAll,
  getMenuItem,
  addOrder,
};
