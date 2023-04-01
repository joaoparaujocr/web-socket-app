import styled from "styled-components";

interface UserListItemProps {
  isSelected: boolean;
}

const UserListItem = styled.li<UserListItemProps>`
  display: flex;
  flex-direction: row-reverse;
  list-style-type: none;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  width: 100%;
  padding: 0;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "red" : "none")};
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export default UserListItem;
