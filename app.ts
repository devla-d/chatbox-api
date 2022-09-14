import express, { NextFunction, Request, Response } from "express";
import * as WebSocket from "ws";
import * as http from "http";
import cors from "cors";
import dBInit from "./src/config/db.init";
import authRouter from "./src/routes/auth.router";
import handleError from "./src/middleware/custom-error.middleware";

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const corsOptions = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRouter);

wss.on("connection", (ws: WebSocket) => {
  //connection is up, let's add a simple simple event
  ws.on("message", (message: string) => {
    //log the received message and send it back to the client

    console.log("received: %s", message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  //send immediatly a feedback to the incoming connection
  ws.send("Hi there, I am a WebSocket server");
});

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ url: req.originalUrl + " not found" });
  next();
});
app.use(handleError);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
  dBInit()
    .then(() => {
      // syncDb();
      console.log("Authenticated successfully");
    })
    .catch((e) => {
      console.log(e);
    });
});
