import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { forwardConnectionArgs, connectionFromArraySlice, cursorToOffset } from 'graphql-relay';
import { nodeField } from '../node';
import UrlQuery, { UrlsConnection } from './UrlQuery';
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
    allUrls: {
      type: UrlsConnection,
      args: forwardConnectionArgs,
      resolve: async (_source, args) => {
        const offset = args.after ? cursorToOffset(args.after) + 1 : 0;
        const limit = args.first || 10;
        const total = await Url.count();
        const urls = await Url
          .query(qb => qb.offset(offset).limit(limit))
          .orderBy('id', 'desc')
          .fetchAll();
        return connectionFromArraySlice(urls.models, args, {
          sliceStart: offset,
          arrayLength: total,
        });
      },
    },
  },
});

export default rootQuery;
