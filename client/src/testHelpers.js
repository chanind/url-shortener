/* @flow */

import {overrideEnvironment} from './environment';
import type {fetchQueryFunc} from './environment';

const defaultFetchQuery: fetchQueryFunc = () => Promise.resolve();

export const resetRelayEnvironment = (fetchQuery: ?fetchQueryFunc = null) => {
  overrideEnvironment(fetchQuery || defaultFetchQuery);
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
