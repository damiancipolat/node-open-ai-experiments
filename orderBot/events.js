const isOrderFinish = (response) => response.includes('@END@');

const parseOrderFromChat = (orderText) => {
  orderText = orderText.replace(/./g, '`');
  const regex = /<code>(.*?)<\/code>/;
  const resultado = orderText.match(regex)[1];
  const order = JSON.parse(resultado);
  return order;
};

module.exports = {
  isOrderFinish,
  parseOrderFromChat,
};
