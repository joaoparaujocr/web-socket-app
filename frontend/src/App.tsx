import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { io } from "socket.io-client";
import ControlRoutes from "./routes";

// const URL =
//   process.env.NODE_ENV === "production" ? undefined : "http://localhost:8000";

const URL = "http://localhost:8000";

function App() {
  const socket = io(URL);
  socket.on("chat_iniciado", (data) => {
    console.log(data);
  });

  return (
    <div className="App">
      <ControlRoutes />
    </div>
  );
}

export default App;
