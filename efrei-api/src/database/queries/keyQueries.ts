import database from "../database";

export const getAuthorizationsFromKey = (apiKey: string) => {
  const key_id = database("apikeys")
    .where({ key: apiKey })
    .first()
    .select("id");
  if (key_id === undefined) {
    return undefined; // TODO: Throw exception
  }
  return database("apiauthorization")
    .where({ apikey_id: key_id })
    .select("api_authorization");
};
