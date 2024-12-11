import { Request, Response, NextFunction } from "express";
import authorizations from "../util/authorizations";
import { getAuthorizationsFromKey } from "../database/queries/keyQueries";

const authenticate = (
  ...requiredRouteAuthorizations: Array<authorizations>
) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const apiKey = request.headers["x-api-key"];

    // We check if the key is present and a string
    if (typeof apiKey === "string" && apiKey !== "") {
      // We get the authorizations from the key
      getAuthorizationsFromKey(apiKey).then(
        (clientApiAuthorizations: Array<{ api_authorization: string }>) => {
          // Check if the required permission is present
          const missingAuthorizations = requiredRouteAuthorizations.filter(
            (authorization) =>
              !clientApiAuthorizations
                .map((a) => a.api_authorization)
                .includes(authorization)
          );

          if (missingAuthorizations.length > 0) {
            // There is at least one missing permission, so the request is unauthorized
            return response.status(401).json({
              message: "Unauthorized",
              missing_authorizations: missingAuthorizations,
            });
          }

          // For future reference, but shouldn't be used directly if possible
          response.locals.authorizations = clientApiAuthorizations;
          next();
        }
      );
    } else {
      // The key was not provided.
      response.status(401).json({
        message: "Unauthenticated",
        reason: "The api key is missing.",
      });
    }
  };
};

export { authenticate };
