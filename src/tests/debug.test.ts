/**
 * debug.test.ts
 *
 * Test cases for the debugging routes.
 */

import { AccessError, AuthError, DataError } from '../errors';
import { debugClear, debugEcho, debugError } from './api';

describe('echo', () => {
  test('It returns whatever string it was given.', () => {
    expect(debugEcho('value')).toStrictEqual({ value: 'value' });
  });
});

describe('clear', () => {
  test('It returns an empty object', () => {
    expect(debugClear()).toStrictEqual({});
  });

  // TODO: Add test cases for side effects (deleting users, etc)
});

describe('error', () => {
  test.each([
    { code: 400, errorType: DataError },
    { code: 401, errorType: AuthError },
    { code: 403, errorType: AccessError },
  ])('Requesting a code $code produces a $errorType error', ({ code, errorType }) => {
    expect(() => debugError(code)).toThrow(errorType);
  });

  test('Giving an unknown status code produces an error 500', () => {
    // Produces a generic error
    expect(() => debugError(999)).toThrow(Error);
  });
});
