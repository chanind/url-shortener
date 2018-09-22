import { GraphQLSchema } from 'graphql';
import rootMutation from './mutations/rootMutation';
import rootQuery from './queries/rootQuery';

const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});

export default schema;
