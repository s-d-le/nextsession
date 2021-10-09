import { ApolloServer } from "apollo-server-lambda";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import resolvers from "./resolvers";
import typeDefs from "./schema.graphql";

const runHandler = (event, context, handler) =>
  new Promise((resolve, reject) => {
    const callback = (error, body) => (error ? reject(error) : resolve(body));
    handler(event, context, callback);
  });

exports.graphqlHandler = async function graphqlHandler(
  event: APIGatewayProxyEvent,
  context: Context
) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ event, context }) => ({
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
    }),
    playground: {
      endpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    },
  });

  const handler = server.createHandler({
    cors: {
      origin: "*",
      credentials: true,
      allowedHeaders: ["ContentType", "content-type", "Origin", "Accept"],
    },
  });

  return await runHandler(event, context, handler);
};
