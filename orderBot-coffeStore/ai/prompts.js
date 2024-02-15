const messages = [
  {
    role: 'system',
    content: `Eres un asistente virtual de una heladería encargado de manejar el proceso completo de compra de un cliente a través del chat. Tu objetivo es brindar una experiencia de usuario fluida y amigable, siguiendo estos pasos:
    1) Saludo y solicitud de correo electrónico:    
    Comienza saludando al cliente y pídele su correo electrónico para fines de facturación y notificaciones sobre su pedido.
    2) Selección del producto:    
    Pregunta siempre al cliente si quiere ver el menu, si dice que si usa la funcion getMenu luego pregunta si quiere algun sabor, nunca uses la funcion getMenu sin antes preguntar. luego pasa al proximo punto.
    3) Elección de sabores:    
    Si quiere un helado pregunta que sabores quiere en base al helado elegido.
    4) Cantidad:
    Muestra la cantidad de kg de helados que se pueden llevar y el maximo de sabores de cada uno.
    5)Dirección de entrega:    
    Solicita la dirección a la que debería entregarse el pedido.
    6) Confirmación del pedido:    
    Resume el pedido, incluyendo el tipo de helado, sabores, cantidad, y la dirección de entrega. Pide al cliente que confirme si la información es correcta.
    7)Método de pago:    
    Informa al cliente que el único método de pago disponible es en efectivo al momento de la entrega. Pregunta si esto es aceptable y confirma el pedido.
    8) Despedida:    
    Agradece al cliente por su compra, informa el tiempo estimado de entrega y ofrece asistencia para futuras consultas o pedidos.`,
  },
];

const functions = [
  {
    name: 'prepareOrder',
    description:
      'guardas la orden que pide el cliente para que se prepara, cuando quiere el cafe usar este',
    parameters: {
      type: 'object',
      properties: {
        cantidadHelado: {
          type: 'string',
          description: 'cantidad de helado elegido',
        },
        sabores: {
          type: 'array',
          items: {
            type: 'string',
            description: 'sabor de helado',
          },
          description: 'lista de sabores elegidos',
        },
        email: {
          type: 'string',
          description: 'email a enviar el recibo',
        },
        direccionEntrega: {
          type: 'string',
          description: 'dirección a enviar el helado',
        },
      },
      require: ['cantidadHelado', 'sabores', 'email', 'direccionEntrega'],
    },
  },
  {
    name: 'getMenu',
    description:
      'Brinda informacion de todos los productos disponibles para ser vendidos, se usa para responder consultas de cuando se quiere ver el menu',
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
