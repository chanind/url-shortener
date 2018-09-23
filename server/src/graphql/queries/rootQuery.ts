import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { nodeField } from '../node';
import UrlQuery from './UrlQuery';
import Url from '../../models/Url';

const rootQuery = new GraphQLObjectType({
  name: 'Root',
  fields: {
    node: nodeField,
    urlByIdentifier: {
      type: UrlQuery,
      args: {
        identifier: {
          type: new GraphQLNonNull(GraphQLString),
          description: 'Look up a url by its shortened identifier',
        },
      },
      resolve: async (_source, args) => await Url.findOne({
        identifier: args.identifier.toUpperCase(),
      }),
    },
  },
});

export default rootQuery;
