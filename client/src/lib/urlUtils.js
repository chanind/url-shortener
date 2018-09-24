/* @flow */

export const getShortUrl = (identifier: string) => (
  `http://${process.env.REACT_APP_API_HOST || ''}/${identifier}`
);
