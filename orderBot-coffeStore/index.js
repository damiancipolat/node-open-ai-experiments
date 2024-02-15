const readline = require('readline');
const ai = require('./ai/ai');
const prompts = require('./ai/prompts');
const fnMap = require('./functions');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages = [...prompts.messages];

// Event methods.
const onLine = async (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    rl.close();
  } else {
    await ai.chat(input, messages, prompts.functions, fnMap);
    rl.prompt();
  }
};

const onClose = () => {
  console.log('bye bye');
};

const start = async () => {
  console.log('\x1b[33m', 'AI > Heladeria GPT v 1.0 by Damian Cipolat');
  await ai.chat('', messages, prompts.functions, fnMap);
};

rl.on('line', onLine);
rl.on('close', onClose);
rl.setPrompt('');
rl.prompt();
start();
