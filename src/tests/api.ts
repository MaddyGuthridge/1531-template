/**
 * # tests / api.ts
 *
 * Helper functions to allow our tests to query our server.
 */
// NOTE: sync-request-curl isn't ideal when developing real-world applications, since synchronous
// code often significantly limits performance in JavaScript.
// Consider using JavaScript's built-in asynchronous Fetch API for doing requests.
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
import request, { Response } from 'sync-request-curl';
import { ip, port } from '../config.json';
import { AccessError, AuthError, DataError } from '../errors';

const BASE = `http://${ip}:${port}`;

/**
 * Handle the response to a sync-request-curl request.
 *
 * Throws the relevant Error type for recognised status codes.
 */
function handleResponse(res: Response): object {
  if (res.statusCode >= 400) {
    // Some kind of error occurred

    // If it's an expected error type
    if ([400, 401, 403].includes(res.statusCode)) {
      const message = JSON.parse(res.body.toString()).error;
      // Convert to required error object
      switch (res.statusCode) {
        case 400: throw new DataError(message);
        case 401: throw new AuthError(message);
        case 403: throw new AccessError(message);
      }
    }
    // Otherwise, it's an unknown error type, so we should throw a generic error.
    throw new Error(`Unknown status code: ${res.statusCode}\n${res.body.toString()}`);
  }

  // Success status code, parse JSON data.
  return JSON.parse(res.body.toString());
}

/** Clear the server, resetting it to its default state */
export function debugClear() {
  return handleResponse(
    request('DELETE', `${BASE}/debug/clear`)
  ) as Record<string, never>;
}

/**
 * Echo a value to the server. This will cause that value to appear in the
 * server logs.
 */
export function debugEcho(value: string) {
  return handleResponse(
    request('GET', `${BASE}/debug/echo`, { qs: { value } })
  ) as { value: string };
}

/** Produce an error with the given status code */
export function debugError(code: number) {
  return handleResponse(
    request('GET', `${BASE}/debug/error`, { qs: { code } })
  ) as { value: string };
}
