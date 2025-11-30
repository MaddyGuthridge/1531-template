/**
 * Docs middleware
 *
 * This file provides middleware for displaying the OpenAPI (Swagger) documentation.
 */
import { Router } from 'express';
import sui from 'swagger-ui-express';

const opts = {
  swaggerOptions: {
    docExpansion: 'list',
    url: '/docs/openapi.yaml',
  },
};

export default function docs() {
  const router = Router();

  router.get('/', (req, res) => res.redirect('/docs'));

  router.get('/docs/openapi.yaml', (req, res) => {
    res.sendFile('openapi.yaml', { root: process.cwd() });
  });

  router.use(
    '/docs',
    sui.serve,
    sui.setup(null, opts)
  );

  return router;
}
