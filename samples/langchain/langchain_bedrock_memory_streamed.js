const { BufferMemory } = require("langchain/memory");
const { BedrockChat } = require("langchain/chat_models/bedrock");
const { ConversationChain } = require("langchain/chains");

const {
  ChatPromptTemplate,
  MessagesPlaceholder,
} = require("langchain/prompts");

const {
  DynamoDBChatMessageHistory,
} = require("langchain/stores/message/dynamodb");

// Replace these values
const region = "us-east-1";
const tableName = "<YOUR_TABLE_NAME>"
const partitionKey = "<YOUR_PARTITION_KEY>";

const model = new BedrockChat({
  model: "anthropic.claude-instant-v1",
  region,
  maxTokens: 1000,
  temperature: 0.8,
  stopSequences: ["\\n\\nHuman:"],
  streaming: true,
});

const chatPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.",
  ],
  new MessagesPlaceholder("history"),
  ["human", "{input}"],
]);

const mockRequest = async (sessionId, userInput) => {
  const memory = new BufferMemory({
    chatHistory: new DynamoDBChatMessageHistory({
      tableName,
      partitionKey,
      sessionId,
    }),
    returnMessages: true,
    memoryKey: "history",
  });

  const chain = new ConversationChain({
    llm: model,
    memory,
    prompt: chatPrompt,
  });

  let streamedResponse = "";

  await chain.call({ input: userInput }, [
    {
      async handleLLMNewToken(token) {
        streamedResponse += token;
        console.log(streamedResponse);
      },
    },
  ]);

  return streamedResponse;
};

(() => mockRequest("sessionId", "Who is Santa?"))();
