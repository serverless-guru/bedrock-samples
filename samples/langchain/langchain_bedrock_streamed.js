const { BedrockChat } = require("langchain/chat_models/bedrock");

// Replace this value
const region = "us-east-1";

const model = new BedrockChat({
  model: "anthropic.claude-instant-v1",
  region,
  maxTokens: 1000,
  temperature: 0.8,
  stopSequences: ["\\n\\nHuman:"],
  streaming: true,
});

const mockRequest = async (userInput) => {
  const stream = await model.stream(userInput);
  let completeResponse = "";
  for await (const chunk of stream) {
    completeResponse += chunk.content;
    console.log(completeResponse);
  }
  return completeResponse;
};

(() => mockRequest("Who is Santa?"))();
