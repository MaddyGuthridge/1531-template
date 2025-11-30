/**
 * errors.ts
 *
 * Contains definitions for various error types, which can be handled by the server in order to send
 * specific error codes.
 */

import { Response } from 'express';

/**
 * A dedicated error class, which can be used to discern expected errors caused by our server's
 * logic from unexpected errors caused by bugs.
 *
 * ## Usage:
 *
 * ```ts
 * throw new ServerError('UNAUTHORIZED', 'A token was provided, but it is invalid.');
 * ```
 */
export class ServerError extends Error {
  /** The error type, for example 'UNAUTHORIZED' */
  error: string;
  /** A human-friendly error message, for example 'A token was provided, but it is invalid.' */
  message: string;

  constructor(error: string, message: string) {
    super(message);
    this.error = error;
    this.message = message;
  }
}

export function errorToStatus(e: string): number {
  switch (e) {
    // TODO: Add other error types here
    case 'UNAUTHORIZED':
      return 401;
    // If we don't recognise the error type, we should give an error to help us find the place where
    // we need to add the mapping.
    default:
      throw new Error(`Missing status code definition for error type '${e}'!`);
  }
}

/**
 * A helper function to handle errors by sending the corresponding response code.
 *
 * If the error is unrecognised, it is thrown again, in order to be handled by Express. That way,
 * errors aren't inadvertently silenced.
 */
export function handleError(res: Response, err: unknown) {
  if (err instanceof ServerError) {
    return res.status(errorToStatus(err.error)).json({ error: err.message });
  }
  // Unrecognised error -- we throw it again so that the error can be handled by Express
  throw err;
}
