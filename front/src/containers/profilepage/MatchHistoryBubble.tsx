import React from "react";

import TextIcon from "../../components/TextIcon";

import "../../css/profile.css";
import { MatchResume } from "./ProfilePage";
import { Tooltip, Zoom } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  user: any;
  matchResume: MatchResume;
};

export default function MatchHistoryBubble(props: Props) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/profile/" + props.matchResume.OpponentId);
  };

  return (
    <div className="match-history-bubble">
      <Tooltip title="Voir le profil" TransitionComponent={Zoom}>
        <div className="match-history-pp-pseudo-group" onClick={handleClick}>
          <div
            className="match-history-profile-picture"
            style={{
              backgroundImage: `url(${props.matchResume.OpponentAvatar})`,
            }}
          ></div>
          <div className="match-history-opponent-pseudo">
            {" "}
            {props.matchResume.OpponentUsername}{" "}
          </div>
        </div>
      </Tooltip>
      <div className="match-history-data">
        {" "}
        {props.matchResume.UserScore} / {props.matchResume.OpponentScore}{" "}
      </div>

      {props.matchResume.UserScore > props.matchResume.OpponentScore ? (
        <TextIcon style={"victory-icon"} text={"Victoire"} />
      ) : (
        <TextIcon style={"defeat-icon"} text={"Défaite"} />
      )}
    </div>
  );
}
