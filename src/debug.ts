/**
 * debug.ts
 *
 * Helper functions for testing and debugging your code.
 */
import { defaultData, setData } from './data';

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
