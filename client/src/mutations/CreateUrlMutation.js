/* @flow */

import { graphql } from 'react-relay';
import { commitMutationPromise } from '../lib/graphqlUtils';

const mutation = graphql`
  mutation CreateUrlMutation($input: CreateUrlInput!) {
    createUrl(input: $input) {
      url {
        id
        destination
        identifier
        createdAt
      }
    }
  }
`;

const commit = (environment: any, destination: string) => (commitMutationPromise(
  environment,
  {
    mutation,
    variables: { input: { destination } },
  },
));

export default { commit };
