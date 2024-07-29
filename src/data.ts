/**
 * # data.ts
 *
 * Type definitions and data store.
 */

// TODO: Add some proper type definitions to represent your app's data

/** The overall data for the app */
type Data = {
  /** Array of users */
  users: never[]
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
