require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: 'brigthbyte',
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Functions
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

// Define your ChatGPT Function
async function callChatGPTWithFunctions(appendString) {
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

  // Step 1: Call ChatGPT with the function name
  let chat = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo-0613',
    messages,
    functions,
    function_call: 'auto',
  });

  let result;
  // Check is function calling
  if (chat.data.choices[0].finish_reason == 'function_call') {
    const {
      function_call: { name, arguments },
    } = chat.data.choices[0].message;

    const args = JSON.parse(arguments);
    if (name === 'helloWorld') {
      result = helloWorld(args['text']);
    }
    if (name === 'getTimeOfDay') {
      result = getTimeOfDay();
    }
  } else {
  }
  console.log('result', result);
}

callChatGPTWithFunctions();
