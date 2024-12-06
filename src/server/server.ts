import { createServer } from 'node:http';
import { createApp, createRouter, defineEventHandler, toNodeListener } from 'h3';

const app = createApp();

const router = createRouter();
app.use(router);

router.get(
  '/',
  defineEventHandler(() => {
    return { hello: 'world' };
  }),
);

createServer(toNodeListener(app)).listen(3000);
