# NextJS Langchain Template

This template project makes it easy to setup:

* A NextJS webapp with a basic user interface;
* A vector store in Pinecone;
* A Langchain chain

and then to send a question to your model and display results in the UI.

## Getting Started

1. Copy .env.local.example to .env
1. Sign up and get access keys from Pinecone and OpenAI. Add them to your .env file.
1. Create an index in Pinecone with the same name as you have used in your .env file (TODO: This should be created in code, but it's not working well currently)
1. Build the store by hitting the [buildStore](http://localhost:3000/api/buildStore) endpoint.
1. When that has completed, open the [webapp](http://localhost:3000) and enter a query, i.e. "What did the president say about Justice Breyer?"
1. Wait (about 10s) and the UI will update with the answer.