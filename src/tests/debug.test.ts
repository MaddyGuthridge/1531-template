/**
 * debug.test.ts
 *
 * Test cases for the debugging routes.
 */

import { debugClear, debugEcho } from './api';

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
