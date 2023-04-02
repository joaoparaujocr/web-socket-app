import { string } from "yup";
import User from "./User";

export interface Message {
  created_at: string;
  roomId: string;
  text: string;
  to: User;
  _id: string;
}

export default interface MessageData {
  message: Message;
  user: User;
}
