import React, { useContext, useEffect, useState } from "react";

import TextIcon from "../../components/TextIcon";
import { AuthContext, User } from "../Auth";

import "../../css/leaderboard.css"

type Props = {
    user: User;
    kind: string;
    rank: number;
}

export default function LeaderboardPlaceBubble(props: Props) {
    
  const user = useContext(AuthContext);
    var stat: any = 0;
    var [description, setDescription] = useState("");

    let statName = ""; //name of the column in DB
    if (props.kind === "Total xp") {
        statName = 'xp';
    }
    else if (props.kind === "Victories/defeat ratio"){
        statName = 'id';    //to change
    }
    else if (props.kind === "Average points per match"){
        statName = 'pointAverage';  //to change
    }

    useEffect(() => {
      
      
      if (props.kind === "Total xp") {
        setDescription("XP");
      } else if (props.kind === "Victories/defeat ratio") {
        setDescription("victories / defeat ratio");
      } else if (props.kind === "Average points per match") {
        setDescription("points per match");
      }
    }, [props.kind]);
    
    return (
        <div className={"leaderboard-content-bubble " + (props.user.id === user?.id ? "leaderboard-content-bubble-self" : "")}>
            <div className="leaderboard-pp-pseudo-group">
                
                <div className="leaderboard-profile-picture"
                style={{ backgroundImage: `url(${props.user.avatar})`}}>
                </div>
                
                <div className="leaderboard-username"> {props.user.username} </div>
            </div>

            <div className="leaderboard-data"> {props.user[statName]} {description} </div>

            <TextIcon style="placement-icon" text={props.rank}/>
        </div>
    )
}