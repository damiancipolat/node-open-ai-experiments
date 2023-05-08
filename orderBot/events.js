const isOrderFinish = (response) => response.includes('@END@');

const parseOrderFromChat = (orderText) => {
  const order = JSON.parse(orderText);
  return order;
};

module.exports = {
  isOrderFinish,
  parseOrderFromChat,
};
