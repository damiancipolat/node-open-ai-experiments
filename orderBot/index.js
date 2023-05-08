const readline = require('readline');
const { completion } = require('./utils');
const prompts = require('./prompts');
const { sendReceipt } = require('./receipt');
const { isOrderFinish, parseOrderFromChat } = require('./events');
const context = [];

// Crear instancia de readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Summaryze and parse the order.
const summaryze = async () => {
  context.push(prompts.summaryize);
  context.push({ role: 'user', content: '' });
  const resumen = await completion(context);
  const order = parseOrderFromChat(resumen.content);
  await sendReceipt(order);
  console.log('Receipt sent to', order.email);
};

// Process ask and response.
const ask = async (prompt) => {
  // Save the question.
  const user = { role: 'user', content: prompt };
  context.push(user);
  //console.log('*', context);
  console.log('> GPT?...');

  // Process and save the response.
  const response = await completion(context);
  context.push(response);

  if (isOrderFinish(response.content)) {
    console.log('>', response.content.replace('@END@', ''));
    summaryze();
  } else {
    console.log('>', response.content);
  }
};

// Process user line.
const readLine = async (line) => {
  const chat = 'You';

  rl.question(`${chat} > `, async (line) => {
    if (line.toUpperCase() === 'EXIT') {
      process.exit();
    }

    await ask(line);
    readLine();
  });
};

// Read line and repeat.
const start = async () => {
  context.push(...prompts.basePrompt2);
  await ask('');
  readLine();
};

start();
