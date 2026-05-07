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




// const { InferenceClient } = require("@huggingface/inference");
// const fs = require("fs/promises");
// const path = require("path");
// const dotenv = require("dotenv");

// dotenv.config();

// const client = new InferenceClient(process.env.HF_TOKEN);

// const PUBLIC_DIR = path.join(process.cwd(), "public");

// async function ensurePublicDir() {
//   await fs.mkdir(PUBLIC_DIR, {
//     recursive: true,
//   });
// }

// async function saveBlob(blob, fileName) {
//   const buffer = Buffer.from(await blob.arrayBuffer());

//   const filePath = path.join(PUBLIC_DIR, fileName);

//   await fs.writeFile(filePath, buffer);

//   return filePath;
// }

// async function promptToImage(prompt) {
//   const imageBlob = await client.textToImage({
//     provider: "fal-ai",
//     model: "Tongyi-MAI/Z-Image-Turbo",
//     inputs: prompt,
//     parameters: {
//       num_inference_steps: 5,
//     },
//   });

//   const fileName = `image-${Date.now()}.png`;

//   const filePath = await saveBlob(
//     imageBlob,
//     fileName,
//   );

//   return {
//     blob: imageBlob,
//     path: filePath,
//     fileName,
//   };
// }

// const { Blob } = require("buffer");

// async function imageToVideo(imagePath, prompt) {
//   const imageBuffer = await fs.readFile(
//     imagePath
//   );

//   // Convert Buffer -> Blob
//   const imageBlob = new Blob(
//     [imageBuffer],
//     {
//       type: "image/png",
//     }
//   );

//   const videoBlob =
//     await client.imageToVideo({
//       provider: "auto",
// 	model: "lightx2v/Wan2.2-Distill-Loras:fastest",
//       inputs: imageBlob, // ← important
//       parameters: {
//         prompt,
//       },
//     });

//   const fileName =
//     `video-${Date.now()}.mp4`;

//   const filePath =
//     await saveBlob(
//       videoBlob,
//       fileName
//     );

//   return {
//     blob: videoBlob,
//     path: filePath,
//     fileName,
//   };
// }
// async function main() {
//   try {
//     await ensurePublicDir();

//     // Step 1: Generate image
//     const image = await promptToImage(
//       `Arslan Jaffar, senior backend engineer walking through futuristic AI workspace,
//       holographic dashboards, Node.js architecture diagrams, Redis, RabbitMQ,
//       Docker containers, cinematic lighting, ultra realistic`
//     );

//     console.log("Image:", image);

//     // Step 2: Convert image to video
//     // const video = await imageToVideo(
//     //   image.path,
//     //   `The engineer walks forward confidently, holographic code floating around him,
//     //   cinematic camera movement, professional intro`
//     // );

//     // console.log("Video:", video);

//   } catch (error) {
//     console.error(error);
//   }
// }

// main();