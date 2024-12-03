import { Request, Response, NextFunction } from "express";
import authorizations from "../util/authorizations";

// TODO: Move this somewhere else once the database is done
const apiAuthorizationsFromKey: Array<{
  key: string;
  authorizations: Array<authorizations>;
}> = [
  {
    key: "apikey",
    authorizations: [authorizations.API_USER_READ],
  },
];

const authenticate = (
  ...requiredRouteAuthorizations: Array<authorizations>
) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const apiKey = request.headers["x-api-key"];

    const clientApiAuthorizations = apiAuthorizationsFromKey.find(
      (user) => user.key === apiKey
    )?.authorizations;

    if (apiKey && clientApiAuthorizations) {
      // Authenticated

      // Check if the required permission is present
      requiredRouteAuthorizations.forEach((authorization) => {
        if (!clientApiAuthorizations.includes(authorization)) {
          response.status(401).json({
            message: "Unauthorized",
            missing_authorizations: authorization,
          });
        }
      });

      // For future reference, but shouldn't be used directly if possible
      response.locals.authorizations = clientApiAuthorizations;
      next();
    } else {
      response.status(401).json({
        message: "Unauthenticated",
        reason: "The api key is missing or invalid.",
      });
    }
  };
};

export { authenticate };
