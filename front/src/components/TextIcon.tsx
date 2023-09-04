import React from "react";

import "../css/leaderboard.css";
import "../css/profile.css";

type Props = {
  style: string;
  text: any;
};

export default function TextIcon(props: Props) {
  return <div className={props.style}>{props.text}</div>;
}
