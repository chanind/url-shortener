/* @flow */

import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

const fetchQuery = (operation, variables) => {
  return fetch(`//${process.env.REACT_APP_API_HOST || ''}/api/graphql`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variables,
      query: operation.text,
    }),
  }).then(response => response.json());
};

const network = Network.create(fetchQuery);

const source = new RecordSource();
const store = new Store(source);

export default new Environment({ network, store });
