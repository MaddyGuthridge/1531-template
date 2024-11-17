/**
 * errors.ts
 *
 * Contains definitions for various error types, which can be handled by the server in order to send
 * specific error codes.
 */

import { Response } from 'express';

/**
 * An error with data validity.
 *
 * This gets converted to an error 400 by the server.
 */
export class DataError extends Error { }

/**
 * An error with authentication or tokens.
 *
 * This gets converted to an error 401 by the server.
 */
export class AuthError extends Error { }

/**
 * An error indicating a permission issue (ie the user does not have permission to perform the
 * requested action).
 *
 * This gets converted to an error 403 by the server.
 */
export class AccessError extends Error { }

/**
 * A helper function to handle errors by sending the corresponding response code.
 *
 * If the error is unrecognised, it is thrown again, in order to be handled by Express. That way,
 * errors aren't inadvertently silenced.
 */
export function handleError(res: Response, err: unknown) {
  if (err instanceof DataError) {
    return res.status(400).json({ error: err.message });
  }
  if (err instanceof AuthError) {
    return res.status(401).json({ error: err.message });
  }
  if (err instanceof AccessError) {
    return res.status(403).json({ error: err.message });
  }
  // Unrecognised error -- we throw it again so that the error can be handled by Express
  throw err;
}
