const config = require('./src/config');

const dbConfig = config.get('db');

module.exports = {
  client: dbConfig.client,
  connection: process.env.DATABASE_URL || dbConfig,
  migrations: {
    tableName: 'knex_migrations',
  },
};
