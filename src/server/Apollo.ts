import { ApolloServer } from 'apollo-server-fastify';
import isProduction from '../lib/isProduction';
import schema from '../graphql/schema';
import envConfig from '../lib/env';

export default class Apollo {
  private server!: ApolloServer;

  constructor() {
    this.setup();
  }

  private setup() {
    envConfig();
    this.server = new ApolloServer({
      schema,
      context: (params) => () => {
        // console.log(params.req.body.query);
        // console.log(params.req.body.variables);
      },
      playground: !isProduction(),
    });
  }

  async start() {
    try {
      await this.server.start();
    } catch (e) {
      console.log('apollo server start crash');
      console.error(e);
    }
  }

  createHandler() {
    return this.server.createHandler();
  }
}
