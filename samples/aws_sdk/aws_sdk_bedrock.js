const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require("@aws-sdk/client-bedrock-runtime");

// Replace this value
const region = "us-east-1";

const client = new BedrockRuntimeClient({ region });

const mockRequest = async (userInput) => {
  const textInput = `\n\nHuman: ${userInput}\n\nAssistant:`;
  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-instant-v1",
    contentType: "application/json",
    accept: "*/*",
    body: Buffer.from(
      JSON.stringify({
        prompt: textInput,
        max_tokens_to_sample: 300,
        temperature: 0.8,
        top_p: 0.8,
        anthropic_version: "bedrock-2023-05-31",
      })
    ),
  });

  const response = await client.send(command);
  const body = JSON.parse(Buffer.from(response.body).toString());
  console.log(body);
};

(() => mockRequest("Hi, how are you?"))();
