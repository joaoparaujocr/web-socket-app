import User from "./User";

export default interface NotificationMsg {
  from: User;
  newMessage: boolean;
  roomId: string;
}
