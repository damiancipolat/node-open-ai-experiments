const express = require('express');
const router = express.Router();
const wsp = require('./whatsapp');
const { start, ask } = require('./ia/iaService');

// Set twilio account.
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;

start();

router.post('/message/hook', async (req, res) => {
  const received = req.body.Body;
  const response = await ask(received);
  console.log('hook>', received);
  wsp.sendMessage(response, res);
});

module.exports = router;
