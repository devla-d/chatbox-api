import express, { NextFunction, Request, Response } from "express";
import * as http from "http";
import socketio from "socket.io";
import upload from "express-fileupload";
import cors from "cors";
import authRouter from "./routes/auth.router";
import handleError from "./middleware/custom-error.middleware";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

const App = http.createServer(app);
export const io = new socketio.Server(App);

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5500"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "src/public")));

app.use(upload());

app.use(authRouter);

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

export default App;
