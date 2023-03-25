import { UseFormRegisterReturn } from "react-hook-form";
import ContainerInput from "./style"

interface InputFormProps {
  textErro?: string;
  register: UseFormRegisterReturn;
  label: string;
}

const InputForm = ({ register, textErro, label }: InputFormProps) => {
  return (
    <ContainerInput>
      <label htmlFor="">{label}</label>
      {textErro && <p className="testErro">{textErro}</p>}
      <input {...register} type="text" />
    </ContainerInput>
  );
};

export default InputForm;
