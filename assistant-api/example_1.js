const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load .env
dotenv.config();

const run = async () => {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_TOKEN,
    organiztion: 'brigthbyte',
  });

  /*
    // Create assistant.
    const assistant = await openai.beta.assistants.create({
        instructions: `Simulate you are a dog living in a house and simulate
        be a virtual pet.`,
        name: 'virtual dog',
        tools: [{ type: 'retrieval' }],
        model: 'gpt-4-1106-preview',
    });
    console.log('create', assistant);
  */

  /*
  // List assistants.
  const list = await openai.beta.assistants.list({
    order: 'desc',
    limit: 10,
  });
  console.log('list', list);
*/
  /*
    // Delete assistant.
    const response = await openai.beta.assistants.del(assistantId);
  */

  /*
    // Create thread
    const thread = await openai.beta.threads.create();
    console.log(thread);
    //thread_r9fxfQ73aOajpZrQIC5gGW7a
  */

  /*
  // Create a message.
  const message = 'Hi how are you?';
  const threadMessage = await openai.beta.threads.messages.create(
    'thread_r9fxfQ73aOajpZrQIC5gGW7a',
    {
      role: 'user',
      content: message,
    }
  );
  console.log(JSON.stringify(threadMessage));
  */

  // List messages.
  const threadId = 'thread_r9fxfQ73aOajpZrQIC5gGW7a';
  const messageList = await openai.beta.threads.messages.list(threadId);
  console.log(JSON.stringify(messageList));

  /*
  // Create run.
  const threadId = 'thread_r9fxfQ73aOajpZrQIC5gGW7a';
  const assistantId = 'asst_S9COx68Myx3oy9nZUpdQ2BEK';
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });

  console.log({ run: run });
  */
  /*
  // Create a retrieve.
  const threadId = 'thread_r9fxfQ73aOajpZrQIC5gGW7a';
  const runId = 'run_p3jR140pnJpjMddJA2xPTqWQ';
  const run = await openai.beta.threads.runs.retrieve(threadId, runId);
  console.log(run);*/
};

run();
