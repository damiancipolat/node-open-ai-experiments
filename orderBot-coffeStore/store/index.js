const { helados, sabores } = require('./data');

// Data.
const orders = {};
const orderHistory = [];

// Get menu list
const getMenuAll = () => {
  const saboresTxt = sabores.join(',');
  const heladosTxt = helados
    .map(
      (e) =>
        `nombre: ${e.nombre} - precio: ${e.precio} - cantidad de sabores: ${e.sabores} `
    )
    .join('\n');

  return `Sabores:\n ${saboresTxt} \n\n Cantidad:\n ${heladosTxt}\n`;
};

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
  addOrder,
};
