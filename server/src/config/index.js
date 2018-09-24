const convict = require('convict');

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3001,
    env: 'PORT',
    arg: 'port',
  },
  webHost: {
    doc: 'The hostname for the website frontend',
    format: String,
    default: 'http://localhost:3000',
    env: 'WEB_HOST',
  },
  db: {
    debug: {
      doc: 'Turn on bookshelf debugging',
      format: Boolean,
      default: false,
    },
    ssl: {
      doc: 'use SSL',
      format: Boolean,
      default: true,
    },
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: '127.0.0.1',
      env: 'DB_HOST',
    },
    database: {
      doc: 'Database name',
      format: String,
      default: 'url_shortener',
      env: 'DB_NAME',
    },
    port: {
      doc: 'Database port',
      format: Number,
      default: 5432,
      env: 'DB_PORT',
    },
    user: {
      doc: 'Database user',
      format: String,
      default: 'app',
      env: 'DB_USER',
    },
    password: {
      doc: 'Database password',
      format: String,
      default: 'app_pw',
      sensitive: true,
      env: 'DB_PASSWORD',
    },
    connection: {
      doc: 'Override DB connection string. Only used for sqlite3 tests',
      format: '*',
      default: null,
    },
    client: {
      doc: 'db client. Either pg or sqlite3',
      format: ['pg', 'sqlite3'],
      default: 'pg',
    },
  },
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile(`./src/config/${env}.json`);

// Perform validation
config.validate({allowed: 'strict'});

module.exports = config;
