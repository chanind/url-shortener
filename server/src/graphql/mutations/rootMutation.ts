import { GraphQLObjectType } from 'graphql';
import CreateUrlMutation from './CreateUrlMutation';

const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUrl: CreateUrlMutation,
  },
});

export default rootMutation;
