import express, { NextFunction, Request, Response } from "express";
import * as http from "http";
import socketio from "socket.io";
import webpush from "web-push";
import cors from "cors";
import dBInit from "./src/config/db.init";
import authRouter from "./src/routes/auth.router";
import handleError from "./src/middleware/custom-error.middleware";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const server = http.createServer(app);
export const io = new socketio.Server(server);

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5500"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRouter);

const publicVapidKey = process.env.VAPID_PUBLIC_KEY as string;

const privateVapidKey = process.env.VAPID_PRIVATE_KEY as string;

webpush.setVapidDetails(
  "mailto:samuelaniekan680@gmail.com",
  publicVapidKey,
  privateVapidKey
);
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({
    title: "Hello World",
    body: "This is your first push notification",
  });

  webpush.sendNotification(subscription, payload).catch(console.log);
});

io.on("connection", (socket) => {
  console.log("Connected to ws");
  socket.emit("message", "Welcome");
  socket.broadcast.emit("message", "a user joined");
  socket.on("ChatMsg", (msg) => {
    console.log(msg);
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("message", "a user left");
  });
});

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ url: req.originalUrl + " not found" });
  next();
});
app.use(handleError);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  dBInit();
});
