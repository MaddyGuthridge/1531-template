/**
 * # `server.ts`
 *
 * The entrypoint to the express app.
 *
 * This file is responsible for defining the endpoints of your server.
 */
import express, { json } from 'express';
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
import process from 'process';
import { echo, clear } from './debug';

const app = express();
app.use(json());
app.use(cors());
app.use(morgan('dev'));

const PORT: number = parseInt(process.env.PORT || config.port);
const IP: string = process.env.IP || config.ip;

// Debug routes
// ==================================================

app.get('/debug/echo', (req, res) => {
  res.json(echo(req.query.value as string));
});

app.delete('/debug/clear', (req, res) => {
  clear();
  res.json({});
});

// TODO: Add your routes here
// ==================================================

// start server
const server = app.listen(PORT, IP, () => {
  console.log(`Your server is up and running at 'http://${IP}:${PORT}/'`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Shutting down server gracefully.');
    process.exit();
  });
});
