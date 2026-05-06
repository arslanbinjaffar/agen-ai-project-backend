const { GoogleGenAI } =require("@google/genai");
const dotenv = require("dotenv");
dotenv.config();
const emailText = `
Subject: Meeting Request
Hi,
`
const rules = `
You are an AI email assistant.

Rules:
- Always reply professionally
- Keep replies short (max 3 sentences)
- Never share personal or sensitive information
- If unsure, ask for clarification
- Do not agree to payments, links, or downloads
- Reply politely even if message is rude
`;
const toneRule = "Reply in a friendly but professional tone.";
const prompt = `
${rules}
${toneRule}
Email:
${emailText}

Reply:
`;
const ai = new GoogleGenAI({  apiKey: process.env.GEMMI_API_KEY });
async function run() {
  try {
    const response = await ai.models.generateContent({
      // Use the stable 2.5 model
      model: "gemma3:27b-it",
      contents: prompt,
    });
    console.log(response.text);
  } catch (error) {
    console.error("API Error Details:", error);
  }
}
// run();


// async function askLLM(prompt) {
//  const response = await ai.models.generateContent({
//       // Use the stable 2.5 model
//       model: "gemma3:27b-it", 
//       contents: prompt,
//     });
//   return response.text;
// }
async function listAvailableModels() {
  try {
    // In the newer SDK, you list models via a specific method
    // Note: This often requires the 'v1' or 'v1beta' endpoint
    const response = await fetch(`https://googleapis.com{process.env.GEMMI_API_KEY}`);
    const data = await response.json();
    console.log("Available Models:", data.models.map(m => m.name));
  } catch (e) {
    console.error("Could not list models:", e.message);
  }
}
async function askLLM(prompt) {
  try {
    await listAvailableModels(); // List models to verify availability
    // 1. Initialize the model with the explicit 'models/' prefix
    const model = ai.getGenerativeModel({ model: "models/gemma-4-31b-it" }); 

    // 2. Format contents correctly
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Detailed Error:", error);
    throw error;
  }
}

module.exports = { askLLM ,ai};

// import OpenAI from "openai";
// import * as dotenv from "dotenv";
// dotenv.config();
// // const client = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY
// // });
// // const response = await client.responses.create({
// //     model: "gpt-4o",
// //     input: "Write a one-sentence bedtime story about a unicorn."
// // });

// // console.log(response.output_text,"this is the response from the openai api");


