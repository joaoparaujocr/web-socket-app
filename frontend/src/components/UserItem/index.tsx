import UserListItem from "./styles";

interface UserItemProps {
  name: string;
  imgUrl: string;
  isSelected: boolean;
  onClickEvent: () => void;
}

const UserItem = ({ imgUrl, name, onClickEvent, isSelected }: UserItemProps) => {
  return (
    <UserListItem isSelected={isSelected} onClick={onClickEvent}>
      <p>{name}</p>
      <img src={imgUrl} />
    </UserListItem>
  );
};

export default UserItem;
