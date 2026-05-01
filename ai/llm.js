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
      model: "gemini-2.5-flash-lite", 
      contents: prompt,
    });
    console.log(response.text);
  } catch (error) {
    console.error("API Error Details:", error);
  }
}
// run();


async function askLLM(prompt) {
 const response = await ai.models.generateContent({
      // Use the stable 2.5 model
      model: "gemini-2.5-flash-lite", 
      contents: prompt,
    });

  return response.text;
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


