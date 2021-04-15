import { ApolloServerPlugin } from "apollo-server-plugin-base";
import crypto from "crypto";

const nsInMs = BigInt(1000000);

const plugin: ApolloServerPlugin = {
  serverWillStart(ctx) {
    ctx.logger.info("Apollo server is starting...");
  },

  requestDidStart(ctx) {
    // TODO: [Variables] should be cleaned up if handling sensitive information.
    const reqId = crypto.randomUUID();
    const reqStart = process.hrtime.bigint();
    ctx.logger.info({ gqlReqId: reqId, msg: "Graphql request received", operation: ctx.request.operationName, variables: ctx.request.variables });
    return {
      didEncounterErrors(ctx) {
        ctx.logger.error({ gqlReqId: reqId, msg: "GraphQL request encountered errors", gqlErrors: ctx.errors });
      },

      willSendResponse(ctx) {
        const requestDuration = (process.hrtime.bigint() - reqStart) / nsInMs;
        ctx.logger.debug({ gqlReqId: reqId, msg: `Graphql request finished`, requestDurationMs: requestDuration.toString() });
      },
    }
  }
};


export default plugin;
