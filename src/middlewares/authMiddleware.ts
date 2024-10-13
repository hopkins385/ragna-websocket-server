import { AppRequest } from "../interfaces/AppRequest";
import { JwtToken } from "../interfaces/jwtToken";
import { isValidJwt } from "../utils/validateJwt";
import { Request, Response, NextFunction } from "express";

interface ServerJwtToken extends JwtToken {
  appId?: string;
}

export function authMiddleware(
  req: AppRequest,
  res: Response,
  next: NextFunction
): void {
  const secret = process.env.AUTH_SECRET;
  const token = extractBearerToken(req);
  isValidJwt(token, secret)
    .then((decoded) => {
      const { appId } = decoded as ServerJwtToken;
      if (!appId) {
        res.status(403).json({ error: "invalid appId" });
        return;
      }
      req.appId = appId;
      next();
    })
    .catch((err) => {
      console.error(err.message);
      res.status(403).json({ error: "invalid token" });
      return;
    });
}

function extractBearerToken(req: Request): string {
  const inputToken = req.headers.authorization;
  if (!inputToken) {
    return "";
  }
  // extract bearer token
  const tokenParts = inputToken.split(" ");
  if (tokenParts.length !== 2) {
    return "";
  }
  const tokenType = tokenParts[0];
  const token = tokenParts[1];
  if (tokenType !== "Bearer") {
    return "";
  }
  return token;
}
