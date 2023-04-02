import { useContext, useEffect, useRef, useState } from "react";
import UserItem from "../../components/UserItem";
import { UserContext } from "../../context/userContext";
import { socket } from "../../socket";
import MainContainer from "./styles";
import UserDefault from "../../assets/user-default.jpg";
import UserInterface from "../../interfaces/User";
import MessageData, { Message } from "../../interfaces/Message";
import Room from "../../interfaces/Room";
import React from "react";
import NotificationMsg from "../../interfaces/Notification";

interface StartChatData {
  messages: Message[];
  room: Room;
}

const Chat = () => {
  const { infoUser } = useContext(UserContext);
  const [idChatRoom, setIdChatRoom] = useState<string>();
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userSelected, setUserSelected] = useState<UserInterface>(
    {} as UserInterface
  );

  const selectUser = (user: UserInterface) => {
    const idUser = user._id;
    const filterUser = users.filter((userObj) => userObj._id !== user._id);
    setUsers([...filterUser, { ...user, newMessage: false }]);
    socket.emit(
      "start_chat",
      { idUser },
      ({ messages, room }: StartChatData) => {
        setIdChatRoom(room.idChatRoom);
        setMessages(messages);
        setUserSelected(user);
      }
    );
  };

  const submitMenssage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const message = inputRef.current.value;
      const data = {
        message,
        idChatRoom,
      };

      socket.emit("message", data);

      inputRef.current.value = "";
    }
  };

  const newUsers = (data: UserInterface) => {
    setUsers((prev) => [...prev.filter((user) => user._id !== data._id), data]);
  };

  const getAllUsers = (data: UserInterface[]) => {
    const excludeUsers = data.filter((user) => {
      return user.email !== infoUser.email;
    });
    setUsers([...excludeUsers]);
  };

  useEffect(() => {
    if (infoUser.email) {
      socket.emit("get_all_user", getAllUsers);

      socket.on("new_users", newUsers);
    }

    return () => {
      socket.off("new_users", newUsers);
      socket.off("get_all_user", getAllUsers);
    };
  }, [infoUser]);

  useEffect(() => {
    socket.on("message", ({ message }: MessageData) => {
      if (message.roomId === idChatRoom) {
        setMessages((prev) => [...prev, message]);
      }
    });

    socket.on("notification", (data: NotificationMsg) => {
      if (data.from._id !== infoUser._id && data.roomId !== idChatRoom)
        setUsers((prev) => [
          ...prev.filter((user) => user._id !== data.from._id),
          { ...data.from, newMessage: data.newMessage },
        ]);
    });

    return () => {
      socket.off("message");
      socket.off("notification");
    };
  }, [userSelected]);

  return (
    <MainContainer>
      <aside>
        <ul>
          {users.map((userItems) => {
            return (
              <UserItem
                newMessage={userItems.newMessage}
                isSelected={userItems._id === userSelected._id}
                key={userItems._id}
                name={userItems.name}
                imgUrl={userItems.avatar || UserDefault}
                onClickEvent={() => selectUser(userItems)}
              />
            );
          })}
        </ul>

        <div>
          <p>{infoUser.name}</p>
          <img src={infoUser.avatar || UserDefault} alt="" />
        </div>
      </aside>
      <div>
        <ul>
          {messages.length > 0 && (
            <React.Fragment>
              {messages?.map((message) => (
                <li
                  key={message._id}
                  className={`${
                    message.to._id === infoUser._id ? "me" : "user"
                  }`}
                >
                  <p>{message.text}</p>
                </li>
              ))}
            </React.Fragment>
          )}
        </ul>
        <input
          ref={inputRef}
          type="text"
          onKeyDown={(e) => submitMenssage(e)}
          placeholder="Digite sua mensagem"
        />
      </div>
    </MainContainer>
  );
};

export default Chat;
