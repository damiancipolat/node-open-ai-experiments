require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

// Bootstrap
const configuration = new Configuration({
  organization: 'brigthbyte',
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Buffer
const chat = async (text, messages, functions, fnMap) => {
  try {
    messages.push({
      role: 'user',
      content: text,
    });
    //console.log(messages);
    process.stdout.write('\x1b[31mWait..\x1b[0m');

    const chat = await openai.createChatCompletion({
      model: 'gpt-4-turbo-preview',
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

      if (fnMap[name] != null) {
        // console.log('111', args, name);
        response = fnMap[name](args);
        messages.push({
          role: 'assistant',
          content: response,
        });
      } else {
        console.error('Function not found', name);
      }
    } else {
      response = chat.data.choices[0].message.content;
      messages.push({
        role: 'assistant',
        content: chat.data.choices[0].message.content,
      });
    }
    process.stdout.write('\r');
    process.stdout.write('\x1b[2K');

    console.log('\x1b[33m', 'AI > ' + response, '\x1b[0m');
  } catch (error) {
    messages.pop();
    console.error(
      'Problema devolviendo la respuesta',
      error?.message || error.text
    );
  }
};

module.exports = { chat };
