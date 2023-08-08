import React, { useEffect, useState } from "react";

import PlacementIcon from "../../components/texticons/PlacementIcon";

import "../../css/leaderboard.css"

type Props = {
    user: any;
    kind: string;
}


export default function LeaderboardPlaceBubble(props: Props) {
    
    var [avatar, setAvatar] = useState("");
    var [username, setUsername] = useState("");
    var [stat, setStat] = useState(0);
    var [description, setDescription] = useState("");
    var [placement, setPlacement] = useState(0);

    useEffect(() => {
        setAvatar(
          "https://cdn.intra.42.fr/users/70f64fba2e18a69e9bef1f5baf2f49db/lzima.jpg"
        );
        setUsername("lzima");
        setStat(4.2);
        setPlacement(1);
    
        if (props.kind === "Total victories") {
          setDescription("victories");
        } else if (props.kind === "Victories / defeat ratio") {
          setDescription("victories / defeat ratio");
        } else if (props.kind === "Average points per match") {
          setDescription("points per match");
        }
      }, [props.kind]);
    
    return (
        <div className="leaderboard-content-bubble">
            <div className="leaderboard-pp-pseudo-group">
                
                <div className="leaderboard-profile-picture"
                style={{ backgroundImage: `url(${avatar})` }}>
                </div>
                
                <div className="leaderboard-username"> {username} </div>
            </div>

            <div className="leaderboard-data"> {stat} {description} </div>

            <PlacementIcon placement={placement}/>
        </div>
    )
}