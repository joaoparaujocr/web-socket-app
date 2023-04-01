import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import User from "../interfaces/User";

interface IInfoUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
}

interface IUserContext {
  infoUser: IInfoUser;
  setInfoUSer: React.Dispatch<React.SetStateAction<IInfoUser>>;
}

interface UserProviderContext {
  children: JSX.Element;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

const UserProvider = ({ children }: UserProviderContext) => {
  const navigate = useNavigate();
  const [infoUser, setInfoUSer] = useState({} as IInfoUser);

  useEffect(() => {
    const userStorage = localStorage.getItem("@userWebSocket");

    if (userStorage) {
      const userParse = JSON.parse(userStorage);
      socket.emit("user_login", userParse, (data: User) => {
        setInfoUSer(data);
      });
      navigate("/chat");
      return;
    }

    navigate("/");
  }, []);

  return (
    <UserContext.Provider value={{ infoUser, setInfoUSer }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
