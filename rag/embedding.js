const axios = require("axios");
const {  ai } = require("../ai/llm.js");
const OLLAMA_URL = "http://localhost:11434/api/embeddings";

/**
 * Create embedding vector from text
 */
async function createEmbedding(text) {
  // const res = await axios.post(OLLAMA_URL, {
  //   model: "llama3",
  //   prompt: text
  // });

  // return res.data.embedding;
   const response = await ai.models.generateContent({
      // Use the stable 2.5 model
      model: "gemma-3-27b", 
      contents: text,
    });

  return response.text;
}

module.exports = { createEmbedding };