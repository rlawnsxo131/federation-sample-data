import { buildFederatedSchema } from '@apollo/federation';
import { gql, IResolvers } from 'apollo-server-fastify';
import merge from 'lodash.merge';
import * as data from './data';

const typeDef = gql`
  type Query {
    _version: String
  }
  type Mutation {
    _empty: String
  }
`;

const resolvers: IResolvers = {
  Query: {
    _version: () => '1.0',
  },
  Mutation: {},
};

const schema = buildFederatedSchema([
  {
    typeDefs: merge(typeDef, data.typeDef),
    resolvers: merge(resolvers, data.resolvers) as any, // fuck apollo federation typing...
  },
]);

export default schema;
