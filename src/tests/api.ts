/**
 * # tests / api.ts
 *
 * Helper functions to allow our tests to query our server.
 */
import request, { Response } from 'sync-request-curl';
import { ip, port } from '../config.json';

const BASE = `http://${ip}:${port}`;

/**
 * Handle the response to a sync-request-curl request.
 *
 * Returns the status code for status >= 400, and the JSON.parse'd body
 * otherwise.
 */
function handleResponse(res: Response): number | object {
  if (res.statusCode >= 400) {
    return res.statusCode;
  }

  return JSON.parse(res.body.toString());
}

/** Clear the server, resetting it to its default state */
export function debugClear() {
  return handleResponse(
    request('DELETE', `${BASE}/debug/clear`)
  ) as number | Record<string, never>;
}

/**
 * Echo a value to the server. This will cause that value to appear in the
 * server logs.
 */
export function debugEcho(value: string) {
  return handleResponse(
    request('GET', `${BASE}/debug/echo`, { qs: { value } })
  ) as number | { value: string };
}
