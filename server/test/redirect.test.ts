import { describe, it } from 'mocha';
import { expect, request } from 'chai';
import { factory } from 'factory-girl';
import * as config from '../src/config';
import app from '../src/app';

// check redirect without following
// based on https://github.com/chaijs/chai-http/issues/112
const expectRedirect = async (req, expectedRedirectUrl) => {
  try {
    const res = await req.redirects(0);
    // If we get here, the test should fail. Just adding here for a nice error message on failure
    expect(res).to.redirectTo(expectedRedirectUrl);
  } catch ({ response }) {
    expect(response).not.to.be.undefined;
    expect(response).to.redirectTo(expectedRedirectUrl);
  }
};

describe('redirect', () => {
  it('redirects requests to /:identifier to the URL destination', async () => {
    factory.create('url', { destination: 'https://xkcd.com/327/', identifier: 'XKCD' });
    const req = request(app)
      .get('/XKCD')
      .set('Accept', 'text/html');
    await expectRedirect(req, 'https://xkcd.com/327/');
  });

  it('redirects requests to the main homepage if no redirect is found', async () => {
    const req = request(app)
      .get('/MEH')
      .set('Accept', 'text/html');
    await expectRedirect(req, config.get('webHost'));
  });
});
