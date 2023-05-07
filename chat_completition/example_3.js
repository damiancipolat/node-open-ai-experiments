require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const chat = async (messages) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: 1,
  });

  const result = completion.data.choices[0].message.content;
  console.log('>', result);

  // Return chat object, use asssitant role as gpt part.
  return { role: 'assistant', content: result };
};

const context = [];

const part_1 = [
  { role: 'system', content: 'You are friendly chatbot.' },
  { role: 'user', content: 'Hi, my name is Isa' },
];

const part_2 = [
  { role: 'user', content: 'Yes,  can you remind me, What is my name?' },
];

const run = async () => {
  // First part
  context.push(...part_1);
  const response_1 = await chat(context);

  // Append in the context the previous response and the new question.
  context.push(response_1);
  context.push(...part_2);
  console.log(context);
  const response_2 = await chat(context);
};

run();
