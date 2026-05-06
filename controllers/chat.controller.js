

const { detectIntent } = require("../core/router");
const { askLLM } = require("../ai/llm");
const { runAgent } = require("../agent/agentService");
const { runRAG } = require("../rag/ragService");

 const chatController = async (req, res) => {
  const { message } = req.body;

  const intent = await detectIntent(message);

  let result;
  console.log(`Detected intent: ${intent}`);
  if (intent === "agent") {
    result = await runAgent(message);
  } else if (intent === "rag") {
    result = await runRAG(message);
  } else {
    result = await askLLM(message);
  }

  res.json({ intent, result });
};

module.exports={
    chatController
}