const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN,
});

const orderToHtml = (order) => {
  let tableHtml = '<h2>Your order detail!</h2><table>';
  tableHtml +=
    '<thead><tr><th>Product Name</th><th>Size</th><th>Price</th></tr></thead>';
  tableHtml += '<tbody>';

  order.products.forEach((product) => {
    tableHtml += `<tr><td>${product.name}</td><td>${product.size}</td><td>${product.price}</td></tr>`;
  });

  tableHtml += '</tbody>';
  tableHtml += '</table>';

  return tableHtml;
};

const sendReceipt = async (orderData) => {
  const origin = process.env.ORIGIN;
  const from = 'Mailgun Sandbox <postmaster@' + origin + '>';
  const subject = 'Your order detail!';
  const html = orderToHtml(orderData);

  return await mg.messages.create(origin, {
    from,
    to: [orderData.email],
    subject,
    html,
  });
};

module.exports = {
  sendReceipt,
};
