/**
 * debug.ts
 *
 * Helper functions for testing and debugging your code.
 */
import { defaultData, setData } from './data';
import { AccessError, AuthError, DataError } from './errors';

/** Clear the data store */
export function clear() {
  setData(defaultData());
}

/**
 * A simple "ping-pong" route to check if the server is able to handle
 * requests.
 *
 * It has been modified to console.log any values that are sent -- perhaps it
 * could be useful for testing, so you can add important data to your server
 * logs.
 */
export function echo(value: string): { value: string } {
  console.log(`\n\n  [ECHO]  ${value}\n`);
  return { value };
}

/**
 * Throws an error with the given status code.
 *
 * This is used to test the error handling logic by intentionally triggering errors. You should not
 * call it from other functions to trigger errors, as it will not provide meaningful error messages.
 */
export function error(code: number) {
  switch (code) {
    case 400: throw new DataError('Intentional 400');
    case 401: throw new AuthError('Intentional 401');
    case 403: throw new AccessError('Intentional 403');
    // For all other codes, give a 500, since we don't have exception types for them
    default: throw new Error(`Unknown error code: ${code}`);
  }
}
