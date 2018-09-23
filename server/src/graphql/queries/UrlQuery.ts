import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';
import { globalIdField, connectionDefinitions } from 'graphql-relay';
import { nodeInterface, registerQueryMapping } from '../node';

const UrlQuery = new GraphQLObjectType({
  name: 'Url',
  fields: () => ({
    id: globalIdField('Url'),
    identifier: { type: new GraphQLNonNull(GraphQLString), resolve: url => url.get('identifier') },
    destination: { type: new GraphQLNonNull(GraphQLString), resolve: url => url.get('destination') },
    createdAt: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve: url => Math.round(url.get('createdAt') / 1000),
    },
  }),
  interfaces: [nodeInterface],
});

const { connectionType: UrlsConnection } = connectionDefinitions({
  name: 'Url',
  nodeType: UrlQuery,
});

registerQueryMapping(UrlQuery);

export default UrlQuery;
export { UrlsConnection };
