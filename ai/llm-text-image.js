const { InferenceClient } =require("@huggingface/inference");
const fs =require("fs/promises");
const path =require("path");
const dotenv = require("dotenv");
dotenv.config();
const client = new InferenceClient(process.env.HF_TOKEN);

async function promptToImage(prompt) {
  const image = await client.textToImage({
    provider: "fal-ai",
    model: "Tongyi-MAI/Z-Image-Turbo",
    inputs: prompt,
    parameters: { num_inference_steps: 5 },
  });

  const buffer = Buffer.from(await image.arrayBuffer());

  const publicDir = path.join(process.cwd(), "public");

  // create folder if missing
  await fs.mkdir(publicDir, { recursive: true });

  const fileName = `generated-${Date.now()}.png`;
  const filePath = path.join(publicDir, fileName);

  await fs.writeFile(filePath, buffer);

  return {
    blob: image,
    url: `http://localhost:3000/${fileName}`,
    path: filePath
  };
}

promptToImage("Astronaut riding a horse").then(console.log);



