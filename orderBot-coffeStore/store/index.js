const { helados, sabores } = require('./data');

// Data.
const orders = {};
const orderHistory = [];

// Get menu item.
const getMenuItem = ({ id }) => {
  const item = helados.filter((e) => e.id == id);

  if (!(item && Array.isArray(item) && item.length > 0)) {
    return 'No se encontro';
  }

  const elem = item[0];
  return `id: ${elem.id} \n nombre: ${elem.nombre} \n precio: ${elem.precio} \n`;
};

// Get menu list
const getMenuAll = () => {
  const saboresTxt = sabores.join(',');
  const heladosTxt = helados
    .map(
      (e) =>
        `id: ${e.id} - nombre: ${e.nombre} - precio: ${e.precio} - cantidad de sabores: ${e.sabores} `
    )
    .join('\n');

  return `Sabores:\n ${saboresTxt} Cantidad:\n ${heladosTxt}`;
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
  getMenuItem,
  addOrder,
};
