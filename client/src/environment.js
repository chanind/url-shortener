/* @flow */

import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

const defaultFetchQuery = (operation, variables) => {
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

export type fetchQueryFunc = ({text: string}, {[string]: any}) => Promise<any>;

export const createEnvironment = (fetchQuery: fetchQueryFunc) => {
  const network = Network.create(fetchQuery);
  const source = new RecordSource();
  const store = new Store(source);
  return new Environment({ network, store });
}

let environment = createEnvironment(defaultFetchQuery);

// useful for resetting environment between tests
export const overrideEnvironment = (fetchQuery: fetchQueryFunc) => {
  environment = createEnvironment(fetchQuery);
};

export const getEnvironment = () => environment;
