import { useContext, useEffect, useRef, useState } from "react";
import UserItem from "../../components/UserItem";
import { UserContext } from "../../context/userContext";
import { socket } from "../../socket";
import MainContainer from "./styles";
import UserDefault from "../../assets/user-default.jpg";
import UserInterface from "../../interfaces/User";
import MessageData from "../../interfaces/Message";

interface StartChatData {}

const Chat = () => {
  const { infoUser } = useContext(UserContext);
  const [idChatRoom, setIdChatRoom] = useState<string>();
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [userSelected, setUserSelected] = useState<UserInterface>(
    {} as UserInterface
  );
  const [allMessages, setAllMessages] = useState<MessageData[]>([]);
  const [messagesToRoom, setMessagesToRoom] = useState<MessageData[]>([]);

  const selectUser = (user: UserInterface) => {
    const idUser = user._id;
    socket.emit("start_chat", { idUser }, (data: any) => {
      console.log(data);
      setIdChatRoom(data.idChatRoom);
      setUserSelected(user);
    });
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

      socket.on("message", (data) => {
        setAllMessages((prev) => [...prev, data]);
      });
    }

    return () => {
      socket.off("new_users", newUsers);
      socket.off("get_all_user", getAllUsers);
      socket.off("message");
    };
  }, [infoUser]);

  return (
    <MainContainer>
      <aside>
        <input type="text" placeholder="Digite seu email" />
        <ul>
          {users.map((userItems) => (
            <UserItem
              isSelected={userItems._id === userSelected._id}
              key={userItems._id}
              name={userItems.name}
              imgUrl={userItems.avatar || UserDefault}
              onClickEvent={() => selectUser(userItems)}
            />
          ))}
        </ul>

        <div>
          <p>{infoUser.name}</p>
          <img src={infoUser.avatar || UserDefault} alt="" />
        </div>
      </aside>
      <div>
        <ul>
          {allMessages
            .filter((message) => message.message.roomId === idChatRoom)
            .map((message) => (
              <li
                key={message.message._id}
                className={`${
                  message.user._id === infoUser._id ? "me" : "user"
                }`}
              >
                <p>{message.message.text}</p>
              </li>
            ))}
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
