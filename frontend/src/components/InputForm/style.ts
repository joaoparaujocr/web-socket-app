import styled, { keyframes } from "styled-components";

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  input {
    background: none;
    width: 100%;
    padding-left: 5px;
    height: 30px;
    outline: none;
    border-width: 0 0 1px 0;
    border-color: white;
    font-size: 1rem;
    box-sizing: border-box;
    transition: all 4s ease;
  }
`;

export default ContainerInput;
