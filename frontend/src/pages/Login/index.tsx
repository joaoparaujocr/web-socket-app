import { SubmitHandler, useForm } from "react-hook-form";
import InputForm from "../../components/InputForm";
import Form from "./styles";
import { socket } from "../../socket";

interface InputNames {
  name: string;
  email: string;
  avatar: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputNames>();

  const onSubmitHandle: SubmitHandler<InputNames> = (data) => {
    socket.emit("user_login", data);
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
