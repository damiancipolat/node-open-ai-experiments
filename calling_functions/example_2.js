require('dotenv').config();
const readline = require('readline');
const { Configuration, OpenAIApi } = require('openai');

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

function getCoffeList() {
  const cafes = [
    { id: 1, nombre: 'Café Americano', precio: 2.5 },
    { id: 2, nombre: 'Café Latte', precio: 3.0 },
    { id: 3, nombre: 'Café Espresso', precio: 2.0 },
    { id: 4, nombre: 'Café Cappuccino', precio: 3.5 },
    { id: 5, nombre: 'Café Mocha', precio: 4.0 },
    { id: 6, nombre: 'Café Macchiato', precio: 3.2 },
    { id: 7, nombre: 'Café Doble', precio: 3.8 },
    { id: 8, nombre: 'Café Frappé', precio: 4.5 },
    { id: 9, nombre: 'Café Viennese', precio: 3.7 },
    { id: 10, nombre: 'Café Irish', precio: 4.2 },
  ];
  return cafes.map((e) => 'id:' + e.id + ' nombre:' + e.nombre).join(',');
}

function getCoffe(id) {
  return id.toString();
}

function calculator(a, b) {
  return (parseInt(a) + parseInt(b)).toString();
}

function remember(text) {
  console.log('xxxx', text);
}

async function asAudio(text) {
  console.log('*', text);
  return text;
}

const messages = [
  {
    role: 'system',
    content: 'Perform function requests for the user',
  },
  {
    role: 'user',
    content: "Hello, i'm a user, i want to know the current time",
  },
];

const functions = [
  {
    name: 'getCoffe',
    description: 'devuelve info de un cafe en especifico.',
    parameters: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'coffe id',
        },
      },
      require: ['id'],
    },
  },
  {
    name: 'getCoffeList',
    description: 'retorna info acerca de los cafes y el listado del menu',
    parameters: {
      type: 'object',
      properties: {},
      require: [],
    },
  },
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
  {
    name: 'remember',
    description: 'Remember something important or relevant',
    parameters: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'The text you want to save to remeber',
        },
      },
      require: ['text'],
    },
  },
  {
    name: 'asAudio',
    description: 'Answer the question as audio',
    parameters: {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          description: 'The content of the response',
        },
      },
      require: ['text'],
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
      if (name === 'getCoffeList') {
        result = getCoffeList();
      }
      if (name === 'getCoffe') {
        result = getCoffe(args['id']);
      }
      if (name === 'remember') {
        result = remember(args['text']);
      }
      if (name === 'asAudio') {
        result = await asAudio(args['text']);
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
