import React from "react"

import "../css/leaderboard.css"

type Props = {
    placement: number;
}

export default function PlacementIcon(props: Props) {
    return (
        <div className="leaderboard-placement-icon">{props.placement}</div>
    )
};