# Fastify Server + Enhance SSR

Use [Enhance](https://enhance.dev)'s renderer as a view engine in a Fastify application.

> 💁  Not to be confused with `@enhance/fastify-plugin`, which offers the full Enhance stack in your Fastify app.

## Example

```js
import Fastify from 'fastify';
import enhanceSsr from 'fastify-enhance-ssr';
import HelloYou from './views/elements/hello-you.js';

const fastify = Fastify();

fastify.register(enhanceSsr, {
  enhanceOptions: {
    elements: { 'hello-you': HelloYou },
  },
});

fastify.get('/', async (_request, reply) => {
  const page = await import('./views/a-page.js');

  reply.enhance(page.default, {
    title: 'Enhance SSR on Fastify',
    user: { name: 'Enhanstify' },
  });
});

fastify.get('/simple', (_request, reply) => {
  reply.enhance('<hello-you></hello-you>');
});

fastify.listen();
```

Also see [`example/server.js`](./example/server.js) for further usage.

## Usage

`fastify-enhance-ssr` adds `reply.enhance`.

### `enhanceSsr` options

```ts
{
  layout: function(body: string, data: object): string,
  enhanceOptions: object,
}
```

### `reply.enhance(body, data, options)`

#### `body`

`string | function(data): string` a string of HTML or a function that returns a string of HTML. This will be passed to Enhance SSR.

#### `data`

`object` state provided to the body, layout, and Enhance (as `initialState`)

#### `options`

`{ layout: function }` override the default layout function
