const messages = [
  {
    role: 'system',
    content: 'Perform function requests for the user',
  },
];

const functions = [
  {
    name: 'prepareOrder',
    description: 'prepara mi pedido con el formato que especifica la orden.',
    parameters: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'id del elemento',
        },
        ammount: {
          type: 'string',
          description: 'cantidad de elementos',
        },
        email: {
          type: 'string',
          description: 'email a enviar el recibo',
        },
      },
      require: ['id', 'quantity'],
    },
  },
  {
    name: 'getMenuItem',
    description: 'devuelve el valor e info de un item del menu',
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
    name: 'getMenu',
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
