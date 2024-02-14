const messages = [
  {
    role: 'system',
    content: 'Perform function requests for the user',
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
];

module.exports = {
  functions,
  messages,
};
