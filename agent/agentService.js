const { askLLM } = require("../ai/llm");;
const executor = require("./executor");

/**
 * Step 1: Ask LLM what action to take
 */
async function decideAction(message) {
  const prompt = `
You are an AI agent.

Available tools:
1. getUserOrders(userId)

If user asks about orders, return:
ACTION: getUserOrders
INPUT: {"userId": "123"}

Otherwise return:
ACTION: NONE

User: ${message}
`;

  const response = await askLLM(prompt);
  return response;
}

/**
 * Step 2: Parse LLM decision
 */
function parseAction(text) {
  const actionMatch = text.match(/ACTION:\s*(\w+)/);
  const inputMatch = text.match(/INPUT:\s*(\{.*\})/);

  if (!actionMatch) return null;

  return {
    action: actionMatch[1],
    input: inputMatch ? JSON.parse(inputMatch[1]) : {}
  };
}

/**
 * Step 3: Run agent
 */
async function runAgent(message) {
  const decisionText = await decideAction(message);

  const parsed = parseAction(decisionText);

  // No tool → fallback to LLM
  if (!parsed || parsed.action === "NONE") {
    return await askLLM(message);
  }

  // Execute tool
  const result = await executor[parsed.action](parsed.input);

  // Final response
  const finalPrompt = `
User asked: ${message}

Tool result:
${JSON.stringify(result)}

Generate a helpful response.
`;

  return await askLLM(finalPrompt);
}

module.exports = { runAgent };