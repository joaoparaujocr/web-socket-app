import NotificationMsg from "../../interfaces/Notification";
import UserListItem from "./styles";

interface UserItemProps {
  name: string;
  imgUrl: string;
  isSelected: boolean;
  newMessage?: boolean;
  onClickEvent: () => void;
}

const UserItem = ({
  imgUrl,
  name,
  onClickEvent,
  isSelected,
  newMessage,
}: UserItemProps) => {
  return (
    <UserListItem isSelected={isSelected} onClick={onClickEvent}>
      <p>{name}</p>
      <img src={imgUrl} />
      {newMessage && <span />}
    </UserListItem>
  );
};

export default UserItem;
