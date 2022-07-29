# Fastify Server + Enhance SSR

Use [Enhance](https://enhance.dev)'s renderer as a view engine in a Fastify application.

💁 Not to be confused with `@enhance/fastify-plugin`.

## Example

```js
import Fastify from 'fastify';
import enhanceSsr from 'fastify-enhance-ssr';
import layout from './views/layout.js';
import HelloYou from './views/elements/hello-you.js';

const fastify = Fastify();

fastify.register(enhanceSsr, {
  layout,
  enhanceOptions: { 
    elements: { 'hello-you': HelloYou },
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

fastify.listen();
```

See [`example/server.js`](./example/server.js)

## Usage

`fastify-enhance-ssr` adds `reply.enhance(page, state)`.

### `enhanceSsr` options
```ts
{
  layout: function(body: string, state: object): string,
  enhanceOptions: object,
}
```

### `reply.enhance(page, state)`

#### page
`string | function(state): string`

#### `state`
`object`
