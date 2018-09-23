import { describe, it } from 'mocha';
import { expect } from 'chai';
import { factory } from 'factory-girl';
import { runGraphQL, expectNoErrors } from '../helpers';
import Url from '../../../src/models/Url';

const mutationQl = `
  mutation createUrl($destination: String!) {
    createUrl(input: { destination: $destination }) {
      url {
        id
        destination
        identifier
        createdAt
      }
    }
  }
`;

describe('CreateUrlMutation', () => {
  it('creates a Url', async () => {
    const res = await runGraphQL(mutationQl, { destination: 'http://jim.bob' });

    expectNoErrors(res);
    const urls = await Url.findAll();
    expect(urls).to.have.lengthOf(1);
    expect(res.body.data.createUrl.url.destination).to.equal('http://jim.bob');
    expect(res.body.data.createUrl.url.identifier).to.equal(urls.at(0).get('identifier'));
    expect(res.body.data.createUrl.url.createdAt).to.be.closeTo(new Date().getTime() / 1000, 2);
    expect(urls.at(0).getRelayId()).to.equal(res.body.data.createUrl.url.id);
  });
});
