import { describe, it } from 'mocha';
import { expect } from 'chai';
import { factory } from 'factory-girl';
import { runGraphQL, expectNoErrors } from '../helpers';

const urlIdentifierQueryQl = `
  query urlByIdentifier($identifier: String!) {
    urlByIdentifier(identifier: $identifier) {
      id
      destination
      identifier
      createdAt
    }
  }
`;

const allUrlsQueryQl = `
  query allUrls($first: Int, $after: String) {
    allUrls(first: $first, after: $after) {
      edges {
        node {
          id
        }
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

describe('urlByIdentifier', () => {
  it('loads a Url by its identifier', async () => {
    const url = await factory.create('url', { identifier: 'OMG' });

    const res = await runGraphQL(urlIdentifierQueryQl, { identifier: 'OMG' });
    expectNoErrors(res);
    expect(res.body.data.urlByIdentifier.id).to.equal(url.getRelayId());
    expect(res.body.data.urlByIdentifier.identifier).to.equal('OMG');
  });

  it('works even if identifier capitalization is wrong', async () => {
    const url = await factory.create('url', { identifier: 'OMG' });

    const res = await runGraphQL(urlIdentifierQueryQl, { identifier: 'omG' });
    expectNoErrors(res);
    expect(res.body.data.urlByIdentifier.id).to.equal(url.getRelayId());
    expect(res.body.data.urlByIdentifier.identifier).to.equal('OMG');
  });

  it('returns null if identifier is incorrect', async () => {
    await factory.create('url', { identifier: 'OMG' });

    const res = await runGraphQL(urlIdentifierQueryQl, { identifier: 'WRONG' });
    expectNoErrors(res);
    expect(res.body.data.urlByIdentifier).to.be.null;
  });
});

describe('allUrls', () => {
  it('loads a list of all the urls in the system, sorted by ID, latest first', async () => {
    const url1 = await factory.create('url');
    const url2 = await factory.create('url');

    const res = await runGraphQL(allUrlsQueryQl);
    expectNoErrors(res);
    expect(res.body.data.allUrls.edges).to.have.lengthOf(2);
    expect(res.body.data.allUrls.edges[0].node.id).to.equal(url2.getRelayId());
    expect(res.body.data.allUrls.edges[1].node.id).to.equal(url1.getRelayId());
    expect(res.body.data.allUrls.pageInfo.hasNextPage).to.be.false;
  });

  it('allows forward pagination across the list', async () => {
    const url1 = await factory.create('url');
    const url2 = await factory.create('url');
    const url3 = await factory.create('url');
    const url4 = await factory.create('url');
    const url5 = await factory.create('url');

    const res1 = await runGraphQL(allUrlsQueryQl, { first: 2 });
    expectNoErrors(res1);
    expect(res1.body.data.allUrls.edges).to.have.lengthOf(2);
    expect(res1.body.data.allUrls.edges[0].node.id).to.equal(url5.getRelayId());
    expect(res1.body.data.allUrls.edges[1].node.id).to.equal(url4.getRelayId());
    expect(res1.body.data.allUrls.pageInfo.hasNextPage).to.be.true;

    const endCursor1 = res1.body.data.allUrls.pageInfo.endCursor;
    const res2 = await runGraphQL(allUrlsQueryQl, { first: 2, after: endCursor1 });
    expect(res2.body.data.allUrls.edges).to.have.lengthOf(2);
    expect(res2.body.data.allUrls.edges[0].node.id).to.equal(url3.getRelayId());
    expect(res2.body.data.allUrls.edges[1].node.id).to.equal(url2.getRelayId());
    expect(res2.body.data.allUrls.pageInfo.hasNextPage).to.be.true;

    const endCursor2 = res2.body.data.allUrls.pageInfo.endCursor;
    const res3 = await runGraphQL(allUrlsQueryQl, { first: 2, after: endCursor2 });
    expect(res3.body.data.allUrls.edges).to.have.lengthOf(1);
    expect(res3.body.data.allUrls.edges[0].node.id).to.equal(url1.getRelayId());
    expect(res3.body.data.allUrls.pageInfo.hasNextPage).to.be.false;
  });
});
