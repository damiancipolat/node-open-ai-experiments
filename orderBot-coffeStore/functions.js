const store = require('./store');

// Prompt functions
const helloWorld = (appendString) => {
  let hello = 'Hello World! ' + appendString;
  return hello;
};

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

const getMenuItem = (id) => {
  return store.getMenuItem(id);
};

const calculator = ({ a, b }) => {
  return (parseInt(a) + parseInt(b)).toString();
};

const prepareOrder = ({ email, item, ammount }) => {
  store.addOrder(email, item, ammount);
};

module.exports = {
  getTimeOfDay,
  getCoffe,
  getCoffeList,
  calculator,
  helloWorld,
  getMenu,
  getMenuItem,
  prepareOrder,
};
