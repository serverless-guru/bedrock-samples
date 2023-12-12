const {
  BedrockRuntimeClient,
  InvokeModelWithResponseStreamCommand,
} = require("@aws-sdk/client-bedrock-runtime");

// Replace this value
const region = "us-east-1";

const client = new BedrockRuntimeClient({ region });

const mockRequest = async (userInput) => {
  const textInput = `\n\nHuman: ${userInput}\n\nAssistant:`;
  const command = new InvokeModelWithResponseStreamCommand({
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
  let chatResponse = "";
  let stop_reason = null;
  for await (const chunk of response.body) {
    const body = JSON.parse(Buffer.from(chunk.chunk?.bytes).toString());
    chatResponse += body.completion;
    stop_reason = body.stop_reason;
    console.log(chatResponse);
  }
  console.log(chatResponse, stop_reason);
};

(() => mockRequest("Who is Santa?"))();
