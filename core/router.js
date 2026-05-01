// core/router.js

function detectIntent(message) {
  const lower = message.toLowerCase();

  if (lower.includes("order") || lower.includes("profile")) {
    return "agent";
  }

  if (lower.includes("document") || lower.includes("pdf")) {
    return "rag";
  }

  return "llm";
}

module.exports = { detectIntent };