/**
 * # `server.ts`
 *
 * The entrypoint to the express app.
 *
 * This file is responsible for defining the endpoints of your server.
 */
import express, { json, Response } from 'express';
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
import process from 'process';
import { echo, clear, error } from './debug';
import { handleError } from './errors';

const app = express();
app.use(json());
app.use(cors());
app.use(morgan('dev'));

const PORT: number = parseInt(process.env.PORT || config.port);
const IP: string = process.env.IP || config.ip;

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
// Note that in the real world, you should disable these when your app is running in production.

/** GET /debug/echo?value=ping */
app.get('/debug/echo', (req, res) => {
  withErrorHandler(res, () => {
    res.json(echo(req.query.value as string));
  });
});

/** GET /debug/error?code=401 */
app.get('/debug/error', (req, res) => {
  withErrorHandler(res, () => {
    res.json(error(parseInt(req.query.code as string)));
  });
});

/** DELETE /debug/clear */
app.delete('/debug/clear', (req, res) => {
  withErrorHandler(res, () => {
    clear();
    res.json({});
  });
});

// TODO: Add your routes here
// ==================================================

// Start server
const server = app.listen(PORT, IP, () => {
  console.log(`🐝 Your server is up and running! http://${IP}:${PORT}/`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n🌱 Shutting down server gracefully...');
  server.close(() => {
    console.log('🍂 Goodbye!');
    process.exit();
  });
});
