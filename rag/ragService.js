const { createEmbedding } = require("./embedding");
const { addDoc, search } = require("./vectorDB");
const { askLLM } = require("../ai/llm");

/**
 * Add document
 */
async function addDocument(text) {
  const embedding = await createEmbedding(text);
  addDoc(text, embedding);
}

/**
 * Query RAG
 */
async function runRAG(query) {
  const queryEmbedding = await createEmbedding(query);

  const docs = search(queryEmbedding);

  const context = docs.map(d => d.text).join("\n");

  const prompt = `
  You MUST answer ONLY using the provided context.

If the answer is not in the context, say:
"I don't know based on the provided documents."

Do NOT add extra assumptions.
Context:

${context}

Question: ${query}
`;

  return await askLLM(prompt);
}

module.exports = { runRAG, addDocument };