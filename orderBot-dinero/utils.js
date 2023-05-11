require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const completion = async (messages) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: 1,
  });

  const result = completion.data.choices[0].message.content;

  // Return chat object, use asssitant role as gpt part.
  return { role: 'assistant', content: result };
};

module.exports = {
  completion,
};
