const { menu } = require('./data');

// Data.
const orders = {};
const orderHistory = [];

// Get menu item.
const getMenuItem = (id) => menu.filter((e) => e.id === id);

// Get menu list
const getMenuAll = () =>
  menu
    .map((e) => `id: ${e.id} - nombre: ${e.nombre} - precio: ${e.precio}`)
    .join('\n');

// Add order
const addOrder = (email, item, ammount) => {
  const newOrder = {
    email,
    item,
    ammount,
  };
  orders[email] = newOrder;
  orderHistory.push(newOrder);
};

module.exports = {
  getMenuAll,
  getMenuItem,
  addOrder,
};
