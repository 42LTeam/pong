import React, { useContext, useEffect, useState } from "react";

import TextIcon from "../../components/TextIcon";
import { AuthContext, User } from "../Auth";

import "../../css/leaderboard.css";
import { Tooltip, Zoom } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  user: User;
  kind: string;
  rank: number;
};

export default function LeaderboardPlaceBubble(props: Props) {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  var stat: any = 0;
  var [description, setDescription] = useState("");

  let statName = ""; //nom precis de l'attribut
  if (props.kind === "XP total") {
    statName = "xp";
  } else if (props.kind === "Ratio victoires/défaites") {
    statName = "ratio";
  } else if (props.kind === "Moyenne des points par match") {
    statName = "pointAverage";
  }

  useEffect(() => {
    if (props.kind === "XP total") {
      setDescription("XP");
    } else if (props.kind === "Ratio victoires/défaites") {
      setDescription("ratio victoires / défaites");
    } else if (props.kind === "Moyenne des points par match") {
      setDescription("points par match");
    }
  }, [props.kind]);

  const handleClick = () => {
    navigate("/profile/" + props.user.id);
  };

  return (
    <div
      className={
        "leaderboard-content-bubble " +
        (props.user.id === user?.id ? "leaderboard-content-bubble-self" : "")
      }
    >
      <Tooltip title="Voir le profil" TransitionComponent={Zoom}>
        <div className="leaderboard-pp-pseudo-group" onClick={handleClick}>
          <div
            className="leaderboard-profile-picture"
            style={{ backgroundImage: `url(${props.user.avatar})` }}
          ></div>

          <div className="leaderboard-username"> {props.user.username} </div>
        </div>
      </Tooltip>
      <div className="leaderboard-data">
        {props.user.playedMatch
          ? `${props.user[statName].toFixed(2)} ${description}`
          : "Aucun match joué"}
      </div>

      <TextIcon
        style="placement-icon"
        text={props.user.playedMatch ? `${props.rank}` : "-"}
      />
    </div>
  );
}
