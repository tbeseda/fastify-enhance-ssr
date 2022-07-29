const DEVELOPMENT = 'development';
const environment = process.env.NODE_ENV || DEVELOPMENT;

export default {
  transport:
    environment === DEVELOPMENT ? {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    } : undefined,
}
