const { BedrockChat } = require("langchain/chat_models/bedrock");

// Replace this value
const region = "us-east-1";

const model = new BedrockChat({
  model: "anthropic.claude-instant-v1",
  region,
  maxTokens: 1000,
  temperature: 0.8,
  stopSequences: ["\\n\\nHuman:"],
});

const mockRequest = async (userInput) => {
  const res = await model.invoke(userInput);
  console.log(res);
  return res.content;
};

(() => mockRequest("Who is Santa?"))();
