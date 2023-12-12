const {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand,
} = require("@aws-sdk/client-bedrock-agent-runtime");

// Replace these values
const region = "us-east-1";
const agentId = "<AGENT_ID>";
const agentAliasId = "<AGENT_ALIAS_ID>";

const client = new BedrockAgentRuntimeClient({ region });

const mockRequest = async (sessionId, userInput) => {
  const input = {
    agentId,
    agentAliasId,
    sessionId,
    endSession: false,
    enableTrace: false,
    inputText: userInput,
  };
  const command = new InvokeAgentCommand(input);

  const response = await client.send(command);
  const chunks = [];

  for await (const item of response.completion) {
    if (typeof item?.chunk?.bytes !== "undefined") {
      chunks.push(item.chunk.bytes);
    }
  }

  console.log(Buffer.concat(chunks).toString("utf-8"));
};

(() => mockRequest("Session123", "Hi, how are you?"))();
