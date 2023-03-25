import { container } from "tsyringe";
import { io } from "../http";
import { CreateUserService } from "../services/CreateUserService";

io.on("connect", (socket) => {
  socket.on("user_login", async (data) => {
    const { name, avatar, email } = data;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      avatar,
      socketId: socket.id,
    });

    console.log(user);
  });
});
