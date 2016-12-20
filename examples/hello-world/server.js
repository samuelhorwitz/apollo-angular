import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import { schema, resolvers } from './api/schema';

const PORT = 3000;
const app = express();

// GraphQL

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

app.use(bodyParser.json());

app.use('/graphql', bodyParser.json(), graphqlExpress((req) => {
  // Get the query, the same way express-graphql does it
  // https://github.com/graphql/express-graphql/blob/3fa6e68582d6d933d37fa9e841da5d2aa39261cd/src/index.js#L257
  const query = req.query.query || req.body.query;
  if (query && query.length > 2000) {
    // None of our app's queries are this long
    // Probably indicates someone trying to send an overly expensive query
    throw new Error('Query too large.');
  }

  return {
    schema: executableSchema
  };
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

// Static contents
app.use(express.static(appRoot('dist/public')));

app.get('*', (req, res) => {
  res.sendFile(appRoot('src/index.html'));
});

// Server

app.listen(PORT, () => console.log(
  `API Server is now running on http://localhost:${PORT}`
));


function appRoot(relPath) {
  return path.join(__dirname, relPath);
}
