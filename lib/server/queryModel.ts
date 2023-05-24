import * as fs from 'fs';

import { OpenAI } from 'langchain/llms/openai';
import { BaseChain, RetrievalQAChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

import { getPineconeClient, waitUntilIndexIsReady } from 'lib/server/pinecone';

const model = new OpenAI({
  modelName: 'gpt-3.5-turbo',
  openAIApiKey: process.env.OPENAI_API_KEY
});

const INDEX_NAME = process.env.PINECONE_INDEX ?? '';

/**
 * This creates the index in Pinecone correctly, but
 * `waitUntilIndexIsReady` never returns as the index
 * state never changes from `Initializing`.
 *
 * For now, just create the index in the Pinecone UI.
 * Then hit the API to add the documents to the index.
 */
export const createVectorStore = async () => {
  // Create a vector store from the documents.
  const client = await getPineconeClient();

  await client.createIndex({
    createRequest: {
      name: INDEX_NAME,
      dimension: 1536
    }
  });

  await waitUntilIndexIsReady(client, INDEX_NAME);
};

export const buildStore = async () => {
  // Initialize the LLM to use to answer the question.
  const text = fs.readFileSync('data/state_of_the_union.txt', 'utf8');
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);

  // Create a vector store from the documents.
  const client = await getPineconeClient();

  const pineconeIndex = client.Index(INDEX_NAME);
  await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
    pineconeIndex
  });
};

// See https://js.langchain.com/docs/modules/chains/index_related_chains/retrieval_qa
const buildChain = async (): Promise<BaseChain> => {
  // Create a vector store from existing index.
  const client = await getPineconeClient();

  const pineconeIndex = client.Index(INDEX_NAME);
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );

  // Create a chain that uses the OpenAI LLM and Pinecone vector store.
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  return chain;
};

let chain: BaseChain | null = null;

export const queryModel = async (query: string): Promise<string> => {
  if (chain === null) {
    chain = await buildChain();
  }

  const res = await chain.call({
    query
  });

  return res.text;
};
