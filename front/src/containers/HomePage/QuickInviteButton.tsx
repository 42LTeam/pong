import React from "react";

type Props = {
  userID: number;
};

export const QuickInviteButton = (props: Props): JSX.Element => {
  const inviteFriend = () => {
    console.log("i wanna play with " + props.userID);
    //to code with back (ev some more front)
  };

  return (
    <button className="quick-invite-button" onClick={inviteFriend}>
      Inviter{" "}
    </button>
  );
};

export default QuickInviteButton;
