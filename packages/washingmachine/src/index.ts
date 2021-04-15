import express from "express";
import * as tq from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { context } from "./context";
import { StorageResolver } from "./StorageResolver";
import { UrlResolver } from "./UrlResolver";
import { log, logHttp } from "./logger";
import appRouter from "./router";
import apolloLogging from "./apollologging";

const PORT = process.env.PORT || 4000;

async function startServer(registerRoutes?: (app: express.Express) => void) {
  const schema = await tq.buildSchema({
    resolvers: [StorageResolver, UrlResolver],
  });
  const app = express();
  const server = new ApolloServer({
    schema,
    context: context,
    logger: log,
    plugins: [ apolloLogging ],
  });
  await server.start();

  server.applyMiddleware({ app });

  // Additional routes
  registerRoutes?.(app);

  app.listen(PORT, () => {
    log.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });

  return { server, app };
}

startServer((app) => {
  app.use(logHttp);
  app.use("/a", appRouter);
});
