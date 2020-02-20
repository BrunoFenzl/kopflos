import Koa from 'koa';
import KoaRouter from 'koa-router';
import { ApolloServer } from 'apollo-server-koa';
import schema from './schema';
import { errorHandler as formatError } from './errors';
import mongoose from 'mongoose';

async function main() {
  const app = App();
  const port = process.env.PORT || 9000;

  app.listen(port);

  console.log(`listening on port ${port}`);

  mongoose.connect(process.env.MONGO_URL);
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Database connected.');
  });
}

export function App(): Koa {
  const app = new Koa();
  const router = new KoaRouter();
  const server = new ApolloServer({
    schema,
    context: ({ ctx }) => ctx, // returns koa context
    formatError,
  });

  router.get('/health', ctxt => {
    ctxt.body = 'ok';
  });

  router.post('/graphql', server.getMiddleware());
  router.get('/graphql', server.getMiddleware());

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

if (require.main === module) {
  main();
}