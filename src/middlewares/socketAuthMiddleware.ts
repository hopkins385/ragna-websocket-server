import { JwtToken } from "../interfaces/jwtToken";
import { isValidJwt } from "../utils/validateJwt";
import type { ExtendedError, Socket } from "socket.io";

declare module "socket.io" {
  interface Socket {
    jwtToken?: JwtToken;
  }
}

export async function socketAuthMiddleware(
  socket: Socket,
  next: (err?: ExtendedError) => void
) {
  const jwtSecret = process.env.AUTH_SECRET || "";
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("token required"));
  }
  try {
    const decoded = await isValidJwt(token, jwtSecret);
    socket.jwtToken = decoded as JwtToken;
    next();
  } catch {
    next(new Error("invalid token"));
  }
}
