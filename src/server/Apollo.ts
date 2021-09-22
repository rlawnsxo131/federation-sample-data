import { ApolloServer } from 'apollo-server-fastify';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { FastifyInstance } from 'fastify';
import schema from '../graphql/schema';
import { isProduction } from '../constants';

export default class Apollo {
  private server!: ApolloServer;

  constructor(fastify: FastifyInstance) {
    this.server = new ApolloServer({
      schema,
      context:
        ({ request }) =>
        () => {
          console.log('url: ', request.url);
          console.log('method: ', request.method);
        },
      plugins: [
        this.fastifyAppClosePlugin(fastify),
        ApolloServerPluginDrainHttpServer({ httpServer: fastify.server }),
        isProduction
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
    });
  }

  private fastifyAppClosePlugin(app: FastifyInstance) {
    return {
      async serverWillStart() {
        return {
          async drainServer() {
            await app.close();
          },
        };
      },
    };
  }

  async start() {
    try {
      await this.server.start();
    } catch (e) {
      console.log('apollo server start crash');
      console.error(e);
    }
  }

  getServer() {
    return this.server;
  }

  createHandler() {
    return this.server.createHandler();
  }
}
