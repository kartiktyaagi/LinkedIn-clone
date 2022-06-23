import React from "react";
import "./HeaderOption.css";
import { Avatar } from "@material-ui/core";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

function HeaderOption({ onClick, avatar, Icon, title }) {
  const user = useSelector(selectUser);
  return (
    <div onClick={onClick} className="headerOption">
      {Icon && <Icon className="headeroption__icon" />}
      {avatar && (
        <Avatar className="headeroption__icon" src={user?.photoUrl}>
          {user?.email[0]}
        </Avatar>
      )}
      <h3>{title}</h3>
    </div>
  );
}

export default HeaderOption;
