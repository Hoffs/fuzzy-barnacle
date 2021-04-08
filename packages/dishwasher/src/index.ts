import express from "express";
import * as tq from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { context } from './context';
import { StorageResolver } from "./StorageResolver";
import { UrlResolver } from "./UrlResolver";

const PORT = 4000;

async function startServer() {
  const schema = await tq.buildSchema({
    resolvers: [StorageResolver, UrlResolver],
  });
  const app = express();
  const server = new ApolloServer({
    schema, context: context
  });
  await server.start();

  server.applyMiddleware({ app });

  // Additional routes
  app.use(express.json());
  app.use((req, res) => {
    res.status(200);
    res.send('Hello!');
    res.end();
  });

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });

  return { server, app };
}

startServer();
