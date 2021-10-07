const { ApolloServer, PubSub } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const Query = require("./resolvers/Query");
const fs = require("fs");
const path = require("path");
const { getUserId } = require("./utils");

const pubsub = new PubSub();

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const resolvers = {
  Query,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
  subscriptions: {
    onConnect: (connectionParams) => {
      if (connectionParams.authToken) {
        return {
          prisma,
          userId: getUserId(null, connectionParams.authToken),
        };
      } else {
        return {
          prisma,
        };
      }
    },
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
