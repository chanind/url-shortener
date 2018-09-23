import { request, expect } from 'chai';
import app from '../../src/app';

type graphqlVars = { [key: string]: {} } | undefined;

export const runGraphQL = (query: string, variables: graphqlVars = null, guestIdentifier: string | undefined = '666') => request(app)
  .post('/api/graphql')
  .set('identifier', guestIdentifier)
  .send({ query, variables });

export const expectNoErrors = (res: any) => {
  if (res.body.errors || res.status !== 200) {
    // eslint-disable-next-line
    console.log(res.body.errors);
  }
  expect(res).to.have.status(200);
  expect(res.body.errors).to.be.undefined;
};

export const expectErrors = (res: any, numExpected: number = 1) => {
  if (!res.body.errors || res.body.errors.length !== numExpected || res.status !== 200) {
    // eslint-disable-next-line
    console.log(res.body.errors);
  }
  expect(res).to.have.status(200);
  expect(res.body.errors).not.to.be.undefined;
  expect(res.body.errors).to.have.lengthOf(numExpected);
};
