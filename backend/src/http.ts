import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

const server = createServer(app);

mongoose.connect("mongodb://localhost/websocket");

const optionsCors:
  | cors.CorsOptions
  | cors.CorsOptionsDelegate<cors.CorsRequest> = {
  origin: ["http://localhost:5173"],
};

const io = new Server(server, {
  cors: optionsCors,
});

app.use(cors(optionsCors));

io.on("connection", (socker) => {
  console.log(socker.id);
});

app.get("/", (req, res) => {
  return res.json({
    message: "Hello websocket",
  });
});

export { server, io };
