import React from "react";
import { useNavigate } from "react-router";
import { getUserByID } from "../../api";
import { listSubheaderClasses } from "@mui/material";

type Props = {
  userID: number;
};

export const QuickInviteButton = (props: Props): JSX.Element => {
  const navigate = useNavigate();

  const inviteFriend = () => {
    const user = getUserByID(props.userID).then((response) =>
      navigate(
        "/game?id=" +
          props.userID +
          "&username=" +
          response.data.username +
          "&session=" +
          response.data.session,
      ),
    );
  };

  return (
    <button className="quick-invite-button" onClick={inviteFriend}>
      Inviter{" "}
    </button>
  );
};

export default QuickInviteButton;
