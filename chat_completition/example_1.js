require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const example = async () => {
  const messages = [
    {
      role: 'system',
      content: 'You are an assistant that speaks like Shakespeare.',
    },
    { role: 'user', content: 'tell me a joke' },
  ];

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });

  const result = completion.data.choices[0].message.content;
  console.log('>', result);
};

example();
