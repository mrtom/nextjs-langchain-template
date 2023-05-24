import { IndexMeta, PineconeClient } from '@pinecone-database/pinecone';

export const waitUntilIndexIsReady = async (
  client: PineconeClient,
  indexName: string
) => {
  try {
    let indexState = undefined;
    while (indexState !== 'Ready') {
      await new Promise((r) => setTimeout(r, 1000));
      const indexDescription: IndexMeta = await client.describeIndex({
        indexName
      });

      indexState = indexDescription.status?.state;
    }
  } catch (e) {
    console.error('Error waiting until index is ready', e);
  }
};

let pineconeClient: PineconeClient | null = null;

export const getPineconeClient: () => Promise<PineconeClient> = async () => {
  if (!process.env.PINECONE_API_KEY) {
    throw new Error('PINECONE_API_KEY environment variable not set');
  }
  if (!process.env.PINECONE_ENVIRONMENT) {
    throw new Error('PINECONE_ENVIRONMENT environment variable not set');
  }

  if (!process.env.PINECONE_INDEX) {
    throw new Error('PINECONE_INDEX environment variable not set');
  }

  if (pineconeClient) {
    return pineconeClient;
  } else {
    pineconeClient = new PineconeClient();

    await pineconeClient.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT
    });
  }
  return pineconeClient;
};
