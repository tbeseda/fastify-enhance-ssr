import functionPlugin from 'fastify-plugin';
import enhance from '@enhance/ssr';

const enhanceSsr = async function (fastify, pluginOptions) {
  const {
    layout = (body) => {
      body;
    },
    enhanceOptions = {},
  } = pluginOptions;

  fastify.decorateReply('enhance', function (payload, state = {}) {
    if (!payload || !['string', 'function'].includes(typeof payload)) {
      throw new Error(
        'fastify.enhance requires a string or function to render',
      );
    }

    const html = enhance({ ...enhanceOptions, initialState: state });
    const body = typeof payload === 'string' ? payload : payload(state);

    this.type('text/html');
    this.send(html`${layout(body, state)}`);
  });
};

export default functionPlugin(enhanceSsr, { name: 'enhance-ssr' });
