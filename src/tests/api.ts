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
import config from '../config';
import { errorToStatus } from '../errors';

const BASE = `http://${config.ip}:${config.port}`;

/**
 * Handle the response to a sync-request-curl request.
 *
 * Throws the relevant Error type for recognised status codes.
 */
function handleResponse(res: Response): object {
  if (res.statusCode >= 400) {
    // Some kind of error occurred

    // If it's an expected error type
    if (res.statusCode < 500) {
      const e = res.getJSON();
      // Ensure the correct status code is given, and that the object matches the desired
      // error object shape
      expect(e).toStrictEqual({ error: expect.any(String), message: expect.any(String) });
      expect(errorToStatus(e.error)).toStrictEqual(res.statusCode);
      return e;
    } else {
      // Otherwise, it's an unknown error type, so we should throw a generic error.
      throw new Error(`Unexpected status code ${res.statusCode}:\n${res.body.toString()}`);
    }
  }

  // Success status code, parse JSON data.
  return res.getJSON();
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
