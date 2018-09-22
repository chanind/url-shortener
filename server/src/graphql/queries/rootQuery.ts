import { GraphQLObjectType } from 'graphql';
import { nodeField } from '../node';

const rootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    node: nodeField,
  },
});

export default rootQuery;
