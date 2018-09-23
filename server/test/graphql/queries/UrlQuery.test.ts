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

const identifierQueryQl = `
  query loadUrl($identifier: String!) {
    urlByIdentifier(identifier: $identifier) {
      id
      destination
      identifier
      createdAt
    }
  }
`;

describe('UrlQuery', () => {
  it('can load a Url by its node ID', async () => {
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

  it('can load a Url by its identifier', async () => {
    const url = await factory.create('url', { identifier: 'OMG' });

    const res = await runGraphQL(identifierQueryQl, { identifier: 'OMG' });
    expectNoErrors(res);
    expect(res.body.data.urlByIdentifier.id).to.equal(url.getRelayId());
    expect(res.body.data.urlByIdentifier.identifier).to.equal('OMG');
  });

  it('works even if identifier capitalization is wrong', async () => {
    const url = await factory.create('url', { identifier: 'OMG' });

    const res = await runGraphQL(identifierQueryQl, { identifier: 'omG' });
    expectNoErrors(res);
    expect(res.body.data.urlByIdentifier.id).to.equal(url.getRelayId());
    expect(res.body.data.urlByIdentifier.identifier).to.equal('OMG');
  });

  it('returns null if identifier is incorrect', async () => {
    await factory.create('url', { identifier: 'OMG' });

    const res = await runGraphQL(identifierQueryQl, { identifier: 'WRONG' });
    expectNoErrors(res);
    expect(res.body.data.urlByIdentifier).to.be.null;
  });
});
