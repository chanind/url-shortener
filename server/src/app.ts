import express from 'express';
import graphQLHTTP from 'express-graphql';
import cors from 'cors';
import * as config from './config';
import schema from './graphql/schema';
import Url from './models/Url';

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

// url redirect happens here - this is done on the backend for efficiency. No need to load JS to do a redirect
app.use('/:identifier', async (req, res, next) => {
  const identifier = req.params.identifier.toUpperCase();
  const url = await Url.findOne({ identifier });
  if (url) {
    res.redirect(url.get('destination'));
  } else {
    // if we didn't find a URL, just fall through to redirect the user to our frontend homepage
    next();
  }
});

app.use('*', (_req, res) => {
  // In all other cases, just redirect to our frontend homepage
  res.redirect(config.get('webHost'));
});

export default app;
