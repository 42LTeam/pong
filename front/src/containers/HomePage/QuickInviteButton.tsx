import React from "react";
import { useNavigate } from "react-router";
import { getUserByID } from "../../api";

type Props = {
  userID: number;
  text: string;
  custom: boolean;
};

export const QuickInviteButton = (props: Props): JSX.Element => {
  const navigate = useNavigate();

  const inviteFriend = () => {
    const user = getUserByID(props.userID).then((response) =>
      navigate(
        "/game?id=" +
          props.userID +
          "&invite=" +
          true +
          "&custom=" +
          props.custom
      )
    );
  };

  return (
    <button className="quick-invite-button" onClick={inviteFriend}>
      {props.text}
    </button>
  );
};

export default QuickInviteButton;
