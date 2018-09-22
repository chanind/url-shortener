import express from 'express';
import graphQLHTTP from 'express-graphql';
import cors from 'cors';
import * as config from './config';
import schema from './graphql/schema';

const app = express();

app.use(cors());

app.use(
  '/api/graphql',
  graphQLHTTP({
    schema,
    pretty: true,
    graphiql: true,
    formatError: (error) => {
      if (config.get('env') === 'development') {
        // eslint-disable-next-line
        console.log(error);
      }
      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path,
      };
    },
  }),
);

export default app;
