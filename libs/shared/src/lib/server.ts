import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { TypeSource, IResolvers } from '@graphql-tools/utils';
import { merge } from 'lodash';
import { ApolloServer } from 'apollo-server-express';

type ServerConfig = {
    port: number,
    schemas: TypeSource[],
    resolvers: IResolvers[]
}

export const createGraphQLServer = async (config: ServerConfig) => {
    const app = express();
    // app.use(express.json({ limit: "5mb" }));
    // app.use(express.text({ limit: "5mb" }));
    app.use(cors());
    const httpServer = new http.Server(app);

    const compiledSchema = makeExecutableSchema({
        typeDefs: [...config.schemas],
        resolvers: merge(config.resolvers)
    })

    const server = new ApolloServer({
        introspection: true,
        schema: compiledSchema
    });
    await server.start();
    server.applyMiddleware({ app });

    const apolloGraphQLServerUrl = `localhost:${config.port}${server.graphqlPath}`;

    httpServer.listen({ port: config.port }, async () => {
        console.log(`🚀 Server ready at http://${apolloGraphQLServerUrl}`);
    });
    return { app, server, httpServer, apolloGraphQLServerUrl };
};