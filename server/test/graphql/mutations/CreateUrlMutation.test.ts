import { describe, it } from 'mocha';
import { expect } from 'chai';
import { factory } from 'factory-girl';
import { runGraphQL, expectNoErrors, expectErrors } from '../helpers';
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

  it('errors if the URL does not start with http://, https://, or ftp://', async () => {
    const res = await runGraphQL(mutationQl, { destination: 'jim.bob' });
    expectErrors(res);
    expect(res.body.errors[0].message).to.equal('Destination URL must start with http://, https://, or ftp://');
    const urls = await Url.findAll();
    expect(urls).to.have.lengthOf(0);
  });

  it('errors if the URL is longer than 2048 chars', async () => {
    let url = 'http://bob.com?q=a';
    for (let i = 0; i < 100; i += 1) {
      url += 'abcdefghijklmnopqrstuvwxyz';
    }
    const res = await runGraphQL(mutationQl, { destination: url });
    expectErrors(res);
    expect(res.body.errors[0].message).to.equal('Destination URL has a max length of 2048 characters');
    const urls = await Url.findAll();
    expect(urls).to.have.lengthOf(0);
  });

  it('errors if the URL is invalid', async () => {
    const res = await runGraphQL(mutationQl, { destination: 'http://???' });
    expectErrors(res);
    expect(res.body.errors[0].message).to.equal('Invalid destination URL');
    const urls = await Url.findAll();
    expect(urls).to.have.lengthOf(0);
  });
});
