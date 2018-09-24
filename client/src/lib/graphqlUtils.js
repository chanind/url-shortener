/* @flow */

import { commitMutation } from 'react-relay'


export const commitMutationPromise = (environment: any, config: any) => {
  // commitMutation in a promise wrapper
  return new Promise((resolve, reject) => {
    const onCompleted = (resp, err) => {
      if (config.onCompleted) config.onCompleted(resp, err);
      if (err) return reject(err[0]);
      resolve(resp);
    };
    const onError = (err) => {
      if (config.onError) config.onError(err);
      reject(err);
    }
    commitMutation(environment, {
      ...config,
      onCompleted,
      onError,
    })
  });
};
