import type { Socket, Server } from "socket.io";

export function socketOnConnectionController(socket: Socket, io: Server) {
  const userId = socket?.jwtToken?.userId || null;
  const username = socket?.jwtToken?.userName || null;
  const roles = socket?.jwtToken?.roles || null;

  socket.on("disconnect", () => {
    console.log(`user ${userId} disconnected`);
  });

  socket.on("join", (roomId) => {
    if (roomId === `user:${userId}`) {
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
    } else {
      console.log(
        `User ${userId} attempted to join unauthorized room ${roomId}`
      );
    }
  });
}
