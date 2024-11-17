/**
 * # data.ts
 *
 * Type definitions and data store.
 */

// TODO: Add some proper type definitions to represent your app's data

/** Data for a user */
export type User = {
  /** The email address of the user */
  email: string
  /**
   * The password of the user.
   *
   * TODO: You should consider hashing and salting this for security reasons.
   */
  password: string
}

/** The overall data for the app */
export type Data = {
  /** Array of users */
  users: User[]
};

/** Returns the default data object */
export function defaultData(): Data {
  return { users: [] };
}

// TODO: Modify these functions to implement persistence (or set up a proper
// database)

/** Returns a reference to the data object */
export function getData(): Data {
  return data;
}

/** Replaces the data object with a new reference */
export function setData(newData: Data) {
  data = newData;
}

// Initialise the data
let data: Data = defaultData();
