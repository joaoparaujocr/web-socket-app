import { string } from "yup";
import User from "./User";

interface Message {
  created_at: string;
  roomId: string;
  text: string;
  to: string;
  _id: string;
}

export default interface MessageData {
  message: Message;
  user: User;
}
