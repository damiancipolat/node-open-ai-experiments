const { loadSources, orderDocuments } = require('./utils');

const OPENAI_API_KEY = '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';

const { Configuration, OpenAIApi } = require('openai');
const { combinations } = require('mathjs');
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const CONTEXT_TOKEN_LIMIT = 1500;

const parrafo =
  'la edad de rocko\n tiene 2 años de edad, es un perro de raza beagle\n es un macho, vive en almagro\ncome pizza.';

const ask = async (openai, question, embeddings, sources) => {
  const orderedCandidates = await orderDocuments(openai, question, embeddings);
  let ctx = '';

  for (const candi of orderedCandidates) {
    const next = `${ctx} ${sources[candi[1]]}`;

    if (next.length > CONTEXT_TOKEN_LIMIT) {
      break;
    }
    ctx = next;
  }

  if (ctx.length === 0) {
    return '';
  }

  const prompt = `Answer the question based on the following context:\n\ncontext:${ctx}\n\nQ:${question}\n\nA:`;

  const messages = [{ role: 'user', content: prompt }];
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 1,
    messages,
  });

  return {
    prompt,
    response: completion.data.choices[0]?.message?.content,
  };
};

const run = async () => {
  const { embeddings, sources } = await loadSources(openai, parrafo);

  const response1 = await ask(
    openai,
    'cual es la edad de rocko',
    embeddings,
    sources
  );

  console.log('repsonse 1:', response1);

  const response2 = await ask(
    openai,
    'cual es la raza de rocko',
    embeddings,
    sources
  );

  console.log('repsonse 2:', response2);

  const response3 = await ask(openai, 'donde vive rocko', embeddings, sources);

  console.log('repsonse 3:', response3);
};

(async () => {
  await run();
})();
