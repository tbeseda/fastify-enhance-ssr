import functionPlugin from 'fastify-plugin';
import enhance from '@enhance/ssr';

const enhanceSsr = async function (fastify, pluginOptions) {
  const {
    layout = (body) => {
      body;
    },
    enhanceOptions = {},
  } = pluginOptions;

  fastify.decorateReply('enhance', function (
    body,
    data = {},
    { layout: newLayout = null } = {},
  ) {
    if (!body || !['string', 'function'].includes(typeof body)) {
      throw new Error(
        'fastify.enhance requires a string or function to render',
      );
    }

    const html = enhance({ ...enhanceOptions, initialState: data });
    const content = typeof body === 'string' ? body : body(data);
    const thisLayout =
      newLayout && typeof newLayout === 'function' ? newLayout : layout;

    this.type('text/html');
    this.send(html`${thisLayout(content, data)}`);
  });
};

export default functionPlugin(enhanceSsr, { name: 'enhance-ssr' });
