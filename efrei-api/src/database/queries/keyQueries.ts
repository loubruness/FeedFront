import database from "../database";

/**
 * Retrieves the authorizations associated with a given API key.
 *
 * @param apiKey - The API key for which to retrieve authorizations.
 * @returns An array of authorizations associated with the given API key, or `undefined` if the key is not found. // TODO: Implement exception throwing instead of returning undefined.
 *
 * @throws Will throw an error if the API key is not found (TODO: Implement exception throwing).
 */
export const getAuthorizationsFromKey = (apiKey: string) => {
  const keyId = database("apikeys").where({ key: apiKey }).first().select("id");
  if (keyId === undefined) {
    return undefined; // TODO: Throw exception
  }
  return database("apiauthorization")
    .where({ apikey_id: keyId })
    .select("api_authorization");
};
