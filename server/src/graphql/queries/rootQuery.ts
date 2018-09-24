import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { nodeField } from '../node';
import ViewerQuery from './ViewerQuery';

const rootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    node: nodeField,
    viewer: {
      type: new GraphQLNonNull(ViewerQuery),
      resolve: () => true,
    },
  },
});

export default rootQuery;
