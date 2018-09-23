import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UrlQuery from '../queries/UrlQuery';
import Url from '../../models/Url';

const CreateUrlMutation = mutationWithClientMutationId({
  name: 'CreateUrl',
  inputFields: {
    destination: { type: new GraphQLNonNull(GraphQLString) },
  },

  outputFields: {
    url: {
      type: UrlQuery,
      resolve: url => url,
    },
  },

  mutateAndGetPayload: async ({ destination }) => {
    const existingUrl = await Url.findOne({ destination });
    if (existingUrl) return existingUrl;
    const url = await Url.create({ destination });
    url.generateIdentifier();
    await url.save();
    await url.refresh();
    return url;
  },
});

export default CreateUrlMutation;
