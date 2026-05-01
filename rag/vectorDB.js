const store = [];

/**
 * Add document with embedding
 */
function addDoc(text, embedding) {
  store.push({ text, embedding });
}

/**
 * Cosine similarity
 */
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  return dot / (magA * magB);
}

/**
 * Search similar docs
 */
function search(queryEmbedding, topK = 3) {
  return store
    .map(doc => ({
      text: doc.text,
      score: cosineSimilarity(queryEmbedding, doc.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

module.exports = { addDoc, search };