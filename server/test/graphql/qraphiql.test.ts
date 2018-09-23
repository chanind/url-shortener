import { describe, it } from 'mocha';
import { expect, request } from 'chai';
import app from '../../src/app';

describe('graphiql', () => {
  it('loads from /api/graphql/graphiql', async () => {
    const res = await request(app)
      .get('/api/graphql/graphiql')
      .set('Accept', 'text/html');
    expect(res).to.have.status(200);
  });
});
