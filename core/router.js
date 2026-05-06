// core/router.js

const { GoogleGenAI } =require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();
const ai = new GoogleGenAI({  apiKey: process.env.GEMMI_API_KEY });

async function detectIntent(message) {


  const prompt = `
You are an intent classification system.

Classify the user message into ONE of these categories:

1. agent → user wants actions like order, profile update, account tasks
2. rag → user is asking about documents, pdfs, files, knowledge base
3. llm → general conversation or questions not related to system actions

Rules:
- Return ONLY one word: agent, rag, or llm
- No explanation
- No punctuation

User message:
"""${message}"""
`;

  const response = await ai.models.generateContent({
        // Use the stable 2.5 model
        model: "gemini-2.5-flash", 
        contents: prompt,
      });
  const intent = response.text.trim().toLowerCase();

  // safety fallback
  if (!["agent", "rag", "llm"].includes(intent)) {
    return "llm";
  }
  return intent;
}

module.exports = { detectIntent };