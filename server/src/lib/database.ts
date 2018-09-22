import Knex from 'knex';
import Bookshelf from 'bookshelf';
import camelcase from 'bookshelf-camelcase';
import * as config from '../config';

const dbConfig = config.get('db');
const connection = dbConfig.connection ? dbConfig.connection : {
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  charset: 'utf8',
};

export const knex = Knex({
  client: dbConfig.client,
  connection: process.env.DATABASE_URL || connection,
  debug: dbConfig.debug,
  useNullAsDefault: true,
});

const bookshelf = Bookshelf(knex);
bookshelf.plugin('registry');
bookshelf.plugin(camelcase);

export default bookshelf;
