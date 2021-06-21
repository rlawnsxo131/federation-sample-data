import { ApolloServer } from 'apollo-server';
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
      onHealthCheck: () => new Promise((resolve, reject) => {}),
      playground: !isProduction(),
    });
  }

  start() {
    this.server.listen({ port: process.env.PORT }).then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  }
}
