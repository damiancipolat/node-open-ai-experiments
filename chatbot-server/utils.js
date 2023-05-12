const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'HOLA DESDE node',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:+5491166587382',
  })
  .then((message) => console.log(message.sid));
