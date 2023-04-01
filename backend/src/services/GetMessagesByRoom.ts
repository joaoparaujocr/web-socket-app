import { injectable } from "tsyringe";
import { Message } from "../schemas/Message";

@injectable()
class GetMessagesByRoom {
  async exetute(roomId: string) {
    const messages = await Message.find({
      roomId,
    })
      .populate("to")
      .exec();

    return messages;
  }
}

export { GetMessagesByRoom };
