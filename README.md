# Url Shortener

[Live Demo](https://d37ex9a368voui.cloudfront.net)

This project contains a demo of a Url shortener built using the following technologies:

*Backend*
- Typescript
- Express
- GraphQL + Relay
- Bookshelf (ORM)
- Postgres (DB)
- Mocha + Chai (tests)

*Frontend*
- React (via [create-react-app](https://github.com/facebook/create-react-app))
- Relay
- Flow

# Set up
You can set up the backed with the included docker-compose.yml. On the first run, you'll need to migrate the database though.
That can be done as follows: `docker-compose run --rm backend migrate-latest` in the `server` folder.
You can run backend tests with `docker-compose run --rm backend yarn test`.
Linting can be run with `docker-compose run --rm backend yarn lint`.

The frontend can be set up as follows:
- `cd` into the `client` folder
- `yarn install`
- `yarn compile-relay`
- `yarn start`

# Deploying

You'll need to configure production values in `server/src/config/production.json` for the production database and production website path.
You'll need to add a `.env.production` to `client` to set the production API env var `REACT_APP_API_HOST`.
Then, you can compile a production build of the frontend using `yarn build`.
