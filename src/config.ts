export default {
  /** The IP address to listen on when starting the server */
  ip: process.env.IP ?? '127.0.0.1',
  /** The port to listen on when starting the server */
  port: parseInt(process.env.PORT ?? '3200'),
  /** Whether to enable the server's debug routes, such as echo and clear. */
  debug: true,
  /** Show swagger.yaml documentation when visiting the server root */
  showDocs: true
};
