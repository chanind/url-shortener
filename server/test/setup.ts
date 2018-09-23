import { beforeEach } from 'mocha';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import knexCleaner from 'knex-cleaner';
import { knex } from '../src/lib/database';
import './factories';

chai.use(chaiHttp);
chai.use(sinonChai);
chai.use(chaiAsPromised);

// hacky - from https://github.com/mochajs/mocha/issues/1762#issuecomment-363645853
setTimeout(() => {
  before(async () => {
    await knex.migrate.latest();
  });

  beforeEach(async () => {
    await knexCleaner.clean(knex);
  });
}, 0);
