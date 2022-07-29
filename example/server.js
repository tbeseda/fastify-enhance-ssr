import Fastify from 'fastify';
import enhanceSsr from '../index.js';
// import enhanceSsr from 'fastify-enhance-ssr';
import styleTransform from '@enhance/enhance-style-transform';

import logger from './lib/logger.js';

import layout from './views/layout.js';
import elements from './views/elements/index.js';

const fastify = Fastify({ logger });

fastify.register(enhanceSsr, {
  layout,
  enhanceOptions: {
    elements,
    styleTransforms: [styleTransform],
  },
});

fastify.get('/', (_request, reply) => {
  reply.enhance('<hello-you color="DodgerBlue" uid="a1"></hello-you>');
});

fastify.get('/advanced', async (_request, reply) => {
  const page = await import('./views/a-page.js');
  const darkLayout = await import('./views/dark-layout.js');

  reply.enhance(
    page.default,
    {
      title: 'Enhance SSR on Fastify',
      user: { name: 'Enhanstify' },
    },
    { layout: darkLayout.default },
  );
});

fastify.get('/broken', (_request, reply) => {
  reply.enhance(); // ! throws
});

fastify.listen({ port: 8888 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
