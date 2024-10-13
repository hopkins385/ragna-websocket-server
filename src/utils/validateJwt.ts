import jwt from "jsonwebtoken";
import { JwtToken } from "../interfaces/jwtToken";

export async function isValidJwt(
  jwtToken: string,
  jwtSecret?: string
): Promise<JwtToken> {
  if (!jwtSecret) {
    throw new Error("jwt secret not set");
  }
  return new Promise((resolve, reject) => {
    jwt.verify(jwtToken, jwtSecret, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve(decoded as JwtToken);
    });
  });
}
