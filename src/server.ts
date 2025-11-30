/**
 * # `server.ts`
 *
 * The entrypoint to the express app.
 *
 * This file is responsible for defining the endpoints of your server.
 */
import fs from 'node:fs';
import path from 'node:path';
import express, { json, Response } from 'express';
import morgan from 'morgan';
import config from './config';
import YAML from 'yaml';
import sui from 'swagger-ui-express';
import cors from 'cors';
import process from 'process';
import { echo, clear } from './debug';
import { handleError } from './errors';

const app = express();
app.use(json());
app.use(cors());
app.use(morgan('dev'));

if (config.showDocs) {
  const file = fs.readFileSync(path.join(process.cwd(), 'openapi.yaml'), 'utf8');
  app.get('/', (req, res) => res.redirect('/docs'));
  app.use(
    '/docs',
    sui.serve,
    sui.setup(YAML.parse(file),
      { swaggerOptions: { docExpansion: 'list' } }
    ));
} else {
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head></head>
      <body>
        <h1>1531 Template Server</h1>
        <p>
          🐝 Congrats on finishing COMP1531! Here's a template that you can use for
          your own projects! Enjoy!
        </p>
      </body>
      </html>
    `);
  });
}

/**
 * Adds the error handler to the given route.
 *
 * This attempts to call `callback`. If any error is thrown, it is passed to `handleError` to send
 * the correct response code.
 */
function withErrorHandler<T>(res: Response, callback: () => T): T | undefined {
  try {
    return callback();
  } catch (err) {
    handleError(res, err);
  }
}

// Debug routes
// ==================================================
// To disable these for production, set `debug` to false in `config.ts`.

if (config.debug) {
  /** GET /debug/echo?value=ping */
  app.get('/debug/echo', (req, res) => {
    withErrorHandler(res, () => {
      res.json(echo(req.query.value as string));
    });
  });

  /** DELETE /debug/clear */
  app.delete('/debug/clear', (req, res) => {
    withErrorHandler(res, () => {
      clear();
      res.json({});
    });
  });
}

// TODO: Add your routes here
// ==================================================

// Start server
const server = app.listen(config.port, config.ip, () => {
  console.log(`🐝 Your server is up and running! http://${config.ip}:${config.port}/`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n🌱 Shutting down server gracefully...');
  server.close(() => {
    console.log('🍂 Goodbye!');
    process.exit();
  });
});
