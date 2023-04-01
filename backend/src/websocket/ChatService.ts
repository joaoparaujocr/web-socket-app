import { container } from "tsyringe";
import { io } from "../http";
import { CreateChatRoomService } from "../services/CreateChatRoomService";
import { CreateMessageService } from "../services/CreateMessageService";
import { CreateUserService } from "../services/CreateUserService";
import { GetAllUsersService } from "../services/GetAllUsersService";
import { GetChatRoomByIdUsersService } from "../services/GetChatRoomByIdUsersService";
import { GetUserBySocketIdService } from "../services/GetUserBySocketIdService";
import { GetMessagesByRoom } from "../services/GetMessagesByRoom";

io.on("connect", (socket) => {
  socket.on("user_login", async (data, callback) => {
    const { name, avatar, email } = data;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      avatar,
      socketId: socket.id,
    });

    socket.broadcast.emit("new_users", user);
    callback(user);
  });

  socket.on("get_all_user", async (callback) => {
    const getAllUsers = container.resolve(GetAllUsersService);
    const users = await getAllUsers.execute();

    callback(users);
  });

  socket.on("start_chat", async (data, callback) => {
    const createChatRoomService = container.resolve(CreateChatRoomService);
    const getMessagesByRoom = container.resolve(GetMessagesByRoom);
    const getChatRoomByIdUsersService = container.resolve(
      GetChatRoomByIdUsersService
    );
    const getUserBySocketIdService = container.resolve(
      GetUserBySocketIdService
    );

    const userLogged = await getUserBySocketIdService.execute(socket.id);

    let room = await getChatRoomByIdUsersService.execute([
      data.idUser,
      userLogged._id,
    ]);

    if (!room) {
      room = await createChatRoomService.execute([data.idUser, userLogged._id]);
    }

    const messages = await getMessagesByRoom.exetute(room.idChatRoom);

    socket.join(room.idChatRoom);

    callback({ room, messages });
  });

  socket.on("message", async (data) => {
    const createMessageService = container.resolve(CreateMessageService);
    const getUserBySocketIdService = container.resolve(
      GetUserBySocketIdService
    );

    const user = await getUserBySocketIdService.execute(socket.id);
    const message = await createMessageService.execute({
      roomId: data.idChatRoom,
      text: data.message,
      to: user._id,
    });

    io.to(data.idChatRoom).emit("message", {
      message,
      user,
    });
  });
});
