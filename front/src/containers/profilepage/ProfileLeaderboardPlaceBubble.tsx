import React from "react";

import TextIcon from "../../components/TextIcon";

import "../../css/profile.css";
import "../../css/leaderboard.css";

type Props = {
  user: any;
  type: string;
};

export default function ProfileLeaderboardPlaceBubble(props: Props) {
  var data: number = 0;
  var placement: number = 0;

  function getData() {
    if (props.type === "TotalVictories") {
      data = 5; // a chopper avec back
    } else if (props.type === "Ratio") {
      data = 0.5; // a chopper avec back
    } else if (props.type === "AveragePoints") {
      data = 4; // a chopper avec back
    }
  }

  function getPlacement() {
    placement = 2; //a pécho avec le backk ossi ouais ouais ouais
  }

  getData();
  getPlacement();

  return (
    <div className="leaderboard-place-bubble">
      <div className="leaderboard-title-stat"> {props.type} </div>

      <div className="leaderboard-data"> {data} </div>

      <TextIcon style="placement-icon" text={placement} />
    </div>
  );
}
