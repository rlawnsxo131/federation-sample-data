import { gql } from 'apollo-server-fastify';
import { buildSubgraphSchema } from '@apollo/federation';
import { GraphQLResolverMap } from 'apollo-graphql';
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

const resolvers: GraphQLResolverMap = {
  Query: {
    _version: () => '1.0',
  },
  Mutation: {},
};

const schema = buildSubgraphSchema([
  {
    typeDefs: merge(typeDef, data.typeDef),
    resolvers: merge(resolvers, data.resolvers)
  },
]);

export default schema;
