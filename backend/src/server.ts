import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const port = 8000;

const server = createServer(app);

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

server.listen(port, () => console.log(`Server running in port ${port}`));
