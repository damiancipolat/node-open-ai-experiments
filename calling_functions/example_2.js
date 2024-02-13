require('dotenv').config();
const readline = require('readline');
const { Configuration, OpenAIApi } = require('openai');
const { parse } = require('path');

// Bootstrap
const configuration = new Configuration({
  organization: 'brigthbyte',
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const openai = new OpenAIApi(configuration);

// Event methods.
const onLine = async (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    rl.close();
  } else {
    await chat(input);
    rl.prompt();
  }
};

const onClose = () => {
  console.log('bye bye');
};

// Prompt functions
function helloWorld(appendString) {
  let hello = 'Hello World! ' + appendString;
  return hello;
}

function getTimeOfDay() {
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
}

function calculator(a, b) {
  return (parseInt(a) + parseInt(b)).toString();
}
const messages = [
  {
    role: 'system',
    content: 'Perform function requests for the user',
  },
];

const functions = [
  {
    name: 'calculator',
    description: 'makes the sum of two numbers',
    parameters: {
      type: 'object',
      properties: {
        a: {
          type: 'string',
          description: 'the first number',
        },
        b: {
          type: 'string',
          description: 'the second number',
        },
      },
      require: ['a', 'b'],
    },
  },
  {
    name: 'helloWorld',
    description: 'Prints hello world with the string passed to it',
    parameters: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'The string to append to the hello world message',
        },
      },
      require: ['text'],
    },
  },
  {
    name: 'getTimeOfDay',
    description: 'Get the time of day.',
    parameters: {
      type: 'object',
      properties: {},
      require: [],
    },
  },
];

const chat = async (text) => {
  try {
    messages.push({
      role: 'user',
      content: text,
    });
    console.log('xxx', messages);
    const chat = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      messages,
      functions,
      function_call: 'auto',
    });

    let response = '';

    if (chat.data.choices[0].finish_reason == 'function_call') {
      const {
        function_call: { name, arguments },
      } = chat.data.choices[0].message;

      const args = JSON.parse(arguments);
      let result = '';
      console.log('aaa', name, args);
      if (name === 'helloWorld') {
        result = helloWorld(args['text']);
      }
      if (name === 'getTimeOfDay') {
        result = getTimeOfDay();
      }
      if (name === 'calculator') {
        result = calculator(args['a'], args['b']);
      }
      response = result;
      messages.push({
        role: 'assistant',
        content: result,
      });
    } else {
      response = chat.data.choices[0].message.content;
      messages.push({
        role: 'assistant',
        content: chat.data.choices[0].message.content,
      });
    }

    console.log('AI>' + response);
  } catch (error) {
    messages.pop();
    console.error(
      'Problema devolviendo la respuesta',
      error?.message || error.text
    );
  }
};

console.log('Escribe un mensaje (o "exit" para salir): ');

rl.on('line', onLine);
rl.on('close', onClose);
rl.setPrompt('>');
rl.prompt();
