import React, { useContext, useEffect, useState } from "react";

import QuickInviteButton from "./QuickInviteButton";

import "../../css/homepage.css";
import { AuthContext, User } from "../Auth";
import { getRatioAgainst } from "../../api";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

type Props = {
  user: User;
};

type ratio = {
  wins: number;
  losses: number;
};

export default function FriendQuickInviteBubble(props: Props) {
  const me = useContext(AuthContext);
  const navigate = useNavigate();

  const [ratio, setRatio] = useState<ratio>();
  useEffect(() => {
    getRatioAgainst(me?.id, props.user.id)
      .then(function (response) {
        setRatio(response.data);
      })
      .catch(function (error) {
        console.log("Cannot fetch user data:");
      });
  }, []);

  const handleClick = () => {
    navigate('profile/' + props.user.id);
  };

  return (
    <div className="quick-invite-bubble">
      <Tooltip title="Voir le profil" TransitionComponent={Zoom}>
      <div className="quick-invite-pp-pseudo-group" onClick={handleClick}>
        <div
          className="quick-invite-profile-picture"
          style={{ backgroundImage: `url(${props.user.avatar})` }}
        ></div>
        <div className="quick-invite-pseudo"> {props.user.username} </div>
      </div>
      </Tooltip>
      <div className="quick-invite-ratio">
        {ratio?.wins} V / {ratio?.losses} D
      </div>
      <QuickInviteButton
        userID={props.user.id}
        text={"Standard"}
        custom={false}
      />
      <QuickInviteButton userID={props.user.id} text={"Custom"} custom={true} />
    </div>
  );
}
