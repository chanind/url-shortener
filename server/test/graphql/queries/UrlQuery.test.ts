import { describe, it } from 'mocha';
import { expect } from 'chai';
import { factory } from 'factory-girl';
import { runGraphQL, expectNoErrors } from '../helpers';

const nodeQueryQl = `
  query loadUrl($id: ID!) {
    node(id: $id) {
      ... on Url {
        id
        destination
        identifier
        createdAt
      }
    }
  }
`;

describe('UrlQuery', () => {
  it('describes the fields in a url', async () => {
    const url = await factory.create('url', {
      destination: 'http://url.com',
      identifier: 'ABCD',
    });

    const res = await runGraphQL(nodeQueryQl, { id: url.getRelayId() });
    expectNoErrors(res);
    expect(res.body.data.node.id).to.equal(url.getRelayId());
    expect(res.body.data.node.destination).to.equal('http://url.com');
    expect(res.body.data.node.identifier).to.equal('ABCD');
  });
});
