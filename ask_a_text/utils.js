const math = require('mathjs');

// Calculate distance
const vectorSimilarity = (x, y) => math.dot(x, y);

// Process paragraph and load the sources.
const loadSources = async (openai, text) => {
  const embeddings = [];
  const sources = [];

  for (const source of text.split('\n')) {
    if (source.trim() === '') {
      continue;
    }
    embeddings.push(await getEmbedding(openai, source));
    sources.push(source);
  }

  return {
    embeddings,
    sources,
  };
};

// Receive a model and a text a get the embedding.
const getEmbedding = async (openai, prompt) => {
  const params = {
    model: 'text-embedding-ada-002',
    input: prompt,
    user: 'damian',
  };

  const response = await openai.createEmbedding(params);
  return response?.data?.data[0]?.embedding;
};

// Order embeddings by similarity.
const orderDocuments = async (openai, query, embeddings) => {
  const query_embedding = await getEmbedding(openai, query);

  const document_similarities = embeddings
    .map((doc_embedding, doc_index) => {
      return [vectorSimilarity(query_embedding, doc_embedding), doc_index];
    })
    .sort((a, b) => b[0] - a[0]);

  return document_similarities;
};

module.exports = {
  vectorSimilarity,
  getEmbedding,
  loadSources,
  orderDocuments,
};
