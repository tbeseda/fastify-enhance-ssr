import Fastify from 'fastify';
import enhanceSsr from '../index.js';
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

fastify.get('/', async (_request, reply) => {
  const page = await import('./views/a-page.js');

  reply.enhance(page.default, {
    title: 'Enhance SSR on Fastify',
    user: { name: 'tbeseda' },
  });
});

fastify.get('/simple', (_request, reply) => {
  reply.enhance('<hello-you></hello-you>');
});

fastify.get('/broken', (_request, reply) => {
  reply.enhance();
});

fastify.listen({ port: 8888 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
