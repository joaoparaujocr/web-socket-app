import { injectable } from "tsyringe";
import { Message } from "../schemas/Message";

interface CreateMessageDTO {
  to: string;
  text: string;
  roomId: string;
}

@injectable()
class CreateMessageService {
  async execute({ text, roomId, to }: CreateMessageDTO) {
    const message = await Message.create({
      to,
      text,
      roomId,
    });

    return message;
  }
}

export { CreateMessageService };
