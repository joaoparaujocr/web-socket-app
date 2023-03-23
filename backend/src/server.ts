import { server } from "./http";
import "./websocket/ChatService";

const port = 8000;

server.listen(port, () => console.log(`Server running in port ${port}`));
