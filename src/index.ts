import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { socketAuthMiddleware } from "./middlewares/socketAuthMiddleware";
import { socketOnConnectionController } from "./controllers/socketOnConnectionController";
import { authMiddleware } from "./middlewares/authMiddleware";
import { AppRequest } from "./interfaces/AppRequest";
import { emitController } from "./controllers/emitController";

require("dotenv").config();

const port: number = Number(process.env.WEBSOCKET_PORT) || 3030;
const corsOrigin: string = process.env.WEBSOCKET_ORIGIN || "*";
const appId: string = process.env.AUTH_APP_ID || "default";

const app = express();
app.use(express.json());
app.use(authMiddleware);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
  },
});

io.use(socketAuthMiddleware);
io.on("connection", (socket) => socketOnConnectionController(socket, io));

app.post("/emit/:appId", (req: AppRequest, res) =>
  emitController(req, res, io, appId)
);

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
