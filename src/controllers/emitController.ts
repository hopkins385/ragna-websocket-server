import { Response } from "express";
import { AppRequest } from "../interfaces/AppRequest";
import { Server } from "socket.io";

export function emitController(
  req: AppRequest,
  res: Response,
  io: Server,
  appId: string
) {
  {
    const { appId: paramAppId } = req.params;
    if (paramAppId !== req.appId || paramAppId !== appId) {
      res.status(403).json({ error: "invalid appId" });
      return;
    }
    const { room, event, data } = req.body;
    io.to(room).emit(event, data);
    console.log(`emitted ${event} to room ${room}`);
    res.json({ status: "ok" });
  }
}
