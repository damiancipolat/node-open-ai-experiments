const store = require('./store');

// Prompt functions
const getTimeOfDay = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let timeOfDay = 'AM';
  if (hours > 12) {
    hours = hours - 12;
    timeOfDay = 'PM';
  }
  return hours + ':' + minutes + ':' + seconds + ' ' + timeOfDay;
};

const getCoffeList = () => {
  return store.getMenuAll();
};

const getCoffe = (id) => {
  return store.getMenuItem(id);
};

const getMenu = () => {
  return store.getMenuAll();
};

const calculator = ({ a, b }) => {
  return (parseInt(a) + parseInt(b)).toString();
};

const prepareOrder = (args) => {
  //store.addOrder(email, item, ammount);
  console.log('ORDER', args);
  return 'listo tu orden esta en camino';
};

module.exports = {
  getTimeOfDay,
  getCoffe,
  getCoffeList,
  calculator,
  getMenu,
  prepareOrder,
};
