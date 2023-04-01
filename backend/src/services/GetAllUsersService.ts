import { injectable } from "tsyringe";
import { User } from "../schemas/User";

@injectable()
class GetAllUsersService {
  async execute() {
    const getAllUsers = User.find();
    return getAllUsers;
  }
}

export { GetAllUsersService };
