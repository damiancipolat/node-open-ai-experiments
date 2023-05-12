require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const prompts = require('./prompts');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const context = [];

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

// Process ask and response.
const ask = async (prompt) => {
  // Save the question.
  const user = { role: 'user', content: prompt };
  context.push(user);
  //console.log('*', context);
  console.log('GPT> ?...');

  // Process and save the response.
  const response = await completion(context);
  context.push(response);
  console.log('GPT>', response.content);
  return response.content;
};

const start = async () => {
  context.push(...prompts.negativePrompt);
  return await ask('');
};

module.exports = {
  completion,
  ask,
  start,
};
