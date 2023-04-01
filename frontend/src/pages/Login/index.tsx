import { SubmitHandler, useForm } from "react-hook-form";
import InputForm from "../../components/InputForm";
import Form from "./styles";
import { socket } from "../../socket";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import User from "../../interfaces/User";

interface InputNames {
  name: string;
  email: string;
  avatar: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<InputNames>();
  const { setInfoUSer } = useContext(UserContext);

  const onSubmitHandle: SubmitHandler<InputNames> = (dataSubmit) => {
    socket.emit("user_login", dataSubmit, (data: User) => {
      localStorage.setItem("@userWebSocket", JSON.stringify(data));
      setInfoUSer(data);
    });
    navigate("/chat");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitHandle)}>
      <h1>Entre no chat</h1>

      <div className="containerInputs">
        <InputForm label="Name" register={register("name")} />
        <InputForm label="Email" register={register("email")} />
        <InputForm label="Avatar" register={register("avatar")} />
      </div>
      <button type="submit">Entrar</button>
    </Form>
  );
};

export default Login;
