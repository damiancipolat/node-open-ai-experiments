require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const example = async () => {
  const messages = [
    { role: 'system', content: 'You are friendly chatbot.' },
    { role: 'user', content: 'Hi, my name is Isa' },
  ];

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: 1,
  });

  const result = completion.data.choices[0].message.content;
  console.log('>', result);
};

example();
