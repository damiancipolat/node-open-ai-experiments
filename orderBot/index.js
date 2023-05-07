const readline = require('readline');
const { completion } = require('./utils');
const prompts = require('./prompts');
const context = [];

// Crear instancia de readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Process ask and response.
const ask = async (prompt) => {
  // Save the question.
  const user = { role: 'user', content: prompt };
  context.push(user);
  // console.log('*', context);
  console.log('> Waiting response...');

  // Process and save the response.
  const response = await completion(context);
  context.push(response);

  console.log('>', response.content);
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
  context.push(...prompts.basePrompt);
  await ask('');
  readLine();
};

start();
