# AWS Bedrock NodeJS Code Samples

This repository is intended to provide sample code on how to execute/call AWS Bedrock with either the AWS SDK v3 or using langchain.

## Usage

The samples are mostly self-contained and can be executed independently, readers should ensure to:

1. Have AWS Bedrock & the Claude Instant v1 model enabled on their accounts
2. Have the AWS credentials configured on their terminals
3. Have Node JS installed
4. Execute `npm i` to install the dependencies
5. Replace the required variables with the correct information
6. Run the desired sample with `node <sample-file-name>.js`

> [!NOTE]  
> Langchain examples that contain the word `memory` in the file name also require a DynamoDB table to be created. review the [Official Documentation](https://js.langchain.com/docs/integrations/chat_memory/dynamodb) for further details on how this is expected to work.
>
> The Bedrock Agent Example also requires the user to have configured a AWS Bedrock agent on their account beforehand.

## Samples

Following is a list of the currently available provided samples.

### AWS SDK v3

* [Basic Example](samples/aws_sdk/aws_sdk_bedrock.js): Sample of executing a single synchronous call to AWS Bedrock.
* [Streamed Response](samples/aws_sdk/aws_sdk_bedrock_streamed.js): Improvement of the first example to allow for receiving streamed responses from Bedrock.
* [Bedrock Agent](samples/aws_sdk/aws_sdk_bedrock_agent.js): Sample code on how to trigger the execution of an existing Bedrock Agent.

### Langchain

* [Basic Example](samples/langchain/langchain_bedrock.js): Sample of executing a single synchronous call to AWS Bedrock using the Langchain framework.
* [Streamed Response](samples/langchain/langchain_bedrock_streamed.js): Example code to get a streamed response from Bedrock when executing it with Langchain.
* [Conversation Chain + Memory](samples/langchain/langchain_bedrock_memory.js): Sample of how to configure Langchain to use a Conversation Chain and store the Conversation History on a DynamoDB table
* [Conversation Chain + Memory + Streamed Response](samples/langchain/langchain_bedrock_memory_streamed.js): Improved the previous sample to also return the Bedrock response as a stream.