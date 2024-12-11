import { Request, Response, NextFunction } from "express";
import authorizations from "../util/authorizations";
import { getAuthorizationsFromKey } from "../database/queries/keyQueries";

/**
 * Middleware to authenticate requests based on API key and required authorizations.
 *
 * @param {...Array<authorizations>} requiredRouteAuthorizations - The list of required authorizations for the route.
 * @returns {Function} Middleware function to handle authentication.
 *
 * @example
 * // Usage in an Express route
 * app.get('/protected-route', authenticate(authorizations.API_USER_READ), (request, response) => {
 *   response.send('This is a protected route');
 * });
 *
 * @remarks
 * This middleware checks for the presence of an API key in the request headers.
 * If the key is present, it retrieves the associated authorizations and checks if the required authorizations are met.
 * If any required authorization is missing, it responds with a 401 status and a message indicating the missing authorizations.
 * If the API key is missing, it responds with a 401 status and a message indicating the key is missing.
 *
 * @param {Request} request - The Express request object.
 * @param {Response} response - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 */
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
