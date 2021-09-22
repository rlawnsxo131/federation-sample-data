import { gql } from 'apollo-server-fastify';
import { GraphQLResolverMap } from 'apollo-graphql';

export const typeDef = gql`
  type Data @key(fields: "id") {
    id: ID!
    user_id: ID!
    data: String!
  }
  extend type Query {
    data(id: ID!, user_id: ID!): Data
    dataList: [Data]
  }
`;

export const resolvers: GraphQLResolverMap = {
  Data: {},
  Query: {
    data: (parent, args, context, info) => {
      const { id, user_id } = args;
      return dataList.find((v) => v.id === id && v.user_id === user_id);
    },
    dataList: () => {
      return dataList;
    },
  },
  Mutation: {},
};

const dataList = [
  {
    id: '1',
    user_id: '1',
    data: 'data1',
  },
  {
    id: '2',
    user_id: '2',
    data: 'data2',
  },
];
