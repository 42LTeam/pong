import React, { useContext, useEffect, useState } from "react";

import QuickInviteButton from "./QuickInviteButton";

import "../../css/homepage.css";
import { AuthContext, User } from "../Auth";
import { getRatioAgainst } from "../../api";

type Props = {
  user: User;
};

type ratio = {
  wins: number;
  losses: number;
};

export default function FriendQuickInviteBubble(props: Props) {
  const me = useContext(AuthContext);

  const [ratio, setRatio] = useState<ratio>();
  useEffect(() => {
    getRatioAgainst(me?.id, props.user.id)
      .then(function (response) {
        setRatio(response.data);
      })
      .catch(function (error) {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="quick-invite-bubble">
      <div className="quick-invite-pp-pseudo-group">
        <div
          className="quick-invite-profile-picture"
          style={{ backgroundImage: `url(${props.user.avatar})` }}
        ></div>
        <div className="quick-invite-pseudo"> {props.user.username} </div>
      </div>
      <div className="quick-invite-ratio">
        {" "}
        {ratio?.wins} W/{ratio?.losses} L{" "}
      </div>
      <QuickInviteButton userID={props.user.id} />
    </div>
  );
}
