import { injectable } from "tsyringe";
import { User } from "../schemas/User";

interface CreateUserDTO {
  email: string;
  socketId: string;
  avatar: string;
  name: string;
}

@injectable()
class CreateUserService {
  async execute({ avatar, socketId, email, name }: CreateUserDTO) {
    const userAlreadyExists = await User.findOne({
      email,
    }).exec();

    if (userAlreadyExists) {
      const user = await User.findOneAndUpdate(
        {
          _id: userAlreadyExists.id,
        },
        {
          $set: {
            socketId,
            avatar,
            name,
          },
        },
        {
          new: true,
        }
      );

      return user;
    }

    const user = await User.create({
      email,
      socketId,
      avatar,
      name,
    });

    return user;
  }
}

export { CreateUserService };
