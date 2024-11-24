import { Request, Response, NextFunction } from "express";
import authorizations from "../util/authorizations";

// TODO: Move this somewhere else once the database is done
const user_authorizations: Array<{
  key: string;
  authorizations: Array<authorizations>;
}> = [
  {
    key: "apikey",
    authorizations: [authorizations.API_USER_READ],
  },
];

const authenticate = (...required_authorizations: Array<authorizations>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers["x-api-key"];

    const current_user_authorizations = user_authorizations.find(
      (user) => user.key === apiKey
    )?.authorizations;

    if (apiKey && current_user_authorizations) {
      // Authenticated

      // Check if the required permission is present
      required_authorizations.forEach((authorization) => {
        if (!current_user_authorizations.includes(authorization)) {
          res.status(401).json({
            message: "Unauthorized",
            missing_authorizations: authorization,
          });
        }
      });

      // For future reference, but shouldn't be used directly if possible
      res.locals.authorizations = current_user_authorizations;
      next();
    } else {
      res.status(401).json({
        message: "Unauthenticated",
        reason: "The api key is missing or invalid.",
      });
    }
  };
};

export { authenticate };
