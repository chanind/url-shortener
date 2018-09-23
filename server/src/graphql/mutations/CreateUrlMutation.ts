import validator from 'validator';
import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UrlQuery from '../queries/UrlQuery';
import Url from '../../models/Url';
import { InvalidUrlError } from '../errors';

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
    if (!destination.match(/^(https?|ftp):\/\//)) {
      throw new InvalidUrlError('Destination URL must start with http://, https://, or ftp://');
    }
    if (destination.length > 2048) throw new InvalidUrlError('Destination URL has a max length of 2048 characters');
    if (!validator.isURL(destination)) throw new InvalidUrlError('Invalid destination URL');
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
